"use client";

import { useEffect, useState } from "react";

// Inline SVG icons to avoid lucide-react dependency
const PlaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

interface FlightRiskData {
  showRisk: boolean;
  countryCode: string;
  visaSpeed: string;
  riskLevel?: "high" | "medium" | "low" | "none";
  origin?: string;
  priceRange?: {
    min: number;
    max: number;
    median: number;
  };
  currency?: string;
  isFallback?: boolean;
}

interface FlightRiskBlockProps {
  countryCode: string;
  visaSpeed: string;
  language?: string;
  airportCode?: string;
}

// Translations for the risk block
const translations: Record<string, {
  title: string;
  flightCost: string;
  warning: string;
  returnWarning: string;
  recommendation: string;
}> = {
  EN: {
    title: "Flight Ticket Risk Warning",
    flightCost: "Flights from {origin} to Vietnam typically cost",
    warning: "If airline check-in is denied due to missing visa approval, you will not be allowed to board.",
    returnWarning: "Both your outbound AND return tickets may become completely worthless - most airlines do not offer refunds or rebooking for passengers denied boarding due to visa issues.",
    recommendation: "Secure your visa approval before booking expensive flights to protect your investment.",
  },
  ES: {
    title: "Advertencia de Riesgo de Billete de Avion",
    flightCost: "Los vuelos desde {origin} a Vietnam suelen costar",
    warning: "Si se le niega el embarque por falta de visa aprobada, no podra abordar el avion.",
    returnWarning: "Tanto su billete de ida COMO el de vuelta pueden perder todo su valor - la mayoria de aerolineas no ofrecen reembolsos ni cambios para pasajeros rechazados por problemas de visa.",
    recommendation: "Asegure su aprobacion de visa antes de reservar vuelos caros para proteger su inversion.",
  },
  PT: {
    title: "Aviso de Risco de Passagem Aerea",
    flightCost: "Voos de {origin} para o Vietna geralmente custam",
    warning: "Se o embarque for negado por falta de visto aprovado, voce nao podera embarcar.",
    returnWarning: "Tanto a passagem de ida QUANTO a de volta podem perder todo o valor - a maioria das companhias aereas nao oferece reembolso ou remarcacao para passageiros recusados por problemas de visto.",
    recommendation: "Garanta a aprovacao do seu visto antes de comprar passagens caras para proteger seu investimento.",
  },
  FR: {
    title: "Avertissement de Risque Billet d'Avion",
    flightCost: "Les vols depuis {origin} vers le Vietnam coutent generalement",
    warning: "Si l'embarquement vous est refuse en raison d'un visa non approuve, vous ne pourrez pas monter a bord.",
    returnWarning: "Vos billets aller ET retour peuvent perdre toute valeur - la plupart des compagnies aeriennes n'offrent ni remboursement ni modification pour les passagers refuses pour problemes de visa.",
    recommendation: "Obtenez votre approbation de visa avant de reserver des vols couteux pour proteger votre investissement.",
  },
  RU: {
    title: "Preduprezhdenie o riske aviabileta",
    flightCost: "Polety iz {origin} vo V'etnam obychno stoyat",
    warning: "Esli vam otkazhut v posadke iz-za otsutstviya odobrennoj vizy, vy ne smozhete sest' na reys.",
    returnWarning: "Bilety v OBA napravleniya mogut polnost'yu obestsenitsya - bol'shinstvo aviakompanij ne predlagayut vozvrat ili perebronirovaniye passazhiram, kotorym otkazano v posadke iz-za vizovykh problem.",
    recommendation: "Poluchite odobrenie vizy pered pokupkoj dorogikh biletov, chtoby zashchitit' svoi vlozheniia.",
  },
  HI: {
    title: "Flight Ticket Jokhim Chetavani",
    flightCost: "{origin} se Vietnam ke liye udaanon ki keemat aamtaur par hoti hai",
    warning: "Agar visa anumoden ki kami ke karan boarding se inkaar kar diya jaata hai, to aap flight mein nahi chadh payenge.",
    returnWarning: "Aapki jaane AUR wapsi dono tickets bekar ho sakti hain - adhikansh airlines visa samasyaon ke karan boarding se inkaar kiye gaye yatriyon ko refund ya rebooking nahi deti.",
    recommendation: "Apne nivesh ki raksha ke liye mahangi flights book karne se pehle visa anumoden surakshit karein.",
  },
};

export function FlightRiskBlock({ countryCode, visaSpeed, language = "EN", airportCode }: FlightRiskBlockProps) {
  const [riskData, setRiskData] = useState<FlightRiskData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[language] || translations.EN;

  useEffect(() => {
    if (!countryCode) {
      setIsLoading(false);
      return;
    }

    const fetchRiskData = async () => {
      try {
        let url = `/api/flight-price-risk?country=${countryCode}&visaSpeed=${visaSpeed}`;
        if (airportCode) {
          url += `&airport=${airportCode}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setRiskData(data);
        }
      } catch (error) {
        console.error("Error fetching flight risk data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiskData();
  }, [countryCode, visaSpeed, airportCode]);

  // Don't render anything while loading or if risk should not be shown
  if (isLoading || !riskData?.showRisk) {
    return null;
  }

  const { origin, priceRange } = riskData;

  // Format price range
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const priceRangeText = priceRange
    ? `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`
    : "";

  const flightCostText = t.flightCost.replace("{origin}", origin || countryCode);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <PlaneIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <AlertTriangleIcon className="w-4 h-4 text-amber-500" />
            {t.title}
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {flightCostText}{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {priceRangeText}
            </span>
            .
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t.warning}
          </p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
            {t.returnWarning}
          </p>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">
            {t.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
