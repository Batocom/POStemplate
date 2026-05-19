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

2. Base Layer

Defines global browser normalization.

Responsibilities:

reset styles
typography defaults
body styles
accessibility defaults
scrollbar styles
default animations

Files:

reset.css
globals.css
animations.css
3. Utility Layer

Defines reusable helper classes.

Responsibilities:

layout utilities
spacing utilities
flex/grid helpers
typography utilities
visibility helpers
responsive helpers

Utilities must:

remain single-purpose
remain low-specificity
avoid business meaning

Example:

.flex
.flex-col
.items-center
.gap-4
.w-full
.hidden-mobile

Utilities are preferred over repetitive component CSS.

4. Layout Layer

Defines application structure.

Responsibilities:

app shell
sidebar
topbar
responsive containers
grid systems
page wrappers

This layer controls:

responsive layout shifts
navigation behavior
content spacing
shell consistency

Files:

app-shell.css
sidebar.css
topbar.css
grid.css
containers.css
5. Component Layer

Defines reusable UI components.

Responsibilities:

buttons
forms
cards
tables
modals
dropdowns
cart UI
toasts

Components must:

be reusable
remain isolated
avoid page dependencies
use centralized tokens
use utility composition where possible
Styling Directory Structure
ui/
└── styles/
    ├── tokens/
    │   ├── colors.css
    │   ├── spacing.css
    │   ├── typography.css
    │   ├── shadows.css
    │   ├── radius.css
    │   ├── breakpoints.css
    │   └── zindex.css
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
    └── main.css
Responsive Architecture
Mobile-First Strategy

The application follows a strict mobile-first approach.

Rules:

default styles target mobile
larger breakpoints progressively enhance layouts
desktop styles must NEVER override mobile hacks

Correct:

.card-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

Incorrect:

.card-grid {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
Breakpoints

Breakpoints are centralized.

:root {
  --bp-mobile: 480px;
  --bp-tablet: 768px;
  --bp-desktop: 1024px;
  --bp-wide: 1280px;
}

All responsive behavior must use standardized breakpoints.

Custom breakpoints are forbidden.

Responsive Layout Rules
Sidebar Behavior

Desktop:

fixed sidebar
persistent navigation

Mobile:

hidden drawer
overlay navigation
toggle button
Tables

Desktop:

traditional table layout

Mobile:

responsive card transformation

Horizontal scrolling should be minimized.

POS Layout

Desktop:

split product/cart layout

Mobile:

stacked layout
collapsible cart
bottom checkout area
Forms

Mobile:

full-width inputs
stacked fields

Desktop:

grouped inline fields where appropriate
Design Tokens
Colors

All colors must use CSS variables.

Forbidden:

background: #2563eb;

Required:

background: var(--color-primary);
Spacing Scale

Spacing must follow token scale.

Example:

--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;

Arbitrary spacing values are forbidden.

Typography Scale

Typography must use predefined scale.

Example:

--text-xs
--text-sm
--text-md
--text-lg
--text-xl
Component Architecture
Component Isolation

Each reusable component should contain:

HTML structure
component logic
isolated styling

But components must still use:

global tokens
utilities
responsive primitives
Naming Convention

The project follows component-based naming.

Example:

.cart-item
.cart-item__name
.cart-item__price
.cart-item--selected

Global utility names remain short:

.flex
.hidden
.gap-2
Specificity Rules

The system prioritizes low-specificity CSS.

Forbidden:

!important
deeply nested selectors
ID selectors

Preferred:

.button
.card
.modal

Avoid:

.dashboard .content .table .row .button
Page Styling Rules

Pages may define:

page-specific layout
module-specific composition

Pages may NOT:

redefine tokens
duplicate component styles
hardcode responsive behavior
create new utility systems
AI Agent Styling Rules

AI agents working on this project must:

Never hardcode colors
Never hardcode spacing values
Never add inline styles
Never create page-specific breakpoints
Always use tokens
Always use utilities first
Preserve component isolation
Use mobile-first CSS only
Avoid style duplication
Preserve naming conventions
Existing Refactor Requirements

The current system contains:

inline styles
duplicated layouts
page-level responsive logic
inconsistent spacing
repeated colors

These must be progressively migrated into:

tokens
utilities
reusable components
Migration Strategy

Migration must occur in phases.

Phase 1 — Foundation
design tokens
reset styles
utility system
responsive framework
Phase 2 — Layout
app shell
sidebar
topbar
containers
Phase 3 — Components
buttons
forms
tables
modals
cards
Phase 4 — Responsive Patterns
responsive tables
mobile navigation
responsive grids
POS mobile behavior
Phase 5 — Page Migration
dashboard
products
categories
sales
stock
POS
Phase 6 — Cleanup
remove legacy CSS
remove duplicated styles
remove inline styles
POS-Specific Styling Rules

The POS page is the most interaction-heavy interface.

Special considerations:

touch-friendly spacing
large tap targets
responsive cart behavior
sticky checkout controls
fast rendering
minimal layout shift

The POS interface should prioritize:

transaction speed
readability
mobile ergonomics
cashier efficiency
Long-Term Styling Goals

Future goals include:

dark mode
theme customization
multi-brand support
white-label support
PWA optimization
offline-friendly rendering
animation system
accessibility improvements

The styling architecture must remain flexible enough to support future migration to:

React
Tailwind
CSS Modules
design systems
external frontend frameworks
