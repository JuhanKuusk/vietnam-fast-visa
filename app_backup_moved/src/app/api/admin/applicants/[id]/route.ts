import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/auth";

// Allowed fields that can be updated
const ALLOWED_FIELDS = [
  "full_name",
  "nationality",
  "date_of_birth",
  "gender",
  "religion",
  "place_of_birth",
  "passport_number",
  "passport_type",
  "passport_issue_date",
  "passport_expiry_date",
  "issuing_authority",
  "permanent_address",
  "contact_address",
  "telephone",
  "emergency_contact_name",
  "emergency_contact_address",
  "emergency_contact_phone",
  "emergency_contact_relationship",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Filter to only allowed fields
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      if (ALLOWED_FIELDS.includes(key)) {
        updates[key] = value || null;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    const { data: applicant, error } = await supabase
      .from("applicants")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: "Failed to update applicant" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, applicant });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = getSupabaseServer();

    const { data: applicant, error } = await supabase
      .from("applicants")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ applicant });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
