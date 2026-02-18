"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  variant?: "light" | "dark"; // light = white text (for dark bg), dark = black text (for light bg)
  taglineText?: string; // Allow passing translated tagline
  siteName?: string; // Custom site name (for multi-domain support)
}

export function Logo({ size = "md", showTagline = true, className = "", variant = "dark", taglineText = "Urgent Visa Processing", siteName }: LogoProps) {
  // Sizes - text increased by 25%
  const sizes = {
    sm: { icon: 45, text: "text-base", tagline: "text-[11px]" },     // text: sm -> base (+25%)
    md: { icon: 56, text: "text-xl", tagline: "text-sm" },           // text: base -> xl (+25%)
    lg: { icon: 78, text: "text-2xl", tagline: "text-base" },        // text: xl -> 2xl (+25%)
  };

  const { icon, text, tagline } = sizes[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Passport with Globe and Stamp Icon */}
      <div style={{ width: icon * 1.4, height: icon }} className="flex-shrink-0">
        <svg viewBox="0 0 90 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Back passport (slightly offset) */}
          <rect x="8" y="4" width="36" height="48" rx="3" fill="white" stroke="#1a1a1a" strokeWidth="2" transform="rotate(-5 26 28)"/>

          {/* Main passport */}
          <rect x="4" y="6" width="36" height="48" rx="3" fill="white" stroke="#1a1a1a" strokeWidth="2"/>

          {/* Globe circle */}
          <circle cx="22" cy="24" r="11" fill="none" stroke="#1a1a1a" strokeWidth="1.8"/>

          {/* Globe horizontal line */}
          <path d="M11 24 h22" stroke="#1a1a1a" strokeWidth="1.5"/>

          {/* Globe vertical ellipse */}
          <ellipse cx="22" cy="24" rx="5" ry="11" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>

          {/* Globe horizontal curves */}
          <path d="M12 18 Q22 20 32 18" fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>
          <path d="M12 30 Q22 28 32 30" fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>

          {/* Text lines on passport */}
          <line x1="10" y1="42" x2="34" y2="42" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="47" x2="28" y2="47" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Stamp handle */}
          <rect x="52" y="30" width="8" height="22" rx="1" fill="white" stroke="#1a1a1a" strokeWidth="2"/>

          {/* Stamp grip lines */}
          <line x1="54" y1="35" x2="58" y2="35" stroke="#1a1a1a" strokeWidth="1"/>
          <line x1="54" y1="38" x2="58" y2="38" stroke="#1a1a1a" strokeWidth="1"/>
          <line x1="54" y1="41" x2="58" y2="41" stroke="#1a1a1a" strokeWidth="1"/>

          {/* Stamp base (wider bottom) */}
          <path d="M48 52 L48 56 Q48 58 50 58 L62 58 Q64 58 64 56 L64 52 Z" fill="white" stroke="#1a1a1a" strokeWidth="2"/>

          {/* Stamp connector */}
          <rect x="52" y="50" width="8" height="4" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Text - Site name in blue with underlines */}
      <div className="flex flex-col">
        {siteName ? (
          <span className={`${text} font-bold leading-tight`} style={{ color: '#2d7ef6' }}>
            {siteName}
          </span>
        ) : (
          <span className={`${text} font-bold leading-tight`} style={{ color: '#2d7ef6' }}>
            <span className="border-b border-black">Vietnam</span>
            <span className="border-b border-black">Visa</span>
            <span className="border-b border-black">Help</span>
          </span>
        )}
        {showTagline && (
          <span className={`${tagline} tracking-wide font-medium`} style={{ color: '#2d7ef6' }}>
            {taglineText}
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

      {/* Back passport (slightly offset) */}
      <rect x="10" y="6" width="32" height="42" rx="3" fill="white" stroke="#1a1a1a" strokeWidth="2" transform="rotate(-5 26 27)"/>

      {/* Main passport */}
      <rect x="6" y="8" width="32" height="42" rx="3" fill="white" stroke="#1a1a1a" strokeWidth="2"/>

      {/* Globe circle */}
      <circle cx="22" cy="24" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1.8"/>

      {/* Globe horizontal line */}
      <path d="M12 24 h20" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Globe vertical ellipse */}
      <ellipse cx="22" cy="24" rx="4.5" ry="10" fill="none" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Globe horizontal curves */}
      <path d="M13 19 Q22 21 31 19" fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>
      <path d="M13 29 Q22 27 31 29" fill="none" stroke="#1a1a1a" strokeWidth="1.2"/>

      {/* Text lines on passport */}
      <line x1="12" y1="40" x2="32" y2="40" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="45" x2="26" y2="45" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Stamp handle */}
      <rect x="44" y="32" width="7" height="18" rx="1" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Stamp grip lines */}
      <line x1="46" y1="36" x2="49" y2="36" stroke="#1a1a1a" strokeWidth="1"/>
      <line x1="46" y1="39" x2="49" y2="39" stroke="#1a1a1a" strokeWidth="1"/>
      <line x1="46" y1="42" x2="49" y2="42" stroke="#1a1a1a" strokeWidth="1"/>

      {/* Stamp base */}
      <path d="M41 50 L41 54 Q41 56 43 56 L52 56 Q54 56 54 54 L54 50 Z" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>

      {/* Stamp connector */}
      <rect x="44" y="48" width="7" height="3" fill="white" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
  );
}
