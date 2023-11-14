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

export const collections = {
  leavenotrace: leavenotraceCollection,
};
