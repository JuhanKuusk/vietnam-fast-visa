/**
 * Google Ads Sync Cron Endpoint
 *
 * This endpoint is called by Vercel Cron to synchronize Google Ads
 * campaign status based on Vietnam office hours and service availability.
 *
 * Cron Schedule: Every 15 minutes
 *
 * Security:
 * - Vercel Cron automatically adds CRON_SECRET header
 * - Manual calls require Authorization: Bearer <CRON_SECRET>
 */

import { NextResponse } from 'next/server';
import {
  syncCampaignStatus,
  previewSync,
  getSchedulerStatus,
  formatSyncResultForLog,
} from '@/lib/google-ads/scheduler';
import { isGoogleAdsEnabled, isDryRunMode } from '@/lib/google-ads/client';

// Export config for Vercel Edge Runtime (optional, for faster cold starts)
// export const runtime = 'edge';

/**
 * Verify the request is from Vercel Cron or has valid authorization
 */
function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.warn('CRON_SECRET not set - rejecting all cron requests');
    return false;
  }

  // Check for Vercel Cron header
  const vercelCronHeader = request.headers.get('x-vercel-cron');
  if (vercelCronHeader) {
    return true;
  }

  // Check for Authorization header (for manual testing)
  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  return false;
}

/**
 * GET /api/ads/sync
 *
 * Synchronizes campaign status based on service availability.
 * Called automatically by Vercel Cron every 15 minutes.
 *
 * Query parameters:
 * - preview=true: Return what would happen without making changes
 * - force=true: Skip availability check and force sync
 */
export async function GET(request: Request) {
  // Verify authorization
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const isPreview = searchParams.get('preview') === 'true';

  try {
    // Check if Google Ads is enabled
    if (!isGoogleAdsEnabled()) {
      return NextResponse.json({
        status: 'skipped',
        reason: 'Google Ads API is not enabled',
        schedulerStatus: getSchedulerStatus(),
      });
    }

    // Run sync (or preview)
    const dryRun = isDryRunMode() || isPreview;
    const result = isPreview
      ? await previewSync()
      : await syncCampaignStatus(dryRun);

    // Log the result
    console.log(formatSyncResultForLog(result));

    return NextResponse.json({
      status: 'success',
      result,
    });
  } catch (error) {
    console.error('Ads sync failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        schedulerStatus: getSchedulerStatus(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ads/sync
 *
 * Manual sync endpoint with additional options.
 *
 * Body:
 * {
 *   "action": "sync" | "preview" | "status" | "forceEnable" | "forcePause",
 *   "dryRun": boolean (optional, defaults to env setting)
 * }
 */
export async function POST(request: Request) {
  // Verify authorization
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action = 'sync', dryRun } = body;

    // Check if Google Ads is enabled (except for status action)
    if (action !== 'status' && !isGoogleAdsEnabled()) {
      return NextResponse.json({
        status: 'skipped',
        reason: 'Google Ads API is not enabled',
        schedulerStatus: getSchedulerStatus(),
      });
    }

    switch (action) {
      case 'preview':
        const previewResult = await previewSync();
        return NextResponse.json({
          status: 'success',
          action: 'preview',
          result: previewResult,
        });

      case 'sync':
        const useDryRun = dryRun !== undefined ? dryRun : isDryRunMode();
        const syncResult = await syncCampaignStatus(useDryRun);
        console.log(formatSyncResultForLog(syncResult));
        return NextResponse.json({
          status: 'success',
          action: 'sync',
          result: syncResult,
        });

      case 'status':
        return NextResponse.json({
          status: 'success',
          action: 'status',
          schedulerStatus: getSchedulerStatus(),
          googleAdsEnabled: isGoogleAdsEnabled(),
          dryRunMode: isDryRunMode(),
        });

      case 'forceEnable':
        // Import dynamically to avoid loading if not needed
        const { forceEnableAllCampaigns } = await import(
          '@/lib/google-ads/scheduler'
        );
        const enableResult = await forceEnableAllCampaigns();
        return NextResponse.json({
          status: 'success',
          action: 'forceEnable',
          result: enableResult,
        });

      case 'forcePause':
        const { forcePauseAllCampaigns } = await import(
          '@/lib/google-ads/scheduler'
        );
        const pauseResult = await forcePauseAllCampaigns();
        return NextResponse.json({
          status: 'success',
          action: 'forcePause',
          result: pauseResult,
        });

      default:
        return NextResponse.json(
          {
            error: `Unknown action: ${action}`,
            validActions: ['sync', 'preview', 'status', 'forceEnable', 'forcePause'],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Ads sync POST failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
