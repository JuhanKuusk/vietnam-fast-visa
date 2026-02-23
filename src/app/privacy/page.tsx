"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function PrivacyPage() {
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
            {isChinaSite ? "隐私政策" : (t.legal?.privacyTitle || "Privacy Policy")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年2月18日" : `${t.legal?.lastUpdated || "Last updated"}: February 18, 2026`}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {isChinaSite
              ? `在${siteDisplayName}，我们尊重您的隐私并保护您的个人数据。本隐私政策解释了我们如何收集、使用和保护您的信息。`
              : (t.legal?.privacyIntro || "We respect your privacy and protect your personal data.")}
          </p>

          {/* What Data We Collect */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们收集哪些数据" : (t.legal?.dataWeCollect || "What Data We Collect")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们可能收集：" : (t.legal?.mayCollect || "We may collect:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "姓名、国籍、出生日期" : (t.legal?.data1 || "Name, nationality, date of birth")}</li>
              <li>{isChinaSite ? "护照和签证详情" : (t.legal?.data2 || "Passport and visa details")}</li>
              <li>{isChinaSite ? "电子邮件、电话号码" : (t.legal?.data3 || "Email, phone number")}</li>
              <li>{isChinaSite ? "付款信息（由第三方安全处理）" : (t.legal?.data4 || "Payment information (processed securely by third parties)")}</li>
              <li>{isChinaSite ? "IP地址和网站使用数据" : (t.legal?.data5 || "IP address and website usage data")}</li>
            </ul>
          </section>

          {/* Why We Collect It */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们为何收集这些数据" : (t.legal?.whyWeCollect || "Why We Collect It")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们使用您的数据来：" : (t.legal?.weUseDataTo || "We use your data to:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "处理签证协助请求" : (t.legal?.purpose1 || "Process visa assistance requests")}</li>
              <li>{isChinaSite ? "与您沟通" : (t.legal?.purpose2 || "Communicate with you")}</li>
              <li>{isChinaSite ? "改进我们的网站" : (t.legal?.purpose3 || "Improve our website")}</li>
              <li>{isChinaSite ? "履行法律义务" : (t.legal?.purpose4 || "Meet legal obligations")}</li>
            </ul>
          </section>

          {/* Legal Basis (GDPR) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "法律依据（GDPR）" : (t.legal?.legalBasis || "Legal Basis (GDPR)")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们基于以下依据处理数据：" : (t.legal?.processBasedOn || "We process data based on:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "您的同意" : (t.legal?.basis1 || "Your consent")}</li>
              <li>{isChinaSite ? "合同必要性" : (t.legal?.basis2 || "Contract necessity")}</li>
              <li>{isChinaSite ? "法律义务" : (t.legal?.basis3 || "Legal obligations")}</li>
              <li>{isChinaSite ? "合法商业利益" : (t.legal?.basis4 || "Legitimate business interests")}</li>
            </ul>
          </section>

          {/* Who We Share Data With */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们与谁共享数据" : (t.legal?.whoWeShare || "Who We Share Data With")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们可能与以下方共享数据：" : (t.legal?.mayShareWith || "We may share data with:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "越南当局（用于签证处理）" : (t.legal?.share1 || "Vietnamese authorities (for visa processing)")}</li>
              <li>{isChinaSite ? "支付处理商（支付宝、微信支付、银联）" : (t.legal?.share2 || "Payment processors (Stripe, PayPal)")}</li>
              <li>{isChinaSite ? "IT和托管服务提供商" : (t.legal?.share3 || "IT and hosting providers")}</li>
              <li>{isChinaSite ? "法定要求时的法律机关" : (t.legal?.share4 || "Legal authorities when required")}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3 font-medium">
              {isChinaSite ? "我们绝不出售您的数据。" : (t.legal?.neverSell || "We never sell your data.")}
            </p>
          </section>

          {/* SMS/Mobile Communications - A2P 10DLC Required */}
          <section className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "短信/移动通讯" : (t.legal?.smsTitle || "SMS/Mobile Communications")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `当您提供手机号码并同意接收来自${siteDisplayName}的短信时：`
                : (t.legal?.smsIntro || `When you provide your mobile phone number and opt-in to receive SMS messages from ${siteDisplayName}:`)}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "我们仅使用您的手机号码发送签证申请更新、状态通知和重要旅行提醒" : (t.legal?.sms1 || "We use your mobile number solely to send visa application updates, status notifications, and important travel alerts")}</li>
              <li className="font-semibold">{isChinaSite ? "您的手机号码和短信同意绝不会与第三方共享或出售用于营销目的" : (t.legal?.sms2 || "Your mobile phone number and SMS consent will never be shared with or sold to third parties for marketing purposes")}</li>
              <li className="font-semibold">{isChinaSite ? "我们不会与潜在客户生成器或数据经纪人共享您的移动信息" : (t.legal?.sms3 || "We do not share your mobile information with lead generators or data brokers")}</li>
              <li>{isChinaSite ? "消息频率根据您的申请状态而变化" : (t.legal?.sms4 || "Message frequency varies based on your application status")}</li>
              <li>{isChinaSite ? "可能会收取消息和数据费用" : (t.legal?.sms5 || "Message and data rates may apply")}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
              {isChinaSite
                ? `要退出短信，请回复"停止"。如需帮助，请回复"帮助"或联系 ${contactEmail}。`
                : (t.legal?.smsOptOut || `To opt out of SMS messages, reply STOP to any message. For help, reply HELP or contact ${contactEmail}.`)}
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "国际数据传输" : (t.legal?.internationalTransfers || "International Transfers")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "您的数据可能在您所在国家/地区以外处理。我们在适用情况下使用符合GDPR的保护措施。"
                : (t.legal?.internationalTransfersText || "Your data may be processed outside your country. We use safeguards compliant with GDPR where applicable.")}
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "数据保留" : (t.legal?.dataRetention || "Data Retention")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们仅在以下必要期限内保留数据：" : (t.legal?.keepDataFor || "We keep data only as long as necessary for:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "服务交付" : (t.legal?.retention1 || "Service delivery")}</li>
              <li>{isChinaSite ? "法律合规" : (t.legal?.retention2 || "Legal compliance")}</li>
              <li>{isChinaSite ? "争议解决" : (t.legal?.retention3 || "Dispute resolution")}</li>
            </ul>
          </section>

          {/* Your Rights (GDPR) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "您的权利（GDPR）" : (t.legal?.yourRights || "Your Rights (GDPR)")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "您可以请求：" : (t.legal?.mayRequest || "You may request:")}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "访问您的数据" : (t.legal?.right1 || "Access to your data")}</li>
              <li>{isChinaSite ? "更正数据" : (t.legal?.right2 || "Corrections")}</li>
              <li>{isChinaSite ? "删除数据" : (t.legal?.right3 || "Deletion")}</li>
              <li>{isChinaSite ? "撤回同意" : (t.legal?.right4 || "Withdrawal of consent")}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {isChinaSite ? "请联系我们行使您的权利。" : (t.legal?.contactToExercise || "Contact us to exercise your rights.")}
            </p>
          </section>

          {/* Security */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "安全性" : (t.legal?.security || "Security")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们使用技术和组织措施来保护您的数据，但没有任何系统是100%安全的。"
                : (t.legal?.securityText || "We use technical and organizational measures to protect your data, but no system is 100% secure.")}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系我们" : (t.legal?.contact || "Contact Us")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如果您对本隐私政策有任何疑问或希望行使您的数据权利，请联系我们："
                : "If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:"}
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>{isChinaSite ? "电子邮件：" : "Email:"}</strong>{" "}
                <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contactEmail}</a>
              </li>
              <li>
                <strong>{isChinaSite ? "隐私咨询：" : "Privacy Inquiries:"}</strong>{" "}
                <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contactEmail}</a>
              </li>
              <li>
                <strong>{isChinaSite ? "微信/WhatsApp：" : "WhatsApp:"}</strong>{" "}
                <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a>
              </li>
              <li>
                <strong>{isChinaSite ? "网站：" : "Website:"}</strong>{" "}
                <a href={isChinaSite ? "https://越签.com" : "https://vietnamtravel.help"} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {isChinaSite ? "www.越签.com" : "www.vietnamtravel.help"}
                </a>
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
