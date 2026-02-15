import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';

// CORS headers for Figma plugin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * OPTIONS /api/instagram/upload
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/instagram/upload
 * Upload images for Instagram posting using Vercel Blob Storage
 *
 * This endpoint uploads images to Vercel Blob and returns
 * publicly accessible URLs that can be used with the Instagram API.
 *
 * Request: FormData with 'files' field containing image files
 */

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB - Instagram's limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured. Please add BLOB_READ_WRITE_TOKEN environment variable.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file count (Instagram carousel limit)
    if (files.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 files allowed for carousel' },
        { status: 400, headers: corsHeaders }
      );
    }

    const uploadedUrls: string[] = [];
    const timestamp = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}` },
          { status: 400, headers: corsHeaders }
        );
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Maximum size: 8MB` },
          { status: 400, headers: corsHeaders }
        );
      }

      // Generate unique filename
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `instagram/ig_${timestamp}_${i + 1}.${extension}`;

      // Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: 'public',
        contentType: file.type,
      });

      uploadedUrls.push(blob.url);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/instagram/upload
 * Clean up uploaded files from Vercel Blob
 *
 * Request body:
 * { urls: string[] }  // Array of blob URLs to delete
 */
export async function DELETE(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'urls must be an array' },
        { status: 400, headers: corsHeaders }
      );
    }

    let deleted = 0;

    for (const url of urls) {
      try {
        // Only delete URLs that look like Vercel Blob URLs
        if (url.includes('vercel-storage.com') || url.includes('blob.vercel-storage.com')) {
          await del(url);
          deleted++;
        }
      } catch {
        // Ignore individual file errors
      }
    }

    return NextResponse.json({
      success: true,
      deleted,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
