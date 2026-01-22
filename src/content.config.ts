import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const leavenotraceCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/leavenotrace' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      topText: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
});

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.boolean(),
      publishedOn: z.date(),
      coverImage: image(),
      previewText: z.string(),
    }),
});

const eventsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/events' }),
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      meetingLocation: z.object({
        predefinedLocation: z.number(),
        alternativeLocation: z.string().optional(),
        alternativeLocationDirectionsLink: z.string().optional(),
        notes: z.string().optional(),
      }),
      link: z.string().optional(),
      time: z.string(),
    }),
});

const trailheadsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/trailheads' }),
  schema: ({ image }) =>
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      directionsLink: z.string(),
      location: z.string(),
      amenities: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
        }),
      ),
      map: image(),
      photos: z.array(
        z.object({
          photo: image(),
          caption: z.string(),
        }),
      ),
    }),
});

const linksCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/links' }),
  schema: () =>
    z.object({
      title: z.string(),
      link: z.string(),
      priority: z.number(),
    }),
});

const wishlistCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/wishlist' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      link: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      quantityNeeded: z.number(),
    }),
});

const volunteerSpotlightCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/volunteer-spotlight' }),
  schema: ({ image }) =>
    z.object({
      intro: z.string(),
      instagram: z.string().optional(),
      website: z.string().optional(),
      name: z.string(),
      images: z.array(
        z.object({
          image: image(),
        }),
      ),
    }),
});

export const collections = {
  leavenotrace: leavenotraceCollection,
  news: newsCollection,
  events: eventsCollection,
  trailheads: trailheadsCollection,
  links: linksCollection,
  wishlist: wishlistCollection,
  'volunteer-spotlight': volunteerSpotlightCollection,
};
