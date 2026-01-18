/**
 * Google Ads API Client
 *
 * Provides a configured client for interacting with the Google Ads API.
 * Uses the google-ads-api npm package for Node.js integration.
 *
 * Required environment variables:
 * - GOOGLE_ADS_CLIENT_ID: OAuth2 client ID
 * - GOOGLE_ADS_CLIENT_SECRET: OAuth2 client secret
 * - GOOGLE_ADS_DEVELOPER_TOKEN: Google Ads Developer Token
 * - GOOGLE_ADS_REFRESH_TOKEN: OAuth2 refresh token
 * - GOOGLE_ADS_CUSTOMER_ID: Google Ads customer ID (without dashes)
 * - GOOGLE_ADS_LOGIN_CUSTOMER_ID: Manager account ID (if using MCC)
 *
 * Optional:
 * - GOOGLE_ADS_ENABLED: Set to 'true' to enable API calls
 * - GOOGLE_ADS_DRY_RUN: Set to 'true' to simulate without making changes
 */

// Type definitions for google-ads-api (we'll install the package later)
export interface GoogleAdsConfig {
  client_id: string;
  client_secret: string;
  developer_token: string;
}

export interface CustomerConfig {
  customer_id: string;
  refresh_token: string;
  login_customer_id?: string;
}

export interface GoogleAdsCustomer {
  query: <T>(query: string) => Promise<T[]>;
  campaigns: {
    create: (campaign: CampaignInput) => Promise<CampaignResult>;
    update: (campaign: CampaignUpdate) => Promise<void>;
  };
  campaignCriteria: {
    create: (criteria: CriteriaInput) => Promise<CriteriaResult>;
  };
  adGroups: {
    create: (adGroup: AdGroupInput) => Promise<AdGroupResult>;
    update: (adGroup: AdGroupUpdate) => Promise<void>;
  };
  ads: {
    create: (ad: AdInput) => Promise<AdResult>;
  };
  campaignBudgets: {
    create: (budget: BudgetInput) => Promise<BudgetResult>;
  };
}

// Input/Output types
export interface CampaignInput {
  name: string;
  advertising_channel_type: string;
  status: 'ENABLED' | 'PAUSED' | 'REMOVED';
  campaign_budget: string;
  bidding_strategy_type?: string;
  target_cpa?: { target_cpa_micros: number };
  manual_cpc?: { enhanced_cpc_enabled: boolean };
}

export interface CampaignResult {
  resource_name: string;
  id: string;
}

export interface CampaignUpdate {
  resource_name: string;
  status?: 'ENABLED' | 'PAUSED' | 'REMOVED';
}

export interface CriteriaInput {
  campaign: string;
  proximity?: {
    geo_point: {
      latitude_in_micro_degrees: number;
      longitude_in_micro_degrees: number;
    };
    radius: number;
    radius_units: 'METERS' | 'MILES';
  };
  location?: {
    geo_target_constant: string;
  };
  language?: {
    language_constant: string;
  };
}

export interface CriteriaResult {
  resource_name: string;
}

export interface AdGroupInput {
  campaign: string;
  name: string;
  status: 'ENABLED' | 'PAUSED' | 'REMOVED';
  type: string;
  cpc_bid_micros?: number;
}

export interface AdGroupResult {
  resource_name: string;
  id: string;
}

export interface AdGroupUpdate {
  resource_name: string;
  status?: 'ENABLED' | 'PAUSED' | 'REMOVED';
}

export interface AdInput {
  ad_group: string;
  ad: {
    responsive_search_ad: {
      headlines: { text: string; pinned_field?: string }[];
      descriptions: { text: string; pinned_field?: string }[];
    };
    final_urls: string[];
  };
  status: 'ENABLED' | 'PAUSED';
}

export interface AdResult {
  resource_name: string;
  ad: { id: string };
}

export interface BudgetInput {
  name: string;
  amount_micros: number;
  delivery_method: 'STANDARD' | 'ACCELERATED';
}

export interface BudgetResult {
  resource_name: string;
  id: string;
}

/**
 * Check if Google Ads API is enabled
 */
export function isGoogleAdsEnabled(): boolean {
  return process.env.GOOGLE_ADS_ENABLED === 'true';
}

/**
 * Check if running in dry-run mode (no actual API changes)
 */
export function isDryRunMode(): boolean {
  return process.env.GOOGLE_ADS_DRY_RUN === 'true';
}

/**
 * Validate that all required environment variables are set
 */
export function validateConfig(): { valid: boolean; missing: string[] } {
  const required = [
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
  ];

  const missing = required.filter((key) => !process.env[key]);

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get the Google Ads API configuration
 */
export function getGoogleAdsConfig(): GoogleAdsConfig {
  const { valid, missing } = validateConfig();
  if (!valid) {
    throw new Error(`Missing Google Ads config: ${missing.join(', ')}`);
  }

  return {
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  };
}

/**
 * Get customer configuration for API calls
 */
export function getCustomerConfig(): CustomerConfig {
  return {
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ''),
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, ''),
  };
}

/**
 * Create a mock customer for dry-run mode
 */
function createMockCustomer(): GoogleAdsCustomer {
  const mockId = () => `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  return {
    query: async <T>(query: string): Promise<T[]> => {
      console.log('[DRY RUN] Would execute query:', query);
      return [] as T[];
    },
    campaigns: {
      create: async (campaign: CampaignInput) => {
        console.log('[DRY RUN] Would create campaign:', campaign.name);
        return { resource_name: `customers/123/campaigns/${mockId()}`, id: mockId() };
      },
      update: async (campaign: CampaignUpdate) => {
        console.log('[DRY RUN] Would update campaign:', campaign.resource_name);
      },
    },
    campaignCriteria: {
      create: async (criteria: CriteriaInput) => {
        console.log('[DRY RUN] Would create criteria for:', criteria.campaign);
        return { resource_name: `${criteria.campaign}/campaignCriteria/${mockId()}` };
      },
    },
    adGroups: {
      create: async (adGroup: AdGroupInput) => {
        console.log('[DRY RUN] Would create ad group:', adGroup.name);
        return { resource_name: `${adGroup.campaign}/adGroups/${mockId()}`, id: mockId() };
      },
      update: async (adGroup: AdGroupUpdate) => {
        console.log('[DRY RUN] Would update ad group:', adGroup.resource_name);
      },
    },
    ads: {
      create: async (ad: AdInput) => {
        console.log('[DRY RUN] Would create ad in:', ad.ad_group);
        return { resource_name: `${ad.ad_group}/ads/${mockId()}`, ad: { id: mockId() } };
      },
    },
    campaignBudgets: {
      create: async (budget: BudgetInput) => {
        console.log('[DRY RUN] Would create budget:', budget.name, '$' + budget.amount_micros / 1_000_000);
        return { resource_name: `customers/123/campaignBudgets/${mockId()}`, id: mockId() };
      },
    },
  };
}

// Cache for the customer instance
let customerInstance: GoogleAdsCustomer | null = null;

/**
 * Get a Google Ads customer instance
 *
 * This is the main entry point for making API calls.
 * Returns a mock customer in dry-run mode.
 *
 * Usage:
 * ```typescript
 * const customer = await getGoogleAdsCustomer();
 *
 * // Query campaigns
 * const campaigns = await customer.query(`
 *   SELECT campaign.id, campaign.name, campaign.status
 *   FROM campaign
 *   WHERE campaign.status = 'ENABLED'
 * `);
 *
 * // Create a campaign
 * const result = await customer.campaigns.create({
 *   name: 'Vietnam Visa - US',
 *   advertising_channel_type: 'SEARCH',
 *   status: 'PAUSED',
 *   campaign_budget: budgetResourceName,
 * });
 * ```
 */
export async function getGoogleAdsCustomer(): Promise<GoogleAdsCustomer> {
  // Return mock customer in dry-run mode
  if (isDryRunMode()) {
    console.log('[Google Ads] Running in DRY RUN mode - no actual API calls');
    return createMockCustomer();
  }

  // Check if enabled
  if (!isGoogleAdsEnabled()) {
    throw new Error(
      'Google Ads API is not enabled. Set GOOGLE_ADS_ENABLED=true to enable.'
    );
  }

  // Return cached instance if available
  if (customerInstance) {
    return customerInstance;
  }

  // Validate configuration
  const { valid, missing } = validateConfig();
  if (!valid) {
    throw new Error(
      `Google Ads configuration incomplete. Missing: ${missing.join(', ')}`
    );
  }

  // Dynamic import to avoid build errors if package not installed
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { GoogleAdsApi } = require('google-ads-api');

    const config = getGoogleAdsConfig();
    const customerConfig = getCustomerConfig();

    const client = new GoogleAdsApi(config);

    customerInstance = client.Customer({
      customer_id: customerConfig.customer_id,
      refresh_token: customerConfig.refresh_token,
      login_customer_id: customerConfig.login_customer_id,
    }) as GoogleAdsCustomer;

    return customerInstance;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
      throw new Error(
        'google-ads-api package not installed. Run: npm install google-ads-api'
      );
    }
    throw error;
  }
}

/**
 * Reset the customer instance (for testing or token refresh)
 */
export function resetCustomerInstance(): void {
  customerInstance = null;
}

/**
 * Format a customer ID with dashes (for display)
 */
export function formatCustomerId(customerId: string): string {
  const clean = customerId.replace(/-/g, '');
  if (clean.length !== 10) return customerId;
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`;
}

/**
 * Build a resource name for a campaign
 */
export function buildCampaignResourceName(
  customerId: string,
  campaignId: string
): string {
  return `customers/${customerId.replace(/-/g, '')}/campaigns/${campaignId}`;
}

/**
 * Build a resource name for an ad group
 */
export function buildAdGroupResourceName(
  customerId: string,
  adGroupId: string
): string {
  return `customers/${customerId.replace(/-/g, '')}/adGroups/${adGroupId}`;
}

/**
 * Build a resource name for a geo target constant
 */
export function buildGeoTargetConstant(geoTargetId: number): string {
  return `geoTargetConstants/${geoTargetId}`;
}

/**
 * Build a resource name for a language constant
 */
export function buildLanguageConstant(languageId: number): string {
  return `languageConstants/${languageId}`;
}

/**
 * Convert dollars to micros (Google Ads uses micro-currency)
 */
export function dollarsToMicros(dollars: number): number {
  return Math.round(dollars * 1_000_000);
}

/**
 * Convert micros to dollars
 */
export function microsToDollars(micros: number): number {
  return micros / 1_000_000;
}

/**
 * Get API status information
 */
export function getApiStatus(): {
  enabled: boolean;
  dryRun: boolean;
  configValid: boolean;
  missingConfig: string[];
  customerId: string | null;
} {
  const { valid, missing } = validateConfig();

  return {
    enabled: isGoogleAdsEnabled(),
    dryRun: isDryRunMode(),
    configValid: valid,
    missingConfig: missing,
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID
      ? formatCustomerId(process.env.GOOGLE_ADS_CUSTOMER_ID)
      : null,
  };
}
