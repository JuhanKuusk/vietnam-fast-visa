import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for multi-domain support
 * Detects the hostname and sets cookies for client-side access
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get hostname from request
  const hostname = request.headers.get("host") || "vietnamvisahelp.com";

  // Remove port number if present (for local development)
  const cleanHostname = hostname.split(":")[0].toLowerCase();

  // Remove www. prefix
  const domain = cleanHostname.replace(/^www\./, "");

  // Set the domain as a cookie for client-side access
  // This is more reliable than trying to detect on client
  response.cookies.set("site-domain", domain, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  // Also set a header that can be read by Server Components
  response.headers.set("x-site-domain", domain);

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (api/*)
     * - static files (_next/static/*, _next/image/*, *.ico, *.png, etc.)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp).*)",
  ],
};
