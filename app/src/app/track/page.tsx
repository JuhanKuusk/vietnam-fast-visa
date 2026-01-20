"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";

interface Applicant {
  id: string;
  fullName: string;
  nationality: string;
  hasVisaDocument: boolean;
  visaDocumentUrl: string | null;
}

interface ApplicationData {
  referenceNumber: string;
  status: string;
  paymentStatus: string;
  entryDate: string;
  exitDate: string;
  entryPort: string;
  visaSpeed: string;
  createdAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
  applicants: Applicant[];
}

export default function TrackPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [application, setApplication] = useState<ApplicationData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setApplication(null);
    setLoading(true);

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceNumber, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setApplication(data.application);
      } else {
        setError(data.error || "Failed to find application");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo: Record<string, { label: string; color: string; description: string }> = {
    pending_payment: {
      label: "Pending Payment",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Your payment is pending. Please complete the payment to proceed.",
    },
    payment_received: {
      label: "Payment Received",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "We have received your payment. Your application is in queue for processing.",
    },
    processing: {
      label: "Processing",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Your visa application is being processed. You will be notified once approved.",
    },
    approved: {
      label: "Approved",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Your visa has been approved! We are preparing your documents for delivery.",
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 border-red-200",
      description: "Unfortunately, your visa application was rejected. Please contact support for details.",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Your visa documents have been sent to your email and WhatsApp.",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Application</h1>
          <p className="text-gray-600">Enter your reference number and email to check your visa status</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Reference Number
              </label>
              <input
                id="referenceNumber"
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                required
                placeholder="VN-XXXXXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none uppercase"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ef7175" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Searching...
                </span>
              ) : (
                "Track Application"
              )}
            </button>
          </form>
        </div>

        {/* Application Result */}
        {application && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Status Header */}
            <div className={`p-6 border-b ${statusInfo[application.status]?.color || "bg-gray-100"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">Reference Number</p>
                  <p className="text-2xl font-bold">{application.referenceNumber}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/50">
                    {statusInfo[application.status]?.label || application.status}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm opacity-90">
                {statusInfo[application.status]?.description}
              </p>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Entry Date</p>
                  <p className="font-medium">{new Date(application.entryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exit Date</p>
                  <p className="font-medium">{new Date(application.exitDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entry Port</p>
                  <p className="font-medium">{application.entryPort}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visa Speed</p>
                  <p className="font-medium">{application.visaSpeed || "Standard"}</p>
                </div>
              </div>

              {/* Applicants */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Applicants</h3>
                <div className="space-y-4">
                  {application.applicants.map((applicant) => (
                    <div key={applicant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{applicant.fullName}</p>
                        <p className="text-sm text-gray-500">{applicant.nationality}</p>
                      </div>
                      {applicant.hasVisaDocument && applicant.visaDocumentUrl && (
                        <a
                          href={applicant.visaDocumentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Visa
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-gray-500">{new Date(application.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  {application.paidAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm font-medium">Payment Received</p>
                        <p className="text-xs text-gray-500">{new Date(application.paidAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {application.deliveredAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Visa Delivered</p>
                        <p className="text-xs text-gray-500">{new Date(application.deliveredAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help? Contact our support team</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/3725035137"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:support@vietnamfastvisa.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
