# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5 static site with Vue 3 components for Friends of Ute Valley Park nonprofit. Deployed on Cloudflare Pages.

## Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OXLint with type awareness |
| `npm run lint:fix` | Auto-fix linting issues |

## Tech Stack

- **Framework**: Astro 5 with Vue 3 components
- **Styling**: Tailwind CSS v4 (via `@import 'tailwindcss'` in global.css)
- **Icons**: Unplugin Icons with `~icons/` prefix
- **Forms**: Vue + VueUse fetch, Cloudflare Turnstile CAPTCHA
- **Email**: Resend API integration

## Architecture

### Component Strategy
- **Vue (.vue)**: Interactive elements with state (forms, navigation, modals)
- **Astro (.astro)**: Static layouts, page templates, content wrappers

### Content Collections
Content lives in `src/data/` with schemas defined in `src/content.config.ts`:
- `events/` - Volunteer events with meeting locations
- `news/` - Blog posts with cover images
- `trailheads/` - Park locations with maps and photos
- `leavenotrace/` - Educational content
- `wishlist/` - Donation items
- `volunteer-spotlight/` - Team member profiles
- `links/` - External links with priority sorting

Dynamic pages use `[...slug].astro` pattern (e.g., `pages/events/[...slug].astro`).

### Path Aliases (tsconfig.json)
- `@components/*` → `./src/components/*`
- `@layouts/*` → `./src/layouts/*`
- `@/*` → `./src/*`
- `@/typings` → `./typings/index.ts`

## Design Identity: Modern Field Journal

A rugged, editorial, and utilitarian "Ranger's Report" style. Structural and archival, reflecting authoritative stewardship of the park.

### Visual Pillars
- **Structural Grids**: Use visible borders (`border-stone-300`) and rigid grid systems for a "technical report" layout. Avoid soft shadows or rounded corners (`rounded-none` or `rounded-sm`). Exception: small rounding on form inputs for usability.
- **The "Stone" Foundation**: Primary background is `stone-50` (paper-like), not white. Containers use `stone-100/50` for subtle depth.
- **High-Contrast Sections**: Use `bg-stone-900` sections with subtle overlays for emphasis. Keep overlays linear and minimal.

### Typography Hierarchy
- **Headings (Editorial Serif)**: Heavy, high-contrast serif fonts (fallback: `Georgia`/`Times New Roman`) with `font-black`, `uppercase`, `tracking-tighter`.
- **Technical/Labels (Monospace)**: Monospace for navigation, tags, and data. Use `text-[10px]`, `font-black`, `uppercase`, `tracking-[0.2em]`.
- **Body (Inter Sans)**: Clean, functional sans-serif for readability.

## Styling Conventions

**Tailwind-first**: Only use custom CSS for features Tailwind doesn't support:
- `clip-path` for angled/shaped sections
- Complex `@keyframes` animations
- Percentage-based positioning

**Brand Colors** (defined in `src/styles/global.css` via Tailwind CSS vars):
- Primary (green): `primary-50/100/200`, `primary-light`, `primary`, `primary-dark`
- Secondary (teal): `secondary-light`, `secondary`, `secondary-dark`
- Accent (amber): `accent`, `accent-dark`

Always use semantic tokens (e.g., `text-primary`, `bg-secondary-dark`) instead of raw Tailwind colors for brand colors.

**Common patterns**:
- Gradients: `bg-gradient-to-br from-primary-dark via-secondary-dark to-secondary`
- Opacity modifiers: `text-primary-100/90`, `via-accent/70`
- **Primary CTA**: Use the shared `.btn-primary-cta` class for primary buttons (accent shadow, hover translation, uppercase mono styling).

## Key Patterns

### Meeting Locations
Events use `src/utils/EventData.ts` to resolve meeting locations. Schema supports predefined trailhead IDs or custom alternative locations.

### Wrapper Components
Styled sections that span multiple content areas should be their own wrapper component (e.g., `EnagementPanel.astro` wraps heading + form together).

### Slots
Astro components use named slots for customizable content: `<slot name="heading">`, `<slot name="description">`
