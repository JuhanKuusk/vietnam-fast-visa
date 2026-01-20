import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { applicationSchema, VISA_SPEED_PRICING, MULTI_ENTRY_FEE } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();
    const body = await request.json();

    // Validate input
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation errors:", JSON.stringify(validationResult.error.flatten(), null, 2));
      console.error("Received body:", JSON.stringify(body, null, 2));
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tripDetails, applicants, language, visaSpeed } = validationResult.data;

    // Calculate total amount based on visa speed and entry type
    const pricePerPerson = VISA_SPEED_PRICING[visaSpeed];
    const entryType = tripDetails.entryType || "single";
    const multiEntryFee = entryType === "multiple" ? MULTI_ENTRY_FEE * applicants.length : 0;
    const totalAmount = (pricePerPerson * applicants.length) + multiEntryFee;

    // Get email and WhatsApp from first applicant
    const primaryApplicant = applicants[0];

    // Create application with all fields
    const { data: application, error: appError } = await supabase
      .from("applications")
      .insert({
        entry_date: tripDetails.entryDate,
        exit_date: tripDetails.exitDate,
        entry_port: tripDetails.entryPort,
        entry_type: entryType,
        purpose: tripDetails.purpose,
        flight_number: tripDetails.flightNumber || null,
        email: primaryApplicant.email,
        whatsapp: primaryApplicant.whatsapp,
        amount_usd: totalAmount,
        status: "pending_payment",
        payment_status: "pending",
        language: language || "EN",
        visa_speed: visaSpeed,
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

    // Create applicants with ALL fields
    const applicantsToInsert = applicants.map((applicant) => ({
      application_id: application.id,
      // Personal Information
      full_name: applicant.fullName,
      nationality: applicant.nationality,
      date_of_birth: applicant.dateOfBirth,
      gender: applicant.gender,
      religion: applicant.religion,
      place_of_birth: applicant.placeOfBirth || null,
      // Passport Information
      passport_number: applicant.passportNumber.toUpperCase(),
      passport_type: applicant.passportType || "ordinary",
      passport_issue_date: applicant.passportIssueDate || null,
      passport_expiry_date: applicant.passportExpiry || null,
      issuing_authority: applicant.issuingAuthority || null,
      // Address Information
      permanent_address: applicant.permanentAddress || null,
      contact_address: applicant.contactAddress || null,
      telephone: applicant.telephone || null,
      // Emergency Contact
      emergency_contact_name: applicant.emergencyContactName || null,
      emergency_contact_address: applicant.emergencyAddress || null,
      emergency_contact_phone: applicant.emergencyPhone || null,
      emergency_contact_relationship: applicant.emergencyRelationship || null,
    }));

    const { data: insertedApplicants, error: applicantsError } = await supabase
      .from("applicants")
      .insert(applicantsToInsert)
      .select();

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
      applicantIds: insertedApplicants?.map(a => a.id) || [],
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
