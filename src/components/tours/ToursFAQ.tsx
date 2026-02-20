"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the best time to visit Vietnam?",
    answer: "Vietnam can be visited year-round, but the best time depends on which region you plan to explore. Northern Vietnam (Hanoi, Halong Bay, Sapa) is best from October to April with cool, dry weather. Central Vietnam (Hue, Hoi An, Da Nang) is ideal from February to August. Southern Vietnam (Ho Chi Minh City, Mekong Delta) is best from December to April during the dry season. For a comprehensive trip covering all regions, October to December offers the most pleasant weather nationwide.",
  },
  {
    question: "Do I need a visa to visit Vietnam?",
    answer: "Visa requirements depend on your nationality. Citizens from many countries can enter Vietnam visa-free for 15-45 days. Others can apply for an e-Visa online or obtain a visa on arrival. We recommend checking the latest visa requirements for your specific nationality before booking. Our team can also assist with e-Visa applications through our main website.",
  },
  {
    question: "How far in advance should I book tours?",
    answer: "We recommend booking 2-4 weeks in advance, especially during peak season (October-April) and Vietnamese holidays like Tet (Lunar New Year). Popular cruises in Halong Bay and Lan Ha Bay can fill up quickly. For last-minute bookings, contact us directly via WhatsApp for availability.",
  },
  {
    question: "What should I pack for a Vietnam tour?",
    answer: "Essential items include: lightweight, breathable clothing; comfortable walking shoes; sun protection (hat, sunscreen, sunglasses); insect repellent; a light rain jacket or umbrella; modest clothing for temple visits (covering shoulders and knees); and a good camera. For cruises, pack swimwear and bring motion sickness medication if needed.",
  },
  {
    question: "Are meals included in the tours?",
    answer: "Most multi-day tours and cruises include meals as specified in the tour details. Day trips typically include lunch. All our tours feature authentic Vietnamese cuisine with options for vegetarian, vegan, and other dietary requirements. Please inform us of any dietary restrictions when booking.",
  },
  {
    question: "What is the group size for tours?",
    answer: "Group sizes vary by tour type. Day trips typically have 8-15 participants. Cruises range from 12-40 guests depending on the boat size. Private tours are also available for those who prefer a more personalized experience. Contact us for private tour options and pricing.",
  },
  {
    question: "Is travel insurance required?",
    answer: "While not mandatory, we strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellation, and personal belongings. Vietnam has excellent private hospitals, but medical costs can be significant without insurance. Make sure your policy covers activities like kayaking, cycling, or trekking if your tour includes these.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. Full payment is typically required at the time of booking for day trips, while multi-day tours may require a deposit with the balance due before the tour date.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Our standard cancellation policy offers a full refund if cancelled more than 7 days before the tour date, 50% refund for 3-7 days, and no refund for cancellations within 48 hours. However, policies may vary for specific tours, especially cruises with limited availability. Check individual tour details or contact us for specific cancellation terms.",
  },
  {
    question: "Are the tours suitable for children?",
    answer: "Many of our tours are family-friendly! Day trips to Halong Bay, Cu Chi Tunnels, and the Mekong Delta are suitable for children of all ages. For multi-day tours and cruises, we recommend ages 6 and above for the best experience. Some adventure tours like trekking in Sapa may have age restrictions. Contact us for family-specific recommendations.",
  },
];

export function ToursFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about traveling in Vietnam
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-cyan-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
