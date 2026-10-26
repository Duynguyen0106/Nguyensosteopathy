import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep *.vercel.app (and other non-canonical hosts) out of the index.
 * Custom domain www is the only production host we want crawled.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const response = NextResponse.next();

  // Covers nguyensosteopathy.vercel.app and any other *.vercel.app preview host.
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets Next serves directly.
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|pdf)$).*)",
  ],
};
