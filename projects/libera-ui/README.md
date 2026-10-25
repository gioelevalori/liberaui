<div align="center">

<img src="https://raw.githubusercontent.com/gioelevalori/liberaui/master/docs/assets/logo.svg" alt="LiberaUI logo" width="64" height="64">

# LiberaUI

Thoughtful Angular components. A shared visual language. A playground to make them yours.

[Demo](https://gioelevalori.github.io/liberaui/) · [Components](https://gioelevalori.github.io/liberaui/#/components) · [Playground](https://gioelevalori.github.io/liberaui/#/playground) · [GitHub](https://github.com/gioelevalori/liberaui)

</div>

![LiberaUI component catalog](https://raw.githubusercontent.com/gioelevalori/liberaui/master/docs/assets/components.png)

## Install

```sh
npm install libera-ui@^0.4.0
```

Version 0.4.0 includes the shared theme, button variants and loading states, and a switch with Angular forms support.

The library declares Angular 17–19 peer support. The repository workspace and current CI use Angular 19.

## Shared theme

Import once in your application's global stylesheet:

```css
@import 'libera-ui/theme.css';
```

The theme bundles Inter fonts and the shared visual tokens. Add the `dark-theme` class to the body to enable dark mode.

Add `ButtonComponent` to your standalone component's imports:

```ts
import { ButtonComponent } from 'libera-ui';
```

```html
<lib-button variant="outline" [radius]="12" size="comfortable">
  Create something
</lib-button>
```

See the [changelog](https://github.com/gioelevalori/liberaui/blob/master/projects/libera-ui/CHANGELOG.md) for release details.

## Glass surfaces

The shared theme includes the opt-in Glass material:

```html
<div class="lib-glass lib-glass-backdrop">
  <section class="lib-glass-panel">Your content</section>
</div>
```

Glass supports light and dark themes, reduced transparency, forced colors and opaque fallback surfaces. In [Theme Studio](https://gioelevalori.github.io/liberaui/#/playground), choose **Surface → Glass** to export a matching Angular component.

## Theme helpers

```ts
import { createThemeCss, DEFAULT_THEME } from 'libera-ui';
const css = createThemeCss({ ...DEFAULT_THEME, accent: '#2454ce', radius: 16 });
```

The [Theme Studio](https://gioelevalori.github.io/liberaui/#/playground) exports theme CSS and a standalone Angular component. Share links preserve appearance, selected sections and preview settings.

## Explore and contribute

Browse the [component catalog](https://gioelevalori.github.io/liberaui/#/components), try the [live playground](https://gioelevalori.github.io/liberaui/#/playground), or read the [contribution guide](https://github.com/gioelevalori/liberaui/blob/master/CONTRIBUTING.md).

Bug reports, examples, documentation improvements and pull requests are welcome.

## License

Created by [Gioele Valori](https://github.com/gioelevalori). [MIT](https://github.com/gioelevalori/liberaui/blob/master/LICENSE), copyright (c) 2025 Libera-UI. Preserve the copyright and license notice when reusing the code.
