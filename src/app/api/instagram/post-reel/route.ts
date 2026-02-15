import { NextRequest, NextResponse } from 'next/server';
import { postReel } from '@/lib/instagram';

// CORS headers for Figma plugin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * OPTIONS /api/instagram/post-reel
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/instagram/post-reel
 * Post a Reel (video) to Instagram
 *
 * Request body:
 * {
 *   videoUrl: string,    // Publicly accessible URL of the video (MP4)
 *   caption?: string,    // Caption for the Reel
 *   coverUrl?: string,   // Optional cover image URL
 *   shareToFeed?: boolean // Whether to share to feed (default true)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoUrl, caption, coverUrl, shareToFeed = true } = body;

    // Validate request
    if (!videoUrl || typeof videoUrl !== 'string') {
      return NextResponse.json(
        { error: 'videoUrl is required and must be a string' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate URL
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { error: `Invalid video URL: ${videoUrl}` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate cover URL if provided
    if (coverUrl) {
      try {
        new URL(coverUrl);
      } catch {
        return NextResponse.json(
          { error: `Invalid cover URL: ${coverUrl}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const mediaId = await postReel(videoUrl, caption, coverUrl, shareToFeed);

    return NextResponse.json({
      success: true,
      mediaId,
      message: 'Successfully posted Reel to Instagram',
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Instagram Reel post error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    // Check for specific Instagram API errors
    if (errorMessage.includes('INSTAGRAM_ACCESS_TOKEN')) {
      return NextResponse.json(
        { error: 'Instagram API not configured. Please set environment variables.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}
