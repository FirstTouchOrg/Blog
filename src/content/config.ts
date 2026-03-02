import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'zh']),
    title: z.string(),
    description: z.string(),
    excerpt: z.string().optional(),
    publishDate: z.date(),
    hero: z.string().optional(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog };
