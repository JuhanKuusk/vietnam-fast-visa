/**
 * Google Ads Campaign Scheduler
 *
 * Automatically enables/disables campaigns based on:
 * - Vietnam office hours (UTC+7)
 * - Service availability
 * - Weekends and holidays
 *
 * This ensures we never advertise services that are unavailable.
 */

import {
  getAllCampaigns,
  batchUpdateCampaignStatus,
  parseServiceFromName,
  type CampaignStatus,
} from './campaigns';
import {
  getAllServicesAvailability,
  getAdvertisableServices,
  type ServiceAvailability,
  type ServiceType,
} from '@/lib/business-rules/service-availability';
import {
  getVietnamOfficeStatus,
  isWeekendWindow,
  type OfficeStatus,
} from '@/lib/business-rules/vietnam-time';

// Sync result interface
export interface SyncResult {
  timestamp: string;
  vietnamTime: string;
  officeStatus: OfficeStatus;
  isWeekendWindow: boolean;
  serviceAvailability: Record<ServiceType, boolean>;
  campaignsProcessed: number;
  campaignsEnabled: number;
  campaignsPaused: number;
  campaignsUnchanged: number;
  changes: {
    campaignId: string;
    campaignName: string;
    service: ServiceType | null;
    previousStatus: string;
    newStatus: string;
    reason: string;
  }[];
  errors: string[];
  dryRun: boolean;
}

/**
 * Determine if a campaign should be enabled based on its service type
 */
function shouldCampaignBeEnabled(
  campaign: CampaignStatus,
  availableServices: ServiceAvailability[]
): { shouldEnable: boolean; reason: string } {
  // Parse service type from campaign name
  const serviceType = parseServiceFromName(campaign.name);

  if (!serviceType) {
    // Can't determine service type - keep current state
    return {
      shouldEnable: campaign.status === 'ENABLED',
      reason: 'Unknown service type - maintaining current state',
    };
  }

  // Find the availability for this service
  const serviceAvailability = availableServices.find(
    (s) => s.service === serviceType
  );

  if (!serviceAvailability) {
    return {
      shouldEnable: false,
      reason: `Service ${serviceType} not found in availability list`,
    };
  }

  if (serviceAvailability.available) {
    return {
      shouldEnable: true,
      reason: `Service ${serviceType} is available`,
    };
  } else {
    return {
      shouldEnable: false,
      reason: serviceAvailability.reason || `Service ${serviceType} is unavailable`,
    };
  }
}

/**
 * Main sync function - synchronizes campaign status with service availability
 *
 * This function should be called periodically (e.g., every 15 minutes via cron)
 * to ensure ads are only shown when services are actually available.
 */
export async function syncCampaignStatus(
  dryRun: boolean = false
): Promise<SyncResult> {
  const startTime = new Date();
  const officeStatus = getVietnamOfficeStatus();

  // Get service availability
  const allServicesAvailability = getAllServicesAvailability();
  const advertisableServices = getAdvertisableServices();

  // Build availability map
  const serviceAvailability: Record<ServiceType, boolean> = {} as Record<
    ServiceType,
    boolean
  >;
  for (const service of allServicesAvailability) {
    serviceAvailability[service.service] = service.available;
  }

  const result: SyncResult = {
    timestamp: startTime.toISOString(),
    vietnamTime: officeStatus.currentTimeVNFormatted,
    officeStatus,
    isWeekendWindow: isWeekendWindow(),
    serviceAvailability,
    campaignsProcessed: 0,
    campaignsEnabled: 0,
    campaignsPaused: 0,
    campaignsUnchanged: 0,
    changes: [],
    errors: [],
    dryRun,
  };

  try {
    // Get all campaigns
    const campaigns = await getAllCampaigns();
    result.campaignsProcessed = campaigns.length;

    // Determine required changes
    const updates: { resourceName: string; status: 'ENABLED' | 'PAUSED' }[] = [];

    for (const campaign of campaigns) {
      const { shouldEnable, reason } = shouldCampaignBeEnabled(
        campaign,
        advertisableServices
      );
      const targetStatus = shouldEnable ? 'ENABLED' : 'PAUSED';

      if (campaign.status !== targetStatus) {
        updates.push({
          resourceName: campaign.resourceName,
          status: targetStatus,
        });

        result.changes.push({
          campaignId: campaign.id,
          campaignName: campaign.name,
          service: parseServiceFromName(campaign.name),
          previousStatus: campaign.status,
          newStatus: targetStatus,
          reason,
        });

        if (targetStatus === 'ENABLED') {
          result.campaignsEnabled++;
        } else {
          result.campaignsPaused++;
        }
      } else {
        result.campaignsUnchanged++;
      }
    }

    // Apply changes (unless dry run)
    if (!dryRun && updates.length > 0) {
      const batchResult = await batchUpdateCampaignStatus(updates);
      if (batchResult.errors.length > 0) {
        result.errors.push(...batchResult.errors);
      }
    }
  } catch (error) {
    result.errors.push(
      error instanceof Error ? error.message : 'Unknown error during sync'
    );
  }

  return result;
}

/**
 * Get a preview of what changes would be made without actually making them
 */
export async function previewSync(): Promise<SyncResult> {
  return syncCampaignStatus(true);
}

/**
 * Force enable all campaigns (emergency override)
 */
export async function forceEnableAllCampaigns(): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> {
  const campaigns = await getAllCampaigns();

  const updates = campaigns
    .filter((c) => c.status === 'PAUSED')
    .map((c) => ({
      resourceName: c.resourceName,
      status: 'ENABLED' as const,
    }));

  if (updates.length === 0) {
    return { success: 0, failed: 0, errors: [] };
  }

  return batchUpdateCampaignStatus(updates);
}

/**
 * Force pause all campaigns (emergency override)
 */
export async function forcePauseAllCampaigns(): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> {
  const campaigns = await getAllCampaigns();

  const updates = campaigns
    .filter((c) => c.status === 'ENABLED')
    .map((c) => ({
      resourceName: c.resourceName,
      status: 'PAUSED' as const,
    }));

  if (updates.length === 0) {
    return { success: 0, failed: 0, errors: [] };
  }

  return batchUpdateCampaignStatus(updates);
}

/**
 * Get current scheduler status (for monitoring/dashboard)
 */
export interface SchedulerStatus {
  vietnamTime: string;
  officeStatus: OfficeStatus;
  isWeekendWindow: boolean;
  availableServices: ServiceType[];
  unavailableServices: { service: ServiceType; reason: string }[];
  nextScheduledSync?: string;
}

export function getSchedulerStatus(): SchedulerStatus {
  const officeStatus = getVietnamOfficeStatus();
  const allServices = getAllServicesAvailability();

  return {
    vietnamTime: officeStatus.currentTimeVNFormatted,
    officeStatus,
    isWeekendWindow: isWeekendWindow(),
    availableServices: allServices
      .filter((s) => s.available)
      .map((s) => s.service),
    unavailableServices: allServices
      .filter((s) => !s.available)
      .map((s) => ({
        service: s.service,
        reason: s.reason || 'Unknown',
      })),
  };
}

/**
 * Format sync result for logging
 */
export function formatSyncResultForLog(result: SyncResult): string {
  const lines: string[] = [
    '='.repeat(60),
    'Google Ads Sync Report',
    '='.repeat(60),
    `Timestamp: ${result.timestamp}`,
    `Vietnam Time: ${result.vietnamTime}`,
    `Office Open: ${result.officeStatus.isOpen ? 'YES' : 'NO'}`,
    `Weekend Window: ${result.isWeekendWindow ? 'YES' : 'NO'}`,
    `Dry Run: ${result.dryRun ? 'YES' : 'NO'}`,
    '-'.repeat(60),
    'Service Availability:',
  ];

  for (const [service, available] of Object.entries(result.serviceAvailability)) {
    lines.push(`  ${service}: ${available ? 'AVAILABLE' : 'UNAVAILABLE'}`);
  }

  lines.push('-'.repeat(60));
  lines.push('Campaign Summary:');
  lines.push(`  Processed: ${result.campaignsProcessed}`);
  lines.push(`  Enabled: ${result.campaignsEnabled}`);
  lines.push(`  Paused: ${result.campaignsPaused}`);
  lines.push(`  Unchanged: ${result.campaignsUnchanged}`);

  if (result.changes.length > 0) {
    lines.push('-'.repeat(60));
    lines.push('Changes Made:');
    for (const change of result.changes) {
      lines.push(
        `  [${change.service || 'UNKNOWN'}] ${change.campaignName}: ${change.previousStatus} -> ${change.newStatus}`
      );
      lines.push(`    Reason: ${change.reason}`);
    }
  }

  if (result.errors.length > 0) {
    lines.push('-'.repeat(60));
    lines.push('Errors:');
    for (const error of result.errors) {
      lines.push(`  - ${error}`);
    }
  }

  lines.push('='.repeat(60));

  return lines.join('\n');
}
