import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, nationality, arrivalDate } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get metadata
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referer = request.headers.get("referer") || "";

    // Store in Supabase if configured
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error: dbError } = await supabase
        .from("concierge_leads")
        .insert({
          name,
          email,
          nationality: nationality || null,
          arrival_date: arrivalDate || null,
          source_url: referer,
          ip_address: ip,
          user_agent: userAgent,
        });

      if (dbError) {
        console.error("Supabase error:", dbError);
        // Continue anyway - don't fail the request if DB insert fails
      }
    }

    // TODO: Send email with checklist (implement with your email service)
    // For now, just log the submission
    console.log("Concierge lead captured:", { name, email, nationality, arrivalDate });

    return NextResponse.json({
      success: true,
      message: "Checklist request received. Check your email!",
    });
  } catch (error) {
    console.error("Error processing checklist request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
