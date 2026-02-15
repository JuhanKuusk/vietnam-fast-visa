import { NextRequest, NextResponse } from 'next/server';
import { list, put, del } from '@vercel/blob';

// Route segment config to increase body size limit for file uploads
export const runtime = 'nodejs';
export const maxDuration = 60;

// CORS headers for access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const LIBRARY_PREFIX = 'library/';

/**
 * OPTIONS /api/ads/library
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/ads/library
 * List all images in the library
 */
export async function GET() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const { blobs } = await list({ prefix: LIBRARY_PREFIX });

    // Sort by uploadedAt descending (newest first)
    const sortedBlobs = blobs.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      blobs: sortedBlobs,
      count: sortedBlobs.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Library list error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list library' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * POST /api/ads/library
 * Upload images to the library
 *
 * Request: FormData with 'files' field containing image files
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
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
      const filename = `${LIBRARY_PREFIX}lib_${timestamp}_${i + 1}.${extension}`;

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
    console.error('Library upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/ads/library
 * Delete images from the library
 *
 * Request body: { urls: string[] }
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

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
    console.error('Library delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
