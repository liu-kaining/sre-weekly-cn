import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleCn: z.string(),
    url: z.string().url(),
    author: z.string().optional(),
    issueNumber: z.number(),
    issueDate: z.string(),
    category: z.enum([
      'incident-report',
      'monitoring-observability',
      'reliability-engineering',
      'platform-engineering',
      'devops-culture',
      'chaos-engineering',
      'on-call-response',
      'performance',
      'security-reliability',
      'misc',
    ]),
    tags: z.array(z.string()),
    score: z.number().min(1).max(10),
    summary: z.string(),
    summaryCn: z.string(),
    commentary: z.string(),
    publishDate: z.coerce.date(),
  }),
});

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    issueNumber: z.number(),
    title: z.string(),
    date: z.coerce.date(),
    url: z.string().url(),
    articleCount: z.number(),
  }),
});

export const collections = { articles, issues };
