import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import sharp from "sharp";

// Passport photo dimensions (4x6cm at 300 DPI)
const PASSPORT_WIDTH = 472; // 4cm * 300 / 2.54
const PASSPORT_HEIGHT = 709; // 6cm * 300 / 2.54

async function removeBackground(imageBuffer: Buffer): Promise<Buffer> {
  const apiKey = process.env.PHOTOROOM_API_KEY;

  if (!apiKey) {
    console.warn("PHOTOROOM_API_KEY not set, skipping background removal");
    return imageBuffer;
  }

  console.log("Starting PhotoRoom background removal...");
  console.log("Input image size:", imageBuffer.length, "bytes");

  try {
    const formData = new FormData();
    // Convert Buffer to ArrayBuffer slice for proper Blob compatibility
    const arrayBuffer = imageBuffer.buffer.slice(
      imageBuffer.byteOffset,
      imageBuffer.byteOffset + imageBuffer.byteLength
    ) as ArrayBuffer;
    formData.append("image_file", new Blob([arrayBuffer]), "photo.jpg");
    formData.append("bg_color", "white");
    formData.append("format", "png");

    const response = await fetch("https://sdk.photoroom.com/v1/segment", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PhotoRoom API error:", response.status, errorText);
      throw new Error(`PhotoRoom API error: ${response.status}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    console.log("PhotoRoom background removal successful, output size:", resultBuffer.length, "bytes");
    return resultBuffer;
  } catch (error) {
    console.error("Background removal failed:", error);
    // Return original image if background removal fails
    return imageBuffer;
  }
}

// Minimum file size in bytes (2MB)
const MIN_FILE_SIZE = 2 * 1024 * 1024;

async function processPassportPhoto(imageBuffer: Buffer): Promise<Buffer> {
  // Remove background (returns PNG with white background)
  const bgRemovedBuffer = await removeBackground(imageBuffer);

  // Resize to passport dimensions with white background
  // Start with high quality JPEG
  let quality = 100;
  let processedBuffer = await sharp(bgRemovedBuffer)
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Ensure white background
    .resize(PASSPORT_WIDTH, PASSPORT_HEIGHT, {
      fit: "cover",
      position: "top", // Keep face at top
    })
    .jpeg({ quality, chromaSubsampling: "4:4:4" }) // Maximum quality settings
    .toBuffer();

  // If the file is smaller than 2MB, we need to increase the resolution
  // to meet the minimum file size requirement
  if (processedBuffer.length < MIN_FILE_SIZE) {
    // Calculate scale factor to increase file size
    // File size roughly scales with the square of the resolution
    const scaleFactor = Math.ceil(Math.sqrt(MIN_FILE_SIZE / processedBuffer.length) * 1.2);
    const newWidth = PASSPORT_WIDTH * scaleFactor;
    const newHeight = PASSPORT_HEIGHT * scaleFactor;

    processedBuffer = await sharp(bgRemovedBuffer)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(newWidth, newHeight, {
        fit: "cover",
        position: "top",
        kernel: "lanczos3", // High quality upscaling
      })
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
        mozjpeg: false // Disable mozjpeg compression for larger files
      })
      .toBuffer();
  }

  return processedBuffer;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServer();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const applicantId = formData.get("applicantId") as string;

    if (!file || !applicantId) {
      return NextResponse.json(
        { error: "File and applicantId are required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, or WebP image." },
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

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process the photo (remove background + resize)
    const processedBuffer = await processPassportPhoto(buffer);

    // Generate unique filename for processed photo
    const filename = `${applicantId}/portrait-processed-${Date.now()}.jpg`;

    // Upload processed photo to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("visa-documents")
      .upload(filename, processedBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload processed photo" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("visa-documents")
      .getPublicUrl(filename);

    // Update applicant record with the processed photo URL (only for real applicant IDs)
    // Skip database update for temporary preview IDs (format: temp-*)
    if (!applicantId.startsWith("temp-")) {
      const { error: updateError } = await supabase
        .from("applicants")
        .update({ portrait_photo_url: urlData.publicUrl })
        .eq("id", applicantId);

      if (updateError) {
        console.error("Update error:", updateError);
        // File uploaded but record not updated - not critical
      }
    }

    // Also return as base64 data URL for immediate preview
    const base64Image = `data:image/jpeg;base64,${processedBuffer.toString("base64")}`;

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      dataUrl: base64Image, // For immediate preview without relying on Supabase public URL
      filename,
      dimensions: {
        width: PASSPORT_WIDTH,
        height: PASSPORT_HEIGHT,
        physicalSize: "4cm x 6cm",
      },
      fileSize: processedBuffer.length,
      fileSizeMB: (processedBuffer.length / (1024 * 1024)).toFixed(2) + " MB",
    });
  } catch (error) {
    console.error("Photo processing error:", error);
    return NextResponse.json(
      { error: "Failed to process photo" },
      { status: 500 }
    );
  }
}
