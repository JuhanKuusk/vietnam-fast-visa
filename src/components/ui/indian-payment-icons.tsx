"use client";

import { useSite } from "@/contexts/SiteContext";

/**
 * UPI Payment Icon
 */
function UPIIcon({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="4" fill="#5F259F"/>
      <text x="50" y="26" fill="white" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">UPI</text>
    </svg>
  );
}

/**
 * Paytm Payment Icon
 */
function PaytmIcon({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="4" fill="#00BAF2"/>
      <text x="50" y="26" fill="white" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">Paytm</text>
    </svg>
  );
}

/**
 * PhonePe Payment Icon
 */
function PhonePeIcon({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="4" fill="#5F259F"/>
      <text x="50" y="26" fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">PhonePe</text>
    </svg>
  );
}

/**
 * Google Pay (India) Payment Icon
 */
function GPayIcon({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="4" fill="#4285F4"/>
      <text x="50" y="26" fill="white" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">GPay</text>
    </svg>
  );
}

/**
 * Net Banking Icon
 */
function NetBankingIcon({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="4" fill="#1A5276"/>
      <text x="50" y="26" fill="white" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">Net Banking</text>
    </svg>
  );
}

/**
 * Indian Payment Methods Component
 * Shows UPI, Paytm, PhonePe, GPay, Net Banking icons
 * Only renders on Indian site
 */
export function IndianPaymentIcons({
  className = "",
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { isIndiaSite } = useSite();

  // Only show on India site
  if (!isIndiaSite) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-xs text-gray-500 mr-1">Pay with:</span>
      )}
      <UPIIcon className="h-6 w-auto" />
      <PaytmIcon className="h-6 w-auto" />
      <PhonePeIcon className="h-6 w-auto" />
      <GPayIcon className="h-6 w-auto" />
    </div>
  );
}

/**
 * Full Indian Payment Section with all methods
 */
export function IndianPaymentSection({ className = "" }: { className?: string }) {
  const { isIndiaSite } = useSite();

  if (!isIndiaSite) return null;

  return (
    <div className={`bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 ${className}`}>
      <div className="text-center mb-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          🇮🇳 Indian Payment Methods Accepted
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Pay securely with your preferred method
        </p>
      </div>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <UPIIcon className="h-8 w-auto" />
        <PaytmIcon className="h-8 w-auto" />
        <PhonePeIcon className="h-8 w-auto" />
        <GPayIcon className="h-8 w-auto" />
        <NetBankingIcon className="h-8 w-auto" />
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        All major debit cards, credit cards, and UPI apps supported
      </p>
    </div>
  );
}

/**
 * Export individual icons for custom use
 */
export { UPIIcon, PaytmIcon, PhonePeIcon, GPayIcon, NetBankingIcon };
