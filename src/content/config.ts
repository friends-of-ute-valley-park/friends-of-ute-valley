import { defineCollection, z } from 'astro:content';

const leavenotraceCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      topText: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
});

const newsCollection = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: () => {
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
    })
  }
})

const trailheadsCollection = defineCollection({
  type: 'content',
  schema: ({image}) =>
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      directionsLink: z.string(),
      location: z.string(),
      amenities: z.array(z.object({
        name: z.string(),
        description: z.string(),
      })),
      map: image(),
      photos: z.array(z.object({
        photo: image(),
        caption: z.string(),
      })),
    }),
  });

  const linksCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        link: z.string(),
      }),
  });

  const wishlistCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        link: z.string(),
        image: image(),
        imageAlt: z.string(),
        quantityNeeded: z.number(),
      }),
  });

export const collections = {
  leavenotrace: leavenotraceCollection,
  news: newsCollection,
  events: eventsCollection,
  trailheads: trailheadsCollection,
}
