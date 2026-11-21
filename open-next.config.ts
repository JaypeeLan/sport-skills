import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Defaults: no incremental cache, because every page is either dynamic or static.
export default defineCloudflareConfig()
