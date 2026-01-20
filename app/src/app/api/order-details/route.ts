import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const paymentIntentId = request.nextUrl.searchParams.get("payment_intent");
  const applicationId = request.nextUrl.searchParams.get("application_id");

  const supabase = getSupabaseServer();
  const stripe = getStripe();

  try {
    let application = null;
    let applicants = null;
    let paymentInfo = null;

    // Try to get application by session_id (Stripe Checkout)
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "payment_intent"],
      });

      paymentInfo = {
        amount: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
        email: session.customer_details?.email,
      };

      // Get application from metadata
      if (session.metadata?.applicationId) {
        const { data } = await supabase
          .from("applications")
          .select("*")
          .eq("id", session.metadata.applicationId)
          .single();
        application = data;
      }
    }

    // Try to get application by payment_intent
    if (paymentIntentId && !application) {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("payment_intent_id", paymentIntentId)
        .single();
      application = data;

      if (application) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        paymentInfo = {
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          email: application.email,
        };
      }
    }

    // Try to get application by application_id
    if (applicationId && !application) {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("id", applicationId)
        .single();
      application = data;

      if (application) {
        paymentInfo = {
          amount: application.amount_usd * 100,
          currency: "usd",
          status: application.payment_status,
          email: application.email,
        };
      }
    }

    // Get applicants if we found an application
    if (application) {
      const { data: applicantsData } = await supabase
        .from("applicants")
        .select("*")
        .eq("application_id", application.id);
      applicants = applicantsData;
    }

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      application: {
        id: application.id,
        reference_number: application.reference_number,
        email: application.email,
        whatsapp: application.whatsapp,
        entry_date: application.entry_date,
        exit_date: application.exit_date,
        entry_port: application.entry_port,
        visa_speed: application.visa_speed,
        status: application.status,
        payment_status: application.payment_status,
        amount_usd: application.amount_usd,
        created_at: application.created_at,
      },
      applicants: applicants?.map((a) => ({
        id: a.id,
        full_name: a.full_name,
        nationality: a.nationality,
        passport_number: a.passport_number,
        date_of_birth: a.date_of_birth,
        gender: a.gender,
      })),
      payment: paymentInfo,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
