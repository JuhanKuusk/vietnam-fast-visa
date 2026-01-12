// All translatable strings for the website
// English is the source language - other languages are translated via DeepL API

export type SupportedLanguage = "EN" | "ES" | "PT" | "FR" | "RU";

export const LANGUAGES: Record<SupportedLanguage, { name: string; flag: string; nativeName: string }> = {
  EN: { name: "English", flag: "🇬🇧", nativeName: "English" },
  ES: { name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  PT: { name: "Portuguese", flag: "🇧🇷", nativeName: "Português" },
  FR: { name: "French", flag: "🇫🇷", nativeName: "Français" },
  RU: { name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
};

// All translatable content organized by section
export const translations = {
  // Header
  header: {
    siteName: "VietnamVisaHelp.com",
    tagline: "Express Visa Service",
    support: "24/7 WhatsApp Support",
    supportShort: "Support",
  },

  // Banner
  banner: {
    deniedBoarding: 'Denied boarding? "We can help now."',
    chatNow: "Chat Now",
  },

  // Hero Section
  hero: {
    urgencyBadge: "Stuck at check-in? We fix that in 30 minutes!",
    headline1: "Can't Check In?",
    headline2: "Approval in 30 Minutes",
    subtitle: "Get your Vietnam E-Visa approval letter in 30 minutes. Pass airline check-in immediately. Full visa ready before you land.",
    processedIn: "Processed in Ho Chi Minh City",
    localExperts: "Local Vietnamese Immigration Experts",
    thirtyMinutes: "30 Minutes",
    thirtyMinutesDesc: "Approval letter for airline check-in",
    oneToTwoHours: "1-2 Hours",
    oneToTwoHoursDesc: "Full visa issued before you land",
    checkFlightStatus: "Check Your Flight Status",
    enterFlightNumber: "Enter flight number (e.g. VN123)",
    perPerson: "/person",
    chatWithUs: "Chat With Us Now",
    learnAboutVisa: "Learn about Vietnam Visa Requirements",
  },

  // Trust Badges
  trust: {
    happyCustomers: "Happy Customers",
    onTimeDelivery: "On-Time Delivery",
    countriesSupported: "Countries Supported",
    whatsappSupport: "WhatsApp Support",
  },

  // Application Form
  form: {
    title: "Start Your E-Visa Application",
    subtitle: "Complete in under 5 minutes",
    faqLink: "Have questions? See FAQ below",
    numberOfApplicants: "Number of Applicants",
    person: "person",
    people: "people",
    purposeOfTravel: "Purpose of Travel",
    tourist: "Tourist",
    business: "Business",
    visiting: "Visiting relatives/friends",
    arrivalAirport: "Arrival Airport",
    selectAirport: "Select arrival airport",
    entryDate: "Entry Date",
    exitDate: "Exit Date",
    flightNumber: "Flight Number",
    flightPlaceholder: "e.g. VN123, SQ456",
    addressInVietnam: "Address in Vietnam",
    addressOptional: "(Optional)",
    hotelPlaceholder: "Hotel name or address",
    urgentRescue: "URGENT RESCUE - 30 Minutes",
    urgentRescueDesc: "30 min check-in approval • Full visa in 1-2 hours",
    serviceFee: "Service fee",
    total: "Total",
    continueButton: "Continue to Applicant Details →",
    securePayment: "Secure Payment",
    moneyBackGuarantee: "Money-back Guarantee",
  },

  // Sidebar
  sidebar: {
    whyChooseUs: "Why Choose Us?",
    fastestProcessing: "Fastest Processing",
    fastestProcessingDesc: "Check-in approval in 30 minutes",
    whatsappSupport: "24/7 WhatsApp Support",
    whatsappSupportDesc: "Real-time updates on your visa",
    moneyBack: "Money-back Guarantee",
    moneyBackDesc: "Full refund if visa is rejected",
    localExperts: "Local Vietnamese Experts",
    localExpertsDesc: "Processed in Ho Chi Minh City",
    priceComparison: "Price Comparison",
    ourPrice: "Our price (30 min)",
    competitorA: "Competitor A (2h)",
    competitorB: "Competitor B (1-2h)",
    voaTitle: "Important: Visa on Arrival",
    voaText: "Vietnam does NOT issue visas at the airport without advance approval.",
    voaPoint1: "Apply in advance for approval letter",
    voaPoint2: "Airlines require this before boarding",
    voaPoint3: "Without it, you cannot fly to Vietnam",
  },

  // FAQ Section
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about Vietnam visas",
    stillHaveQuestions: "Still have questions?",
    chatWithUsNow: "Chat with us now",
    whatsappUs: "WhatsApp us",
    q1: "What is the 30-minute approval letter?",
    a1: "The approval letter is an official pre-authorization that allows you to check in with your airline. Airlines require this before letting you board a flight to Vietnam. We deliver this within 30 minutes so you can proceed with check-in immediately.",
    q2: "Can I get a visa at the Vietnam airport?",
    a2: "No. Vietnam does NOT issue visas at the airport without prior approval. You must have a pre-approved visa letter before your airline will allow you to board. Without this, you cannot fly to Vietnam.",
    q3: "I'm stuck at check-in. Can you help now?",
    a3: "Yes! This is exactly what we specialize in. Apply now and we'll have your approval letter ready in 30 minutes. Contact us via chat or WhatsApp for immediate assistance.",
    q4: "How long is the e-visa valid?",
    a4: "The Vietnam e-visa is valid for up to 90 days with single or multiple entry options. The visa allows stays of up to 90 days per visit.",
    q5: "What documents do I need?",
    a5: "You only need: (1) A passport valid for at least 6 months, (2) A passport-style photo, (3) Your flight details. We'll guide you through the simple process.",
    q6: "What if my visa is rejected?",
    a6: "We offer a 100% money-back guarantee if your visa is rejected. We have a 99% approval rate and will work with you to ensure success.",
    q7: "Do I need to pay again at the Vietnam airport?",
    a7: "No additional airport fees. Our price of $149 is all-inclusive. Once you have your e-visa, simply show it at immigration - no extra payments required.",
  },

  // Footer
  footer: {
    expressService: "Express Vietnam E-Visa Service",
    processedBy: "Processed in Ho Chi Minh City by Local Vietnamese Experts",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    refundPolicy: "Refund Policy",
    copyright: "© 2026 VietnamVisaHelp.com - All rights reserved",
  },

  // Visa Info Modal
  modal: {
    title: "Vietnam Visa Guide",
    intro: "To enter Vietnam, travelers must have valid immigration approval before departure, unless they are from a visa-exempt country.",
    step1Title: "Check if You Need a Visa",
    step1Content: "Determine your visa requirement based on your nationality. Some may enter visa-free, others need e-visa or visa on arrival.",
    step2Title: "Choose the Correct Visa Type",
    step2Content: "Select tourist, business, or visiting visa based on your travel purpose and length of stay.",
    step3Title: "Submit Your Online Application",
    step3Content: "Complete the form with passport details, personal information, travel dates, and entry point.",
    step4Title: "Immigration Pre-Approval",
    step4Content: "Your application is submitted to Vietnam Immigration for review. This is mandatory for all visas.",
    step5Title: "Receive Your Approval Letter",
    step5Content: "Once approved, you will receive an e-visa (PDF) or visa approval letter via email.",
    step6Title: "Prepare for Travel",
    step6Content: "Print your e-visa or approval letter, ensure passport is valid, and have return ticket ready.",
    importantTitle: 'Important: "Visa on Arrival"',
    importantText: "Vietnam does NOT issue visas at the airport without advance approval. A pre-approved visa letter is mandatory before travel.",
    gotItButton: "Got it, Start Application →",
  },

  // Flight Info component
  flight: {
    checkInClosesIn: "Check-in closes in",
    checkInClosed: "Check-in has CLOSED - Contact us immediately!",
    checkInStatus: "Check-in status unknown",
    closesAt: "Closes at",
    terminal: "Terminal",
    gate: "Gate",
    urgentChat: "URGENT: Chat Now for Help!",
    getVisaBefore: "Get Visa Before Check-in Closes!",
  },
};

// Helper function to get all translation keys as a flat array for API translation
export function getAllTranslationTexts(): string[] {
  const texts: string[] = [];

  function extractTexts(obj: Record<string, unknown>): void {
    for (const value of Object.values(obj)) {
      if (typeof value === "string") {
        texts.push(value);
      } else if (typeof value === "object" && value !== null) {
        extractTexts(value as Record<string, unknown>);
      }
    }
  }

  extractTexts(translations as unknown as Record<string, unknown>);
  return texts;
}

// Helper to rebuild translations object from flat array
export function rebuildTranslations(texts: string[]): typeof translations {
  let index = 0;

  function rebuild<T>(obj: T): T {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof value === "string") {
        result[key] = texts[index++];
      } else if (typeof value === "object" && value !== null) {
        result[key] = rebuild(value);
      }
    }
    return result as T;
  }

  return rebuild(translations);
}
