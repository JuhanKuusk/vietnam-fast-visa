"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function CheckoutForm({
  clientSecret,
  totalPrice,
}: {
  clientSecret: string;
  totalPrice: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmed`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful, redirect to order-confirmed
      router.push(`/order-confirmed?payment_intent=${paymentIntent.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white/10 rounded-xl p-4">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400 text-center">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${totalPrice} USD`
        )}
      </button>
    </form>
  );
}

function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicantCount = Number(searchParams.get("applicants")) || 1;
  const referenceNumber = searchParams.get("ref");
  const pricePerPerson = 149;
  const totalPrice = pricePerPerson * applicantCount;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    // Get application ID from session storage
    const applicationId = sessionStorage.getItem("applicationId");

    if (!applicationId) {
      setError("No application found. Please start your application again.");
      setIsLoading(false);
      return;
    }

    // Create payment intent when Stripe is selected
    if (paymentMethod === "stripe") {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, referenceNumber }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setClientSecret(data.clientSecret);
          }
        })
        .catch(() => {
          setError("Failed to initialize payment");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [paymentMethod, referenceNumber]);

  // Demo mode: allow proceeding without Stripe keys
  const handleDemoPayment = () => {
    sessionStorage.setItem("paymentComplete", "true");
    router.push("/order-confirmed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-5 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <a href="/" className="text-2xl font-bold text-emerald-400">
          VietnamFastVisa
        </a>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://wa.me/1234567890"
            className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Need help?
          </a>
        </div>
      </header>

      <main className="px-5 pb-24">
        {/* Progress Steps */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                ✓
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">
                Trip Details
              </span>
            </div>
            <div className="w-10 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                ✓
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">
                Your Information
              </span>
            </div>
            <div className="w-10 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                3
              </div>
              <span className="text-base text-white hidden sm:inline">
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <section className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            {/* Header */}
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-5">
              <h2 className="text-xl font-semibold text-emerald-400">
                Secure Payment
              </h2>
              <p className="text-base text-gray-400 mt-1">
                Your payment is protected by SSL encryption
              </p>
              {referenceNumber && (
                <p className="text-sm text-emerald-300 mt-2">
                  Reference: {referenceNumber}
                </p>
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-white/5 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-lg text-white">
                  Order Summary
                </h3>
                <div className="flex justify-between text-base text-gray-400">
                  <span>Emergency E-Visa (1.5h)</span>
                  <span>${pricePerPerson}/person</span>
                </div>
                <div className="flex justify-between text-base text-gray-400">
                  <span>Number of applicants</span>
                  <span>× {applicantCount}</span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-emerald-400">${totalPrice} USD</span>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex items-center gap-4 p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                <div className="text-4xl">⚡</div>
                <div>
                  <div className="font-bold text-emerald-400 text-lg">
                    Fast Processing
                  </div>
                  <div className="text-base text-gray-400">
                    E-Visa delivered within 1.5 hours via email & WhatsApp
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-center">{error}</p>
                  <a
                    href="/"
                    className="block text-center text-emerald-400 hover:text-emerald-300 mt-2"
                  >
                    Start New Application
                  </a>
                </div>
              )}

              {!error && (
                <>
                  {/* Terms and Conditions Checkbox */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900"
                      />
                      <span className="text-sm text-gray-300 leading-relaxed">
                        I confirm that all information provided is accurate, and I agree to the{" "}
                        <a href="/terms" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                          Terms of Use
                        </a>
                        ,{" "}
                        <a href="/privacy" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                          Privacy Policy
                        </a>
                        , and{" "}
                        <a href="/refund" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                          Refund Policy
                        </a>
                        . I understand that VietnamVisaHelp.com is not a government agency and does not guarantee visa approval.
                      </span>
                    </label>
                  </div>

                  {/* Payment Method Selection */}
                  <div className={!termsAccepted ? "opacity-50 pointer-events-none" : ""}>
                    <label className="block text-base font-medium text-gray-300 mb-4">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod("stripe")}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                          paymentMethod === "stripe"
                            ? "bg-emerald-500/20 border-emerald-500"
                            : "bg-white/5 border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="w-16 h-10 bg-white rounded-md flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-lg">
                            stripe
                          </span>
                        </div>
                        <span className="text-base font-medium text-gray-300">
                          Credit Card
                        </span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                          paymentMethod === "paypal"
                            ? "bg-emerald-500/20 border-emerald-500"
                            : "bg-white/5 border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="w-16 h-10 bg-[#003087] rounded-md flex items-center justify-center">
                          <span className="text-[#009cde] font-bold text-lg">
                            Pay
                          </span>
                          <span className="text-white font-bold text-lg">
                            Pal
                          </span>
                        </div>
                        <span className="text-base font-medium text-gray-300">
                          PayPal
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Stripe Payment */}
                  {paymentMethod === "stripe" && (
                    <>
                      {clientSecret ? (
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret,
                            appearance: {
                              theme: "night",
                              variables: {
                                colorPrimary: "#10b981",
                                colorBackground: "#1f2937",
                                colorText: "#ffffff",
                                colorDanger: "#ef4444",
                                fontFamily: "inherit",
                                borderRadius: "12px",
                              },
                            },
                          }}
                        >
                          <CheckoutForm
                            clientSecret={clientSecret}
                            totalPrice={totalPrice}
                          />
                        </Elements>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-center py-8">
                            {isLoading ? (
                              <div className="flex flex-col items-center gap-3">
                                <svg
                                  className="animate-spin h-8 w-8 text-emerald-400"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                <p className="text-gray-400">
                                  Initializing payment...
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <p className="text-gray-400">
                                  Demo Mode: Stripe keys not configured
                                </p>
                                <button
                                  onClick={handleDemoPayment}
                                  className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
                                >
                                  Complete Demo Payment →
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* PayPal Button */}
                  {paymentMethod === "paypal" && (
                    <div className="space-y-5">
                      <p className="text-base text-gray-400 text-center">
                        PayPal integration coming soon. For now, use Demo mode.
                      </p>
                      <button
                        onClick={handleDemoPayment}
                        className="w-full py-5 rounded-xl bg-[#0070ba] hover:bg-[#003087] font-bold text-xl transition-all duration-300 shadow-lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Complete Demo Payment →
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Security badges */}
              {paymentMethod && (
                <div className="flex items-center justify-center gap-6 text-base text-gray-500 pt-4 flex-wrap">
                  <span className="flex items-center gap-2">
                    <span>🔒</span> SSL Encrypted
                  </span>
                  <span className="flex items-center gap-2">
                    <span>🛡️</span> PCI Compliant
                  </span>
                  <span className="flex items-center gap-2">
                    <span>✓</span> Secure Checkout
                  </span>
                </div>
              )}

              {/* Back Link */}
              <div className="text-center pt-4">
                <a
                  href="/apply"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to Applicant Details
                </a>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-8 p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-lg font-semibold text-gray-300 mb-3">
              Trusted by 10,000+ travelers
            </p>
            <div className="flex justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-base">4.9/5</span>
              </div>
              <span>|</span>
              <span className="text-base">98% on-time delivery</span>
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890?text=Hi, I need help with my payment!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-emerald-400 text-xl">Loading...</div>
        </div>
      }
    >
      <PaymentForm />
    </Suspense>
  );
}
