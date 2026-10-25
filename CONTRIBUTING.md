# Contributing to LiberaUI

Thanks for helping improve LiberaUI. Bug reports, accessibility fixes, documentation, and component proposals are welcome.

## Before you start

Search existing issues. For a new component or a breaking API change, open an issue describing the user problem, the proposed API, keyboard behavior, and a small usage example.

## Development

1. Fork the repository and create a branch from `master`.
2. Use Node.js 22 and run `npm ci`.
3. Run `npm start` and check the relevant examples and playground.
4. Make a focused change. Keep existing component inputs compatible where possible.
5. Run `npm run format`, then `npm run build`, `npm run build:lib`, and `npm test` with Chrome installed.
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

## Source conventions

Component logic, templates and styles live in separate `.ts`, `.html` and `.css` files. Keep templates declarative and keep the public inputs, outputs and forms behavior compatible when refactoring.

Common field styles live in `projects/libera-ui/src/lib/components/form-control.css`. Their selectors target LiberaUI hosts with `:where(...)` so application styles can override them without affecting unrelated inputs. Global rules used for projected content must be scoped to the component host. Typography belongs to the library host, not the consuming application's body.

Run `npm run format` before committing and `npm run format:check` to check formatting without writing files. CI checks formatting before building and testing. Add focused regression coverage when changing behavior or style isolation.
