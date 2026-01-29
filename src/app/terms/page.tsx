"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function TermsPage() {
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
            Terms and Conditions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | Last updated: January 29, 2026
          </p>

          {/* Introduction */}
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Please read these Terms and Conditions carefully before using our Vietnam e-Visa application services.
            By accessing or using VietnamVisaHelp.com, you agree to be bound by these Terms.
          </p>

          {/* 1. Definitions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Definitions
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>&quot;Website&quot;</strong> refers to VietnamVisaHelp.com and all its subdomains.</li>
              <li><strong>&quot;Service&quot;</strong> refers to the Vietnam e-Visa application assistance provided through this Website.</li>
              <li><strong>&quot;Client&quot;</strong> or <strong>&quot;You&quot;</strong> refers to any individual or entity using our Service.</li>
              <li><strong>&quot;We&quot;</strong>, <strong>&quot;Us&quot;</strong>, or <strong>&quot;Our&quot;</strong> refers to VietnamVisaHelp.com and its operators.</li>
              <li><strong>&quot;E-Visa&quot;</strong> refers to the Electronic Visa issued by the Vietnam Immigration Department.</li>
              <li><strong>&quot;Government Fee&quot;</strong> refers to the official fee charged by the Vietnam Immigration Department.</li>
              <li><strong>&quot;Service Fee&quot;</strong> refers to our administrative and processing fee for assisting with your application.</li>
            </ul>
          </section>

          {/* 2. Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              By using our Website and Service, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>You have read, understood, and agree to be bound by these Terms and Conditions.</li>
              <li>You are at least 18 years of age and legally capable of entering into binding contracts.</li>
              <li>You understand that VietnamVisaHelp.com is an independent visa assistance service and is <strong>NOT affiliated with the Vietnamese Government</strong> or any governmental body.</li>
              <li>You can also apply directly through the <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">official Vietnam Immigration Department website</a>.</li>
            </ul>
          </section>

          {/* 3. Nature of Our Service */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Nature of Our Service
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              VietnamVisaHelp.com provides professional visa application assistance services including:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Document review and verification</li>
              <li>Application form preparation and submission</li>
              <li>24/7 customer support</li>
              <li>Application status tracking</li>
              <li>Express processing options</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Important:</strong> We do not issue visas. All visa decisions are made solely by the Vietnam Immigration Department.
              We facilitate the application process but cannot guarantee visa approval.
            </p>
          </section>

          {/* 4. Application Procedure */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Application Procedure
            </h2>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Complete the online application form with accurate personal and travel information.</li>
              <li>Upload required documents (passport photo, portrait photo).</li>
              <li>Select your processing speed and pay the applicable fees.</li>
              <li>We review and submit your application to the Vietnam Immigration Department.</li>
              <li>Receive your approved e-Visa via email.</li>
              <li>Print your e-Visa and present it upon arrival in Vietnam.</li>
            </ol>
          </section>

          {/* 5. Document Requirements */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Document Requirements
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You must provide:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>A valid passport with at least 6 months validity from your intended entry date</li>
              <li>A clear scan or photo of your passport data page</li>
              <li>A recent passport-style photograph (4x6cm, white background)</li>
              <li>Accurate travel dates and entry/exit port information</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Your responsibility:</strong> You are solely responsible for ensuring all information provided is accurate and complete.
              Incorrect or incomplete information may result in visa denial or delays, for which we cannot be held liable.
            </p>
          </section>

          {/* 6. E-Visa Conditions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. E-Visa Conditions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The Vietnam E-Visa is subject to the following conditions set by the Vietnam Immigration Department:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Valid for single or multiple entries (as selected)</li>
              <li>Maximum stay of 30 or 90 days per entry (depending on visa type)</li>
              <li>Entry must be through designated international ports</li>
              <li>The e-Visa cannot be extended or converted to another visa type within Vietnam</li>
              <li>Available to citizens of eligible countries only</li>
            </ul>
          </section>

          {/* 7. Fees and Payment */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Fees and Payment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Our fees consist of two components:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Government Fee:</strong> The official fee charged by the Vietnam Immigration Department ($25 USD for single entry, $50 USD for multiple entry).</li>
              <li><strong>Service Fee:</strong> Our processing and assistance fee, which varies based on processing speed selected.</li>
            </ul>

            {/* Pricing Table */}
            <div className="mt-6 overflow-x-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Pricing for Single-Entry 30-Day E-Visa:
              </h3>
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Processing Speed</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Total Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Government Fee</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Service Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Weekend/Holiday</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$249</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$224</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Emergency (15-30 min)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$199</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$174</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Urgent (1 hour)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$159</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$134</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (4 hours)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$119</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$94</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (1 day)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$99</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$74</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (2 days)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$79</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$54</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Standard (2-3 business days)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$49</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$24</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                * Multiple-entry visas add $25 to all totals.
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              <strong>What&apos;s Included:</strong> Document review and verification, application form preparation, direct submission to Vietnam Immigration Department, 24/7 customer support via WhatsApp and email, real-time application status tracking, and expedited processing for urgent requests.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              All fees are clearly displayed before payment. Prices include all applicable charges with no hidden fees.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Payment:</strong> We accept major credit cards, debit cards, and other secure payment methods.
              All transactions are processed through secure, encrypted payment gateways (Stripe).
            </p>
          </section>

          {/* 8. Processing Times */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Processing Times
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We offer various processing speeds:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Weekend / Holiday:</strong> Processing available on weekends and public holidays</li>
              <li><strong>Emergency:</strong> 15-30 minutes (with Check-In approval letter)</li>
              <li><strong>Urgent:</strong> 1 hour (during business hours, for eligible applications)</li>
              <li><strong>Express:</strong> 4 hours</li>
              <li><strong>Express:</strong> 1 day</li>
              <li><strong>Express:</strong> 2 days</li>
              <li><strong>Standard:</strong> 2-3 business days</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Note:</strong> Processing times are estimates and begin after complete documentation is received.
              Actual processing time depends on the Vietnam Immigration Department.
              Delays may occur during Vietnamese holidays, weekends, or due to additional verification requirements.
            </p>
          </section>

          {/* 9. Refund Policy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Refund Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Before submission:</strong> Full refund available if you cancel before we submit your application.</li>
              <li><strong>After submission:</strong> Government fees are non-refundable once the application is submitted to Vietnamese authorities.</li>
              <li><strong>Visa denial:</strong> If your visa is denied due to reasons within our control (e.g., submission errors on our part), we will refund our service fee. Government fees are non-refundable.</li>
              <li><strong>Client error:</strong> No refund is available if the visa is denied due to incorrect information provided by you, ineligibility, or immigration history issues.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              For detailed refund information, please see our <Link href="/refund" className="text-blue-600 dark:text-blue-400 hover:underline">Refund Policy</Link>.
            </p>
          </section>

          {/* 10. Warnings and Disclaimers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Warnings and Disclaimers
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">Important Notices:</p>
              <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 space-y-2 ml-4">
                <li>VietnamVisaHelp.com is NOT a government agency and is NOT affiliated with the Vietnam Immigration Department.</li>
                <li>We are an independent commercial service that charges fees for visa application assistance.</li>
                <li>You may apply directly through the <a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="underline">official government website</a> without using our services.</li>
                <li>Visa approval is at the sole discretion of Vietnamese immigration authorities.</li>
              </ul>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We are not responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Visa refusals or delays by the Vietnam Immigration Department</li>
              <li>Entry denial at Vietnamese borders despite having a valid e-Visa</li>
              <li>Travel disruptions, missed flights, or accommodation losses</li>
              <li>Changes in Vietnamese visa policies or requirements</li>
              <li>Consequences of incorrect information provided by the applicant</li>
              <li>Technical issues beyond our reasonable control</li>
            </ul>
          </section>

          {/* 11. Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Our total liability shall not exceed the amount you paid for our services.</li>
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</li>
              <li>We provide our services &quot;as is&quot; without warranties of any kind, express or implied.</li>
            </ul>
          </section>

          {/* 12. Privacy and Data Protection */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              We take your privacy seriously. Your personal information is:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Collected only for visa application processing purposes</li>
              <li>Stored securely using industry-standard encryption</li>
              <li>Shared only with the Vietnam Immigration Department as required for your application</li>
              <li>Never sold to third parties for marketing purposes</li>
              <li>Retained only as long as necessary for legal and operational requirements</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              For complete details, please review our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          {/* 13. Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              13. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              All content on this Website, including text, graphics, logos, images, and software, is the property of VietnamVisaHelp.com
              and is protected by international copyright laws. You may not reproduce, distribute, modify, or create derivative works
              without our express written permission.
            </p>
          </section>

          {/* 14. Prohibited Activities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              14. Prohibited Activities
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Use our services for any fraudulent or illegal purpose</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our Website or services</li>
              <li>Use automated systems to access our Website without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          {/* 15. Modifications to Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              15. Modifications to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon
              posting to this Website. Your continued use of our services after any changes constitutes acceptance of the modified Terms.
              We encourage you to review these Terms periodically.
            </p>
          </section>

          {/* 16. Governing Law */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              16. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of Vietnam.
              Any disputes arising from these Terms or your use of our services shall be subject to the exclusive
              jurisdiction of the courts in Ho Chi Minh City, Vietnam.
            </p>
          </section>

          {/* 17. Severability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              17. Severability
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
              shall continue in full force and effect.
            </p>
          </section>

          {/* 18. Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              18. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/841205549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 120 554 9868</a></li>
              <li><strong>Website:</strong> <a href="https://vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">vietnamvisahelp.com</a></li>
              <li className="pt-2"><strong>Address:</strong> Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Our customer support team is available 24/7 to assist you with any inquiries.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
