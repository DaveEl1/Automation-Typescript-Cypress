# Automation-Typescript-Cypress

A Cypress + TypeScript end-to-end test framework for **Reach Catalog**, a small single-page app served locally at `http://localhost:5173/`.

The point of the project is the framework design as much as the tests themselves: a modular, layered structure where test specs describe user journeys and never touch selectors or raw Cypress commands directly.

## What it covers

| Section     | Spec                            | Coverage                                                                                                                                  |
| ----------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Home        | `cypress/e2e/smoke.cy.ts`       | Smoke test: the site loads and shows its heading (a scaffold check; the Home page stack is planned)                                       |
| UI Elements | `cypress/e2e/ui-elements.cy.ts` | Text field, password, checkbox, radio buttons, dropdown, slider, toggle, date picker, text area, file upload                              |
| Forms       | `cypress/e2e/form.cy.ts`        | Sign in, create account, contact us, choose a plan, card payment, survey, account settings, search & filter: validation and success paths |
| Products    | —                               | Not automated yet                                                                                                                         |

Test cases and their status are tracked in [`docs/test-plan.md`](docs/test-plan.md). Locators, fields and observed site behaviour are recorded in [`docs/site-notes.md`](docs/site-notes.md).

## Framework design

Each step of a user journey is kept separate from the code that performs it. The layers, from lowest to highest:

| Layer           | Responsibility                                                                                     | Location                                         |
| --------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Action**      | One raw Cypress operation: click, type, select, scroll, read text                                  | `src/framework/base/actions/` (one per file)     |
| **Locators**    | Every selector for a page. The only place selector strings live                                    | `src/framework/pages/<section>/*-locators.ts`    |
| **Actor**       | A user-level operation built from actions, e.g. "fill the sign-in form"                            | `src/framework/pages/<section>/*-actor.ts`       |
| **Validator**   | Checks the page after an action and returns a `ValidationResult` (pass/fail + message)             | `src/framework/pages/<section>/*-validator.ts`   |
| **Coordinator** | A complete workflow combining actors and validators, e.g. open form → fill → submit → check result | `src/framework/pages/<section>/*-coordinator.ts` |
| **Spec**        | Describes behaviour by calling coordinators only                                                   | `cypress/e2e/*.cy.ts`                            |

Shared behaviour lives in base classes in `src/framework/base/` (`BasePage`, `BaseLocators`, `BaseActor`, `BaseValidator`, `BaseCoordinator`), which each page inherits from.

A spec reads as a list of behaviours:

```ts
it('Should sign in with valid credentials and reject short or empty passwords When submitting the sign-in form', () => {
  coordinator.verifySignInSucceedsWithValidCredentials('ada@example.com', 'password1');
  coordinator.verifySignInRejectsShortPassword();
  coordinator.verifySignInRejectsMissingPassword();
});
```

and each coordinator method composes the layers below it:

```ts
verifySignInRejectsShortPassword(email = 'ada@example.com', password = 'short'): void {
  this.open();
  this.actor.fillSignInCredentials(email, password);
  this.actor.submitSignIn();
  this.expectValid(this.validator.signInResultShows('Password must be at least 8 characters.'));
}
```

### Project layout

```text
cypress/
  e2e/                 one spec per site section
  fixtures/            files used by tests (e.g. file-upload fixture)
  support/             Cypress support file (registers Testing Library commands)
src/framework/
  base/                base classes, page factory, ValidationResult
    actions/           one raw action per file
  pages/
    forms/             locators, page, actor, validator, coordinator
    ui-elements/       locators, page, actor, validator, coordinator
docs/
  site-notes.md        locators and observed behaviour of the site under test
  test-plan.md         phased test cases and their status
cypress.config.ts      baseUrl, viewport, timeouts
```

## Prerequisites

- **Node.js 20 LTS or newer**
- **The Reach Catalog app running at `http://localhost:5173/`.** The app is not part of this repository; start it separately before running any tests.
- **Google Chrome.** The npm test scripts run in Chrome (`--browser chrome`). To use another browser, see [Running the tests](#running-the-tests).

## Setup

```bash
git clone https://github.com/DaveEl1/Automation-Typescript-Cypress.git
cd Automation-Typescript-Cypress
npm ci
npx cypress verify
```

`npm ci` installs the exact dependency versions from `package-lock.json`, including the Cypress binary. `npx cypress verify` confirms Cypress can launch.

## Running the tests

Make sure Reach Catalog is running at `http://localhost:5173/` first.

| Task                                | Command                                     |
| ----------------------------------- | ------------------------------------------- |
| Run all specs headlessly in Chrome  | `npm test`                                  |
| Run one spec                        | `npm test -- --spec cypress/e2e/form.cy.ts` |
| Run in another browser              | `npx cypress run --browser edge`            |
| Open the interactive Cypress runner | `npm run test:open`                         |
| Type-check                          | `npm run typecheck`                         |
| Lint                                | `npm run lint`                              |
| Format                              | `npm run format`                            |

Screenshots of failed tests are written to `cypress/screenshots/` (git-ignored). Video recording is turned off.

### Pointing at a different URL

`baseUrl` is set in `cypress.config.ts`. Override it without editing code using a `CYPRESS_*` environment variable:

```bash
CYPRESS_BASE_URL=http://localhost:4173 npm test
```

On Windows PowerShell:

```powershell
$env:CYPRESS_BASE_URL = 'http://localhost:4173'; npm test
```

## Troubleshooting

- **`cy.visit()` fails to connect:** the Reach Catalog dev server isn't running at the configured `baseUrl`.
- **"Browser not found":** install Chrome, or run `npx cypress run` with a different `--browser` (e.g. `edge`, `firefox`, or `electron`, which is bundled with Cypress). `npx cypress info` lists the browsers Cypress can see.
- **Cypress binary missing or corrupt:** run `npx cypress install`, or `npx cypress cache prune` and then `npm ci` again.

## Contributing conventions

- Selectors only in locator files; specs only call coordinators.
- Prefer `data-testid` locators, then `id`, then role + accessible name.
- Test names follow `Should… When…`; every test sets up its own state.
- Rely on Cypress's built-in retrying assertions; no fixed `cy.wait(ms)` delays.
- TypeScript strict mode; kebab-case filenames, PascalCase classes, camelCase members.

The full set of rules is in [`AGENTS.md`](AGENTS.md) and [`coding standards.txt`](coding%20standards.txt).

## License

[MIT](LICENSE) © 2026 David Ellard
