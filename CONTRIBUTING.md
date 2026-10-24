# Contributing to LiberaUI

Thanks for helping improve LiberaUI. Bug reports, accessibility fixes, documentation, and component proposals are welcome.

## Before you start

Search existing issues. For a new component or a breaking API change, open an issue describing the user problem, the proposed API, keyboard behavior, and a small usage example.

## Development

1. Fork the repository and create a branch from `master`.
2. Use Node.js 22 and run `npm ci`.
3. Run `npm start` and check the relevant examples and playground.
4. Make a focused change. Keep existing component inputs compatible where possible.
5. Run `npm run build`, `npm run build:lib`, and `npm test` with Chrome installed.
6. Open a pull request explaining the problem, behavior, and verification. Include desktop and mobile screenshots for visual changes.

## Component quality

- Support keyboard use, visible focus, and descriptive labels.
- Verify light/dark themes, narrow screens, long labels, and disabled states.
- Keep the documentation and generated examples consistent with the actual API.
- Add meaningful regression tests for behavioral changes.
- Respect reduced-motion settings.

## License

Contributions are made under the project's MIT license. Preserve existing copyright and license notices. Only submit work you have permission to contribute; identify any third-party code and its license.

Maintainers review pull requests before merging. Contributors do not need direct write access to participate.
