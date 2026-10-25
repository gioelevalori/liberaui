<div align="center">

<img src="https://raw.githubusercontent.com/gioelevalori/ng-library/master/docs/assets/logo.svg" alt="LiberaUI logo" width="64" height="64">

# LiberaUI

Thoughtful Angular components. A shared visual language. A playground to make them yours.

[Demo](https://gioelevalori.github.io/ng-library/) · [Components](https://gioelevalori.github.io/ng-library/#/components) · [Playground](https://gioelevalori.github.io/ng-library/#/playground) · [GitHub](https://github.com/gioelevalori/ng-library)

</div>

![LiberaUI component catalog](https://raw.githubusercontent.com/gioelevalori/ng-library/master/docs/assets/components.png)

## Install

```sh
npm install libera-ui@^0.2.0
```

Version 0.2.0 includes the shared theme, button variants and loading states, and a switch with Angular forms support.

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

See the [changelog](https://github.com/gioelevalori/ng-library/blob/master/projects/libera-ui/CHANGELOG.md) for release details.

## Explore and contribute

Browse the [component catalog](https://gioelevalori.github.io/ng-library/#/components), try the [live playground](https://gioelevalori.github.io/ng-library/#/playground), or read the [contribution guide](https://github.com/gioelevalori/ng-library/blob/master/CONTRIBUTING.md).

Bug reports, examples, documentation improvements and pull requests are welcome.

## License

Created by [Gioele Valori](https://github.com/gioelevalori). [MIT](https://github.com/gioelevalori/ng-library/blob/master/LICENSE), copyright (c) 2025 Libera-UI. Preserve the copyright and license notice when reusing the code.
