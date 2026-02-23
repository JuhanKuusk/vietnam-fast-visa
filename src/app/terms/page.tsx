"use client";

import Link from "next/link";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { useSite } from "@/contexts/SiteContext";

export default function TermsPage() {
  const { siteName, isChinaSite, domain } = useSite();

  // Get site name for text references
  const siteDisplayName = isChinaSite ? "越签.com" : "VietnamTravel.help";

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
            {isChinaSite ? "条款和条件" : "Terms and Conditions"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {siteDisplayName} | {isChinaSite ? "最后更新：2026年2月18日" : "Last updated: February 18, 2026"}
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {isChinaSite
              ? "在访问我们的网站或使用我们的服务之前，请阅读我们的条款和条件。无论如何，当您访问或使用网站和服务的任何部分时，您都受我们的条款和条件约束。"
              : "Please read our Terms and Conditions before accessing our website or using our services. Irrespective thereof, you are subject to our Terms and Conditions when accessing or using any part of the website and the services."}
          </p>

          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "目录" : "Contents"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
              <li>{isChinaSite ? "定义" : "Definition"}</li>
              <li>{isChinaSite ? "条款接受" : "Acceptance of Terms"}</li>
              <li>{isChinaSite ? "修改" : "Modification"}</li>
              <li>{isChinaSite ? "程序" : "Procedure"}</li>
              <li>{isChinaSite ? "文件提交" : "Submission of Documentation"}</li>
              <li>{isChinaSite ? "获取电子签证" : "Obtaining the E-Visa"}</li>
              <li>{isChinaSite ? "电子签证签发条件" : "Conditions for Issuing an Electronic Visa"}</li>
              <li>{isChinaSite ? "费用" : "Fees"}</li>
              <li>{isChinaSite ? "警告/免责声明" : "Warnings / Disclaimers"}</li>
              <li>{isChinaSite ? "一般条款" : "General"}</li>
              <li>{isChinaSite ? "隐私政策" : "Privacy Policy"}</li>
            </ul>
          </div>

          {/* Definition */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "定义" : "Definition"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>{isChinaSite ? "提供商" : "Provider"}</strong> - {siteDisplayName} {isChinaSite ? "是一个电子商务或非政府网站。" : "is an e-commercial or non-government website."}</li>
              <li><strong>{isChinaSite ? "客户" : "Client"}</strong> - {isChinaSite ? "进行销售订单/预订付款的个人或公司。" : "An individual or company who conducts payment of the Sales Order/Booking."}</li>
              <li><strong>{isChinaSite ? "条款和条件" : "Terms and Conditions"}</strong> - {isChinaSite ? "客户与提供商之间的协议，包含一套规范客户和提供商的权利、义务和责任的规定，以及使用提供商服务的条款。" : "An agreement between The Client and The Provider that contains a set of regulations governing the rights, obligations, and responsibilities of The Client and The Provider, as well as the term for using the Provider's services."}</li>
              <li><strong>{isChinaSite ? "服务" : "Services"}</strong> - {isChinaSite ? "提供商向客户提供的所有类型的服务、功能和责任，其条件在本条款和条件中说明。" : "All types of services, functions, responsibilities offered by the Provider to the Client, the conditions of which are stated in this Terms and Conditions."}</li>
              <li><strong>{isChinaSite ? "提供商账户" : "Provider's Account"}</strong> - {isChinaSite ? "提供商为在提供商网站上进行付款/注册流程而建立的账户，在销售订单/预订中提供。" : "An Account established by The Provider for payment/register process at Provider website, provided in Sales Order/Booking."}</li>
              <li><strong>{isChinaSite ? "销售订单/预订" : "Sales Order/Booking"}</strong> - {isChinaSite ? "客户要求提供商执行的服务、功能和/或责任清单，包括「附录」、「发票」或「报价」。" : "A list of services, functions, and/or responsibilities that have been requested by The Client to be executed by The Provider, including \"Addendum\", \"Invoice\" or \"Quotation.\""}</li>
              <li><strong>{isChinaSite ? "政府" : "Government"}</strong> - {isChinaSite ? "任何具有政府权力或准政府权力的机构，包括其国家或地方层面的机关。" : "Any institutions that have governmental authority or quasi-governmental authority, including its organs, be it at national or local level."}</li>
            </ul>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "条款接受" : "Acceptance of Terms"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "请在使用本网站之前仔细阅读这些条款和条件。如果您反对本协议中规定的任何条款和条件，您不应使用网站上的任何产品或服务，并应立即离开。" : "Please read these terms and conditions carefully before using this website. If you object to any of the terms and conditions set out in this agreement, you should not use any of the products or services on the Website and leave immediately."}</li>
              <li>{isChinaSite ? "您同意不将网站用于非法目的，并将遵守所有适用的法律法规。" : "You agree that you shall not use the Website for illegal purposes, and will respect all applicable laws and regulations."}</li>
              <li>{isChinaSite ? "您同意不以可能损害网站性能、损坏内容或以其他方式降低网站整体功能的方式使用网站。" : "You agree not to use the website in a way that may impair the performance, corrupt the content or otherwise reduce the overall functionality of the Website."}</li>
              <li>{isChinaSite ? "您同意不损害网站的安全性或试图访问安全区域或敏感信息。" : "You agree not to compromise the security of the Website or attempt to gain access to secured areas or sensitive information."}</li>
              <li>{isChinaSite ? "您同意对因违反本协议中规定的条款和条件而产生的任何索赔、费用、责任、损失、成本（包括法律费用）承担全部责任。" : "You agree to be fully responsible for any claim, expense, liability, losses, costs including legal fees incurred by us arising from any infringement of the terms and conditions set out in this agreement."}</li>
            </ul>
          </section>

          {/* Modification */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "修改" : "Modification"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{siteDisplayName} {isChinaSite ? "保留在不通知的情况下更改本协议任何部分的权利，您访问本网站将被视为接受本协议。我们建议用户定期查看本协议的条款和条件。" : "reserves the right to change any part of this agreement without notice, and your access to the site will be considered acceptance of this agreement. We advise users to regularly check the Terms and Conditions of this agreement."}</li>
              <li>{isChinaSite ? "我们有完全的自由裁量权修改或删除本网站的任何部分，而不会因此类行为产生警告或责任。" : "We have complete discretion to modify or remove any part of this site without warning or liability arising from such action."}</li>
            </ul>
          </section>

          {/* Procedure */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "程序" : "Procedure"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {siteDisplayName} {isChinaSite
                ? "将尽最大努力为您提供准确的信息，并确保您及时获得所需日期的旅行签证。但是，您应该记住，获得签证的所有要求（文件、费用、时间框架等）是根据一般标准计算的，可能会根据您提供的信息（如当前或以前的国籍、居住地、性别、年龄、职业、近期旅行、宗教等）而有所不同。"
                : "will try our best to provide you with accurate information and ensure that you obtain the visa for your trip for the date required in a timely manner. Nevertheless, you should remember that all requirements to obtain the visa (documentation, fees, time frames, etc.) are calculated based on general criteria and can vary according to information provided by you such as current or previous nationality, residence, gender, age, profession, recent travel, religion, etc."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `另外请注意，签发机构可能会在没有事先通知的情况下更改一般国家要求或要求您提供额外的特定信息。${siteDisplayName}将尽快通知您此类变更。在某些特殊情况下，政府可能需要更新或额外的信息，这可能会将处理时间延长到预期时间框架之外。一旦我们了解到任何此类变更或额外要求，${siteDisplayName}将尽一切合理努力通过电子邮件通知您。`
                : `Also be aware that the issuing authority may change general country requirements or require additional specific information from you without prior notification. ${siteDisplayName} will try to inform you as soon as practicable of such changes. In some special cases, the government may require updated or additional information, which can extend the processing time beyond the expected timeframe. ${siteDisplayName} will make every reasonable effort to notify you via email as soon as we become aware of any such changes or additional requirements.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? `作为我们服务交付流程的一部分，为确保高效和安全的通信，${siteDisplayName}保留生成与您的签证申请相关的临时或系统分配的电子邮件地址的权利。此地址可用于政府网站上您的签证申请之间的内部处理和通信目的。所有关于您签证申请的官方通信——包括更新、文件提交、通知和批准——将通过我们授权的公司电子邮件渠道进行。您同意通过我们系统发送的通信应被视为与您申请相关的所有目的的充分通知。`
                : `As part of our service delivery process, and to ensure efficient and secure communication, ${siteDisplayName} reserves the right to generate a temporary or system-assigned email address associated with your visa application. This address may be used for internal processing and communication purposes between your visa application on the government website. All official correspondence regarding your visa application—including updates, document submissions, notifications, and approvals—will be conducted through our authorized company email channels. You agree that communication sent via our system shall be deemed sufficient notice for all purposes related to your application.`}
            </p>
          </section>

          {/* Submission of Documentation */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "文件提交" : "Submission of Documentation"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "在我们的网站上，您可以查看完成签证所需满足的要求。为确保您始终了解签证状态，当我们收到您的付款时，我们会向您发送一封电子邮件确认您文件的处理时间。请注意，处理时间将从我们收到您的所有必要信息时开始。"
                : "On our website, you can review the requirements that must be met in order to complete your visa. To ensure that you know the status of your visa at all times, you will be sent an email confirming the processing time of your documents when we receive your payment. Please note that the processing time will begin from the moment we have received all required information from you."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {siteDisplayName} {isChinaSite
                ? "只会处理您请求中指定的签证；对于未请求的或与您行程中途停留相关的其他签证，我们不承担任何责任。"
                : "will only process the visa(s) indicated in your request; it assumes no responsibility for other visas required for your trip that have not been requested or which relate to stops on your trip."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? `通过向${siteDisplayName}提交一个或多个处理一个或多个签证的请求，您接受这些条款。在${siteDisplayName}收到您的请求后，我们将向您提供的电子邮件地址发送一封包含所需签证具体条款的电子邮件（签证类型、目的地、时间框架等）。收到您的文件后，您的请求将被验证，${siteDisplayName}将开始签证申请流程。`
                : `By submitting one or more requests to process one or more visas to ${siteDisplayName}, you accept these Terms. After receiving your request(s) at ${siteDisplayName}, we'll send an email with the particular terms of the required visa to the e-mail address provided by you (type of visa, destination, time frame, etc). Your requests will be verified upon receipt of your documentation, and ${siteDisplayName} will then begin the visa application process(s).`}
            </p>
          </section>

          {/* Obtaining the E-Visa */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "获取电子签证" : "Obtaining the E-Visa"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `当${siteDisplayName}向您发送签证批准函时，重要的是您确认已获得旅行所需的所有签证，确认您打算访问的每个国家的签证在您访问该国家/地区的到达和离开日期以及访问原因和性质（旅游、商务等）方面都是有效的。如果您发现文件中有任何差异，您必须立即通过电子邮件通知${siteDisplayName}。`
                : `When ${siteDisplayName} sends you a visa approval letter, it is important that you confirm that all of the visas you need for your travel have been obtained, that visas for each country you intend to visit are valid for the dates of arrival and departure from the country/region of your visit as well as for the reason and nature of your visit (tourism, business, etc.). You must notify ${siteDisplayName} immediately by email if you identify any discrepancy in your documentation.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "签证的签发完全取决于签发机构，每个国家的移民官员有最终决定权允许入境，即使所有规定的要求都已满足。"
                : "The issue of a visa depends exclusively on the issuing authority, and immigration officials in each country have the final decision to admit entry into the country or region, even when all of the stipulated requirements have been met."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {siteDisplayName} {isChinaSite
                ? "不保证签发机构会及时在指定时间范围内签发签证；因此，将收取完成此问题所需程序的费用。"
                : "does not guarantee that the issuing authority will issue the visa in a timely manner and within the specified time frame; therefore, fees will be collected for the completion of procedures required for this issue."} <strong>{isChinaSite ? "在获得所有签证之前，不得购买不可退款的机票或预订。" : "Non-refundable fares or reservations must not be purchased until all visas have been obtained."}</strong>
            </p>
          </section>

          {/* Conditions for Issuing an Electronic Visa */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "电子签证签发条件" : "Conditions for Issuing an Electronic Visa"}
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>{isChinaSite ? "在越南境外的外国人" : "Foreigners outside Vietnam"}</li>
              <li>{isChinaSite ? "护照或有效的国际旅行证件" : "Passport or valid international travel document"}</li>
              <li>{isChinaSite ? "不属于《外国人入境、出境、过境和在越南居留法》第21条规定的暂停入境情形" : "Not falling under the cases of suspension from entry as prescribed in Article 21 of the Law on foreigners' entry, exit, transit, and residence in Vietnam"}</li>
            </ul>
          </section>

          {/* Delivery */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "交付" : "Delivery"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite ? "签发的电子签证将以.pdf格式通过电子邮件和WhatsApp发送。" : "Issued E-Visa's will be sent as .pdf format via email and Whatsapp."}
            </p>
          </section>

          {/* Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "费用" : "Fees"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "付款成功通知邮件将显示我们已收到您的付款。任何因付款失败而产生的问题不在我们的责任范围内。如果我们没有收到您的付款，我们将不会处理您的电子签证。"
                : "An email with notification - Payment Successful will show that we already received your payment. Any problems that result from a failed payment are not our responsibility. If we do not receive payment from you, we will not process your e-visa."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{isChinaSite ? "如果您的电子签证申请被越南移民局拒绝：" : "If your e-visa application is denied by the Vietnam Immigration Department:"}</strong> {isChinaSite ? "我们将退还您支付的服务费。" : "We will refund our service fee you have paid to you."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "您应支付在整个付款过程中由您的银行或金融机构产生的所有银行费用、汇率差异、货币调整、交易费和其他此类费用。"
                : "You shall pay for all bank charges, exchange rate differences, currency adjustments, transaction fees and other such charges incurred by your bank or financial institution(s) throughout the payment process."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isChinaSite
                ? "使用我们的电子签证申请服务时，您需要支付两种类型的费用："
                : "When you use our e-visa application service, you will need to pay two types of fees:"}
            </p>

            {/* Fee Types */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{isChinaSite ? "1. 服务费" : "1. Service Fee"}</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {isChinaSite
                  ? "此费用可能会不时变化，取决于处理的紧急程度，因此价格会有所不同。如果您的签证被拒绝，服务费将被退还。"
                  : "This fee may change from time to time and depends on the urgency of processing, so the price will vary. The service fee will be refunded, if your visa is refused."}
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">{isChinaSite ? "2. 政府费用（国家/官方费用）" : "2. Government Fee (State/Official Fee)"}</h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm mb-2">
                {isChinaSite
                  ? "我们将代您收取并支付此费用。根据电子签证类型："
                  : "We will collect and pay this on your behalf. Depending on the e-visa type:"}
              </p>
              <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>{isChinaSite ? "单次入境签证每人25美元" : "$25 USD per person for a single-entry visa"}</li>
                <li>{isChinaSite ? "多次入境签证每人50美元" : "$50 USD per person for a multiple-entry visa"}</li>
              </ul>
              <p className="text-amber-700 dark:text-amber-300 text-sm mt-2 font-medium">
                {isChinaSite
                  ? "请注意，此费用在签证批准前直接支付给政府，因此即使您的签证被拒绝也不可退款。"
                  : "Please note that this fee is paid directly to the government before the visa is approved, so it is non-refundable even if your visa is refused."}
              </p>
            </div>

            {/* Pricing Table */}
            <div className="mt-6 overflow-x-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                {isChinaSite ? "单次入境30天电子签证服务定价：" : "Service Pricing for Single-Entry 30-Day E-Visa:"}
              </h3>
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">{isChinaSite ? "处理速度" : "Processing Speed"}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">{isChinaSite ? "总价" : "Total Price"}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">{isChinaSite ? "政府费用" : "Government Fee"}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">{isChinaSite ? "服务费" : "Service Fee"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "周末/节假日" : "Weekend/Holiday"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{isChinaSite ? "¥1799" : "$249"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥181" : "$25"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥1618" : "$224"}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "紧急批准（15-30分钟）" : "Emergency approval (15-30 min)"}<br /><span className="text-xs text-gray-500 dark:text-gray-400">{isChinaSite ? "（1-1.5小时签证）" : "(1-1.5 hour visa)"}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{isChinaSite ? "¥1439" : "$199"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥181" : "$25"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥1258" : "$174"}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "快速（4小时）" : "Express (4 hours)"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{isChinaSite ? "¥1006" : "$139"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥181" : "$25"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥825" : "$94"}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "快速（1天）" : "Express (1 day)"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{isChinaSite ? "¥716" : "$99"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥181" : "$25"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥535" : "$74"}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "快速（2天）" : "Express (2 days)"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{isChinaSite ? "¥644" : "$89"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥181" : "$25"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{isChinaSite ? "¥463" : "$54"}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {isChinaSite ? "* 多次入境签证在所有总价基础上加¥181。" : "* Multiple-entry visas add $25 to all totals."}
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {isChinaSite
                ? `一旦${siteDisplayName}代表申请人向相关签发机构提交了旅行证件申请，所有行政和政府费用将被视为不可退款。这包括但不限于任何被视为欺诈的交易。`
                : `Once ${siteDisplayName} has submitted a travel document request to the relevant issuing authority on behalf of the applicant, all administrative and government fees shall be deemed non-refundable. This includes, without limitation, any transactions deemed fraudulent.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {isChinaSite
                ? "请在提交前检查在线申请表上的所有信息。领事费用/行政和政府费用以及服务可用性如有更改，恕不另行通知。我们保留根据客户指定的时间限制选择最佳可用服务的权利。"
                : "Please check all your information on the online application form before submitting it. Consular fees/Admin & Government fee and availability of services are subject to change without notice. We reserve the right to choose the best service available given the time limits that the client has specified."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {isChinaSite
                ? "在我们的系统向您注册的电子邮件地址发送「付款已收到」后，如果您因任何原因决定取消申请或更改任何信息，将不会给予退款，服务将自动继续进行。"
                : "After our system sends the \"Payment received\" to your registered email address, if you decide to cancel your application or change any information for any reason, there won't be a refund granted, and the service will proceed automatically."}
            </p>
          </section>

          {/* Warnings / Disclaimers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "警告/免责声明" : "Warnings / Disclaimers"}
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">{isChinaSite ? "重要通知：" : "Important Notice:"}</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                {siteDisplayName} {isChinaSite
                  ? "不是政府机构，也不隶属于越南移民局。我们是一家独立的商业服务机构，收取签证申请协助费用。"
                  : "is NOT a government agency and is NOT affiliated with the Vietnam Immigration Department. We are an independent commercial service that charges fees for visa application assistance."}
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `签发机构将就签证或护照的类型、签发速度和签发期限做出最终决定。在批准之前，签发机构可能会要求提供额外的文件。签发机构可能因任何原因拒绝任何签证、护照或其他旅行证件申请，并且可能不向${siteDisplayName}提供拒绝原因。`
                : `The issuing authority will make the final determination as to the type of visa or passport, how quickly it will be issued and for what duration it will be issued. Prior to approval, the issuing authority may ask for additional documentation. The issuing authority may reject any visa, passport, or other travel document application for any reason and may not provide a reason to ${siteDisplayName} for the rejection.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `由于${siteDisplayName}不签发签证或护照，不能对任何签发机构是否会签发任何文件做出任何保证或承诺，${siteDisplayName}也不能保证签发机构批准或拒绝申请所需的时间。`
                : `Since ${siteDisplayName} does not issue visas or passports and cannot make any guarantee or assurances that any issuing authority will issue any document, nor can ${siteDisplayName} guarantee the time required for an issuing authority to grant or reject an application.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{isChinaSite ? "在获得旅行所需的所有旅行证件之前，不应购买不可退款的机票或预订。" : "Tickets or reservations that are non-refundable should not be made until all necessary travel documents for your trip have been obtained."}</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {siteDisplayName} {isChinaSite
                ? "不对任何领事馆、大使馆或护照办公室以任何原因延迟或不签发此类申请的行为承担任何责任，也不对因以下原因引起或与之相关的费用和/或延误承担责任："
                : "shall not be held responsible for nor accept any liability for the actions of any consulate, embassy, or passport office in delaying or not issuing such applications for any reason whatsoever, nor shall be held responsible for expense and/or delay arising from or in connection with:"}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 mb-3">
              <li>{isChinaSite ? "不完整的申请表" : "Incomplete application forms"}</li>
              <li>{isChinaSite ? "不正确或虚假填写的申请表" : "Incorrectly or falsely completed application forms"}</li>
              <li>{isChinaSite ? "不准确或不完整的证明文件" : "Inaccurate or incomplete supporting documentation"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `当${siteDisplayName}返回您的结果时，您有责任验证已获得旅行所需的所有签证，确认您打算访问的每个国家的签证在您访问的入境和出境日期有效，确认您的个人详细信息准确反映，以及您的护照在旅行完成后至少有效六个月。`
                : `When ${siteDisplayName} returns your result, it is your responsibility to verify that all the visas you require for your trip have been obtained, that the visas for each country you intend to visit are valid for the entry and exit dates of your visit, that your personal details are reflected accurately, and that your passport is valid for at least six months beyond the completion of your trip.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? `请注意，即使签证已签发，旅客也可能被拒绝入境，因为每个国家的当地移民官员做出最终入境决定。${siteDisplayName}建议所有旅客提前获得签证，而不是试图「落地签」。`
                : `Please note that even when a visa is issued, a traveler may be denied entry since in each country the local immigration officials make the final entry decision. All travelers are advised by ${siteDisplayName} to obtain a visa in advance and not to try to do so "on arrival."`}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? `在法律允许的最大范围内，${siteDisplayName}排除或限制任何直接、间接或后果性损失以及所有法定或隐含的条件和保证，包括但不限于利润损失或旅行或度假费用或因从网站获取的信息而产生的任何损失。根据本条款的其他规定，无论是合同、侵权还是其他原因，我们对因您造成的损失的最大责任应限于您实际支付给${siteDisplayName}的费用中较低者。`
                : `To the maximum extent permitted by law, ${siteDisplayName} excludes or limits any direct, indirect, or consequential loss and all statutory or implied conditions and warranties, including, without limitation, lost profits or travel or holiday costs or any loss arising from information obtained from the Website. Subject to the other provisions of this clause, our maximum liability for loss caused to you whether under contract, tort, or otherwise, shall be limited to the lesser of the fees actually paid by you to ${siteDisplayName}.`}
            </p>
          </section>

          {/* General */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "一般条款" : "General"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "这些条款和条件以及其中明确提及的任何文件构成我们之间的完整协议，并取代我们之间与任何合同主题相关的所有先前讨论、通信、谈判、先前安排、理解或协议。"
                : "These terms and conditions and any document expressly referred to in them constitute the entire agreement between us and supersede all previous discussions, correspondence, negotiations, previous arrangements, understandings, or agreements between us relating to the subject matter of any contract."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如果这些条款的任何规定不符合任何法律，则必须对该规定进行限缩解释，以尽可能使其生效。如果根本无法使该规定生效，则必须将其视为可与条款其余部分分离。"
                : "If any provision of these Terms does not comply with any law, then the provision must be read down so as to give it as much effect as possible. If it is not possible to give the provision any effect at all, then it must be treated as severable from the rest of the Terms."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {siteDisplayName} {isChinaSite
                ? "因超出其合理控制范围的任何情况、事项或事物（「不可抗力」）而无法履行合同项下的任何义务时，将在该等阻止、限制或干扰所造成的范围内免除此类义务。"
                : "is unable to carry out any obligation under the contract due to any circumstance, matter, or thing beyond its reasonable control (\"force majeure\"), shall be excused from such obligations to the extent of such prevention, restriction, or interference so caused."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite
                ? "因本协议引起的任何争议应受越南法律管辖，双方同意接受越南法院的专属管辖权。"
                : "Any dispute arising under this agreement shall be governed by Vietnamese Law, and both parties agree to submit to the exclusive jurisdiction of the courts of Vietnam."}
            </p>
          </section>

          {/* Privacy Policy Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "隐私政策" : "Privacy Policy"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{isChinaSite ? "收集和处理目的：" : "Purpose for collection and processing:"}</strong> {isChinaSite
                ? "当您向我们提供个人信息以完成交易、下订单、交付产品或退回产品时，我们理解您同意我们仅为您的特定原因收集和使用该信息。如果我们出于次要原因（如营销）要求您提供个人信息，我们将直接征求您的同意或为您提供拒绝的机会。"
                : "When you provide us with personal information to complete a transaction, place an order, deliver a product or return a product, we understand that you consent to our collecting it and using it for your specific reasons only. If we ask for your personal information for a secondary reason, like marketing, we will ask you directly for your consent or provide you with an opportunity to say no."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{isChinaSite ? "数据保留时间：" : "How long your data is held for:"}</strong> {isChinaSite
                ? "成功交付服务后，您的个人数据将从我们的系统中删除。仅保留您的姓名、联系方式以及护照号码，用于跟踪您的订单进度和退还您的文件。此个人数据将在服务完成后三十（30）天内销毁，或根据越南政府的约定销毁。"
                : "Your personal data is deleted from our systems after successful service delivery. Only your name and contact details, as well as the passport number, are retained for the purposes of tracking the progress of your order and returning your documents to you. This personal data is destroyed thirty (30) days after services rendered to you are completed, or as agreed to by the Vietnamese Government."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{isChinaSite ? "我们与谁共享您的信息：" : "Who do we share your information with:"}</strong> {isChinaSite
                ? "我们作为授权服务提供商与越南政府共享您的个人信息。未经您的同意，我们不会将您的个人信息共享给第三方。"
                : "We share your personal information with the Vietnamese Government as an authorized service provider. We will not share your personal information to third parties without your consent."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isChinaSite ? "有关完整详情，请查看我们的" : "For complete details, please review our "}<Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">{isChinaSite ? "隐私政策" : "Privacy Policy"}</Link>{isChinaSite ? "。" : "."}
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {isChinaSite ? "联系信息" : "Contact Information"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isChinaSite
                ? "如果您对这些条款和条件有任何疑问，请联系我们："
                : "If you have any questions about these Terms and Conditions, please contact us:"}
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>{isChinaSite ? "电子邮件：" : "Email:"}</strong> <a href="mailto:info@vietnamtravel.help" className="text-blue-600 dark:text-blue-400 hover:underline">info@vietnamtravel.help</a></li>
              <li><strong>{isChinaSite ? "微信/WhatsApp：" : "WhatsApp:"}</strong> <a href="https://wa.me/84705549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 70 5549868</a></li>
              <li><strong>{isChinaSite ? "网站：" : "Website:"}</strong> <a href={isChinaSite ? "https://越签.com" : "https://vietnamtravel.help"} className="text-blue-600 dark:text-blue-400 hover:underline">{isChinaSite ? "www.越签.com" : "www.vietnamtravel.help"}</a></li>
              <li className="pt-2"><strong>{isChinaSite ? "地址：" : "Address:"}</strong> {isChinaSite ? "越南胡志明市平盛郡720A Vinhomes Central Park Park 7大厦38楼" : "Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam"}</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              {isChinaSite
                ? "我们的客户支持团队全天候24/7为您解答任何疑问。"
                : "Our customer support team is available 24/7 to assist you with any inquiries."}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
