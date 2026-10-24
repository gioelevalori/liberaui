---
name: LiberaUI
description: Essential, precise Angular components with interactive examples and coordinated light and dark themes.
colors:
  background-color: "#ffffff"
  surface-color: "#f7f7f8"
  text-primary: "#18181b"
  text-secondary: "#66666f"
  border-color: "#e5e5e8"
  background-color-dark: "#111113"
  surface-color-dark: "#1a1a1e"
  text-primary-dark: "#f4f4f5"
  text-secondary-dark: "#a1a1aa"
  border-color-dark: "#2c2c32"
  docs-accent: "#176b3a"
  docs-accent-soft: "#edf7f0"
  docs-accent-dark: "#92d4ac"
  docs-accent-soft-dark: "#172c21"
  destructive: "#b42335"
  ocean: "#2454ce"
  plum: "#823c9e"
  clay: "#a33e27"
typography:
  display:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "clamp(40px, 4.5vw, 60px)"
    fontWeight: 550
    lineHeight: 1.1
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.04em"
  title:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "22px"
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "Inter Variable, Inter, sans-serif"
    lineHeight: 1.6
  label:
    fontFamily: "Inter Variable, Inter, sans-serif"
    fontSize: "13px"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
rounded:
  navigation: "5px"
  field: "6px"
  library-field: "7px"
  button: "8px"
  preview: "10px"
  card: "12px"
spacing:
  compact-gap: "10px"
  example-gap: "18px"
  content-gap: "24px"
  section-gap: "48px"
components:
  primary-link:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.background-color}"
    rounded: "{rounded.field}"
    padding: "10px 15px"
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.background-color}"
    rounded: "{rounded.button}"
    padding: "9px 16px"
    height: "40px"
  demo-field:
    backgroundColor: "{colors.background-color}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.field}"
    padding: "8px 11px"
  library-card:
    backgroundColor: "{colors.background-color}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: LiberaUI

## Overview

**Creative North Star: "Essenziale e preciso, ispirato a shadcn/ui e Radix"**

The owner's chosen direction uses self-hosted Inter Variable, neutral surfaces, fine borders, compact controls, and restrained emphasis. Light and dark themes share the same hierarchy. Working Angular examples carry the visual interest through their content and states.

LiberaUI retains its name, Gioele Valori attribution, and MIT notices. The original L mark is shared by the SVG identity and multi-size ICO favicon. Inspiration informs restraint and component clarity; it does not replace the project's identity.

**Key Characteristics:**
- Neutral typography and actions with small green semantic signals.
- Flat, bordered surfaces with coordinated light and dark roles.
- Interactive examples with locally selectable accents.
- Surface-specific reading and operating layouts.

## Colors

### Primary

The default action pair is primary text over the page background, inverted for a filled control. Forest green is a small semantic accent for success badges and new labels; its soft companion supports those signals. It is not the universal action fill.

Home examples allow Neutral, Forest, Ocean, Plum, and Clay. These choices affect the local demonstration region. The `--lib-accent` and `--lib-accent-foreground` aliases are declared on `body`, where the current theme's text and background roles resolve; local demos may override them. Explicit button colors use white foreground. Destructive actions use their dedicated red.

### Neutral

Background, raised surface, primary text, supporting text, and border roles change together under `body.dark-theme`. Keep these semantic CSS properties live in components. The dark library card and input overrides use the raised surface rather than the page background.

**The Theme Pair Rule.** Resolve foreground and background from the same active theme, including when the neutral demonstration palette is selected.

## Typography

Inter Variable is self-hosted through `@fontsource-variable/inter`, with Inter and sans-serif fallbacks. System monospace identifies code. Variable weights support the quiet hierarchy without a second display family.

The home display role has tight tracking and a short line height; its mobile size becomes `clamp(36px, 8vw, 52px)`. General page headings use the headline role. Catalog headings use `clamp(34px, 4vw, 48px)`. Body paragraphs stop at 72ch; the home introduction stops at 56ch and uses 15px type with 1.75 line height. Navigation is 13px; demo labels and supporting copy range from 10–12px. Numeric tables use tabular figures.

## Layout

The **Read** mode belongs to documentation: a sticky header (68px), a sidebar (218px), and a flexible main column in a centered shell (1344px maximum). Reading pages stop at 900px; main padding scales from 24px to 72px.

The home showcase and component catalog use the full shell width without the desktop sidebar. Their content stops at 1280px with 28px side gutters. The home hero pairs its flexible introduction with a 290px install aside. **Operate** mode belongs to the home examples: compact controls and immediate feedback sit inside bordered preview cards, with category filters and a local palette picker above the grid. The catalog pairs category controls with search and a visible result count.

Home examples use three columns with 18px gaps, become two columns at 1050px, and one at 760px. The team demo spans two columns only in the three-column layout. Catalog previews use three columns with 26px gaps, two at 1000px, and one at 600px; catalog tools stack at 1000px. Header search hides at 1100px. At 760px the header becomes 64px, navigation opens through Menu, main gutters become 20px, and the hero stacks. Flexible documentation examples separately stack at 768px. Preserve these distinct breakpoints rather than imposing one universal grid.

## Elevation & Depth

Thin borders and neutral surface changes provide almost all depth. Cards are flat; the old diffuse library-card shadow has been removed. Only the selected home filter uses the subtle selection shadow (`0 1px 3px #00000012`). The sticky header uses an opaque background, not blur.

**The Bordered Surface Rule.** Use a border and surface role for persistent containers; keep the small selected-filter shadow specific to that state.

## Shapes

Navigation and fields use small corners, buttons slightly fuller corners, and preview containers the larger radii in the frontmatter. One-pixel borders establish edges. Palette swatches and avatars are circular. The switch is a compact pill (38px by 24px) with a circular thumb (16px) that travels 14px. Avoid returning to the former 20px radius for ordinary library buttons and cards.

## Components

### Buttons

Library buttons use the button token, 13px medium type, and a 40px minimum height. Primary, secondary, outline, ghost, and destructive variants share the shape. Compact buttons reduce to 32px and comfortable buttons grow to 46px. Filled hover reduces brightness; outline and ghost hover add a surface background. Disabled controls use half opacity. Loading uses a rotating inline spinner. Home action links use the smaller field radius and a 40px minimum height.

### Fields

Demo fields have a 38px minimum height, 12px text, neutral background, and a thin border. Library inputs use a 40px minimum height, the library-field radius, and 13px text. Placeholder text uses the supporting-text role. Search containers expose focus on the entire wrapper.

### Navigation and filters

Header links use supporting text until hovered or current. Sidebar links gain the neutral surface and primary text when active, with a slightly heavier weight. Home filter selection uses a page-background fill and the small selection shadow; catalog categories use the surface fill. Selected circular palette swatches gain an offset outline. Mobile Menu controls the sidebar's expanded state.

### Cards, switches, and tables

Demo and library cards use fine borders, the card radius, and 24px padding. Switch states use the locally resolved accent and foreground pair; the unchecked thumb and border use supporting text for visibility. Tables have a bordered, horizontally scrollable wrapper, preview radius, surface header, fine row separators, and surface hover. The last row has no bottom border.

### Focus and motion

Keyboard focus uses a visible primary-text outline (2px) with a 3px offset; library buttons may override its color. Button color transitions and switch movement take .16s. Checklist progress takes .2s. The catalog motion preview uses a .45s transform with `cubic-bezier(.16,1,.3,1)`. Reduced motion collapses global animation and transition durations to .01ms, removes delays, and stops the loading spinner.

## Do's and Don'ts

- Do preserve the owner's essential, precise direction and the LiberaUI identity, author attribution, and MIT notices.
- Do use coordinated theme roles and resolve neutral demo accents on the active body theme.
- Do keep reading navigation and local demonstration controls appropriate to their surface.
- Do use working examples and visible state feedback to demonstrate customization.
- Don't spread the green semantic accent across every action or container.
- Don't restore Poppins, diffuse card shadows, or rounded 20px ordinary controls during routine extensions.
- Don't turn selectable demo palettes into a global site recoloring rule.
