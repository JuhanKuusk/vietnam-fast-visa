import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';

// CORS headers for Figma plugin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * OPTIONS /api/instagram/upload-video
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/instagram/upload-video
 * Upload video for Instagram Reels using Vercel Blob Storage
 *
 * This endpoint uploads video to Vercel Blob and returns
 * a publicly accessible URL that can be used with the Instagram API.
 *
 * Instagram Reels requirements:
 * - Format: MP4, MOV
 * - Duration: 3 seconds to 15 minutes
 * - Aspect ratio: 9:16 recommended (vertical)
 * - Max file size: 1GB (we limit to 100MB for practical reasons)
 * - Video codec: H.264
 * - Audio codec: AAC
 *
 * Request: FormData with 'video' field containing video file
 */

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB - practical limit
// Allow WebM for browser-generated videos (Figma plugin creates WebM)
// Note: Instagram requires MP4, so WebM videos need conversion before posting
const ALLOWED_TYPES = ['video/mp4', 'video/quicktime', 'video/mov', 'video/webm'];

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
    const video = formData.get('video') as File | null;

    if (!video) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(video.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${video.type}. Allowed: MP4, MOV` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file size
    if (video.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Video too large: ${(video.size / 1024 / 1024).toFixed(1)}MB. Maximum size: 100MB` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    let extension = 'mp4';
    if (video.type === 'video/quicktime' || video.type === 'video/mov') {
      extension = 'mov';
    } else if (video.type === 'video/webm') {
      extension = 'webm';
    }
    const filename = `instagram/reel_${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, video, {
      access: 'public',
      contentType: video.type,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
      size: video.size,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/instagram/upload-video
 * Clean up uploaded video from Vercel Blob
 *
 * Request body:
 * { url: string }  // Blob URL to delete
 */
export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'url must be a string' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Only delete URLs that look like Vercel Blob URLs
    if (url.includes('vercel-storage.com') || url.includes('blob.vercel-storage.com')) {
      await del(url);
    }

    return NextResponse.json({
      success: true,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
