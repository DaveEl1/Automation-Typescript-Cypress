# Site Notes — Reach Catalog (http://localhost:5173/)

Local SPA with four client-side sections, reachable via the top nav bar. All routes are path-based (`/`, `/products`, `/forms`, `/ui-elements`). Verified by probing the live site on 2026-09-19.

## Shared chrome (all pages)

Nav buttons — **no `data-testid` or ids**, locate by role + name:

| Button | Navigates to |
|---|---|
| `Reach Catalog` (brand, leftmost) | `/` (Home) |
| `Home` | `/` |
| `Products` | `/products` |
| `Forms` | `/forms` |
| `UI Elements` | `/ui-elements` |

## Home (`/`)

- `h1.hero-title` — "Reach Catalog".
- CTA: `button.btn-primary` "Open product manager" → navigates to `/products`.
- Feature grid with 4 cards (Read / Create / Update / Delete) describing the Products section. No interactive elements beyond nav + CTA.

## Products (`/products`)

**No `data-testid`s on this page — use ids, roles, and text.**

- Toolbar: checkbox inside `label.error-toggle`, label "Simulate API errors" (no id). Toggles mock API failures; home copy promises loading/error states with retry.
- Add-product form (`form.product-form`, **`novalidate`** — validation is app-side):
  - `#product-name` (text, placeholder "Wireless Mouse")
  - `#product-sku` (text, placeholder "WM-001")
  - `#product-category` (text, placeholder "General")
  - `#product-price` (number, placeholder "24.99")
  - `#product-stock` (number, placeholder "120")
  - Buttons: `Cancel`, `Add product` (`type=submit`)
- Product table (`table.product-table`), seeded with 4 rows — Name / SKU / Category / Price / Stock + per-row actions in `td.row-actions`:

| Name | SKU | Category | Price | Stock |
|---|---|---|---|---|
| Wireless Mouse | WM-001 | Accessories | $24.99 | 120 |
| Mechanical Keyboard | MK-014 | Accessories | $89.50 | 35 |
| USB-C Cable (2 m) | UC-2M | Cables | $12.00 | 300 |
| Laptop Stand | LS-100 | Furniture | $45.00 | Out of stock |

- Each row has `Edit` and `Delete` buttons (no ids — locate by role + name within the row).

## Forms (`/forms`)

**Every field has an id; the Create account form additionally exposes `data-testid`s (`registration-form`, per-field testids, `create-account-button`, `registration-result`). All forms are `novalidate`** — validation messages come from app code, not native browser bubbles. Sections grouped under `h2`: Authentication / Data Entry / Transactions / Feedback & Preferences. Each form is a `section.ui-element-block` with an `h3` title and a submit button (verified 2026-10-01; earlier notes said `form-section`).

| Form (h3) | Fields | Submit |
|---|---|---|
| Sign in | `#login-email`, `#login-password`, `#login-remember` (checkbox). Hint: any email + password ≥ 8 chars works. | "Sign in" |
| Create account | `#reg-name`, `#reg-email`, `#reg-password`, `#reg-confirm` — all required. | "Create account" |
| Contact us | `#contact-name`, `#contact-email`, `#contact-subject` (select: General/Billing/Support/Feedback), `#contact-message` (textarea). | "Send message" |
| Public profile | `#profile-first-name`, `#profile-last-name`, `#profile-bio` (optional textarea). | "Save profile" |
| Choose a plan | Radio group `subscription-plan` (basic / **pro** checked / enterprise), radio group `subscription-cycle` (**monthly** checked / yearly), `#sub-email`. | "Subscribe" |
| Card payment | `#pay-cardholder`, `#pay-card-number`, `#pay-expiry` (MM/YY), `#pay-cvc`. Hint: try 4242 4242 4242 4242. | "Pay $49.00" |
| Shipping details | `#checkout-name`, `#checkout-address`, `#checkout-city`, `#checkout-postal`. | "Place order" |
| Quick survey | Radio group `survey-rating` (1–5), radio group `survey-recommend` (yes/no), `#survey-comments` (optional). | "Submit survey" |
| Account settings | `#settings-username`, `#settings-theme` (select: Light/Dark/**System**), checkboxes `#settings-notif-email` (checked), `#settings-notif-sms`, `#settings-notif-push` (checked). | "Save settings" |
| Search & filter | `#search-query`, `#search-category` (select: All/Electronics/Accessories/Apparel/Home), `#search-min-price`, `#search-max-price`, `#search-instock` (checkbox). | "Apply filters" |

Observed Create account behavior (verified 2026-10-01): result box is `[data-testid=registration-result]`, rendered as `.output-box.success` or `.output-box.error` with `role=status`. Valid submit → `"Account created for {name}."`; empty submit → `"Full name is required."` (validation stops at the first failing field); short password → `"Password must be at least 8 characters."`; mismatched confirm → `"Passwords do not match."`.

## UI Elements (`/ui-elements`)

**Every control and its output box has a `data-testid`.** Layout: three groups under `h2` — Basic Elements, Selection Controls, Composite Widgets. Each block is a `section.ui-element-block` with an `h3` title, the control(s), and a live output box (`p.output-box`) that renders as `Output: <value>` (empty value → `Output: `; the Text Area block instead shows `<n> characters`).

### Basic Elements

| Block (h3) | Control | Output box |
|---|---|---|
| Text Field (Input Box) | `input#textField[data-testid=ui-text-field]`, placeholder "Type here" | `[data-testid=ui-output-text-field]` — mirrors typed text live; verified: typing "Hello World 123" yields `Output: Hello World 123` |
| Text Area | `textarea[data-testid=ui-text-area]` rows 4, placeholder "Write a message..." | `[data-testid=ui-output-text-area]` — shows `<n> characters` (character count of the entered value), not an echo of the text; verified: typing "Hello World 123" yields `15 characters` |
| Number Input | `input#numberField[data-testid=ui-number-input]` type number, min 0 max 100 step 1, default 50 | `[data-testid=ui-output-number-input]` |
| Password Field | `input#passwordField[data-testid=ui-password-field]` type password | `[data-testid=ui-output-password-field]` |
| Checkbox | `input#checkboxToggle[data-testid=ui-checkbox-toggle]`, checked by default, label "Enable notifications" | `[data-testid=ui-output-checkbox-toggle]` |
| Radio Buttons | group `name=ui-radio-group`: option-a / **option-b** (checked) / option-c, labels Option A/B/C | `[data-testid=ui-output-radio-group]` |

### Selection Controls

| Block (h3) | Control | Output box |
|---|---|---|
| Dropdown Select | `select#selectDropdown[data-testid=ui-select-dropdown]`: **Fruit** / Vegetable / Dairy / Meat | `[data-testid=ui-output-select-dropdown]` |
| Slider | `input#sliderRange[data-testid=ui-slider-range]` range 0–100, default 50 | `[data-testid=ui-output-slider-range]` |
| Toggle Switch | `input#toggleSwitch[data-testid=ui-toggle-switch]` type checkbox, checked, `role=switch`, label "Dark mode" | `[data-testid=ui-output-toggle-switch]` |
| Date Picker | `input#datePicker[data-testid=ui-date-picker]` type date, default 2024-01-15 | `[data-testid=ui-output-date-picker]` |

### Composite Widgets

| Block (h3) | Control | Output box |
|---|---|---|
| Color Picker | `input#colorPicker[data-testid=ui-color-picker]` type color, default #3b82f6 | `[data-testid=ui-output-color-picker]` |
| File Upload | `input#fileUpload[data-testid=ui-file-upload]` type file, accept `.txt,.csv,.json`, button "Choose file" | `[data-testid=ui-output-file-upload]` |
| Range Input | `input#rangeInput[data-testid=ui-range-input]` range 0–10, default 5 | `[data-testid=ui-output-range-input]` |
| Time Picker | `input#timePicker[data-testid=ui-time-picker]` type time, default 12:30 | `[data-testid=ui-output-time-picker]` |

## Locator strategy notes

- **UI Elements**: prefer `data-testid` (stable, unique per control and output box).
- **Products / Forms**: mostly no testids (the Create account form is the exception) — use element ids (`#product-name`, `#login-email`, …), roles + accessible names for buttons/links, and row-scoped locators for table actions.
- Nav bar: role + name only.
- All forms are `novalidate`: expect app-rendered validation messages (exact text captured per test case as implemented; see the observed-behavior notes above each section).
