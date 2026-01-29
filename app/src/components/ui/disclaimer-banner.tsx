"use client";

import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="border-b border-red-700 dark:border-red-900" style={{ backgroundColor: '#c52e3a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-xs sm:text-sm text-white text-center">
          <span className="font-medium">VietnamVisaHelp.com</span> is not affiliated with the Vietnamese Government or the Immigration Department. As part of our services, processing fees are applicable, separate from government-regulated charges. You can also visit the{" "}
          <a
            href="https://evisa.xuatnhapcanh.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-100 font-medium"
          >
            official website of the Vietnam Immigration Department
          </a>{" "}
          <Link href="/disclaimer" className="underline hover:text-red-100 font-medium">
            Read full disclaimer
          </Link>
        </p>
      </div>
    </div>
  );
}
