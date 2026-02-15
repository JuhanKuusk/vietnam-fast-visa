// Multi-domain site configuration
// Each domain can have its own branding, theme, content, and behavior

import { SupportedLanguage } from "./translations";

// =============================================================================
// TYPES
// =============================================================================

export type SiteTheme = {
  // Colors
  primaryColor: string;        // Main brand color (buttons, headers)
  primaryColorHover: string;   // Hover state
  secondaryColor: string;      // Secondary elements
  accentColor: string;         // Highlights, badges
  urgencyColor: string;        // Urgent elements (timers, warnings)

  // Gradients
  heroGradient: string;        // Hero section background
  buttonGradient?: string;     // CTA button gradient

  // Styling
  borderRadius: "rounded" | "sharp";
};

export type SiteLayout = {
  // Hero section
  heroVariant: "default" | "urgent" | "india";
  showUrgencyBanner: boolean;
  showCountdownTimer: boolean;

  // Product emphasis
  highlightedVisaSpeed: "30-min" | "4-hour" | "1-day" | null;
  defaultVisaSpeed: "30-min" | "4-hour" | "1-day" | "2-day";

  // Trust elements
  trustBadgeVariant: "default" | "india" | "travel";
  testimonialSet: "default" | "india" | "urgent" | "travel";

  // Additional sections
  showTours: boolean;  // Show tours & activities section

  // Footer
  showIndianPaymentMethods: boolean;
  showISTTimezone: boolean;
};

export type SiteContent = {
  // Meta
  siteName: string;
  siteNameShort: string;
  domain: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  ctaButtonText: string;

  // Trust
  trustHeadline: string;

  // Contact
  supportEmail: string;
  whatsappNumber: string;
  whatsappDisplay: string;

  // Currency
  currencyCode: string;
  currencySymbol: string;
  showAlternateCurrency: boolean;
  alternateCurrencyCode?: string;
};

export type SiteBehavior = {
  defaultLanguage: SupportedLanguage;
  targetCountries: string[];          // Country codes to auto-detect this site
  forceLanguageForCountries: boolean; // Override user's saved language preference
  availableLanguages?: SupportedLanguage[]; // If set, only these languages are shown in selector
};

export type SiteConfig = {
  id: string;
  theme: SiteTheme;
  layout: SiteLayout;
  content: SiteContent;
  behavior: SiteBehavior;
};

// =============================================================================
// SITE CONFIGURATIONS
// =============================================================================

export const SITES: Record<string, SiteConfig> = {
  // ---------------------------------------------------------------------------
  // MAIN SITE: vietnamvisahelp.com
  // ---------------------------------------------------------------------------
  "vietnamvisahelp.com": {
    id: "vietnamvisahelp",
    theme: {
      primaryColor: "#c41e3a",           // Vietnam red
      primaryColorHover: "#a01830",
      secondaryColor: "#1e40af",         // Blue
      accentColor: "#f59e0b",            // Amber
      urgencyColor: "#dc2626",           // Red
      heroGradient: "from-red-900 via-red-800 to-red-900",
      borderRadius: "rounded",
    },
    layout: {
      heroVariant: "default",
      showUrgencyBanner: false,
      showCountdownTimer: false,
      highlightedVisaSpeed: null,
      defaultVisaSpeed: "30-min",
      trustBadgeVariant: "default",
      testimonialSet: "default",
      showTours: false,
      showIndianPaymentMethods: false,
      showISTTimezone: false,
    },
    content: {
      siteName: "VietnamVisaHelp.com",
      siteNameShort: "VietnamVisaHelp",
      domain: "vietnamvisahelp.com",
      tagline: "Express Visa Service",
      metaTitle: "Vietnam E-Visa in 30 Minutes | VietnamVisaHelp.com",
      metaDescription: "Get your Vietnam E-Visa approval letter in 30 minutes. Stuck at check-in? We fix that fast. Express visa service for urgent travelers.",
      heroTitle: "Can't Check In?",
      heroSubtitle: "Get your Vietnam E-Visa approval letter in as fast as 30 minutes. Pass airline check-in immediately. Full visa ready before you land.",
      heroBadge: "Stuck at check-in? We can help in as fast as 30 minutes!",
      ctaButtonText: "Apply Now",
      trustHeadline: "Trusted by travelers worldwide",
      supportEmail: "support@vietnamvisahelp.com",
      whatsappNumber: "+84705549868",
      whatsappDisplay: "+84 70 5549868",
      currencyCode: "USD",
      currencySymbol: "$",
      showAlternateCurrency: false,
    },
    behavior: {
      defaultLanguage: "EN",
      targetCountries: [],  // Default site for all countries
      forceLanguageForCountries: false,
    },
  },

  // ---------------------------------------------------------------------------
  // URGENT SITE: vietnamvisaurgent.com
  // ---------------------------------------------------------------------------
  "vietnamvisaurgent.com": {
    id: "vietnamvisaurgent",
    theme: {
      primaryColor: "#dc2626",           // Urgent red
      primaryColorHover: "#b91c1c",
      secondaryColor: "#f97316",         // Orange
      accentColor: "#fbbf24",            // Yellow/gold
      urgencyColor: "#dc2626",
      heroGradient: "from-red-800 via-orange-700 to-red-800",
      buttonGradient: "from-red-600 to-orange-500",
      borderRadius: "rounded",
    },
    layout: {
      heroVariant: "urgent",
      showUrgencyBanner: true,
      showCountdownTimer: true,
      highlightedVisaSpeed: "30-min",
      defaultVisaSpeed: "30-min",
      trustBadgeVariant: "default",
      testimonialSet: "urgent",
      showTours: false,
      showIndianPaymentMethods: false,
      showISTTimezone: false,
    },
    content: {
      siteName: "VietnamVisaUrgent.com",
      siteNameShort: "VietnamVisaUrgent",
      domain: "vietnamvisaurgent.com",
      tagline: "Emergency Visa Service",
      metaTitle: "URGENT Vietnam Visa - 30 Minute Processing | VietnamVisaUrgent.com",
      metaDescription: "Emergency Vietnam visa processing in 30 minutes. Flight boarding denied? We fix it NOW. 24/7 urgent visa assistance.",
      heroTitle: "Need Your Vietnam Visa NOW?",
      heroSubtitle: "Emergency processing available 24/7. Get your approval letter in 30 minutes and board your flight.",
      heroBadge: "⚡ URGENT: 30-Minute Processing Available",
      ctaButtonText: "Get Urgent Visa NOW",
      trustHeadline: "Trusted for emergency visas",
      supportEmail: "urgent@vietnamvisaurgent.com",
      whatsappNumber: "+84705549868",
      whatsappDisplay: "+84 70 5549868",
      currencyCode: "USD",
      currencySymbol: "$",
      showAlternateCurrency: false,
    },
    behavior: {
      defaultLanguage: "EN",
      targetCountries: [],
      forceLanguageForCountries: false,
    },
  },

  // ---------------------------------------------------------------------------
  // INDIA SITE: vietnamvisaurgent.in
  // ---------------------------------------------------------------------------
  "vietnamvisaurgent.in": {
    id: "vietnamvisaurgent-india",
    theme: {
      primaryColor: "#ea580c",           // Saffron/orange (Indian flag)
      primaryColorHover: "#c2410c",
      secondaryColor: "#059669",         // Green (Indian flag)
      accentColor: "#f59e0b",            // Amber/gold
      urgencyColor: "#dc2626",           // Red for urgency
      heroGradient: "from-orange-700 via-orange-600 to-amber-600",
      buttonGradient: "from-orange-500 to-amber-500",
      borderRadius: "rounded",
    },
    layout: {
      heroVariant: "india",
      showUrgencyBanner: true,
      showCountdownTimer: true,
      highlightedVisaSpeed: "30-min",
      defaultVisaSpeed: "30-min",
      trustBadgeVariant: "india",
      testimonialSet: "india",
      showTours: false,
      showIndianPaymentMethods: true,
      showISTTimezone: true,
    },
    content: {
      siteName: "VietnamVisaUrgent.in",
      siteNameShort: "VietnamVisaUrgent",
      domain: "vietnamvisaurgent.in",
      tagline: "भारतीयों के लिए तत्काल वीज़ा सेवा", // Urgent visa service for Indians
      metaTitle: "Vietnam Visa for Indians - 30 Min Processing | VietnamVisaUrgent.in",
      metaDescription: "Urgent Vietnam visa for Indian citizens. Get e-visa approval in 30 minutes. Trusted by 10,000+ Indian travelers. Hindi support available.",
      heroTitle: "भारतीय नागरिकों के लिए वियतनाम वीज़ा",
      heroSubtitle: "30 मिनट में ई-वीज़ा अप्रूवल प्राप्त करें। 10,000+ भारतीय यात्रियों द्वारा विश्वसनीय।",
      heroBadge: "⚡ 30 मिनट में वीज़ा अप्रूवल",
      ctaButtonText: "अभी आवेदन करें",
      trustHeadline: "10,000+ भारतीय यात्रियों द्वारा विश्वसनीय",
      supportEmail: "india@vietnamvisaurgent.in",
      whatsappNumber: "+84705549868",  // Can be changed to Indian number later
      whatsappDisplay: "+84 70 5549868",
      currencyCode: "INR",
      currencySymbol: "₹",
      showAlternateCurrency: true,
      alternateCurrencyCode: "USD",
    },
    behavior: {
      defaultLanguage: "HI",
      targetCountries: ["IN"],
      forceLanguageForCountries: true,
      availableLanguages: ["HI", "EN"],  // Only Hindi and English for India site
    },
  },

  // ---------------------------------------------------------------------------
  // TRAVEL HELP SITE: vietnamtravel.help
  // Softer messaging, big disclaimers, Google Ads compliant
  // ---------------------------------------------------------------------------
  "vietnamtravel.help": {
    id: "vietnamtravel-help",
    theme: {
      primaryColor: "#0891b2",           // Teal/cyan - friendly, travel-like
      primaryColorHover: "#0e7490",
      secondaryColor: "#059669",         // Green - trust, nature
      accentColor: "#f59e0b",            // Amber - warm, inviting
      urgencyColor: "#6366f1",           // Indigo - calm, not aggressive
      heroGradient: "from-cyan-700 via-teal-600 to-emerald-600",
      buttonGradient: "from-teal-500 to-cyan-500",
      borderRadius: "rounded",
    },
    layout: {
      heroVariant: "default",
      showUrgencyBanner: false,          // No urgency - compliant
      showCountdownTimer: false,         // No countdown - compliant
      highlightedVisaSpeed: null,        // No highlighted speed
      defaultVisaSpeed: "2-day",         // Default to slower, cheaper option
      trustBadgeVariant: "travel",       // Travel-focused badges
      testimonialSet: "travel",          // Softer testimonials
      showTours: true,                   // Show tours section - affiliate content
      showIndianPaymentMethods: false,
      showISTTimezone: false,
    },
    content: {
      siteName: "VietnamTravel.help",
      siteNameShort: "VietnamTravel",
      domain: "vietnamtravel.help",
      tagline: "Your Vietnam Travel Assistant",
      metaTitle: "Vietnam Travel Help - E-Visa Application Assistance",
      metaDescription: "Professional assistance for Vietnam e-visa applications. We help travelers navigate the official visa process. Clear guidance, document support, and application tracking.",
      heroTitle: "Planning Your Vietnam Trip?",
      heroSubtitle: "We provide professional assistance with e-visa applications. Our team helps you prepare documents and submit your application correctly.",
      heroBadge: "Trusted Travel Assistance Service",
      ctaButtonText: "Get Started",
      trustHeadline: "Helping travelers since 2019",
      supportEmail: "help@vietnamtravel.help",
      whatsappNumber: "+84705549868",
      whatsappDisplay: "+84 70 5549868",
      currencyCode: "USD",
      currencySymbol: "$",
      showAlternateCurrency: false,
    },
    behavior: {
      defaultLanguage: "EN",
      targetCountries: [],
      forceLanguageForCountries: false,
    },
  },
};

// =============================================================================
// TESTIMONIALS BY SITE
// =============================================================================

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
};

export const TESTIMONIALS: Record<string, Testimonial[]> = {
  default: [
    {
      name: "Sarah M.",
      location: "London, UK",
      rating: 5,
      text: "Got my visa in exactly 28 minutes! Was stuck at Heathrow check-in and these guys saved my trip. Incredible service!",
      date: "2 days ago",
    },
    {
      name: "David Chen",
      location: "Sydney, Australia",
      rating: 5,
      text: "Best visa service I've ever used. Fast, professional, and the WhatsApp support was incredibly helpful.",
      date: "1 week ago",
    },
    {
      name: "Michael R.",
      location: "New York, USA",
      rating: 5,
      text: "Thought I'd miss my flight. Applied at 6am, had my approval by 6:30am. Worth every penny!",
      date: "3 days ago",
    },
  ],

  urgent: [
    {
      name: "James W.",
      location: "Los Angeles, USA",
      rating: 5,
      text: "EMERGENCY VISA in 25 minutes! Was literally at the airport counter. These guys are lifesavers!",
      date: "Yesterday",
    },
    {
      name: "Emma S.",
      location: "Toronto, Canada",
      rating: 5,
      text: "Flight was in 2 hours, needed visa urgently. Got it in 30 minutes flat. Amazing!",
      date: "3 days ago",
    },
    {
      name: "Tom H.",
      location: "Manchester, UK",
      rating: 5,
      text: "Panicked at check-in with no visa. 35 minutes later I was boarding. THANK YOU!",
      date: "1 week ago",
    },
  ],

  india: [
    {
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "बहुत तेज़ सेवा! 25 मिनट में वीज़ा मिल गया। मुंबई एयरपोर्ट पर चेक-इन में कोई समस्या नहीं हुई।",
      date: "2 दिन पहले",
    },
    {
      name: "Priya Sharma",
      location: "Delhi NCR",
      rating: 5,
      text: "Excellent service! Got my Vietnam visa in just 30 minutes. Very helpful Hindi support on WhatsApp.",
      date: "1 week ago",
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Family trip to Vietnam was saved! Got 4 visas processed in under an hour. Highly recommend!",
      date: "5 days ago",
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      text: "UPI payment worked perfectly. Visa came on WhatsApp within 30 minutes. Great service!",
      date: "3 days ago",
    },
    {
      name: "Vikram Singh",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "Professional and fast. Applied at night, got visa by morning. Perfect for my business trip.",
      date: "1 week ago",
    },
    {
      name: "Ananya Gupta",
      location: "Kolkata, West Bengal",
      rating: 5,
      text: "हिंदी में सपोर्ट मिला, बहुत अच्छा अनुभव। वियतनाम यात्रा के लिए सबसे अच्छी सेवा!",
      date: "4 days ago",
    },
  ],

  // Softer, compliant testimonials for VietnamTravel.help
  travel: [
    {
      name: "Jennifer L.",
      location: "Seattle, USA",
      rating: 5,
      text: "Very helpful service! They guided me through the entire application process and answered all my questions about visiting Vietnam.",
      date: "1 week ago",
    },
    {
      name: "Marcus W.",
      location: "Berlin, Germany",
      rating: 5,
      text: "Clear instructions and professional support. My visa application was submitted correctly the first time. Great travel assistance!",
      date: "2 weeks ago",
    },
    {
      name: "Sophie M.",
      location: "Paris, France",
      rating: 5,
      text: "I appreciated the detailed guidance on required documents. Made planning my Vietnam trip much easier. Recommend for first-time visitors!",
      date: "5 days ago",
    },
    {
      name: "Robert K.",
      location: "Melbourne, Australia",
      rating: 5,
      text: "Good customer service. They helped me understand the visa requirements and what to expect at immigration. Smooth process.",
      date: "1 week ago",
    },
    {
      name: "Lisa Chen",
      location: "Vancouver, Canada",
      rating: 5,
      text: "Friendly and knowledgeable team. They explained everything clearly and my application was processed without any issues.",
      date: "3 days ago",
    },
  ],
};

// =============================================================================
// TRUST BADGES BY SITE
// =============================================================================

export type TrustBadge = {
  icon: string;
  value: string;
  label: string;
};

export const TRUST_BADGES: Record<string, TrustBadge[]> = {
  default: [
    { icon: "users", value: "50,000+", label: "Happy Customers" },
    { icon: "clock", value: "99.8%", label: "On-Time Delivery" },
    { icon: "globe", value: "80+", label: "Countries Supported" },
    { icon: "headphones", value: "24/7", label: "WhatsApp Support" },
  ],

  india: [
    { icon: "users", value: "10,000+", label: "Indian Travelers" },
    { icon: "clock", value: "30 Min", label: "Average Processing" },
    { icon: "shield", value: "100%", label: "Secure & Trusted" },
    { icon: "message", value: "हिंदी", label: "Hindi Support" },
  ],

  // Softer badges for VietnamTravel.help - no urgency messaging
  travel: [
    { icon: "users", value: "5+ Years", label: "Helping Travelers" },
    { icon: "globe", value: "80+", label: "Countries Served" },
    { icon: "shield", value: "Secure", label: "Data Protection" },
    { icon: "headphones", value: "7 Days", label: "Email Support" },
  ],
};

// =============================================================================
// INDIAN PAYMENT METHODS
// =============================================================================

export const INDIAN_PAYMENT_METHODS = [
  { name: "UPI", icon: "upi" },
  { name: "Paytm", icon: "paytm" },
  { name: "PhonePe", icon: "phonepe" },
  { name: "Google Pay", icon: "gpay" },
  { name: "Net Banking", icon: "netbanking" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get site config based on hostname
 */
export function getSiteConfig(hostname: string): SiteConfig {
  // Remove www. prefix if present
  const cleanHostname = hostname.replace(/^www\./, "").toLowerCase();

  // Check for exact match
  if (SITES[cleanHostname]) {
    return SITES[cleanHostname];
  }

  // Check for partial match (e.g., localhost:3000)
  for (const domain of Object.keys(SITES)) {
    if (cleanHostname.includes(domain.split(".")[0])) {
      return SITES[domain];
    }
  }

  // Default to main site
  return SITES["vietnamvisahelp.com"];
}

/**
 * Get site config for a specific country (for auto-detection)
 */
export function getSiteConfigForCountry(countryCode: string): SiteConfig | null {
  for (const site of Object.values(SITES)) {
    if (site.behavior.targetCountries.includes(countryCode)) {
      return site;
    }
  }
  return null;
}

/**
 * Get testimonials for a site
 */
export function getTestimonials(siteId: string): Testimonial[] {
  const site = Object.values(SITES).find(s => s.id === siteId);
  if (!site) return TESTIMONIALS.default;

  const testimonialSet = site.layout.testimonialSet;
  return TESTIMONIALS[testimonialSet] || TESTIMONIALS.default;
}

/**
 * Get trust badges for a site
 */
export function getTrustBadges(siteId: string): TrustBadge[] {
  const site = Object.values(SITES).find(s => s.id === siteId);
  if (!site) return TRUST_BADGES.default;

  const badgeVariant = site.layout.trustBadgeVariant;
  return TRUST_BADGES[badgeVariant] || TRUST_BADGES.default;
}

/**
 * Convert USD to INR (approximate rate)
 * In production, you'd want to use a real exchange rate API
 */
export function convertUSDtoINR(usdAmount: number): number {
  const exchangeRate = 83; // Approximate USD to INR rate
  return Math.round(usdAmount * exchangeRate);
}

/**
 * Format price based on site currency
 */
export function formatPrice(amount: number, siteConfig: SiteConfig): string {
  const { currencySymbol, currencyCode } = siteConfig.content;

  if (currencyCode === "INR") {
    const inrAmount = convertUSDtoINR(amount);
    return `${currencySymbol}${inrAmount.toLocaleString("en-IN")}`;
  }

  return `${currencySymbol}${amount}`;
}

/**
 * Get CSS variables for theme
 */
export function getThemeCSSVariables(theme: SiteTheme): Record<string, string> {
  return {
    "--color-primary": theme.primaryColor,
    "--color-primary-hover": theme.primaryColorHover,
    "--color-secondary": theme.secondaryColor,
    "--color-accent": theme.accentColor,
    "--color-urgency": theme.urgencyColor,
  };
}
