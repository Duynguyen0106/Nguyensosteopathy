import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

/**
 * OpenNext → Cloudflare Workers adapter.
 * `buildCommand` must call Next directly (not `npm run build`) so package.json
 * can use `"build": "opennextjs-cloudflare build"` for Workers Builds without
 * infinite recursion.
 *
 * Incremental cache uses R2 so prerendered SSG routes (including the large
 * acupuncture corpus) are served from cache instead of re-running on workerd
 * without access to `src/data` files.
 */
export default {
  ...defineCloudflareConfig({
    incrementalCache: r2IncrementalCache,
  }),
  buildCommand: "npx next build",
};
