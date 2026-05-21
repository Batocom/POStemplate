# Styling Architecture

## Overview

This document defines the styling architecture for the POS system.

The styling system is designed to support:

- mobile responsiveness
- scalability
- centralized styling
- AI-assisted development
- reusable UI components
- maintainable layouts
- predictable rendering behavior
- future theming support
- migration safety

The architecture follows the same philosophy as the backend system:

- modularity
- separation of concerns
- centralized rules
- predictable structure
- reusable primitives
- explicit UI behavior

The styling system is NOT page-driven.

It is:
- token-driven
- utility-driven
- component-driven
- responsive-first

---

# Core Philosophy

The styling architecture follows these principles:

1. Mobile-first design
2. Centralized design tokens
3. Reusable layout primitives
4. Predictable responsive behavior
5. Component isolation
6. Minimal style duplication
7. Low specificity CSS
8. AI-readable structure
9. Utility-first composition
10. Migration-safe UI architecture

---

# Styling Layers

The styling system is divided into 5 major layers.

## 1. Token Layer

Defines all design values.

Responsibilities:
- colors
- spacing
- typography
- radius
- shadows
- z-index
- breakpoints
- transitions

Tokens are the single source of truth.

Example:

```css
:root {
  --color-primary: #2563eb;
  --space-4: 16px;
  --radius-md: 12px;
}
```

## 2. Base Layer

Defines global browser normalization.

Responsibilities:

- reset styles
- typography defaults
- body styles
- accessibility defaults
- scrollbar styles
- default animations

Files:

- reset.css
- globals.css
- animations.css

## 3. Utility Layer

Defines reusable helper classes.

Responsibilities:

- layout utilities
- spacing utilities
- flex/grid helpers
- typography utilities
- visibility helpers
- responsive helpers

Utilities must:

- remain single-purpose
- remain low-specificity
- avoid business meaning

Example:

```css
.flex
.flex-col
.items-center
.gap-4
.w-full
.hidden-mobile
```

Utilities are preferred over repetitive component CSS.

## 4. Layout Layer

Defines application structure.

Responsibilities:

- app shell
- sidebar
- topbar
- responsive containers
- grid systems
- page wrappers

This layer controls:

- responsive layout shifts
- navigation behavior
- content spacing
- shell consistency

Files:

- app-shell.css
- sidebar.css
- topbar.css
- grid.css
- containers.css

## 5. Component Layer

Defines reusable UI components.

Responsibilities:

- buttons
- forms
- cards
- tables
- modals
- dropdowns
- cart UI
- toasts

Components must:

- be reusable
- remain isolated
- avoid page dependencies
- use centralized tokens
- use utility composition where possible

---

# Styling Directory Structure

```
ui/
└── styles/
    ├── tokens/
    │   ├── colors.css
    │   ├── spacing.css
    │   ├── typography.css
    │   ├── shadows.css
    │   ├── radius.css
    │   ├── breakpoints.css
    │   ├── zindex.css
    │   ├── animations.css
    │   └── layout.css
    │
    ├── base/
    │   ├── reset.css
    │   ├── globals.css
    │   └── animations.css
    │
    ├── utilities/
    │   ├── layout.css
    │   ├── flex.css
    │   ├── spacing.css
    │   ├── typography.css
    │   ├── visibility.css
    │   └── responsive.css
    │
    ├── layout/
    │   ├── app-shell.css
    │   ├── sidebar.css
    │   ├── topbar.css
    │   ├── grid.css
    │   └── containers.css
    │
    ├── components/
    │   ├── buttons.css
    │   ├── forms.css
    │   ├── cards.css
    │   ├── tables.css
    │   ├── modals.css
    │   ├── dropdowns.css
    │   ├── toast.css
    │   └── cart.css
    │
    ├── pages/
    │   ├── dashboard.css
    │   ├── products.css
    │   ├── categories.css
    │   ├── sales.css
    │   ├── stock.css
    │   └── pos.css
    │
    └── stylesLoader.html  ← THE KEY FILE
```

---

# CSS Aggregation Strategy

Google Apps Script does not support CSS `@import` or `<link>` tags reliably.
All CSS must be served as a single `<style>` block in the HTML head.

## The `stylesLoader.html` Pattern

`stylesLoader.html` is the single CSS aggregator file. It uses server-side
`<?!= include() ?>` directives to concatenate all CSS files into one
`<style>` block at render time.

**File: `src/ui/styles/stylesLoader.html`**

```html
<style>
/* ===== TOKENS ===== */

/* colors.html */
:root {
  /* ===== PRIMARY SCALE ===== */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-subtle: #dbeafe;

  /* ===== SEMANTIC FEEDBACK COLORS ===== */
  --color-danger: #ef4444;
  --color-danger-hover: #dc2626;
  --color-danger-subtle: #fee2e2;
  --color-success: #10b981;
  --color-success-subtle: #d1fae5;
  --color-warning: #f59e0b;
  --color-warning-subtle: #fef3c7;
  --color-info: #3b82f6;
  --color-info-subtle: #dbeafe;

  /* ===== SURFACE / BACKGROUND COLORS ===== */
  --color-bg-surface: #f9fafb;
  --color-bg-card: #ffffff;
  --color-bg-subtle: #f3f4f6;

  /* ===== BORDER COLORS ===== */
  --color-border-default: #d1d5db;
  --color-border-subtle: #e5e7eb;

  /* ===== TEXT COLORS ===== */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-disabled: #9ca3af;

  /* ===== OVERLAY COLORS ===== */
  --color-overlay: rgba(0, 0, 0, 0.5);
  --color-overlay-light: rgba(255, 255, 255, 0.85);

  /* ===== SIDEBAR-SPECIFIC COLORS ===== */
  --color-sidebar-bg: #111827;
  --color-sidebar-text: #ffffff;
  --color-sidebar-hover: rgba(255, 255, 255, 0.1);
  --color-sidebar-active: #2563eb;

  /* ===== TEXT ON COLORED BACKGROUNDS ===== */
  --color-text-on-primary: #ffffff;
  --color-text-on-danger: #ffffff;
}

/* spacing.html */
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 48px;
}

/* typography.html */
:root {
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

/* radius.html */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

/* shadows.html */
:root {
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.1);
  --shadow-lg: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-xl: 0 8px 24px rgba(0,0,0,0.2);
}

/* zindex.html */
:root {
  --z-base: 1;
  --z-sticky: 100;
  --z-topbar: 200;
  --z-sidebar: 300;
  --z-dropdown: 400;
  --z-modal: 500;
  --z-toast: 600;
}

/* breakpoints.html */
:root {
  --bp-mobile: 480px;
  --bp-tablet: 768px;
  --bp-desktop: 1024px;
  --bp-wide: 1280px;
}

/* animations.html */
:root {
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 400ms;
  --easing-default: ease;
}

/* layout.html */
:root {
  --topbar-height: 56px;
  --sidebar-width: 256px;
  --pos-cart-width: 360px;
}
</style>
<?!= include('styles/base/reset.html'); ?>
```

## How It's Loaded

In the application's HTML shell (e.g., `app.html` or `index.html`), include
`stylesLoader.html` in the `<head>` section:

```html
<head>
  <?!= include('styles/stylesLoader.html'); ?>
  <!-- No other CSS files are linked individually -->
</head>
```

## Rules for CSS Files

- Each `.css` file contains only CSS rules — no HTML, no `<style>` tags
- No CSS file uses `@import` — all aggregation is done via `stylesLoader.html`
- No CSS file uses `<link>` — all loading is done via `<?!= include() ?>`
- The include order in `stylesLoader.html` defines the cascade order
- Tokens must be included before base, base before utilities, etc.

---

# Responsive Architecture

## Mobile-First Strategy

The application follows a strict mobile-first approach.

Rules:

- default styles target mobile
- larger breakpoints progressively enhance layouts
- desktop styles must NEVER override mobile hacks

Correct:

```css
.card-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Incorrect:

```css
.card-grid {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

## Breakpoints

Breakpoints are centralized.

All responsive behavior must use standardized breakpoints.

Custom breakpoints are forbidden.

## Responsive Layout Rules

### Sidebar Behavior

Desktop:

- fixed sidebar
- persistent navigation

Mobile:

- hidden drawer
- overlay navigation
- toggle button

### Tables

Desktop:

- traditional table layout

Mobile:

- responsive card transformation

Horizontal scrolling should be minimized.

### POS Layout

Desktop:

- split product/cart layout

Mobile:

- stacked layout
- collapsible cart
- bottom checkout area

### Forms

Mobile:

- full-width inputs
- stacked fields

Desktop:

- grouped inline fields where appropriate

---

# Design Tokens

## Colors

All colors must use CSS variables.

Forbidden:

```css
background: #2563eb;
```

Required:

```css
background: var(--color-primary);
```

## Spacing Scale

Spacing must follow token scale.

Example:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
```

Arbitrary spacing values are forbidden.

## Typography Scale

Typography must use predefined scale.

Example:

```css
--text-xs
--text-sm
--text-md
--text-lg
--text-xl
```

---

# Component Architecture

## Component Isolation

Each reusable component should contain:

- HTML structure
- component logic
- isolated styling

But components must still use:

- global tokens
- utilities
- responsive primitives

## Naming Convention

The project follows component-based naming.

Example:

```css
.cart-item
.cart-item__name
.cart-item__price
.cart-item--selected
```

Global utility names remain short:

```css
.flex
.hidden
.gap-2
```

## Specificity Rules

The system prioritizes low-specificity CSS.

Forbidden:

- `!important`
- deeply nested selectors
- ID selectors

Preferred:

```css
.button
.card
.modal
```

Avoid:

```css
.dashboard .content .table .row .button
```

---

# Page Styling Rules

Pages may define:

- page-specific layout
- module-specific composition

Pages may NOT:

- redefine tokens
- duplicate component styles
- hardcode responsive behavior
- create new utility systems

---

# AI Agent Styling Rules

AI agents working on this project must:

- Never hardcode colors
- Never hardcode spacing values
- Never add inline styles
- Never create page-specific breakpoints
- Always use tokens
- Always use utilities first
- Preserve component isolation
- Use mobile-first CSS only
- Avoid style duplication
- Preserve naming conventions
- Never use CSS `@import` — use `<?!= include() %>` in `stylesLoader.html`
- Never use `<link>` tags for CSS — use `<?!= include() %>` in `stylesLoader.html`
- Never create a `main.css` — `stylesLoader.html` is the aggregator

---

# Existing Refactor Requirements

The current system contains:

- inline styles
- duplicated layouts
- page-level responsive logic
- inconsistent spacing
- repeated colors

These must be progressively migrated into:

- tokens
- utilities
- reusable components

---

# Migration Strategy

Migration must occur in phases.

## Phase 1 — Foundation

- design tokens (9 token files in `tokens/`)
- base styles (`reset.css`, `globals.css`, `animations.css`)
- utility system (6 utility files)
- `stylesLoader.html` (the CSS aggregator)
- Wire `stylesLoader.html` into the app shell

## Phase 2 — Layout

- app shell
- sidebar
- topbar
- containers

## Phase 3 — Components

- buttons
- forms
- tables
- modals
- cards

## Phase 4 — Responsive Patterns

- responsive tables
- mobile navigation
- responsive grids
- POS mobile behavior

## Phase 5 — Page Migration

- dashboard
- products
- categories
- sales
- stock
- POS

## Phase 6 — Cleanup

- remove legacy CSS
- remove duplicated styles
- remove inline styles

---

# POS-Specific Styling Rules

The POS page is the most interaction-heavy interface.

Special considerations:

- touch-friendly spacing
- large tap targets
- responsive cart behavior
- sticky checkout controls
- fast rendering
- minimal layout shift

The POS interface should prioritize:

- transaction speed
- readability
- mobile ergonomics
- cashier efficiency

---

# Long-Term Styling Goals

Future goals include:

- dark mode
- theme customization
- multi-brand support
- white-label support
- PWA optimization
- offline-friendly rendering
- animation system
- accessibility improvements

The styling architecture must remain flexible enough to support future migration to:

- React
- Tailwind
- CSS Modules
- design systems
- external frontend frameworks
