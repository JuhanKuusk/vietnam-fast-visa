/**
 * Supabase database operations for Tour Booking System
 * Completely separate from visa application database operations
 */

import { supabase } from "./supabase";
import type { TourInquiry, TourAnalyticsEvent } from "@/types/tours";

// =====================================================
// Tour Inquiries
// =====================================================

/**
 * Create a new tour inquiry in the database
 */
export async function createTourInquiry(
  inquiry: Omit<TourInquiry, "id" | "createdAt" | "updatedAt">
): Promise<TourInquiry> {
  const { data, error } = await supabase
    .from("tour_inquiries")
    .insert({
      inquiry_number: inquiry.inquiryNumber,
      tour_id: inquiry.tourId,
      tour_name: inquiry.tourName,
      tour_category: inquiry.tourCategory,
      full_name: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      whatsapp: inquiry.whatsapp,
      nationality: inquiry.nationality,
      preferred_date: inquiry.preferredDate,
      number_of_adults: inquiry.numberOfAdults,
      number_of_children: inquiry.numberOfChildren,
      special_requests: inquiry.specialRequests,
      status: inquiry.status || "new",
      referred_to_affiliate: inquiry.referredToAffiliate || false,
      source_domain: inquiry.sourceDomain || "vietnamtravel.help",
      user_agent: inquiry.userAgent,
      ip_address: inquiry.ipAddress,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating tour inquiry:", error);
    throw new Error(`Failed to create tour inquiry: ${error.message}`);
  }

  return {
    id: data.id,
    inquiryNumber: data.inquiry_number,
    tourId: data.tour_id,
    tourName: data.tour_name,
    tourCategory: data.tour_category,
    fullName: data.full_name,
    email: data.email,
    phone: data.phone,
    whatsapp: data.whatsapp,
    nationality: data.nationality,
    preferredDate: data.preferred_date,
    numberOfAdults: data.number_of_adults,
    numberOfChildren: data.number_of_children,
    specialRequests: data.special_requests,
    status: data.status,
    referredToAffiliate: data.referred_to_affiliate,
    sourceDomain: data.source_domain,
    userAgent: data.user_agent,
    ipAddress: data.ip_address,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Get count of tour inquiries created today
 * Used for generating unique inquiry numbers
 */
export async function getTodayInquiryCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const { count, error } = await supabase
    .from("tour_inquiries")
    .select("*", { count: "exact", head: true })
    .gte("created_at", todayISO);

  if (error) {
    console.error("Error getting today's inquiry count:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Generate unique inquiry number in format: TI-YYYYMMDD-XXXX
 */
export async function generateInquiryNumber(): Promise<string> {
  const count = await getTodayInquiryCount();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const sequence = String(count + 1).padStart(4, "0");

  return `TI-${year}${month}${day}-${sequence}`;
}

/**
 * Get tour inquiry by inquiry number
 */
export async function getTourInquiryByNumber(
  inquiryNumber: string
): Promise<TourInquiry | null> {
  const { data, error } = await supabase
    .from("tour_inquiries")
    .select("*")
    .eq("inquiry_number", inquiryNumber)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    inquiryNumber: data.inquiry_number,
    tourId: data.tour_id,
    tourName: data.tour_name,
    tourCategory: data.tour_category,
    fullName: data.full_name,
    email: data.email,
    phone: data.phone,
    whatsapp: data.whatsapp,
    nationality: data.nationality,
    preferredDate: data.preferred_date,
    numberOfAdults: data.number_of_adults,
    numberOfChildren: data.number_of_children,
    specialRequests: data.special_requests,
    status: data.status,
    referredToAffiliate: data.referred_to_affiliate,
    sourceDomain: data.source_domain,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

// =====================================================
// Tour Analytics
// =====================================================

/**
 * Track a tour analytics event (view, inquiry, affiliate_click)
 */
export async function trackTourAnalytics(
  event: TourAnalyticsEvent
): Promise<void> {
  const { error } = await supabase.from("tour_analytics").insert({
    tour_id: event.tourId,
    event_type: event.eventType,
    source_domain: event.sourceDomain || "vietnamtravel.help",
    user_agent: event.userAgent,
    referrer: event.referrer,
  });

  if (error) {
    console.error("Error tracking tour analytics:", error);
    // Don't throw error - analytics failures shouldn't break the app
  }
}

/**
 * Get analytics for a specific tour
 */
export async function getTourAnalytics(tourId: string) {
  const { data, error } = await supabase
    .from("tour_analytics")
    .select("*")
    .eq("tour_id", tourId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting tour analytics:", error);
    return [];
  }

  return data;
}

/**
 * Get popular tours based on views
 */
export async function getPopularTours(limit: number = 5) {
  const { data, error } = await supabase
    .from("tour_analytics")
    .select("tour_id")
    .eq("event_type", "view");

  if (error || !data) {
    return [];
  }

  // Count occurrences of each tour_id
  const tourCounts = data.reduce((acc: Record<string, number>, row) => {
    acc[row.tour_id] = (acc[row.tour_id] || 0) + 1;
    return acc;
  }, {});

  // Sort by count and return top N
  return Object.entries(tourCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tourId, count]) => ({ tourId, views: count }));
}
