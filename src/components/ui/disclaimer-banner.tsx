"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  // Get site name from translations (defaults to VietnamVisaHelp.com)
  const siteName = t.header?.siteName || "VietnamVisaHelp.com";

  return (
    <div className="border-b border-red-900" style={{ backgroundColor: '#991b1b' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-xs sm:text-sm text-gray-300 text-center">
          <span className="font-medium text-white">{siteName}</span> {t.legal?.topDisclaimerText || "is not affiliated with the Vietnamese Government or the Immigration Department. As part of our services, processing fees are applicable, separate from government-regulated charges. You can also visit the"}{" "}
          <a
            href="https://evisa.xuatnhapcanh.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white font-medium text-emerald-400"
          >
            {t.legal?.officialWebsiteLink || "official website of the Vietnam Immigration Department"}
          </a>{" "}
          <Link href="/disclaimer" className="underline hover:text-white font-medium text-emerald-400">
            {t.legal?.readFullDisclaimer || "Read full disclaimer"}
          </Link>
        </p>
      </div>
    </div>
  );
}
