cat > /mnt/user-data/outputs/UI_PATTERN_REGISTRY.md << 'ENDOFFILE'
# UI Pattern Registry

**Version:** 1.0
**Status:** Architectural Blueprint
**Source:** Synthesized from UI Audit + STYLING_ARCHITECTURE.md

This registry defines the canonical set of reusable UI patterns for the POS system. Each pattern represents a discrete, reusable building block that must be implemented once in the component layer and consumed everywhere. No pattern defined here should be re-implemented at the page level.

All patterns in this registry must conform to the STYLING_ARCHITECTURE rules:
- Tokens only — no hardcoded colors, spacing, or typography values
- Mobile-first — default styles target mobile; breakpoints enhance upward
- Utility-first composition — utilities are preferred over repetitive component CSS
- Low specificity — no `!important`, no ID selectors, no deep nesting
- Component isolation — no page dependencies, no cross-component style leakage

---

## Pattern Index

| # | Pattern | Layer | Target File | Migration Priority |
|---|---------|-------|-------------|-------------------|
| L-01 | Standard Page Layout | Layout | `app-shell.css` | Critical |
| L-02 | Dashboard Layout | Layout | `app-shell.css` | High |
| N-01 | Sidebar Navigation | Layout | `sidebar.css` | Critical |
| N-02 | Topbar | Layout | `topbar.css` | Critical |
| T-01 | Standard CRUD Table | Component | `tables.css` | Critical |
| T-02 | Mobile Table / Card Transformation | Component | `tables.css` | High |
| F-01 | Standard CRUD Form | Component | `forms.css` | Critical |
| F-02 | Modal Form | Component | `forms.css` | Critical |
| M-01 | Standard Modal | Component | `modals.css` | Critical |
| M-02 | Confirmation Modal | Component | `modals.css` | High |
| B-01 | Primary Action Button | Component | `buttons.css` | Critical |
| B-02 | Secondary Button | Component | `buttons.css` | Critical |
| B-03 | Danger Button | Component | `buttons.css` | High |
| B-04 | Icon Button | Component | `buttons.css` | Medium |
| B-05 | Filter / Tag Button | Component | `buttons.css` | Medium |
| S-01 | Standard Filter Bar | Component | `forms.css` | High |
| S-02 | Search Input with Dropdown | Component | `forms.css` | High |
| P-01 | POS Product Grid | Page | `pos.css` | Critical |
| P-02 | Cart Item Row | Component | `cart.css` | Critical |
| P-03 | Checkout / Totals Panel | Component | `cart.css` | Critical |
| P-04 | Payment Method Selector | Component | `cart.css` | High |
| P-05 | Payment Amount Input | Component | `cart.css` | High |
| P-06 | Receipt Display | Component | `cart.css` | High |
| NT-01 | Toast Notification | Component | `toast.css` | Critical |
| R-01 | Sidebar Collapse | Responsive | `sidebar.css` | Critical |
| R-02 | Table Stack / Card Pattern | Responsive | `tables.css` | High |
| R-03 | POS Split / Stack Layout | Responsive | `pos.css` | Critical |
| C-01 | Page Header | Component | `cards.css` | Critical |
| C-02 | Content Card | Component | `cards.css` | Critical |
| C-03 | Empty State | Component | `cards.css` | High |
| C-04 | Loading Overlay | Component | `cards.css` | High |
| C-05 | Info / Detail Row | Component | `cards.css` | Medium |
| C-06 | Status Badge | Component | `cards.css` | Medium |

---

## Layout Patterns

---

### L-01 — Standard Page Layout

**Used In:**
- `categories.html`, `units.html`, `products.html`, `sales.html`, `stockMovements.html`, `settings.html` (all CRUD pages)
- Rendered via `renderAppShell()` in `app.html`

**Responsibilities:**
- Provides the persistent shell within which all page content renders
- Manages the split between fixed navigation (sidebar) and scrollable content area
- Contains the topbar across all pages
- Ensures consistent content padding and overflow behavior at all breakpoints

**Shared Structure:**
```
[App Shell]
  ├── [Sidebar]          — fixed, persistent on desktop; drawer on mobile
  ├── [Main Area]
  │     ├── [Topbar]     — sticky, full-width within main area
  │     └── [Page Content]
  │           ├── [Page Header — C-01]
  │           └── [Content Card — C-02]
  │                 └── [Table — T-01] or [Form — F-01] or [Settings Content]
```

**Token Dependencies:**
- `--color-bg-surface` — page background
- `--space-4`, `--space-6` — content area padding
- `--bp-tablet`, `--bp-desktop` — layout shift breakpoints
- `--z-sidebar`, `--z-topbar` — stacking context

**Responsive Behavior:**
- Mobile (< `--bp-tablet`): sidebar hidden, content occupies full width, topbar spans full width
- Tablet (`--bp-tablet` to `--bp-desktop`): sidebar may persist or remain drawer depending on content density requirement
- Desktop (> `--bp-desktop`): sidebar fixed at 256px, content area fills remainder

**Migration Notes:**
The current `renderAppShell()` function in `app.html` renders the sidebar and topbar twice — once for each of its mobile/desktop conditional branches. The target architecture renders a single DOM structure; responsive behavior is handled entirely in CSS. The duplicate HTML branches must be collapsed into one.

**Migration Priority:** Critical — blocks all other layout work

---

### L-02 — Dashboard Layout

**Used In:**
- `dashboard.html`

**Responsibilities:**
- Provides a multi-column grid for stat cards and chart panels
- Manages the responsive collapse of side-by-side charts into a stacked column layout
- Contains a recent transactions table below the charts section

**Shared Structure:**
```
[Dashboard Page Content]
  ├── [Stats Row]        — 4-column grid, collapses to 2-col on tablet, 1-col on mobile
  ├── [Charts Row]       — 2-column grid, collapses to 1-col on tablet
  ├── [Low Stock Table]  — standard CRUD table pattern (T-01)
  └── [Recent Sales Table] — standard CRUD table pattern (T-01)
```

**Token Dependencies:**
- `--space-4`, `--space-6` — grid gaps
- `--bp-tablet`, `--bp-desktop` — grid collapse breakpoints
- `--color-bg-card` — card backgrounds
- `--radius-xl` — card border radius

**Responsive Behavior:**
- Mobile: all sections stack in a single column
- Tablet: stats become 2-column, charts remain single column
- Desktop: stats become 4-column, charts become 2-column

**Migration Priority:** High

---

## Navigation Patterns

---

### N-01 — Sidebar Navigation

**Used In:**
- `sidebar.html` (component)
- Consumed by `app.html` shell on every page

**Responsibilities:**
- Renders the primary navigation links for all application sections
- Manages open/closed state on mobile (drawer behavior)
- Provides a logout action
- Indicates the currently active page

**Shared Structure:**
```
[Sidebar]
  ├── [Sidebar Header]   — app name / logo
  ├── [Nav List]
  │     └── [Nav Item]   — icon + label, active state variant
  └── [Sidebar Footer]
        └── [Logout Button — B-03 variant]
```

**Token Dependencies:**
- `--color-sidebar-bg` — sidebar background (`#111827`)
- `--color-sidebar-text` — nav item text
- `--color-sidebar-hover` — nav item hover surface
- `--color-sidebar-active` — active nav item indicator
- `--space-3`, `--space-4` — nav item padding
- `--text-sm` — nav label size
- `--radius-md` — nav item corner radius
- `--z-sidebar` — stacking context for mobile drawer

**Active State:**
The current implementation has no active state highlighting. The target component must read `State.currentPage` and apply an `.nav-item--active` modifier class to the matching nav item.

**Icon System:**
Current implementation uses emoji icons. The target component must use SVG icons with `aria-hidden="true"`. An icon registry should be defined separately from the nav item list.

**Responsive Behavior:**
- Desktop (> `--bp-tablet`): sidebar renders as a fixed 256px column in the app shell flex layout
- Mobile (< `--bp-tablet`): sidebar renders as a full-height overlay drawer, hidden by default, toggled via the topbar hamburger button; an overlay mask covers the content area when the drawer is open

**Current Problems:**
- Emoji icons: inconsistent rendering, inaccessible to screen readers
- No active state: users have no visual confirmation of current location
- Duplicate render: sidebar HTML is produced twice by the conditional shell branches
- Transition: sidebar open/close has no CSS transition

**Migration Priority:** Critical

---

### N-02 — Topbar

**Used In:**
- `topbar.html` (component)
- Rendered inside the main content area of the app shell on every page

**Responsibilities:**
- Displays the name of the current page
- Renders the hamburger menu toggle on mobile
- Displays the current user's name
- Provides a logout button shortcut (desktop)

**Shared Structure:**
```
[Topbar]
  ├── [Left: Hamburger Button]   — visible on mobile only
  ├── [Center/Left: Page Title]  — sourced from State.currentPage
  └── [Right: User / Actions]
        ├── [User Name]
        └── [Logout Button — B-03 variant]
```

**Token Dependencies:**
- `--color-topbar-bg` — topbar background (`#ffffff`)
- `--color-topbar-shadow` — bottom shadow
- `--color-topbar-text` — page title color
- `--text-lg` — page title size
- `--space-3`, `--space-4` — horizontal padding
- `--z-topbar` — stacking context

**Responsive Behavior:**
- Mobile: hamburger button is visible; logout may be hidden (accessible via sidebar)
- Desktop: hamburger button is hidden; user name and logout are always visible

**Current Problems:**
- Inline SVG for hamburger icon should be replaced with icon component
- Empty string shown when `State.user` is not yet loaded — should fall back to a default label
- Page title hardcodes "POS" as fallback — should use a configurable value

**Migration Priority:** Critical

---

## Table Patterns

---

### T-01 — Standard CRUD Table

**Used In:**
- `categories.controller.html` — categories listing
- `units.controller.html` — units listing
- `products.html` — products listing (implied)
- `sales.html` — sales listing (implied)
- `stockMovements.html` — stock movements listing (implied)
- `tableService.html` — underlying rendering engine

**Responsibilities:**
- Renders a sortable, paginated, searchable data table
- Provides per-row action links (edit, delete, custom)
- Manages row selection and bulk actions
- Renders an empty state when no data is present
- Renders a loading state while data is fetched
- Renders an error state when the fetch fails

**Shared Structure:**
```
[Table Container — C-02]
  ├── [Table Toolbar]
  │     ├── [Search Input — S-01]
  │     └── [Bulk Action Bar]   — visible when rows are selected
  ├── [Table Element]
  │     ├── [Table Head]        — sortable column headers
  │     └── [Table Body]        — rows with custom cell rendering
  ├── [Empty State — C-03]      — shown when data array is empty
  └── [Pagination Bar]          — page controls, page size selector
```

**Token Dependencies:**
- `--color-table-header-bg` — header row background
- `--color-table-border` — row dividers
- `--color-table-row-hover` — row hover surface
- `--color-primary` — active sort icon, active pagination button
- `--space-3` — cell padding
- `--text-sm` — cell text size
- `--text-xs` — header label size

**Responsive Behavior:**
- Desktop: traditional table layout
- Mobile: transforms to card-per-row layout (see T-02)
- The table container must have `overflow-x: auto` as a fallback for intermediate viewports where the card transformation has not yet triggered

**Column Configuration:**
Each column is defined by a configuration object specifying: key, label, sortable flag, optional render function, and optional alignment. This configuration is the API contract between the table component and the page-level controller.

**Action Links:**
Row-level actions (Edit, Delete) are rendered as text links. Edit uses the primary color token; Delete uses the danger color token. These must use the B-04 (icon button) or a dedicated `.table-action-link` utility — not inline Tailwind color classes.

**Current Problems:**
- Table container wrapper (`bg-white rounded shadow p-4`) is duplicated verbatim across 5 page templates — must be absorbed into the C-02 Card component
- Loading, error, and empty states are managed with ad-hoc string interpolation in each controller — must use C-03 and C-04 components
- Pagination and search bar are embedded inside the table service and cannot be used independently
- No sticky table header
- Checkbox touch targets are approximately 13px — must meet 44px minimum

**Migration Priority:** Critical

---

### T-02 — Mobile Table / Card Transformation

**Used In:**
- All pages that render T-01 on mobile viewports

**Responsibilities:**
- Transforms each table row into a self-contained card on viewports narrower than `--bp-tablet`
- Maintains all row actions (edit, delete) in card context
- Preserves sort and pagination behavior in card layout

**Shared Structure (mobile):**
```
[Card List]
  └── [Row Card]
        ├── [Primary Field]    — large, prominent
        ├── [Secondary Fields] — label: value pairs
        └── [Action Row]       — edit / delete actions
```

**Token Dependencies:**
- `--color-bg-card` — card surface
- `--radius-lg` — card corners
- `--space-4` — card padding
- `--space-2` — field gap within card
- `--text-sm` — secondary field label
- `--text-md` — primary field value

**CSS Strategy:**
The transformation is achieved by hiding `<table>`, `<thead>`, and `<tr>` semantics on mobile and re-displaying each `<td>` as a block element with a `data-label` pseudo-element for the column name. This approach preserves semantic HTML while delivering a card-like visual.

**Responsive Trigger:** `max-width: calc(var(--bp-tablet) - 1px)`

**Current Problems:**
- Zero mobile table handling exists in CRUD pages today — this pattern is entirely absent and must be built from scratch
- Horizontal scroll fallback is the current de facto mobile table behavior, which is unusable for data entry contexts

**Migration Priority:** High

---

## Form Patterns

---

### F-01 — Standard CRUD Form

**Used In:**
- `categories.modal.html` — category create/edit
- `units.modal.html` — unit create/edit
- `products.modal.html` — product create/edit

**Responsibilities:**
- Renders a labeled field set for entity creation and editing
- Manages field-level validation display
- Provides a submit button with loading state
- Resets state on close

**Shared Structure:**
```
[Form]
  ├── [Form Field]       — repeating unit
  │     ├── [Label]
  │     ├── [Input / Select / Textarea]
  │     └── [Field Error Message]   — shown on validation failure
  └── [Form Actions]
        └── [Submit Button — B-01]
```

**Token Dependencies:**
- `--color-input-border` — default input border
- `--color-input-border-focus` — focus ring color (maps to `--color-primary`)
- `--color-input-bg` — input background
- `--color-error` — validation error text and border
- `--space-3` — input padding
- `--space-4` — field vertical gap
- `--radius-md` — input corner radius
- `--text-sm` — label text
- `--text-md` — input text

**Field Types Covered:**
- `<input type="text">` — name fields
- `<input type="number">` — price, stock, quantity fields
- `<select>` — unit, category dropdowns
- `<textarea>` — description fields

**Focus State:**
All interactive form elements must share a single focus ring definition using `--color-primary` as the border color. The current codebase defines three separate focus-border-color rules for different input types; these must be unified into a single `.form-input:focus` rule.

**Validation:**
Validation error messages render below the input with `--color-error` text. The input border changes to `--color-error` when the field is in an error state.

**Current Problems:**
- `w-full border p-3 rounded` repeated 10+ times across modal form templates — must be replaced by a single `.form-input` class
- Submit button padding inconsistent (py-2 vs py-3) between page and modal contexts — must be standardized
- Settings form uses different input styling (`border-2 border-gray-300 rounded-lg`) than modal forms — must be unified
- No field-level error display in any current form implementation
- No form dirty state or reset behavior

**Migration Priority:** Critical

---

### F-02 — Modal Form

**Used In:**
- All entity create/edit modals: categories, units, products
- Settings form (inline variant, not in a modal)

**Responsibilities:**
- Wraps F-01 inside a modal shell (M-01)
- Handles the create vs. edit distinction (form title, submit label, pre-populated fields)
- Manages async population of dependent dropdowns (e.g., unit and category selects in the product form)
- Delegates submission to the edit service or a create handler

**Shared Structure:**
```
[Modal — M-01]
  ├── [Modal Header]     — "Add {Entity}" or "Edit {Entity}"
  ├── [Modal Body]
  │     └── [Form — F-01]
  └── [Modal Actions]    — implicit via F-01 submit button or explicit footer buttons
```

**Token Dependencies:** Inherits from M-01 and F-01.

**Create vs. Edit:**
Both create and edit share the same form structure. The distinction is the modal title, the submit button label, and the pre-population of field values. The current codebase defines separate HTML templates for create and edit. The target architecture uses a single template with a data-driven title and value population via a `populate()` callback.

**Async Dropdowns:**
The product form requires units and categories to be fetched before the modal is interactive. The loading state during this fetch must use the M-01 loading spinner, not a page-level indicator.

**Current Problems:**
- Separate HTML templates exist for create and edit in each module — these can be unified into a single template
- Async dropdown population happens after `Modal.open()` with no loading indication
- `Modal.open()` invocation is duplicated verbatim across every entity controller — a higher-level entity modal abstraction is needed

**Migration Priority:** Critical

---

## Modal Patterns

---

### M-01 — Standard Modal

**Used In:**
- `modalService.html` — modal rendering engine
- All entity create/edit forms (via `Modal.open()`)
- Payment modal in `pos.html`
- Receipt modal in `pos.html` and `sales.html`

**Responsibilities:**
- Renders a full-screen overlay with a centered content panel
- Provides a header with title and close button
- Provides a scrollable body region
- Provides an optional footer actions region
- Manages keyboard dismissal (Escape key)
- Manages overlay click dismissal
- Supports five size variants: `sm`, `md`, `lg`, `xl`, `full`
- Supports a loading state with centered spinner

**Shared Structure:**
```
[Modal Overlay]
  └── [Modal Content Panel]
        ├── [Modal Header]
        │     ├── [Title]
        │     └── [Close Button — B-04]
        ├── [Modal Body]        — scrollable, contains form or display content
        └── [Modal Actions]     — optional footer with action buttons
```

**Token Dependencies:**
- `--color-overlay` — overlay background (`rgba(0,0,0,0.4)`)
- `--color-bg-card` — content panel background
- `--color-border-default` — header/footer dividers
- `--color-text-primary` — modal title
- `--radius-xl` — content panel corners (desktop)
- `--radius-lg` — content panel corners (mobile)
- `--shadow-xl` — content panel elevation
- `--space-4`, `--space-6` — header/body/footer padding
- `--z-modal` — stacking context (`9998`)
- `--transition-fast` — fade/slide animation duration

**Size Variants:**
| Variant | Max-Width | Use Case |
|---------|-----------|----------|
| `sm` | 400px | Confirmation dialogs, alerts |
| `md` | 560px | Standard entity forms (default) |
| `lg` | 720px | Product form (many fields) |
| `xl` | 960px | Complex workflows |
| `full` | `calc(100% - 32px)` | Full-screen content |

On viewports below `--bp-tablet`, all size variants collapse to `width: 100%` with 8px edge margins. The modal body must always be scrollable to handle content that exceeds viewport height on small screens.

**Animation:**
Modal entry uses a fade-in + slide-up. Modal exit uses fade-out + slide-down. Animation duration uses `--transition-fast`. The same keyframe definitions are used for all modal variants and are defined once in `animations.css`, not per-component.

**Current Problems:**
- The entire CSS ruleset is duplicated inside `ensureStyles()` — this duplicate must be removed once styles are served from `modals.css`
- POS payment and receipt modals are not using the modal service — they must be migrated to `Modal.open()`
- Button ordering is inconsistent between modals (cancel-then-confirm vs. confirm-then-cancel) — the convention must be standardized: destructive/secondary on the left, primary/confirm on the right
- `--z-modal` and `--z-toast` must be defined in the token layer to ensure toast always renders above modal

**Migration Priority:** Critical

---

### M-02 — Confirmation Modal

**Used In:**
- `categories.controller.html` — delete confirmation
- `units.controller.html` — delete confirmation
- Future: any destructive action requiring explicit user confirmation

**Responsibilities:**
- Presents a short message describing the consequence of the action
- Provides a Cancel button and a Confirm (danger) button
- Reports the user's choice back to the caller via callback or Promise

**Shared Structure:**
```
[Modal — M-01, size: sm]
  ├── [Modal Header]     — "Confirm {Action}"
  ├── [Modal Body]       — consequence description text
  └── [Modal Actions]
        ├── [Cancel Button — B-02]
        └── [Confirm Button — B-03]
```

**Token Dependencies:** Inherits from M-01, B-02, B-03.

**API Contract:**
`Modal.confirm({ title, message, confirmLabel, onConfirm, onCancel })` — the caller provides the message and callback; the component handles all visual state.

**Current Problems:**
- Already implemented in `modalService.html` (`Modal.confirm()`) but the CSS is duplicated alongside the standard modal — no separate concern distinction
- Confirm button ordering is inconsistent with other modal action patterns

**Migration Priority:** High

---

## Button Patterns

---

### B-01 — Primary Action Button

**Used In:**
- All CRUD page action buttons: "Add Category", "Add Unit", "Add Product"
- All modal submit buttons: "Save Category", "Save Product", "Save Unit"
- POS checkout button: "Checkout (KES x.xx)"
- POS payment confirm button: "Complete Sale"
- Settings save button: "Save Settings"
- Receipt print button: "Print Receipt"

**Responsibilities:**
- Signals the primary, constructive action available in a given context
- Supports a disabled state (pending, loading, validation failure)
- Supports a loading state with inline spinner or text change
- Supports full-width and auto-width variants

**Shared Structure:**
```html
<button class="btn btn--primary [btn--full] [btn--sm | btn--lg]">
  [Optional Icon] Label
</button>
```

**Token Dependencies:**
- `--color-primary` — background
- `--color-primary-hover` — hover background
- `--color-text-on-primary` — label color (white)
- `--space-3`, `--space-4` — padding variants by size
- `--radius-md` — corner radius
- `--text-sm`, `--text-md` — label size variants
- `--transition-fast` — hover transition

**Size Variants:**
| Modifier | Padding | Font Size | Use Case |
|----------|---------|-----------|----------|
| `btn--sm` | `var(--space-2) var(--space-3)` | `--text-sm` | Table row actions |
| (default) | `var(--space-2) var(--space-4)` | `--text-sm` | Page headers |
| `btn--lg` | `var(--space-3) var(--space-4)` | `--text-md` | Modal submit, checkout |

**States:**
- Default: `--color-primary` background
- Hover: `--color-primary-hover` background
- Focus: visible focus ring using `--color-primary` outline
- Disabled: reduced opacity, `cursor: not-allowed`
- Loading: spinner replaces or precedes label text

**Current Problems:**
- Three independent definitions: modal CSS (`#2563eb`), CRUD Tailwind strings (`bg-blue-600`), POS layout CSS (`#2563eb`)
- Padding inconsistent: page buttons use `py-2` equivalent; modal buttons use `py-3` equivalent; settings button uses `py-3 px-6`
- No shared focus ring definition

**Migration Priority:** Critical

---

### B-02 — Secondary Button

**Used In:**
- Modal cancel buttons: "Cancel"
- Receipt close button: "Close"
- Any action that is neutral or navigates away without destructive consequence

**Responsibilities:**
- Signals a neutral, non-destructive alternative to the primary action
- Visually subordinate to B-01 when both appear in the same context

**Shared Structure:**
```html
<button class="btn btn--secondary [btn--full]">
  Label
</button>
```

**Token Dependencies:**
- `--color-bg-subtle` — background (light gray)
- `--color-text-secondary` — label color (dark gray)
- `--color-border-default` — optional border
- `--space-2`, `--space-4` — padding
- `--radius-md` — corner radius
- `--text-sm` — label size
- `--transition-fast` — hover transition

**Current Problems:**
- Only defined in the modal service CSS; not available to any other context
- No semantic distinction between "cancel" and "close" — both use the same secondary style, which is correct

**Migration Priority:** Critical

---

### B-03 — Danger Button

**Used In:**
- Delete confirmation actions in M-02
- "New Sale" button in POS (current implementation uses red; this may be reconsidered as a secondary or neutral action)
- Any action with irreversible destructive consequence

**Responsibilities:**
- Signals a destructive or irreversible action
- Must require explicit user intent — should not appear as the default action
- Typically paired with a B-02 cancel button

**Shared Structure:**
```html
<button class="btn btn--danger [btn--full]">
  Label
</button>
```

**Token Dependencies:**
- `--color-danger` — background
- `--color-danger-hover` — hover background
- `--color-text-on-danger` — label color (white)
- `--space-2`, `--space-4` — padding
- `--radius-md` — corner radius
- `--text-sm` — label size

**Current Problems:**
- Defined only in the modal service CSS
- The POS "New Sale" button currently uses a red background but semantically this is not a destructive action — it should be re-evaluated and potentially reclassified as B-02

**Migration Priority:** High

---

### B-04 — Icon Button

**Used In:**
- Modal close button (× icon)
- Sidebar close button on mobile
- Topbar hamburger toggle
- POS cart item remove button
- POS quantity increment/decrement buttons

**Responsibilities:**
- Renders a button whose label is an icon only
- Must always carry an accessible label via `aria-label`
- Must always meet the 44px × 44px minimum touch target

**Shared Structure:**
```html
<button class="btn btn--icon" aria-label="Close">
  [SVG Icon]
</button>
```

**Token Dependencies:**
- `--color-icon-default` — icon color
- `--color-icon-hover-bg` — hover background
- `--space-2` — padding (touch target is achieved via min-width/height, not padding alone)
- `--radius-sm` — corner radius

**Touch Target Rule:**
All icon buttons must set `min-width: 44px; min-height: 44px`. The visual icon may be smaller; the interactive area must not be.

**Current Problems:**
- POS quantity buttons are 24–28px — critically below minimum
- Modal close button uses character `×` with font-size for sizing, not an SVG
- No `aria-label` on POS quantity buttons or remove buttons

**Migration Priority:** High — touch target failure is a usability regression

---

### B-05 — Filter / Tag Button

**Used In:**
- POS category filter bar (pill-shaped filter buttons)
- Future: any tag-based or category-based filter interface

**Responsibilities:**
- Renders a pill-shaped selectable button for filter state
- Supports a selected/active state that visually distinguishes the chosen filter
- Renders in a horizontally scrollable row on mobile

**Shared Structure:**
```html
<button class="btn btn--filter [btn--filter--active]">
  Label
</button>
```

**Token Dependencies:**
- `--color-bg-subtle` — default background
- `--color-primary` — active background
- `--color-text-on-primary` — active label color
- `--color-border-default` — default border
- `--space-2`, `--space-4` — vertical/horizontal padding
- `--radius-full` — pill shape
- `--text-sm` — label size

**Current Problems:**
- Only defined in the POS page — not available for use elsewhere
- No disabled state defined
- No focus state defined

**Migration Priority:** Medium

---

## Filter / Search Patterns

---

### S-01 — Standard Filter Bar

**Used In:**
- `tableService.html` — embedded search above every CRUD table
- POS category filter row (functionally similar, visually different)

**Responsibilities:**
- Provides a text search input scoped to the current data set
- Optionally provides additional filter controls (dropdowns, date pickers) to the right of the search input
- Triggers data filtering on input change, with debounce

**Shared Structure:**
```
[Filter Bar]
  ├── [Search Input — S-02]
  └── [Optional: Filter Dropdowns / Tag Buttons — B-05]
```

**Token Dependencies:**
- `--space-2`, `--space-4` — input padding, bar gap
- `--space-4` — bar bottom margin
- `--color-input-border` — search border

**Debounce:**
The search input must debounce its `oninput` event by a minimum of 200ms. The current table service implementation fires on every keystroke with no debounce.

**Current Problems:**
- Embedded inside `tableService.html` — cannot be used independently (e.g., in a page header, above a card list)
- No debounce
- Table service search bar is not sticky — on long tables users must scroll back to the top to search

**Migration Priority:** High

---

### S-02 — Search Input with Dropdown

**Used In:**
- POS product search (`#product-search-input` + `#search-results` dropdown)

**Responsibilities:**
- Provides a text input that triggers a live filtered dropdown of results
- Supports barcode scanner integration (listens for rapid character sequences ending in Enter)
- Provides a clear button to reset the search state
- Handles empty state within the dropdown
- Selects a result on click and passes the selected item to the caller

**Shared Structure:**
```
[Search Wrapper]
  ├── [Input]
  │     └── [Clear Button — B-04]
  └── [Results Dropdown]
        ├── [Result Item]  — product name, price, stock
        └── [Empty State]  — "No products found"
```

**Token Dependencies:**
- `--color-input-border`, `--color-input-border-focus` — input states
- `--color-bg-card` — dropdown background
- `--color-table-row-hover` — result item hover
- `--shadow-lg` — dropdown elevation
- `--space-3`, `--space-4` — input and result item padding
- `--radius-md` — input corners
- `--radius-bottom-md` — dropdown (bottom corners only)
- `--z-dropdown` — dropdown stacking context

**Barcode Integration:**
The search component must expose a `setExternalValue(code)` method that populates the input and immediately triggers a search. The scanner service calls this method rather than accessing the DOM directly.

**Current Problems:**
- `ProductSearch` does not use `searchService.html` — implements its own filtering
- `ProductSearch` directly calls `CartService.add()` — should emit a selection event
- Clear button visibility is toggled via inline `style.display` — must use `.hidden` utility

**Migration Priority:** High

---

## POS Patterns

---

### P-01 — POS Product Grid

**Used In:**
- `pos.html` — left panel of the POS split layout

**Responsibilities:**
- Renders the browsable product catalog as a responsive grid of product cards
- Supports category filtering via the B-05 filter bar
- Integrates with S-02 search to highlight or filter visible products
- Each card is tappable and adds the product to the cart

**Shared Structure:**
```
[Product Grid Section]
  ├── [Search Input — S-02]
  ├── [Category Filter Bar — S-01 / B-05]
  └── [Product Grid]
        └── [Product Card]
              ├── [Product Name]
              ├── [Product Price]
              ├── [Stock Badge — C-06]
              └── [Barcode / SKU]  — small, tertiary
```

**Token Dependencies:**
- `--space-3` — card internal padding
- `--space-2`, `--space-3` — grid gap
- `--color-bg-card` — card background
- `--color-primary-shadow` — card hover shadow tint
- `--radius-lg` — card corners
- `--text-sm` — product name
- `--text-md` — product price
- `--text-xs` — stock, barcode
- `--transition-fast` — card hover lift

**Grid Behavior:**
| Breakpoint | Columns |
|------------|---------|
| Mobile (`< --bp-mobile`) | 2 fixed columns |
| Small mobile (`< 360px`) | 2 fixed columns, reduced padding |
| Tablet (`--bp-mobile` to `--bp-tablet`) | `auto-fill, minmax(100px, 1fr)` |
| Desktop (`> --bp-tablet`) | `auto-fill, minmax(140px, 1fr)` |

**Out-of-Stock State:**
Product cards for out-of-stock items must render a visually distinct state (reduced opacity or a badge overlay). Tapping an out-of-stock card must produce no action or a clear error toast.

**Current Problems:**
- Grid breakpoints use `max-width: 767px` and `max-width: 480px` — must be replaced with token-based `min-width` media queries (mobile-first)
- Card padding, font size, and gap values are all managed with per-breakpoint raw pixel overrides — must use token references

**Migration Priority:** Critical

---

### P-02 — Cart Item Row

**Used In:**
- `pos.html` — cart items list (`#cart-items-list`)
- `cartItemRow.html` — duplicate implementation (dead code candidate)

**Responsibilities:**
- Renders a single line item in the active cart
- Displays product name, unit price, quantity controls, and line total
- Allows quantity increment, decrement, and direct edit
- Allows item removal
- Truncates long product names with ellipsis

**Shared Structure:**
```
[Cart Item]
  ├── [Item Info]
  │     ├── [Product Name]     — truncated with ellipsis
  │     └── [Unit Price]
  ├── [Quantity Controls]
  │     ├── [Decrement — B-04]
  │     ├── [Quantity Value]
  │     └── [Increment — B-04]
  ├── [Line Total]
  └── [Remove Button — B-04]
```

**Token Dependencies:**
- `--color-bg-card` — item background
- `--color-border-default` — item border
- `--shadow-sm` — default item elevation
- `--shadow-md` — hover elevation
- `--space-2`, `--space-3` — item padding
- `--space-1`, `--space-2` — internal element gap
- `--radius-lg` — item corners
- `--text-sm` — item name
- `--text-xs` — unit price
- `--text-md` — line total
- `--transition-fast` — hover shadow transition

**Touch Target Enforcement:**
Quantity increment, decrement, and remove buttons must all meet the 44px × 44px minimum touch target via `min-width` and `min-height` on the `.btn--icon` base. This is currently violated at 24–28px.

**Duplicate Resolution:**
`cartItemRow.html` must be audited to determine which rendering path is active. The unused path must be removed. A single `CartItemRow.render(item)` method — or a single CSS-only template — must be the sole source of cart item markup.

**Migration Priority:** Critical

---

### P-03 — Checkout / Totals Panel

**Used In:**
- `pos.html` — right panel totals section (`.totals-panel`)

**Responsibilities:**
- Displays a running summary of the cart: subtotal, discount, tax, and grand total
- Renders the checkout action button (B-01)
- Remains visible and accessible as the cart scrolls (sticky behavior on desktop)
- On mobile, anchors to the bottom of the stacked layout

**Shared Structure:**
```
[Checkout Panel]
  ├── [Cart Header]      — "Cart" label + item count badge
  ├── [Cart Items List — P-02]
  ├── [Totals Summary]
  │     ├── [Summary Row] — Subtotal
  │     ├── [Summary Row] — Tax
  │     ├── [Divider]
  │     └── [Grand Total Row]
  └── [Checkout Actions]
        └── [Checkout Button — B-01, full-width, lg]
```

**Token Dependencies:**
- `--color-bg-subtle` — panel background
- `--color-border-default` — dividers
- `--text-sm` — summary labels
- `--text-md` — summary values
- `--text-xl` — grand total amount
- `--space-4` — panel padding
- `--font-weight-bold` — grand total weight

**Responsive Behavior:**
- Desktop: right panel is a fixed 420px width column alongside the product grid
- Mobile: stacks below the product grid; checkout button is always visible at the bottom of the viewport via sticky positioning
- The right panel width must transition from fixed (`420px`) to fluid (`width: 40%`) to prevent the jarring layout shift at the mobile breakpoint

**Current Problems:**
- Panel uses a fixed `width: 420px` — must change to `max-width: 420px; width: 40%` or a fluid equivalent
- Checkout button is not sticky on mobile
- Grand total font size reduces across three separate breakpoints via raw pixel overrides

**Migration Priority:** Critical

---

### P-04 — Payment Method Selector

**Used In:**
- `pos.html` — inside the payment modal (`#paymentModalContent`)

**Responsibilities:**
- Renders a set of selectable payment method buttons
- Each button shows an icon and a label
- Exactly one method is selected at all times
- Selection triggers method-specific UI changes (cash input, credit customer picker)

**Shared Structure:**
```
[Payment Method Grid]
  └── [Payment Method Button — B-05 variant]
        ├── [Method Icon]
        └── [Method Label]
```

**Token Dependencies:**
- `--color-border-default` — unselected button border
- `--color-primary` — selected button border
- `--color-primary-subtle` — selected button background tint
- `--space-3` — button padding
- `--radius-lg` — button corners
- `--text-sm` — method label
- `--transition-fast` — selection transition

**Method Configuration:**
Payment methods must be defined as a data structure external to the UI component. The component renders from the configuration; it does not hardcode method names or icons. This enables new payment methods to be added via configuration without modifying the component.

**Current Problems:**
- `.payment-method-btn` CSS is defined twice in `pos.html` — duplicate must be removed
- Payment method configuration is embedded in `PaymentModal` (a UI component) rather than in a service or configuration file
- No responsive grid — buttons sit in a fixed-gap flex row that can become cramped on narrow viewports

**Migration Priority:** High

---

### P-05 — Payment Amount Input

**Used In:**
- `pos.html` — cash payment section within the payment modal

**Responsibilities:**
- Renders a currency-prefixed number input
- Displays the calculated change amount below the input
- Validates that the entered amount meets or exceeds the transaction total
- Disables the input for non-cash payment methods (M-Pesa, Credit)

**Shared Structure:**
```
[Amount Input Wrapper]
  ├── [Currency Symbol Prefix]   — "KES" (must be token-driven, not hardcoded)
  └── [Number Input]

[Change Display]
  ├── [Change Label]
  └── [Change Amount]            — highlighted in success color when positive
```

**Token Dependencies:**
- `--color-input-border` — wrapper border
- `--color-primary` — focus border
- `--color-success` — positive change amount color
- `--color-success-subtle` — change display background
- `--space-3` — input padding
- `--text-lg` — amount input font size
- `--text-xl` — change amount font size

**Currency Symbol:**
The currency symbol "KES" is currently hardcoded in the HTML. It must be sourced from `State.settings.currency` to support the multi-currency and localization goals in STYLING_ARCHITECTURE.md.

**Migration Priority:** High

---

### P-06 — Receipt Display

**Used In:**
- `pos.html` — receipt modal (`#salesModalContent`)
- `sales.html` — sale detail modal (`salesModalContent`)
- `sales.modal.html` — duplicate implementation

**Responsibilities:**
- Renders a structured receipt: header info block, line items table, and totals section
- Supports print action (triggers `window.print()` with receipt-specific print styles)
- Displays payment method, amount tendered, and change given

**Shared Structure:**
```
[Receipt]
  ├── [Receipt Header Info — C-05]   — date, sale ID, cashier, payment method
  ├── [Items Table — T-01 variant]   — product, qty, price, subtotal columns
  ├── [Receipt Totals]
  │     ├── [Subtotal Row — C-05]
  │     ├── [Tax Row — C-05]
  │     ├── [Divider]
  │     └── [Grand Total Row]
  └── [Receipt Actions]
        ├── [Print Button — B-01]
        └── [Close Button — B-02]
```

**Token Dependencies:**
- `--color-bg-subtle` — header info background
- `--color-border-default` — table row dividers, section dividers
- `--radius-md` — header info block corners
- `--text-xs` — table header labels
- `--text-sm` — table cell values
- `--text-md` — total label
- `--text-xl` — grand total amount

**Print Styles:**
A `@media print` block must be defined in `pos.css` (or a dedicated `receipt-print.css`) that: hides the modal overlay, hides the action buttons, removes shadows, and renders the receipt content at full page width with print-appropriate typography.

**Duplicate Resolution:**
The receipt display is currently defined in both `pos.html` and `sales.html`/`sales.modal.html` with different class names. A single P-06 component with a single set of class names must replace both. The `sales.html` context renders the receipt in a read-only view mode; the `pos.html` context renders it immediately post-sale with print capability. Both use the same visual structure.

**Migration Priority:** High

---

## Notification Patterns

---

### NT-01 — Toast Notification

**Used In:**
- `toastService.html` — sole implementation
- Called from every controller, service, and page on success/error/warning/info events

**Responsibilities:**
- Renders an ephemeral status message anchored to the top-right of the viewport (desktop) or top-center (mobile)
- Supports four semantic variants: success, error, warning, info
- Auto-dismisses after a configurable duration
- Stacks multiple toasts vertically if triggered in rapid succession

**Shared Structure:**
```
[Toast Container]   — fixed position, top-right
  └── [Toast Item]
        ├── [Icon]        — semantic variant icon
        └── [Message]     — notification text
```

**Token Dependencies:**
- `--color-success` — success toast background
- `--color-error` — error toast background
- `--color-warning` — warning toast background
- `--color-info` — info toast background
- `--color-text-on-color` — toast text (white)
- `--shadow-lg` — toast elevation
- `--radius-lg` — toast corners
- `--space-3`, `--space-4` — toast padding
- `--text-sm` — toast text
- `--z-toast` — stacking context (`9999`, above modal overlay)
- `--transition-normal` — slide-in/slide-out animation

**Positioning:**
- Desktop: `position: fixed; top: var(--space-4); right: var(--space-4)`
- Mobile: `position: fixed; top: var(--space-2); left: var(--space-4); right: var(--space-4)` (full-width)

**Current Problems:**
- Entire visual presentation is constructed via `style.cssText` and inline `style` attributes in JavaScript — must be migrated to CSS classes in `toast.css`
- Colors are hardcoded JavaScript constants — must reference CSS variables
- No stacking behavior for multiple simultaneous toasts
- Toast container position (`top: 20px; right: 20px`) may be obscured by device notch on mobile

**Migration Priority:** Critical

---

## Responsive Behavior Patterns

---

### R-01 — Sidebar Collapse

**Used In:**
- App shell on all pages
- `responsive.html` (current partial implementation)
- `uiService.html` (JavaScript toggle logic)

**Responsibilities:**
- Controls the transition between the persistent desktop sidebar and the mobile drawer sidebar
- Manages the overlay mask that appears behind the open drawer
- Provides a smooth open/close transition

**Behavior Specification:**
| Viewport | Sidebar State | Trigger |
|----------|--------------|---------|
| `> --bp-tablet` | Always visible, fixed in layout flow | None — CSS only |
| `< --bp-tablet` | Hidden, rendered as overlay drawer | Hamburger button in topbar |

**CSS Strategy:**
The sidebar is always present in the DOM. On desktop, it sits in the flex layout as a fixed-width column. On mobile, it is transformed off-screen (`translateX(-100%)`) and transitions to `translateX(0)` when the `.sidebar--open` class is applied. The overlay mask is a sibling element that becomes visible simultaneously.

No JavaScript layout branching is needed. The current `UIService.isMobile()` check that renders two separate HTML branches must be replaced with a single DOM structure where CSS handles the responsive difference.

**Transition:**
`transform 0.3s ease` on the sidebar element. The overlay fades in/out with `opacity` transition on the same duration.

**Current Problems:**
- Sidebar open/close uses `display: block/none` — prevents CSS transitions from working
- `UIService.isMobile()` renders duplicate HTML for mobile vs. desktop — this check must be eliminated
- `MOBILE_BREAKPOINT = 768` in JavaScript must be removed; the sidebar behavior is fully achievable through CSS class toggling

**Migration Priority:** Critical

---

### R-02 — Table Stack Pattern

**Used In:**
- All CRUD pages on mobile viewports
- Target state: any page rendering T-01

**Responsibilities:**
- Transforms the traditional `<table>` layout into a vertical card list below `--bp-tablet`
- Each row becomes a card; columns become labeled key-value pairs within the card
- Preserves row actions in each card

**CSS Strategy:**
At the mobile breakpoint:
- `table`, `thead`, `tbody`, `tr`, `td` display properties are overridden to block-level
- `thead` is visually hidden (but preserved for accessibility)
- Each `td` becomes a full-width block element
- `td::before` uses the `data-label` attribute to inject the column name as a pseudo-element label

**Data Requirements:**
Each `<td>` in the server-rendered or JavaScript-rendered table must carry a `data-label` attribute whose value matches its column header. This is a rendering contract between the table component and the data layer.

**Current Problems:**
- No mobile table handling exists anywhere in the codebase — this pattern must be built from zero
- The table service renders `<td>` elements without `data-label` attributes — this must be added to the rendering logic

**Migration Priority:** High

---

### R-03 — POS Split / Stack Layout

**Used In:**
- `pos.html` — the core POS layout

**Responsibilities:**
- On desktop: renders a side-by-side layout with the product grid on the left and the cart/checkout panel on the right
- On mobile: stacks the product grid above the cart panel; the cart panel has a maximum height with internal scroll; the checkout button is sticky at the bottom of the viewport

**Layout Specification:**
| Viewport | Layout | Product Area | Cart Area |
|----------|--------|-------------|-----------|
| Desktop (`> --bp-tablet`) | Flex row | Flex 1 (fills remaining space) | Fixed `max-width: 420px; width: 40%` |
| Tablet (`--bp-mobile` to `--bp-tablet`) | Flex row | Flex 1 | `width: 45%` |
| Mobile (`< --bp-tablet`) | Flex column | `max-height: 50vh; overflow-y: auto` | `max-height: 50vh; overflow-y: auto` |
| Small mobile (`< --bp-mobile`) | Flex column | `max-height: 45vh` | `max-height: 55vh` |

**Height Calculation:**
The POS layout must fill the viewport minus the topbar height. The current `calc(100vh - 80px)` hard-codes the topbar height. The target architecture uses a CSS custom property: `calc(100vh - var(--topbar-height))` where `--topbar-height` is defined in the token layer.

**Checkout Sticky Behavior:**
On mobile, the checkout button within the totals panel must use `position: sticky; bottom: 0` within the cart column so it remains accessible without scrolling to the bottom of the cart.

**Current Problems:**
- `height: calc(100vh - 80px)` hardcodes the topbar height
- Right panel uses `width: 420px` — must change to a fluid approach
- Layout switches abruptly at `767px` — the tablet range (768–1024px) gets the same layout as desktop with only the right panel width adjusted

**Migration Priority:** Critical

---

## Shared Display Patterns

---

### C-01 — Page Header

**Used In:**
- `sales.html`, `categories.html`, `units.html`, `products.html`, `stockMovements.html`, `settings.html` — all six CRUD pages (verbatim duplication)
- `pos.html` — POS-specific page header variant

**Responsibilities:**
- Displays the page title and optional subtitle
- Renders the primary page-level action button (B-01) on the right
- Maintains horizontal alignment on desktop and wraps gracefully on mobile

**Shared Structure:**
```
[Page Header]
  ├── [Title Block]
  │     ├── [Page Title]     — h1, --text-xl, --font-weight-bold
  │     └── [Subtitle]       — optional, --text-sm, --color-text-secondary
  └── [Header Actions]
        └── [Primary Button — B-01]
```

**Token Dependencies:**
- `--text-xl` — page title size
- `--text-sm` — subtitle size
- `--color-text-primary` — title color
- `--color-text-secondary` — subtitle color
- `--font-weight-bold` — title weight
- `--space-4` — bottom margin separating header from content

**Responsive Behavior:**
- Desktop: title block and action button sit on the same row (`display: flex; justify-content: space-between`)
- Mobile: action button wraps below the title block (`flex-wrap: wrap`) or is reduced to an icon-only B-04 variant

**Current Problems:**
- Duplicated verbatim across all six CRUD pages with no component abstraction
- No responsive wrapping behavior defined anywhere — button will overlap title on narrow screens

**Migration Priority:** Critical

---

### C-02 — Content Card

**Used In:**
- All five CRUD table pages as the table wrapper
- Settings page as section card wrapper (with different padding)

**Responsibilities:**
- Provides a visually elevated surface (white background, border radius, shadow) for a discrete section of page content
- Contains a table, form, or settings section

**Shared Structure:**
```html
<div class="card">
  [Content]
</div>
```

**Token Dependencies:**
- `--color-bg-card` — card background (white)
- `--radius-lg` — card corner radius
- `--shadow-md` — card elevation
- `--space-4` — card padding (default)
- `--space-6` — card padding (large variant, for settings sections)

**Variants:**
- Default (`card`): `--space-4` padding — for table containers
- Large (`card--lg`): `--space-6` padding — for settings sections

**Current Problems:**
- `bg-white rounded shadow p-4` repeated verbatim across five page templates
- Settings uses `p-6` creating an unintentional padding inconsistency — the large variant resolves this intentionally

**Migration Priority:** Critical

---

### C-03 — Empty State

**Used In:**
- Table service — "No data found" message
- POS cart — empty cart indicator

**Responsibilities:**
- Communicates that a container has no content
- Provides an icon, a title message, and an optional hint or action

**Shared Structure:**
```
[Empty State]
  ├── [Icon]          — contextual illustration or generic icon
  ├── [Title]         — "No items in cart" / "No products found"
  └── [Hint]          — optional secondary message or action link
```

**Token Dependencies:**
- `--color-text-secondary` — icon and hint color
- `--color-text-primary` — title color
- `--space-8` — vertical padding
- `--text-md` — title size
- `--text-sm` — hint size

**Current Problems:**
- Table service embeds a minimal empty message as a plain string — no icon, no hint
- POS cart has its own empty state with icon and hint but it is not an extractable component
- No shared empty state component exists

**Migration Priority:** High

---

### C-04 — Loading Overlay

**Used In:**
- POS payment modal — `#payment-loading-overlay`
- Modal service — built-in loading spinner via `Modal.setLoading()`

**Responsibilities:**
- Covers a container or modal with a semi-transparent overlay
- Displays a centered spinner and optional loading message
- Blocks interaction with the underlying content while active

**Shared Structure:**
```
[Loading Overlay]
  ├── [Spinner]
  └── [Loading Message]   — optional
```

**Token Dependencies:**
- `--color-overlay-light` — overlay background (`rgba(255,255,255,0.85)`)
- `--color-primary` — spinner color
- `--color-border-subtle` — spinner track color
- `--text-sm` — loading message
- `--color-text-secondary` — loading message color
- `--transition-fast` — spinner animation duration

**Usage Modes:**
- `overlay--absolute`: covers the nearest positioned ancestor (for modal content or panel sections)
- `overlay--fixed`: covers the full viewport (for page-level loading)

**Current Problems:**
- POS payment loading overlay uses `display: flex` toggled via inline style — must use `.hidden` / `.loading-overlay--active` class toggle
- Modal service has its own spinner definition that is part of the duplicated CSS block
- Two independent implementations exist; one must be removed

**Migration Priority:** High

---

### C-05 — Info / Detail Row

**Used In:**
- Receipt header info block in `pos.html` and `sales.html`/`sales.modal.html`

**Responsibilities:**
- Renders a single label-value pair in a horizontal flex layout
- Used in stacked lists to display entity metadata (sale date, cashier, payment method)

**Shared Structure:**
```
[Detail Row]
  ├── [Label]   — --text-sm, --color-text-secondary
  └── [Value]   — --text-sm, --color-text-primary, --font-weight-medium
```

**Token Dependencies:**
- `--color-text-secondary` — label color
- `--color-text-primary` — value color
- `--color-border-subtle` — row bottom border
- `--space-1`, `--space-2` — row vertical padding
- `--text-sm` — both label and value text size
- `--font-weight-medium` — value weight

**Current Problems:**
- Implemented twice with different class names (`.receipt-field` in `sales.html`, `.detail-row` in `sales.modal.html`) — must be unified into a single class

**Migration Priority:** Medium

---

### C-06 — Status Badge

**Used In:**
- Product cards in POS — stock level indicator
- Dashboard tables — stock status indicator
- `app.html` — payment method color indicators, stock movement type indicators

**Responsibilities:**
- Renders a small inline label communicating categorical status
- Supports semantic color variants: success, warning, danger, info, neutral

**Shared Structure:**
```html
<span class="badge badge--[success|warning|danger|info|neutral]">
  Label
</span>
```

**Token Dependencies:**
- `--color-success-subtle`, `--color-success` — success variant
- `--color-warning-subtle`, `--color-warning` — warning variant
- `--color-danger-subtle`, `--color-danger` — danger variant
- `--color-info-subtle`, `--color-info` — info variant
- `--radius-full` — pill shape
- `--space-1`, `--space-2` — vertical/horizontal padding
- `--text-xs` — badge text size
- `--font-weight-medium` — badge text weight

**Status Mapping:**
| Status | Variant | Example |
|--------|---------|---------|
| In Stock | `badge--success` | Product has sufficient stock |
| Low Stock | `badge--warning` | Product below reorder threshold |
| Out of Stock | `badge--danger` | Product has zero stock |
| Sale | `badge--danger` | Stock movement type |
| Purchase | `badge--success` | Stock movement type |
| Adjustment | `badge--info` | Stock movement type |

**Current Problems:**
- Status colors are applied via Tailwind utility classes (`bg-red-100 text-red-800`) in `app.html` and `dashboard.html` — no shared badge component
- POS product cards show stock level as raw text with no badge styling

**Migration Priority:** Medium

---

## Pattern Token Cross-Reference

The following table maps each pattern to its critical token dependencies. All of these tokens must be defined in the token layer before any component migration begins.

| Token | Type | Used By |
|-------|------|---------|
| `--color-primary` | Color | B-01, S-02, F-01, M-01, P-04, P-05, T-01 |
| `--color-primary-hover` | Color | B-01 |
| `--color-primary-subtle` | Color | P-04, B-05 (active) |
| `--color-danger` | Color | B-03, C-06, M-02 |
| `--color-success` | Color | NT-01, C-06, P-05 |
| `--color-warning` | Color | NT-01, C-06 |
| `--color-info` | Color | NT-01, C-06 |
| `--color-bg-card` | Color | C-02, P-02, T-01, M-01 |
| `--color-bg-subtle` | Color | B-02, C-01, P-03, T-01 header |
| `--color-border-default` | Color | F-01, T-01, M-01, P-02, B-05 |
| `--color-text-primary` | Color | C-01, C-05, M-01 title |
| `--color-text-secondary` | Color | B-02, C-03, C-05, N-01 |
| `--color-overlay` | Color | M-01, R-01 |
| `--color-sidebar-bg` | Color | N-01 |
| `--space-1` through `--space-6` | Spacing | All patterns |
| `--text-xs` through `--text-xl` | Typography | All patterns |
| `--font-weight-medium`, `--font-weight-bold` | Typography | C-01, C-05, P-03, T-01 |
| `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` | Radius | All patterns |
| `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` | Shadow | M-01, C-02, S-02, P-02, NT-01 |
| `--z-sidebar`, `--z-topbar`, `--z-modal`, `--z-toast`, `--z-dropdown` | Z-Index | N-01, N-02, M-01, NT-01, S-02 |
| `--transition-fast`, `--transition-normal` | Animation | All interactive patterns |
| `--bp-mobile`, `--bp-tablet`, `--bp-desktop` | Breakpoints | R-01, R-02, R-03, P-01, L-01, T-02 |
| `--topbar-height` | Layout | R-03 (POS height calculation) |

---

## Implementation Notes for AI Agents

When implementing any pattern in this registry, the following rules apply without exception:

1. **No hardcoded values.** Every color, spacing value, font size, border radius, shadow, z-index, transition duration, and breakpoint must reference a CSS custom property from the token layer.

2. **Mobile-first only.** Default styles target mobile. Breakpoints use `min-width` only. `max-width` media queries are forbidden.

3. **No inline styles.** Visibility, display mode, and state changes are achieved by toggling CSS classes. The only permitted inline style is `style="display: none"` as an initial server-rendered hidden state for template elements — and even this must be replaced with a `.hidden` utility class during migration.

4. **No ID selectors in component CSS.** Components are styled via class selectors only. IDs may be used for JavaScript targeting but must not appear in `components/*.css` files.

5. **No deep nesting.** Maximum selector depth is two levels (e.g., `.cart-item__name`). Descendants beyond this depth indicate a structural problem, not a specificity solution.

6. **Utility-first composition.** Before writing a new CSS rule, check whether the desired effect can be achieved with utility composition. Only write component-specific CSS for behaviors that cannot be expressed with the utility layer.

7. **One definition per component.** If a pattern is defined in this registry, it is defined once — in its target file. Any existing duplicate definition encountered during migration must be removed as part of the same migration task, not deferred.

8. **Touch targets.** All interactive elements must have a minimum `min-width: 44px; min-height: 44px`. For icon buttons where the visual is smaller, padding or a transparent hit area must extend the target to 44px.

9. **Preserve semantics.** Use the correct HTML element for the job: `<button>` for actions, `<a>` for navigation, `<table>` for tabular data, `<form>` for forms. Do not use `<div>` or `<span>` as interactive elements without `role` and `tabindex` attributes.

10. **Aria labels on icon buttons.** Every B-04 icon button must carry an `aria-label` attribute describing its action.
ENDOFFILE