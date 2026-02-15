import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase-server";
import { sendPaymentConfirmationEmail } from "@/lib/resend";
import { SupportedLanguage } from "@/lib/translations";
import Stripe from "stripe";
import twilio from "twilio";

// Initialize Twilio client for WhatsApp
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Admin WhatsApp number for notifications
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP_NUMBER || "+84705549868";
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886";

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

    // Get user's language preference (default to EN)
    const language = (application.language as SupportedLanguage) || "EN";

    const result = await sendPaymentConfirmationEmail({
      to: application.email,
      referenceNumber: application.reference_number,
      applicantNames,
      amountPaid: amount,
      visaSpeed: application.visa_speed,
      entryDate: formatDate(application.entry_date),
      exitDate: formatDate(application.exit_date),
      entryPort: application.entry_port,
      language,
    });

    if (result.success) {
      console.log(`Confirmation email sent to ${application.email} in ${language}`);
    } else {
      console.error("Failed to send confirmation email:", result.error);
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

// Helper to send WhatsApp confirmation to customer
async function sendWhatsAppConfirmation(
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
      console.error("Failed to fetch application for WhatsApp:", appError);
      return;
    }

    // Check if WhatsApp number exists
    if (!application.whatsapp) {
      console.log("No WhatsApp number provided, skipping WhatsApp confirmation");
      return;
    }

    const { data: applicants } = await supabase
      .from("applicants")
      .select("full_name")
      .eq("application_id", applicationId);

    const applicantNames = applicants?.map((a) => a.full_name).join(", ") || "Applicant";

    // Format amount
    const amount = (amountCents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    // Format WhatsApp number
    const whatsappNumber = application.whatsapp.startsWith("+")
      ? application.whatsapp
      : `+${application.whatsapp}`;

    // Get visa speed display name
    const visaSpeedNames: Record<string, string> = {
      "30-min": "30-Minute Express",
      "4-hour": "4-Hour Express",
      "1-day": "1-Day Service",
      "2-day": "2-Day Service",
      "weekend": "Weekend/Holiday Service",
    };
    const visaSpeedDisplay = visaSpeedNames[application.visa_speed] || application.visa_speed;

    await twilioClient.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${whatsappNumber}`,
      body: `*Payment Confirmed!* ✅

Thank you for your Vietnam Visa order!

📋 *Order Details:*
Reference: ${application.reference_number}
Applicant(s): ${applicantNames}
Service: ${visaSpeedDisplay}
Amount Paid: ${amount}

🕐 *What's Next:*
Our team is now processing your visa application. You'll receive your approved visa via WhatsApp and email.

Questions? Reply to this message!

Vietnam Visa Help 🇻🇳`,
    });

    console.log(`WhatsApp confirmation sent to ${whatsappNumber}`);
  } catch (error) {
    console.error("Error sending WhatsApp confirmation:", error);
  }
}

// Helper to send admin notification (WhatsApp + could add email)
async function sendAdminNotification(
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
      console.error("Failed to fetch application for admin notification:", appError);
      return;
    }

    const { data: applicants } = await supabase
      .from("applicants")
      .select("full_name")
      .eq("application_id", applicationId);

    const applicantNames = applicants?.map((a) => a.full_name).join(", ") || "Applicant";
    const applicantCount = applicants?.length || 1;

    // Format amount
    const amount = (amountCents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });

    // Get visa speed display name
    const visaSpeedNames: Record<string, string> = {
      "30-min": "30-MIN ⚡",
      "4-hour": "4-HOUR",
      "1-day": "1-DAY",
      "2-day": "2-DAY",
      "weekend": "WEEKEND",
    };
    const visaSpeedDisplay = visaSpeedNames[application.visa_speed] || application.visa_speed;

    // Send WhatsApp to admin
    await twilioClient.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${ADMIN_WHATSAPP}`,
      body: `🔔 *NEW ORDER!* 🔔

${visaSpeedDisplay} - ${amount}

📋 *Details:*
Ref: ${application.reference_number}
Applicants: ${applicantNames} (${applicantCount})
Email: ${application.email}
WhatsApp: ${application.whatsapp || "Not provided"}
Entry: ${application.entry_date}
Port: ${application.entry_port}

👉 Process now: https://vietnamvisahelp.com/admin/applications/${applicationId}`,
    });

    console.log(`Admin notification sent for order ${application.reference_number}`);
  } catch (error) {
    console.error("Error sending admin notification:", error);
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
          const amountTotal = session.amount_total || 0;
          const currency = session.currency || "usd";

          // Send all notifications in parallel
          await Promise.all([
            // Send confirmation email to customer
            sendConfirmationEmail(supabase, applicationId, amountTotal, currency),
            // Send WhatsApp confirmation to customer
            sendWhatsAppConfirmation(supabase, applicationId, amountTotal, currency),
            // Send notification to admin
            sendAdminNotification(supabase, applicationId, amountTotal, currency),
          ]);
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
          const amount = paymentIntent.amount;
          const currency = paymentIntent.currency;

          // Send all notifications in parallel
          await Promise.all([
            // Send confirmation email to customer
            sendConfirmationEmail(supabase, applicationId, amount, currency),
            // Send WhatsApp confirmation to customer
            sendWhatsAppConfirmation(supabase, applicationId, amount, currency),
            // Send notification to admin
            sendAdminNotification(supabase, applicationId, amount, currency),
          ]);
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
