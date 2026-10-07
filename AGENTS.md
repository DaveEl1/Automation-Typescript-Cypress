# AGENTS.md

## Project

Cypress + TypeScript test automation framework targeting the local SPA "Reach Catalog" at http://localhost:5173/. The goal is to demonstrate a modular, reusable, maintainable design — code clarity and structure matter as much as passing tests.

Scope: only the four client-side sections of the site — Home, Products, Forms, UI Elements — as documented in `docs/site-notes.md`. Nothing else on the site is automated. Test cases and phasing live in `docs/test-plan.md`; implementation steps live in `PLAN.md`.

Dependencies are npm packages declared in `package.json`. `REQUIREMENTS.md` is the prose spec, not a package list.

## Architecture rules (from REQUIREMENTS.md)

- One file per page or action; do not merge pages into shared files.
- Per-page split: locators, actors, validators, and coordinators each get their own file under `src/framework/pages/<section>/`; actions live in separate action files under `src/framework/base/actions/`.
- Shared functionality goes in base classes (base page/actor/validator/locator/coordinator) in `src/framework/base/`; child pages inherit rather than duplicate.
- Code for each step of a user journey must be independent of the code that performs actions — never mix them.

## Vocabulary (repo-specific terms, not Cypress concepts)

- **action** — raw Cypress operation: click, wait, scroll, enter text (`src/framework/base/actions/*.ts`).
- **actor** — user-level operation built from actions (e.g., populate a field and click submit).
- **validator** — post-action verification returning a `ValidationResult` (e.g., error message appears when submitting with a required field empty).
- **coordinator** — workflow combining actors/validators (e.g., open form → fill data → submit → validate no errors); never touches locators or raw actions directly.

## Conventions

- TypeScript strict mode; kebab-case filenames, PascalCase classes, camelCase methods/variables, UPPER_SNAKE_CASE constants.
- Locators: prefer `data-testid`, then id, then role+name (per test plan). Selector strings live only in locator files/classes — everything else receives them via the page's locator instance.
- Specs (`cypress/e2e/*.cy.ts`) drive coordinators only — no raw actions in tests. One spec per section. Test names describe behavior: `Should…When…` / `When…Then…`. Each test sets up its own state; no shared mutable state between tests.
- Rely on Cypress auto-waiting assertions; never bare `cy.wait(ms)`. Use `cy.intercept` only if a flow needs API stubbing.
- `baseUrl` comes from `cypress.config.ts`; environment overrides via `CYPRESS_*` env vars; no hardcoded URLs in framework code.

## Commands

- All tests: `npm run test` (runs all specs via `cypress run`)
- Single spec: `npx cypress run --spec cypress/e2e/smoke.cy.ts`
- Interactive runner: `npm run test:open`
- Typecheck: `npm run typecheck`; Lint: `npm run lint`; Format: `npm run format`

## Setup gotchas

- Node 20+ LTS required. Cypress browsers are installed automatically by the npm package on first run; verify with `npx cypress verify`. If tests fail with "browser not found", re-run that (or `npx cypress cache prune` and reinstall).
- Browsers live in `%LOCALAPPDATA%\Cypress\Cache` — outside the repo, so nothing to gitignore for them.
- The Reach Catalog dev server must be running at http://localhost:5173/ before any spec runs.

## Status

Target is the local SPA "Reach Catalog" at http://localhost:5173/; `docs/site-notes.md` documents all four sections (locators, fields, observed behavior) and `docs/test-plan.md` holds the phased test cases.

Phase 0 pending: repo currently contains only docs — no code yet. Next step per `PLAN.md`: Phase 0 scaffolding (npm init with Cypress/TypeScript strict setup, ESLint/Prettier, smoke spec), then Phase 1 base classes in `src/framework/base/`.
