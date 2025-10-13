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
    }),

    education: defineCollection({
      type: 'data',
      // pull structured files from content/jobs
      source: 'education/**/*.{yml,yaml,json}',

      // schema gives TS types + validation
      schema: z.object({
        degree: z.string(),
        institution: z.string(),
        // store dates as ISO strings to keep ordering predictable
        start: z.string(), // e.g. "2022-07-01"
        end: z.string().nullable(), // null -> Present
        gpa: z.number(),
        achieved: z.boolean()
      })
    }),

    skills: defineCollection({
      type: 'data',
      // pull structured files from content/jobs
      source: 'misc/skills.{yml,yaml,json}',

      // schema gives TS types + validation
      schema: z.object({
        platforms: z.array(z.string()),
        languages: z.array(z.string()),
        frameworks: z.array(z.string()),
        other: z.array(z.string())
      })
    }),

    projects: defineCollection({
      type: 'data',
      // pull structured files from content/jobs
      source: 'projects/**/*.{yml,yaml,json}',

      // schema gives TS types + validation
      schema: z.object({
        name: z.string(),
        tags: z.array(z.string()),
        description: z.string()
      })
    })
  }
})
