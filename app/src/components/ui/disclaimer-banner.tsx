"use client";

import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 text-center">
          <span className="font-medium">VietnamVisaHelp.com</span> is a private, third-party visa assistance service and is not affiliated with the Government of Vietnam. We charge a service fee.{" "}
          <Link href="/disclaimer" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-medium">
            Read full disclaimer
          </Link>
        </p>
      </div>
    </div>
  );
}
