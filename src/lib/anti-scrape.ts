/**
 * Edge-friendly scrape / bot helpers for middleware.
 * Search engines stay allowed; AI scrapers and obvious tooling are blocked.
 */

/** Polite search / preview agents we never rate-limit or block by UA alone. */
export const ALLOWED_BOT_UA =
  /googlebot|google-inspectiontool|bingbot|slurp|duckduckbot|baiduspider|yandex(bot)?|applebot|facebookexternalhit|facebot|linkedinbot|twitterbot|whatsapp|telegrambot|discordbot|skypeuripreview|embedly|quora link preview|redditbot|pinterest|flipboard|tumblr|bitlybot|skypebot|storebot-google|adsbot-google|mediapartners-google|google-safety|chrome-lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|statuscake|better uptime|cloudflare-healthchecks/i;

/**
 * AI / corpus scrapers and common toolkits.
 * Deliberately omit curl/wget so ops health checks and local debugging still work —
 * volume is controlled by rate limits instead.
 */
export const BLOCKED_BOT_UA =
  /gptbot|chatgpt-user|oai-searchbot|claudebot|anthropic-ai|ccbot|bytespider|petalbot|diffbot|dataforseo|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming frog|httrack|python-requests|python-urllib|scrapy|libwww-perl|go-http-client|php\/|node-fetch|axios\/|postmanruntime|insomnia\/|nuclei|sqlmap|masscan|zgrab|nikto|meta-externalagent|google-extended|applebot-extended|cohere-ai/i;

/** High-volume education corpus — tighter per-IP budget. */
export function isCorpusPath(pathname: string): boolean {
  return (
    pathname.startsWith("/education/acupuncture/reference") ||
    pathname.startsWith("/education/library/")
  );
}

export function clientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export function classifyUserAgent(ua: string | null): "allowed-bot" | "blocked" | "humanish" {
  const value = (ua || "").trim();
  if (!value) return "blocked";
  if (ALLOWED_BOT_UA.test(value)) return "allowed-bot";
  if (BLOCKED_BOT_UA.test(value)) return "blocked";
  return "humanish";
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Soft cap so a single isolate cannot grow without bound. */
const MAX_KEYS = 5_000;

function prune(now: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
    if (buckets.size < MAX_KEYS * 0.8) break;
  }
  if (buckets.size >= MAX_KEYS) {
    // Drop oldest half if still full (pathological scrape).
    let i = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++i >= MAX_KEYS / 2) break;
    }
  }
}

/**
 * Sliding fixed-window counter per key (approximate across Cloudflare isolates).
 * Returns whether the request is allowed and seconds until the window resets.
 */
export function takeRateToken(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): { ok: boolean; retryAfterSec: number } {
  prune(now);
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: Math.ceil(windowMs / 1000) };
  }
  existing.count += 1;
  const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  if (existing.count > limit) {
    return { ok: false, retryAfterSec };
  }
  return { ok: true, retryAfterSec };
}

/** Limits tuned for a brochure clinic site + large education corpus. */
export const RATE_LIMITS = {
  general: { limit: 90, windowMs: 60_000 },
  corpus: { limit: 25, windowMs: 60_000 },
} as const;

export function forbiddenResponse(reason: string): Response {
  return new Response("Forbidden", {
    status: 403,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      "X-Deny-Reason": reason,
    },
  });
}

export function tooManyRequestsResponse(retryAfterSec: number): Response {
  return new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": String(retryAfterSec),
      "X-Robots-Tag": "noindex",
    },
  });
}
