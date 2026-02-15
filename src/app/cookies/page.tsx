"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function CookiesPage() {
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
            {t.legal?.cookieTitle || "Cookie Policy"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t.legal?.cookieIntro || "We use cookies to improve your experience."}
          </p>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.whatAreCookies || "What Are Cookies?"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.whatAreCookiesText || "Cookies are small text files stored on your device when you visit our site."}
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.whyUseCookies || "Why We Use Cookies"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.cookiesUsedFor || "We use cookies to:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.cookieUse1 || "Keep you logged in"}</li>
              <li>{t.legal?.cookieUse2 || "Remember your preferences (e.g., language)"}</li>
              <li>{t.legal?.cookieUse3 || "Analyze site usage"}</li>
              <li>{t.legal?.cookieUse4 || "Provide relevant content"}</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.typesOfCookies || "Types of Cookies"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t.legal?.essentialCookies || "Essential Cookies"}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.legal?.essentialCookiesText || "Required for core functionality such as security and form submissions."}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t.legal?.analyticsCookies || "Analytics Cookies"}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.legal?.analyticsCookiesText || "Help us understand how visitors use the site (e.g., Google Analytics)."}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{t.legal?.preferenceCookies || "Preference Cookies"}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.legal?.preferenceCookiesText || "Remember your settings like language."}</p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.thirdPartyCookies || "Third-Party Cookies"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{t.legal?.thirdPartyText || "We may allow third-party services to place cookies, such as:"}</p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{t.legal?.thirdParty1 || "Stripe (for payments)"}</li>
              <li>{t.legal?.thirdParty2 || "Google Analytics"}</li>
            </ul>
          </section>

          {/* Your Choices */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.yourChoices || "Your Choices"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t.legal?.yourChoicesText || "You can disable cookies in your browser settings. Note: Some features may not work properly without cookies."}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t.legal?.contact || "Contact Us"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you have any questions about this Cookie Policy:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a></li>
              <li className="pt-2"><strong>Address:</strong> Binh Thanh District, Ho Chi Minh City, Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Ho Chi Minh City</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
