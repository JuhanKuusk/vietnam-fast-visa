import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { applicationId, referenceNumber } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Fetch application from database
    const { data: application, error: fetchError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check if already paid
    if (application.payment_status === "completed") {
      return NextResponse.json(
        { error: "This application has already been paid" },
        { status: 400 }
      );
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(application.amount_usd * 100), // Convert to cents
      currency: "usd",
      metadata: {
        applicationId: application.id,
        referenceNumber: application.reference_number,
        email: application.email,
      },
      receipt_email: application.email,
      description: `Vietnam E-Visa Application - ${application.reference_number}`,
    });

    // Store payment intent ID in database
    await supabase
      .from("applications")
      .update({ payment_intent_id: paymentIntent.id })
      .eq("id", applicationId);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: application.amount_usd,
      referenceNumber: application.reference_number,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
