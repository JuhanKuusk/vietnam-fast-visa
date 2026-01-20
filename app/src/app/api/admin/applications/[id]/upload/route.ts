import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: applicationId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const applicantId = formData.get("applicantId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!applicantId) {
      return NextResponse.json({ error: "Applicant ID required" }, { status: 400 });
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Upload to Supabase Storage
    const fileName = `${applicationId}/${applicantId}/visa-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("visa-documents")
      .upload(fileName, file, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("visa-documents")
      .getPublicUrl(uploadData.path);

    const documentUrl = urlData.publicUrl;

    // Create visa_documents record
    const { data: document, error: docError } = await supabase
      .from("visa_documents")
      .insert({
        application_id: applicationId,
        applicant_id: applicantId,
        document_url: documentUrl,
        uploaded_by: user.userId,
      })
      .select()
      .single();

    if (docError) {
      console.error("Document record error:", docError);
      return NextResponse.json({ error: "Failed to save document record" }, { status: 500 });
    }

    // Update applicant's visa_document_url
    await supabase
      .from("applicants")
      .update({
        visa_document_url: documentUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", applicantId);

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        documentUrl,
        uploadedAt: document.uploaded_at,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
