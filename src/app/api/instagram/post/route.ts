import { NextRequest, NextResponse } from 'next/server';
import { postSingleImage, postCarousel } from '@/lib/instagram';

// CORS headers for Figma plugin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * OPTIONS /api/instagram/post
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/instagram/post
 * Post a single image or carousel to Instagram
 *
 * Request body:
 * {
 *   type: 'single' | 'carousel',
 *   imageUrls: string[],  // Array of publicly accessible image URLs
 *   caption?: string      // Caption for the post
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, imageUrls, caption } = body;

    // Validate request
    if (!type || !['single', 'carousel'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "single" or "carousel"' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'imageUrls must be a non-empty array' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate URLs
    for (const url of imageUrls) {
      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: `Invalid URL: ${url}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    let mediaId: string;

    if (type === 'single') {
      if (imageUrls.length !== 1) {
        return NextResponse.json(
          { error: 'Single post requires exactly 1 image URL' },
          { status: 400, headers: corsHeaders }
        );
      }
      mediaId = await postSingleImage(imageUrls[0], caption);
    } else {
      // Carousel
      if (imageUrls.length < 2 || imageUrls.length > 10) {
        return NextResponse.json(
          { error: 'Carousel requires between 2 and 10 image URLs' },
          { status: 400, headers: corsHeaders }
        );
      }
      mediaId = await postCarousel(imageUrls, caption);
    }

    return NextResponse.json({
      success: true,
      mediaId,
      message: `Successfully posted ${type} to Instagram`,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Instagram post error:', error);

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
