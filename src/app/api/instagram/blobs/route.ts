import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

/**
 * GET /api/instagram/blobs
 * List all uploaded Instagram images from Vercel Blob storage
 */
export async function GET() {
  try {
    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured' },
        { status: 500 }
      );
    }

    // List all blobs in the instagram folder
    const { blobs } = await list({
      prefix: 'instagram/',
    });

    // Map to simpler format
    const files = blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      uploadedAt: blob.uploadedAt,
      size: blob.size,
    }));

    return NextResponse.json({
      blobs: files,
      count: files.length
    });
  } catch (error) {
    console.error('List blobs error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list blobs' },
      { status: 500 }
    );
  }
}
