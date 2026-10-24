# LiberaUI

An MIT-licensed Angular component library with examples and a live customization playground.

- [Documentation and playground](https://gioelevalori.github.io/ng-library/)
- [Report a bug or suggest a component](https://github.com/gioelevalori/ng-library/issues)
- [Contributing](CONTRIBUTING.md)

## Run locally

Use Node.js 22 and npm.

```sh
npm ci
npm start
```

Open http://127.0.0.1:4200. The demo workspace uses Angular 19. The library declares peer support for Angular 17–19; only the workspace version is verified by the current CI.

## Build and test

```sh
npm run build
npm run build:lib
npm test
```

Tests use ChromeHeadless. Set `CHROME_BIN` if Chrome is installed outside the standard path.

## Use the library

```sh
npm install libera-ui
```

The npm release and this repository may differ. New playground APIs (`radius`, `size`, `type`) are available in source; an npm release is a separate maintainer action.

```ts
import { ButtonComponent } from 'libera-ui';
// Add ButtonComponent to your standalone component's imports.
```

```html
<lib-button color="#176b3a" [radius]="12" size="comfortable">
  Create something
</lib-button>
```

## Playground

Adjust button label, accent, corner radius, spacing, and disabled state. The preview uses the actual library component, and the generated example updates with your choices. Copy feedback reports both success and clipboard errors.

## GitHub Pages

The Pages workflow builds the library, runs tests, builds the site with `/ng-library/` as its base path, and deploys on pushes to `master`. Hash routes support refresh and direct links without a custom server. Repository Settings → Pages must use **GitHub Actions** as its source.

Pull requests run the same checks without deployment. CI uses `npm ci` and the committed lockfile.

## Contribute

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before starting a large change. External contributors propose changes through forks and pull requests; maintainers review before merging.

## License and attribution

[MIT](LICENSE). Copyright (c) 2025 Libera-UI. Created by Gioele Valori.

You may use, copy, modify, distribute, and sell copies under MIT. You must preserve the copyright and license notice in copies or substantial portions. MIT does not grant exclusive ownership of the original code to downstream users.

## Current site design

The showcase follows an essential, precise direction inspired by the presentation patterns of shadcn/ui and Radix. Inter is bundled locally. Native Angular components remain the implementation; no React runtime or copied React component source is included.

The home includes local workspace, notification, checklist, team-role, and button examples. The catalog supports text and category filtering. `SwitchComponent` supports `ngModel` and reactive forms. Buttons support `solid`, `secondary`, `outline`, `ghost`, and `destructive` variants plus a loading state. These additions are in repository source and are not yet an npm release.

LiberaUI's original geometric mark is supplied as SVG and a multi-resolution ICO favicon (16–256px).

## Share the site's component style

After building the library from this repository, import its shared theme once in your application's global stylesheet:

```css
@import 'libera-ui/theme.css';
```

The theme includes the same neutral colors, Inter font files, borders, focus treatment, and light/dark tokens used by this documentation site. Add `dark-theme` to `body` to select dark mode, or use `SwitchThemeComponent`. Components and catalog previews use this shared theme directly. This source addition requires a future npm release before it is available in the published package.
