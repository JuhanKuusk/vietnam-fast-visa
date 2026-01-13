"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-xl font-bold">V</span>
              </div>
              <div>
                <h3 className="text-white font-bold">VietnamVisaHelp.com</h3>
                <p className="text-xs text-gray-400">30 Min Approval Letter</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {t.legal?.footerDescription || "Fast, reliable Vietnam visa assistance service. Get your approval letter in 30 minutes."}
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.legal?.legalLinks || "Legal"}</h4>
            <ul className="space-y-2 text-sm">
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
                <a href="https://wa.me/84123456789" className="hover:text-white transition-colors">
                  WhatsApp: +84 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-400">
            <p className="font-medium text-gray-300 mb-2">
              {t.legal?.importantDisclaimer || "Important Disclaimer"}
            </p>
            <p>
              {t.legal?.disclaimerBannerText || "VietnamVisaHelp.com is an independent visa assistance service. We are not a government agency or official visa authority. We help you prepare and submit your visa application for a service fee. All visa approval decisions are made by Vietnamese immigration authorities."}
            </p>
          </div>
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
