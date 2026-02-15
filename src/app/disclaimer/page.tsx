"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function DisclaimerPage() {
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
            Disclaimer
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | Last updated: January 29, 2026
          </p>

          {/* Important Notice Box */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Notice
            </h2>
            <p className="text-red-700 dark:text-red-300 font-medium">
              VietnamVisaHelp.com is a <strong>private, third-party visa assistance service</strong>.
              We are <strong>NOT affiliated with the Vietnamese Government</strong>, the Vietnam Immigration Department,
              or any governmental body. We do not issue visas - all visa decisions are made solely by Vietnamese immigration authorities.
            </p>
          </div>

          {/* Official Government Option */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Official Government Option
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You can apply for a Vietnam e-Visa directly through the official government website:
              </p>
              <a
                href="https://evisa.xuatnhapcanh.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                evisa.xuatnhapcanh.gov.vn
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Government fee: $25 USD (single entry) or $50 USD (multiple entry) | Processing time: 3 business days
              </p>
            </div>
          </section>

          {/* Our Service Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Service Fees
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our prices include <strong>both the government fee AND our service fee</strong>. There are no hidden charges.
              The table below shows our total pricing for a single-entry 30-day e-Visa:
            </p>

            {/* Fees Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Processing Speed</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Our Total Price</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Govt Fee Included</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Our Service Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-amber-50 dark:bg-amber-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Weekend / Holiday</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Processing on weekends & holidays</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-amber-600 dark:text-amber-400">$249 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$224 USD</td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Emergency</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">15-30 min + Check-In Approval</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-red-600 dark:text-red-400">$199 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$174 USD</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Urgent</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">1 hour (business hours)</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">$159 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$134 USD</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Express</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">4 hours</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">$119 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$94 USD</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Express</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">1 day</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">$99 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$74 USD</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Express</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">2 days</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">$79 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$54 USD</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>Standard</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">2-3 business days</span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">$49 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$25 USD</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">$24 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              * Multiple entry e-Visa adds $25 USD to the total price (government fee difference).
            </p>
          </section>

          {/* What Our Service Fee Covers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What Our Service Fee Covers
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Document review and verification before submission</li>
              <li>Application form preparation and error correction</li>
              <li>Direct submission to Vietnam Immigration Department</li>
              <li>24/7 customer support via WhatsApp and email</li>
              <li>Real-time application status tracking</li>
              <li>Expedited processing for urgent requests</li>
              <li>Check-in approval letter for emergency cases</li>
            </ul>
          </section>

          {/* No Guarantee of Visa Approval */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              No Guarantee of Visa Approval
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We cannot guarantee that your visa application will be approved. All visa decisions are made
              solely by the Vietnam Immigration Department. Our role is to assist with the application process
              and ensure your documentation is complete and accurate.
            </p>
          </section>

          {/* Information Accuracy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Information Accuracy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We strive to provide accurate and up-to-date information, but Vietnamese immigration rules and
              requirements can change without notice. Always verify current requirements before traveling.
              We are not responsible for any changes in government policies or requirements.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">We are not liable for:</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Visa rejections or delays by Vietnamese immigration authorities</li>
              <li>Entry denial at Vietnamese borders despite having a valid e-Visa</li>
              <li>Missed flights, travel disruptions, or accommodation losses</li>
              <li>Errors in information provided by the applicant</li>
              <li>Changes to Vietnamese government policies or requirements</li>
              <li>Technical issues beyond our reasonable control</li>
            </ul>
          </section>

          {/* Refund Policy Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Refund Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              For detailed refund information, please see our{" "}
              <Link href="/refund" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Refund Policy
              </Link>
              . In summary:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Before submission:</strong> Full refund available</li>
              <li><strong>After submission:</strong> Government fees are non-refundable</li>
              <li><strong>Our error:</strong> Service fee refunded if visa denied due to our mistake</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you have any questions about this disclaimer or our services:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a></li>
              <li><strong>Website:</strong> <a href="https://vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">vietnamvisahelp.com</a></li>
              <li className="pt-2"><strong>Address:</strong> Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
