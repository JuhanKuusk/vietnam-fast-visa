"use client";

import { useState } from "react";

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleTestPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-checkout", {
        method: "POST",
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to create checkout: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Payment</h1>
        <p className="text-gray-600 mb-6">
          This is a test payment page. Click the button below to pay <strong>1 EUR</strong> to test the Stripe integration.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Warning:</strong> This is a LIVE payment. You will be charged 1 EUR.
          </p>
        </div>

        <button
          onClick={handleTestPayment}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Pay 1 EUR (Test)"}
        </button>
      </div>
    </div>
  );
}
