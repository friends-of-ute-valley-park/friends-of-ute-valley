---
name: Friends of Ute Valley Park
description: Civic editorial design for practical park guidance and local stewardship action.
colors:
  limestone-paper: 'oklch(0.985 0.001 106.423)'
  paper-white: 'oklch(1 0 0)'
  limestone-muted: 'oklch(0.97 0.001 106.424)'
  boundary-light: 'oklch(0.923 0.003 48.717)'
  boundary: 'oklch(0.869 0.005 56.366)'
  text-subtle: 'oklch(0.553 0.013 58.071)'
  text-muted: 'oklch(0.444 0.011 73.639)'
  field-charcoal: 'oklch(0.216 0.006 56.043)'
  trail-ink: 'oklch(0.147 0.004 49.25)'
  ponderosa: 'oklch(0.527 0.154 150.069)'
  ponderosa-hover: 'oklch(0.627 0.194 149.214)'
  ponderosa-deep: 'oklch(0.448 0.119 151.328)'
  ponderosa-subtle: 'oklch(0.982 0.018 155.826)'
  sunlit-amber: 'oklch(0.828 0.189 84.429)'
  trail-gold: 'oklch(0.666 0.179 58.318)'
  ochre: 'oklch(0.555 0.163 48.998)'
  danger: 'oklch(0.505 0.213 27.518)'
typography:
  display:
    fontFamily: 'Playfair Display Variable, Georgia, Cambria, Times New Roman, serif'
    fontSize: 'clamp(5rem, 14vw, 7rem)'
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: '0'
  headline:
    fontFamily: 'Playfair Display Variable, Georgia, Cambria, Times New Roman, serif'
    fontSize: 'clamp(3.75rem, 9vw, 6rem)'
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: '0'
  title:
    fontFamily: 'Playfair Display Variable, Georgia, Cambria, Times New Roman, serif'
    fontSize: 'clamp(2.5rem, 5vw, 3.75rem)'
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: '0'
  body:
    fontFamily: 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.625
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
    fontSize: '0.625rem'
    fontWeight: 900
    lineHeight: 1
    letterSpacing: '0.2em'
  action:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
    fontSize: '0.875rem'
    fontWeight: 900
    lineHeight: 1
    letterSpacing: '0.08em'
rounded:
  square: '0px'
  control: '0.375rem'
  pill: '9999px'
spacing:
  page-x: 'clamp(1rem, 2.5vw, 2rem)'
  cluster: '1rem'
  panel: 'clamp(1.5rem, 4vw, 3rem)'
  section-compact: 'clamp(3rem, 6vw, 4.5rem)'
  section: 'clamp(4rem, 8vw, 6rem)'
components:
  button-primary:
    backgroundColor: '{colors.ponderosa-deep}'
    textColor: '{colors.paper-white}'
    typography: '{typography.action}'
    rounded: '{rounded.square}'
    padding: '1rem 2rem'
  button-primary-hover:
    backgroundColor: '{colors.ponderosa}'
    textColor: '{colors.paper-white}'
    typography: '{typography.action}'
    rounded: '{rounded.square}'
    padding: '1rem 2rem'
  button-accent:
    backgroundColor: '{colors.trail-gold}'
    textColor: '{colors.paper-white}'
    typography: '{typography.action}'
    rounded: '{rounded.square}'
    padding: '1rem 2rem'
  card:
    backgroundColor: '{colors.paper-white}'
    textColor: '{colors.trail-ink}'
    rounded: '{rounded.square}'
    padding: '{spacing.panel}'
  status-record-header:
    backgroundColor: '{colors.ponderosa-deep}'
    textColor: '{colors.paper-white}'
    rounded: '{rounded.square}'
    padding: '1rem 1.5rem'
  status-record-cell:
    backgroundColor: '{colors.paper-white}'
    textColor: '{colors.field-charcoal}'
    rounded: '{rounded.square}'
    padding: '1.25rem 1.5rem'
  field-tag:
    textColor: '{colors.ponderosa-deep}'
  input-quiet:
    backgroundColor: '{colors.limestone-paper}'
    textColor: '{colors.trail-ink}'
    rounded: '{rounded.square}'
    padding: '0.75rem 1rem'
    height: '2.5rem'
---

# Design System: Friends of Ute Valley Park

## Overview

**Creative North Star: "The Civic Field Journal"**

The system combines the authority of a well-kept public record with the immediacy of notes made in the field. It is editorial, grounded, and exact: bold serif headlines establish place and purpose, monospaced labels organize practical facts, and authentic park photography supplies the emotional register.

The interface is spacious but not precious. Strong grid lines, square containers, explicit labels, and direct state changes keep it useful for visitors checking details and volunteers deciding what to do next. Green carries stewardship and action; amber behaves like sunlight, a trail marker, or a physical highlight rather than general decoration.

**Key Characteristics:**

- High-contrast editorial serif headlines paired with plain sans-serif body copy.
- Monospaced uppercase labels for dates, status, metadata, and actions.
- Warm limestone surfaces divided by visible rules and square frames.
- Ponderosa green for identity and primary action; Sunlit Amber for rare emphasis.
- Authentic park and volunteer photography presented at generous scale.
- Tactile, civic controls with clear hover, focus, active, and validation states.

## Colors

The palette reads as Ponderosa Green, Sunlit Amber, Limestone Paper, and charcoal ink: nature-rooted, civic, and restrained rather than rustic.

### Primary

- **Ponderosa Green** (`oklch(0.527 0.154 150.069)`): identity, links, active navigation, and primary emphasis.
- **Deep Ponderosa** (`oklch(0.448 0.119 151.328)`): primary buttons, volunteer alerts, and high-trust calls to action.
- **Ponderosa Mist** (`oklch(0.982 0.018 155.826)`): quiet selected states and lightly tinted supporting surfaces.

### Secondary

- **Sunlit Amber** (`oklch(0.828 0.189 84.429)`): focus rings, offset shadows, rules, pulses, and editorial accents.
- **Trail Gold** (`oklch(0.666 0.179 58.318)`): solid accent actions and stronger metadata emphasis.
- **Ochre** (`oklch(0.555 0.163 48.998)`): deeper accent hover and high-contrast detail.

### Neutral

- **Limestone Paper** (`oklch(0.985 0.001 106.423)`): default page ground.
- **Paper White** (`oklch(1 0 0)`): cards, fields, and raised content.
- **Limestone Muted** (`oklch(0.97 0.001 106.424)`): alternating bands and quiet controls.
- **Boundary** (`oklch(0.869 0.005 56.366)`): structural borders and dividers.
- **Field Charcoal** (`oklch(0.216 0.006 56.043)`): inverse bands and strong headings.
- **Trail Ink** (`oklch(0.147 0.004 49.25)`): primary body text.

### Named Rules

**The Trail-Marker Rule.** Amber marks attention, focus, or physical offset; it is not a background wash for whole sections.

**The Limestone Rule.** Default surfaces stay within the warm stone family. Pure white is reserved for content that needs separation from the page ground.

**The Inverse Sunlight Rule.** On Field Charcoal bands, the accent role moves from Ponderosa to Sunlit Amber: accented heading words, group labels, and rules all turn amber. Green on charcoal is not used for emphasis.

**The Contrast-by-Surface Rule.** Text on Deep Ponderosa is always Paper White or Ponderosa Mist. Headings inside a green header set their color explicitly instead of inheriting ink from shared heading styles.

## Typography

**Display Font:** Playfair Display Variable (with Georgia, Cambria, and Times New Roman fallbacks)  
**Body Font:** System sans-serif stack  
**Label Font:** System monospace stack

**Character:** The serif is emphatic, place-specific, and editorial; the sans serif is practical and quiet; the monospace layer gives dates, status, rules, and actions the precision of field notes and civic records.

### Hierarchy

- **Display** (900, `clamp(5rem, 14vw, 7rem)`, 0.85): exceptional hero statements; uppercase and tightly stacked.
- **Headline** (900, `clamp(3.75rem, 9vw, 6rem)`, 0.85): major page identity and large editorial moments.
- **Title** (900, `clamp(2.5rem, 5vw, 3.75rem)`, 1.1): section and feature headings, generally uppercase.
- **Body** (500, `1rem`, 1.625): explanatory copy, lists, and visitor guidance; readable columns top out near 70 characters.
- **Label** (900, `0.625rem`, `0.2em`, uppercase): dates, categories, status, and compact metadata.
- **Action** (900, `0.875rem`, `0.08em`, uppercase): buttons and concise calls to action.

### Named Rules

**The Three-Voice Rule.** Use serif for hierarchy, sans serif for explanation, and monospace for operational facts. Do not swap their jobs for novelty.

## Layout

The system uses a fluid centered container capped at `96rem`, with page gutters of `clamp(1rem, 2.5vw, 2rem)`. Readable prose is capped near `70ch`. Major sections use `clamp(4rem, 8vw, 6rem)` vertical space; compact sections use `clamp(3rem, 6vw, 4.5rem)`.

Layouts begin as single-column grids and become two-column structures around `48rem` or `64rem`. Repeated feature grids add columns at `40rem`, `48rem`, `64rem`, or `80rem` according to content density. Large editorial sections commonly use asymmetric 7/5 or 5/7 splits. One-pixel grid gaps and borders turn collections into a single civic record rather than disconnected floating cards.

Photography may occupy half a layout or anchor an entire hero. Text overlays retain a limestone reading field or deliberate fade rather than sitting directly on noisy image detail. On small screens, hierarchy remains bold while layouts collapse cleanly and touch targets remain at least 2.75rem.

Full-bleed hero photography fades horizontally into Limestone Paper from `64rem` up. Below that, the photograph becomes its own band at the top of the hero (`clamp(15rem, 46svh, 28rem)` tall) that fades downward into the page, and the display title overlaps the faded edge. Body copy never sits on the photograph at phone widths.

Section headings with a short intro may use a 5/7 split from `64rem`: the title holds the left, and the intro aligns to its baseline on the right. When two columns sit side by side and one holds a tall third-party embed, the shorter column's content becomes sticky (`top: 7rem`, clearing the 5rem navigation), and the parent uses `overflow: clip`, not `hidden`, so stickiness still works.

## Elevation & Depth

Depth is structural with selective lift. Most surfaces are flat and separated by color, borders, mattes, and grid lines. Primary actions use hard amber offset shadows to feel tactile; a small number of panels and menus use restrained ambient shadows when they truly sit above surrounding content.

### Shadow Vocabulary

- **Raised Panel** (`0 1px 2px rgb(0 0 0 / 5%), 0 18px 48px color-mix(in oklab, var(--_color-stone-900) 8%, transparent)`): forms and exceptional floating panels.
- **Amber Offset Small** (`4px 4px 0 0 var(--color-accent)`): default primary action lift.
- **Amber Offset Medium** (`8px 8px 0 0 var(--color-accent)`): stronger tactile emphasis.
- **Amber Offset Large** (`12px 12px 0 0 var(--color-accent)`): primary action hover.
- **Amber Offset XL** (`16px 16px 0 0 var(--color-accent)`): rare feature emphasis.

### Named Rules

**The Structural-First Rule.** Use borders, tonal contrast, and layout before reaching for a shadow. Lift only actions or content that changes plane.

## Shapes

The default form language is square and architectural. Cards, panels, buttons, navigation cells, media frames, and quiet fields use zero radius and visible borders. A `0.375rem` radius is reserved for the compact newsletter form, while the full pill radius is limited to status dots, tags, and genuinely circular indicators.

Image mattes create framed depth inside square media. Thin horizontal rules, grid borders, and occasional rotated square markers reinforce a surveyed, record-like geometry. Avoid soft card stacks and indiscriminate rounding.

The rotated square marker is a `0.4375rem` to `0.5rem` square turned 45°, in Sunlit Amber on green or Trail Gold on limestone. It works like a survey pin: it leads a status heading or a category tag, and never appears as a bullet in running prose.

## Components

Components follow **tactile civic utility**: square, bordered, legible, and explicit, with motion that confirms state rather than decorating the page.

### Buttons

- **Shape:** square by default (`0px`); newsletter controls alone may use `0.375rem`.
- **Primary:** Deep Ponderosa background, white text, `1rem 2rem` padding, monospaced uppercase action type (rendered at 700 on the green fill), and a `4px` Sunlit Amber offset.
- **Secondary (hero):** Limestone Paper fill with a 2px Deep Ponderosa border and green text, tinting to Ponderosa Mist on hover. It sits beside the primary action without an offset and without backdrop blur.
- **Hover / Focus:** primary buttons brighten to Ponderosa Green, grow to a `12px` offset, and translate up-left; all controls retain the 2px amber focus outline. Active states compress to `scale(0.96)`.
- **Accent:** Trail Gold background with white text, deepening to Ochre on hover.
- **Quiet / Outline:** transparent with visible boundary; outline buttons invert to charcoal on hover.

### Cards / Containers

- **Corner Style:** square.
- **Background:** Paper White over Limestone Paper or a muted limestone band.
- **Shadow Strategy:** flat by default; raised panels use the ambient raised token.
- **Border:** 1px Boundary or Boundary Light.
- **Internal Padding:** generally `clamp(1.5rem, 4vw, 3rem)` for panels; denser records use `1rem` to `1.5rem`.

### Inputs / Fields

- **Style:** full-width, square, 1px boundary, light page-tinted background, and compact monospaced text for civic forms.
- **Focus:** Ponderosa border for quiet fields; Sunlit Amber border plus a translucent 3px ring for newsletter fields.
- **Error / Disabled:** danger border and text for invalid state; disabled controls reduce opacity to 0.6 and use a not-allowed cursor.

### Navigation

Desktop navigation is a sticky 5rem bar divided into bordered cells. Links use compact sans-serif text, a limestone hover surface, Ponderosa text, and a 2px Ponderosa active underline. The mobile system becomes a full-width bordered panel with 2.75rem minimum targets, a scrim, and straightforward section labels.

### Editorial Heading

Section headings use uppercase Playfair Display at 900 weight, often with one italic Ponderosa word. A short rule and monospaced eyebrow may precede the title. In inverse sections, the accented word and rule switch to Sunlit Amber.

### Volunteer Alert

The volunteer alert is a narrow Deep Ponderosa band with a pulsing Sunlit Amber status dot, monospaced event details, and a bordered action with a small amber offset. It is operational, current, and visually distinct from promotional banners.

### Park Status Record

The home hero's status panel is the system's clearest civic record: a square Paper White panel with a 1px Boundary border and the Raised Panel shadow. It is one of the few surfaces that truly floats over photography.

- **Header:** a Deep Ponderosa strip with the heading in uppercase Playfair at 900 (`1.125rem`) in Paper White, led by an amber rotated square marker. A monospaced "Updated" stamp in Ponderosa Mist dates the data it shows.
- **Body:** a two-column grid with `1px` Boundary Light gaps. The lead fact (trail conditions) spans both columns, and the smaller facts (hours, dog policy) share a row.
- **Cells:** a monospaced uppercase term with a `1rem` Ponderosa icon, then a monospaced value. The lead value is larger (`1.5rem`) and Deep Ponderosa when conditions are good, switching to Ochre when they are not. Supporting notes use small sans-serif body text, never tiny monospace.
- **Links:** monospaced, underlined in amber, with a trailing chevron that nudges right on hover and a 2.75rem touch target.

### Field Tag

A monospaced uppercase label (`0.6875rem`, 800, `0.14em`) in Deep Ponderosa, led by a rotated square marker in Trail Gold. It opens a guidance card and names its category (Visitor Prep, Trail Care). It replaces filled tag chips and decorative numbering on cards whose order carries no meaning.

## Do's and Don'ts

### Do:

- **Do** use authentic Ute Valley Park and volunteer photography as the primary emotional material.
- **Do** preserve the serif, sans-serif, and monospace role split.
- **Do** use visible borders and one-pixel grid gaps to organize related public information.
- **Do** reserve Ponderosa Green for identity, navigation, and meaningful action.
- **Do** keep amber rare and functional: focus, status, rules, and tactile offset.
- **Do** make responsive changes structural, collapsing grids before reducing legibility or touch size.
- **Do** stamp time-sensitive facts (conditions, hours, updates) with a monospaced date so visitors can judge freshness.
- **Do** write alt text that describes what the photograph shows, and captions that match it.

### Don't:

- **Don't** round every card, panel, field, or button.
- **Don't** replace structural borders with generic floating card shadows.
- **Don't** use amber as a large decorative background or scatter it without meaning.
- **Don't** introduce glossy corporate gradients, vague stock imagery, faux-rustic textures, or whimsical nature motifs.
- **Don't** turn operational facts into oversized marketing claims.
- **Don't** add a fourth typographic voice when the established three already cover hierarchy, explanation, and metadata.
- **Don't** number items (01, 02, 03) unless the sequence is real, as with the Leave No Trace principles.
- **Don't** give hover color, zoom, or lift to elements that are not links or controls.
