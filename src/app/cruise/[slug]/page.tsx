import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTourBySlug, getRelatedTours } from "@/lib/tours-utils";
import { getAllActiveTours } from "@/lib/tours-data";
import { TourDetailHero } from "@/components/tours/TourDetailHero";
import { TourDescription } from "@/components/tours/TourDescription";
import { TourHighlights } from "@/components/tours/TourHighlights";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourIncludedExcluded } from "@/components/tours/TourIncludedExcluded";
import { TourPricing } from "@/components/tours/TourPricing";
import { TourInquiryForm } from "@/components/tours/TourInquiryForm";
import { RelatedTours } from "@/components/tours/RelatedTours";
import { TourVariationSelector } from "@/components/tours/TourVariationSelector";

// Allow dynamic params in development
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllActiveTours().map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.name} | VietnamTravel.help`,
    description: tour.description,
    openGraph: {
      title: tour.name,
      description: tour.description,
      images: [tour.imageUrl],
      type: "website",
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = getRelatedTours(tour.id, tour.category, tour.location, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <TourDetailHero tour={tour} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Description */}
            <TourDescription tour={tour} />

            {/* Highlights */}
            <TourHighlights tour={tour} />

            {/* Itinerary */}
            <TourItinerary tour={tour} />

            {/* Included/Excluded */}
            <TourIncludedExcluded tour={tour} />
          </div>

          {/* Right Column - Pricing & Booking (1/3 width, sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Variation Selector - shows if tour has variations */}
              <TourVariationSelector currentTour={tour} />
              <TourPricing tour={tour} />
              <TourInquiryForm tour={tour} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <RelatedTours tours={relatedTours} />
          </div>
        </section>
      )}
    </main>
  );
}
