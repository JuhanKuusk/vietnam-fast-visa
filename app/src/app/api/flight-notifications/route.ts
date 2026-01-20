import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email, flightNumber, flightDate, departureAirport, arrivalAirport, scheduledDeparture } = await request.json();

    // Validate required fields
    if (!email || !flightNumber || !flightDate) {
      return NextResponse.json(
        { error: "Email, flight number, and flight date are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // Insert or update the subscription
    const { data, error } = await supabase
      .from("flight_notification_subscriptions")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          flight_number: flightNumber.toUpperCase().trim(),
          flight_date: flightDate,
          departure_airport: departureAirport || null,
          arrival_airport: arrivalAirport || null,
          scheduled_departure: scheduledDeparture || null,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "email,flight_number,flight_date",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe to notifications" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to flight notifications",
      subscription: {
        id: data.id,
        email: data.email,
        flightNumber: data.flight_number,
        flightDate: data.flight_date,
      },
    });
  } catch (error) {
    console.error("Flight notification subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to notifications" },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const flightNumber = searchParams.get("flight");
    const flightDate = searchParams.get("date");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    let query = supabase
      .from("flight_notification_subscriptions")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("email", email.toLowerCase().trim());

    // If specific flight provided, only unsubscribe from that
    if (flightNumber && flightDate) {
      query = query
        .eq("flight_number", flightNumber.toUpperCase().trim())
        .eq("flight_date", flightDate);
    }

    const { error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to unsubscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from notifications",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
