import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTourBySlug, getRelatedTours } from "@/lib/tours-utils";
import { FEATURED_TOURS } from "@/lib/tours-data";
import { TourDetailHero } from "@/components/tours/TourDetailHero";
import { TourHighlights } from "@/components/tours/TourHighlights";
import { TourItinerary } from "@/components/tours/TourItinerary";
import { TourPricing } from "@/components/tours/TourPricing";
import { TourInquiryForm } from "@/components/tours/TourInquiryForm";
import { RelatedTours } from "@/components/tours/RelatedTours";

// Allow dynamic params in development
export const dynamicParams = true;

export async function generateStaticParams() {
  return FEATURED_TOURS.map((tour) => ({
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
            <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: tour.fullDescription }}
              />
            </section>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <TourHighlights highlights={tour.highlights} />
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <TourItinerary itinerary={tour.itinerary} />
            )}

            {/* Included/Excluded */}
            {(tour.included || tour.excluded) && (
              <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Included */}
                  {tour.included && tour.included.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Excluded */}
                  {tour.excluded && tour.excluded.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <svg
                              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Pricing & Booking (1/3 width, sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
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
