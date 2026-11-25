import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext → Cloudflare Workers adapter.
 * `buildCommand` must call Next directly (not `npm run build`) so package.json
 * can use `"build": "opennextjs-cloudflare build"` for Workers Builds without
 * infinite recursion.
 *
 * Use the static-assets incremental cache (read-only prerender store under
 * `cdn-cgi/_next_cache`). The acupuncture corpus is fully SSG; R2 was
 * populating correctly but runtime lookups still served poisoned 404 HIT
 * entries after workerd SSR misses. Static assets cannot be overwritten by
 * those misses.
 */
export default {
  ...defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
  }),
  buildCommand: "npx next build",
};
