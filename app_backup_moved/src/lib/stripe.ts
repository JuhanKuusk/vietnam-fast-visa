import Stripe from "stripe";

// Initialize Stripe only if the secret key is available
// This allows the app to build even without the key set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : null;

// Helper to get stripe instance with error handling
export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error("Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.");
  }
  return stripe;
}
