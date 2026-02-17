interface TourHighlightsProps {
  highlights: string[];
}

export function TourHighlights({ highlights }: TourHighlightsProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-cyan-600 mt-0.5 flex-shrink-0"
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
            <span className="text-gray-700 font-medium">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
