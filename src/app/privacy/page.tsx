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
            {isChinaSite ? "隐私政策" : "Privacy Policy"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年3月1日" : "Last updated: March 1, 2026"}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {isChinaSite
              ? `在${siteDisplayName}，我们尊重您的隐私并保护您的个人数据。本隐私政策解释了我们如何收集、使用和保护您的信息。`
              : `At ${siteDisplayName}, we respect your privacy and protect your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.`}
          </p>

          {/* Collection & Purpose */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "信息收集与目的" : "Collection & Purpose"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们收集个人数据以：" : "We collect personal data to:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "在购买产品时为客户提供支持" : "Support customers when buying products"}</li>
              <li>{isChinaSite ? "回答客户咨询" : "Answer customer inquiries"}</li>
              <li>{isChinaSite ? "处理预订和签证申请" : "Process bookings and visa applications"}</li>
              <li>{isChinaSite ? "协调服务交付" : "Coordinate service delivery"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {isChinaSite
                ? "我们收集的信息包括：姓名、电子邮件、电话号码、护照详情、IP地址和网站访问模式。"
                : "Information we collect includes: name, email, phone number, passport details, IP addresses, and website visit patterns."}
            </p>
          </section>

          {/* Data Usage */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "数据使用" : "Data Usage"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "您的信息用于：" : "Your information is used for:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "客户服务和支持" : "Customer service and support"}</li>
              <li>{isChinaSite ? "交付协调" : "Delivery coordination"}</li>
              <li>{isChinaSite ? "调查和促销活动（需征得您的同意）" : "Surveys and promotional activities (with your consent)"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
              {isChinaSite
                ? "我们仅将数据用于已宣布的目的。如果我们需要将使用范围扩展到原始范围之外，我们将通知您。"
                : "We use data only for announced purposes. If we need to expand beyond the original scope, we will notify you."}
            </p>
          </section>

          {/* Data Storage */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "数据存储" : "Data Storage"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "在为您提供服务期间或直到收集目的实现时，我们会保留个人信息。服务完成后，您的个人数据将在三十（30）天内从我们的系统中删除。"
                : "Personal information is retained while providing the service to you or until the purpose of collection is fulfilled. After services are completed, your personal data is deleted from our systems within thirty (30) days."}
            </p>
          </section>

          {/* Access & Sharing */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "访问与共享" : "Access & Sharing"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "您的信息可能被以下方访问：" : "Your information may be accessed by:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "网站管理人员" : "Website administration"}</li>
              <li>{isChinaSite ? "越南当局（用于签证处理）" : "Vietnamese authorities (for visa processing)"}</li>
              <li>{isChinaSite ? "服务交付合作伙伴" : "Service delivery partners"}</li>
              <li>{isChinaSite ? "法定要求时的主管部门" : "Competent authorities when legally required"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4 font-semibold text-green-700 dark:text-green-400">
              {isChinaSite ? "我们绝不出售您的数据。" : "We never sell your data."}
            </p>
          </section>

          {/* SMS/Mobile Communications - A2P 10DLC Required */}
          <section className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "短信/移动通讯" : "SMS/Mobile Communications"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `当您提供手机号码并同意接收来自${siteDisplayName}的短信时：`
                : `When you provide your mobile phone number and opt-in to receive SMS messages from ${siteDisplayName}:`}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "我们仅使用您的手机号码发送签证申请更新、状态通知和重要旅行提醒" : "We use your mobile number solely to send visa application updates, status notifications, and important travel alerts"}</li>
              <li className="font-semibold">{isChinaSite ? "您的手机号码和短信同意绝不会与第三方共享或出售用于营销目的" : "Your mobile phone number and SMS consent will never be shared with or sold to third parties for marketing purposes"}</li>
              <li className="font-semibold">{isChinaSite ? "我们不会与潜在客户生成器或数据经纪人共享您的移动信息" : "We do not share your mobile information with lead generators or data brokers"}</li>
              <li>{isChinaSite ? "消息频率根据您的申请状态而变化" : "Message frequency varies based on your application status"}</li>
              <li>{isChinaSite ? "可能会收取消息和数据费用" : "Message and data rates may apply"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
              {isChinaSite
                ? `要退出短信，请回复"停止"。如需帮助，请回复"帮助"或联系 ${contactEmail}。`
                : `To opt out of SMS messages, reply STOP to any message. For help, reply HELP or contact ${contactEmail}.`}
            </p>
          </section>

          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "您的权利" : "Your Rights"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "您可以：" : "You may:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "自行检查、更新、更正或删除您的任何信息" : "Self-check, update, correct, or remove any of your information"}</li>
              <li>{isChinaSite ? "通过您的账户或联系管理员行使这些权利" : "Exercise these rights through your account or by contacting administration"}</li>
              <li>{isChinaSite ? "请求访问我们持有的关于您的数据" : "Request access to data we hold about you"}</li>
              <li>{isChinaSite ? "撤回对数据处理的同意" : "Withdraw consent for data processing"}</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "数据保护" : "Data Protection"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们承诺采取安全措施保护您的数据。但是，我们不保证能够防止所有未经授权的访问。没有任何系统是100%安全的。"
                : "We commit to security measures to protect your data. However, we do not guarantee to prevent all unauthorized access. No system is 100% secure."}
            </p>
          </section>

          {/* Complaint Process */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "投诉流程" : "Complaint Process"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? `如果您对信息披露有任何疑虑，请通过电子邮件 ${contactEmail} 报告。我们将在七天内处理您的问题。`
                : `If you have concerns about information disclosure, please report to ${contactEmail}. We will process your concern within seven days.`}
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系我们" : "Contact Us"}
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

          {/* Policy Updates */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "政策更新" : "Policy Updates"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们保留修改条款的权利，并将在我们的网站上更新任何变更。"
                : "We reserve the right to modify terms and will update any changes on our website."}
            </p>
          </section>

          {/* Official Partner Section */}
          <section className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "官方合作伙伴" : "Official Partner"}
            </h2>
            <p className="text-amber-600 dark:text-amber-400 font-semibold mb-2">
              CONG TY CO PHAN CONG NGHE DU LICH BESTPRICE
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {isChinaSite
                ? "营业执照号：0104679428 - 签发日期：2010年5月26日 - 河内投资规划局 | 旅行社许可证号：01-1794/2022/SDL-GPLHND"
                : "Business License: 0104679428 - Issued: May 26, 2010 - Hanoi DPI | Tour Operator License: 01-1794/2022/SDL-GPLHND"}
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
