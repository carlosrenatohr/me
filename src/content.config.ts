import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content schemas mirror docs/content/CONTENT-MODEL.md.
 *
 * Every collection carries `contentStatus`. Entries marked "placeholder" must not
 * be published; the repository layer refuses to return them to public pages.
 */

const contentStatus = z.enum(['placeholder', 'verified']);

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
  kind: z.enum(['live', 'repository', 'case-study', 'reference']),
});

const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string().min(1),
    headline: z.string().min(1),
    shortIntro: z.string().min(1),
    biography: z.string().min(1),
    contentStatus,
    location: z.string().optional(),
    email: z.email().optional(),
    cvPath: z.string().optional(),
    portrait: z
      .object({
        src: z.string(),
        alt: z.string().min(1),
      })
      .optional(),
    links: z.array(link).default([]),
  }),
});

const project = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    status: z.enum(['draft', 'published']).default('draft'),
    contentStatus,
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().optional(),
    period: z
      .object({
        start: z.string(),
        end: z.string().optional(),
      })
      .optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    cover: z
      .object({
        src: z.string(),
        alt: z.string().min(1),
      })
      .optional(),
    context: z.string().optional(),
    contribution: z.string().optional(),
    approach: z.string().optional(),
    technicalDecisions: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().min(1),
          caption: z.string().optional(),
        })
      )
      .default([]),
    links: z.array(link).default([]),
    confidentialityNote: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.json' }),
  schema: z.object({
    organization: z.string().min(1),
    role: z.string().min(1),
    contentStatus,
    period: z.object({
      start: z.string(),
      end: z.string().optional(),
    }),
    summary: z.string().optional(),
    contributions: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
  }),
});

export const collections = { profile, project, experience };
