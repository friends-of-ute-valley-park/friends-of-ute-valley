import { getCollection, type CollectionEntry } from 'astro:content';
import { getDateTime, isUpcomingDate } from './date';

type PriorityEntry = {
  data: {
    priority: number;
  };
};

type TrailheadEntry = CollectionEntry<'trailheads'>;
type NewsEntry = CollectionEntry<'news'>;
type EventEntry = CollectionEntry<'events'>;

export const byEventDateAsc = (a: EventEntry, b: EventEntry): number => getDateTime(a.data.date) - getDateTime(b.data.date);

export const byPublishedOnDesc = (a: NewsEntry, b: NewsEntry): number => getDateTime(b.data.publishedOn) - getDateTime(a.data.publishedOn);

export const byTrailheadOrder = (a: TrailheadEntry, b: TrailheadEntry): number => a.data.id - b.data.id;

export const byPriorityAsc = <T extends PriorityEntry>(a: T, b: T): number => a.data.priority - b.data.priority;

export const byPriorityDesc = <T extends PriorityEntry>(a: T, b: T): number => b.data.priority - a.data.priority;

export async function getUpcomingVolunteerEvents(): Promise<EventEntry[]> {
  const events = await getCollection('events', ({ data }) => isUpcomingDate(data.date));

  return [...events].sort(byEventDateAsc);
}

export async function getPublishedNewsEntries(): Promise<NewsEntry[]> {
  const newsEntries = await getCollection('news', ({ data }) => data.published === true);

  return [...newsEntries].sort(byPublishedOnDesc);
}

export async function getSortedTrailheads(): Promise<TrailheadEntry[]> {
  const trailheads = await getCollection('trailheads');

  return [...trailheads].sort(byTrailheadOrder);
}
