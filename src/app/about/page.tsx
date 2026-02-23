"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const { content, siteName, layout, isChinaSite } = useSite();

  // Dynamic site display name
  const siteDisplayName = isChinaSite ? "越签.com" : "VietnamTravel.help";
  const contactEmail = isChinaSite ? "info@越签.com" : "info@vietnamtravel.help";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex flex-col">
              <Link href="/" className="hover:opacity-90 transition-opacity">
                <Logo size="md" taglineText={t.header.logoTagline} siteName={isChinaSite ? "越签.com" : (siteName !== "VietnamTravel.help" ? siteName : undefined)} />
              </Link>
              {/* Mobile contact info below logo */}
              <div className="flex sm:hidden items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <a href={`mailto:${content.supportEmail}`} className="hover:text-blue-600">{content.supportEmail}</a>
                <span>|</span>
                <a href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`} className="hover:text-green-600">{content.whatsappDisplay}</a>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* About Us Button - Active */}
              <span
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.header?.aboutUs || "About Us"}
              </span>

              {/* Added Fees Button */}
              <Link
                href="/fees"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.header?.addedFees || "Added Fees"}
              </Link>

              {/* Vietnam Tours Button */}
              {layout.showTours && (
                <Link
                  href="/tours"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vietnam Tours
                </Link>
              )}

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors shadow-sm"
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
              {t.legal?.aboutIntro || "Vietnam Travel Help is a professional visa support service specializing in Vietnam e-Visa applications and related travel documentation. Through our website, www.vietnamtravel.help, we assist travelers from around the world with fast, accurate, and reliable visa solutions for entry into Vietnam."}
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

          {/* Official Partner */}
          <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isChinaSite ? "官方合作伙伴：CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE" : "Official Partner: CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE"}
                </h2>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  {isChinaSite
                    ? "营业执照号：0104679428 - 签发日期：2010年5月26日 - 河内投资规划局 | 旅行社许可证号：01-1794/2022/SDL-GPLHNDY"
                    : "Business License: 0104679428 - Issued: May 26, 2010 - Hanoi DPI | Tour Operator License: 01-1794/2022/SDL-GPLHNDY"}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isChinaSite
                ? "我们与CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE合作，这是越南领先的国际旅行社之一，拥有超过14年的经验。通过这一合作关系，我们在越南和东南亚提供全面的旅行服务，包括导游旅行团、邮轮和旅行套餐。"
                : "We are proud to partner with CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE, one of Vietnam's leading international tour operators with over 14 years of experience. Through this partnership, we offer comprehensive travel services including guided tours, cruises, and travel packages throughout Vietnam and Southeast Asia."}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.legal?.contact || "Contact Us"}</h2>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href={`mailto:${content.supportEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{content.supportEmail}</a></li>
              <li><strong>WhatsApp:</strong> <a href={`https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, '')}`} className="text-blue-600 dark:text-blue-400 hover:underline">{content.whatsappDisplay}</a></li>
            </ul>

            {/* Office Locations */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {isChinaSite ? "河内办公室" : "Hanoi Office"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>{isChinaSite ? "电话：" : "Tel:"}</strong> <a href="tel:+84904699428" className="text-blue-600 dark:text-blue-400 hover:underline">+84 904 699 428</a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {isChinaSite
                    ? "越南河内市白梅区白梅街459C号维纳建设钻石大厦11层"
                    : "11th Floor, Vinaconex Diamond Tower, 459C Bach Mai Street, Bach Mai Ward, Hanoi, Vietnam"}
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {isChinaSite ? "胡志明市办公室" : "Ho Chi Minh City Office"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>{isChinaSite ? "微信/WhatsApp：" : "WhatsApp:"}</strong> <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 705 549 868</a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {isChinaSite
                    ? "越南胡志明市平盛区720A号威霖中央公园7号楼38层"
                    : "Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam"}
                </p>
              </div>
            </div>
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
