# Friends of Ute Valley Park - Project Memory

## Project Overview
Astro-based static site with Vue components for the Friends of Ute Valley Park nonprofit organization. Uses Tailwind CSS v4 for styling.

## Tech Stack
- **Framework**: Astro with Vue components (`.astro` and `.vue` files)
- **Styling**: Tailwind CSS v4 (via `@import 'tailwindcss'` in global.css)
- **Icons**: Unplugin Icons with `~icons/` prefix
- **Forms**: Vue components with VueUse for fetch operations
- **Colors**: Green/teal brand palette (green-700, teal-600, etc.)

## Design Identity: Modern Field Journal (Established Feb 2026)

### Core Aesthetic Mandate
A rugged, editorial, and utilitarian "Ranger's Report" style. This direction moves away from generic SaaS-style UI in favor of a structural, archival look that reflects the authoritative stewardship of the park.

### Visual Pillars
- **Structural Grids**: Use visible borders (`border-stone-300`) and rigid grid systems to create a "technical report" layout. Avoid soft shadows or rounded corners (use `rounded-none` or `rounded-sm`).
- **The "Stone" Foundation**: The primary background is `stone-50` (paper-like), not white. Containers often use `stone-100/50` for subtle depth.
- **Metadata Flourishes**: Add technical labels (e.g., "REF: 042", "STATION_COORDS", "DISPATCH_DATE") in small monospace fonts to reinforce the field-notes narrative.

### Typography Hierarchy
- **Headings (Editorial Serif)**: Use heavy, high-contrast serif fonts (fallback: `Georgia` or `Times New Roman`) with `font-black`, `uppercase`, and `tracking-tighter`.
- **Technical/Labels (Technical Monospace)**: Use monospace for all navigation, tags, and data. Use `text-[10px]`, `font-black`, `uppercase`, and high letter-spacing (`tracking-[0.2em]`).
- **Body (Inter Sans)**: Clean, functional sans-serif for readability.

### Color Palette (v4 Utilities)
- **Base**: `bg-stone-50`
- **Ink**: `text-stone-900` (Headings), `text-stone-600` (Body)
- **Primary Accent**: `text-green-800` (Used for "Wildland" elements and emphasis)
- **Technical Border**: `border-stone-300`

## Key Patterns & Conventions

### Styling Approach
- **Prioritize Tailwind utilities** over custom CSS - only use custom CSS for features Tailwind doesn't support:
  - `clip-path` for angled/shaped sections
  - Complex `@keyframes` animations
  - Percentage-based positioning (`top: 15%`)
- Use Tailwind's gradient utilities: `bg-gradient-to-br from-green-800 via-teal-800 to-teal-600`
- Use opacity modifiers: `text-green-100/90`, `via-amber-400/70`

### Component Architecture
- **Vue for interactivity**: Use `.vue` components for forms, interactive elements requiring state
- **Astro for layout**: Use `.astro` components for wrappers, static sections, page layouts
- Use named slots for customizable content: `<slot name="heading">`, `<slot name="description">`

### Component Locations
- `src/components/` - Reusable components
- `src/pages/` - Page routes
- `src/layouts/` - Layout templates
- `src/assets/images/` - Image assets

## Lessons Learned

### 2026-02-03: Email Form Wrapper Styling
**Context**: Adding angled background styling to email signup section

**Friction Points Encountered**:
1. Initially embedded wrapper styling inside `EmailForm.vue` when a separate `EmailFormWrapper.astro` component was needed to span both heading text AND form
2. Used extensive custom CSS when Tailwind utilities would suffice

**Actionable Lessons**:
1. **Clarify scope before implementing**: When styling a "section", ask whether it wraps just one component or multiple elements together
2. **Check component usage context first**: Look at how/where components are used in pages before adding wrapper styles
3. **Tailwind-first CSS**: Convert custom CSS to Tailwind utilities during initial implementation, not as a follow-up refactor
4. **Create wrapper components for cross-cutting styles**: Styled sections that span multiple content areas should be their own wrapper component

---

## Quick Reference


### Accent Colors
- Primary: `green-700`, `green-800`
- Secondary: `teal-600`, `teal-800`
- Accent (CTAs/highlights): `amber-400`, `amber-500`
