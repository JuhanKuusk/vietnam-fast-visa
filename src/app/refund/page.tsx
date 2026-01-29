"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function RefundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.legal?.refundTitle || "Refund Policy"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.legal?.refundIntro || "We want you to be satisfied. Here is our refund policy."}
          </p>

          {/* Before Processing */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.beforeProcessing || "Before Processing"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.beforeProcessingText || "If you cancel before we begin processing, you may receive a full refund minus any payment processing fees."}
            </p>
          </section>

          {/* After Processing Begins */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.afterProcessing || "After Processing Begins"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.afterProcessingText || "Once your visa application is submitted to Vietnamese immigration, our service fee is non-refundable. This is because work has been done on your behalf."}
            </p>
          </section>

          {/* Rejected Applications */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.rejectedApps || "Rejected Applications"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.rejectedAppsText || "If your visa is rejected and the fault lies with us (e.g., incorrect submission), we will offer a full refund or resubmit for free. If rejection is due to your own ineligibility or incorrect information provided, no refund is available."}
            </p>
          </section>

          {/* Delays */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.delays || "Delays"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.delaysText || "We do not offer refunds for delays caused by government authorities."}
            </p>
          </section>

          {/* How to Request */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.howToRequest || "How to Request a Refund"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.howToRequestText || "Contact us via email with your order number and reason for refund. We respond within 24-48 hours."}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.contact || "Contact"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.emailLabel || "Email"}: <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
