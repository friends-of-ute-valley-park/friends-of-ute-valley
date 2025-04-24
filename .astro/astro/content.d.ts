declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"events": {
"3-days-3-parks-2023-volunteer-session.md": {
	id: "3-days-3-parks-2023-volunteer-session.md";
  slug: "3-days-3-parks-2023-volunteer-session";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"3-days-3-parks-at-ute-valley-park-work-day.md": {
	id: "3-days-3-parks-at-ute-valley-park-work-day.md";
  slug: "3-days-3-parks-at-ute-valley-park-work-day";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"3-days-3-parks-ute-valley-park-april-21-2024.md": {
	id: "3-days-3-parks-ute-valley-park-april-21-2024.md";
  slug: "3-days-3-parks-ute-valley-park-april-21-2024";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"3-days-3-parks-ute-valley-park-april-27-2025.md": {
	id: "3-days-3-parks-ute-valley-park-april-27-2025.md";
  slug: "3-days-3-parks-ute-valley-park-april-27-2025";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"community-workday-at-ute-valley-park.md": {
	id: "community-workday-at-ute-valley-park.md";
  slug: "community-workday-at-ute-valley-park";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"creek-week-2024.md": {
	id: "creek-week-2024.md";
  slug: "creek-week-2024";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"friday-morning-work-session-april-12th-2024-9-00-12-00pm.md": {
	id: "friday-morning-work-session-april-12th-2024-9-00-12-00pm.md";
  slug: "friday-morning-work-session-april-12th-2024-9-00-12-00pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"saturday-morning-work-session-october-19th-2024-9-00am-12-00pm.md": {
	id: "saturday-morning-work-session-october-19th-2024-9-00am-12-00pm.md";
  slug: "saturday-morning-work-session-october-19th-2024-9-00am-12-00pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"saturday-morning-work-session-september-9th-2023-9-00am-to-1-00pm.md": {
	id: "saturday-morning-work-session-september-9th-2023-9-00am-to-1-00pm.md";
  slug: "saturday-morning-work-session-september-9th-2023-9-00am-to-1-00pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"saturday-work-session-10-22-2022.md": {
	id: "saturday-work-session-10-22-2022.md";
  slug: "saturday-work-session-10-22-2022";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"saturday-work-session-10-23-2021.md": {
	id: "saturday-work-session-10-23-2021.md";
  slug: "saturday-work-session-10-23-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"ute-valley-park-wildfire-mitigation-workday.md": {
	id: "ute-valley-park-wildfire-mitigation-workday.md";
  slug: "ute-valley-park-wildfire-mitigation-workday";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-1.md": {
	id: "wednesday-evening-work-session-1.md";
  slug: "wednesday-evening-work-session-1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-5-19-2021.md": {
	id: "wednesday-evening-work-session-5-19-2021.md";
  slug: "wednesday-evening-work-session-5-19-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-5-5-2021.md": {
	id: "wednesday-evening-work-session-5-5-2021.md";
  slug: "wednesday-evening-work-session-5-5-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-6-16-21.md": {
	id: "wednesday-evening-work-session-6-16-21.md";
  slug: "wednesday-evening-work-session-6-16-21";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-7-21-2021.md": {
	id: "wednesday-evening-work-session-7-21-2021.md";
  slug: "wednesday-evening-work-session-7-21-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-7-7-2021.md": {
	id: "wednesday-evening-work-session-7-7-2021.md";
  slug: "wednesday-evening-work-session-7-7-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-8-18-2021.md": {
	id: "wednesday-evening-work-session-8-18-2021.md";
  slug: "wednesday-evening-work-session-8-18-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-8-4-2021.md": {
	id: "wednesday-evening-work-session-8-4-2021.md";
  slug: "wednesday-evening-work-session-8-4-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-9-1-2021.md": {
	id: "wednesday-evening-work-session-9-1-2021.md";
  slug: "wednesday-evening-work-session-9-1-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-9-15-2021.md": {
	id: "wednesday-evening-work-session-9-15-2021.md";
  slug: "wednesday-evening-work-session-9-15-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-april-19th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-april-19th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-april-19th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-april-3rd-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-april-3rd-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-april-3rd-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-april-6-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-april-6-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-april-6-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-august-16th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-august-16th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-august-16th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-august-17-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-august-17-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-august-17-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-august-21st-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-august-21st-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-august-21st-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-august-2nd-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-august-2nd-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-august-2nd-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-august-3-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-august-3-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-august-3-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-group-1-4-7-2021.md": {
	id: "wednesday-evening-work-session-group-1-4-7-2021.md";
  slug: "wednesday-evening-work-session-group-1-4-7-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-group-2-4-7-2021.md": {
	id: "wednesday-evening-work-session-group-2-4-7-2021.md";
  slug: "wednesday-evening-work-session-group-2-4-7-2021";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-10th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-july-10th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-july-10th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-19th-2023-5-30-8-00pm.md": {
	id: "wednesday-evening-work-session-july-19th-2023-5-30-8-00pm.md";
  slug: "wednesday-evening-work-session-july-19th-2023-5-30-8-00pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-20-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-july-20-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-july-20-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-24th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-july-24th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-july-24th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-6-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-july-6-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-july-6-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-july-7th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-july-7th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-july-7th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-june-1-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-june-1-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-june-1-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-june-19th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-june-19th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-june-19th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-june-21st-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-june-21st-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-june-21st-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-june-5th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-june-5th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-june-5th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-june-7th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-june-7th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-june-7th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-may-15th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-may-15th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-may-15th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-may-17th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-may-17th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-may-17th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-may-18-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-may-18-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-may-18-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-may-1st-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-may-1st-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-may-1st-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-may-3rd-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-may-3rd-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-may-3rd-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-sept-21-2022-5-30-7-30pm-1.md": {
	id: "wednesday-evening-work-session-sept-21-2022-5-30-7-30pm-1.md";
  slug: "wednesday-evening-work-session-sept-21-2022-5-30-7-30pm-1";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-sept-21-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-sept-21-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-sept-21-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-sept-7-2022-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-sept-7-2022-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-sept-7-2022-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-september-18th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-september-18th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-september-18th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-september-20th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-september-20th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-september-20th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-september-4th-2024-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-september-4th-2024-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-september-4th-2024-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session-september-6th-2023-5-30-7-30pm.md": {
	id: "wednesday-evening-work-session-september-6th-2023-5-30-7-30pm.md";
  slug: "wednesday-evening-work-session-september-6th-2023-5-30-7-30pm";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"wednesday-evening-work-session.md": {
	id: "wednesday-evening-work-session.md";
  slug: "wednesday-evening-work-session";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"leavenotrace": {
"leave-what-you-find.md": {
	id: "leave-what-you-find.md";
  slug: "leave-what-you-find";
  body: string;
  collection: "leavenotrace";
  data: InferEntrySchema<"leavenotrace">
} & { render(): Render[".md"] };
"respect-wildlife.md": {
	id: "respect-wildlife.md";
  slug: "respect-wildlife";
  body: string;
  collection: "leavenotrace";
  data: InferEntrySchema<"leavenotrace">
} & { render(): Render[".md"] };
"travel-on-durable-surfaces.md": {
	id: "travel-on-durable-surfaces.md";
  slug: "travel-on-durable-surfaces";
  body: string;
  collection: "leavenotrace";
  data: InferEntrySchema<"leavenotrace">
} & { render(): Render[".md"] };
};
"links": {
"detailed-map-of-ute-valley.md": {
	id: "detailed-map-of-ute-valley.md";
  slug: "detailed-map-of-ute-valley";
  body: string;
  collection: "links";
  data: InferEntrySchema<"links">
} & { render(): Render[".md"] };
"donate.md": {
	id: "donate.md";
  slug: "donate";
  body: string;
  collection: "links";
  data: InferEntrySchema<"links">
} & { render(): Render[".md"] };
"our-website.md": {
	id: "our-website.md";
  slug: "our-website";
  body: string;
  collection: "links";
  data: InferEntrySchema<"links">
} & { render(): Render[".md"] };
"volunteer-opportunities.md": {
	id: "volunteer-opportunities.md";
  slug: "volunteer-opportunities";
  body: string;
  collection: "links";
  data: InferEntrySchema<"links">
} & { render(): Render[".md"] };
};
"news": {
"2020-accomplishments.md": {
	id: "2020-accomplishments.md";
  slug: "2020-accomplishments";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2022-volunteer-update.md": {
	id: "2022-volunteer-update.md";
  slug: "2022-volunteer-update";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"4th-annual-3-days-3-parks-volunteer-event.md": {
	id: "4th-annual-3-days-3-parks-volunteer-event.md";
  slug: "4th-annual-3-days-3-parks-volunteer-event";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"a-city-of-good-friendly-and-helpful-people.md": {
	id: "a-city-of-good-friendly-and-helpful-people.md";
  slug: "a-city-of-good-friendly-and-helpful-people";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"big-changes-afoot-at-the-ute-valley-park-vindicator-trailhead.md": {
	id: "big-changes-afoot-at-the-ute-valley-park-vindicator-trailhead.md";
  slug: "big-changes-afoot-at-the-ute-valley-park-vindicator-trailhead";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"changes-afoot-at-ute-valley-park.md": {
	id: "changes-afoot-at-ute-valley-park.md";
  slug: "changes-afoot-at-ute-valley-park";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"city-of-colorado-springs-e-bike-pilot-postponed.md": {
	id: "city-of-colorado-springs-e-bike-pilot-postponed.md";
  slug: "city-of-colorado-springs-e-bike-pilot-postponed";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"construction-on-ute-valley-park-regional-trail.md": {
	id: "construction-on-ute-valley-park-regional-trail.md";
  slug: "construction-on-ute-valley-park-regional-trail";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"earth-day-weekend-3-parks-3-days-event-friends-of-ute-valley-committee-applications-now-open.md": {
	id: "earth-day-weekend-3-parks-3-days-event-friends-of-ute-valley-committee-applications-now-open.md";
  slug: "earth-day-weekend-3-parks-3-days-event-friends-of-ute-valley-committee-applications-now-open";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"embracing-change.md": {
	id: "embracing-change.md";
  slug: "embracing-change";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"friends-of-ute-valley-park-year-end-review.md": {
	id: "friends-of-ute-valley-park-year-end-review.md";
  slug: "friends-of-ute-valley-park-year-end-review";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"much-to-be-thankful-for-in-2020-in-ute-valley-park.md": {
	id: "much-to-be-thankful-for-in-2020-in-ute-valley-park.md";
  slug: "much-to-be-thankful-for-in-2020-in-ute-valley-park";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"new-wayfinding-package-installed-at-ute-valley-park.md": {
	id: "new-wayfinding-package-installed-at-ute-valley-park.md";
  slug: "new-wayfinding-package-installed-at-ute-valley-park";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"new-website.md": {
	id: "new-website.md";
  slug: "new-website";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"proposed-development-quiet-time-at-ute.md": {
	id: "proposed-development-quiet-time-at-ute.md";
  slug: "proposed-development-quiet-time-at-ute";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"scheduled-trail-maintenance-for-2021.md": {
	id: "scheduled-trail-maintenance-for-2021.md";
  slug: "scheduled-trail-maintenance-for-2021";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"spring-into-action-ute-valley-park-updates-and-events.md": {
	id: "spring-into-action-ute-valley-park-updates-and-events.md";
  slug: "spring-into-action-ute-valley-park-updates-and-events";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"upcoming-volunteer-events-in-ute-valley-park-and-vote-yes-on-tops-renewal.md": {
	id: "upcoming-volunteer-events-in-ute-valley-park-and-vote-yes-on-tops-renewal.md";
  slug: "upcoming-volunteer-events-in-ute-valley-park-and-vote-yes-on-tops-renewal";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"ute-valley-park-volunteers-featured-in-woodmen-edition.md": {
	id: "ute-valley-park-volunteers-featured-in-woodmen-edition.md";
  slug: "ute-valley-park-volunteers-featured-in-woodmen-edition";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"why-building-illegal-trails-and-using-undesignated-trails-is-so-damaging-to-our-open-spaces.md": {
	id: "why-building-illegal-trails-and-using-undesignated-trails-is-so-damaging-to-our-open-spaces.md";
  slug: "why-building-illegal-trails-and-using-undesignated-trails-is-so-damaging-to-our-open-spaces";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"why-does-ute-valley-park-have-the-trails-it-does.md": {
	id: "why-does-ute-valley-park-have-the-trails-it-does.md";
  slug: "why-does-ute-valley-park-have-the-trails-it-does";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
};
"trailheads": {
"pinon-valley-park-trailhead.md": {
	id: "pinon-valley-park-trailhead.md";
  slug: "pinon-valley-park-trailhead";
  body: string;
  collection: "trailheads";
  data: InferEntrySchema<"trailheads">
} & { render(): Render[".md"] };
"popes-valley-trailhead.md": {
	id: "popes-valley-trailhead.md";
  slug: "popes-valley-trailhead";
  body: string;
  collection: "trailheads";
  data: InferEntrySchema<"trailheads">
} & { render(): Render[".md"] };
"south-rockrimmon-trailhead.md": {
	id: "south-rockrimmon-trailhead.md";
  slug: "south-rockrimmon-trailhead";
  body: string;
  collection: "trailheads";
  data: InferEntrySchema<"trailheads">
} & { render(): Render[".md"] };
"tech-center-trailhead.md": {
	id: "tech-center-trailhead.md";
  slug: "tech-center-trailhead";
  body: string;
  collection: "trailheads";
  data: InferEntrySchema<"trailheads">
} & { render(): Render[".md"] };
"vindicator-trailhead.md": {
	id: "vindicator-trailhead.md";
  slug: "vindicator-trailhead";
  body: string;
  collection: "trailheads";
  data: InferEntrySchema<"trailheads">
} & { render(): Render[".md"] };
};
"volunteer-spotlight": {
"dan-woods.md": {
	id: "dan-woods.md";
  slug: "dan-woods";
  body: string;
  collection: "volunteer-spotlight";
  data: InferEntrySchema<"volunteer-spotlight">
} & { render(): Render[".md"] };
"jake-nixon.md": {
	id: "jake-nixon.md";
  slug: "jake-nixon";
  body: string;
  collection: "volunteer-spotlight";
  data: InferEntrySchema<"volunteer-spotlight">
} & { render(): Render[".md"] };
"vance-hewuse.md": {
	id: "vance-hewuse.md";
  slug: "vance-hewuse";
  body: string;
  collection: "volunteer-spotlight";
  data: InferEntrySchema<"volunteer-spotlight">
} & { render(): Render[".md"] };
};
"wishlist": {
"2-5-lb-pick-mattock.md": {
	id: "2-5-lb-pick-mattock.md";
  slug: "2-5-lb-pick-mattock";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"30-bow-saw-replacement-blade.md": {
	id: "30-bow-saw-replacement-blade.md";
  slug: "30-bow-saw-replacement-blade";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"folding-saw.md": {
	id: "folding-saw.md";
  slug: "folding-saw";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"heavy-duty-garden-trowel.md": {
	id: "heavy-duty-garden-trowel.md";
  slug: "heavy-duty-garden-trowel";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"impact-safety-glasses.md": {
	id: "impact-safety-glasses.md";
  slug: "impact-safety-glasses";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"large-loppers.md": {
	id: "large-loppers.md";
  slug: "large-loppers";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"rock-bar.md": {
	id: "rock-bar.md";
  slug: "rock-bar";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"rock-net.md": {
	id: "rock-net.md";
  slug: "rock-net";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
"single-jack-hammer.md": {
	id: "single-jack-hammer.md";
  slug: "single-jack-hammer";
  body: string;
  collection: "wishlist";
  data: InferEntrySchema<"wishlist">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
