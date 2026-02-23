"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function FeesPage() {
  const { t } = useLanguage();
  const { content, siteName, layout } = useSite();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex flex-col">
              <Link href="/" className="hover:opacity-90 transition-opacity">
                <Logo size="md" taglineText={t.header.logoTagline} siteName={siteName !== "VietnamTravel.help" ? siteName : undefined} />
              </Link>
              {/* Mobile contact info below logo */}
              <div className="flex sm:hidden items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <a href={`mailto:${content.supportEmail}`} className="hover:text-blue-600">
                  {content.supportEmail}
                </a>
                <span>|</span>
                <a href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`} className="hover:text-green-600">
                  {content.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* About Us Button - Blue */}
              <Link
                href="/about"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#2d7ef6' }}
              >
                {t.header.aboutUs}
              </Link>
              {/* Added Fees Button - Amber/Orange (Active) */}
              <Link
                href="/fees"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ring-2 ring-offset-2 ring-amber-500"
                style={{ backgroundColor: '#f59e0b' }}
              >
                {t.header?.addedFees || "Added Fees"}
              </Link>
              {/* Vietnam Tours Button - Teal/Green */}
              {layout.showTours && (
                <Link
                  href="/tours"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0d9488' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vietnam Tours
                </Link>
              )}
              {/* WhatsApp Button - Green */}
              <a
                href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Fees Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamTravel.help | Last updated: February 18, 2026
          </p>

          {/* Important Notice Box */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Notice
            </h2>
            <p className="text-amber-700 dark:text-amber-300 font-medium">
              VietnamTravel.help is a <strong>private, third-party visa assistance service</strong>.
              We are <strong>NOT affiliated with the Vietnamese Government</strong>, the Vietnam Immigration Department,
              or any governmental body. We do not issue visas - all visa decisions are made solely by Vietnamese immigration authorities.
            </p>
          </div>

          {/* Official Government Alternative */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Official Government Alternative
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You can always apply for a Vietnam e-Visa directly through the official government website at no additional service cost:
              </p>
              <a
                href="https://evisa.xuatnhapcanh.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                evisa.xuatnhapcanh.gov.vn
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Official government fee: $25-50 USD | Standard processing time: 3 business days
              </p>
            </div>
          </section>

          {/* Fee Structure */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Understanding Our Fees
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our service fees are separate from government-regulated charges. When you use VietnamTravel.help,
              you are paying for our professional assistance services which include:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Document review and verification</li>
              <li>Application preparation and submission assistance</li>
              <li>24/7 customer support via WhatsApp</li>
              <li>Expedited processing coordination</li>
              <li>Real-time application status tracking</li>
              <li>Multiple language support</li>
            </ul>
          </section>

          {/* Government Fees vs Service Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Government Fees vs. Service Fees
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Government Fee</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  The official Vietnam e-Visa government fee is $25 USD for single entry or $50 USD for multiple entry.
                  This fee is set by the Vietnamese government and is the same regardless of where you apply.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Our Service Fee</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Our service fee covers the professional assistance, expedited processing, and support services
                  we provide. This fee varies based on the processing speed you select.
                </p>
              </div>
            </div>
          </section>

          {/* Our Service Fees Table */}
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

          {/* Why Choose Us */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Travelers Choose Our Service
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Expedited Processing:</strong> Get approval in as fast as 30 minutes when you need it urgently
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>24/7 Support:</strong> Real human support via WhatsApp any time, any day
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Error Prevention:</strong> We review your application to catch mistakes before submission
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Money-Back Guarantee:</strong> Full refund if your visa is not approved
                </p>
              </div>
            </div>
          </section>

          {/* Transparency Commitment */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Commitment to Transparency
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We believe in clear, upfront pricing. All fees are displayed before you complete your application.
              There are no hidden charges, and you will see exactly what you are paying for before submitting payment.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Questions About Our Fees?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about our pricing or service fees, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@vietnamtravel.help"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@vietnamtravel.help
              </a>
              <a
                href="https://wa.me/84705549868"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Support
              </a>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
