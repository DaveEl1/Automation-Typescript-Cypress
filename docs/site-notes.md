# Site Notes — Reach Catalog (http://localhost:5173/)

Local SPA with four client-side sections, reachable via the top nav bar. Verified by probing the live site on 2026-09-19; selection controls re-verified against the live DOM on 2026-10-09.

**No client-side router**: the active section is React state, not the URL — nav clicks don't change the path, and `cy.visit('/ui-elements')` renders Home. Reach a section by visiting `/` and then clicking its nav `data-testid` (what `BasePage.goToSection()` does).

## Shared chrome (all pages)

Nav buttons — each has a `data-testid`:

| Button                            | `data-testid`     | Navigates to   |
| --------------------------------- | ----------------- | -------------- |
| `Reach Catalog` (brand, leftmost) | `site-brand`      | `/` (Home)     |
| `Home`                            | `nav-home`        | `/`            |
| `Products`                        | `nav-products`    | `/products`    |
| `Forms`                           | `nav-forms`       | `/forms`       |
| `UI Elements`                     | `nav-ui-elements` | `/ui-elements` |

## Home (`/`)

- `h1.hero-title` — "Reach Catalog".
- CTA: `button.btn-primary[data-testid=home-browse-products]` "Open product manager" → navigates to `/products`.
- Feature grid with 4 cards (Read / Create / Update / Delete) describing the Products section. No interactive elements beyond nav + CTA.

## Products (`/products`)

**Most controls have `data-testid`s.**

- Toolbar: checkbox inside `label.error-toggle`, label "Simulate API errors" (no id). Toggles mock API failures; home copy promises loading/error states with retry.
- Status banner: `[data-testid=products-status-loading]` while loading, `[data-testid=products-status-error]` on error with a `[data-testid=retry-load-products]` retry button.
- Add-product form (`form.product-form[data-testid=product-form]`, **`novalidate`** — validation is app-side):
  - `[data-testid=product-name]` (text, placeholder "Wireless Mouse")
  - `[data-testid=product-sku]` (text, placeholder "WM-001")
  - `[data-testid=product-category]` (text, placeholder "General")
  - `[data-testid=product-price]` (number, placeholder "24.99")
  - `[data-testid=product-stock]` (number, placeholder "120")
  - Buttons: `[data-testid=product-cancel]` "Cancel", `[data-testid=product-submit]` "Add product" (`type=submit`)
- Product table (`table.product-table[data-testid=product-table]`), seeded with 4 rows — Name / SKU / Category / Price / Stock + per-row actions in `td.row-actions`:

| Name                | SKU    | Category    | Price  | Stock        |
| ------------------- | ------ | ----------- | ------ | ------------ |
| Wireless Mouse      | WM-001 | Accessories | $24.99 | 120          |
| Mechanical Keyboard | MK-014 | Accessories | $89.50 | 35           |
| USB-C Cable (2 m)   | UC-2M  | Cables      | $12.00 | 300          |
| Laptop Stand        | LS-100 | Furniture   | $45.00 | Out of stock |

- Each row has `Edit` and `Delete` buttons (no ids — locate by role + name within the row).
- Empty state: `[data-testid=products-empty]` shown when no products exist.
- Confirm dialog (delete): `[data-testid=confirm-dialog]` with `[data-testid=confirm-title]`, `[data-testid=confirm-message]`, `[data-testid=confirm-action]` (confirm), `[data-testid=confirm-cancel]`, and `[data-testid=confirm-error]`.

## Forms (`/forms`)

**Every form and most fields have `data-testid`s.** All forms are `novalidate`** — validation messages come from app code, not native browser bubbles. Sections grouped under `h2`: Authentication / Data Entry / Transactions / Feedback & Preferences. Each form is a `section.ui-element-block` with an `h3` title and a submit button (verified 2026-10-01; earlier notes said `form-section`).

| Form (h3)        | Form testid         | Fields (testids)                                                                                                                                                           | Submit testid           |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Sign in          | —                   | `ui-text-field` (email), `ui-text-field` (password), `ui-checkbox` (remember me). Hint: any email + password ≥ 8 chars works.                                              | `ui-button`             |
| Create account   | `registration-form` | `reg-name`, `reg-email`, `reg-password`, `reg-confirm` — all required.                                                                                                     | `create-account-button` |
| Contact us       | —                   | `ui-text-field` (name), `ui-text-field` (email), `ui-select` (subject: General/Billing/Support/Feedback), `ui-textarea` (message).                                         | `ui-button`             |
| Public profile   | `profile-form`      | `profile-first-name`, `profile-last-name`, `profile-bio` (optional textarea).                                                                                              | `update-profile-button` |
| Choose a plan    | `subscription-form` | Radio group `subscription-plan-group` (basic / **pro** checked / enterprise), radio group `subscription-cycle-group` (**monthly** checked / yearly), `subscription-email`. | `subscribe-button`      |
| Card payment     | —                   | `ui-text-field` (cardholder), `ui-text-field` (card number), `ui-text-field` (expiry MM/YY), `ui-text-field` (CVC). Hint: try 4242 4242 4242 4242.                         | `ui-button`             |
| Shipping details | —                   | `ui-text-field` (name), `ui-text-field` (address), `ui-text-field` (city), `ui-text-field` (postal).                                                                       | `ui-button`             |
| Quick survey     | `survey-form`       | Radio group `survey-rating-group` (1–5), radio group `survey-recommend-group` (yes/no), `survey-comments` (optional).                                                      | `submit-survey-button`  |
| Account settings | `settings-form`     | `settings-username`, `settings-theme` (select: Light/Dark/**System**), checkboxes `settings-notif-email` (checked), `settings-notif-sms`, `settings-notif-push` (checked). | `save-settings-button`  |
| Search & filter  | —                   | `search-query`, `search-category` (select: All/Electronics/Accessories/Apparel/Home), `search-min-price`, `search-max-price`, `search-in-stock` (checkbox).                | `apply-filters-button`  |

Result boxes: `registration-result`, `subscription-result`, `survey-result`, `settings-result`, `profile-result`, `search-result` — rendered as `.output-box.success` or `.output-box.error` with `role=status`.

Observed Create account behavior (verified 2026-10-01): result box is `[data-testid=registration-result]`. Valid submit → `"Account created for {name}."`; empty submit → `"Full name is required."` (validation stops at the first failing field); short password → `"Password must be at least 8 characters."`; mismatched confirm → `"Passwords do not match."`.

## UI Elements (`/ui-elements`)

**Most controls and output boxes have `data-testid`s.** Layout: three groups under `h2` — Basic Elements, Interactive Elements, Feedback & Navigation. Each block is a `section.ui-element-block` with an `h3` title, the control(s), and a live output box (`p.output-box`) that renders as `Output: <value>` (empty value → `Output: `; the Text Area block instead shows `<n> characters`; the Radio group block instead renders as `Selected: <label>`).

### Basic Elements

| Block (h3)             | Control                                                                                                                                                                                                                          | Output box                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Text Field (Input Box) | `input#textField[data-testid=ui-text-field]`, placeholder "Type here"                                                                                                                                                            | `[data-testid=ui-text-field-output]` — mirrors typed text live                                                          |
| Text Area              | `textarea[data-testid=ui-text-area]` rows 4, placeholder "Write a message..."                                                                                                                                                    | `[data-testid=ui-text-area-output]` — shows `<n> characters` (default `0 characters`; never pluralized: `1 characters`) |
| Click Counter          | `button[data-testid=ui-click-counter-button]`                                                                                                                                                                                    | `[data-testid=ui-click-counter-output]`                                                                                 |
| Checkbox               | `input#ui-single-checkbox[data-testid=ui-single-checkbox]`, unchecked by default, label "Single Option"                                                                                                                          | `[data-testid=ui-single-checkbox-output]` — shows `Output: Checked` / `Output: Unchecked`                               |
| Multi Checkboxes       | checkboxes for Option A / Option B / Option C                                                                                                                                                                                    | `[data-testid=ui-multi-checkboxes-output]`                                                                              |
| Radio Buttons          | fieldset legend "Billing period" (`name=billing-period`): `ui-radio-monthly` (**Monthly**, checked by default) / `ui-radio-quarterly` (Quarterly) / `ui-radio-annual` (Annual); values and labels are Monthly, Quarterly, Annual | `[data-testid=ui-radio-group-output]` — shows `Selected: <label>`                                                       |
| Single Select Dropdown | `select#singleDropdown[data-testid=ui-single-dropdown]`, placeholder "Select a country": **US** / Canada / UK / India / Australia                                                                                                | `[data-testid=ui-output-single-dropdown]` — shows `Output: <country>`, default `Output: No option selected`             |
| Multi Select Dropdown  | `select[data-testid=ui-multi-select-dropdown]` with checkboxes                                                                                                                                                                   | `[data-testid=ui-multi-select-dropdown-output]`                                                                         |

### Interactive Elements

| Block (h3)    | Control                                                                                                                                                                                                                                   | Output box                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle Switch | `input#ui-toggle-switch[data-testid=ui-toggle-switch]` type checkbox, **unchecked by default**, inside `label.switch`; the native input is CSS-hidden (`opacity: 0; width: 0; height: 0`), so Cypress interaction needs `{ force: true }` | `[data-testid=ui-output-toggle-switch]` — `Output: On` / `Output: Off`                                                                                                                                                                                                       |
| Slider        | `input[data-testid=ui-slider]` (no id) range 0–100, default 50                                                                                                                                                                            | `[data-testid=ui-slider-output]` — `Value: <n>`                                                                                                                                                                                                                              |
| Date Picker   | `input[data-testid=ui-date-input]` type date, **empty by default**                                                                                                                                                                        | `[data-testid=ui-date-output]` — `Selected date: <yyyy-mm-dd>` / `No date selected`                                                                                                                                                                                          |
| File Upload   | `input[data-testid=ui-file-upload]` type file, `multiple`; **no id and no `accept` restriction**; the "Choose file"/"No file chosen" text is browser chrome, not app UI. While no file is chosen there is no other UI                     | — (no output box). After ≥1 file: `ul[data-testid=ui-file-upload-list]` with `li[data-testid=ui-file-upload-item-<i>]` → `<name> (<size> KB)`, plus `button[data-testid=ui-file-upload-clear-button]` "Clear files"; both disappear again when cleared (verified 2026-10-09) |
| Modal Dialog  | `button[data-testid=ui-modal-open-button]`, dialog `[data-testid=ui-modal-dialog]`, overlay `[data-testid=ui-modal-overlay]`, close `button[data-testid=ui-modal-close-button]`                                                           | —                                                                                                                                                                                                                                                                            |
| Accordion     | accordion headers/sections                                                                                                                                                                                                                | —                                                                                                                                                                                                                                                                            |
| Tabs          | tab buttons                                                                                                                                                                                                                               | `[data-testid=ui-tabs-output]`                                                                                                                                                                                                                                               |

### Feedback & Navigation

| Block (h3)   | Control                                                                                                        | Output box                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Progress Bar | `div[data-testid=ui-progress-bar]`, `button[data-testid=ui-progress-start-button]`                             | `[data-testid=ui-progress-value]`    |
| Star Rating  | star buttons                                                                                                   | —                                    |
| Pagination   | `button[data-testid=ui-pagination-prev-button]`, `button[data-testid=ui-pagination-next-button]`               | `[data-testid=ui-pagination-output]` |
| Data Table   | sortable headers `button[data-testid=ui-data-table-sort-name]`, `button[data-testid=ui-data-table-sort-price]` | —                                    |
| Search Input | `input[data-testid=ui-search-input]`                                                                           | `[data-testid=ui-search-results]`    |
| Toast        | `button[data-testid=ui-toast-button]`                                                                          | —                                    |
| Tooltip      | `span[data-testid=ui-tooltip-trigger]`                                                                         | —                                    |

**Not present on the page** (verified against the live source 2026-10-09): there is no color picker and no time picker in this section (no `input[type=color]` / `input[type=time]` anywhere in the app), and the only `type="range"` control is the Slider listed above — the test plan's "range input" block is that same control.

## Locator strategy notes

- **Nav bar**: `data-testid` on every button (`site-brand`, `nav-home`, `nav-products`, `nav-forms`, `nav-ui-elements`).
- **Home**: `data-testid=home-browse-products` on the CTA button.
- **Products**: `data-testid` on all form fields, buttons, table, status banners, and confirm dialog.
- **UI Elements**: `data-testid` on most controls and output boxes.
- **Forms**: `data-testid` on all form fields, buttons, and result boxes.
- All forms are `novalidate`: expect app-rendered validation messages (exact text captured per test case as implemented; see the observed-behavior notes above each section).
