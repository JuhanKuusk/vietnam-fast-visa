"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xl font-bold">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">VietnamVisaHelp.com</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">30 Min Approval Letter</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.legal?.termsTitle || "Terms of Use"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.legal?.termsIntro || "By using this website, you agree to these Terms."}
          </p>

          {/* What We Do */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.whatWeDo || "What We Do"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.whatWeDoText || "VietnamVisaHelp.com provides visa assistance and administrative support services for travelers to Vietnam. We are not a government agency, embassy, or consulate. We do not issue visas. All visa decisions are made by Vietnamese authorities."}
            </p>
          </section>

          {/* Who Can Use */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.whoCanUse || "Who Can Use This Website"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.whoCanUseText || "You must be at least 18 years old and legally able to enter into contracts."}
            </p>
          </section>

          {/* Your Responsibilities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.yourResponsibilities || "Your Responsibilities"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.youAgreeTo || "You agree to:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.responsibility1 || "Provide accurate and complete information"}</li>
              <li>{t.legal?.responsibility2 || "Carefully review all information before submission"}</li>
              <li>{t.legal?.responsibility3 || "Follow all applicable laws"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {t.legal?.responsibilityNote || "Incorrect or incomplete information may result in visa rejection or delays. We are not responsible for such outcomes."}
            </p>
          </section>

          {/* Fees and Payments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.feesPayments || "Fees and Payments"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.fee1 || "Our service fees are separate from government visa fees"}</li>
              <li>{t.legal?.fee2 || "Fees become non-refundable once processing begins"}</li>
              <li>{t.legal?.fee3 || "Prices are clearly shown before payment"}</li>
            </ul>
          </section>

          {/* Processing Times */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.processingTimes || "Processing Times"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.processingTimesText || "Processing times are estimates only. Delays may occur due to government processing, holidays, or additional checks."}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.intellectualProperty || "Intellectual Property"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.intellectualPropertyText || "All content on this website belongs to VietnamVisaHelp.com and may not be copied or reused without permission."}
            </p>
          </section>

          {/* Prohibited Use */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.prohibitedUse || "Prohibited Use"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.youMayNot || "You may not:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.prohibited1 || "Use the website for fraud or illegal activity"}</li>
              <li>{t.legal?.prohibited2 || "Attempt to hack or disrupt services"}</li>
              <li>{t.legal?.prohibited3 || "Misuse personal or system data"}</li>
            </ul>
          </section>

          {/* Liability Disclaimer */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.liabilityDisclaimer || "Liability Disclaimer"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.notResponsibleFor || "We are not responsible for:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.liability1 || "Visa refusals or delays"}</li>
              <li>{t.legal?.liability2 || "Travel losses or missed flights"}</li>
              <li>{t.legal?.liability3 || "Government decisions"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {t.legal?.asIsNote || "Services are provided \"as is\" without guarantees."}
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.governingLaw || "Governing Law"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.governingLawText || "These Terms are governed by the laws of Vietnam."}
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
