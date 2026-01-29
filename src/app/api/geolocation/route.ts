import { NextRequest, NextResponse } from "next/server";

interface GeolocationResponse {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  lat?: number;
  lon?: number;
}

export async function GET(request: NextRequest) {
  try {
    // Get IP from headers (Vercel/Cloudflare provide these)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const vercelIp = request.headers.get("x-vercel-forwarded-for");

    // Use the first IP from x-forwarded-for, or fall back to other headers
    const ip = forwardedFor?.split(",")[0]?.trim() ||
               vercelIp?.split(",")[0]?.trim() ||
               realIp ||
               "";

    // Skip geolocation for local/private IPs
    if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      // Return a default for development
      return NextResponse.json({
        country: "United States",
        countryCode: "US",
        city: "New York",
        region: "New York",
      } as GeolocationResponse);
    }

    // Use ip-api.com (free, no API key required, 45 requests/minute limit)
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,lat,lon`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`IP API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "fail") {
      console.error("IP geolocation failed:", data.message);
      // Return default
      return NextResponse.json({
        country: "United States",
        countryCode: "US",
        city: "New York",
        region: "New York",
      } as GeolocationResponse);
    }

    return NextResponse.json({
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      region: data.regionName,
      lat: data.lat,
      lon: data.lon,
    } as GeolocationResponse);
  } catch (error) {
    console.error("Geolocation error:", error);
    // Return a sensible default on error
    return NextResponse.json({
      country: "United States",
      countryCode: "US",
      city: "New York",
      region: "New York",
    } as GeolocationResponse);
  }
}
