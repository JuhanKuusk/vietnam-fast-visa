"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type ConsentStatus = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsentStatus(savedConsent as ConsentStatus);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsentStatus("accepted");
    // Enable analytics/tracking cookies here if needed
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsentStatus("rejected");
    // Disable analytics/tracking cookies here if needed
  };

  // Don't render anything until mounted (to avoid hydration mismatch)
  if (!mounted) return null;

  // Don't show banner if user has already made a choice
  if (consentStatus !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t.legal.cookieConsentText}
              <Link href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                {t.legal.cookieLearnMore}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {t.legal.cookieReject}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#c41e3a' }}
            >
              {t.legal.cookieAccept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
