import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  RATE_LIMITS,
  classifyUserAgent,
  clientIp,
  forbiddenResponse,
  isCorpusPath,
  takeRateToken,
  tooManyRequestsResponse,
} from "@/lib/anti-scrape";

/**
 * Edge gate: keep preview hosts out of the index, block AI/tool scrapers,
 * and rate-limit aggressive crawling. Verified search bots stay uncapped.
 *
 * Cloudflare Bot Fight Mode / WAF (dashboard) remains the outer layer;
 * this middleware is defence-in-depth inside the Worker.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent");
  const kind = classifyUserAgent(ua);

  if (kind === "blocked") {
    return forbiddenResponse("ua");
  }

  // Rate-limit humans / unknown automation; never throttle allowlisted bots.
  if (kind === "humanish") {
    const ip = clientIp(request);
    const corpus = isCorpusPath(pathname);
    const conf = corpus ? RATE_LIMITS.corpus : RATE_LIMITS.general;
    const bucketKey = `${corpus ? "c" : "g"}:${ip}`;
    const { ok, retryAfterSec } = takeRateToken(
      bucketKey,
      conf.limit,
      conf.windowMs,
    );
    if (!ok) {
      return tooManyRequestsResponse(retryAfterSec);
    }
  }

  const response = NextResponse.next();

  const isPreviewHost =
    host.endsWith(".vercel.app") ||
    host.endsWith(".workers.dev") ||
    host.endsWith(".pages.dev");

  if (isPreviewHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Discourage casual embedding / cross-origin scrapers of HTML documents.
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match document / RSC routes. Skip hashed static assets and image files
     * so CDN caches stay hot and Lighthouse stays happy.
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|pdf|woff2?)$).*)",
  ],
};
