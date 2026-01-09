import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
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
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
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
          // TODO: Send WhatsApp notification
          // TODO: Send email confirmation
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
