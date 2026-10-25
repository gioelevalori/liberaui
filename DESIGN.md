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

# Design system

LiberaUI uses self-hosted Inter Variable, neutral surfaces, fine borders and compact controls. The same visual language applies to library components, documentation and interactive examples.

## Theme tokens

`projects/libera-ui/theme.css` defines the shared palette and bundles the font assets. Dark mode is applied with the body's `dark-theme` class. Components resolve foreground and background from the same theme, including inside scoped previews.

Use semantic tokens for text, surfaces, borders and status colors. Demo accent choices stay local to their example. Reserve status colors for meaningful feedback.

## Glass

`projects/libera-ui/glass.css` provides the reusable material. Translucent surfaces use a readable fill, subtle highlight and backdrop blur. They fall back to opaque surfaces when filtering is unavailable or reduced transparency is requested.

The documentation site enables Glass for first visits and preserves an explicit saved Essential preference. Scoped previews can choose a separate light or dark appearance.

## Layout and typography

Documentation prioritizes reading and keyboard navigation. Examples demonstrate real component states. Containers use flexible widths and allow long content to wrap; data tables and tab strips may scroll locally.

Use the shared typeface and maintain a clear distinction between page headings, section headings, labels and supporting text. Keep body copy readable and avoid using monospace outside code and data.

## Components and interaction

Buttons, inputs, pickers and navigation share theme colors, border treatment and visible focus. States include hover, active, disabled, loading, invalid and empty where applicable. Form examples must keep displayed values synchronized with their Angular form controls.

Icons use authored SVG with consistent thin strokes. Decorative icons are hidden from assistive technology; icon-only controls have accessible action labels.

## Motion

Motion explains state changes. Alerts enter briefly, tab and accordion content transitions stay short, and the mobile navigation opens without shifting the page. The menu icon changes continuously between its closed and open forms. Repeated clicks must leave the interface in the requested state.

Respect reduced-motion preferences. No content or action should depend on an animation completing.

## Review

Check light and dark themes, Glass and Essential, keyboard interaction, narrow widths, long labels and disabled states. Screenshots in `docs/assets/` should show the current components and controls. Preserve author attribution and all license notices.
