"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { DisclaimerBanner } from "@/components/ui/disclaimer-banner";

export default function ConfirmationPage() {
  const [referenceNumber] = useState(() => {
    const date = new Date();
    const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `VNV-${dateStr}-${random}`;
  });

  const [countdown, setCountdown] = useState(90 * 60); // 90 minutes in seconds

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-5 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://wa.me/3725035137"
            className="flex items-center gap-2 text-base text-gray-300 hover:text-white"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Need help?
          </a>
        </div>
      </header>

      {/* Third-Party Disclaimer Banner */}
      <DisclaimerBanner />

      <main className="px-5 pb-24">
        {/* Success Section */}
        <section className="max-w-lg mx-auto text-center py-10 relative">
          {/* Sparkles Background */}
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
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
              <span className="text-5xl">✓</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Payment Successful!
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Your visa application is now being processed
            </p>

            {/* Countdown Timer */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-8">
              <p className="text-base text-gray-400 mb-2">Estimated time remaining</p>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono">
                {formatTime(countdown)}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                You will receive your visa via email & WhatsApp
              </p>
            </div>
          </div>
        </section>

        {/* Reference Card */}
        <section className="max-w-lg mx-auto">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden shadow-xl shadow-black/20">
            <div className="p-6 space-y-6">
              {/* Reference Number */}
              <div className="text-center p-5 bg-white/5 rounded-xl">
                <p className="text-base text-gray-400 mb-2">Reference Number</p>
                <p className="text-2xl font-bold text-white font-mono">
                  {referenceNumber}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Save this for tracking your application
                </p>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Application Status</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">Payment Received</p>
                      <p className="text-base text-gray-400">Just now</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <span className="text-white text-lg">⋯</span>
                    </div>
                    <div>
                      <p className="font-medium text-white text-lg">Processing Visa</p>
                      <p className="text-base text-gray-400">In progress...</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-lg">○</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-400 text-lg">Visa Approved</p>
                      <p className="text-base text-gray-500">Pending</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-lg">○</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-400 text-lg">Delivered via Email & WhatsApp</p>
                      <p className="text-base text-gray-500">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-lg text-blue-400 mb-3">What Happens Next?</h3>
                <ul className="space-y-2 text-base text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    Our team is processing your visa application
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    You'll receive WhatsApp updates on progress
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    Your approved visa will be sent to your email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">4.</span>
                    Print the visa and bring it to Vietnam
                  </li>
                </ul>
              </div>

              {/* Contact Support */}
              <div className="text-center space-y-4">
                <p className="text-base text-gray-400">
                  Questions? Contact our 24/7 support team
                </p>
                <a
                  href={`https://wa.me/3725035137?text=Hi, I need help with my visa application. Reference: ${referenceNumber}`}
                  className="inline-flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-400 rounded-xl font-semibold text-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Back to Home */}
              <div className="text-center pt-4">
                <a
                  href="/"
                  className="text-base text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/3725035137?text=Hi, I need help with my visa application. Reference: ${referenceNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-all duration-300 hover:scale-110 z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
