"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SessionData {
  id: string;
  status: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email?: string;
  customer_name?: string;
  line_items?: Array<{
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
  }>;
  metadata?: Record<string, string>;
}

function TestSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSession(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load payment details");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Thank You for Your Payment!
          </h1>
          <p className="text-gray-600">
            Your payment has been successfully processed.
          </p>
        </div>

        {/* Payment Details */}
        {session && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Details
            </h2>

            <div className="space-y-3">
              {session.customer_email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900 font-medium">
                    {session.customer_email}
                  </span>
                </div>
              )}

              {session.line_items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.description}:</span>
                  <span className="text-gray-900 font-medium">
                    {formatAmount(item.amount_total, item.currency)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="text-gray-900 font-semibold">Total Paid:</span>
                <span className="text-green-600 font-bold text-lg">
                  {formatAmount(session.amount_total, session.currency)}
                </span>
              </div>
            </div>

            {/* Reference Number */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Reference Number:</p>
              <p className="text-sm font-mono text-gray-900 break-all">
                {session.id}
              </p>
            </div>
          </div>
        )}

        {/* What's Next Section */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            What Happens Next?
          </h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                1
              </span>
              <p>
                You will receive a confirmation email with your payment receipt.
              </p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                2
              </span>
              <p>
                Our team will process your visa application within the selected
                timeframe.
              </p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                3
              </span>
              <p>
                Your visa document will be sent to your email and WhatsApp once
                approved.
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block py-3 px-8 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </a>
        </div>

        {/* Contact Support */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Questions? Contact us at{" "}
          <a
            href="mailto:support@vietnamvisahelp.com"
            className="text-blue-600 hover:underline"
          >
            support@vietnamvisahelp.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function TestSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <TestSuccessContent />
    </Suspense>
  );
}
