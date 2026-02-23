"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function CookiesPage() {
  const { t } = useLanguage();
  const { isChinaSite, content } = useSite();

  // Dynamic site display name
  const siteDisplayName = isChinaSite ? "越签.com" : "VietnamTravel.help";
  const contactEmail = isChinaSite ? "info@越签.com" : "info@vietnamtravel.help";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" siteName={isChinaSite ? "越签.com" : undefined} />
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
            {isChinaSite ? "Cookie政策" : (t.legal?.cookieTitle || "Cookie Policy")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年2月18日" : `${t.legal?.lastUpdated || "Last updated"}: February 18, 2026`}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {isChinaSite
              ? "我们使用Cookie来改善您的体验。本政策解释了我们如何使用Cookie以及您有哪些选择。"
              : (t.legal?.cookieIntro || "We use cookies to improve your experience.")}
          </p>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "什么是Cookie？" : (t.legal?.whatAreCookies || "What Are Cookies?")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "Cookie是您访问我们网站时存储在您设备上的小型文本文件。它们帮助网站记住您的信息和偏好。"
                : (t.legal?.whatAreCookiesText || "Cookies are small text files stored on your device when you visit our site.")}
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们为何使用Cookie" : (t.legal?.whyUseCookies || "Why We Use Cookies")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们使用Cookie来：" : (t.legal?.cookiesUsedFor || "We use cookies to:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "保持您的登录状态" : (t.legal?.cookieUse1 || "Keep you logged in")}</li>
              <li>{isChinaSite ? "记住您的偏好（如语言）" : (t.legal?.cookieUse2 || "Remember your preferences (e.g., language)")}</li>
              <li>{isChinaSite ? "分析网站使用情况" : (t.legal?.cookieUse3 || "Analyze site usage")}</li>
              <li>{isChinaSite ? "提供相关内容" : (t.legal?.cookieUse4 || "Provide relevant content")}</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "Cookie类型" : (t.legal?.typesOfCookies || "Types of Cookies")}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {isChinaSite ? "必要Cookie" : (t.legal?.essentialCookies || "Essential Cookies")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {isChinaSite
                    ? "核心功能所必需的，如安全性和表单提交。"
                    : (t.legal?.essentialCookiesText || "Required for core functionality such as security and form submissions.")}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {isChinaSite ? "分析Cookie" : (t.legal?.analyticsCookies || "Analytics Cookies")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {isChinaSite
                    ? "帮助我们了解访客如何使用网站（如百度统计）。"
                    : (t.legal?.analyticsCookiesText || "Help us understand how visitors use the site (e.g., Google Analytics).")}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {isChinaSite ? "偏好Cookie" : (t.legal?.preferenceCookies || "Preference Cookies")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {isChinaSite
                    ? "记住您的设置，如语言偏好。"
                    : (t.legal?.preferenceCookiesText || "Remember your settings like language.")}
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "第三方Cookie" : (t.legal?.thirdPartyCookies || "Third-Party Cookies")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "我们可能允许第三方服务放置Cookie，例如："
                : (t.legal?.thirdPartyText || "We may allow third-party services to place cookies, such as:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "支付宝、微信支付（用于支付）" : (t.legal?.thirdParty1 || "Stripe (for payments)")}</li>
              <li>{isChinaSite ? "百度统计" : (t.legal?.thirdParty2 || "Google Analytics")}</li>
            </ul>
          </section>

          {/* Your Choices */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "您的选择" : (t.legal?.yourChoices || "Your Choices")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "您可以在浏览器设置中禁用Cookie。注意：如果没有Cookie，某些功能可能无法正常工作。"
                : (t.legal?.yourChoicesText || "You can disable cookies in your browser settings. Note: Some features may not work properly without cookies.")}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系我们" : (t.legal?.contact || "Contact Us")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如果您对本Cookie政策有任何疑问："
                : "If you have any questions about this Cookie Policy:"}
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>{isChinaSite ? "电子邮件：" : "Email:"}</strong>{" "}
                <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contactEmail}</a>
              </li>
              <li>
                <strong>{isChinaSite ? "微信/WhatsApp：" : "WhatsApp:"}</strong>{" "}
                <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a>
              </li>
            </ul>
          </section>

          {/* Official Partner Section */}
          <section className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "官方合作伙伴" : "Official Partner"}
            </h2>
            <p className="text-amber-600 dark:text-amber-400 font-semibold mb-2">
              CÔNG TY CỔ PHẦN CÔNG NGHỆ DU LỊCH BESTPRICE
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {isChinaSite
                ? "营业执照号：0104679428 - 签发日期：2010年5月26日 - 河内投资规划局 | 旅行社许可证号：01-1794/2022/SDL-GPLHNDY"
                : "Business License: 0104679428 - Issued: May 26, 2010 - Hanoi DPI | Tour Operator License: 01-1794/2022/SDL-GPLHNDY"}
            </p>

            {/* Two Office Locations */}
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              {/* Hanoi Office */}
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  {isChinaSite ? "河内办公室" : "Hanoi Office"}
                </p>
                <p>{isChinaSite ? "电话" : "Tel"}: <a href="tel:+84904699428" className="text-blue-600 dark:text-blue-400 hover:underline">+84 904 699 428</a></p>
                <p className="mt-1 text-xs">
                  {isChinaSite
                    ? "越南河内市白梅区白梅街459C号维纳建设钻石大厦11层"
                    : "11th Floor, Vinaconex Diamond Tower, 459C Bach Mai Street, Bach Mai Ward, Hanoi, Vietnam"}
                </p>
              </div>

              {/* Ho Chi Minh City Office */}
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  {isChinaSite ? "胡志明市办公室" : "Ho Chi Minh City Office"}
                </p>
                <p>{isChinaSite ? "微信/WhatsApp" : "WhatsApp"}: <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 705 549 868</a></p>
                <p className="mt-1 text-xs">
                  {isChinaSite
                    ? "越南胡志明市平盛区720A号威霖中央公园7号楼38层"
                    : "Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
