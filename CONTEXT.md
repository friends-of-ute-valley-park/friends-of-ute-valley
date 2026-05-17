# Friends of Ute Valley Park Website

This context defines the shared language for the Friends of Ute Valley Park website.

## Language

**Semantic Design API**:
A design system surface named for project meaning rather than implementation mechanics.
_Avoid_: Tailwind-compatible utility replacement, utility clone

**Primitive Token**:
A private design ingredient, named with a `--_` prefix, that captures a raw value scale for maintaining semantic tokens.
_Avoid_: Public utility token

**Semantic Token**:
A public design value, named without a private prefix, for its role in the website experience.
_Avoid_: Utility class, raw scale value

**Brand Color**:
The website's core identity color used for stewardship, navigation, and active states.
_Avoid_: Primary color

**Accent Color**:
A supporting highlight color used for emphasis, calls to action, and graphic contrast.
_Avoid_: Secondary color, tertiary color

**Surface Color**:
A background color role for pages, panels, cards, and inverse sections.
_Avoid_: Background utility

**Text Color**:
A foreground color role for readable content and supporting copy.
_Avoid_: Font color

**Border Color**:
A line color role used to separate content, define edges, and structure dense layouts.
_Avoid_: Border utility

**Text Style**:
A named typographic role that carries the website's editorial voice.
_Avoid_: Raw type scale, font utility

**Layout Primitive**:
A named layout pattern that establishes recurring page structure.
_Avoid_: Spacing utility, container utility

**Component Recipe**:
A reusable global class for a shared interface pattern.
_Avoid_: Page-specific class, data-variant styling

**Layout Class**:
A global layout primitive class prefixed with `l-`.
_Avoid_: Wrapper, container utility

**Text Class**:
A global text style class prefixed with `t-`.
_Avoid_: Title, font utility

**Recipe Modifier**:
A class-based variant for a component recipe.
_Avoid_: Data variant, primary class

**Pilot Slice**:
The first representative area migrated to prove the semantic design system before broader conversion.
_Avoid_: Big-bang rewrite

**Inverse Section**:
A high-emphasis content band that uses dark surfaces within the otherwise light website.
_Avoid_: Dark mode, theme switcher

**Content Band**:
A full-width section surface that establishes the background and contrast for a page region.
_Avoid_: Section utility, theme scope

**Component**:
A reusable Astro or Vue unit that owns structure, data, or behavior.
_Avoid_: Styling recipe

**Prose Recipe**:
A first-party component recipe for long-form rich text content.
_Avoid_: Tailwind Typography dependency

**Form Recipe**:
A first-party component recipe for common form control styling and states.
_Avoid_: Form structure, form behavior

## Relationships

- A **Primitive Token** may support one or more **Semantic Tokens**
- A **Semantic Token** belongs to the **Semantic Design API**
- A **Brand Color**, **Accent Color**, **Surface Color**, **Text Color**, and **Border Color** are **Semantic Tokens**
- A **Text Style** may combine multiple **Semantic Tokens**
- A **Layout Primitive** may combine multiple **Semantic Tokens**
- A **Component Recipe** may combine **Semantic Tokens**, **Text Styles**, and **Layout Primitives**
- A **Layout Class** represents a **Layout Primitive**
- A **Text Class** represents a **Text Style**
- A **Recipe Modifier** changes the presentation of a **Component Recipe**
- A **Pilot Slice** validates the **Semantic Design API**
- An **Inverse Section** is a local visual treatment, not a site mode
- An **Inverse Section** is a type of **Content Band**
- A **Component Recipe** styles reusable primitives
- A **Component** owns reusable structure, data, or behavior
- A **Prose Recipe** is a **Component Recipe**
- A **Form Recipe** is a **Component Recipe**

## Flagged ambiguities

- "dark" was used ambiguously to mean both a user-selectable site mode and a dark content section — resolved: the site has no dark mode, but may use **Inverse Sections**.
