import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Use Creatomate API for video generation (has free tier)
// Alternative: Use img.ly/imgly or Shotstack

const CREATOMATE_API_KEY = process.env.CREATOMATE_API_KEY;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * POST /api/ads/create-video
 * Create a video slideshow from images using Creatomate API
 *
 * Request body:
 * {
 *   images: string[],      // Array of image URLs
 *   duration: number,      // Duration per slide in seconds (default: 3)
 *   format: 'reel' | 'post' // Video format (default: 'reel')
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { images, duration = 3, format = 'reel' } = await request.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'images array is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Determine dimensions based on format
    const width = format === 'post' ? 1080 : 1080;
    const height = format === 'post' ? 1080 : 1920;

    // If Creatomate API key is available, use it
    if (CREATOMATE_API_KEY) {
      return await createVideoWithCreatomate(images, duration, width, height);
    }

    // Fallback: Use free Imgix/Cloudinary video generation or return error
    // For now, let's try a simple approach using a free video API

    // Alternative: Use VideoShow API (self-hosted) or return instructions
    return NextResponse.json({
      success: false,
      error: 'Video API not configured. Please add CREATOMATE_API_KEY to environment variables.',
      setup_instructions: {
        step1: 'Go to https://creatomate.com and create a free account',
        step2: 'Get your API key from the dashboard',
        step3: 'Add CREATOMATE_API_KEY to your Vercel environment variables',
        free_tier: '5 free renders per month'
      }
    }, { status: 503, headers: corsHeaders });

  } catch (error) {
    console.error('Create video error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create video' },
      { status: 500, headers: corsHeaders }
    );
  }
}

async function createVideoWithCreatomate(
  images: string[],
  duration: number,
  width: number,
  height: number
) {
  // Build Creatomate render request
  // Creatomate uses a JSON-based template system

  // Build elements with track property (sequential on same track)
  const elements = images.map((url) => ({
    type: 'image',
    source: url,
    track: 1,
    duration: duration,
    fit: 'cover',
  }));

  const renderRequest = {
    output_format: 'mp4',
    width,
    height,
    elements
  };

  console.log('[Creatomate] Starting render:', JSON.stringify(renderRequest, null, 2));

  // Start the render - using v2 API
  const renderResponse = await fetch('https://api.creatomate.com/v2/renders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CREATOMATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(renderRequest),
  });

  if (!renderResponse.ok) {
    const errorText = await renderResponse.text();
    console.error('[Creatomate] Render failed:', errorText);
    throw new Error(`Creatomate render failed: ${renderResponse.status}`);
  }

  const renderData = await renderResponse.json();
  console.log('[Creatomate] Render started:', JSON.stringify(renderData));

  // v2 API can return single object or array
  const render = Array.isArray(renderData) ? renderData[0] : renderData;

  if (!render || !render.id) {
    console.error('[Creatomate] Invalid response structure:', renderData);
    throw new Error('Invalid render response from Creatomate');
  }

  // Poll for completion (max 2 minutes)
  const maxAttempts = 24;
  let attempts = 0;

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    attempts++;

    const statusResponse = await fetch(`https://api.creatomate.com/v2/renders/${render.id}`, {
      headers: {
        'Authorization': `Bearer ${CREATOMATE_API_KEY}`,
      },
    });

    if (!statusResponse.ok) {
      continue;
    }

    const statusData = await statusResponse.json();
    console.log(`[Creatomate] Render status (attempt ${attempts}):`, statusData.status);

    if (statusData.status === 'succeeded') {
      // Download the video and upload to Vercel Blob
      const videoResponse = await fetch(statusData.url);
      const videoBuffer = await videoResponse.arrayBuffer();

      const blob = await put(`videos/reel_${Date.now()}.mp4`, videoBuffer, {
        access: 'public',
        contentType: 'video/mp4',
      });

      return NextResponse.json({
        success: true,
        url: blob.url,
        size: videoBuffer.byteLength,
        duration: images.length * duration,
      }, { headers: corsHeaders });
    }

    if (statusData.status === 'failed') {
      throw new Error(`Render failed: ${statusData.error_message || 'Unknown error'}`);
    }
  }

  throw new Error('Render timed out after 2 minutes');
}
