"use client";

import { useSite } from "@/contexts/SiteContext";

// Icon components with color support
type IconProps = { className?: string; color?: string };

function UsersIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}

function ClockIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GlobeIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function HeadphonesIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ShieldIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function MessageIcon({ className = "w-6 h-6", color }: IconProps) {
  return (
    <svg className={className} fill="none" stroke={color || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

// Map icon names to components
const iconMap: Record<string, React.FC<IconProps>> = {
  users: UsersIcon,
  clock: ClockIcon,
  globe: GlobeIcon,
  headphones: HeadphonesIcon,
  shield: ShieldIcon,
  message: MessageIcon,
};

/**
 * Site-aware Trust Badges Component
 * Automatically shows the correct badges based on the current site (India vs Default)
 */
export function SiteTrustBadges({
  className = "",
  variant = "horizontal",
}: {
  className?: string;
  variant?: "horizontal" | "vertical" | "grid";
}) {
  const { trustBadges, theme, isIndiaSite } = useSite();

  const containerClasses = {
    horizontal: "flex flex-wrap justify-center gap-6 md:gap-8",
    vertical: "flex flex-col gap-4",
    grid: "grid grid-cols-2 md:grid-cols-4 gap-4",
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      {trustBadges.map((badge, index) => {
        const IconComponent = iconMap[badge.icon] || UsersIcon;

        return (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              variant === "grid"
                ? "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                : ""
            }`}
          >
            <div
              className="flex-shrink-0 p-2 rounded-full"
              style={{
                backgroundColor: isIndiaSite
                  ? "rgba(234, 88, 12, 0.1)" // Orange for India
                  : "rgba(196, 30, 58, 0.1)", // Red for default
              }}
            >
              <IconComponent
                className="w-5 h-5"
                color={theme.primaryColor}
              />
            </div>
            <div>
              <div
                className="text-lg font-bold"
                style={{ color: theme.primaryColor }}
              >
                {badge.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {badge.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Compact inline trust badges for footer or sidebar
 */
export function CompactTrustBadges({ className = "" }: { className?: string }) {
  const { trustBadges, theme } = useSite();

  return (
    <div className={`flex flex-wrap justify-center gap-4 text-sm ${className}`}>
      {trustBadges.slice(0, 3).map((badge, index) => (
        <span key={index} className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <span style={{ color: theme.primaryColor }} className="font-semibold">
            {badge.value}
          </span>
          <span>{badge.label}</span>
        </span>
      ))}
    </div>
  );
}
