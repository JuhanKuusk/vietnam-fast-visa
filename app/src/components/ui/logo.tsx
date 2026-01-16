"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  variant?: "auto" | "light" | "dark"; // auto uses dark mode detection, light/dark forces specific colors
}

export function Logo({ size = "md", showTagline = true, className = "", variant = "auto" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-sm", tagline: "text-[10px]" },
    md: { icon: 40, text: "text-base", tagline: "text-xs" },
    lg: { icon: 56, text: "text-xl", tagline: "text-sm" },
  };

  const { icon, text, tagline } = sizes[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Passport Icon */}
      <div style={{ width: icon, height: icon }} className="flex-shrink-0">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Passport book - main shape */}
          <rect x="12" y="4" width="40" height="52" rx="3" fill="#1a365d" stroke="#2d4a6f" strokeWidth="1"/>

          {/* Passport spine/binding */}
          <rect x="12" y="4" width="6" height="52" fill="#0f2744" rx="2"/>

          {/* Globe circle */}
          <circle cx="35" cy="28" r="14" fill="none" stroke="#4a7c94" strokeWidth="1.5"/>

          {/* Globe horizontal lines */}
          <ellipse cx="35" cy="28" rx="14" ry="5" fill="none" stroke="#4a7c94" strokeWidth="1"/>
          <ellipse cx="35" cy="28" rx="14" ry="10" fill="none" stroke="#4a7c94" strokeWidth="0.75"/>

          {/* Globe vertical line */}
          <ellipse cx="35" cy="28" rx="5" ry="14" fill="none" stroke="#4a7c94" strokeWidth="1"/>

          {/* Decorative lines at bottom */}
          <line x1="22" y1="48" x2="48" y2="48" stroke="#4a7c94" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="24" y1="52" x2="46" y2="52" stroke="#4a7c94" strokeWidth="1" strokeLinecap="round"/>

          {/* Page edges visible */}
          <line x1="50" y1="8" x2="50" y2="52" stroke="#d4d4d4" strokeWidth="0.5"/>
          <line x1="49" y1="8" x2="49" y2="52" stroke="#e5e5e5" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`${text} font-bold leading-tight`}>
          <span className={variant === "light" ? "text-gray-100" : variant === "dark" ? "text-gray-800" : "text-gray-800 dark:text-gray-100"}>Vietnam</span>
          {" "}
          <span className="text-[#c41e3a]">Visa</span>
          {" "}
          <span className={variant === "light" ? "text-gray-100" : variant === "dark" ? "text-gray-800" : "text-gray-800 dark:text-gray-100"}>Help</span>
        </span>
        {showTagline && (
          <span className={`${tagline} ${variant === "light" ? "text-gray-300" : variant === "dark" ? "text-gray-500" : "text-gray-500 dark:text-gray-400"} uppercase tracking-wide font-medium`}>
            Check-in Approval with 30 min
          </span>
        )}
      </div>
    </div>
  );
}

// Simplified icon-only version for favicons and small spaces
export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="64" height="64" rx="12" fill="#c41e3a"/>

      {/* Passport book */}
      <rect x="14" y="8" width="36" height="48" rx="3" fill="#1a365d" stroke="white" strokeWidth="1.5"/>

      {/* Globe */}
      <circle cx="32" cy="28" r="12" fill="none" stroke="white" strokeWidth="1.5"/>
      <ellipse cx="32" cy="28" rx="12" ry="4" fill="none" stroke="white" strokeWidth="1"/>
      <ellipse cx="32" cy="28" rx="4" ry="12" fill="none" stroke="white" strokeWidth="1"/>

      {/* Lines */}
      <line x1="20" y1="46" x2="44" y2="46" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="50" x2="42" y2="50" stroke="white" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}
