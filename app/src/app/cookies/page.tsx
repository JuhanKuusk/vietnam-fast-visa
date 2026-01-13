"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Footer } from "@/components/ui/footer";

export default function CookiesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-xl font-bold">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">VietnamVisaHelp.com</h1>
              <p className="text-xs text-gray-500">30 Min Approval Letter</p>
            </div>
          </a>
          <LanguageSelector />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.legal?.cookieTitle || "Cookie Policy"}
          </h1>
          <p className="text-gray-500 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          <p className="text-gray-700 mb-8">
            {t.legal?.cookieIntro || "We use cookies to improve your experience."}
          </p>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.whatAreCookies || "What Are Cookies?"}
            </h2>
            <p className="text-gray-700">
              {t.legal?.whatAreCookiesText || "Cookies are small text files stored on your device when you visit our site."}
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.whyUseCookies || "Why We Use Cookies"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.cookiesUsedFor || "We use cookies to:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.cookieUse1 || "Keep you logged in"}</li>
              <li>{t.legal?.cookieUse2 || "Remember your preferences (e.g., language)"}</li>
              <li>{t.legal?.cookieUse3 || "Analyze site usage"}</li>
              <li>{t.legal?.cookieUse4 || "Provide relevant content"}</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.typesOfCookies || "Types of Cookies"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{t.legal?.essentialCookies || "Essential Cookies"}</h3>
                <p className="text-gray-700">{t.legal?.essentialCookiesText || "Required for core functionality such as security and form submissions."}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{t.legal?.analyticsCookies || "Analytics Cookies"}</h3>
                <p className="text-gray-700">{t.legal?.analyticsCookiesText || "Help us understand how visitors use the site (e.g., Google Analytics)."}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{t.legal?.preferenceCookies || "Preference Cookies"}</h3>
                <p className="text-gray-700">{t.legal?.preferenceCookiesText || "Remember your settings like language."}</p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.thirdPartyCookies || "Third-Party Cookies"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.thirdPartyText || "We may allow third-party services to place cookies, such as:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.thirdParty1 || "Stripe (for payments)"}</li>
              <li>{t.legal?.thirdParty2 || "Google Analytics"}</li>
            </ul>
          </section>

          {/* Your Choices */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.yourChoices || "Your Choices"}
            </h2>
            <p className="text-gray-700">
              {t.legal?.yourChoicesText || "You can disable cookies in your browser settings. Note: Some features may not work properly without cookies."}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.contact || "Contact"}
            </h2>
            <p className="text-gray-700">
              {t.legal?.emailLabel || "Email"}: <a href="mailto:privacy@vietnamvisahelp.com" className="text-blue-600 hover:underline">privacy@vietnamvisahelp.com</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
