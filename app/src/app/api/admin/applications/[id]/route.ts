import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get application with applicants and visa documents
    const { data: application, error } = await supabase
      .from("applications")
      .select(`
        *,
        applicants (*),
        visa_documents (*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Get application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
    const updates = await request.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Only allow updating specific fields
    const allowedFields = ["status", "notes", "visa_speed"];
    const filteredUpdates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    }

    // Add timestamps based on status changes
    if (updates.status === "processing") {
      filteredUpdates.processed_at = new Date().toISOString();
    } else if (updates.status === "delivered") {
      filteredUpdates.delivered_at = new Date().toISOString();
    }

    filteredUpdates.updated_at = new Date().toISOString();

    const { data: application, error } = await supabase
      .from("applications")
      .update(filteredUpdates)
      .eq("id", id)
      .select(`
        *,
        applicants (*),
        visa_documents (*)
      `)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Update application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
