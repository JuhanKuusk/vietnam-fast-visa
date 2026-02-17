import { NextRequest, NextResponse } from "next/server";
import { trackTourAnalytics } from "@/lib/tours-supabase";
import type { TourAnalyticsEvent } from "@/types/tours";

export async function POST(request: NextRequest) {
  try {
    const body: TourAnalyticsEvent = await request.json();

    // Validate required fields
    if (!body.tourId || !body.eventType) {
      return NextResponse.json(
        { error: "Missing required fields (tourId, eventType)" },
        { status: 400 }
      );
    }

    // Validate event type
    const validEventTypes = ["view", "inquiry", "affiliate_click"];
    if (!validEventTypes.includes(body.eventType)) {
      return NextResponse.json(
        { error: "Invalid event type. Must be: view, inquiry, or affiliate_click" },
        { status: 400 }
      );
    }

    // Get client information
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Track analytics
    await trackTourAnalytics({
      tourId: body.tourId,
      eventType: body.eventType,
      sourceDomain: body.sourceDomain || "vietnamtravel.help",
      userAgent,
      referrer,
    });

    return NextResponse.json({
      success: true,
      message: "Analytics tracked successfully",
    });
  } catch (error) {
    console.error("Error tracking tour analytics:", error);

    // Analytics failures shouldn't break the user experience
    // Return success even if tracking fails
    return NextResponse.json({
      success: true,
      message: "Request processed",
    });
  }
}
