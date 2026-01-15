import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { applicationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();
    const body = await request.json();

    // Validate input
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tripDetails, applicants, language } = validationResult.data;

    // Calculate total amount
    const pricePerPerson = 149;
    const totalAmount = pricePerPerson * applicants.length;

    // Get email and WhatsApp from first applicant
    const primaryApplicant = applicants[0];

    // Create application
    const { data: application, error: appError } = await supabase
      .from("applications")
      .insert({
        entry_date: tripDetails.entryDate,
        exit_date: tripDetails.exitDate,
        entry_port: tripDetails.arrivalPort,
        email: primaryApplicant.email,
        whatsapp: primaryApplicant.whatsapp,
        amount_usd: totalAmount,
        status: "pending_payment",
        payment_status: "pending",
        language: language || "EN",
      })
      .select()
      .single();

    if (appError) {
      console.error("Application creation error:", appError);
      return NextResponse.json(
        { error: "Failed to create application" },
        { status: 500 }
      );
    }

    // Create applicants
    const applicantsToInsert = applicants.map((applicant) => ({
      application_id: application.id,
      full_name: applicant.fullName,
      nationality: applicant.nationality,
      passport_number: applicant.passportNumber.toUpperCase(),
      date_of_birth: applicant.dateOfBirth,
      gender: applicant.gender,
    }));

    const { error: applicantsError } = await supabase
      .from("applicants")
      .insert(applicantsToInsert);

    if (applicantsError) {
      console.error("Applicants creation error:", applicantsError);
      // Rollback: delete the application
      await supabase.from("applications").delete().eq("id", application.id);
      return NextResponse.json(
        { error: "Failed to create applicants" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      referenceNumber: application.reference_number,
      amount: totalAmount,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();
    const searchParams = request.nextUrl.searchParams;
    const referenceNumber = searchParams.get("ref");
    const email = searchParams.get("email");

    if (!referenceNumber || !email) {
      return NextResponse.json(
        { error: "Reference number and email are required" },
        { status: 400 }
      );
    }

    const { data: application, error } = await supabase
      .from("applications")
      .select(
        `
        *,
        applicants (*)
      `
      )
      .eq("reference_number", referenceNumber.toUpperCase())
      .eq("email", email.toLowerCase())
      .single();

    if (error || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
