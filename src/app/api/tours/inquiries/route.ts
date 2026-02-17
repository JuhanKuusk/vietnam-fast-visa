import { NextRequest, NextResponse } from "next/server";
import {
  createTourInquiry,
  generateInquiryNumber,
} from "@/lib/tours-supabase";
import { sendTourInquiryEmails } from "@/lib/tours-email";
import type { TourInquiryFormData } from "@/types/tours";

export async function POST(request: NextRequest) {
  try {
    const body: TourInquiryFormData = await request.json();

    // Validate required fields
    if (
      !body.tourId ||
      !body.tourName ||
      !body.fullName ||
      !body.email ||
      !body.phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Generate unique inquiry number
    const inquiryNumber = await generateInquiryNumber();

    // Get client information
    const userAgent = request.headers.get("user-agent") || "";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Create inquiry in database
    const inquiry = await createTourInquiry({
      inquiryNumber,
      tourId: body.tourId,
      tourName: body.tourName,
      tourCategory: body.tourCategory,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
      nationality: body.nationality,
      preferredDate: body.preferredDate,
      numberOfAdults: body.numberOfAdults,
      numberOfChildren: body.numberOfChildren || 0,
      specialRequests: body.specialRequests,
      status: "new",
      referredToAffiliate: false,
      sourceDomain: "vietnamtravel.help",
      userAgent,
      ipAddress,
    });

    // Send email notifications (don't wait for it)
    sendTourInquiryEmails(inquiry).catch((error) => {
      console.error("Failed to send tour inquiry emails:", error);
      // Don't throw - inquiry is already saved
    });

    return NextResponse.json({
      success: true,
      inquiryNumber: inquiry.inquiryNumber,
      message: "Tour inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Error creating tour inquiry:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit tour inquiry",
      },
      { status: 500 }
    );
  }
}

// Get inquiry by number (optional - for future use)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const inquiryNumber = searchParams.get("inquiryNumber");

  if (!inquiryNumber) {
    return NextResponse.json(
      { error: "Inquiry number required" },
      { status: 400 }
    );
  }

  try {
    const { getTourInquiryByNumber } = await import("@/lib/tours-supabase");
    const inquiry = await getTourInquiryByNumber(inquiryNumber);

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ inquiry });
  } catch (error) {
    console.error("Error fetching tour inquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiry" },
      { status: 500 }
    );
  }
}
