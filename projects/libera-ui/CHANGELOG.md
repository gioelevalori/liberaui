# Changelog

## Unreleased

- Add DataTableComponent with multi-column sorting, pagination, row selection, row headers and custom cell templates. The existing TableComponent is unchanged.
- Add DialogComponent on the native modal dialog, with an inert background, Escape and backdrop dismissal and focus restoration.
- Add ToastService and ToastOutletComponent with live-region announcements and timers that pause on hover and focus.
- Add TooltipComponent, shown on focus and hover, dismissible with Escape and rendered in the top layer.
- Add MenuComponent following the WAI-ARIA menu button pattern, with arrow keys, Home/End and type-ahead.
- Add RadioGroupComponent and ComboboxComponent with Angular forms support.
- Render programmatic Angular forms values and disabled states in zoneless applications.
- Show AnimationsComponent content and code copy feedback in zoneless applications.
- Move focus into the side navigation when it opens and restore it to the trigger on close; connect the trigger with aria-controls.
- Render the theme switcher during server rendering without browser globals.
- Export BannerComponent from the package entry point.
- Use an English default placeholder for the search input.

## 0.5.2 - 2026-10-26

- Correct README character encoding and Angular compatibility notes.
- No component behavior or API changes from 0.5.1.

## 0.5.1 - 2026-10-26

- Replace legacy Angular animation triggers with CSS transitions, removing the animations peer dependency and animation-provider setup.
- Guard animation initialization during server rendering and respect reduced motion.
- Extend Angular peer dependency compatibility to Angular 20 and 21 (>=17 <22).
- Separate component templates and styles from TypeScript logic.
- Consolidate shared form-control styles and scope them to library hosts.
- Apply library typography to component hosts instead of the application body.
- Keep navigation icon metadata with the component registry.
- Add source formatting checks to CI and regression coverage for style isolation.

## 0.5.0 - 2026-10-25

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
