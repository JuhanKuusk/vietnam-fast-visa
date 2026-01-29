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

        {/* Contact Info Bar */}
        <div className="border-t border-gray-700 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm">
            <a href="mailto:support@vietnamvisahelp.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@vietnamvisahelp.com
            </a>
            <a href="https://wa.me/841205549868" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +84 120 554 9868
            </a>
            <span className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Park 7 Building, Floor 38, Vinhomes Central Park, 720A, Binh Thanh District, Ho Chi Minh City
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} VietnamVisaHelp.com. {t.legal?.allRightsReserved || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
