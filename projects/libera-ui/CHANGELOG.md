# Changelog

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
