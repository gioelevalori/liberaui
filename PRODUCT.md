# LiberaUI

LiberaUI is an MIT-licensed Angular component library with interactive documentation and a live theme editor.

## Scope

- Standalone Angular components with shared typography, color and spacing tokens.
- Light, dark and Glass surfaces, including reduced-motion and reduced-transparency behavior.
- Accessible interaction patterns and Angular forms integration.
- Theme Studio for composing examples, exporting CSS and Angular code, and sharing configurations.
- Documentation and examples hosted on GitHub Pages.

## Project structure

- `projects/libera-ui/`: public components, exports, theme styles and package documentation.
- `src/app/`: documentation, interactive examples and Theme Studio.
- `src/styles/`: documentation-site layout and surface styles.
- `docs/assets/`: screenshots and repository artwork.
- `.github/`: issue templates, contribution checks and deployment workflow.

The library package and private documentation workspace have separate versions. The public package version is maintained in `projects/libera-ui/package.json`.

## Engineering principles

Examples use the library's real components and must reflect the public API. Controls support keyboard interaction, visible focus, appropriate labels and disabled states. Components share theme tokens and remain usable on narrow screens.

Behavioral fixes should include focused regression coverage. UI changes require a review in light and dark themes, at desktop and mobile widths, and with reduced motion where relevant.

## Contributions and releases

Contributions arrive through issues and pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup and verification. Changes to the public package are recorded in its changelog. The Pages workflow builds the library and site and runs tests before deployment.

## License

LiberaUI is maintained by Gioele Valori and distributed under MIT. Preserve copyright and license notices when reusing or contributing code. Font assets retain their separate license notices.
