"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function RefundPage() {
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
            {isChinaSite ? "退款与取消政策" : "Refund & Cancellation Policy"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年2月18日" : "Last updated: February 18, 2026"}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {isChinaSite
              ? `在${siteDisplayName}，我们致力于提供优质的服务和客户满意度。本政策概述了我们越南电子签证协助服务的退款和取消条款。`
              : `At ${siteDisplayName}, we strive to provide excellent service and customer satisfaction. This policy outlines our refund and cancellation terms for our Vietnam e-Visa assistance services.`}
          </p>

          {/* Understanding Our Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "了解我们的费用" : "Understanding Our Fees"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? "我们的总价由两部分组成：" : "Our total price consists of two components:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>{isChinaSite ? "政府费用（25美元）：" : "Government Fee ($25 USD):"}</strong>{" "}
                {isChinaSite
                  ? "越南移民局收取的官方费用。一旦提交给政府，此费用不可退还。"
                  : "The official fee charged by the Vietnam Immigration Department. This fee is non-refundable once submitted to the government."}
              </li>
              <li>
                <strong>{isChinaSite ? "服务费：" : "Service Fee:"}</strong>{" "}
                {isChinaSite
                  ? "我们的处理和协助费用，根据处理速度而异（从24美元到224美元不等，取决于紧急程度）。"
                  : "Our processing and assistance fee, which varies by processing speed (from $24 to $224 depending on urgency)."}
              </li>
            </ul>
          </section>

          {/* Full Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "可全额退款的情况" : "Full Refund Available"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "在以下情况下，您有资格获得全额退款（包括服务费）："
                : "You are eligible for a full refund (including service fee) in the following cases:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>{isChinaSite ? "提交前取消：" : "Cancellation before submission:"}</strong>{" "}
                {isChinaSite
                  ? "如果您在我们将您的申请提交给越南移民局之前取消订单。"
                  : "If you cancel your order before we submit your application to the Vietnam Immigration Department."}
              </li>
              <li>
                <strong>{isChinaSite ? "我方错误：" : "Our error:"}</strong>{" "}
                {isChinaSite
                  ? "如果您的签证因我方错误（如数据输入错误、提交错误）而被拒绝。"
                  : "If your visa is denied due to an error on our part (e.g., incorrect data entry, wrong submission)."}
              </li>
              <li>
                <strong>{isChinaSite ? "重复付款：" : "Duplicate payment:"}</strong>{" "}
                {isChinaSite
                  ? "如果您因同一订单被意外收取两次费用。"
                  : "If you were accidentally charged twice for the same order."}
              </li>
            </ul>
          </section>

          {/* Partial Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "部分退款（仅限服务费）" : "Partial Refund (Service Fee Only)"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "在以下情况下，您可能会收到服务费退款（政府费用不可退还）："
                : "You may receive a service fee refund (government fee non-refundable) when:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                {isChinaSite
                  ? "您在提交后但批准前取消，且政府费用已支付。"
                  : "You cancel after submission but before approval, and the government fee has already been paid."}
              </li>
              <li>
                {isChinaSite
                  ? "由于我方原因，处理时间大大超过承诺的时间范围。"
                  : "Processing time significantly exceeds the promised timeframe due to issues within our control."}
              </li>
            </ul>
          </section>

          {/* No Refund Scenarios */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "不予退款的情况" : "No Refund Available"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite ? (
                <>在以下情况下<strong>不予退款</strong>：</>
              ) : (
                <>Refunds are <strong>not available</strong> in the following situations:</>
              )}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                <strong>{isChinaSite ? "因申请人原因被拒签：" : "Visa denial due to applicant:"}</strong>{" "}
                {isChinaSite
                  ? "您提供的信息不正确、不符合资格、有犯罪记录、曾有移民违规行为或文件不完整。"
                  : "Incorrect information provided by you, ineligibility, criminal history, previous immigration violations, or incomplete documentation."}
              </li>
              <li>
                <strong>{isChinaSite ? "旅行计划变更：" : "Change of travel plans:"}</strong>{" "}
                {isChinaSite
                  ? "如果您的签证已批准后决定不前往越南。"
                  : "If you decide not to travel to Vietnam after your visa is approved."}
              </li>
              <li>
                <strong>{isChinaSite ? "当局延误：" : "Delays by authorities:"}</strong>{" "}
                {isChinaSite
                  ? "由越南移民局或其他政府机构造成的处理延误。"
                  : "Processing delays caused by the Vietnam Immigration Department or other government agencies."}
              </li>
              <li>
                <strong>{isChinaSite ? "边境入境被拒：" : "Entry denial at border:"}</strong>{" "}
                {isChinaSite
                  ? "尽管持有有效电子签证，但在边境被拒绝入境越南（移民官员有最终裁量权）。"
                  : "Being denied entry into Vietnam despite having a valid e-Visa (immigration officers have final discretion)."}
              </li>
              <li>
                <strong>{isChinaSite ? "签证已批准：" : "Approved visa:"}</strong>{" "}
                {isChinaSite
                  ? "一旦您的电子签证已批准并送达，将不予退款。"
                  : "Once your e-Visa has been approved and delivered, no refunds are available."}
              </li>
            </ul>
          </section>

          {/* Processing Times Note */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "关于处理时间的重要说明" : "Important Note on Processing Times"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "处理时间（15分钟至3个工作日）是基于正常情况的估计。实际处理取决于越南移民局。虽然我们尽一切努力满足规定的时间框架，但我们无法保证具体的交付时间，因为签证批准由越南当局决定。重大延误可能会根据具体情况获得部分退款。"
                : "Processing times (15 minutes to 3 business days) are estimates based on normal conditions. Actual processing depends on the Vietnam Immigration Department. While we make every effort to meet stated timeframes, we cannot guarantee specific delivery times as visa approval is at the discretion of Vietnamese authorities. Significant delays may qualify for partial refunds on a case-by-case basis."}
            </p>
          </section>

          {/* How to Request */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "如何申请退款" : "How to Request a Refund"}
            </h2>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                {isChinaSite ? (
                  <>通过电子邮件 <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contactEmail}</a> 或微信联系我们。</>
                ) : (
                  <>Contact us via email at <a href={`mailto:${contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contactEmail}</a> or WhatsApp.</>
                )}
              </li>
              <li>
                {isChinaSite
                  ? "提供您的订单号/确认邮件和退款原因。"
                  : "Include your order number/confirmation email and reason for refund request."}
              </li>
              <li>
                {isChinaSite
                  ? "我们将在24-48小时内审核您的请求。"
                  : "We will review your request within 24-48 hours."}
              </li>
              <li>
                {isChinaSite
                  ? "如获批准，退款将在5-10个工作日内处理到您的原始付款方式。"
                  : "If approved, refunds are processed within 5-10 business days to your original payment method."}
              </li>
            </ol>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系我们" : "Contact Us"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如需退款请求或对本政策有疑问："
                : "For refund requests or questions about this policy:"}
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

          {/* Customer Support */}
          <section>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "我们的客户支持团队全天候24/7为您服务。"
                : "Our customer support team is available 24/7 to assist you."}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
