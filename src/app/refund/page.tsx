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
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | Last updated: January 29, 2026
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            At VietnamVisaHelp.com, we strive to provide excellent service and customer satisfaction. This policy outlines our refund and cancellation terms for our Vietnam e-Visa assistance services.
          </p>

          {/* Understanding Our Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Understanding Our Fees
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Our total price consists of two components:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Government Fee ($25 USD):</strong> The official fee charged by the Vietnam Immigration Department. This fee is non-refundable once submitted to the government.</li>
              <li><strong>Service Fee:</strong> Our processing and assistance fee, which varies by processing speed (from $24 to $224 depending on urgency).</li>
            </ul>
          </section>

          {/* Full Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Full Refund Available
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You are eligible for a full refund (including service fee) in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Cancellation before submission:</strong> If you cancel your order before we submit your application to the Vietnam Immigration Department.</li>
              <li><strong>Our error:</strong> If your visa is denied due to an error on our part (e.g., incorrect data entry, wrong submission).</li>
              <li><strong>Duplicate payment:</strong> If you were accidentally charged twice for the same order.</li>
            </ul>
          </section>

          {/* Partial Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Partial Refund (Service Fee Only)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You may receive a service fee refund (government fee non-refundable) when:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>You cancel after submission but before approval, and the government fee has already been paid.</li>
              <li>Processing time significantly exceeds the promised timeframe due to issues within our control.</li>
            </ul>
          </section>

          {/* No Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              No Refund Available
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Refunds are <strong>not available</strong> in the following situations:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Visa denial due to applicant:</strong> Incorrect information provided by you, ineligibility, criminal history, previous immigration violations, or incomplete documentation.</li>
              <li><strong>Change of travel plans:</strong> If you decide not to travel to Vietnam after your visa is approved.</li>
              <li><strong>Delays by authorities:</strong> Processing delays caused by the Vietnam Immigration Department or other government agencies.</li>
              <li><strong>Entry denial at border:</strong> Being denied entry into Vietnam despite having a valid e-Visa (immigration officers have final discretion).</li>
              <li><strong>Approved visa:</strong> Once your e-Visa has been approved and delivered, no refunds are available.</li>
            </ul>
          </section>

          {/* Processing Times Note */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Important Note on Processing Times
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Processing times (15 minutes to 3 business days) are estimates based on normal conditions. Actual processing depends on the Vietnam Immigration Department. While we make every effort to meet stated timeframes, we cannot guarantee specific delivery times as visa approval is at the discretion of Vietnamese authorities. Significant delays may qualify for partial refunds on a case-by-case basis.
            </p>
          </section>

          {/* How to Request */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              How to Request a Refund
            </h2>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Contact us via email at <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a> or WhatsApp.</li>
              <li>Include your order number/confirmation email and reason for refund request.</li>
              <li>We will review your request within 24-48 hours.</li>
              <li>If approved, refunds are processed within 5-10 business days to your original payment method.</li>
            </ol>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              For refund requests or questions about this policy:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a></li>
              <li><strong>Website:</strong> <a href="https://vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.vietnamvisahelp.com</a></li>
              <li className="pt-2"><strong>Address:</strong> Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Our customer support team is available 24/7 to assist you.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
