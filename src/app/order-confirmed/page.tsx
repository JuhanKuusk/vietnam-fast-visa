"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SparklesCore } from "@/components/ui/sparkles";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Applicant {
  id: string;
  full_name: string;
  nationality: string;
  passport_number: string;
  date_of_birth: string;
  gender: string;
}

interface Application {
  id: string;
  reference_number: string;
  email: string;
  whatsapp: string;
  entry_date: string;
  exit_date: string;
  entry_port: string;
  visa_speed: string | null;
  status: string;
  payment_status: string;
  amount_usd: number;
  created_at: string;
}

interface PaymentInfo {
  amount: number;
  currency: string;
  status: string;
  email: string | null;
}

interface OrderData {
  application: Application;
  applicants: Applicant[];
  payment: PaymentInfo;
}

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentIntent = searchParams.get("payment_intent");
  const { t } = useLanguage();

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(90 * 60);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        let url = "/api/order-details?";
        if (sessionId) {
          url += `session_id=${sessionId}`;
        } else if (paymentIntent) {
          url += `payment_intent=${paymentIntent}`;
        } else {
          const applicationId = sessionStorage.getItem("applicationId");
          if (applicationId) {
            url += `application_id=${applicationId}`;
          } else {
            setError("No order information found");
            setLoading(false);
            return;
          }
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setOrderData(data);
        }
      } catch {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId, paymentIntent]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getVisaSpeedLabel = (speed: string | null) => {
    const speeds: Record<string, string> = {
      "30-min": t.orderConfirmation.serviceType30Min,
      "4-hour": t.orderConfirmation.serviceType4Hour,
      "1-day": t.orderConfirmation.serviceType1Day,
      "2-day": t.orderConfirmation.serviceType2Day,
      weekend: t.orderConfirmation.serviceTypeWeekend,
    };
    return speed ? speeds[speed] || speed : t.orderConfirmation.serviceTypeStandard;
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "3725035137";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-400">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">!</div>
          <h1 className="text-2xl font-bold text-white mb-4">{t.orderConfirmation.orderNotFound}</h1>
          <p className="text-gray-400 mb-6">
            {error || t.orderConfirmation.orderNotFoundDesc}
          </p>
          <div className="space-y-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I need help finding my order.`}
              className="block w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              {t.common.contactSupport}
            </a>
            <a
              href="/"
              className="block w-full py-3 px-6 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              {t.common.backToHome}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { application, applicants, payment } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-5 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <a href="/" className="hover:opacity-90 transition-opacity">
          <Logo size="md" variant="light" />
        </a>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            {t.header.supportShort}
          </a>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      <main className="px-5 pb-24">
        {/* Success Section */}
        <section className="max-w-lg mx-auto text-center py-10 relative">
          <div className="absolute inset-0 w-full h-full">
            <SparklesCore
              id="confirmation-sparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={60}
              particleColor="#10b981"
              particleSpeed={0.3}
            />
          </div>

          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
              <span className="text-5xl">✓</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.orderConfirmation.thankYouTitle}
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              {t.orderConfirmation.processingMessage}
            </p>

            {/* Countdown Timer */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-8">
              <p className="text-base text-gray-400 mb-2">{t.orderConfirmation.estimatedDelivery}</p>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono">
                {formatTime(countdown)}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t.orderConfirmation.deliveryNote}
              </p>
            </div>
          </div>
        </section>

        {/* Order Details Card */}
        <section className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            <div className="p-6 space-y-6">
              {/* Reference Number */}
              <div className="text-center p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <p className="text-base text-gray-400 mb-2">{t.orderConfirmation.referenceNumber}</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono">
                  {application.reference_number}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {t.orderConfirmation.saveReference}
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-xl p-5 space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>{t.orderConfirmation.orderSummary}</span>
                </h3>

                <div className="grid grid-cols-2 gap-4 text-base">
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.serviceType}</p>
                    <p className="text-white font-medium">{getVisaSpeedLabel(application.visa_speed)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.totalPaid}</p>
                    <p className="text-emerald-400 font-bold text-lg">
                      {payment ? formatAmount(payment.amount, payment.currency) : `$${application.amount_usd}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.entryDate}</p>
                    <p className="text-white">{formatDate(application.entry_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.exitDate}</p>
                    <p className="text-white">{formatDate(application.exit_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.entryPort}</p>
                    <p className="text-white">{application.entry_port}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t.orderConfirmation.applicantsCount}</p>
                    <p className="text-white">{applicants?.length || 1} {t.orderConfirmation.persons}</p>
                  </div>
                </div>
              </div>

              {/* Applicant Details */}
              {applicants && applicants.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{t.orderConfirmation.applicantDetails}</h3>
                  {applicants.map((applicant, index) => (
                    <div
                      key={applicant.id}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold text-white">{applicant.full_name}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">{t.orderConfirmation.nationality}</p>
                          <p className="text-white">{applicant.nationality}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{t.orderConfirmation.passportNumber}</p>
                          <p className="text-white font-mono">{applicant.passport_number}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{t.orderConfirmation.dateOfBirth}</p>
                          <p className="text-white">{formatDate(applicant.date_of_birth)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{t.orderConfirmation.gender}</p>
                          <p className="text-white capitalize">{applicant.gender}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Information */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-lg text-blue-400 mb-3">{t.orderConfirmation.deliveryInfo}</h3>
                <div className="space-y-2 text-base">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">@</span>
                    <div>
                      <p className="text-gray-500 text-sm">{t.orderConfirmation.email}</p>
                      <p className="text-white">{application.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-green-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">{t.orderConfirmation.whatsApp}</p>
                      <p className="text-white">{application.whatsapp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">{t.orderConfirmation.applicationStatus}</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">{t.orderConfirmation.paymentReceived}</p>
                      <p className="text-base text-gray-400">{t.orderConfirmation.justNow}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <span className="text-white text-lg">...</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">{t.orderConfirmation.processingVisa}</p>
                      <p className="text-base text-gray-400">{t.orderConfirmation.inProgress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-lg">o</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-400 text-lg">{t.orderConfirmation.visaApproved}</p>
                      <p className="text-base text-gray-500">{t.orderConfirmation.pending}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-lg">o</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-400 text-lg">{t.orderConfirmation.deliveredViaEmailWhatsApp}</p>
                      <p className="text-base text-gray-500">{t.orderConfirmation.pending}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-lg text-amber-400 mb-3">{t.orderConfirmation.whatHappensNext}</h3>
                <ul className="space-y-2 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    {t.orderConfirmation.step1}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    {t.orderConfirmation.step2}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    {t.orderConfirmation.step3} {application.email}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">4.</span>
                    {t.orderConfirmation.step4}
                  </li>
                </ul>
              </div>

              {/* Contact Support */}
              <div className="text-center space-y-4">
                <p className="text-base text-gray-400">
                  {t.common.questionsContact}
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi, I need help with my visa application. Reference: ${application.reference_number}`}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-400 rounded-xl font-semibold text-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.common.chatOnWhatsApp}
                </a>
              </div>

              {/* Back to Home */}
              <div className="text-center pt-4">
                <a
                  href="/"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {t.common.backToHome}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi, I need help with my visa application. Reference: ${application.reference_number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export default function OrderConfirmedPage() {
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-emerald-400 text-xl">{t.common.loading}</div>
        </div>
      }
    >
      <OrderConfirmedContent />
    </Suspense>
  );
}
