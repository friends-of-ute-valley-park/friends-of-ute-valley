import { defineCollection, z } from 'astro:content';

const leavenotraceCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      topText: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
});

const newsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.boolean(),
      publishedOn: z.date(),
      coverImage: image(),
      previewText: z.string(),
    }),
});

export const collections = {
  leavenotrace: leavenotraceCollection,
  news: newsCollection,
};
