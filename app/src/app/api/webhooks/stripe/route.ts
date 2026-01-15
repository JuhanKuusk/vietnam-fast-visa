import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase-server";
import { sendPaymentConfirmationEmail } from "@/lib/resend";
import Stripe from "stripe";

// Helper to send confirmation email
async function sendConfirmationEmail(
  supabase: ReturnType<typeof getSupabaseServer>,
  applicationId: string,
  amountCents: number,
  currency: string
) {
  try {
    // Fetch application with applicants
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appError || !application) {
      console.error("Failed to fetch application for email:", appError);
      return;
    }

    const { data: applicants } = await supabase
      .from("applicants")
      .select("full_name")
      .eq("application_id", applicationId);

    const applicantNames = applicants?.map((a) => a.full_name) || ["Applicant"];

    // Format amount
    const amount = (amountCents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    // Format dates
    const formatDate = (dateStr: string) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const result = await sendPaymentConfirmationEmail({
      to: application.email,
      referenceNumber: application.reference_number,
      applicantNames,
      amountPaid: amount,
      visaSpeed: application.visa_speed,
      entryDate: formatDate(application.entry_date),
      exitDate: formatDate(application.exit_date),
      entryPort: application.entry_port,
    });

    if (result.success) {
      console.log(`Confirmation email sent to ${application.email}`);
    } else {
      console.error("Failed to send confirmation email:", result.error);
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret not configured");
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 500 }
    );
  }

  const supabase = getSupabaseServer();
  const stripe = getStripe();

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log(`Received Stripe webhook: ${event.type}`);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const applicationId = session.metadata?.applicationId;

      if (applicationId) {
        const { error } = await supabase
          .from("applications")
          .update({
            payment_status: "completed",
            status: "payment_received",
            paid_at: new Date().toISOString(),
            stripe_session_id: session.id,
          })
          .eq("id", applicationId);

        if (error) {
          console.error("Failed to update application:", error);
        } else {
          console.log(`Checkout completed for application ${applicationId}`);
          // Send confirmation email
          await sendConfirmationEmail(
            supabase,
            applicationId,
            session.amount_total || 0,
            session.currency || "usd"
          );
        }
      }
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const applicationId = paymentIntent.metadata.applicationId;

      if (applicationId) {
        // Update application status
        const { error } = await supabase
          .from("applications")
          .update({
            payment_status: "completed",
            status: "payment_received",
            payment_method: paymentIntent.payment_method_types[0],
            paid_at: new Date().toISOString(),
          })
          .eq("id", applicationId);

        if (error) {
          console.error("Failed to update application:", error);
        } else {
          console.log(`Payment succeeded for application ${applicationId}`);
          // Send confirmation email
          await sendConfirmationEmail(
            supabase,
            applicationId,
            paymentIntent.amount,
            paymentIntent.currency
          );
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const applicationId = paymentIntent.metadata.applicationId;

      if (applicationId) {
        await supabase
          .from("applications")
          .update({ payment_status: "failed" })
          .eq("id", applicationId);

        console.log(`Payment failed for application ${applicationId}`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
