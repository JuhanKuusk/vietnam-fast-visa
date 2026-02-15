import { NextResponse } from 'next/server';
import { getAccountInfo } from '@/lib/instagram';

// CORS headers for Figma plugin access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * OPTIONS /api/instagram/account
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * GET /api/instagram/account
 * Get Instagram account info (for testing connection)
 */
export async function GET() {
  try {
    const accountInfo = await getAccountInfo();

    return NextResponse.json({
      success: true,
      account: accountInfo,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Instagram account error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    // Check for specific errors
    if (errorMessage.includes('INSTAGRAM_ACCESS_TOKEN')) {
      return NextResponse.json(
        {
          error: 'Instagram API not configured',
          details: 'Please set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID environment variables.',
        },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}
