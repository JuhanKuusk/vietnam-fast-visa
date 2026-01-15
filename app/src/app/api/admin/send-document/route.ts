import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";
import { getCurrentUser } from "@/lib/auth";
import { sendVisaDocumentEmail } from "@/lib/resend";
import { SupportedLanguage } from "@/lib/translations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { documentId, applicationId, applicantId } = await request.json();

    if (!documentId || !applicationId || !applicantId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get application, applicant, and document details
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const { data: applicant, error: applicantError } = await supabase
      .from("applicants")
      .select("*")
      .eq("id", applicantId)
      .single();

    if (applicantError || !applicant) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    const { data: document, error: docError } = await supabase
      .from("visa_documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (docError || !document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const results = {
      whatsapp: { success: false, error: "" },
      email: { success: false, error: "" },
    };

    // Send WhatsApp message with PDF
    try {
      const whatsappNumber = application.whatsapp.startsWith("+")
        ? application.whatsapp
        : `+${application.whatsapp}`;

      await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886"}`,
        to: `whatsapp:${whatsappNumber}`,
        body: `*Your Vietnam Visa is Ready!* 🎉

Reference: ${application.reference_number}
Applicant: ${applicant.full_name}

Your visa document is attached. Please print it or save it on your phone to present at Vietnam immigration.

Thank you for using Vietnam Fast Visa! 🇻🇳`,
        mediaUrl: [document.document_url],
      });

      results.whatsapp.success = true;

      // Update document record
      await supabase
        .from("visa_documents")
        .update({
          sent_to_whatsapp: true,
          whatsapp_sent_at: new Date().toISOString(),
        })
        .eq("id", documentId);
    } catch (error) {
      console.error("WhatsApp send error:", error);
      results.whatsapp.error = error instanceof Error ? error.message : "Failed to send WhatsApp";
    }

    // Send Email with PDF attachment
    try {
      // Get user's language preference (default to EN)
      const language = (application.language as SupportedLanguage) || "EN";

      const emailResult = await sendVisaDocumentEmail({
        to: application.email,
        applicantName: applicant.full_name,
        referenceNumber: application.reference_number,
        documentUrl: document.document_url,
        language,
      });

      if (emailResult.success) {
        results.email.success = true;

        // Update document record
        await supabase
          .from("visa_documents")
          .update({
            sent_to_email: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq("id", documentId);
      } else {
        results.email.error = emailResult.error || "Failed to send email";
      }
    } catch (error) {
      console.error("Email send error:", error);
      results.email.error = error instanceof Error ? error.message : "Failed to send email";
    }

    // Update application status to delivered if both succeeded
    if (results.whatsapp.success && results.email.success) {
      await supabase
        .from("applications")
        .update({
          status: "delivered",
          delivered_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId);
    }

    return NextResponse.json({
      success: results.whatsapp.success || results.email.success,
      results,
    });
  } catch (error) {
    console.error("Send document error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
