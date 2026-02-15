import { NextRequest, NextResponse } from 'next/server';
import { list, put, del } from '@vercel/blob';

// CORS headers for access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const DRAFTS_PREFIX = 'drafts/';

export interface Draft {
  id: string;
  createdAt: string;
  updatedAt: string;
  format: 'post' | 'story' | 'reel';
  imageUrls: string[];
  videoUrl?: string; // URL to generated video for reels
  caption: string;
  hashtags: string[];
  status: 'draft' | 'scheduled' | 'posted';
}

/**
 * OPTIONS /api/ads/drafts
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/ads/drafts
 * List all drafts
 */
export async function GET() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const { blobs } = await list({ prefix: DRAFTS_PREFIX });

    // Fetch and parse each draft JSON
    const drafts: Draft[] = [];
    for (const blob of blobs) {
      if (blob.pathname.endsWith('.json')) {
        try {
          const response = await fetch(blob.url);
          const draft = await response.json();
          drafts.push(draft);
        } catch {
          // Skip invalid drafts
        }
      }
    }

    // Sort by createdAt descending
    drafts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      drafts,
      count: drafts.length,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Drafts list error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list drafts' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * POST /api/ads/drafts
 * Create a new draft
 *
 * Request body: Partial<Draft> (without id, createdAt, updatedAt)
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { format, imageUrls, caption, hashtags, videoUrl } = body;

    // Validate required fields
    if (!format || !['post', 'story', 'reel'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Must be post, story, or reel' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'imageUrls must be a non-empty array' },
        { status: 400, headers: corsHeaders }
      );
    }

    const now = new Date().toISOString();
    const id = `draft_${Date.now()}`;

    const draft: Draft = {
      id,
      createdAt: now,
      updatedAt: now,
      format,
      imageUrls,
      videoUrl: videoUrl || undefined,
      caption: caption || '',
      hashtags: hashtags || [],
      status: 'draft',
    };

    // Save draft as JSON in Vercel Blob
    const filename = `${DRAFTS_PREFIX}${id}.json`;
    const blob = await put(filename, JSON.stringify(draft), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      draft,
      url: blob.url,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Draft create error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create draft' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * PUT /api/ads/drafts
 * Update an existing draft
 *
 * Request body: { id: string, ...updates }
 */
export async function PUT(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Draft id is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Find existing draft
    const { blobs } = await list({ prefix: DRAFTS_PREFIX });
    const existingBlob = blobs.find(b => b.pathname === `${DRAFTS_PREFIX}${id}.json`);

    if (!existingBlob) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Fetch current draft
    const response = await fetch(existingBlob.url);
    const currentDraft: Draft = await response.json();

    // Merge updates
    const updatedDraft: Draft = {
      ...currentDraft,
      ...updates,
      id: currentDraft.id, // Preserve original id
      createdAt: currentDraft.createdAt, // Preserve original creation date
      updatedAt: new Date().toISOString(),
    };

    // Delete old and save updated
    await del(existingBlob.url);
    const filename = `${DRAFTS_PREFIX}${id}.json`;
    const blob = await put(filename, JSON.stringify(updatedDraft), {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      draft: updatedDraft,
      url: blob.url,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Draft update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update draft' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/ads/drafts
 * Delete one or more drafts
 *
 * Request body: { ids: string[] }
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: 'ids must be an array' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { blobs } = await list({ prefix: DRAFTS_PREFIX });
    let deleted = 0;

    for (const id of ids) {
      const blob = blobs.find(b => b.pathname === `${DRAFTS_PREFIX}${id}.json`);
      if (blob) {
        try {
          await del(blob.url);
          deleted++;
        } catch {
          // Ignore individual errors
        }
      }
    }

    return NextResponse.json({
      success: true,
      deleted,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Draft delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete drafts' },
      { status: 500, headers: corsHeaders }
    );
  }
}
