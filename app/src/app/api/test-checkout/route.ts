import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const stripe = getStripe();

    // Create a Checkout Session with inline price data (USD)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Vietnam E-Visa Test",
              description: "Test payment - $1 USD",
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://vietnamvisahelp.com/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://vietnamvisahelp.com/test-cancel`,
      metadata: {
        test: "true",
        applicationId: "test-123",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Test checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
