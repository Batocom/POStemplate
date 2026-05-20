# Responsive Patterns

**Version:** 1.0
**Status:** Architectural Contract
**Depends On:** `STYLING_ARCHITECTURE.md`, `UI_PATTERN_REGISTRY.md`

This document defines the canonical responsive behavior contracts for the POS system. It is not an implementation guide. It defines **what must happen** at each breakpoint for every responsive surface in the application.

Every responsive rule in this document is a contract. Any deviation — in a component, page, or AI-generated output — is a violation of this architecture.

---

## Table of Contents

1. [Responsive Philosophy](#1-responsive-philosophy)
2. [Breakpoint System](#2-breakpoint-system)
3. [Layout Collapse Rules](#3-layout-collapse-rules)
4. [Grid Collapse Rules](#4-grid-collapse-rules)
5. [Container Width Rules](#5-container-width-rules)
6. [Page Padding Rules](#6-page-padding-rules)
7. [Navigation Responsiveness](#7-navigation-responsiveness)
8. [Table Responsiveness](#8-table-responsiveness)
9. [Form Responsiveness](#9-form-responsiveness)
10. [Modal Responsiveness](#10-modal-responsiveness)
11. [POS Responsiveness](#11-pos-responsiveness)
12. [Touch Ergonomics](#12-touch-ergonomics)
13. [Sticky Element Rules](#13-sticky-element-rules)
14. [Overflow Prevention Rules](#14-overflow-prevention-rules)
15. [Responsive Utility Behavior](#15-responsive-utility-behavior)

---

## 1. Responsive Philosophy

### 1.1 Mobile-First Is Non-Negotiable

All responsive behavior in this system is authored mobile-first. This means:

- Default styles (no media query) define the mobile experience.
- `min-width` breakpoints progressively enhance the layout for larger screens.
- `max-width` media queries are forbidden throughout the entire system.
- No desktop behavior may be written as a default and overridden downward.

This is an architectural constraint, not a preference. Violations will create specificity conflicts during future migrations.

### 1.2 Responsive Behavior Is Centralized

Responsive rules belong in one of three places:

- **Token layer** — breakpoint values only.
- **Utility layer** — responsive visibility and display helpers.
- **Component/Layout layer** — responsive behavior scoped to that component.

Page-level files (`pages/*.css`) must never define new responsive behavior. They may compose existing responsive utilities but may not introduce new breakpoint logic.

### 1.3 Responsive Behavior Is Predictable

Every pattern in this system has a defined and documented behavior at every breakpoint. Undocumented responsive behavior is a bug, not a feature. If a component behaves differently at a breakpoint not described in this document, that behavior must be either codified here or removed.

### 1.4 The POS Interface Has Elevated Responsive Priority

The POS page is the highest-traffic, highest-stakes interface in the application. Its responsive behavior must prioritize:

- Transaction speed above visual complexity.
- Touch accuracy above information density.
- Predictable layout above creative adaptation.

POS responsive rules supersede general component rules where conflicts arise.

---

## 2. Breakpoint System

### 2.1 Canonical Breakpoints

The system recognizes exactly four breakpoints. No other breakpoint values are permitted anywhere in the codebase.

| Name | Token | Value | Target Context |
|------|-------|-------|----------------|
| Mobile | `--bp-mobile` | `480px` | Small phones in portrait |
| Tablet | `--bp-tablet` | `768px` | Tablets and large phones in landscape |
| Desktop | `--bp-desktop` | `1024px` | Laptop and desktop screens |
| Wide | `--bp-wide` | `1280px` | Large desktop and wide monitors |

### 2.2 Breakpoint Usage Rules

- All breakpoint references in CSS must use the token, not a raw pixel value.
- Breakpoint tokens are defined in `tokens/breakpoints.css` and nowhere else.
- Media queries must be written as `min-width` only.
- Breakpoints are not interchangeable. Each breakpoint corresponds to a specific layout tier with defined behavioral expectations.

### 2.3 Responsive Tiers

The system uses three logical responsive tiers for design decisions:

| Tier | Breakpoint Range | Primary Device Class |
|------|-----------------|----------------------|
| Mobile | `< --bp-tablet` (< 768px) | Phones |
| Tablet | `--bp-tablet` to `--bp-desktop` (768px–1023px) | Tablets, landscape phones |
| Desktop | `≥ --bp-desktop` (≥ 1024px) | Laptops, desktops, wide monitors |

The `--bp-mobile` (480px) breakpoint is used for fine-grained adjustments within the mobile tier only — for example, adjusting grid columns between very small and standard-sized phones. It does not represent a full layout tier.

---

## 3. Layout Collapse Rules

### 3.1 App Shell Layout

The app shell is the root layout structure that wraps all pages. It controls the relationship between the sidebar and the main content area.

| Tier | Sidebar State | Main Content Behavior |
|------|--------------|----------------------|
| Mobile | Hidden. Accessible via overlay drawer. | Occupies full viewport width. |
| Tablet | Hidden. Accessible via overlay drawer. | Occupies full viewport width. |
| Desktop | Fixed. 256px wide, persistent. | Fills remaining width alongside sidebar. |

**Collapse Contract:**
- The sidebar-to-content layout shift occurs at `--bp-desktop`.
- Below `--bp-desktop`, the content area always assumes full width.
- Above `--bp-desktop`, the content area always reserves `256px` for the sidebar.
- There is no intermediate collapsed sidebar state. The sidebar is either fully hidden (drawer) or fully visible (fixed).

### 3.2 Two-Column Content Layouts

Patterns that place two content panels side by side (e.g., the POS split view) follow this collapse contract:

| Tier | Layout |
|------|--------|
| Mobile | Single column. Panels stack vertically. |
| Tablet | Single column. Panels stack vertically. |
| Desktop | Two columns. Panels render side by side. |

The column split point for two-panel layouts is always `--bp-desktop`.

### 3.3 Dashboard Stat Row

The stats row in the dashboard (pattern L-02) follows a dedicated collapse sequence:

| Tier | Columns |
|------|---------|
| Mobile (< 480px) | 1 column |
| Mobile (≥ 480px) | 2 columns |
| Tablet | 2 columns |
| Desktop | 4 columns |

### 3.4 Dashboard Chart Row

| Tier | Columns |
|------|---------|
| Mobile | 1 column |
| Tablet | 1 column |
| Desktop | 2 columns |

---

## 4. Grid Collapse Rules

### 4.1 Product Grid (POS)

The POS product grid is the most performance-sensitive grid in the application. Its column count must balance readability and density.

| Tier | Columns | Notes |
|------|---------|-------|
| Mobile (< 480px) | 2 columns | Minimum legible product card width |
| Mobile (≥ 480px) | 2 columns | Standard mobile |
| Tablet | 3 columns | Balanced density for touch |
| Desktop | 4 columns | Standard POS density |
| Wide | 5 columns | Optional enhancement for large screens |

The product grid must never collapse to 1 column. Two columns is the minimum. A product card at 1-column width provides no usability benefit over a list and degrades scan speed.

### 4.2 General Content Grids

All non-POS content grids (e.g., dashboard stat cards, settings card layouts) follow this default collapse pattern unless overridden by a specific pattern contract:

| Tier | Default Columns |
|------|----------------|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3 or 4 columns (as defined per pattern) |

### 4.3 Gap Behavior

Grid gaps must scale with viewport tier. Arbitrary gap values are forbidden.

| Tier | Standard Gap Token |
|------|-------------------|
| Mobile | `--space-3` (12px) |
| Tablet | `--space-4` (16px) |
| Desktop | `--space-4` or `--space-5` (16px–20px) |

---

## 5. Container Width Rules

### 5.1 Page Content Container

The main content area (inside the app shell, below the topbar) follows these width rules:

| Tier | Max Width | Behavior |
|------|-----------|----------|
| Mobile | `100%` | Full width, no max constraint |
| Tablet | `100%` | Full width, no max constraint |
| Desktop | `100%` of remaining shell | Sidebar reserves `256px` |
| Wide | `100%` of remaining shell | No inner max-width cap |

The POS system does not use a centered narrow container. Content is always full-width within the shell. This is intentional — POS interfaces benefit from maximizing usable space.

### 5.2 Modal Content Width

Modals follow a separate width contract defined in [Section 10](#10-modal-responsiveness).

### 5.3 Form Container Width

Forms inside content cards follow these max-width rules:

| Context | Max Width |
|---------|-----------|
| Full-page CRUD form | `640px` (centered within card) |
| Modal form | Inherits modal width |
| Inline filter bar | `100%` of available space |

---

## 6. Page Padding Rules

### 6.1 Content Area Padding

The padding applied to the page content area (inside the app shell, below the topbar) is standardized across all tiers.

| Tier | Horizontal Padding | Vertical Padding (top) |
|------|--------------------|------------------------|
| Mobile | `--space-3` (12px) | `--space-3` (12px) |
| Tablet | `--space-4` (16px) | `--space-4` (16px) |
| Desktop | `--space-6` (24px) | `--space-5` (20px) |

Page files must never override these padding values with page-specific padding rules.

### 6.2 Content Card Inner Padding

Cards that wrap page content use consistent internal padding:

| Tier | Inner Padding |
|------|--------------|
| Mobile | `--space-3` (12px) |
| Tablet | `--space-4` (16px) |
| Desktop | `--space-5` (20px) |

### 6.3 POS Padding Exception

The POS page overrides default content area padding to zero at all tiers. The POS layout manages its own internal spacing to maximize usable screen area for the product grid and cart panel.

---

## 7. Navigation Responsiveness

### 7.1 Sidebar Behavior

The sidebar (pattern N-01) has exactly two states: fixed-visible and hidden-drawer. There is no collapsed or icon-only intermediate state in this system.

#### Desktop (≥ `--bp-desktop`)

- The sidebar is permanently visible.
- Width: `256px`, fixed.
- Position: `fixed`, left edge of viewport, full height.
- The main content area offsets by `256px` to the right.
- The sidebar requires no toggle control.
- The mobile drawer overlay is not rendered.

#### Mobile and Tablet (< `--bp-desktop`)

- The sidebar is hidden by default.
- It exists in the DOM but is positioned off-screen (translated left).
- A toggle button in the topbar triggers the open state.
- When open, the sidebar slides in from the left edge.
- A semi-transparent overlay covers the main content area behind the open sidebar.
- Tapping the overlay closes the sidebar.
- The sidebar does not push content to the right. It overlays the content.
- The sidebar width in drawer mode: `min(256px, 80vw)`. It must never occupy the full viewport width.

#### Sidebar Transition Contract

- Open/close is animated via CSS transform (`translateX`).
- Transition uses `--transition-normal`.
- The overlay fades in simultaneously with the sidebar slide.
- No layout reflow occurs during the transition. The sidebar is absolutely/fixed positioned.

### 7.2 Mobile Navigation Drawer

The mobile drawer is not a separate component. It is the same sidebar component in its mobile state. The following behavioral rules apply to the drawer state specifically:

- The drawer opens from the left edge only. Right-edge drawers are not supported.
- The drawer is dismissible by: tapping the overlay, pressing Escape, or pressing the toggle button again.
- When the drawer is open, the page behind it does not scroll.
- The drawer must be accessible: `aria-expanded`, `aria-controls`, and focus management are required.
- On drawer close, focus returns to the toggle button that opened it.

### 7.3 Topbar Behavior

The topbar (pattern N-02) is a persistent horizontal bar that spans the top of the main content area at all tiers.

| Tier | Topbar Behavior |
|------|----------------|
| Mobile | Full width of viewport. Shows hamburger toggle button on the left. |
| Tablet | Full width of viewport. Shows hamburger toggle button on the left. |
| Desktop | Full width of the main content area (viewport minus `256px` sidebar). Hamburger toggle is hidden. |

**Topbar Height Contract:**
- The topbar height is defined by `--topbar-height`.
- This token is used by the app shell to offset the content area top and by the POS layout to calculate available height.
- The topbar height must not change between breakpoints. It is a fixed value.

**Topbar Sticky Contract:**
- The topbar is always sticky to the top of the viewport.
- Page content scrolls beneath it.
- The topbar never scrolls away.
- Z-index: `--z-topbar`.

---

## 8. Table Responsiveness

### 8.1 CRUD Table → Card Transformation

Standard CRUD tables (pattern T-01) cannot be rendered as traditional tables on mobile screens. The horizontal space required by multi-column tables causes horizontal overflow, which is a violation of the overflow prevention rules (see [Section 14](#14-overflow-prevention-rules)).

The transformation contract defines how a table row becomes a card on small screens.

**Transformation Trigger:** `< --bp-tablet` (below 768px)

#### Desktop Table Layout (≥ `--bp-tablet`)

- Standard `<table>` layout.
- All columns visible.
- Table header row is visible.
- Action buttons appear in the rightmost column.
- Row height is compact (`--space-3` vertical padding per cell).

#### Mobile Card Layout (< `--bp-tablet`)

- The `<table>` element switches to block display.
- `<thead>` is visually hidden but remains in the DOM for accessibility (`sr-only` pattern).
- Each `<tr>` renders as a card block with a visible border, background, and border-radius.
- Each `<td>` renders as a full-width row with a data label prepended.
- The data label is sourced from the `data-label` attribute on each `<td>` element.
- Action buttons render at the bottom of each card, full-width or in a button row.
- Cards are separated by `--space-3` vertical gap.

**Column Priority on Mobile:**

Not all table columns need to transform to the mobile card. Columns are categorized:

| Priority | Mobile Behavior | Example Columns |
|----------|----------------|-----------------|
| Primary | Always visible, displayed prominently | Name, Product, Description |
| Secondary | Visible, standard card row | Price, Stock, Category |
| Tertiary | Hidden on mobile (< 480px), visible on tablet+ | Created date, internal ID |
| Action | Always visible, placed at card bottom | Edit, Delete buttons |

Tertiary columns use the `.hidden-mobile` responsive utility for suppression.

### 8.2 Horizontal Scroll Rules

Horizontal scrolling is forbidden as a solution to table overflow. The table-to-card transformation is the required solution.

The only exception to this rule is data export previews or tabular data in read-only audit contexts, where column fidelity is more important than mobile usability. These exceptions must be explicitly documented in the UI Pattern Registry.

When an exception is granted, the scrollable container must:

- Be scoped to the table wrapper element, not the page body.
- Display a visual scroll indicator (fade gradient on the right edge).
- Not affect the layout of surrounding elements.

---

## 9. Form Responsiveness

### 9.1 Mobile Form Stacking

All form fields in the system follow a stacking contract on mobile.

**Stacking Contract (< `--bp-tablet`):**

- All form fields occupy `100%` of the available container width.
- No inline or side-by-side field groupings exist at mobile tier.
- Labels are positioned above their inputs (stacked, not inline).
- Field groups (e.g., quantity + unit) that must remain visually paired may use a two-column micro-grid with a minimum column width of `140px`.

**Desktop Enhancement (≥ `--bp-tablet`):**

- Fields may be grouped into two-column layouts where contextually appropriate (e.g., first name + last name, price + cost).
- Inline label positioning is permitted for compact forms in specific contexts.
- Maximum form width is `640px` for full-page forms to preserve readability on wide screens.

### 9.2 Input Sizing Rules

Input dimensions scale with tier to support touch ergonomics.

| Tier | Input Height | Font Size |
|------|-------------|-----------|
| Mobile | `44px` minimum | `--text-md` |
| Tablet | `44px` minimum | `--text-md` |
| Desktop | `40px` minimum | `--text-sm` |

The `44px` minimum input height on mobile is a touch ergonomics requirement, not a visual preference (see [Section 12](#12-touch-ergonomics)).

### 9.3 Filter Bar Responsiveness

Filter bars (pattern S-01) appear above tables and the POS product grid. Their responsive behavior:

| Tier | Layout |
|------|--------|
| Mobile | Stacked vertically. Search input full-width. Filter controls below. |
| Tablet | Two-column row. Search left, primary filters right. |
| Desktop | Single horizontal row. All controls inline. |

---

## 10. Modal Responsiveness

### 10.1 Mobile Fullscreen Modal

On mobile, all modals occupy the full viewport.

**Mobile Modal Contract (< `--bp-tablet`):**

- Width: `100vw`.
- Height: `100dvh` (dynamic viewport height to account for mobile browser chrome).
- Position: fixed to all four edges of the viewport.
- Border-radius: `0` (no rounded corners — modal is flush with screen edges).
- The modal slides in from the bottom edge using a translateY animation.
- Internal content is scrollable if it exceeds the viewport height.
- A fixed header within the modal displays the title and a close button.
- The close button is always visible, regardless of scroll position.

### 10.2 Desktop Centered Modal

On desktop, modals are centered overlays with constrained widths.

**Desktop Modal Contract (≥ `--bp-tablet`):**

- Position: centered in the viewport, both horizontally and vertically.
- Vertical position: `50%` transform with a `max-height` constraint to prevent overflow on short viewports.
- Width: defined per modal type (see below).
- Border-radius: `--radius-xl`.
- The modal fades in with a subtle scale animation (`scale(0.95)` to `scale(1.0)`).
- A semi-transparent backdrop covers the page content.
- Clicking the backdrop closes the modal (unless the modal is blocking/confirmation type).

**Modal Width Tiers:**

| Modal Type | Width |
|------------|-------|
| Confirmation / simple alert | `min(400px, 90vw)` |
| Standard form modal | `min(560px, 90vw)` |
| Large form / complex content | `min(720px, 90vw)` |
| Full-detail modal (receipt, report) | `min(800px, 90vw)` |

### 10.3 Modal Scroll Contract

- The page body behind an open modal must not scroll.
- Scroll is locked on the `<body>` while any modal is open.
- Scroll within the modal content is contained to the modal's scroll region.
- The modal's header and footer (action buttons) are sticky within the modal — they do not scroll with the content.

---

## 11. POS Responsiveness

The POS interface is the most interaction-intensive surface in the system. Its responsive contracts are treated as first-class architectural specifications.

### 11.1 Product Grid Collapse

See [Section 4.1](#41-product-grid-pos) for column counts. Additional behavioral contracts:

- Product cards maintain a minimum width of `140px` at all breakpoints.
- Cards must never truncate the product name to fewer than two lines. Overflow must wrap, not clip.
- The stock badge on each card is always visible at all tiers.
- The product grid is scrollable vertically within its panel. It does not affect the height of the cart panel.

### 11.2 POS Split / Stack Layout

The POS page is divided into a product panel and a cart panel.

#### Desktop (≥ `--bp-desktop`)

- Product panel and cart panel are displayed side by side.
- Product panel: grows to fill available space (`flex: 1`).
- Cart panel: fixed width, `320px` to `360px`, defined by `--pos-cart-width`.
- Both panels occupy the full available height (viewport minus topbar).
- Both panels scroll independently within their own bounds.
- The cart panel is never hidden on desktop.

#### Mobile and Tablet (< `--bp-desktop`)

- Product panel occupies the full screen.
- Cart panel is hidden by default (off-screen or behind the product panel).
- A "View Cart" button in the topbar or a sticky bottom bar reveals the cart.
- The cart panel slides up or over the product panel as a drawer when revealed.
- The cart drawer occupies `100%` of viewport width and a defined percentage of viewport height (`85dvh` maximum).
- A close/back control within the cart drawer returns the user to the product grid.
- If the cart has items, a persistent cart summary bar is shown at the bottom of the product panel (see [Section 11.3](#113-cart-drawer-behavior)).

### 11.3 Cart Drawer Behavior

On mobile and tablet, the cart is accessed via a drawer.

**Cart Drawer Contract:**

- The cart drawer slides up from the bottom edge of the viewport.
- The drawer is not fullscreen. It reveals a portion of the product panel above.
- A drag handle at the top of the drawer allows expansion to fullscreen.
- The drawer is dismissible by: dragging it down, tapping the dimmed area above, or pressing the back/close button.
- When the cart is empty, the cart drawer cannot be opened (the trigger is disabled and visually indicated).
- The cart item list within the drawer is independently scrollable.
- The checkout totals and action button are pinned to the bottom of the drawer (see [Section 11.4](#114-checkout-sticky-behavior)).

**Cart Summary Bar (Mobile/Tablet):**

When the cart drawer is closed but contains items, a summary bar is pinned to the bottom of the product panel. This bar:

- Displays the item count and total amount.
- Contains a single primary button to open the cart drawer.
- Has a height of `56px` minimum (touch-safe).
- Uses `--z-sticky` z-index.
- Remains visible while the user browses products.

### 11.4 Checkout Sticky Behavior

The checkout totals block (pattern P-03) is always sticky at the bottom of its containing panel, regardless of the number of cart items.

**Desktop:**

- The totals block sticks to the bottom of the cart panel column.
- The cart item list scrolls above it.

**Mobile (Drawer):**

- The totals block sticks to the bottom of the cart drawer.
- The cart item list scrolls above it within the drawer.

**Contract:**

- The checkout totals block must always be visible without scrolling.
- The primary "Checkout" or "Pay" action button must always be within thumb reach.
- The sticky behavior must not be implemented with JavaScript scroll listeners. It must use CSS `position: sticky` where the layout permits, or `position: fixed` within a controlled container where sticky is insufficient.

### 11.5 Payment Modal Behavior

The payment modal follows the general modal rules (Section 10) with the following POS-specific overrides:

| Tier | Behavior |
|------|----------|
| Mobile | Fullscreen modal, slides from bottom. Payment method selector stacks vertically. Amount input is large (`48px` height). |
| Desktop | Centered modal, `min(480px, 90vw)` width. Payment method selector may use a horizontal button row. |

- The numeric input for payment amount must always display at `--text-xl` or larger on mobile to facilitate fast entry and verification.
- The confirm/process button must be full-width at all tiers within the payment modal.
- The loading state during payment processing must overlay the entire modal, not just the button.

---

## 12. Touch Ergonomics

### 12.1 Tap Target Rules

All interactive elements must meet minimum tap target dimensions on mobile and tablet tiers.

| Element Type | Minimum Width | Minimum Height |
|--------------|--------------|----------------|
| Primary buttons | `100%` of container (mobile) | `44px` |
| Secondary buttons | Auto | `44px` |
| Icon buttons | `44px` | `44px` |
| Nav items (sidebar) | `100%` of sidebar | `48px` |
| Table action buttons | `44px` | `44px` |
| Form inputs | `100%` | `44px` |
| Product cards (POS) | Full grid column | `min 100px` |
| Cart item row | `100%` | `56px` |
| Checkout button | `100%` | `52px` |

Tap target minimums apply at `< --bp-desktop`. On desktop, standard compact dimensions apply.

### 12.2 Mobile Spacing Rules

Touch interfaces require larger spatial separations between interactive elements to prevent mis-taps.

| Context | Minimum Spacing Between Targets |
|---------|---------------------------------|
| Stacked buttons | `--space-2` (8px) |
| Adjacent icon buttons in a toolbar | `--space-1` (4px) — use padding to extend hit area instead |
| Table action columns | `--space-2` (8px) between buttons |
| Navigation list items | No gap needed — full-width items are self-separating |
| Cart item controls (qty +/-) | `--space-2` (8px) between buttons |

### 12.3 Font Size Floor

On mobile, no interactive label, product name, price, or status text may render below `--text-sm`. Smaller text sizes are reserved for non-interactive metadata only (e.g., timestamps, IDs).

---

## 13. Sticky Element Rules

### 13.1 Permitted Sticky Elements

The following elements may use sticky or fixed positioning. No other elements in the system should use sticky or fixed positioning unless explicitly added to this list.

| Element | Positioning | Scope | Z-Index Token |
|---------|------------|-------|---------------|
| Topbar | `position: fixed` | Viewport | `--z-topbar` |
| Sidebar (desktop) | `position: fixed` | Viewport | `--z-sidebar` |
| Cart checkout totals (desktop) | `position: sticky` | Cart column | `--z-base` |
| Cart checkout totals (mobile drawer) | `position: sticky` | Drawer | `--z-base` |
| Cart summary bar (mobile) | `position: fixed` | Viewport bottom | `--z-sticky` |
| Toast notifications | `position: fixed` | Viewport | `--z-toast` |
| Modal and backdrop | `position: fixed` | Viewport | `--z-modal` |
| Filter bar (table pages) | Not sticky by default | Scrolls with content | — |

### 13.2 Content Offset Rules

Sticky elements at the top of the viewport create visual obstruction for content that scrolls behind them. All scrollable content areas must account for this offset.

- Main content area: offset top by `--topbar-height`.
- On mobile, if a sticky filter bar or bottom cart bar is present, the scrollable content must also account for that element's height.
- These offsets must be calculated using the same token values used to define the sticky elements themselves. Arbitrary pixel offsets are forbidden.

### 13.3 Mobile Bottom Bar Stacking

On mobile, the bottom of the viewport may contain multiple sticky elements in some states (e.g., cart summary bar + browser navigation chrome). The following stacking priority applies, from bottom to top:

1. Browser chrome (not controlled)
2. Cart summary bar (`--z-sticky`)
3. Toast notifications (`--z-toast`)

Toast notifications must not be obscured by the cart summary bar. The toast position must account for the cart bar height when it is visible.

---

## 14. Overflow Prevention Rules

### 14.1 Horizontal Overflow Is Forbidden

No page, component, or pattern in this system may cause horizontal overflow of the viewport. Horizontal scrolling at the document level is a critical layout failure.

**Causes to prevent:**

- Tables rendered as traditional `<table>` on mobile (use card transformation, Section 8.1).
- Long unbreakable strings (URLs, SKUs, codes) — apply `overflow-wrap: break-word` or `word-break: break-word` on all text containers.
- Fixed-width elements wider than the viewport — all fixed widths must be bounded by `max-width: 100%`.
- Padding and margin pushing elements outside their container — use `box-sizing: border-box` globally (established in `base/reset.css`).

### 14.2 Vertical Overflow in Constrained Panels

Panels with a defined height (cart panel, modal content, drawer content) must handle vertical overflow explicitly.

**Contract:**

- Scrollable panels must define `overflow-y: auto` on the scroll container.
- The scroll container must have an explicit `max-height` or be sized by the flex/grid parent to prevent unconstrained growth.
- Momentum scrolling (`-webkit-overflow-scrolling: touch`) must be enabled on iOS for all scroll containers.
- Scrollbars must be styled consistently per the global scrollbar rules in `base/globals.css`.

### 14.3 Text Overflow in Cards and Cells

Long text values in product cards, table cells, and cart rows must be handled without causing layout overflow.

| Context | Text Overflow Rule |
|---------|-------------------|
| Product card name | 2-line clamp. Truncate with ellipsis after 2 lines. |
| Table cell (primary column) | 1-line truncate with ellipsis. Tooltip on hover. |
| Cart item name | 1-line truncate with ellipsis. |
| Badge / status label | No truncation. Badges must be sized to their content. |
| Toast message | 2-line clamp. Excess is cut off. |

---

## 15. Responsive Utility Behavior

### 15.1 Visibility Utilities

The utility layer provides responsive visibility helpers. These are the only sanctioned mechanism for showing and hiding elements based on breakpoint.

| Utility Class | Behavior |
|--------------|----------|
| `.hidden-mobile` | Hidden below `--bp-tablet`. Visible at tablet and above. |
| `.hidden-tablet` | Hidden below `--bp-desktop`. Visible at desktop and above. |
| `.visible-mobile-only` | Visible below `--bp-tablet`. Hidden at tablet and above. |
| `.visible-tablet-only` | Visible at tablet tier only (≥ 768px and < 1024px). |
| `.hidden` | Hidden at all breakpoints (utility, not responsive). |

These utilities use `display: none` for hiding. Screen reader visibility must be handled separately with the `.sr-only` pattern where content needs to remain accessible when visually hidden.

### 15.2 Responsive Display Utilities

| Utility Class | Behavior |
|--------------|----------|
| `.flex-mobile` | `display: flex` below `--bp-tablet`, `display: block` above. |
| `.block-mobile` | `display: block` below `--bp-tablet`. |
| `.flex-desktop` | `display: none` below `--bp-desktop`, `display: flex` above. |

### 15.3 Responsive Spacing Utilities

Spacing utilities do not vary by breakpoint by default. Responsive spacing adjustments are owned by the component or layout layer, not the utility layer.

If a spacing adjustment is needed specifically for a breakpoint, it must be written within the relevant component CSS file — not as a new responsive utility class.

### 15.4 AI Agent Responsive Rules

AI agents generating CSS or HTML for this system must follow these responsive rules without exception:

1. Never write `max-width` media queries.
2. Never hardcode pixel breakpoint values — always reference the token.
3. Never add responsive behavior in page-level CSS files.
4. Never use `!important` to override responsive behavior.
5. Always write default styles for mobile first.
6. Always use the closest standardized breakpoint — never invent a custom breakpoint.
7. Always verify that interactive elements meet the 44px tap target minimum on mobile.
8. Always use responsive visibility utilities from this document — never write ad-hoc `display: none` rules at arbitrary breakpoints.
9. Always check that new patterns do not introduce horizontal overflow.
10. Always treat the POS interface as the highest-priority responsive context.

---

## Appendix A — Responsive Contract Summary Table

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Sidebar | Drawer, hidden | Drawer, hidden | Fixed, 256px |
| Topbar | Full width, hamburger visible | Full width, hamburger visible | Main area width, hamburger hidden |
| CRUD Table | Card layout | Card layout | Traditional table |
| CRUD Form | Stacked fields, full-width inputs | Stacked fields | Grouped fields permitted |
| Modal | Fullscreen, slides from bottom | Fullscreen, slides from bottom | Centered, constrained width |
| POS Layout | Stacked, cart is drawer | Stacked, cart is drawer | Split, cart panel fixed |
| POS Product Grid | 2 columns | 3 columns | 4 columns |
| Dashboard Stats | 1–2 columns | 2 columns | 4 columns |
| Dashboard Charts | 1 column | 1 column | 2 columns |
| Cart Summary Bar | Visible when cart has items | Visible when cart has items | Not rendered |
| Checkout Totals | Sticky in drawer | Sticky in drawer | Sticky in cart panel |
| Filter Bar | Stacked | Two-column row | Inline row |

---

## Appendix B — Responsive Token Dependencies

All responsive behavior in this document depends on the following tokens being defined in the token layer before any implementation begins.

| Token | Used In |
|-------|---------|
| `--bp-mobile` | Product grid micro-adjustment, stat row |
| `--bp-tablet` | Most layout collapse, table transformation, modal transition |
| `--bp-desktop` | App shell split, sidebar appearance, POS split layout |
| `--bp-wide` | Product grid wide enhancement |
| `--topbar-height` | Content area offset, POS height calculation |
| `--pos-cart-width` | POS split layout, cart panel sizing |
| `--z-topbar` | Topbar stacking |
| `--z-sidebar` | Sidebar stacking |
| `--z-modal` | Modal and backdrop stacking |
| `--z-sticky` | Cart summary bar |
| `--z-toast` | Toast notification stacking |
| `--transition-normal` | Sidebar drawer animation, modal animation |
| `--space-3` through `--space-6` | Page padding, grid gaps |

These tokens must be defined and stable before any responsive pattern is implemented. Implementing patterns before tokens are finalized will create drift between the design contract and the implementation.
