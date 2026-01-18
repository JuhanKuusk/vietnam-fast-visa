import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();
    const stripe = getStripe();

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
    const entryTypeLabel = application.entry_type === "multiple" ? "Multi-Entry" : "Single Entry";
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(application.amount_usd * 100), // Convert to cents
      currency: "usd",
      metadata: {
        applicationId: application.id,
        referenceNumber: application.reference_number,
        email: application.email,
        entryType: application.entry_type || "single",
        visaSpeed: application.visa_speed,
      },
      receipt_email: application.email,
      description: `Vietnam E-Visa Application (${entryTypeLabel}) - ${application.reference_number}`,
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
