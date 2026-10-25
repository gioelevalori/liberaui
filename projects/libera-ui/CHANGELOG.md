# Changelog

## 0.5.0 — preview, not published

- Default new site visits to Glass while retaining a saved Essential preference.
- Add accessible Tabs, Accordion and Alert components with interactive documentation.
- Add ControlValueAccessor support to text, password, number, date, textarea, select and checkbox controls.
- Apply selectedValue correctly and preserve numeric select option values.
- Remove the implicit numeric maximum of zero; expose optional bounds and step.
- Add a password visibility control and shared SVG icons.
- Add a themed date calendar with keyboard navigation and date bounds.
- Style customizable native select menus with shared tokens and retain native fallbacks.
- Keep Glass and icon-only theme controls in the mobile header.
- Coordinate tab scrollbars and state transitions; respect reduced motion.
- Align sidebar icons and labels; coordinate the dark page scrollbar.
- Prevent empty workspace submission in Theme Studio and its Angular export.
- Respect reduced motion and disconnect animation observers/timers on destruction.
- Correct table example addresses, update form examples and refresh screenshots.


## 0.4.0

- Add opt-in Glass material, with reusable container/panel classes and a glass.css export.
- Respect reduced transparency and forced-color preferences; use opaque fallback surfaces when backdrop filtering is unavailable.
- Preserve Glass in theme normalization, shared Studio links and Angular component exports.
- Add independent site-wide Glass toggle with local preference storage and a mobile-menu control.

## 0.3.0

- Export typed theme configuration, input normalization, contrast-aware accent foreground, theme tokens and CSS generation helpers.
- Support shared font and radius tokens in buttons.
- Add Theme Studio to the showcase: section composition, light/dark and narrow previews, interaction states, CSS and standalone Angular exports, and versioned share links.
- Update repository and documentation links after the liberaui rename.

## 0.2.0

- Add the shared theme export: `@import 'libera-ui/theme.css';`.
- Bundle Inter fonts and their SIL Open Font License.
- Align component typography, surfaces, borders and light/dark themes with the showcase.
- Add button variants, loading state, sizing and radius customization.
- Add a switch with Angular forms support.
- Improve narrow-screen layouts and long-content handling.
- Refresh package documentation, screenshots and repository links.

The workspace and CI use Angular 19. Angular 17–19 remains the declared peer range; Angular 17 and 18 have not been verified by the current CI.
