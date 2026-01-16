"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.legal?.disclaimerTitle || "Disclaimer"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          {/* Not a Government Agency */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.notGovernment || "Not a Government Agency"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.notGovernmentText || "VietnamVisaHelp.com is a private visa assistance service. We are NOT affiliated with any government body, embassy, or consulate. We do not make visa approval decisions."}
            </p>
          </section>

          {/* No Guarantee */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.noGuarantee || "No Guarantee of Visa Approval"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.noGuaranteeText || "We cannot guarantee that your visa will be approved. All decisions rest with Vietnamese immigration authorities."}
            </p>
          </section>

          {/* Information Accuracy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.infoAccuracy || "Information Accuracy"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.infoAccuracyText || "We do our best to provide accurate and current information, but immigration rules can change. Always verify requirements before traveling."}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.limitationLiability || "Limitation of Liability"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.notLiableFor || "We are not liable for:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.liabilityItem1 || "Visa rejections or delays"}</li>
              <li>{t.legal?.liabilityItem2 || "Missed flights or travel disruptions"}</li>
              <li>{t.legal?.liabilityItem3 || "Errors in user-submitted data"}</li>
              <li>{t.legal?.liabilityItem4 || "Changes to government policies"}</li>
            </ul>
          </section>

          {/* External Links */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.externalLinks || "External Links"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.externalLinksText || "Our website may contain links to external sites. We are not responsible for their content or policies."}
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
