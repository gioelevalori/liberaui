---
name: LiberaUI
description: Angular components with live customization and light and dark documentation.
colors:
  docs-accent: "#176b3a"
  docs-accent-soft: "#e9f5ed"
  docs-accent-dark: "#8cdda9"
  docs-accent-soft-dark: "#203a2c"
  background-color: "#ffffff"
  surface-color: "#f8f9fa"
  text-primary: "#212529"
  text-secondary: "#59636d"
  border-color: "#dee2e6"
  background-color-dark: "#1e1e1e"
  surface-color-dark: "#282828"
  text-primary-dark: "#f8f9fa"
  text-secondary-dark: "#b9c1c9"
  border-color-dark: "#495057"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    lineHeight: 1.25
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    lineHeight: 1.25
    letterSpacing: "-.03em"
  body:
    fontFamily: "Poppins, sans-serif"
    lineHeight: 1.65
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "14px"
  code:
    fontFamily: "Fira Code, monospace"
rounded:
  navigation: "6px"
  workbench: "12px"
  library-control: "20px"
spacing:
  action-gap: "12px"
  content-gap: "24px"
  section-gap: "48px"
components:
  primary-link:
    backgroundColor: "{colors.docs-accent}"
    textColor: "{colors.background-color}"
    rounded: "{rounded.navigation}"
    padding: "12px 20px"
  control:
    backgroundColor: "{colors.background-color}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.navigation}"
    padding: "10px"
---

# Design System: LiberaUI

## Overview

Extend the incumbent Poppins documentation interface: green accents, neutral surfaces, light and dark themes, and readable examples. LiberaUI and Gioele Valori attribution remain visible. Components demonstrate customization; documentation chrome provides a consistent frame around those examples.

## Colors

The primary documentation accent marks actions, active navigation, links, focus and range controls. Its soft companion identifies navigation hover and selection. Neutral background, surface, text and border roles switch together under `body.dark-theme`. The library also retains its independent semantic colors and customizable component colors; the documentation accent does not replace them.

## Typography

Poppins is the interface family; Fira Code identifies source examples. The home heading uses the display role with a narrow measure (16ch). Documentation headings use the headline role. Paragraphs generally stop at 72ch, with the home introduction at 60ch. Navigation labels use the label role; supporting captions use smaller text (12–13px).

## Layout

Read documentation in a persistent shell: a sticky header (80px), sidebar (240px), and flexible main column within a centered shell (1600px maximum). Content pages stop at 960px. Main padding grows from 20px to 80px with viewport width.

Operate the playground through a bordered workbench with a flexible preview beside controls (280px). Below 960px the controls move underneath and the preview stage reduces from 300px to 220px minimum height. At 760px the header becomes 68px, navigation moves behind an explicit Menu button, and main content uses 20px horizontal padding. The shared flexible example layout separately stacks at 768px.

## Elevation & Depth

Documentation uses surface changes and thin borders for depth. The workbench clips its contents within rounded corners. Library cards retain their existing diffuse shadow; do not spread that shadow to documentation containers.

## Shapes

Documentation navigation, links and fields share gently rounded corners. The workbench uses the larger container radius. Existing library inputs, buttons and cards retain their rounder control radius, with the button radius customizable in examples. Swatches are circular.

## Components

- Navigation uses neutral text, a soft accent hover/active background, and heavier active text. The mobile toggle exposes expanded state.
- Home actions use a filled accent primary link and bordered secondary link. Primary hover reduces brightness; secondary hover uses the surface color.
- Playground fields use a neutral background, thin border and consistent padding. Selected swatches gain an offset outline; range and checkbox controls use the documentation accent.
- Library buttons accept color, class, disabled state, radius, size and native button type. Their base hover reduces brightness over 0.3s. Their default color remains gray; existing primary/secondary classes remain blue/gray.
- Library inputs and cards retain their established component styles, independently of the documentation field treatment.
- Keyboard focus uses a visible accent outline (3px) offset by 4px. Reduced motion collapses animation and transition durations globally.

## Do's and Don'ts

- Do preserve the green documentation frame and coordinated light/dark roles.
- Do keep readable documentation and operable live preview controls distinct in layout.
- Do retain existing library component defaults when presenting examples, and expose intentional customization.
- Don't present the documentation accent as the default color of every library component.
- Don't replace Poppins, the established LiberaUI name, or author attribution during routine interface extensions.
