"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";
import { Footer } from "@/components/ui/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSite } from "@/contexts/SiteContext";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function CheckoutForm({
  clientSecret,
  totalPrice,
  isZH,
  formatPrice,
}: {
  clientSecret: string;
  totalPrice: number;
  isZH: boolean;
  formatPrice: (price: number) => string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmed`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || (isZH ? "支付失败" : "Payment failed"));
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful, redirect to order-confirmed
      router.push(`/order-confirmed?payment_intent=${paymentIntent.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white/10 rounded-xl p-4">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400 text-center">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {isZH ? "处理中..." : "Processing..."}
          </span>
        ) : (
          isZH ? `支付 ${formatPrice(totalPrice)}` : `Pay $${totalPrice} USD`
        )}
      </button>
    </form>
  );
}

// Visa speed options with pricing and descriptions for payment page
type VisaSpeedKey = "30-min" | "4-hour" | "1-day" | "2-day" | "weekend";

const VISA_SPEED_INFO: Record<VisaSpeedKey, {
  name: string;
  nameZH: string;
  description: string;
  descriptionZH: string;
  price: number;
}> = {
  "30-min": {
    name: "URGENT 30-Minute Express Visa",
    nameZH: "紧急30分钟快速签证",
    description: "Check-in approval letter delivered within 30 minutes via email & WhatsApp",
    descriptionZH: "30分钟内通过邮件和WhatsApp发送登机批准函",
    price: 199,
  },
  "4-hour": {
    name: "4-Hour Express Visa",
    nameZH: "4小时快速签证",
    description: "E-Visa delivered within 4 hours via email & WhatsApp",
    descriptionZH: "4小时内通过邮件和WhatsApp发送电子签证",
    price: 139,
  },
  "1-day": {
    name: "1-Day Standard Visa",
    nameZH: "1天标准签证",
    description: "E-Visa delivered within 1 business day via email & WhatsApp",
    descriptionZH: "1个工作日内通过邮件和WhatsApp发送电子签证",
    price: 99,
  },
  "2-day": {
    name: "2-Day Economy Visa",
    nameZH: "2天经济签证",
    description: "E-Visa delivered within 2 business days via email & WhatsApp",
    descriptionZH: "2个工作日内通过邮件和WhatsApp发送电子签证",
    price: 89,
  },
  "weekend": {
    name: "Weekend & Holiday Visa",
    nameZH: "周末及节假日签证",
    description: "E-Visa delivered same day (weekends/holidays) via email & WhatsApp",
    descriptionZH: "周末/节假日当天通过邮件和WhatsApp发送电子签证",
    price: 249,
  },
};

function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { formatSitePrice } = useSite();
  const isZH = language === "ZH";

  const applicantCount = Number(searchParams.get("applicants")) || 1;
  const referenceNumber = searchParams.get("ref");
  const speedParam = searchParams.get("speed") as VisaSpeedKey | null;
  const visaSpeed = speedParam && VISA_SPEED_INFO[speedParam] ? speedParam : "30-min";
  const speedInfo = VISA_SPEED_INFO[visaSpeed];
  const pricePerPerson = speedInfo.price;
  const totalPrice = pricePerPerson * applicantCount;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "alipay" | "wechat" | "paypal" | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Helper function for price formatting
  const formatPrice = (price: number) => formatSitePrice(price);

  useEffect(() => {
    // Get application ID from session storage
    const applicationId = sessionStorage.getItem("applicationId");

    if (!applicationId) {
      setError(isZH ? "未找到申请。请重新开始您的申请。" : "No application found. Please start your application again.");
      setIsLoading(false);
      return;
    }

    // Create payment intent when Stripe, Alipay, or WeChat is selected
    if (paymentMethod === "stripe" || paymentMethod === "alipay" || paymentMethod === "wechat") {
      // Determine payment method types based on selection
      const paymentMethodTypes = paymentMethod === "alipay"
        ? ["alipay"]
        : paymentMethod === "wechat"
          ? ["wechat_pay"]
          : ["card"];

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          referenceNumber,
          paymentMethodTypes,
          currency: isZH ? "cny" : "usd"
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setClientSecret(data.clientSecret);
          }
        })
        .catch(() => {
          setError(isZH ? "初始化支付失败" : "Failed to initialize payment");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [paymentMethod, referenceNumber, isZH]);

  // Demo mode: allow proceeding without Stripe keys
  const handleDemoPayment = () => {
    sessionStorage.setItem("paymentComplete", "true");
    router.push("/order-confirmed");
  };

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
            href="https://wa.me/84705549868"
            className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            {isZH ? "需要帮助？" : "Need help?"}
          </a>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      <main className="px-5 pb-24">
        {/* Progress Steps */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                ✓
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">
                {isZH ? "行程详情" : "Trip Details"}
              </span>
            </div>
            <div className="w-10 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                ✓
              </div>
              <span className="text-base text-gray-400 hidden sm:inline">
                {isZH ? "您的信息" : "Your Information"}
              </span>
            </div>
            <div className="w-10 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-base font-bold">
                3
              </div>
              <span className="text-base text-white hidden sm:inline">
                {isZH ? "支付" : "Payment"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <section className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            {/* Header */}
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-5">
              <h2 className="text-xl font-semibold text-emerald-400">
                {isZH ? "安全支付" : "Secure Payment"}
              </h2>
              <p className="text-base text-gray-400 mt-1">
                {isZH ? "您的支付受SSL加密保护" : "Your payment is protected by SSL encryption"}
              </p>
              {referenceNumber && (
                <p className="text-sm text-emerald-300 mt-2">
                  {isZH ? "参考号：" : "Reference: "}{referenceNumber}
                </p>
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-white/5 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-lg text-white">
                  {isZH ? "订单摘要" : "Order Summary"}
                </h3>
                <div className="flex justify-between text-base text-gray-400">
                  <span>{isZH ? speedInfo.nameZH : speedInfo.name}</span>
                  <span>{formatPrice(pricePerPerson)}/{isZH ? "人" : "person"}</span>
                </div>
                <div className="flex justify-between text-base text-gray-400">
                  <span>{isZH ? "申请人数" : "Number of applicants"}</span>
                  <span>× {applicantCount}</span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>{isZH ? "总计" : "Total"}</span>
                    <span className="text-emerald-400">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex items-center gap-4 p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                <div className="text-4xl">⚡</div>
                <div>
                  <div className="font-bold text-emerald-400 text-lg">
                    {isZH ? "快速处理" : "Fast Processing"}
                  </div>
                  <div className="text-base text-gray-400">
                    {isZH ? speedInfo.descriptionZH : speedInfo.description}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-center">{error}</p>
                  <a
                    href="/"
                    className="block text-center text-emerald-400 hover:text-emerald-300 mt-2"
                  >
                    {isZH ? "开始新申请" : "Start New Application"}
                  </a>
                </div>
              )}

              {!error && (
                <>
                  {/* Terms and Conditions Checkbox */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900"
                      />
                      <span className="text-sm text-gray-300 leading-relaxed">
                        {isZH ? (
                          <>
                            我确认所提供的所有信息准确无误，并同意{" "}
                            <a href="/terms" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              使用条款
                            </a>
                            、{" "}
                            <a href="/privacy" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              隐私政策
                            </a>
                            和{" "}
                            <a href="/refund" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              退款政策
                            </a>
                            。我了解越签.com不是政府机构，不保证签证获批。
                          </>
                        ) : (
                          <>
                            I confirm that all information provided is accurate, and I agree to the{" "}
                            <a href="/terms" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              Terms of Use
                            </a>
                            ,{" "}
                            <a href="/privacy" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              Privacy Policy
                            </a>
                            , and{" "}
                            <a href="/refund" target="_blank" className="text-emerald-400 hover:text-emerald-300 underline">
                              Refund Policy
                            </a>
                            . I understand that VietnamVisaHelp.com is not a government agency and does not guarantee visa approval.
                          </>
                        )}
                      </span>
                    </label>
                  </div>

                  {/* Payment Method Selection */}
                  <div className={!termsAccepted ? "opacity-50 pointer-events-none" : ""}>
                    <label className="block text-base font-medium text-gray-300 mb-4">
                      {isZH ? "选择支付方式" : "Select Payment Method"}
                    </label>

                    {/* Chinese Payment Methods */}
                    {isZH && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <button
                          onClick={() => setPaymentMethod("alipay")}
                          className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                            paymentMethod === "alipay"
                              ? "bg-emerald-500/20 border-emerald-500"
                              : "bg-white/5 border-white/20 hover:border-white/40"
                          }`}
                        >
                          <div className="w-16 h-10 bg-[#1677FF] rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-sm">支付宝</span>
                          </div>
                          <span className="text-base font-medium text-gray-300">
                            支付宝
                          </span>
                        </button>

                        <button
                          onClick={() => setPaymentMethod("wechat")}
                          className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                            paymentMethod === "wechat"
                              ? "bg-emerald-500/20 border-emerald-500"
                              : "bg-white/5 border-white/20 hover:border-white/40"
                          }`}
                        >
                          <div className="w-16 h-10 bg-[#07C160] rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-sm">微信支付</span>
                          </div>
                          <span className="text-base font-medium text-gray-300">
                            微信支付
                          </span>
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod("stripe")}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                          paymentMethod === "stripe"
                            ? "bg-emerald-500/20 border-emerald-500"
                            : "bg-white/5 border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="w-16 h-10 bg-white rounded-md flex items-center justify-center gap-1">
                          {/* Visa Logo */}
                          <svg className="h-5" viewBox="0 0 50 16" fill="#1A1F71">
                            <path d="M19.13 15.5h-3.72l2.33-14.5h3.72l-2.33 14.5zm15.4-14.16c-.74-.29-1.9-.6-3.35-.6-3.69 0-6.29 1.97-6.31 4.79-.03 2.08 1.86 3.24 3.28 3.94 1.45.71 1.94 1.17 1.94 1.81-.01.98-1.17 1.43-2.24 1.43-1.5 0-2.3-.22-3.53-.76l-.49-.23-.53 3.27c.88.4 2.5.76 4.18.78 3.93 0 6.47-1.93 6.51-4.95.02-1.65-.99-2.91-3.15-3.94-1.31-.67-2.12-1.12-2.11-1.8 0-.6.68-1.25 2.15-1.25 1.23-.02 2.12.26 2.81.56l.34.17.51-3.22zm9.53-.34h-2.88c-.9 0-1.57.26-1.96 1.19l-5.55 13.31h3.92l.78-2.18h4.79l.45 2.18h3.46l-3.01-14.5zm-4.6 9.36c.31-.84 1.5-4.08 1.5-4.08-.02.04.31-.85.5-1.39l.26 1.25.87 4.22h-3.13zm-19.75-9.36l-3.66 9.88-.39-2.01c-.68-2.31-2.79-4.81-5.15-6.06l3.34 12.68h3.95l5.88-14.49h-3.97z"/>
                          </svg>
                          {/* Mastercard Logo */}
                          <svg className="h-5" viewBox="0 0 32 20">
                            <circle cx="10" cy="10" r="10" fill="#EB001B"/>
                            <circle cx="22" cy="10" r="10" fill="#F79E1B"/>
                            <path d="M16 2.5a9.95 9.95 0 0 0-3.5 7.5 9.95 9.95 0 0 0 3.5 7.5 9.95 9.95 0 0 0 3.5-7.5 9.95 9.95 0 0 0-3.5-7.5z" fill="#FF5F00"/>
                          </svg>
                        </div>
                        <span className="text-base font-medium text-gray-300">
                          {isZH ? "信用卡" : "Credit Card"}
                        </span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                          paymentMethod === "paypal"
                            ? "bg-emerald-500/20 border-emerald-500"
                            : "bg-white/5 border-white/20 hover:border-white/40"
                        }`}
                      >
                        <div className="w-16 h-10 bg-[#003087] rounded-md flex items-center justify-center">
                          <span className="text-[#009cde] font-bold text-lg">
                            Pay
                          </span>
                          <span className="text-white font-bold text-lg">
                            Pal
                          </span>
                        </div>
                        <span className="text-base font-medium text-gray-300">
                          PayPal
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Stripe/Alipay/WeChat Payment */}
                  {(paymentMethod === "stripe" || paymentMethod === "alipay" || paymentMethod === "wechat") && (
                    <>
                      {clientSecret ? (
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret,
                            appearance: {
                              theme: "night",
                              variables: {
                                colorPrimary: "#10b981",
                                colorBackground: "#1f2937",
                                colorText: "#ffffff",
                                colorDanger: "#ef4444",
                                fontFamily: "inherit",
                                borderRadius: "12px",
                              },
                            },
                          }}
                        >
                          <CheckoutForm
                            clientSecret={clientSecret}
                            totalPrice={totalPrice}
                            isZH={isZH}
                            formatPrice={formatPrice}
                          />
                        </Elements>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-center py-8">
                            {isLoading ? (
                              <div className="flex flex-col items-center gap-3">
                                <svg
                                  className="animate-spin h-8 w-8 text-emerald-400"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                <p className="text-gray-400">
                                  {isZH ? "正在初始化支付..." : "Initializing payment..."}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <p className="text-gray-400">
                                  {isZH ? "演示模式：Stripe密钥未配置" : "Demo Mode: Stripe keys not configured"}
                                </p>
                                <button
                                  onClick={handleDemoPayment}
                                  className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 font-bold text-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
                                >
                                  {isZH ? "完成演示支付 →" : "Complete Demo Payment →"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* PayPal Button */}
                  {paymentMethod === "paypal" && (
                    <div className="space-y-5">
                      <p className="text-base text-gray-400 text-center">
                        {isZH ? "PayPal集成即将推出。目前请使用演示模式。" : "PayPal integration coming soon. For now, use Demo mode."}
                      </p>
                      <button
                        onClick={handleDemoPayment}
                        className="w-full py-5 rounded-xl bg-[#0070ba] hover:bg-[#003087] font-bold text-xl transition-all duration-300 shadow-lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isZH ? "完成演示支付 →" : "Complete Demo Payment →"}
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Security badges */}
              {paymentMethod && (
                <div className="flex items-center justify-center gap-6 text-base text-gray-500 pt-4 flex-wrap">
                  <span className="flex items-center gap-2">
                    <span>🔒</span> {isZH ? "SSL加密" : "SSL Encrypted"}
                  </span>
                  <span className="flex items-center gap-2">
                    <span>🛡️</span> {isZH ? "PCI合规" : "PCI Compliant"}
                  </span>
                  <span className="flex items-center gap-2">
                    <span>✓</span> {isZH ? "安全结账" : "Secure Checkout"}
                  </span>
                </div>
              )}

              {/* Back Link */}
              <div className="text-center pt-4">
                <a
                  href="/apply"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  {isZH ? "← 返回申请人详情" : "← Back to Applicant Details"}
                </a>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* Footer with disclaimer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href={isZH ? "https://wa.me/84705549868?text=您好，我需要帮助完成支付！" : "https://wa.me/84705549868?text=Hi, I need help with my payment!"}
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

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-emerald-400 text-xl">Loading...</div>
        </div>
      }
    >
      <PaymentForm />
    </Suspense>
  );
}
