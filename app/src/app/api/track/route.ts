import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { referenceNumber, email } = await request.json();

    if (!referenceNumber || !email) {
      return NextResponse.json(
        { error: "Reference number and email are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find application by reference number and email
    const { data: application, error } = await supabase
      .from("applications")
      .select(`
        id,
        reference_number,
        status,
        payment_status,
        entry_date,
        exit_date,
        entry_port,
        visa_speed,
        created_at,
        paid_at,
        delivered_at,
        applicants (
          id,
          full_name,
          nationality,
          visa_document_url
        )
      `)
      .eq("reference_number", referenceNumber.toUpperCase())
      .eq("email", email.toLowerCase())
      .single();

    if (error || !application) {
      return NextResponse.json(
        { error: "Application not found. Please check your reference number and email." },
        { status: 404 }
      );
    }

    // Format response for client
    const response = {
      referenceNumber: application.reference_number,
      status: application.status,
      paymentStatus: application.payment_status,
      entryDate: application.entry_date,
      exitDate: application.exit_date,
      entryPort: application.entry_port,
      visaSpeed: application.visa_speed,
      createdAt: application.created_at,
      paidAt: application.paid_at,
      deliveredAt: application.delivered_at,
      applicants: application.applicants.map((a: { id: string; full_name: string; nationality: string; visa_document_url: string | null }) => ({
        id: a.id,
        fullName: a.full_name,
        nationality: a.nationality,
        hasVisaDocument: !!a.visa_document_url,
        visaDocumentUrl: a.visa_document_url,
      })),
    };

    return NextResponse.json({ application: response });
  } catch (error) {
    console.error("Track application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
