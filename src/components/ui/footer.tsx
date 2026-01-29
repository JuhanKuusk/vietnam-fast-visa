"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <Logo size="md" showTagline={true} taglineText={t.header?.logoTagline || "Check-in Approval in 30 min"} />
            </div>
            <p className="text-sm text-gray-400">
              {t.legal?.footerDescription || "Fast, reliable Vietnam visa assistance service. Get your approval letter in 30 minutes."}
            </p>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.legal?.legalLinks || "Company & Legal"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t.legal?.termsTitle || "Terms of Use"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t.legal?.privacyTitle || "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  {t.legal?.refundTitle || "Refund Policy"}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  {t.legal?.cookieTitle || "Cookie Policy"}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  {t.legal?.disclaimerTitle || "Disclaimer"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.legal?.contact || "Contact"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@vietnamvisahelp.com" className="hover:text-white transition-colors">
                  support@vietnamvisahelp.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/841205549868" className="hover:text-white transition-colors">
                  WhatsApp: +84 120 554 9868
                </a>
              </li>
              <li className="pt-3 text-gray-400">
                <span className="block font-medium text-gray-300 mb-1">Address:</span>
                Park 7 Building, Floor 38<br />
                Vinhomes Central Park, 720A<br />
                Binh Thanh District<br />
                Ho Chi Minh City, Vietnam
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.legal?.sendMessage || "Send us a Message"}</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.legal?.emailPlaceholder || "Your email"}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.legal?.messagePlaceholder || "Your message"}
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
              >
                {isSubmitting ? (t.legal?.sending || "Sending...") : (t.legal?.send || "Send Message")}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-400 text-sm">{statusMessage}</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 text-sm">
            <p className="font-semibold text-amber-200 mb-2">
              {t.legal?.importantDisclaimer || "Important Disclaimer"}
            </p>
            <p className="text-amber-100/80 mb-3">
              <span className="font-medium">VietnamVisaHelp.com</span> is a private, third-party visa assistance service and is <span className="font-medium">not affiliated with the Government of Vietnam</span>. We charge a service fee for our assistance. All visa approval decisions are made by Vietnamese immigration authorities.
            </p>
            <p className="text-amber-100/80 mb-3">
              <span className="font-medium">Official Government Website:</span>{" "}
              <a
                href="https://evisa.xuatnhapcanh.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-100"
              >
                evisa.xuatnhapcanh.gov.vn
              </a>
              {" "}(Government e-Visa portal - $25 USD fee, 3 business days processing)
            </p>
            <Link href="/disclaimer" className="inline-flex items-center gap-1 text-amber-200 hover:text-amber-100 font-medium underline">
              Read our full disclaimer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="text-center text-sm text-gray-400 mb-4">
          <p>
            www.vietnamvisahelp.com is a private, third-party agency and is not affiliated with the Government of Vietnam. We charge a service fee for our assistance.{" "}
            <Link href="/disclaimer" className="text-amber-400 hover:text-amber-300 underline">
              Read full disclaimer
            </Link>
            .
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} VietnamVisaHelp.com. {t.legal?.allRightsReserved || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
