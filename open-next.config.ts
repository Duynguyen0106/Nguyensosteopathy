import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare Workers adapter.
 * `buildCommand` must call Next directly (not `npm run build`) so package.json
 * can use `"build": "opennextjs-cloudflare build"` for Workers Builds without
 * infinite recursion.
 *
 * Enable R2 incremental cache in wrangler.jsonc + here when the bucket exists:
 *   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 *   export default { ...defineCloudflareConfig({ incrementalCache: r2IncrementalCache }), buildCommand: "npx next build" };
 */
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npx next build",
};
