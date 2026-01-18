/**
 * Service Availability Business Rules
 *
 * Determines which visa processing services are available based on:
 * - Vietnam office hours (UTC+7)
 * - Weekends and holidays
 * - Time remaining until office closes
 */

import {
  getVietnamOfficeStatus,
  getVietnamTime,
  isWeekendWindow,
  OFFICE_OPEN_HOUR,
  OFFICE_CLOSE_HOUR,
  OfficeStatus,
} from './vietnam-time';

// Service types ordered by urgency
export type ServiceType =
  | 'URGENT_1H'
  | 'URGENT_2H'
  | 'URGENT_4H'
  | '1DAY'
  | '2DAY'
  | 'WEEKEND'
  | 'STANDARD';

// Service configuration
export interface ServiceConfig {
  type: ServiceType;
  name: string;
  nameKey: string; // Translation key
  processingHours: number;
  requiresOpenOffice: boolean;
  minimumHoursBeforeClose: number; // Minimum hours office must be open
  availableOnWeekends: boolean;
  availableOnHolidays: boolean;
  basePriority: number; // Lower = higher priority for display
}

// All available services with their requirements
export const SERVICES: ServiceConfig[] = [
  {
    type: 'URGENT_1H',
    name: 'Urgent 1 Hour',
    nameKey: 'service.urgent1h',
    processingHours: 1,
    requiresOpenOffice: true,
    minimumHoursBeforeClose: 1.5, // Need 1.5 hours buffer
    availableOnWeekends: false,
    availableOnHolidays: false,
    basePriority: 1,
  },
  {
    type: 'URGENT_2H',
    name: 'Urgent 2 Hours',
    nameKey: 'service.urgent2h',
    processingHours: 2,
    requiresOpenOffice: true,
    minimumHoursBeforeClose: 2.5,
    availableOnWeekends: false,
    availableOnHolidays: false,
    basePriority: 2,
  },
  {
    type: 'URGENT_4H',
    name: 'Urgent 4 Hours',
    nameKey: 'service.urgent4h',
    processingHours: 4,
    requiresOpenOffice: true,
    minimumHoursBeforeClose: 4.5,
    availableOnWeekends: false,
    availableOnHolidays: false,
    basePriority: 3,
  },
  {
    type: '1DAY',
    name: '1 Business Day',
    nameKey: 'service.1day',
    processingHours: 8, // 1 full business day
    requiresOpenOffice: true,
    minimumHoursBeforeClose: 0, // Can submit anytime during office hours
    availableOnWeekends: false,
    availableOnHolidays: false,
    basePriority: 4,
  },
  {
    type: '2DAY',
    name: '2 Business Days',
    nameKey: 'service.2day',
    processingHours: 16, // 2 full business days
    requiresOpenOffice: true,
    minimumHoursBeforeClose: 0,
    availableOnWeekends: false,
    availableOnHolidays: false,
    basePriority: 5,
  },
  {
    type: 'WEEKEND',
    name: 'Weekend Processing',
    nameKey: 'service.weekend',
    processingHours: 48, // Processed over weekend
    requiresOpenOffice: false,
    minimumHoursBeforeClose: 0,
    availableOnWeekends: true, // Specifically for weekends
    availableOnHolidays: true,
    basePriority: 6,
  },
  {
    type: 'STANDARD',
    name: 'Standard Processing',
    nameKey: 'service.standard',
    processingHours: 72, // 3 business days
    requiresOpenOffice: false,
    minimumHoursBeforeClose: 0,
    availableOnWeekends: true,
    availableOnHolidays: true,
    basePriority: 7,
  },
];

// Service availability result
export interface ServiceAvailability {
  service: ServiceType;
  config: ServiceConfig;
  available: boolean;
  reason?: string;
  reasonKey?: string; // Translation key for reason
  nextAvailable?: Date;
  hoursUntilAvailable?: number;
}

/**
 * Get the availability status of a single service
 */
export function getServiceAvailability(
  serviceType: ServiceType,
  officeStatus?: OfficeStatus
): ServiceAvailability {
  const status = officeStatus || getVietnamOfficeStatus();
  const config = SERVICES.find((s) => s.type === serviceType);

  if (!config) {
    throw new Error(`Unknown service type: ${serviceType}`);
  }

  // Check weekend availability
  if ((status.isWeekend || status.isHoliday) && !config.availableOnWeekends) {
    return {
      service: serviceType,
      config,
      available: false,
      reason: status.isHoliday ? 'Office closed for holiday' : 'Office closed for weekend',
      reasonKey: status.isHoliday ? 'reason.holidayClosed' : 'reason.weekendClosed',
      nextAvailable: status.nextOpenTime || undefined,
      hoursUntilAvailable: status.minutesUntilOpen
        ? Math.ceil(status.minutesUntilOpen / 60)
        : undefined,
    };
  }

  // Check if office needs to be open
  if (config.requiresOpenOffice && !status.isOpen) {
    return {
      service: serviceType,
      config,
      available: false,
      reason: 'Office is currently closed',
      reasonKey: 'reason.officeClosed',
      nextAvailable: status.nextOpenTime || undefined,
      hoursUntilAvailable: status.minutesUntilOpen
        ? Math.ceil(status.minutesUntilOpen / 60)
        : undefined,
    };
  }

  // Check minimum hours before close for urgent services
  if (config.minimumHoursBeforeClose > 0 && status.minutesUntilClose !== null) {
    const hoursUntilClose = status.minutesUntilClose / 60;

    if (hoursUntilClose < config.minimumHoursBeforeClose) {
      // Calculate when this service will next be available (tomorrow's open)
      const vnTime = getVietnamTime();
      const tomorrow = new Date(vnTime);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Skip to Monday if tomorrow is weekend
      while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      tomorrow.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);

      return {
        service: serviceType,
        config,
        available: false,
        reason: `Not enough time before office closes (need ${config.minimumHoursBeforeClose}h, have ${hoursUntilClose.toFixed(1)}h)`,
        reasonKey: 'reason.notEnoughTime',
        nextAvailable: tomorrow,
        hoursUntilAvailable: Math.ceil((OFFICE_CLOSE_HOUR - status.hour) + 16 + config.minimumHoursBeforeClose),
      };
    }
  }

  // Service is available
  return {
    service: serviceType,
    config,
    available: true,
  };
}

/**
 * Get availability status for all services
 */
export function getAllServicesAvailability(): ServiceAvailability[] {
  const officeStatus = getVietnamOfficeStatus();

  return SERVICES.map((service) =>
    getServiceAvailability(service.type, officeStatus)
  );
}

/**
 * Get only available services
 */
export function getAvailableServices(): ServiceAvailability[] {
  return getAllServicesAvailability().filter((s) => s.available);
}

/**
 * Get only unavailable services with reasons
 */
export function getUnavailableServices(): ServiceAvailability[] {
  return getAllServicesAvailability().filter((s) => !s.available);
}

/**
 * Check if any urgent services are available
 */
export function hasUrgentServicesAvailable(): boolean {
  const urgentTypes: ServiceType[] = ['URGENT_1H', 'URGENT_2H', 'URGENT_4H'];
  const statuses = getAllServicesAvailability();

  return statuses.some(
    (s) => urgentTypes.includes(s.service) && s.available
  );
}

/**
 * Get the recommended service based on user's arrival time
 * @param arrivalTime - When the user needs to arrive in Vietnam
 * @returns Recommended service type or null if no service can meet the deadline
 */
export function getRecommendedService(arrivalTime: Date): ServiceAvailability | null {
  const vnTime = getVietnamTime();
  const hoursUntilArrival = (arrivalTime.getTime() - vnTime.getTime()) / (1000 * 60 * 60);

  const availableServices = getAvailableServices();

  // Find the cheapest service that can meet the deadline
  // Services are sorted by priority (urgency), so we go from least urgent to most urgent
  const sortedByPriority = [...availableServices].sort(
    (a, b) => b.config.basePriority - a.config.basePriority
  );

  for (const service of sortedByPriority) {
    // Add buffer time (2 hours for safety)
    if (service.config.processingHours + 2 <= hoursUntilArrival) {
      return service;
    }
  }

  // No service can meet the deadline
  return null;
}

/**
 * Get services that should be advertised on Google Ads right now
 * This excludes services that will become unavailable soon
 */
export function getAdvertisableServices(): ServiceAvailability[] {
  const officeStatus = getVietnamOfficeStatus();
  const availableServices = getAvailableServices();

  // Don't advertise urgent services in the last hour of operations
  // to avoid disappointed customers
  if (officeStatus.isOpen && officeStatus.minutesUntilClose !== null) {
    if (officeStatus.minutesUntilClose < 60) {
      // Filter out 1-hour urgent service
      return availableServices.filter((s) => s.service !== 'URGENT_1H');
    }
    if (officeStatus.minutesUntilClose < 120) {
      // Filter out 1h and 2h urgent services
      return availableServices.filter(
        (s) => s.service !== 'URGENT_1H' && s.service !== 'URGENT_2H'
      );
    }
  }

  return availableServices;
}

/**
 * Get a summary of service availability for logging/monitoring
 */
export function getAvailabilitySummary(): {
  timestamp: string;
  vietnamTime: string;
  officeStatus: OfficeStatus;
  isWeekendWindow: boolean;
  availableCount: number;
  unavailableCount: number;
  services: Record<ServiceType, boolean>;
} {
  const officeStatus = getVietnamOfficeStatus();
  const allServices = getAllServicesAvailability();

  const services = {} as Record<ServiceType, boolean>;
  for (const s of allServices) {
    services[s.service] = s.available;
  }

  return {
    timestamp: new Date().toISOString(),
    vietnamTime: officeStatus.currentTimeVNFormatted,
    officeStatus,
    isWeekendWindow: isWeekendWindow(),
    availableCount: allServices.filter((s) => s.available).length,
    unavailableCount: allServices.filter((s) => !s.available).length,
    services,
  };
}
