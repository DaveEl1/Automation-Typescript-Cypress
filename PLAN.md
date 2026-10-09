# Plan — Cypress + TypeScript Automation Framework (Reach Catalog)

Goal: a modular, reusable E2E test framework for the local SPA "Reach Catalog" at `http://localhost:5173/`, built with **Cypress** and **TypeScript**, mirroring the structure of the C#/Playwright reference project in `C:\Dev\automation` (same layering: locators / actions / actors / validators / coordinators, one file per page or action).

Scope: only the four client-side sections — Home, Products, Forms, UI Elements. Test cases and phasing follow `docs/test-plan.md`.

## Target layout

```
Automation-Cypress/
  package.json
  cypress.config.ts          # baseUrl, viewport, timeouts — no URLs hardcoded in code
  tsconfig.json              # strict mode + path aliases (@framework/*)
  eslint.config.mjs          # typescript-eslint flat config
  .prettierrc
  docs/
    site-notes.md            # ported from C:\Dev\automation (locators, observed behavior)
    test-plan.md             # ported from C:\Dev\automation (phases, TC ids)
  src/framework/             # ≈ QaPracticeHub.Framework
    base/
      validation-result.ts   # { passed: boolean; message: string }
      base-locators.ts       # abstract shared locator base
      base-page.ts           # abstract BasePage<TLocators>
      base-actor.ts          # abstract BaseActor<TLocators>
      base-validator.ts      # abstract BaseValidator<TLocators>
      base-coordinator.ts    # abstract BaseCoordinator<TPage>
      i-page.ts              # page contract (mirrors IPage.cs)
      page-factory.ts        # constructs pages from baseUrl (mirrors PageFactory.cs)
      actions/               # raw Cypress operations, one file each
        click.ts  type-text.ts  wait.ts  scroll.ts
        toggle.ts select.ts     read-text.ts  get-value.ts
    pages/
      ui-elements/           # locators / page / actor / validator / coordinator (one file each)
      products/              # same five files
      forms/                 # same five files
  cypress/
    e2e/                     # ≈ tests/QaPracticeHub.Tests — one spec per section
      smoke.cy.ts
      ui-elements.cy.ts
      product.cy.ts
      form.cy.ts
    support/
      e2e.ts                 # global setup (fixtures, retries)
      commands.ts            # thin custom commands only; raw actions stay in framework/actions
```

## Conventions (Cypress + TypeScript best practices)

- **TypeScript**: `strict: true`, no `any` unless unavoidable; explicit return types on exported functions/classes.
- **Files**: kebab-case filenames, one class/function per file, PascalCase classes, camelCase methods/variables, UPPER_SNAKE_CASE constants (per `coding standards.txt`).
- **Layering** (from REQUIREMENTS.md — journey code never mixes with action code):
  - _action_ = raw Cypress operation (`cy.click()`, `cy.type()`, …) in `base/actions/*.ts`.
  - _actor_ = user-level operation built from actions.
  - _validator_ = post-action check returning a `ValidationResult`.
  - _coordinator_ = workflow combining actors/validators; never touches locators or raw actions directly.
- **Locators**: prefer `data-testid`, then id, then role+name (per test plan). Selector strings live only in locator files/classes; everything else receives them via the page's locator instance.
- **Tests** (`cypress/e2e/*.cy.ts`): drive coordinators only — specs never call raw actions. One spec per section. Test names describe behavior: `Should…When…` / `When…Then…`. Each test sets up its own state (fresh visit in `beforeEach`); no shared mutable state between tests.
- **Waiting**: rely on Cypress auto-waiting assertions; never bare `cy.wait(ms)`. Use `cy.intercept` only if a flow needs API stubbing.
- **Config**: `baseUrl` from `cypress.config.ts`; environment overrides via `CYPRESS_*` env vars; no hardcoded URLs in framework code.
- **Quality gates** (run before marking any phase done): `npm run typecheck`, `npm run lint`, and the spec(s) for that phase green.

## Prerequisites

- Node 20+ LTS, npm available on PATH.
- Reach Catalog dev server running at `http://localhost:5173/` (start it before running any spec).

---

## Phase 0 — Scaffolding & smoke test

1. Initialize project
   - [x] `npm init -y`; set `"private": true`, add scripts: `test` (`cypress run`), `test:open` (`cypress open`), `typecheck` (`tsc --noEmit`), `lint` (`eslint .`), `format` (`prettier --write .`)
   - [x] Install dev deps: `cypress`, `typescript`, `@types/node`, `eslint`, `typescript-eslint`, `prettier` (+ `@eslint/js` for the flat config)
2. TypeScript + lint setup
   - [x] `tsconfig.json`: `strict: true`, target ES2022, `esModuleInterop`, paths alias `"@framework/*": ["./src/framework/*"]` (Cypress resolves tsconfig paths in specs natively; TS 6 requires the `./` prefix without `baseUrl`)
   - [x] `eslint.config.mjs` with typescript-eslint recommended rules; `.prettierrc` (single quotes, semicolons, 100-col)
3. Cypress setup
   - [x] `cypress.config.ts`: `baseUrl: 'http://localhost:5173'`, default viewport, reasonable timeouts
   - [x] Create folder skeleton exactly as in the target layout above
4. Port documentation from reference project
   - [x] Copy `docs/site-notes.md` and `docs/test-plan.md` from `C:\Dev\automation`; adapt test-plan commands (`dotnet test …` → `npx cypress run --spec …`) and reset all TC statuses to pending (this repo has no completed cases yet)
5. Smoke spec
   - [x] `cypress/e2e/smoke.cy.ts`: browser launches, visits `/`, asserts the home heading is visible
6. Housekeeping
   - [x] Update `AGENTS.md` to describe this Cypress/TS project (commands: `npm run test`, `npx cypress run --spec …`; remove .NET/Playwright notes)

**Verify:** `npm run typecheck && npm run lint && npx cypress run --spec cypress/e2e/smoke.cy.ts` → green. Done 2026-10-07: typecheck clean, lint clean, smoke spec 1 passing.

## Phase 1 — Base classes & actions (`src/framework/base/`)

Mirror of C# `Base/` + `Base/Actions/`. No page code yet; verify by typecheck/lint only.

1. [x] `validation-result.ts`: `ValidationResult` class with `passed: boolean`, `message: string`; static helpers `ok(message)` / `fail(message)`
2. [x] `base-locators.ts`: abstract `BaseLocators` holding shared selectors used by multiple pages (e.g., nav buttons); per-page locator classes extend it
3. [x] `i-page.ts` + `page-factory.ts`: page contract and factory that builds a page bound to `baseUrl` (mirrors `IPage.cs`, `PageFactory.cs`). `getByRole` / `getByLabelText` / `getByTestId` are backed by `@testing-library/cypress` (`cy.findBy*`), imported in `cypress/support/e2e.ts`
4. [x] `base-page.ts`: abstract `BasePage<TLocators>` — holds locator instance, exposes `visit(path)` and shared navigation helpers (`goToSection`)
5. [x] `actions/` — one file per raw operation, each a small exported function wrapping Cypress commands:
   - [x] `click.ts`, `type-text.ts`, `wait.ts` (visible/enabled), `scroll.ts`, `toggle.ts`, `select.ts`, `read-text.ts`, `get-value.ts`
6. [x] `base-actor.ts`: abstract `BaseActor<TLocators>` — composes actions; no direct `cy.*` calls beyond what actions expose
7. [x] `base-validator.ts`: abstract `BaseValidator<TLocators>` — returns `ValidationResult`; never throws for expected-failure cases
8. [x] `base-coordinator.ts`: abstract `BaseCoordinator<TPage>` — orchestrates actors + validators; no locators, no raw actions

**Verify:** `npm run typecheck && npm run lint` clean (no specs yet to run). Done 2026-10-07: typecheck clean, lint clean, smoke spec still green.

## Phase 2 — UI Elements: Basic Elements (`pages/ui-elements/`)

1. [x] `ui-elements-locators.ts`: selectors for text field, password, checkbox, radio group + their output boxes (verified against live DOM 2026-10-08; no number input exists on the page)
2. [x] `ui-elements-page.ts` extends `BasePage<UiElementsLocators>`; visit `/ui-elements` (verified at runtime 2026-10-08: all four ui-elements tests navigate to /ui-elements via goToSection)
3. [x] `ui-elements-actor.ts`: actors per control (e.g., `typeIntoTextField(text)`, `setNumberInput(value)`, …) built from actions
4. [x] `ui-elements-validator.ts`: validators asserting each output box reflects the input (`ValidationResult`)
5. [x] `ui-elements-coordinator.ts`: workflow = open page → actor action → validate output

6. [x] `cypress/e2e/ui-elements.cy.ts` — one test per TC, driving coordinators only:
   - [x] TC-UIE-01 Text Field: type known string into `ui-text-field` → output shows `Output: <text>` (verified 2026-10-08)
   - [x] TC-UIE-02 Checkbox: toggle off then on → output tracks both states (verified 2026-10-08; checkbox is unchecked by default, so the "off" step asserts initial state via idempotent `uncheck`)
   - [x] TC-UIE-03 Radio Buttons: select A/B/C in turn → output shows selected option (verified 2026-10-08; options are Monthly/Quarterly/Annual, selected in that order on one page visit)

Status: items 1–6 done; `ui-elements.cy.ts` verified against the live site (4 passing). Site notes updated with observed checkbox/radio behavior. Stopping for review before Phase 3+.

**Verify:** `npx cypress run --spec cypress/e2e/ui-elements.cy.ts` green; any behavior differing from assumption recorded back in `docs/site-notes.md`.

## Phase 3 — UI Elements: Selection Controls & Composite Widgets

Same pattern as Phase 2 (one TC per block: set control → assert output box).

1. [x] Extend locators/actor/validator/coordinator for: dropdown select, slider, toggle switch, date picker
2. [x] Then composite widgets: color picker, file upload (needs a `.txt` fixture in `cypress/fixtures/`), textarea, range input, time picker — implemented file upload + text area; color picker/time picker don't exist on the page and "range input" is the slider from item 1 (recorded in site-notes + test-plan as n/a/covered)
3. [x] Add matching tests to `ui-elements.cy.ts` — all Phase 3 blocks covered (TC-UIE-04..09, 13 tests; shipped incrementally with items 1–2 and formally verified against the test-plan mapping 2026-10-09)

**Verify:** full `ui-elements.cy.ts` spec green; site-notes updated with observed behaviors. Done 2026-10-09: full suite green (`ui-elements.cy.ts` 17 passing, 18 with smoke); site-notes corrected (file upload/text area observed behavior, no-router gotcha) and test-plan TC-UIE-04..09 marked done (color picker/time picker n/a, range input covered by TC-UIE-05).

## Phase 4 — Forms (`pages/forms/`)

Validation-focused; all forms are `novalidate`, so expected messages must be captured empirically first (probe each form, record in site-notes).

1. [x] `forms-locators.ts`, `forms-page.ts`, `forms-actor.ts`, `forms-validator.ts`, `forms-coordinator.ts` — 30 coordinator verify methods, one per probed scenario; navigation goes through `goToSection` (SPA has no router, `visit('/forms')` renders Home). Messages probed empirically 2026-10-09 (32 scenarios) and recorded in site-notes; wiring verified live via a temporary driver spec exercising every method (8/8 green), then removed
2. [ ] `cypress/e2e/form.cy.ts`:
   - [ ] TC-FRM-01 Sign in: valid credentials succeed; short/empty password shows validation message
   - [ ] TC-FRM-02 Create account: empty submit → required-field messages; short/mismatched password rejected; valid submit succeeds
   - [ ] TC-FRM-03 Contact us: required fields enforced; subject defaults to General
   - [ ] TC-FRM-04 Choose a plan: defaults (pro/monthly) reflected after subscribe
   - [ ] TC-FRM-05 Card payment: invalid card rejected; `4242 4242 4242 4242` accepted
   - [ ] TC-FRM-06 Quick survey: rating + recommendation required; optional comments skipped
   - [ ] TC-FRM-07 Account settings: save persists checkbox/select state in confirmation
   - [ ] TC-FRM-08 Search & filter: filters apply without error (assert app feedback)

**Verify:** `npx cypress run --spec cypress/e2e/form.cy.ts` green.

## Phase 5 — Products CRUD (`pages/products/`)

1. [ ] `products-locators.ts`, `products-page.ts` (visit `/products`), `products-actor.ts`, `products-validator.ts`, `products-coordinator.ts`
   - Row-scoped actions (Edit/Delete) take the row as a parameter — keep them in actor files, not specs
2. [ ] `cypress/e2e/product.cy.ts`:
   - [ ] TC-PRD-01 Add product (valid): fill five fields → new row appears with entered values
   - [ ] TC-PRD-02 Add product (empty) → validation messages, no row added
   - [ ] TC-PRD-03 Edit product: pre-filled fields, change one value, save → row updated
   - [ ] TC-PRD-04 Delete product: confirm dialog if present → row removed, count decreases by 1
   - [ ] TC-PRD-05 Simulate API errors: add/edit/delete show error state with retry; recovers on retry

**Verify:** `npx cypress run --spec cypress/e2e/product.cy.ts` green.

## Phase 6 — Home & navigation

1. [ ] Reuse shared nav locators from `BaseLocators`; small home coordinator (or extend an existing page) for CTA
2. [ ] `cypress/e2e/home.cy.ts`:
   - [ ] TC-HOME-01 Nav bar: each nav button lands on the correct route and heading
   - [ ] TC-HOME-02 CTA: "Open product manager" navigates to `/products`

**Verify:** full suite green — `npm run test` (all specs) + `npm run typecheck && npm run lint`.

---

## Definition of done (per test case)

1. Locators, actor(s), validator(s), coordinator wired per architecture rules — one file each; journey code never mixes with action code.
2. Test passes via `npx cypress run --spec <spec>` and the full suite stays green.
3. Observed app behavior that differed from assumption is recorded back in `docs/site-notes.md`.

## Status

- Phase 0: complete (2026-10-07) — scaffolding, config, docs ported, smoke spec green
- Phase 1: complete (2026-10-07) — base classes (`i-page`, `page-factory`, `base-*`) and raw actions in `src/framework/base/`
- Phase 2: complete (2026-10-08) — UI Elements basic-elements stack + `ui-elements.cy.ts` green (TC-UIE-01/02/03); stopping for review before Phase 3
- Phase 3: complete (2026-10-09) — selection controls (dropdown/slider/toggle/date picker) + composite widgets (text area/file upload) implemented and verified against the live DOM; `ui-elements.cy.ts` covers TC-UIE-04..09 (17 tests total in spec, 18 with smoke, all green); color picker/time picker absent from the page, range input = slider (recorded in site-notes + test-plan). New actions: `set-value`, `attach-file`, `clear-field`, `element-exists`; `setChecked` gained `{ force: true }` for the CSS-hidden switch
- Phase 4: item 1 done (2026-10-09) — forms stack (`src/framework/pages/forms/`, 5 files, 30 coordinator verify methods) verified live via temporary driver spec (8/8) + full suite 18/18 green; 32 observed messages probed and recorded in site-notes; stopping for review before item 2 (`form.cy.ts`)
- Phases 5–6: pending
