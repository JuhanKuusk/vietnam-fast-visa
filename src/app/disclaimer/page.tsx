"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function DisclaimerPage() {
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
            {isChinaSite ? "免责声明" : "Disclaimer"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年2月18日" : "Last updated: February 18, 2026"}
          </p>

          {/* Important Notice Box */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {isChinaSite ? "重要通知" : "Important Notice"}
            </h2>
            <p className="text-red-700 dark:text-red-300 font-medium">
              {isChinaSite ? (
                <>{siteDisplayName} 是一家<strong>私营第三方签证协助服务</strong>。我们<strong>与越南政府、越南移民局或任何政府机构无关</strong>。我们不签发签证 - 所有签证决定均由越南移民当局作出。</>
              ) : (
                <>{siteDisplayName} is a <strong>private, third-party visa assistance service</strong>. We are <strong>NOT affiliated with the Vietnamese Government</strong>, the Vietnam Immigration Department, or any governmental body. We do not issue visas - all visa decisions are made solely by Vietnamese immigration authorities.</>
              )}
            </p>
          </div>

          {/* Official Government Option */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "官方政府渠道" : "Official Government Option"}
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {isChinaSite
                  ? "您可以直接通过越南政府官方网站申请电子签证："
                  : "You can apply for a Vietnam e-Visa directly through the official government website:"}
              </p>
              <a
                href="https://evisa.xuatnhapcanh.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                evisa.xuatnhapcanh.gov.vn
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {isChinaSite
                  ? "政府费用：25美元（单次入境）或50美元（多次入境）| 处理时间：3个工作日"
                  : "Government fee: $25 USD (single entry) or $50 USD (multiple entry) | Processing time: 3 business days"}
              </p>
            </div>
          </section>

          {/* Our Service Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们的服务费用" : "Our Service Fees"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isChinaSite
                ? "我们的价格包括政府费用和我们的服务费。没有隐藏费用。下表显示了30天单次入境电子签证的总价格："
                : "Our prices include both the government fee AND our service fee. There are no hidden charges. The table below shows our total pricing for a single-entry 30-day e-Visa:"}
            </p>

            {/* Fees Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {isChinaSite ? "处理速度" : "Processing Speed"}
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {isChinaSite ? "总价" : "Our Total Price"}
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {isChinaSite ? "含政府费" : "Govt Fee Included"}
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      {isChinaSite ? "服务费" : "Our Service Fee"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-amber-50 dark:bg-amber-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "周末/节假日" : "Weekend / Holiday"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "周末及节假日处理" : "Processing on weekends & holidays"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-amber-600 dark:text-amber-400">
                      {isChinaSite ? "¥1,793" : "$249 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥1,613" : "$224 USD"}
                    </td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "紧急" : "Emergency"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "15-30分钟 + 登机批准" : "15-30 min + Check-In Approval"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-red-600 dark:text-red-400">
                      {isChinaSite ? "¥1,433" : "$199 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥1,253" : "$174 USD"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "加急" : "Urgent"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "1小时（工作时间）" : "1 hour (business hours)"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
                      {isChinaSite ? "¥1,145" : "$159 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥965" : "$134 USD"}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "快速" : "Express"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "4小时" : "4 hours"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
                      {isChinaSite ? "¥857" : "$119 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥677" : "$94 USD"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "快速" : "Express"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "1天" : "1 day"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
                      {isChinaSite ? "¥713" : "$99 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥533" : "$74 USD"}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "快速" : "Express"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "2天" : "2 days"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
                      {isChinaSite ? "¥569" : "$79 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥389" : "$54 USD"}
                    </td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/10">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <strong>{isChinaSite ? "标准" : "Standard"}</strong>
                      <br />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isChinaSite ? "2-3个工作日" : "2-3 business days"}
                      </span>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">
                      {isChinaSite ? "¥353" : "$49 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥180" : "$25 USD"}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                      {isChinaSite ? "¥173" : "$24 USD"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              {isChinaSite
                ? "* 多次入境电子签证总价增加¥180（政府费用差额）。"
                : "* Multiple entry e-Visa adds $25 USD to the total price (government fee difference)."}
            </p>
          </section>

          {/* What Our Service Fee Covers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "我们的服务费包含" : "What Our Service Fee Covers"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "提交前文件审核和验证" : "Document review and verification before submission"}</li>
              <li>{isChinaSite ? "申请表准备和错误更正" : "Application form preparation and error correction"}</li>
              <li>{isChinaSite ? "直接提交至越南移民局" : "Direct submission to Vietnam Immigration Department"}</li>
              <li>{isChinaSite ? "24/7微信和电子邮件客户支持" : "24/7 customer support via WhatsApp and email"}</li>
              <li>{isChinaSite ? "实时申请状态跟踪" : "Real-time application status tracking"}</li>
              <li>{isChinaSite ? "紧急请求加急处理" : "Expedited processing for urgent requests"}</li>
              <li>{isChinaSite ? "紧急情况的登机批准信" : "Check-in approval letter for emergency cases"}</li>
            </ul>
          </section>

          {/* No Guarantee of Visa Approval */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "不保证签证批准" : "No Guarantee of Visa Approval"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们无法保证您的签证申请会被批准。所有签证决定均由越南移民局作出。我们的职责是协助申请流程，确保您的文件完整准确。"
                : "We cannot guarantee that your visa application will be approved. All visa decisions are made solely by the Vietnam Immigration Department. Our role is to assist with the application process and ensure your documentation is complete and accurate."}
            </p>
          </section>

          {/* Information Accuracy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "信息准确性" : "Information Accuracy"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们努力提供准确和最新的信息，但越南移民规则和要求可能会在没有通知的情况下发生变化。出行前请务必核实当前要求。我们不对政府政策或要求的任何变更负责。"
                : "We strive to provide accurate and up-to-date information, but Vietnamese immigration rules and requirements can change without notice. Always verify current requirements before traveling. We are not responsible for any changes in government policies or requirements."}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "责任限制" : "Limitation of Liability"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们不对以下情况负责：" : "We are not liable for:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "越南移民当局的签证拒绝或延误" : "Visa rejections or delays by Vietnamese immigration authorities"}</li>
              <li>{isChinaSite ? "尽管持有有效电子签证，在越南边境被拒绝入境" : "Entry denial at Vietnamese borders despite having a valid e-Visa"}</li>
              <li>{isChinaSite ? "误机、旅行中断或住宿损失" : "Missed flights, travel disruptions, or accommodation losses"}</li>
              <li>{isChinaSite ? "申请人提供的信息错误" : "Errors in information provided by the applicant"}</li>
              <li>{isChinaSite ? "越南政府政策或要求的变更" : "Changes to Vietnamese government policies or requirements"}</li>
              <li>{isChinaSite ? "超出我们合理控制范围的技术问题" : "Technical issues beyond our reasonable control"}</li>
            </ul>
          </section>

          {/* Refund Policy Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "退款政策" : "Refund Policy"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? (
                <>详细退款信息，请参阅我们的<Link href="/refund" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">退款政策</Link>。简要说明：</>
              ) : (
                <>For detailed refund information, please see our{" "}<Link href="/refund" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Refund Policy</Link>. In summary:</>
              )}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>{isChinaSite ? "提交前：" : "Before submission:"}</strong> {isChinaSite ? "可全额退款" : "Full refund available"}</li>
              <li><strong>{isChinaSite ? "提交后：" : "After submission:"}</strong> {isChinaSite ? "政府费用不可退还" : "Government fees are non-refundable"}</li>
              <li><strong>{isChinaSite ? "我方错误：" : "Our error:"}</strong> {isChinaSite ? "如因我方错误导致签证被拒，退还服务费" : "Service fee refunded if visa denied due to our mistake"}</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系我们" : "Contact Us"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如果您对本免责声明或我们的服务有任何疑问："
                : "If you have any questions about this disclaimer or our services:"}
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

          {/* Official Partner Section */}
          <section className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
