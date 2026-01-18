/**
 * Vietnam Time Business Rules
 *
 * All visa processing decisions are based on Vietnam time (UTC+7).
 * This is the canonical time zone for determining:
 * - Office open/closed status
 * - Service availability
 * - Ad scheduling
 */

export const VIETNAM_TZ = 'Asia/Ho_Chi_Minh'; // UTC+7

// Vietnam office hours
export const OFFICE_OPEN_HOUR = 8;  // 08:00
export const OFFICE_CLOSE_HOUR = 16; // 16:00

// Vietnam public holidays 2024-2026 (approximate dates)
const VIETNAM_HOLIDAYS: string[] = [
  // Tet (Lunar New Year) - dates vary each year
  '2024-02-08', '2024-02-09', '2024-02-10', '2024-02-11', '2024-02-12',
  '2025-01-28', '2025-01-29', '2025-01-30', '2025-01-31', '2025-02-01',
  '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20',
  // Hung Kings' Festival (10th day of 3rd lunar month)
  '2024-04-18',
  '2025-04-07',
  '2026-04-26',
  // Reunification Day (April 30)
  '2024-04-30', '2025-04-30', '2026-04-30',
  // International Workers' Day (May 1)
  '2024-05-01', '2025-05-01', '2026-05-01',
  // National Day (September 2)
  '2024-09-02', '2025-09-02', '2026-09-02',
];

export interface OfficeStatus {
  isOpen: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  currentTimeVN: Date;
  currentTimeVNFormatted: string;
  hour: number;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  nextOpenTime: Date | null;
  minutesUntilOpen: number | null;
  minutesUntilClose: number | null;
}

/**
 * Get current Vietnam time as a Date object
 */
export function getVietnamTime(): Date {
  const now = new Date();
  // Create a formatter to get Vietnam time components
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: VIETNAM_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)?.value || '0';

  return new Date(
    parseInt(get('year')),
    parseInt(get('month')) - 1,
    parseInt(get('day')),
    parseInt(get('hour')),
    parseInt(get('minute')),
    parseInt(get('second'))
  );
}

/**
 * Check if a given date is a Vietnam public holiday
 */
export function isVietnamHoliday(date: Date): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return VIETNAM_HOLIDAYS.includes(dateStr);
}

/**
 * Calculate the next time the office will be open
 */
export function getNextOpenTime(vnTime: Date): Date {
  const nextOpen = new Date(vnTime);
  const hour = vnTime.getHours();
  const day = vnTime.getDay();

  // If it's a weekend or holiday, or after hours
  if (day === 0) {
    // Sunday - next open is Monday 8:00
    nextOpen.setDate(nextOpen.getDate() + 1);
    nextOpen.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);
  } else if (day === 6) {
    // Saturday - next open is Monday 8:00
    nextOpen.setDate(nextOpen.getDate() + 2);
    nextOpen.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);
  } else if (hour >= OFFICE_CLOSE_HOUR) {
    // After hours on weekday - next open is tomorrow 8:00 (or Monday if Friday)
    nextOpen.setDate(nextOpen.getDate() + (day === 5 ? 3 : 1));
    nextOpen.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);
  } else if (hour < OFFICE_OPEN_HOUR) {
    // Before hours on weekday - open at 8:00 today
    nextOpen.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);
  }

  // Check if next open time falls on a holiday
  while (isVietnamHoliday(nextOpen)) {
    nextOpen.setDate(nextOpen.getDate() + 1);
    // Skip weekends
    while (nextOpen.getDay() === 0 || nextOpen.getDay() === 6) {
      nextOpen.setDate(nextOpen.getDate() + 1);
    }
    nextOpen.setHours(OFFICE_OPEN_HOUR, 0, 0, 0);
  }

  return nextOpen;
}

/**
 * Get comprehensive Vietnam office status
 */
export function getVietnamOfficeStatus(): OfficeStatus {
  const vnTime = getVietnamTime();
  const hour = vnTime.getHours();
  const day = vnTime.getDay(); // 0 = Sunday, 6 = Saturday
  const minute = vnTime.getMinutes();

  const isWeekend = day === 0 || day === 6;
  const isHoliday = isVietnamHoliday(vnTime);
  const isWorkingHours = hour >= OFFICE_OPEN_HOUR && hour < OFFICE_CLOSE_HOUR;
  const isOpen = !isWeekend && !isHoliday && isWorkingHours;

  // Calculate minutes until open/close
  let minutesUntilClose: number | null = null;
  let minutesUntilOpen: number | null = null;

  if (isOpen) {
    // Minutes until 16:00
    minutesUntilClose = (OFFICE_CLOSE_HOUR - hour) * 60 - minute;
  } else {
    // Calculate minutes until next open
    const nextOpen = getNextOpenTime(vnTime);
    minutesUntilOpen = Math.round((nextOpen.getTime() - vnTime.getTime()) / 60000);
  }

  // Format current time for display
  const currentTimeVNFormatted = vnTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return {
    isOpen,
    isWeekend,
    isHoliday,
    currentTimeVN: vnTime,
    currentTimeVNFormatted,
    hour,
    dayOfWeek: day,
    nextOpenTime: isOpen ? null : getNextOpenTime(vnTime),
    minutesUntilOpen,
    minutesUntilClose,
  };
}

/**
 * Check if we're in the "weekend window" (Friday 16:00 to Monday 08:00 Vietnam time)
 */
export function isWeekendWindow(): boolean {
  const vnTime = getVietnamTime();
  const day = vnTime.getDay();
  const hour = vnTime.getHours();

  // Friday after 16:00
  if (day === 5 && hour >= OFFICE_CLOSE_HOUR) return true;
  // Saturday
  if (day === 6) return true;
  // Sunday
  if (day === 0) return true;
  // Monday before 08:00
  if (day === 1 && hour < OFFICE_OPEN_HOUR) return true;

  return false;
}

/**
 * Format Vietnam time for display in a specific locale
 */
export function formatVietnamTimeForLocale(
  locale: string = 'en-US',
  format: 'short' | 'long' | 'time-only' = 'short'
): string {
  const vnTime = getVietnamTime();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: VIETNAM_TZ,
  };

  switch (format) {
    case 'time-only':
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'long':
      options.weekday = 'long';
      options.year = 'numeric';
      options.month = 'long';
      options.day = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'short':
    default:
      options.month = 'short';
      options.day = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
  }

  return vnTime.toLocaleString(locale, options);
}
