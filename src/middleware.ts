import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep non-canonical preview hosts out of the index.
 * Production crawl target: www.nguyensosteopathy.com
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const response = NextResponse.next();

  const isPreviewHost =
    host.endsWith(".vercel.app") ||
    host.endsWith(".workers.dev") ||
    host.endsWith(".pages.dev");

  if (isPreviewHost) {
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
