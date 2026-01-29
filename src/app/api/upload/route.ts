import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const applicantId = formData.get("applicantId") as string;
    const type = formData.get("type") as "passport" | "portrait";

    if (!file || !applicantId || !type) {
      return NextResponse.json(
        { error: "File, applicantId, and type are required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, WebP, or PDF file." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const filename = `${applicantId}/${type}-${Date.now()}.${ext}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("visa-documents")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("visa-documents")
      .getPublicUrl(filename);

    // Update applicant record with the photo URL
    const columnName = type === "passport" ? "passport_photo_url" : "portrait_photo_url";
    const { error: updateError } = await supabase
      .from("applicants")
      .update({ [columnName]: urlData.publicUrl })
      .eq("id", applicantId);

    if (updateError) {
      console.error("Update error:", updateError);
      // File uploaded but record not updated - not critical
    }

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      filename,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
