"use client";

import Link from "next/link";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/ui/footer";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="md" />
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
            Terms and Conditions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            VietnamVisaHelp.com | Last updated: January 29, 2026
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Please read our Terms and Conditions before accessing our website or using our services. Irrespective thereof, you are subject to our Terms and Conditions when accessing or using any part of the website and the services.
          </p>

          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contents</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
              <li>Definition</li>
              <li>Acceptance of Terms</li>
              <li>Modification</li>
              <li>Procedure</li>
              <li>Submission of Documentation</li>
              <li>Obtaining the E-Visa</li>
              <li>Conditions for Issuing an Electronic Visa</li>
              <li>Additional Services</li>
              <li>Fees</li>
              <li>Warnings / Disclaimers</li>
              <li>General</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Definition */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Definition
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li><strong>Provider</strong> - VietnamVisaHelp.com is an e-commercial or non-government website.</li>
              <li><strong>Client</strong> - An individual or company who conducts payment of the Sales Order/Booking.</li>
              <li><strong>Terms and Conditions</strong> - An agreement between The Client and The Provider that contains a set of regulations governing the rights, obligations, and responsibilities of The Client and The Provider, as well as the term for using the Provider&apos;s services.</li>
              <li><strong>Services</strong> - All types of services, functions, responsibilities offered by the Provider to the Client, the conditions of which are stated in this Terms and Conditions.</li>
              <li><strong>Provider&apos;s Account</strong> - An Account established by The Provider for payment/register process at Provider website, provided in Sales Order/Booking.</li>
              <li><strong>Sales Order/Booking</strong> - A list of services, functions, and/or responsibilities that have been requested by The Client to be executed by The Provider, including &quot;Addendum&quot;, &quot;Invoice&quot; or &quot;Quotation.&quot;</li>
              <li><strong>Government</strong> - Any institutions that have governmental authority or quasi-governmental authority, including its organs, be it at national or local level.</li>
            </ul>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Acceptance of Terms
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Please read these terms and conditions carefully before using this website. If you object to any of the terms and conditions set out in this agreement, you should not use any of the products or services on the Website and leave immediately.</li>
              <li>You agree that you shall not use the Website for illegal purposes, and will respect all applicable laws and regulations.</li>
              <li>You agree not to use the website in a way that may impair the performance, corrupt the content or otherwise reduce the overall functionality of the Website.</li>
              <li>You agree not to compromise the security of the Website or attempt to gain access to secured areas or sensitive information.</li>
              <li>You agree to be fully responsible for any claim, expense, liability, losses, costs including legal fees incurred by us arising from any infringement of the terms and conditions set out in this agreement.</li>
            </ul>
          </section>

          {/* Modification */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Modification
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>VietnamVisaHelp.com reserves the right to change any part of this agreement without notice, and your access to the site will be considered acceptance of this agreement. We advise users to regularly check the Terms and Conditions of this agreement.</li>
              <li>We have complete discretion to modify or remove any part of this site without warning or liability arising from such action.</li>
            </ul>
          </section>

          {/* Procedure */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Procedure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              VietnamVisaHelp.com will try our best to provide you with accurate information and ensure that you obtain the visa for your trip for the date required in a timely manner. Nevertheless, you should remember that all requirements to obtain the visa (documentation, fees, time frames, etc.) are calculated based on general criteria and can vary according to information provided by you such as current or previous nationality, residence, gender, age, profession, recent travel, religion, etc.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Also be aware that the issuing authority may change general country requirements or require additional specific information from you without prior notification. VietnamVisaHelp.com will try to inform you as soon as practicable of such changes. In some special cases, the government may require updated or additional information, which can extend the processing time beyond the expected timeframe. VietnamVisaHelp.com will make every reasonable effort to notify you via email as soon as we become aware of any such changes or additional requirements.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              As part of our service delivery process, and to ensure efficient and secure communication, VietnamVisaHelp.com reserves the right to generate a temporary or system-assigned email address associated with your visa application. This address may be used for internal processing and communication purposes between your visa application on the government website. All official correspondence regarding your visa application—including updates, document submissions, notifications, and approvals—will be conducted through our authorized company email channels. You agree that communication sent via our system shall be deemed sufficient notice for all purposes related to your application.
            </p>
          </section>

          {/* Submission of Documentation */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Submission of Documentation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              On our website, you can review the requirements that must be met in order to complete your visa. To ensure that you know the status of your visa at all times, you will be sent an email confirming the processing time of your documents when we receive your payment. Please note that the processing time will begin from the moment we have received all required information from you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              VietnamVisaHelp.com will only process the visa(s) indicated in your request; it assumes no responsibility for other visas required for your trip that have not been requested or which relate to stops on your trip.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By submitting one or more requests to process one or more visas to VietnamVisaHelp.com, you accept these Terms. After receiving your request(s) at VietnamVisaHelp.com, we&apos;ll send an email with the particular terms of the required visa to the e-mail address provided by you (type of visa, destination, time frame, etc). Your requests will be verified upon receipt of your documentation, and VietnamVisaHelp.com will then begin the visa application process(s).
            </p>
          </section>

          {/* Obtaining the E-Visa */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Obtaining the E-Visa
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              When VietnamVisaHelp.com sends you a visa approval letter, it is important that you confirm that all of the visas you need for your travel have been obtained, that visas for each country you intend to visit are valid for the dates of arrival and departure from the country/region of your visit as well as for the reason and nature of your visit (tourism, business, etc.). You must notify VietnamVisaHelp.com immediately by email if you identify any discrepancy in your documentation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The issue of a visa depends exclusively on the issuing authority, and immigration officials in each country have the final decision to admit entry into the country or region, even when all of the stipulated requirements have been met.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              VietnamVisaHelp.com does not guarantee that the issuing authority will issue the visa in a timely manner and within the specified time frame; therefore, VietnamVisaHelp.com fees will be collected for the completion of procedures required for this issue. <strong>Non-refundable fares or reservations must not be purchased until all visas have been obtained.</strong>
            </p>
          </section>

          {/* Conditions for Issuing an Electronic Visa */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Conditions for Issuing an Electronic Visa
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Foreigners outside Vietnam</li>
              <li>Passport or valid international travel document</li>
              <li>Not falling under the cases of suspension from entry as prescribed in Article 21 of the Law on foreigners&apos; entry, exit, transit, and residence in Vietnam</li>
            </ul>
          </section>

          {/* Delivery */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Delivery
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Documents will be sent via email as usual, but in some cases, you will be required to send us hard copies of documents to submit to the Vietnam Immigration Department for review. You will send the required documents to our office. A delivery charge will be your responsibility.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              All third-party delivery companies are subject to the conditions set by these individual companies. VietnamVisaHelp.com accepts no liability for losses or delays incurred when using third-party delivery companies. An extra fee will be charged if we do not have enough time to process your visa in the normal processing time. To ensure that the document arrives at our offices on time, you must select quick delivery.
            </p>
          </section>

          {/* Additional Services */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Additional Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              VietnamVisaHelp.com may offer to provide additional services in some jurisdictions e.g. Fast-track Service at the airport, Emergency Document Service, Car pick-up service, ESim service. If so, the description and relevant terms for those additional services are available on the Website via the Service Directory and are incorporated into these terms.
            </p>
          </section>

          {/* Fees */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Fees
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              An email with the title &quot;Application #ID: Your booking is confirmed - Payment Successful&quot; will show that we already received your payment. We will send you an email with the subject &quot;Application #ID: Your booking is confirmed - Payment Remind&quot; if your payment failed and instructs you to try again using a different payment method. Any problems that result from a failed payment are not our responsibility. If we do not receive payment from you, we will not process your visa.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>If your visa is denied by the Vietnam Immigration Department:</strong> We will refund half of the service fee you have paid to you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You shall pay for all bank charges, exchange rate differences, currency adjustments, transaction fees and other such charges incurred by your bank or financial institution(s) throughout the payment process.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you use our visa application service, you will need to pay two types of fees:
            </p>

            {/* Fee Types */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">1. Service Fee</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                This fee may change from time to time and depends on the urgency of processing, so the price will vary. The service fee will be partially refunded (50%) if your visa is refused.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">2. Government Fee (State/Official Fee)</h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm mb-2">
                We will collect and pay this on your behalf. Depending on the visa type:
              </p>
              <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>$25 USD per person for a single-entry visa</li>
                <li>$50 USD per person for a multiple-entry visa</li>
              </ul>
              <p className="text-amber-700 dark:text-amber-300 text-sm mt-2 font-medium">
                Please note that this fee is paid directly to the government before the visa is approved, so it is non-refundable even if your visa is refused.
              </p>
            </div>

            {/* Pricing Table */}
            <div className="mt-6 overflow-x-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Service Pricing for Single-Entry 30-Day E-Visa:
              </h3>
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Processing Speed</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Total Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Government Fee</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">Service Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Weekend/Holiday</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$249</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$224</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Emergency (15-30 min)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$199</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$174</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Urgent (1 hour)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$159</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$134</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (4 hours)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$119</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$94</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (1 day)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$99</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$74</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Express (2 days)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$79</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$54</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Standard (2-3 business days)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">$49</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$25</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">$24</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                * Multiple-entry visas add $25 to all totals.
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Once VietnamVisaHelp.com has submitted a travel document request to the relevant issuing authority on behalf of the applicant, all administrative and government fees shall be deemed non-refundable. This includes, without limitation, any transactions deemed fraudulent.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Please check all your information on the online application form before submitting it. An extra fee will be charged if you want to change any information related to your visa application form online.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Consular fees/Admin &amp; Government fee and availability of services are subject to change without notice. We reserve the right to choose the best service available given the time limits that the client has specified.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              After our system sends the &quot;Processing Notification&quot; to your registered email address, if you decide to cancel your application or change any information for any reason, there won&apos;t be a refund granted, and the service will proceed automatically.
            </p>
          </section>

          {/* Warnings / Disclaimers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Warnings / Disclaimers
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">Important Notice:</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                VietnamVisaHelp.com is NOT a government agency and is NOT affiliated with the Vietnam Immigration Department. We are an independent commercial service that charges fees for visa application assistance.
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The issuing authority will make the final determination as to the type of visa or passport, how quickly it will be issued and for what duration it will be issued. Prior to approval, the issuing authority may ask for additional documentation. The issuing authority may reject any visa, passport, or other travel document application for any reason and may not provide a reason to VietnamVisaHelp.com for the rejection.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Since VietnamVisaHelp.com does not issue visas or passports and cannot make any guarantee or assurances that any issuing authority will issue any document, nor can VietnamVisaHelp.com guarantee the time required for an issuing authority to grant or reject an application.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Tickets or reservations that are non-refundable should not be made until all necessary travel documents for your trip have been obtained.</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              VietnamVisaHelp.com shall not be held responsible for nor accept any liability for the actions of any consulate, embassy, or passport office in delaying or not issuing such applications for any reason whatsoever, nor shall VietnamVisaHelp.com be held responsible for expense and/or delay arising from or in connection with:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 mb-3">
              <li>Incomplete application forms</li>
              <li>Incorrectly or falsely completed application forms</li>
              <li>Inaccurate or incomplete supporting documentation</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              When VietnamVisaHelp.com returns your result, it is your responsibility to verify that all the visas you require for your trip have been obtained, that the visas for each country you intend to visit are valid for the entry and exit dates of your visit, that your personal details are reflected accurately, and that your passport is valid for at least six months beyond the completion of your trip.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Please note that even when a visa is issued, a traveler may be denied entry since in each country the local immigration officials make the final entry decision. All travelers are advised by VietnamVisaHelp.com to obtain a visa in advance and not to try to do so &quot;on arrival.&quot;
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              To the maximum extent permitted by law, VietnamVisaHelp.com excludes or limits any direct, indirect, or consequential loss and all statutory or implied conditions and warranties, including, without limitation, lost profits or travel or holiday costs or any loss arising from information obtained from the Website. Subject to the other provisions of this clause, our maximum liability for loss caused to you whether under contract, tort, or otherwise, shall be limited to the lesser of the fees actually paid by you to VietnamVisaHelp.com.
            </p>
          </section>

          {/* General */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              General
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              These terms and conditions and any document expressly referred to in them constitute the entire agreement between us and supersede all previous discussions, correspondence, negotiations, previous arrangements, understandings, or agreements between us relating to the subject matter of any contract.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If any provision of these Terms does not comply with any law, then the provision must be read down so as to give it as much effect as possible. If it is not possible to give the provision any effect at all, then it must be treated as severable from the rest of the Terms.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Where VietnamVisaHelp.com is unable to carry out any obligation under the contract due to any circumstance, matter, or thing beyond its reasonable control (&quot;force majeure&quot;), VietnamVisaHelp.com shall be excused from such obligations to the extent of such prevention, restriction, or interference so caused.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Any dispute arising under this agreement shall be governed by Vietnamese Law, and both parties agree to submit to the exclusive jurisdiction of the courts of Vietnam.
            </p>
          </section>

          {/* Privacy Policy Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Purpose for collection and processing:</strong> When you provide us with personal information to complete a transaction, place an order, deliver a product or return a product, we understand that you consent to our collecting it and using it for your specific reasons only. If we ask for your personal information for a secondary reason, like marketing, we will ask you directly for your consent or provide you with an opportunity to say no.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>How long your data is held for:</strong> Your personal data is deleted from our systems after successful service delivery. Only your name and contact details, as well as the passport number, are retained for the purposes of tracking the progress of your order and returning your documents to you. This personal data is destroyed thirty (30) days after services rendered to you are completed, or as agreed to by the Vietnamese Government.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Who do we share your information with:</strong> We share your personal information with the Vietnamese Government as an authorized service provider. We will not share your personal information to third parties without your consent.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              For complete details, please review our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:support@vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@vietnamvisahelp.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/841205549868" className="text-blue-600 dark:text-blue-400 hover:underline">+84 120 554 9868</a></li>
              <li><strong>Website:</strong> <a href="https://vietnamvisahelp.com" className="text-blue-600 dark:text-blue-400 hover:underline">www.vietnamvisahelp.com</a></li>
              <li className="pt-2"><strong>Address:</strong> Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City, Vietnam</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Our customer support team is available 24/7 to assist you with any inquiries.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
