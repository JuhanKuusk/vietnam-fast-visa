import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseServer } from "@/lib/supabase-server";

// CNY exchange rate (1 USD = 7.2 CNY)
const CNY_EXCHANGE_RATE = 7.2;

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();
    const stripe = getStripe();

    const { applicationId, referenceNumber, paymentMethodTypes, currency } = await request.json();

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

    // Determine currency and amount
    const useCNY = currency === "cny";
    const amountUSD = application.amount_usd;
    const amount = useCNY
      ? Math.round(amountUSD * CNY_EXCHANGE_RATE * 100) // Convert to CNY cents (分)
      : Math.round(amountUSD * 100); // Convert to USD cents

    // Create Stripe Payment Intent with payment method types
    const entryTypeLabel = application.entry_type === "multiple" ? "Multi-Entry" : "Single Entry";

    // Build payment intent options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentIntentOptions: any = {
      amount,
      currency: useCNY ? "cny" : "usd",
      metadata: {
        applicationId: application.id,
        referenceNumber: application.reference_number,
        email: application.email,
        entryType: application.entry_type || "single",
        visaSpeed: application.visa_speed,
        originalAmountUSD: amountUSD,
      },
      receipt_email: application.email,
      description: `Vietnam E-Visa Application (${entryTypeLabel}) - ${application.reference_number}`,
    };

    // Add payment method types if specified
    if (paymentMethodTypes && paymentMethodTypes.length > 0) {
      paymentIntentOptions.payment_method_types = paymentMethodTypes;

      // Add WeChat Pay specific options if needed
      if (paymentMethodTypes.includes("wechat_pay")) {
        paymentIntentOptions.payment_method_options = {
          wechat_pay: {
            client: "web",
          },
        };
      }
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentOptions);

    // Store payment intent ID in database
    await supabase
      .from("applications")
      .update({ payment_intent_id: paymentIntent.id })
      .eq("id", applicationId);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: useCNY ? amountUSD * CNY_EXCHANGE_RATE : amountUSD,
      currency: useCNY ? "cny" : "usd",
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
