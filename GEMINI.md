# Friends of Ute Valley Park - Project Memory

## Project Overview
Astro-based static site with Vue components for the Friends of Ute Valley Park nonprofit organization. Uses Tailwind CSS v4 for styling.

## Tech Stack
- **Framework**: Astro with Vue components (`.astro` and `.vue` files)
- **Styling**: Tailwind CSS v4 (via `@import 'tailwindcss'` in global.css)
- **Icons**: Unplugin Icons with `~icons/` prefix
- **Forms**: Vue components with VueUse for fetch operations
- **Colors**: Green/teal brand palette (green-700, teal-600, etc.)

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
