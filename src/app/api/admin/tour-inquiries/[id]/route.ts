import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("tour_inquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching tour inquiry:", error);
      return NextResponse.json(
        { error: "Tour inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ inquiry: data });
  } catch (error) {
    console.error("Error in tour inquiry API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
      if (status === "contacted") {
        updateData.contacted_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("tour_inquiries")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating tour inquiry:", error);
      return NextResponse.json(
        { error: "Failed to update tour inquiry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ inquiry: data });
  } catch (error) {
    console.error("Error in tour inquiry update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
