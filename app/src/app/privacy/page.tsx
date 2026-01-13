"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Footer } from "@/components/ui/footer";

export default function PrivacyPage() {
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
            {t.legal?.privacyTitle || "Privacy Policy"}
          </h1>
          <p className="text-gray-500 mb-8">
            VietnamVisaHelp.com | {t.legal?.lastUpdated || "Last updated"}: January 13, 2026
          </p>

          <p className="text-gray-700 mb-8">
            {t.legal?.privacyIntro || "We respect your privacy and protect your personal data."}
          </p>

          {/* What Data We Collect */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.dataWeCollect || "What Data We Collect"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.mayCollect || "We may collect:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.data1 || "Name, nationality, date of birth"}</li>
              <li>{t.legal?.data2 || "Passport and visa details"}</li>
              <li>{t.legal?.data3 || "Email, phone number"}</li>
              <li>{t.legal?.data4 || "Payment information (processed securely by third parties)"}</li>
              <li>{t.legal?.data5 || "IP address and website usage data"}</li>
            </ul>
          </section>

          {/* Why We Collect It */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.whyWeCollect || "Why We Collect It"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.weUseDataTo || "We use your data to:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.purpose1 || "Process visa assistance requests"}</li>
              <li>{t.legal?.purpose2 || "Communicate with you"}</li>
              <li>{t.legal?.purpose3 || "Improve our website"}</li>
              <li>{t.legal?.purpose4 || "Meet legal obligations"}</li>
            </ul>
          </section>

          {/* Legal Basis (GDPR) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.legalBasis || "Legal Basis (GDPR)"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.processBasedOn || "We process data based on:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.basis1 || "Your consent"}</li>
              <li>{t.legal?.basis2 || "Contract necessity"}</li>
              <li>{t.legal?.basis3 || "Legal obligations"}</li>
              <li>{t.legal?.basis4 || "Legitimate business interests"}</li>
            </ul>
          </section>

          {/* Who We Share Data With */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.whoWeShare || "Who We Share Data With"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.mayShareWith || "We may share data with:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.share1 || "Vietnamese authorities (for visa processing)"}</li>
              <li>{t.legal?.share2 || "Payment processors (Stripe, PayPal)"}</li>
              <li>{t.legal?.share3 || "IT and hosting providers"}</li>
              <li>{t.legal?.share4 || "Legal authorities when required"}</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              {t.legal?.neverSell || "We never sell your data."}
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.internationalTransfers || "International Transfers"}
            </h2>
            <p className="text-gray-700">
              {t.legal?.internationalTransfersText || "Your data may be processed outside your country. We use safeguards compliant with GDPR where applicable."}
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.dataRetention || "Data Retention"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.keepDataFor || "We keep data only as long as necessary for:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.retention1 || "Service delivery"}</li>
              <li>{t.legal?.retention2 || "Legal compliance"}</li>
              <li>{t.legal?.retention3 || "Dispute resolution"}</li>
            </ul>
          </section>

          {/* Your Rights (GDPR) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.yourRights || "Your Rights (GDPR)"}
            </h2>
            <p className="text-gray-700 mb-3">{t.legal?.mayRequest || "You may request:"}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t.legal?.right1 || "Access to your data"}</li>
              <li>{t.legal?.right2 || "Corrections"}</li>
              <li>{t.legal?.right3 || "Deletion"}</li>
              <li>{t.legal?.right4 || "Withdrawal of consent"}</li>
            </ul>
            <p className="text-gray-700 mt-3">
              {t.legal?.contactToExercise || "Contact us to exercise your rights."}
            </p>
          </section>

          {/* Security */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.legal?.security || "Security"}
            </h2>
            <p className="text-gray-700">
              {t.legal?.securityText || "We use technical and organizational measures to protect your data, but no system is 100% secure."}
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
