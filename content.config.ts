// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    jobs: defineCollection({
      type: 'data',
      // pull structured files from content/jobs
      source: 'jobs/**/*.{yml,yaml,json}',

      // schema gives TS types + validation
      schema: z.object({
        title: z.string(),
        company: z.string(),
        // store dates as ISO strings to keep ordering predictable
        start: z.string(), // e.g. "2022-07-01"
        end: z.string().nullable(), // null -> Present
        bullets: z.array(z.string()),
      })
    })
  }
})
