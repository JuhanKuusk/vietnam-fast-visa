/**
 * Google Ads Campaign Management
 *
 * Handles creation and management of campaigns, ad groups, ads, and keywords
 * for Vietnam visa services.
 */

import {
  getGoogleAdsCustomer,
  dollarsToMicros,
  buildGeoTargetConstant,
  buildLanguageConstant,
  type GoogleAdsCustomer,
  type CampaignResult,
  type AdGroupResult,
} from './client';
import { ServiceType, SERVICES } from '@/lib/business-rules/service-availability';
import { getBasePrice, calculateTargetCPA, getRecommendedDailyBudget } from '@/lib/business-rules/pricing-engine';
import { CountryConfig, LANGUAGE_TARGETS } from '@/lib/config/countries';
import { AirportConfig, getAirportGeoTarget } from '@/lib/config/airports';
import { SupportedLanguage } from '@/lib/translations';

// Campaign configuration input
export interface CampaignConfig {
  country: CountryConfig;
  language: SupportedLanguage;
  airport?: AirportConfig;
  services: ServiceType[];
  dailyBudget?: number; // Override default budget
}

// Campaign creation result
export interface CampaignCreationResult {
  success: boolean;
  campaignName: string;
  campaignId?: string;
  campaignResourceName?: string;
  adGroups: {
    service: ServiceType;
    adGroupId: string;
    adGroupResourceName: string;
  }[];
  error?: string;
}

// Naming convention for campaigns
function generateCampaignName(config: CampaignConfig): string {
  const parts = [
    config.country.code,
    config.language,
    config.airport?.code || 'COUNTRY',
    'VietnamVisa',
  ];
  return parts.join(' - ');
}

// Naming convention for ad groups
function generateAdGroupName(
  config: CampaignConfig,
  service: ServiceType
): string {
  const serviceConfig = SERVICES.find((s) => s.type === service);
  return `${config.airport?.code || config.country.code} - ${serviceConfig?.name || service}`;
}

/**
 * Create a campaign budget
 */
async function createCampaignBudget(
  customer: GoogleAdsCustomer,
  config: CampaignConfig
): Promise<string> {
  const dailyBudget =
    config.dailyBudget || getRecommendedDailyBudget(config.country.code);

  const budgetName = `Budget - ${generateCampaignName(config)} - ${Date.now()}`;

  const result = await customer.campaignBudgets.create({
    name: budgetName,
    amount_micros: dollarsToMicros(dailyBudget),
    delivery_method: 'STANDARD',
  });

  return result.resource_name;
}

/**
 * Create a search campaign
 */
async function createCampaign(
  customer: GoogleAdsCustomer,
  config: CampaignConfig,
  budgetResourceName: string
): Promise<CampaignResult> {
  const campaignName = generateCampaignName(config);

  // Calculate average target CPA across all services
  const avgTargetCPA =
    config.services.reduce(
      (sum, service) => sum + calculateTargetCPA(service, config.country.code),
      0
    ) / config.services.length;

  const result = await customer.campaigns.create({
    name: campaignName,
    advertising_channel_type: 'SEARCH',
    status: 'PAUSED', // Start paused for review
    campaign_budget: budgetResourceName,
    bidding_strategy_type: 'TARGET_CPA',
    target_cpa: {
      target_cpa_micros: dollarsToMicros(avgTargetCPA),
    },
  });

  return result;
}

/**
 * Set geo targeting for a campaign (country or airport)
 */
async function setGeoTargeting(
  customer: GoogleAdsCustomer,
  campaignResourceName: string,
  config: CampaignConfig
): Promise<void> {
  if (config.airport) {
    // Airport proximity targeting
    const geoTarget = getAirportGeoTarget(config.airport.code);
    if (geoTarget) {
      await customer.campaignCriteria.create({
        campaign: campaignResourceName,
        proximity: {
          geo_point: {
            latitude_in_micro_degrees: geoTarget.latitudeMicroDegrees,
            longitude_in_micro_degrees: geoTarget.longitudeMicroDegrees,
          },
          radius: geoTarget.radiusMeters,
          radius_units: 'METERS',
        },
      });
    }
  } else {
    // Country targeting
    await customer.campaignCriteria.create({
      campaign: campaignResourceName,
      location: {
        geo_target_constant: buildGeoTargetConstant(config.country.geoTargetId),
      },
    });
  }
}

/**
 * Set language targeting for a campaign
 */
async function setLanguageTargeting(
  customer: GoogleAdsCustomer,
  campaignResourceName: string,
  language: SupportedLanguage
): Promise<void> {
  const languageId = LANGUAGE_TARGETS[language];
  if (!languageId) {
    console.warn(`No language target ID for language: ${language}`);
    return;
  }

  await customer.campaignCriteria.create({
    campaign: campaignResourceName,
    language: {
      language_constant: buildLanguageConstant(languageId),
    },
  });
}

/**
 * Create an ad group for a service type
 */
async function createAdGroup(
  customer: GoogleAdsCustomer,
  campaignResourceName: string,
  config: CampaignConfig,
  service: ServiceType
): Promise<AdGroupResult> {
  const adGroupName = generateAdGroupName(config, service);
  const price = getBasePrice(service, config.country.code);

  // CPC bid based on service price (10% of service price as max CPC)
  const cpcBid = Math.max(1, Math.round(price * 0.1));

  const result = await customer.adGroups.create({
    campaign: campaignResourceName,
    name: adGroupName,
    status: 'ENABLED',
    type: 'SEARCH_STANDARD',
    cpc_bid_micros: dollarsToMicros(cpcBid),
  });

  return result;
}

/**
 * Create a full campaign with all ad groups
 */
export async function createFullCampaign(
  config: CampaignConfig
): Promise<CampaignCreationResult> {
  const campaignName = generateCampaignName(config);

  try {
    const customer = await getGoogleAdsCustomer();

    // 1. Create budget
    const budgetResourceName = await createCampaignBudget(customer, config);

    // 2. Create campaign
    const campaignResult = await createCampaign(
      customer,
      config,
      budgetResourceName
    );

    // 3. Set geo targeting
    await setGeoTargeting(customer, campaignResult.resource_name, config);

    // 4. Set language targeting
    await setLanguageTargeting(
      customer,
      campaignResult.resource_name,
      config.language
    );

    // 5. Create ad groups for each service
    const adGroups: CampaignCreationResult['adGroups'] = [];

    for (const service of config.services) {
      const adGroupResult = await createAdGroup(
        customer,
        campaignResult.resource_name,
        config,
        service
      );

      adGroups.push({
        service,
        adGroupId: adGroupResult.id,
        adGroupResourceName: adGroupResult.resource_name,
      });
    }

    return {
      success: true,
      campaignName,
      campaignId: campaignResult.id,
      campaignResourceName: campaignResult.resource_name,
      adGroups,
    };
  } catch (error) {
    console.error('Failed to create campaign:', error);
    return {
      success: false,
      campaignName,
      adGroups: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Query all campaigns with their status
 */
export interface CampaignStatus {
  id: string;
  name: string;
  status: 'ENABLED' | 'PAUSED' | 'REMOVED';
  resourceName: string;
  budget?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
}

export async function getAllCampaigns(): Promise<CampaignStatus[]> {
  const customer = await getGoogleAdsCustomer();

  const results = await customer.query<{
    campaign: {
      id: string;
      name: string;
      status: string;
      resource_name: string;
    };
    campaign_budget: {
      amount_micros: string;
    };
    metrics: {
      impressions: string;
      clicks: string;
      conversions: string;
    };
  }>(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.resource_name,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.conversions
    FROM campaign
    WHERE campaign.advertising_channel_type = 'SEARCH'
      AND campaign.status != 'REMOVED'
    ORDER BY campaign.name
  `);

  return results.map((row) => ({
    id: row.campaign.id,
    name: row.campaign.name,
    status: row.campaign.status as CampaignStatus['status'],
    resourceName: row.campaign.resource_name,
    budget: row.campaign_budget?.amount_micros
      ? parseInt(row.campaign_budget.amount_micros) / 1_000_000
      : undefined,
    impressions: row.metrics?.impressions
      ? parseInt(row.metrics.impressions)
      : undefined,
    clicks: row.metrics?.clicks ? parseInt(row.metrics.clicks) : undefined,
    conversions: row.metrics?.conversions
      ? parseFloat(row.metrics.conversions)
      : undefined,
  }));
}

/**
 * Get campaigns by service type (based on naming convention)
 */
export async function getCampaignsByService(
  serviceType: ServiceType
): Promise<CampaignStatus[]> {
  const allCampaigns = await getAllCampaigns();
  const serviceConfig = SERVICES.find((s) => s.type === serviceType);

  if (!serviceConfig) return [];

  // Filter campaigns that contain the service name in their ad groups
  // This is a simplified approach - in production you'd query ad groups
  return allCampaigns.filter((c) =>
    c.name.toLowerCase().includes(serviceConfig.name.toLowerCase())
  );
}

/**
 * Update campaign status (enable/pause)
 */
export async function updateCampaignStatus(
  campaignResourceName: string,
  status: 'ENABLED' | 'PAUSED'
): Promise<void> {
  const customer = await getGoogleAdsCustomer();

  await customer.campaigns.update({
    resource_name: campaignResourceName,
    status,
  });
}

/**
 * Batch update multiple campaigns
 */
export async function batchUpdateCampaignStatus(
  updates: { resourceName: string; status: 'ENABLED' | 'PAUSED' }[]
): Promise<{ success: number; failed: number; errors: string[] }> {
  const customer = await getGoogleAdsCustomer();
  const errors: string[] = [];
  let success = 0;
  let failed = 0;

  for (const update of updates) {
    try {
      await customer.campaigns.update({
        resource_name: update.resourceName,
        status: update.status,
      });
      success++;
    } catch (error) {
      failed++;
      errors.push(
        `${update.resourceName}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  return { success, failed, errors };
}

/**
 * Parse service type from campaign/ad group name
 */
export function parseServiceFromName(name: string): ServiceType | null {
  const lowerName = name.toLowerCase();

  for (const service of SERVICES) {
    if (
      lowerName.includes(service.type.toLowerCase()) ||
      lowerName.includes(service.name.toLowerCase())
    ) {
      return service.type;
    }
  }

  return null;
}

/**
 * Get campaign statistics summary
 */
export interface CampaignStats {
  totalCampaigns: number;
  enabledCampaigns: number;
  pausedCampaigns: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalBudget: number;
}

export async function getCampaignStats(): Promise<CampaignStats> {
  const campaigns = await getAllCampaigns();

  return {
    totalCampaigns: campaigns.length,
    enabledCampaigns: campaigns.filter((c) => c.status === 'ENABLED').length,
    pausedCampaigns: campaigns.filter((c) => c.status === 'PAUSED').length,
    totalImpressions: campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
    totalClicks: campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    totalConversions: campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0),
    totalBudget: campaigns.reduce((sum, c) => sum + (c.budget || 0), 0),
  };
}
