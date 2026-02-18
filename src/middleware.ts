import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Tours routes should only be accessible on vietnamtravel.help
  if (pathname.startsWith("/tours") || pathname.startsWith("/cruise")) {
    // Allow on vietnamtravel.help or localhost (for development)
    const isVietnamTravelHelp = hostname.includes("vietnamtravel.help");
    const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1");

    if (!isVietnamTravelHelp && !isLocalhost) {
      // Redirect to homepage if trying to access tours from other domains
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tours/:path*",
    "/cruise/:path*",
  ],
};
