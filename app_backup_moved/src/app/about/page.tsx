"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t.legal?.home || "Home"}
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.legal?.aboutTitle || "About Us"}</h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#c41e3a' }}></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.legal?.aboutIntro || "Vietnam Visa Help is a professional visa support service specializing in Vietnam e-Visa applications and related travel documentation. Through our website, www.vietnamvisahelp.com, we assist travelers from around the world with fast, accurate, and reliable visa solutions for entry into Vietnam."}
            </p>
          </div>

          {/* Express Processing */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c41e3a' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.legal?.expressProcessing || "Express Processing"}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-15">
              {t.legal?.expressProcessingText || "We are particularly known for our urgent visa processing services, offering expedited options with processing times as fast as one hour, as well as standard processing for travelers who plan ahead. Our services cover a wide range of Vietnam visa options, including tourist e-Visas, business e-Visas, single-entry and multiple-entry visas, and other Vietnam entry permits depending on travel purpose and nationality."}
            </p>
          </div>

          {/* Support Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c41e3a' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.legal?.comprehensiveSupport || "Comprehensive Support"}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.legal?.comprehensiveSupportText || "In addition to visa applications, we provide supplementary support services such as application review, error correction, document guidance, arrival assistance, and visa-related travel consultation to ensure a smooth and stress-free experience for our clients."}
            </p>
          </div>

          {/* Local Expertise */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c41e3a' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.legal?.localExpertise || "Local Vietnamese Expertise"}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.legal?.localExpertiseText || "All visa applications are carefully reviewed and processed in Ho Chi Minh City by local Vietnamese visa experts, ensuring compliance with current Vietnamese immigration regulations and minimizing the risk of delays or rejections. Our local expertise allows us to stay up to date with policy changes and processing requirements."}
            </p>
          </div>

          {/* Mission */}
          <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'rgba(196, 30, 58, 0.1)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c41e3a' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.legal?.ourMission || "Our Mission"}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t.legal?.ourMissionText || "Our mission is to make the Vietnam visa process simple, transparent, and efficient—whether you need an emergency visa at short notice or a standard application with professional support."}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: '#c41e3a' }}
            >
              <span>{t.legal?.applyNow || "Apply for Your Visa Now"}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
