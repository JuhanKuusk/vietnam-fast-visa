"use client";

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  variant?: "auto" | "light" | "dark"; // auto uses dark mode detection, light/dark forces specific colors
}

export function Logo({ size = "md", showTagline = true, className = "", variant = "auto" }: LogoProps) {
  // Sizes increased by 40%
  const sizes = {
    sm: { icon: 45, text: "text-base", tagline: "text-[11px]" },     // was 32 -> 45
    md: { icon: 56, text: "text-lg", tagline: "text-sm" },           // was 40 -> 56
    lg: { icon: 78, text: "text-2xl", tagline: "text-base" },        // was 56 -> 78
  };

  const { icon, text, tagline } = sizes[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Passport Icon - New design */}
      <div style={{ width: icon, height: icon }} className="flex-shrink-0">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background passport (orange/visa behind) */}
          <rect x="20" y="4" width="38" height="48" rx="4" fill="#f97316" stroke="#1e3a5f" strokeWidth="2"/>
          <rect x="20" y="4" width="38" height="14" rx="2" fill="#f97316"/>

          {/* Main passport book - teal/blue */}
          <rect x="6" y="12" width="42" height="48" rx="4" fill="#67b8c4" stroke="#1e3a5f" strokeWidth="2.5"/>

          {/* Light reflection on passport */}
          <path d="M6 16 L6 56 Q6 60 10 60 L24 60 L24 16 Q24 12 20 12 L10 12 Q6 12 6 16" fill="#8ed4dc" opacity="0.6"/>

          {/* Globe circle */}
          <circle cx="27" cy="36" r="12" fill="none" stroke="#1e3a5f" strokeWidth="2.5"/>

          {/* Globe grid lines - horizontal */}
          <path d="M15 36 h24" stroke="#1e3a5f" strokeWidth="2"/>
          <ellipse cx="27" cy="36" rx="12" ry="4.5" fill="none" stroke="#1e3a5f" strokeWidth="1.5"/>

          {/* Globe grid lines - vertical */}
          <ellipse cx="27" cy="36" rx="4.5" ry="12" fill="none" stroke="#1e3a5f" strokeWidth="1.5"/>

          {/* Decorative lines at bottom */}
          <line x1="14" y1="52" x2="40" y2="52" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="16" y1="56" x2="38" y2="56" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text - Vietnam (red), VisaHelp (green), all together without spaces */}
      <div className="flex flex-col">
        <span className={`${text} font-bold leading-tight`}>
          <span className="text-red-600">Vietnam</span><span className="text-green-600">VisaHelp</span>
        </span>
        {showTagline && (
          <span className={`${tagline} ${variant === "light" ? "text-gray-300" : variant === "dark" ? "text-gray-500" : "text-gray-500 dark:text-gray-400"} uppercase tracking-wide font-medium`}>
            Check-in Approval in 30 min
          </span>
        )}
      </div>
    </div>
  );
}

// Simplified icon-only version for favicons and small spaces
export function LogoIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="64" height="64" rx="12" fill="#ffffff"/>

      {/* Background passport (orange/visa behind) */}
      <rect x="22" y="6" width="34" height="42" rx="3" fill="#f97316" stroke="#1e3a5f" strokeWidth="1.5"/>

      {/* Main passport book - teal/blue */}
      <rect x="8" y="14" width="38" height="44" rx="3" fill="#67b8c4" stroke="#1e3a5f" strokeWidth="2"/>

      {/* Light reflection */}
      <path d="M8 18 L8 54 Q8 58 12 58 L22 58 L22 18 Q22 14 18 14 L12 14 Q8 14 8 18" fill="#8ed4dc" opacity="0.5"/>

      {/* Globe */}
      <circle cx="27" cy="36" r="10" fill="none" stroke="#1e3a5f" strokeWidth="2"/>
      <path d="M17 36 h20" stroke="#1e3a5f" strokeWidth="1.5"/>
      <ellipse cx="27" cy="36" rx="10" ry="4" fill="none" stroke="#1e3a5f" strokeWidth="1"/>
      <ellipse cx="27" cy="36" rx="4" ry="10" fill="none" stroke="#1e3a5f" strokeWidth="1"/>

      {/* Lines */}
      <line x1="14" y1="50" x2="40" y2="50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="54" x2="38" y2="54" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
