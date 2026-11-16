import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content schemas mirror docs/content/CONTENT-MODEL.md.
 *
 * Every collection carries `contentStatus`. Entries marked "placeholder" must not
 * be published; the repository layer refuses to return them to public pages.
 *
 * Periods use `YYYY-MM` so entries sort chronologically. `literal('present')` marks
 * an ongoing role; formatting for display lives in `src/lib/content.ts`, never here.
 */

const contentStatus = z.enum(['placeholder', 'verified']);

const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2026-03.');

const period = z.object({
  start: month,
  end: z.union([month, z.literal('present')]).optional(),
});

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
  kind: z.enum(['live', 'repository', 'case-study', 'reference']),
});

const image = z.object({
  src: z.string(),
  alt: z.string().min(1),
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
    /** Display form; `src/lib/contact.ts` strips it for the tel: link. */
    phone: z.string().optional(),
    cvPath: z.string().optional(),
    /** "10+ years" — a claim the owner states, never inferred from the roles. */
    yearsExperience: z.string().optional(),
    /** "Open to new work" — rendered as a status line when present. */
    availability: z.string().optional(),
    portrait: image.optional(),
    education: z
      .array(
        z.object({
          credential: z.string().min(1),
          institution: z.string().min(1),
          period: z.string().min(1),
          location: z.string().optional(),
        })
      )
      .default([]),
    links: z.array(link).default([]),
  }),
});

/**
 * `kind` drives the order of the Work index: personal and side projects lead,
 * client work follows. It never changes the case-study layout.
 */
const project = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    kind: z.enum(['personal', 'client']).default('client'),
    /**
     * `sample` publishes the layout with demonstration content: it must render the
     * page but never pass for the owner's work, so every surface that shows it is
     * labelled. Only `published` + `verified` counts as a real case study.
     */
    status: z.enum(['draft', 'published', 'sample']).default('draft'),
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
    cover: image.optional(),
    /** Captures of the product. `src` under /images/projects/<slug>/. */
    screenshots: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().min(1),
          caption: z.string().optional(),
        })
      )
      .default([]),
    context: z.string().optional(),
    contribution: z.string().optional(),
    approach: z.string().optional(),
    /** A pull quote from the owner, published only when verified. */
    quote: z.string().optional(),
    /** Surfaces the work touched, e.g. "Internal panel", "Public site". */
    surfaces: z.array(z.string()).default([]),
    technicalDecisions: z
      .array(
        z.object({
          title: z.string().min(1),
          body: z.string().min(1),
        })
      )
      .default([]),
    outcomes: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    confidentialityNote: z.string().optional(),
  }),
});

/**
 * Experience is Markdown so a role can carry prose when the bullets are not enough;
 * `contributions` stays structured because the About page renders it as a list.
 */
const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    organization: z.string().min(1),
    role: z.string().min(1),
    contentStatus,
    /** `primary` is professional history; `additional` is earlier or partial work. */
    group: z.enum(['primary', 'additional']).default('primary'),
    location: z.string().optional(),
    period,
    summary: z.string().optional(),
    contributions: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
  }),
});

export const collections = { profile, project, experience };
