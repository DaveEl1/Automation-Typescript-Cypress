# Test Plan — Reach Catalog (http://localhost:5173/)

Scope: the four client-side sections only — Home, Products, Forms, UI Elements. See `docs/site-notes.md` for locators and observed behavior.

## Conventions

- One spec file per section under `cypress/e2e/`.
- Tests drive **coordinators** (workflows); they never call raw Cypress actions directly — journey code stays independent of action code.
- Locators: prefer `data-testid` where present (UI Elements), ids otherwise; role + name for buttons/nav.
- Test case IDs: `TC-<SECTION>-NN`. Statuses: pending / in progress / done.

## Phases

### Phase 0 — Scaffolding & smoke test

npm scaffolding, TypeScript strict setup, Cypress config, folder skeleton, docs ported from the reference project, browser-launch + homepage-load smoke spec (`cypress/e2e/smoke.cy.ts`).

### Phase 1 — Base classes & actions (`src/framework/base/`)

`validation-result.ts`, `base-locators.ts`, `i-page.ts`, `page-factory.ts`, `base-page.ts`, `base-actor.ts`, `base-validator.ts`, `base-coordinator.ts`, plus one file per raw action in `src/framework/base/actions/`. Verified by typecheck + lint only (no specs yet).

### Phase 2 — UI Elements: Basic Elements

| ID        | Block                  | Steps                                                         | Expected                                                                                    | Status          |
| --------- | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------- |
| TC-UIE-01 | Text Field (Input Box) | Open `/ui-elements`; type a known string into `ui-text-field` | Output box (`ui-output-text-field`) contains the entered text, rendered as `Output: <text>` | done 2026-10-08 |
| TC-UIE-02 | Checkbox               | Toggle checkbox off, then on                                  | Output tracks checked state both ways                                                       | done 2026-10-08 |
| TC-UIE-03 | Radio Buttons          | Select each option in turn                                    | Output shows the selected option label/value                                                | done 2026-10-08 |

### Phase 3 — UI Elements: Selection Controls & Composite Widgets

Dropdown select, slider, toggle switch, date picker (Selection Controls); color picker, file upload, textarea, range input, time picker (Composite Widgets). One test case per block, same pattern as Phase 2: set the control → assert its output box. File upload needs a fixture file (`.txt`).

| ID        | Block           | Steps                                                                   | Expected                                                                         | Status               |
| --------- | --------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------- |
| TC-UIE-04 | Dropdown select | Choose each country in turn, then reset to the placeholder              | `Output: <country>` each time; `Output: No option selected` after reset          | done 2026-10-09      |
| TC-UIE-05 | Slider          | Set a mid-range value; then set min and max                             | `Value: <n>` reflects each value                                                 | done 2026-10-09      |
| TC-UIE-06 | Toggle switch   | Turn on then off; toggle rapidly three times                            | `Output: On` / `Output: Off` tracks the switch state                             | done 2026-10-09      |
| TC-UIE-07 | Date picker     | Pick a date, then clear the input                                       | `Selected date: <yyyy-mm-dd>`; `No date selected` after clearing                 | done 2026-10-09      |
| TC-UIE-08 | Text area       | Type a known string, then clear the field                               | `<n> characters` matches the typed length; `0 characters` after clearing         | done 2026-10-09      |
| TC-UIE-09 | File upload     | Attach `cypress/fixtures/upload-note.txt`, then click "Clear files"     | List shows `<name> (<size> KB)` + clear button appears; list gone after clearing | done 2026-10-09      |
| —         | Color picker    | Control does not exist on the page (no `input[type=color]`)             | —                                                                                | n/a                  |
| —         | Range input     | Same control as the Slider (`input[type=range]`) — covered by TC-UIE-05 | —                                                                                | covered by TC-UIE-05 |
| —         | Time picker     | Control does not exist on the page (no `input[type=time]`)              | —                                                                                | n/a                  |

### Phase 4 — Forms

Validation-focused; all forms are `novalidate`, so expected messages come from app code and must be captured empirically first.

| ID        | Form             | Focus                                                                                                         | Status          |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-FRM-01 | Sign in          | Valid credentials (any email + password ≥ 8) succeed; short/empty password shows validation message           | done 2026-10-09 |
| TC-FRM-02 | Create account   | Submit empty → required-field messages; short password and mismatched confirm rejected; valid submit succeeds | done 2026-10-09 |
| TC-FRM-03 | Contact us       | Required fields enforced; subject select defaults to General                                                  | done 2026-10-09 |
| TC-FRM-04 | Choose a plan    | Defaults (pro/monthly) reflected in output/confirmation after subscribe                                       | done 2026-10-09 |
| TC-FRM-05 | Card payment     | Invalid card number rejected; 4242 4242 4242 4242 accepted per hint                                           | done 2026-10-09 |
| TC-FRM-06 | Quick survey     | Rating + recommendation required; optional comments skipped                                                   | done 2026-10-09 |
| TC-FRM-07 | Account settings | Save persists checkbox/select state in output/confirmation                                                    | done 2026-10-09 |
| TC-FRM-08 | Search & filter  | Filters apply without error (no results table on this page — assert app feedback)                             | done 2026-10-09 |

### Phase 5 — Products CRUD

| ID        | Scenario                    | Focus                                                                                                          | Status  |
| --------- | --------------------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| TC-PRD-01 | Add product (valid)         | Fill all five fields, submit → new row appears in `table.product-table` with entered values                    | pending |
| TC-PRD-02 | Add product (invalid/empty) | Submit empty form → app-side validation messages; no row added                                                 | pending |
| TC-PRD-03 | Edit product                | Row-scoped `Edit` → fields pre-filled, change one value, save → row updated                                    | pending |
| TC-PRD-04 | Delete product              | Row-scoped `Delete` (confirm dialog if present) → row removed; count decreases by 1                            | pending |
| TC-PRD-05 | Simulate API errors         | Toggle "Simulate API errors", perform add/edit/delete → error state with retry appears, then recovers on retry | pending |

### Phase 6 — Home & navigation

| ID         | Scenario | Focus                                                  | Status  |
| ---------- | -------- | ------------------------------------------------------ | ------- |
| TC-HOME-01 | Nav bar  | Each nav button lands on the correct route and heading | pending |
| TC-HOME-02 | CTA      | "Open product manager" navigates to `/products`        | pending |

## Definition of done (per test case)

1. Locators, actor(s), validator(s), coordinator wired per architecture rules (one file each; no mixing journey code with action code).
2. Test passes via `npx cypress run --spec cypress/e2e/<spec>.cy.ts`.
3. Observed app behavior that differed from assumption is recorded back in `docs/site-notes.md`.
