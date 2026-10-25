<div align="center">

<img src="docs/assets/logo.svg" alt="LiberaUI logo" width="72" height="72">

# LiberaUI

### Good interfaces start with the details.

Thoughtful Angular components. A shared visual language. A playground to make them yours.

[Explore the demo](https://gioelevalori.github.io/ng-library/) · [Components](https://gioelevalori.github.io/ng-library/#/components) · [Live playground](https://gioelevalori.github.io/ng-library/#/playground) · [Contribute](CONTRIBUTING.md)

[![Build and deploy](https://github.com/gioelevalori/ng-library/actions/workflows/pages.yml/badge.svg)](https://github.com/gioelevalori/ng-library/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-18181b.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Built_with-Angular-dd0031.svg)](https://angular.dev/)

</div>

[![LiberaUI in dark mode: workspace form, notification controls, checklist and team examples](docs/assets/showcase.png)](https://gioelevalori.github.io/ng-library/)

## Your interface, your details

LiberaUI is an open source Angular component library for people who care about how an interface looks and feels. Explore real components, adjust their appearance, and take the example into your application.

- **Customize live.** Change a button's label, accent, radius, spacing and states, then copy the generated example.
- **Keep a consistent style.** The library and showcase share typography, colors, surfaces and theme tokens.
- **Build with Angular.** Standalone components, button variants and loading states, plus a switch with Angular forms support.
- **Explore real examples.** Try workspace forms, notification settings, checklists and team controls in the demo.
- **Make it yours.** Light and dark themes, locally bundled Inter fonts and an MIT license.

The visual direction takes inspiration from the clarity of shadcn/ui and Radix. The components are implemented in Angular, with LiberaUI's own geometric logo.

## See the components

[![LiberaUI component catalog showing buttons, a switch and a text input](docs/assets/components.png)](https://gioelevalori.github.io/ng-library/#/components)

[Browse the catalog →](https://gioelevalori.github.io/ng-library/#/components)
[Try the live customization playground →](https://gioelevalori.github.io/ng-library/#/playground)

## Try the latest source

> **Release status:** the demo follows this repository. The published npm package is an earlier release and does not yet contain all the APIs and shared theme shown here. Use the source to explore the latest version.

Use Node.js 22 and npm:

```sh
git clone https://github.com/gioelevalori/ng-library.git
cd ng-library
npm ci
npm start
```

Open [localhost:4200](http://127.0.0.1:4200). The workspace uses Angular 19. The library declares peer support for Angular 17–19; the current CI verifies Angular 19 only.

### Use the library

The published package is available with:

```sh
npm install libera-ui
```

For the latest source APIs, build the library with `npm run build:lib` and integrate the resulting `dist/libera-ui` package into your application. Add `ButtonComponent` to your standalone component's imports:

```ts
import { ButtonComponent } from 'libera-ui';
```

```html
<lib-button variant="outline" [radius]="12" size="comfortable">
  Create something
</lib-button>
```

When using the latest source build, import the shared theme once in your global stylesheet:

```css
@import 'libera-ui/theme.css';
```

The theme includes the locally bundled Inter fonts and shared design tokens. Use `dark-theme` on the body, or the library's theme switch, to enable dark mode. This theme export is a source addition pending a future npm release.

## Build something with us

Small improvements are welcome: a clearer example, a bug fix, a keyboard interaction or a new component.

1. [Report a bug or propose an idea](https://github.com/gioelevalori/ng-library/issues).
2. Read the [contribution guide](CONTRIBUTING.md).
3. Fork the repository and open a pull request.

For a large change, start with an issue so we can agree on the direction. Maintainers review contributions before merging.

If you find LiberaUI useful, share something you built with it or star the repository to help others discover it.

<details>
<summary><strong>Development and deployment</strong></summary>

### Local checks

```sh
npm run build
npm run build:lib
npm test
```

Tests use ChromeHeadless. Set `CHROME_BIN` if Chrome is installed outside the standard path.

### GitHub Pages

Pushes to `master` build the library, run tests, build the demo with the `/ng-library/` base path, and deploy to GitHub Pages. Pull requests run the checks without deploying.

Pages must use GitHub Actions as its source. Hash routes support direct links and refresh without custom server routing.

</details>

## License

Created by [Gioele Valori](https://github.com/gioelevalori). Released under the [MIT license](LICENSE).

Copyright (c) 2025 Libera-UI. You may use, modify and redistribute the code, including commercially, while preserving the copyright and license notice in copies or substantial portions.

Inter is bundled under its [SIL Open Font License](projects/libera-ui/fonts/LICENSE).
