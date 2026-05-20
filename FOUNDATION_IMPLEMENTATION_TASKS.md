cat > /mnt/user-data/outputs/implementation_tasks.md << 'ENDOFFILE'
# Implementation Tasks

**Version:** 1.1 (Apps Script Safe Format)
**Status:** Execution-Ready
**Depends On:** `UI_AUDIT.md`, `UI_PATTERN_REGISTRY.md`, `RESPONSIVE_PATTERNS.md`, `STYLING_ARCHITECTURE.md`, `MIGRATION_PLAN.md`

Every task in this document is:
- **Tiny** — solves exactly one problem
- **Isolated** — touches 1–3 files maximum
- **Reversible** — has an explicit rollback plan
- **Verifiable** — has observable, testable success criteria

Tasks are grouped by migration phase. No task may begin before all tasks in the preceding phase are complete.

---

## Phase 1 — Design System Foundation

---

### TASK-001 — Audit Existing Token Declarations

**OBJECTIVE**
Identify every CSS custom property currently defined in `theme.html`, map each one against the token taxonomy in `STYLING_ARCHITECTURE.md`, and produce a gap report listing: tokens that exist and are correct, tokens that exist but are unused, and tokens that are missing.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Token Layer definition
- `UI_AUDIT.md` — Major Architectural Problems: Duplicated Styling Systems

**ALLOWED FILES**
- `src/ui/styles/theme.html` (read only)
- `src/ui/styles/responsive.html` (read only)

**FORBIDDEN**
- Do not modify any file in this task
- Do not create any new files in this task
- Do not begin token file creation — this task is audit only

**IMPLEMENTATION RULES**
- Read `theme.html` and list every `:root` CSS custom property
- For each property, note: name, value, whether it is consumed anywhere in the codebase
- Cross-reference against the token cross-reference table in `UI_PATTERN_REGISTRY.md`
- Produce a written gap list, not code

**SUCCESS CRITERIA**
- Every CSS custom property in `theme.html` is accounted for
- Every token required by `UI_PATTERN_REGISTRY.md` is identified as present or absent
- The gap list is complete and explicit

**VERIFICATION CHECKLIST**
- [ ] All `:root` properties from `theme.html` are listed
- [ ] All tokens from the Registry cross-reference table are marked present/absent
- [ ] Gap list is complete

**ROLLBACK PLAN**
No files are modified. Nothing to roll back.

---

### TASK-002 — Create Color Token File

**OBJECTIVE**
Create `src/ui/styles/tokens/colors.html` containing all color tokens required by the pattern registry. All values must be sourced directly from the UI Audit's documented existing hex values — no new colors introduced.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Token Layer, Colors section
- `UI_AUDIT.md` — Inconsistent Spacing Systems (color value inventory)
- `UI_PATTERN_REGISTRY.md` — Pattern Token Cross-Reference table

**ALLOWED FILES**
- `src/ui/styles/tokens/colors.html` (create new)

**FORBIDDEN**
- Do not modify any existing file
- Do not introduce any color value not documented in `UI_AUDIT.md`
- Do not add Tailwind class names
- Do not reference any other token file (color tokens are self-contained)

**IMPLEMENTATION RULES**
- Define the following token groups in order: primary scale, semantic feedback colors and their `-subtle` variants, surface/background colors, border colors, text colors, overlay colors, sidebar-specific colors
- Every token name must match the naming convention in `UI_PATTERN_REGISTRY.md`
- Required tokens include at minimum: `--color-primary`, `--color-primary-hover`, `--color-primary-subtle`, `--color-danger`, `--color-danger-hover`, `--color-danger-subtle`, `--color-success`, `--color-success-subtle`, `--color-warning`, `--color-warning-subtle`, `--color-info`, `--color-info-subtle`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-subtle`, `--color-border-default`, `--color-border-subtle`, `--color-text-primary`, `--color-text-secondary`, `--color-text-disabled`, `--color-overlay`, `--color-overlay-light`, `--color-sidebar-bg`, `--color-sidebar-text`, `--color-sidebar-hover`, `--color-sidebar-active`, `--color-text-on-primary`, `--color-text-on-danger`

**File Format:**
```html
<style>
:root {
  --color-primary: #2563eb;
  /* ... all color tokens ... */
}
</style>
```

**SUCCESS CRITERIA**
- `tokens/colors.html` exists and is valid HTML with `<style>` wrapper
- Every token in the cross-reference table under Color is defined
- Every value matches an audited hex value from `UI_AUDIT.md`
- No raw hex values outside this file

**VERIFICATION CHECKLIST**
- [ ] File parses without errors
- [ ] Every token required by the registry is present
- [ ] Values sourced from audit (no invented values)
- [ ] No Tailwind class names appear

**ROLLBACK PLAN**
Delete `src/ui/styles/tokens/colors.html`. No other files were modified.

---

### TASK-003 — Create Spacing Token File

**OBJECTIVE**
Create `src/ui/styles/tokens/spacing.html` defining the spacing scale from `--space-1` through `--space-8`.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Spacing Scale section
- `RESPONSIVE_PATTERNS.md` — Section 6, Page Padding Rules

**ALLOWED FILES**
- `src/ui/styles/tokens/spacing.html` (create new)

**FORBIDDEN**
- Do not modify any existing file
- Do not define spacing values not mappable from the audited values (4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px)
- Do not use Tailwind notation

**IMPLEMENTATION RULES**
- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`
- `--space-7: 32px`
- `--space-8: 48px`
- Scale must cover every spacing value documented in `UI_AUDIT.md`

**File Format:**
```html
<style>
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
</style>
```

**SUCCESS CRITERIA**
- File exists and parses without errors
- Scale covers every spacing value identified in the audit

**VERIFICATION CHECKLIST**
- [ ] 8 tokens defined (`--space-1` through `--space-8`)
- [ ] Values are 4px-increment multiples
- [ ] Every audited spacing value maps to a token

**ROLLBACK PLAN**
Delete `src/ui/styles/tokens/spacing.html`. No other files modified.

---

### TASK-004 — Create Typography Token File

**OBJECTIVE**
Create `src/ui/styles/tokens/typography.html` defining font size, font weight, and line height tokens.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Typography Scale section
- `UI_AUDIT.md` — Inconsistent Typography Systems

**ALLOWED FILES**
- `src/ui/styles/tokens/typography.html` (create new)

**FORBIDDEN**
- Do not modify any existing file
- Do not use Tailwind text-scale names as token names (use `--text-xs`, not `text-xs`)
- Do not define px values — use rem for all font sizes

**IMPLEMENTATION RULES**
- Font size scale: `--text-xs: 0.75rem`, `--text-sm: 0.875rem`, `--text-md: 1rem`, `--text-lg: 1.125rem`, `--text-xl: 1.25rem`, `--text-2xl: 1.5rem`
- Font weight: `--font-weight-normal: 400`, `--font-weight-medium: 500`, `--font-weight-semibold: 600`, `--font-weight-bold: 700`
- Line height: `--leading-tight: 1.25`, `--leading-normal: 1.5`, `--leading-relaxed: 1.75`
- Font family: `--font-family-base` set to the system font stack from `app-shell-style-inventory.md`

**File Format:**
```html
<style>
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  /* ... all typography tokens ... */
}
</style>
```

**SUCCESS CRITERIA**
- File exists and parses
- Scale covers every font size documented in the audit
- `--text-sm` maps to the audited `0.875rem` / Tailwind `text-sm` equivalent

**VERIFICATION CHECKLIST**
- [ ] Font size tokens defined
- [ ] Font weight tokens defined
- [ ] Line height tokens defined
- [ ] Font family token defined
- [ ] Values in rem, not px

**ROLLBACK PLAN**
Delete `src/ui/styles/tokens/typography.html`. No other files modified.

---

### TASK-005 — Create Radius, Shadow, and Z-Index Token Files

**OBJECTIVE**
Create three token files: `tokens/radius.html`, `tokens/shadows.html`, and `tokens/zindex.html`.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Token Layer
- `RESPONSIVE_PATTERNS.md` — Section 13, Sticky Element Rules (z-index stack)
- `UI_PATTERN_REGISTRY.md` — Pattern Token Cross-Reference table

**ALLOWED FILES**
- `src/ui/styles/tokens/radius.html` (create new)
- `src/ui/styles/tokens/shadows.html` (create new)
- `src/ui/styles/tokens/zindex.html` (create new)

**FORBIDDEN**
- Do not modify any existing file
- Do not define z-index values that conflict with the stack defined in `RESPONSIVE_PATTERNS.md` Section 13.1

**IMPLEMENTATION RULES**
- Radius: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`, `--radius-xl: 16px`, `--radius-full: 9999px`
- Shadows: `--shadow-sm: 0 1px 3px rgba(0,0,0,0.05)`, `--shadow-md: 0 2px 8px rgba(0,0,0,0.1)`, `--shadow-lg: 0 4px 12px rgba(0,0,0,0.15)`, `--shadow-xl: 0 8px 24px rgba(0,0,0,0.2)`
- Z-index stack (ascending): `--z-base: 1`, `--z-sticky: 100`, `--z-topbar: 200`, `--z-sidebar: 300`, `--z-dropdown: 400`, `--z-modal: 500`, `--z-toast: 600`

**File Format (each file):**
```html
<style>
:root {
  /* tokens */
}
</style>
```

**SUCCESS CRITERIA**
- Three files exist and parse without errors
- Z-index stack is ordered correctly: toast > modal > dropdown > sidebar > topbar > sticky > base

**VERIFICATION CHECKLIST**
- [ ] `radius.html` defines 5 tokens
- [ ] `shadows.html` defines 4 tokens
- [ ] `zindex.html` defines 7 tokens in ascending stack order

**ROLLBACK PLAN**
Delete the three created files. No other files modified.

---

### TASK-006 — Create Breakpoint, Animation, and Layout Token Files

**OBJECTIVE**
Create `tokens/breakpoints.html`, `tokens/animations.html`, and `tokens/layout.html`. The breakpoint values must match those already declared in `theme.html` exactly.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 2, Breakpoint System
- `STYLING_ARCHITECTURE.md` — Responsive Architecture
- `MIGRATION_PLAN.md` — Task 1.8, 1.9, 1.10

**ALLOWED FILES**
- `src/ui/styles/tokens/breakpoints.html` (create new)
- `src/ui/styles/tokens/animations.html` (create new)
- `src/ui/styles/tokens/layout.html` (create new)

**FORBIDDEN**
- Do not introduce any breakpoint value other than `480px`, `768px`, `1024px`, `1280px`
- Do not modify `theme.html` in this task — removal is handled in TASK-012
- Do not define animation `@keyframes` here — keyframes belong in `base/animations.html`

**IMPLEMENTATION RULES**
- Breakpoints: `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`, `--bp-wide: 1280px`
- Animations: `--transition-fast: 150ms`, `--transition-normal: 250ms`, `--transition-slow: 400ms`, `--easing-default: ease`
- Layout: `--topbar-height: 56px`, `--sidebar-width: 256px`, `--pos-cart-width: 360px`

**SUCCESS CRITERIA**
- Three files exist and parse
- Breakpoint values exactly match `theme.html` values (no drift)
- `--topbar-height` is referenced in `RESPONSIVE_PATTERNS.md` Appendix B and defined here

**VERIFICATION CHECKLIST**
- [ ] `breakpoints.html` defines exactly 4 breakpoint tokens
- [ ] `animations.html` defines 3 duration tokens and 1 easing token
- [ ] `layout.html` defines `--topbar-height`, `--sidebar-width`, `--pos-cart-width`
- [ ] Breakpoint values match existing `theme.html` values character for character

**ROLLBACK PLAN**
Delete the three created files. No other files modified.

---

### TASK-007 — Create `main.css` with Token Imports

**OBJECTIVE**
Create `src/ui/styles/main.css` that imports all token files in the correct order. This file will grow across subsequent phases as each layer is added.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Styling Directory Structure, Styling Layers
- `MIGRATION_PLAN.md` — Task 1.11

**ALLOWED FILES**
- `src/ui/styles/main.css` (create new)

**FORBIDDEN**
- Do not import any non-token file yet — layout, utilities, and components are added in later tasks
- Do not write any CSS rules in this file — only `@import` statements
- Do not modify any other file

**IMPLEMENTATION RULES**
- Import order (all from `tokens/`): `colors.css`, `spacing.css`, `typography.css`, `radius.css`, `shadows.css`, `zindex.css`, `breakpoints.css`, `animations.css`, `layout.css`
- Use relative `@import` paths
- Add a comment block at the top marking each section: `/* === TOKENS === */`

**SUCCESS CRITERIA**
- `main.css` exists
- All 9 token files are imported in a single `/* TOKENS */` block
- No CSS rules are defined in this file

**VERIFICATION CHECKLIST**
- [ ] File exists
- [ ] 9 `@import` statements for token files
- [ ] No CSS rules (only imports and comments)
- [ ] Import order matches token dependency order

**ROLLBACK PLAN**
Delete `src/ui/styles/main.css`. No other files modified.

---

### TASK-008 — Wire `main.css` to the Application Entry Point

**OBJECTIVE**
Import `main.css` into the application's HTML entry point so that tokens are available globally throughout the application.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Styling Layers

**ALLOWED FILES**
- The application's main HTML file or shell template that is loaded on every page (likely `src/ui/app/app.html` or equivalent)

**FORBIDDEN**
- Do not add `<link>` or `@import` for individual token files — only `main.css`
- Do not modify `main.css` in this task
- Do not remove any existing stylesheet imports yet — additions only

**IMPLEMENTATION RULES**
- Add `<link rel="stylesheet" href="/path/to/main.css">` (or equivalent `@import`) before any other stylesheet link
- Verify the path resolves correctly in the application's file serving context

**SUCCESS CRITERIA**
- Token CSS custom properties are available on `document.documentElement` in the browser
- No existing stylesheet import is removed or broken

**VERIFICATION CHECKLIST**
- [ ] `main.css` is linked in the application entry point
- [ ] `document.documentElement` style shows `--color-primary` when inspected in browser DevTools
- [ ] No existing page renders broken

**ROLLBACK PLAN**
Remove the `<link>` tag or `@import` statement added in this task. No other changes were made.

---

### TASK-009 — Remove Duplicate Token Definitions from `theme.html`

**OBJECTIVE**
Remove the CSS custom property declarations from `theme.html` that are now superseded by the token files. The token system is now the single source of truth.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Task 1.12
- `STYLING_ARCHITECTURE.md` — Token Layer

**ALLOWED FILES**
- `src/ui/styles/theme.html`

**FORBIDDEN**
- Do not remove any CSS rules from `theme.html` that are not already covered by a token file
- Do not delete `theme.html` entirely — only remove the `:root { }` custom property block
- Do not modify any token files

**IMPLEMENTATION RULES**
- Before modifying, confirm every property in the `:root` block of `theme.html` has a corresponding token defined in `tokens/*.html`
- Remove only the `:root { }` block containing custom property definitions
- Retain any other content in `theme.html` that is not a custom property
- Test that all pages render identically after removal

**SUCCESS CRITERIA**
- No `:root` custom property declarations remain in `theme.html`
- All pages render identically before and after this task
- No CSS custom property defined in `theme.html` goes missing from the runtime

**VERIFICATION CHECKLIST**
- [ ] `theme.html` no longer contains a `:root { }` block with CSS properties
- [ ] Visual snapshot comparison shows zero difference at 375px, 768px, 1280px
- [ ] Browser DevTools shows tokens resolving from `main.css`, not from `theme.html`

**ROLLBACK PLAN**
Restore the `:root { }` block to `theme.html` from version control. The token files are not modified and remain in place — both sources coexist without conflict (the token files take precedence due to import order in `main.css`).

---

## Phase 2 — Base Layer & Active Duplication Elimination

---

### TASK-010 — Create `base/reset.html`

**OBJECTIVE**
Create a CSS reset file that establishes consistent cross-browser baseline styles: box-sizing, margin/padding normalization, and media element defaults.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Base Layer
- `MIGRATION_PLAN.md` — Task 2.1

**ALLOWED FILES**
- `src/ui/styles/base/reset.html` (create new)

**FORBIDDEN**
- Do not define any visual styles (colors, fonts, backgrounds) — this file is normalization only
- Do not reference token variables — reset must function independently

**IMPLEMENTATION RULES**
- `*, *::before, *::after { box-sizing: border-box; }`
- `html, body { margin: 0; padding: 0; }`
- `button, input, select, textarea { font: inherit; }`
- `img, video { display: block; max-width: 100%; }`
- `h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: inherit; }`
- `p, ul, ol { margin: 0; padding: 0; }`
- `ul, ol { list-style: none; }`
- `a { color: inherit; text-decoration: none; }`

**File Format:**
```html
<style>
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
button, input, select, textarea { font: inherit; }
img, video { display: block; max-width: 100%; }
h1, h2, h3, h4, h5, h6 { margin: 0; font-weight: inherit; }
p, ul, ol { margin: 0; padding: 0; }
ul, ol { list-style: none; }
a { color: inherit; text-decoration: none; }
</style>
```

**SUCCESS CRITERIA**
- File exists and parses without errors
- No style declarations that set visual values (no colors, no font sizes)

**VERIFICATION CHECKLIST**
- [ ] File exists
- [ ] `box-sizing: border-box` applied universally
- [ ] No token variable references
- [ ] No color or typography declarations

**ROLLBACK PLAN**
Delete `src/ui/styles/base/reset.html`. No other files modified.

---

### TASK-011 — Create `base/globals.html` and `base/animations.html`

**OBJECTIVE**
Create global body styles and shared animation keyframes using token values.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Base Layer
- `MIGRATION_PLAN.md` — Tasks 2.2, 2.3

**ALLOWED FILES**
- `src/ui/styles/base/globals.html` (create new)
- `src/ui/styles/base/animations.html` (create new)

**FORBIDDEN**
- Do not hardcode any color, spacing, or font value — all must reference tokens
- Do not define component-specific styles here

**IMPLEMENTATION RULES**
- `globals.html`: set `body` background to `var(--color-bg-surface)`, color to `var(--color-text-primary)`, font-family to `var(--font-family-base)`, font-size to `var(--text-md)`, line-height to `var(--leading-normal)`
- `globals.html`: define `.sr-only` — visually hidden but accessible to screen readers (position absolute, width/height 1px, overflow hidden, clip rect(0,0,0,0), white-space nowrap)
- `animations.html`: define `@keyframes fadeIn` (opacity 0→1), `@keyframes slideUp` (translateY(8px)→translateY(0) + opacity 0→1), `@keyframes slideInLeft` (translateX(-100%)→translateX(0)), `@keyframes spin` (0deg→360deg). Use `var(--transition-fast)` and `var(--transition-normal)` for animation durations within component rules (keyframes themselves have no duration).

**SUCCESS CRITERIA**
- `body` visual appearance is unchanged from before (token values match prior hardcoded values)
- `.sr-only` class available
- Keyframe names `fadeIn`, `slideUp`, `slideInLeft`, `spin` defined

**VERIFICATION CHECKLIST**
- [ ] `globals.html` body styles reference tokens only
- [ ] `.sr-only` defined correctly (must not collapse to 0×0 in all browsers — verify the clip pattern)
- [ ] `animations.html` defines all 4 keyframes
- [ ] No hardcoded values in either file

**ROLLBACK PLAN**
Delete both files. No other files modified.

---

### TASK-012 — Add Base Layer Imports to `main.css`

**OBJECTIVE**
Add the base layer imports to `main.css` in the correct order after the token imports.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Styling Layers (tokens → base → utilities → layout → components)
- `MIGRATION_PLAN.md` — Task 2.8

**ALLOWED FILES**
- `src/ui/styles/main.css`

**FORBIDDEN**
- Do not reorder existing token imports
- Do not add utility, layout, or component imports yet — those are future tasks

**IMPLEMENTATION RULES**
- Add a `/* === BASE === */` comment block after the tokens block
- Import in order: `base/reset.css`, `base/globals.css`, `base/animations.css`

**SUCCESS CRITERIA**
- Three base imports added after token imports
- Import order: tokens first, base second

**VERIFICATION CHECKLIST**
- [ ] `main.css` has 12 `@import` statements total (9 tokens + 3 base)
- [ ] Order is tokens → base
- [ ] No CSS rules in `main.css`

**ROLLBACK PLAN**
Remove the three added `@import` lines from `main.css`. No other files modified.

---

### TASK-013 — Resolve Modal CSS Duplication

**OBJECTIVE**
Eliminate the verbatim ~130-line CSS duplication in `modalService.html` by moving unified styles to `components/modals.html` and removing the duplicate `ensureStyles()` injection function.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Modal Architecture Problems
- `MIGRATION_PLAN.md` — Task 2.4

**ALLOWED FILES**
- `src/ui/services/modalService.html`
- `src/ui/styles/components/modals.html` (create new)

**FORBIDDEN**
- Do not change any modal visual behavior or layout logic
- Do not modify any file that calls `Modal.open()`, `Modal.confirm()`, or `Modal.alert()`
- Do not remove the `Modal` JavaScript object — only the duplicate CSS blocks

**IMPLEMENTATION RULES**
- Step 1: Diff both CSS blocks (`<style>` tag vs `ensureStyles()` string) and document any differences
- Step 2: Resolve any differences in favor of the correct intended rendering
- Step 3: Copy the unified CSS to `components/modals.html` — values remain as-is (token replacement is Phase 5)
- Step 4: Delete the static `<style>` block from `modalService.html`
- Step 5: Delete the `ensureStyles()` function from `modalService.html`
- Step 6: Add `<link rel="stylesheet">` for `modals.html` in the app entry point OR ensure `main.css` imports it (component imports will be added in Phase 5; for now, link it directly if needed)

**SUCCESS CRITERIA**
- Zero `<style>` blocks remain in `modalService.html`
- Zero `ensureStyles()` function in `modalService.html`
- `components/modals.html` exists with the unified CSS
- Modal opens and closes visually identically for all modal types

**VERIFICATION CHECKLIST**
- [ ] `modalService.html` contains no `<style>` tag
- [ ] `modalService.html` contains no `ensureStyles` function
- [ ] `Modal.open()` renders correctly
- [ ] `Modal.confirm()` renders correctly
- [ ] `Modal.alert()` renders correctly
- [ ] `Modal.setLoading()` renders correctly

**ROLLBACK PLAN**
Delete `components/modals.html`. Restore the `<style>` block and `ensureStyles()` function to `modalService.html` from version control.

---

### TASK-014 — Resolve Receipt Display Duplication

**OBJECTIVE**
Unify the receipt display structure defined independently in `sales.html` and `sales.modal.html` into a single implementation using canonical class names from pattern P-06.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Repeated Layout Structures
- `UI_PATTERN_REGISTRY.md` — Pattern P-06, Receipt Display
- `MIGRATION_PLAN.md` — Task 2.5

**ALLOWED FILES**
- `src/ui/pages/sales.html`
- `src/ui/modules/sales/sales.modal.html`

**FORBIDDEN**
- Do not change the visual appearance of the receipt
- Do not modify `modalService.html`
- Do not migrate CSS values to tokens yet — class name unification only

**IMPLEMENTATION RULES**
- Audit both files and produce a mapping: `sales.html class` → `sales.modal.html class` → canonical P-06 class
- Canonical class names must follow P-06 pattern: `.receipt`, `.receipt__header`, `.receipt__field`, `.receipt__label`, `.receipt__value`, `.receipt__table`, `.receipt__totals`, `.receipt__actions`
- Update both files to use canonical class names in HTML
- Create a unified `<style>` block or CSS file containing the single set of receipt styles (to be moved to `components/` in Phase 5)
- Delete both old independent style blocks

**SUCCESS CRITERIA**
- Both files use identical class names for the receipt structure
- Receipt renders identically in both `sales.html` and `sales.modal.html` contexts
- No duplicate CSS rules for receipt display exist

**VERIFICATION CHECKLIST**
- [ ] Search for old class names (`.receipt-field`, `.detail-row`, `.receipt-label`, `.detail-label`) — none should appear
- [ ] Receipt renders identically in both usage contexts
- [ ] Single set of CSS rules drives both receipts

**ROLLBACK PLAN**
Restore both files from version control. The old class names and separate CSS blocks return.

---

### TASK-015 — Resolve Cart Item Row Duplication

**OBJECTIVE**
Determine which of the two cart item row rendering paths is active (`CartTable.render()` in `pos.html` or `CartItemRow.render()` in `cartItemRow.html`) and delete the unused one.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Repeated Component Implementations
- `MIGRATION_PLAN.md` — Task 2.6

**ALLOWED FILES**
- `src/ui/pages/pos.html` (read, then possibly modify)
- `src/ui/components/cartItemRow.html` (read, then possibly delete)

**FORBIDDEN**
- Do not delete anything before confirming which path is active
- Do not change the active rendering logic in any way
- Do not modify the CSS of the cart item in this task

**IMPLEMENTATION RULES**
- Trace the code path: find where cart items are rendered in the POS flow
- Confirm which function (`CartTable.render()` or `CartItemRow.render()`) is called at runtime
- Add a temporary `console.log` to both render functions, test in the browser, confirm which fires
- Remove the `console.log` statements
- Delete the file or function that is confirmed to be the dead code path
- If both are active (different contexts), document this and do not delete — escalate for architectural decision

**SUCCESS CRITERIA**
- Exactly one cart item rendering path exists
- Cart items render correctly in the POS cart

**VERIFICATION CHECKLIST**
- [ ] Confirmed which rendering path is active (via code trace and runtime test)
- [ ] Dead code path removed
- [ ] POS cart still renders correctly with items added

**ROLLBACK PLAN**
Restore the deleted file or function from version control.

---

### TASK-016 — Create `.hidden` Utility and Implement `utilities/visibility.html`

**OBJECTIVE**
Create `utilities/visibility.html` with the `.hidden` class and the initial responsive visibility utilities.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 15.1, Visibility Utilities
- `STYLING_ARCHITECTURE.md` — Utility Layer
- `UI_AUDIT.md` — Inline Styling Problems (15+ inline display declarations)

**ALLOWED FILES**
- `src/ui/styles/utilities/visibility.html` (create new)

**FORBIDDEN**
- Do not use `max-width` media queries — `min-width` only
- Do not add responsive visibility to any component or page file
- Do not modify any existing file in this task

**IMPLEMENTATION RULES**
- `.hidden { display: none !important; }` — the single global hide class
- `.hidden-mobile { }` (default: `display: none`) → `@media (min-width: var(--bp-tablet)) { .hidden-mobile { display: revert; } }`
- `.hidden-tablet { }` (default: `display: none`) → `@media (min-width: var(--bp-desktop)) { .hidden-tablet { display: revert; } }`
- `.visible-mobile-only { display: revert; }` → `@media (min-width: var(--bp-tablet)) { .visible-mobile-only { display: none !important; } }`
- `.sr-only` is defined in `base/globals.html`, not here

**SUCCESS CRITERIA**
- `.hidden` class suppresses display at all breakpoints
- `.hidden-mobile` hides at `< 768px` and shows at `≥ 768px`

**VERIFICATION CHECKLIST**
- [ ] `.hidden` on any element removes it from the visual flow
- [ ] `.hidden-mobile` hides at 375px viewport, shows at 768px
- [ ] No `max-width` media queries appear in this file

**ROLLBACK PLAN**
Delete `utilities/visibility.html`. No other files modified.

---

## Phase 3 — Utility System & Responsive Foundation

---

### TASK-017 — Create `utilities/flex.html` and `utilities/layout.html`

**OBJECTIVE**
Create the flex and layout utility files providing single-purpose helper classes for layout composition.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Utility Layer rules
- `MIGRATION_PLAN.md` — Tasks 3.1, 3.2

**ALLOWED FILES**
- `src/ui/styles/utilities/flex.html` (create new)
- `src/ui/styles/utilities/layout.html` (create new)

**FORBIDDEN**
- Do not define classes with business meaning (e.g., `.cart-layout`, `.sidebar-wrapper`)
- Do not use hardcoded spacing values — layout utilities that use spacing must reference tokens
- Do not add responsive variants to utilities — components own responsive behavior

**IMPLEMENTATION RULES**
- `flex.html`: `.flex { display: flex; }`, `.flex-col { flex-direction: column; }`, `.flex-row { flex-direction: row; }`, `.items-center { align-items: center; }`, `.items-start { align-items: flex-start; }`, `.items-end { align-items: flex-end; }`, `.justify-between { justify-content: space-between; }`, `.justify-center { justify-content: center; }`, `.justify-end { justify-content: flex-end; }`, `.flex-wrap { flex-wrap: wrap; }`, `.flex-1 { flex: 1; }`, `.flex-shrink-0 { flex-shrink: 0; }`
- `layout.html`: `.w-full { width: 100%; }`, `.h-full { height: 100%; }`, `.min-h-screen { min-height: 100dvh; }`, `.block { display: block; }`, `.inline-block { display: inline-block; }`, `.relative { position: relative; }`, `.absolute { position: absolute; }`, `.fixed { position: fixed; }`, `.sticky { position: sticky; }`, `.overflow-hidden { overflow: hidden; }`, `.overflow-auto { overflow: auto; }`, `.overflow-x-hidden { overflow-x: hidden; }`

**SUCCESS CRITERIA**
- Both files exist and parse without errors
- Every class is single-purpose (sets exactly one CSS property or one logical group)

**VERIFICATION CHECKLIST**
- [ ] No class defines more than one layout concern
- [ ] No hardcoded px values
- [ ] No business-specific names

**ROLLBACK PLAN**
Delete both files. No other files modified.

---

### TASK-018 — Create `utilities/spacing.html` and `utilities/typography.html`

**OBJECTIVE**
Create spacing and typography utility files. All values must reference tokens.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Utility Layer
- `MIGRATION_PLAN.md` — Tasks 3.3, 3.4

**ALLOWED FILES**
- `src/ui/styles/utilities/spacing.html` (create new)
- `src/ui/styles/utilities/typography.html` (create new)

**FORBIDDEN**
- Do not hardcode any px value — reference `var(--space-*)` and `var(--text-*)` tokens
- Do not create responsive spacing variants — see IMPLEMENTATION RULES for the architecture rule

**IMPLEMENTATION RULES**
- `spacing.html`: gap utilities `.gap-1` through `.gap-6` mapping to `var(--space-1)` through `var(--space-6)`. Padding utilities `.p-3`, `.p-4`, `.p-6`, `.px-4`, `.py-2`, `.py-3` using token values. `.m-auto { margin: auto; }`.
- `typography.html`: `.text-xs` through `.text-xl` mapping to token font-size values. `.font-medium`, `.font-semibold`, `.font-bold` mapping to font-weight tokens. `.text-left`, `.text-center`, `.text-right`. `.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`. `.line-clamp-1` and `.line-clamp-2` using `-webkit-line-clamp`. `.break-words { overflow-wrap: break-word; word-break: break-word; }`.

**SUCCESS CRITERIA**
- All spacing utilities reference `var(--space-*)` tokens
- All typography utilities reference `var(--text-*)` and `var(--font-weight-*)` tokens

**VERIFICATION CHECKLIST**
- [ ] No raw `px` values in `spacing.html` (except inside token definitions, which are in a different file)
- [ ] No raw font-size values in `typography.html`
- [ ] `.truncate` produces single-line ellipsis on overflow

**ROLLBACK PLAN**
Delete both files. No other files modified.

---

### TASK-019 — Add Utility Imports to `main.css`

**OBJECTIVE**
Add all utility file imports to `main.css` in the correct layer order.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — Styling Layers

**ALLOWED FILES**
- `src/ui/styles/main.css`

**FORBIDDEN**
- Do not reorder existing imports
- Do not add layout or component imports yet

**IMPLEMENTATION RULES**
- Add `/* === UTILITIES === */` comment block after the base block
- Import in order: `utilities/flex.css`, `utilities/layout.css`, `utilities/spacing.css`, `utilities/typography.css`, `utilities/visibility.css`

**SUCCESS CRITERIA**
- 5 utility imports added after base imports
- Total import count in `main.css`: 9 tokens + 3 base + 5 utilities = 17

**VERIFICATION CHECKLIST**
- [ ] 17 total `@import` statements
- [ ] Order: tokens → base → utilities
- [ ] No CSS rules in `main.css`

**ROLLBACK PLAN**
Remove the 5 added utility `@import` lines from `main.css`.

---

### TASK-020 — Unify the Breakpoint Value Across CSS and JavaScript

**OBJECTIVE**
Eliminate the `767px` vs `768px` breakpoint mismatch. Every responsive rule in every file must use `768px` (`--bp-tablet`) as the mobile/tablet boundary. Rewrite POS `max-width: 767px` media queries as mobile-first `min-width` patterns.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 2, Breakpoint System
- `UI_AUDIT.md` — Responsive Architecture Problems: Inconsistent Breakpoint System
- `MIGRATION_PLAN.md` — Task 3.7

**ALLOWED FILES**
- `src/ui/pages/pos.html` (CSS `<style>` block only)
- `src/ui/services/uiService.html` (JavaScript constant only)
- `src/ui/services/modalService.html` (CSS in `modals.html` or remaining inline)

**FORBIDDEN**
- Do not change any POS layout values — only direction of media queries (max→min) and breakpoint value (767→768)
- Do not refactor any POS component structure in this task
- Do not remove the `MOBILE_BREAKPOINT` JavaScript constant — update it and annotate it

**IMPLEMENTATION RULES**
- In `pos.html` `<style>`: convert every `@media (max-width: 767px)` block to a mobile-first equivalent. Default styles (no media query) become the mobile styles. The previous mobile-override styles become the default. Breakpoint uses `768px`.
- In `uiService.html`: update `MOBILE_BREAKPOINT = 768` (if already 768, confirm and annotate). Add comment: `// Mirror of CSS token --bp-tablet. Must remain synchronized.`
- In `components/modals.html` or remaining modal CSS: confirm `768px` is used (not `767px`)
- After conversion, test POS layout visually at exactly `767px` and `768px` — the behavior at both must be identical to before

**SUCCESS CRITERIA**
- The string `767px` does not appear anywhere in the codebase
- All media queries in `pos.html` use `min-width`
- POS layout is visually identical at all breakpoints before and after

**VERIFICATION CHECKLIST**
- [ ] `grep -r "767px"` returns zero results
- [ ] POS renders identically at 375px, 767px, 768px, 1024px, 1280px
- [ ] `MOBILE_BREAKPOINT` is annotated as a CSS token mirror
- [ ] All media queries in `pos.html` use `min-width`

**ROLLBACK PLAN**
Restore `pos.html`, `uiService.html`, and `modalService.html` from version control. The `767px` values return.

---

## Phase 4 — App Shell Migration

---

### TASK-021 — Create `layout/app-shell.html`

**OBJECTIVE**
Create the root layout CSS that defines the relationship between the sidebar and the main content area at all responsive tiers.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 3.1, App Shell Layout
- `RESPONSIVE_PATTERNS.md` — Section 7.3, Topbar Behavior
- `UI_PATTERN_REGISTRY.md` — Pattern L-01

**ALLOWED FILES**
- `src/ui/styles/layout/app-shell.html` (create new)

**FORBIDDEN**
- Do not hardcode any pixel values — reference tokens only
- Do not use `max-width` media queries
- Do not define sidebar or topbar styles here — those are in their own files

**IMPLEMENTATION RULES**
- `.app-shell`: `display: flex; height: 100dvh; overflow: hidden;`
- `.app-content`: `flex: 1; display: flex; flex-direction: column; overflow: hidden; padding-top: var(--topbar-height);`
- At `min-width: var(--bp-desktop)`: `.app-content { margin-left: var(--sidebar-width); }`
- `.page-content`: `flex: 1; overflow-y: auto; padding: var(--space-3);`
- At `min-width: var(--bp-tablet)`: `.page-content { padding: var(--space-4); }`
- At `min-width: var(--bp-desktop)`: `.page-content { padding: var(--space-6) var(--space-6) var(--space-5); }`

**SUCCESS CRITERIA**
- Shell layout positions content area correctly at all three breakpoints
- Content area scrolls independently of sidebar and topbar

**VERIFICATION CHECKLIST**
- [ ] No hardcoded px values
- [ ] `min-width` media queries only
- [ ] Content offset by `--topbar-height` at all tiers
- [ ] Content offset by `--sidebar-width` at desktop

**ROLLBACK PLAN**
Delete `layout/app-shell.html`. No other files modified.

---

### TASK-022 — Create `layout/sidebar.html`

**OBJECTIVE**
Create sidebar CSS that implements both the fixed desktop state and the mobile overlay drawer state. Single DOM element; CSS handles responsive behavior entirely.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Sections 7.1, 7.2
- `UI_PATTERN_REGISTRY.md` — Pattern N-01

**ALLOWED FILES**
- `src/ui/styles/layout/sidebar.html` (create new)

**FORBIDDEN**
- Do not use `max-width` media queries
- Do not hardcode colors, widths, or z-index values — reference tokens
- Do not define any JavaScript behavior here

**IMPLEMENTATION RULES**
- Default (mobile): `.sidebar { position: fixed; top: 0; left: 0; height: 100dvh; width: min(var(--sidebar-width), 80vw); background: var(--color-sidebar-bg); z-index: var(--z-sidebar); transform: translateX(-100%); transition: transform var(--transition-normal) var(--easing-default); }`
- `.sidebar--open { transform: translateX(0); }`
- `.sidebar-overlay { position: fixed; inset: 0; background: var(--color-overlay); opacity: 0; pointer-events: none; z-index: calc(var(--z-sidebar) - 1); transition: opacity var(--transition-normal) var(--easing-default); }`
- `.sidebar-overlay--visible { opacity: 1; pointer-events: auto; }`
- At `min-width: var(--bp-desktop)`: `.sidebar { transform: translateX(0); position: fixed; }` and `.sidebar-overlay { display: none; }`
- Nav item styles: `min-height: 48px; padding: var(--space-3) var(--space-4); color: var(--color-sidebar-text); border-radius: var(--radius-md);`
- `.nav-item--active`: distinct background using `var(--color-sidebar-active)`

**SUCCESS CRITERIA**
- Sidebar is off-screen on mobile by default
- `.sidebar--open` class slides it into view with CSS transition
- Sidebar is permanently visible on desktop

**VERIFICATION CHECKLIST**
- [ ] Sidebar slides in/out with CSS transition (no JS layout manipulation)
- [ ] Sidebar is fully visible at 1280px without `--open` class
- [ ] Sidebar is off-screen at 375px without `--open` class
- [ ] Nav items have minimum 48px height

**ROLLBACK PLAN**
Delete `layout/sidebar.html`. No other files modified.

---

### TASK-023 — Create `layout/topbar.html`

**OBJECTIVE**
Create topbar CSS. The topbar is always fixed at the top of the viewport.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 7.3
- `UI_PATTERN_REGISTRY.md` — Pattern N-02

**ALLOWED FILES**
- `src/ui/styles/layout/topbar.html` (create new)

**FORBIDDEN**
- Do not use `max-width` media queries
- Do not hardcode any values — tokens only

**IMPLEMENTATION RULES**
- `.topbar { position: fixed; top: 0; left: 0; right: 0; height: var(--topbar-height); background: var(--color-bg-card); box-shadow: var(--shadow-sm); z-index: var(--z-topbar); display: flex; align-items: center; padding: 0 var(--space-4); gap: var(--space-3); }`
- At `min-width: var(--bp-desktop)`: `.topbar { left: var(--sidebar-width); }`
- `.topbar__hamburger`: visible by default; `min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;`
- At `min-width: var(--bp-desktop)`: `.topbar__hamburger { display: none; }`
- `.topbar__title { font-size: var(--text-lg); font-weight: var(--font-weight-bold); color: var(--color-text-primary); flex: 1; }`

**SUCCESS CRITERIA**
- Topbar is fixed at the top at all breakpoints
- Hamburger visible below desktop, hidden at desktop
- Topbar offset by sidebar width at desktop

**VERIFICATION CHECKLIST**
- [ ] Topbar does not scroll away on any page
- [ ] Hamburger visible at 375px, hidden at 1280px
- [ ] Topbar height equals `--topbar-height` token value

**ROLLBACK PLAN**
Delete `layout/topbar.html`. No other files modified.

---

### TASK-024 — Collapse the Dual DOM Structure in `renderAppShell()`

**OBJECTIVE**
Refactor `renderAppShell()` in `app.html` to render a single unified DOM structure. Remove the conditional mobile/desktop branches. CSS handles all responsive behavior.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Navigation/Layout Problems
- `MIGRATION_PLAN.md` — Task 4.5

**ALLOWED FILES**
- `src/ui/app/app.html`

**FORBIDDEN**
- Do not modify `sidebar.html`, `topbar.html`, or any layout CSS files in this task
- Do not remove the sidebar toggle JavaScript — only the DOM duplication
- Do not change the visual appearance of any page

**IMPLEMENTATION RULES**
- The new `renderAppShell(content)` renders: `[sidebar-overlay][sidebar][main area[topbar][page-content]]`
- The sidebar and topbar are rendered once, unconditionally
- The `UIService.isMobile()` check for HTML structure is removed
- The sidebar toggle button click handler adds/removes `.sidebar--open` on the `.sidebar` element and `.sidebar-overlay--visible` on the overlay element
- The overlay click handler removes both classes
- Escape key handler removes both classes
- Route change removes both classes (to close the drawer when navigating)

**SUCCESS CRITERIA**
- Sidebar renders exactly once in the DOM (verify with DevTools Elements panel)
- Topbar renders exactly once in the DOM
- Sidebar open/close works on mobile and tablet
- All routes render correctly

**VERIFICATION CHECKLIST**
- [ ] `querySelector('.sidebar')` returns exactly one element
- [ ] Sidebar drawer opens and closes on mobile (375px)
- [ ] Sidebar is always visible on desktop (1280px) without JavaScript intervention
- [ ] Escape key closes the drawer
- [ ] Navigating to a new route closes the drawer

**ROLLBACK PLAN**
Restore `app.html` from version control.

---

### TASK-025 — Implement Active Nav State and Add Layout Imports to `main.css`

**OBJECTIVE**
Apply the `.nav-item--active` modifier to the current page's navigation item. Wire all layout files into `main.css`.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Pattern N-01
- `MIGRATION_PLAN.md` — Tasks 4.6, 4.8

**ALLOWED FILES**
- `src/ui/components/sidebar.html`
- `src/ui/styles/main.css`

**FORBIDDEN**
- Do not modify `layout/*.html` files in this task — they were created in earlier tasks
- Do not add accessibility attributes in this task — that is TASK-026

**IMPLEMENTATION RULES**
- In `renderSidebar()` (or equivalent), for each nav item, compare its route against `State.currentPage`
- Apply `nav-item--active` class when the route matches
- In `main.css`: add `/* === LAYOUT === */` block after utilities and import: `layout/app-shell.css`, `layout/sidebar.css`, `layout/topbar.css`

**SUCCESS CRITERIA**
- Active nav item is visually distinct on every page
- Active state updates correctly when navigating between pages
- 3 layout imports added to `main.css`

**VERIFICATION CHECKLIST**
- [ ] Navigate to Dashboard — Dashboard nav item highlighted
- [ ] Navigate to Products — Products nav item highlighted
- [ ] Navigate to POS — POS nav item highlighted
- [ ] Active highlight does not persist on multiple items simultaneously

**ROLLBACK PLAN**
Restore `sidebar.html` from version control. Remove layout imports from `main.css`.

---

### TASK-026 — Add Sidebar Accessibility Attributes

**OBJECTIVE**
Add ARIA attributes and focus management to the sidebar toggle so the mobile navigation meets accessibility requirements.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 7.2, Mobile Navigation Drawer
- `UI_PATTERN_REGISTRY.md` — Pattern N-01

**ALLOWED FILES**
- `src/ui/app/app.html`
- `src/ui/components/topbar.html`

**FORBIDDEN**
- Do not implement a full focus trap library — a minimal focus-within implementation is sufficient
- Do not change any visual styles

**IMPLEMENTATION RULES**
- Hamburger button: add `aria-label="Open navigation"`, `aria-expanded="false"`, `aria-controls="sidebar"`
- Update `aria-expanded` to `"true"` when `.sidebar--open` is added, `"false"` when removed
- Sidebar element: add `id="sidebar"` and `aria-label="Main navigation"`
- On drawer open: move focus to the first focusable item inside the sidebar
- On drawer close: return focus to the hamburger toggle button
- On Escape key: close drawer and return focus to toggle

**SUCCESS CRITERIA**
- Screen reader announces "Open navigation" on hamburger button
- `aria-expanded` reflects correct state
- Focus moves into sidebar on open and returns to trigger on close

**VERIFICATION CHECKLIST**
- [ ] Hamburger has `aria-label`, `aria-expanded`, `aria-controls`
- [ ] `aria-expanded` is `false` when closed, `true` when open
- [ ] Keyboard navigation: Tab into sidebar works when open
- [ ] Escape closes sidebar and returns focus to hamburger

**ROLLBACK PLAN**
Restore `app.html` and `topbar.html` from version control.

---

## Phase 5 — Shared Component Migration

---

### TASK-027 — Create `components/buttons.html`

**OBJECTIVE**
Create the canonical button component file defining all button variants (B-01 through B-05). This replaces the three independent button definitions currently scattered across modal CSS, CRUD Tailwind strings, and POS-specific classes.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Patterns B-01 through B-05
- `RESPONSIVE_PATTERNS.md` — Section 12.1, Tap Target Rules

**ALLOWED FILES**
- `src/ui/styles/components/buttons.html` (create new)

**FORBIDDEN**
- Do not hardcode any values — tokens only
- Do not use `max-width` media queries
- Do not define page-specific button behavior here (e.g., `.checkout-btn` width logic belongs in `pos.css`)

**IMPLEMENTATION RULES**
- Base: `.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); font-size: var(--text-sm); font-weight: var(--font-weight-medium); border-radius: var(--radius-md); border: none; cursor: pointer; transition: background-color var(--transition-fast) var(--easing-default), opacity var(--transition-fast); min-height: 36px; }`
- `.btn--primary`: `background: var(--color-primary); color: var(--color-text-on-primary);` hover: `var(--color-primary-hover)`
- `.btn--secondary`: `background: var(--color-bg-subtle); color: var(--color-text-primary); border: 1px solid var(--color-border-default);`
- `.btn--danger`: `background: var(--color-danger); color: var(--color-text-on-danger);` hover: `var(--color-danger-hover)`
- `.btn--icon`: `padding: var(--space-2); min-width: 44px; min-height: 44px; border-radius: var(--radius-md); background: transparent;`
- `.btn--filter`: `border-radius: var(--radius-full); border: 1px solid var(--color-border-default); background: var(--color-bg-subtle);`
- `.btn--filter--active`: `background: var(--color-primary); color: var(--color-text-on-primary); border-color: var(--color-primary);`
- `.btn--full`: `width: 100%;`
- `.btn--lg`: `padding: var(--space-3) var(--space-4); font-size: var(--text-md); min-height: 44px;`
- `.btn--sm`: `padding: var(--space-1) var(--space-3); font-size: var(--text-xs); min-height: 32px;`
- `:disabled`, `[disabled]`: `opacity: 0.5; cursor: not-allowed; pointer-events: none;`
- All interactive states require visible focus rings: `outline: 2px solid var(--color-primary); outline-offset: 2px;`

**SUCCESS CRITERIA**
- All 5 button variants render with correct visual styles
- `.btn--icon` meets 44×44px touch target at all sizes

**VERIFICATION CHECKLIST**
- [ ] All variants render correctly
- [ ] Focus ring visible on all variants when focused with keyboard
- [ ] Disabled state reduces opacity and blocks interaction
- [ ] `.btn--icon` measures 44×44px in DevTools
- [ ] No hardcoded values in the file

**ROLLBACK PLAN**
Delete `components/buttons.html`. No other files modified.

---

### TASK-028 — Create `components/forms.html`

**OBJECTIVE**
Create the canonical form component file defining input, label, field group, and validation error styles. Replaces the repeated `w-full border p-3 rounded` pattern across all entity modal templates.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Patterns F-01, F-02, S-01
- `RESPONSIVE_PATTERNS.md` — Section 9, Form Responsiveness

**ALLOWED FILES**
- `src/ui/styles/components/forms.html` (create new)

**FORBIDDEN**
- Do not hardcode any values
- Do not define modal-specific layout here (modal framing belongs in `modals.html`)

**IMPLEMENTATION RULES**
- `.form-group { display: flex; flex-direction: column; gap: var(--space-1); margin-bottom: var(--space-4); }`
- `.form-label { font-size: var(--text-sm); font-weight: var(--font-weight-medium); color: var(--color-text-primary); }`
- `.form-input { width: 100%; min-height: 44px; padding: var(--space-3); font-size: var(--text-md); border: 1px solid var(--color-border-default); border-radius: var(--radius-md); background: var(--color-bg-card); color: var(--color-text-primary); transition: border-color var(--transition-fast); }`
- `.form-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 2px var(--color-primary-subtle); }`
- `.form-input--error { border-color: var(--color-danger); }`
- `.form-error { font-size: var(--text-xs); color: var(--color-danger); margin-top: var(--space-1); }`
- Apply same base styles to `select.form-input` and `textarea.form-input`
- At `min-width: var(--bp-desktop)`: `min-height: 40px;` (desktop can be slightly more compact)

**SUCCESS CRITERIA**
- Single `.form-input` class applies to `input`, `select`, and `textarea` elements
- Focus ring uses `--color-primary`
- Error state uses `--color-danger`
- All inputs meet 44px minimum height on mobile

**VERIFICATION CHECKLIST**
- [ ] `<input class="form-input">` renders correctly
- [ ] `<select class="form-input">` renders correctly
- [ ] `<textarea class="form-input">` renders correctly
- [ ] Focus state shows outline
- [ ] `.form-input--error` shows danger border
- [ ] Height ≥ 44px on mobile viewport

**ROLLBACK PLAN**
Delete `components/forms.html`. No other files modified.

---

### TASK-029 — Create `components/cards.html`

**OBJECTIVE**
Create the card component file defining the page header (C-01), content card (C-02), empty state (C-03), loading overlay (C-04), info/detail row (C-05), and status badge (C-06).

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Patterns C-01 through C-06

**ALLOWED FILES**
- `src/ui/styles/components/cards.html` (create new)

**FORBIDDEN**
- Do not hardcode values
- Do not define responsive behavior beyond mobile-first defaults

**IMPLEMENTATION RULES**
- C-01 `.page-header`: `display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-4);`
- `.page-header__title`: `font-size: var(--text-xl); font-weight: var(--font-weight-bold); color: var(--color-text-primary);`
- `.page-header__subtitle`: `font-size: var(--text-sm); color: var(--color-text-secondary); margin-top: var(--space-1);`
- C-02 `.card`: `background: var(--color-bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); padding: var(--space-3);`
- At `min-width: var(--bp-tablet)`: `.card { padding: var(--space-4); }`
- At `min-width: var(--bp-desktop)`: `.card { padding: var(--space-5); }`
- `.card--lg`: `padding: var(--space-6);`
- C-03 `.empty-state`: `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-3); padding: var(--space-8) var(--space-4); text-align: center; color: var(--color-text-secondary);`
- C-04 `.loading-overlay`: `position: absolute; inset: 0; background: var(--color-overlay-light); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-3); border-radius: inherit;`
- `.loading-overlay--fixed`: `position: fixed; z-index: var(--z-modal);`
- C-05 `.detail-row`: `display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border-subtle); font-size: var(--text-sm);`
- C-06 `.badge`: `display: inline-flex; align-items: center; padding: var(--space-1) var(--space-2); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: var(--font-weight-medium);`
- Badge variants using token semantic colors: `--success`, `--warning`, `--danger`, `--info`, `--neutral`

**SUCCESS CRITERIA**
- All 6 card patterns render correctly with token-based values

**VERIFICATION CHECKLIST**
- [ ] `.card` renders white card with shadow and border-radius
- [ ] `.page-header` wraps correctly on narrow viewports (flex-wrap)
- [ ] `.loading-overlay` covers its positioned parent
- [ ] All 5 badge variants render with correct semantic colors
- [ ] No hardcoded values

**ROLLBACK PLAN**
Delete `components/cards.html`. No other files modified.

---

### TASK-030 — Update `components/modals.html` with Token References and Responsive Contracts

**OBJECTIVE**
Replace all hardcoded values in `components/modals.html` (created in TASK-013) with token references. Add the fullscreen mobile modal behavior per `RESPONSIVE_PATTERNS.md` Section 10.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 10, Modal Responsiveness
- `UI_PATTERN_REGISTRY.md` — Patterns M-01, M-02

**ALLOWED FILES**
- `src/ui/styles/components/modals.html`

**FORBIDDEN**
- Do not change any class names — only values and responsive rules
- Do not use `max-width` media queries
- Do not change any modal JavaScript behavior

**IMPLEMENTATION RULES**
- Replace all hex color literals with `var(--color-*)` tokens
- Replace all `px` spacing values with `var(--space-*)` tokens
- Replace all shadow literals with `var(--shadow-*)` tokens
- Replace all z-index values with `var(--z-modal)` and `var(--z-overlay)`
- Default (mobile): modal `width: 100vw; height: 100dvh; border-radius: 0; transform: translateY(100%);` when closed, `translateY(0)` when open via `.modal--open`
- Modal body: `overflow-y: auto; flex: 1;`
- Modal header and footer: `position: sticky; top: 0 / bottom: 0;` within modal — headers/footers don't scroll
- At `min-width: var(--bp-tablet)`: modal becomes centered overlay. `width: min(560px, 90vw); height: auto; max-height: 90dvh; border-radius: var(--radius-xl); transform: scale(0.95); opacity: 0;` closed → `scale(1); opacity: 1;` open
- Width variants at desktop: `.modal--sm`, `.modal--lg`, `.modal--xl`, `.modal--full`
- Body scroll lock: add `overflow: hidden` to `body` via `.modal-open` class (applied by JS on modal open)

**SUCCESS CRITERIA**
- Zero hardcoded values in `modals.html`
- Modal is fullscreen at 375px
- Modal is centered and constrained at 768px+
- Modal content scrolls at all viewport heights

**VERIFICATION CHECKLIST**
- [ ] Open a modal at 375px — fullscreen, slides from bottom
- [ ] Open a modal at 768px — centered, fades/scales in
- [ ] Long-content modal scrolls internally (header/footer sticky)
- [ ] `body` gets `overflow: hidden` while modal is open
- [ ] No hardcoded values

**ROLLBACK PLAN**
Restore `components/modals.html` to its state after TASK-013 from version control.

---

### TASK-031 — Migrate Toast to `components/toast.html`

**OBJECTIVE**
Move all visual toast styling from JavaScript `style.cssText` assignments in `toastService.html` into `components/toast.html`. Refactor the service to toggle CSS classes, not inline styles.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Pattern NT-01
- `UI_AUDIT.md` — Inline Styling Problems (toast service)

**ALLOWED FILES**
- `src/ui/styles/components/toast.html` (create new)
- `src/ui/services/toastService.html`

**FORBIDDEN**
- Do not change any toast visual appearance
- Do not use `max-width` media queries
- Do not change the toast API (`Toast.success()`, `Toast.error()`, etc.)

**IMPLEMENTATION RULES**
- `toast.html`: define `.toast-container`, `.toast`, `.toast--success`, `.toast--error`, `.toast--warning`, `.toast--info` using only token values
- Mobile positioning: `position: fixed; top: var(--space-2); left: var(--space-4); right: var(--space-4); z-index: var(--z-toast);`
- At `min-width: var(--bp-tablet)`: `left: auto; right: var(--space-4); max-width: 360px;`
- Toast entry animation uses `slideUp` keyframe from `animations.html`
- In `toastService.html`: remove all `element.style.*` and `style.cssText` assignments; replace with `element.classList.add('toast', 'toast--' + type)`

**SUCCESS CRITERIA**
- Toast service contains zero `element.style` assignments
- All four toast variants render with correct token-based colors
- Toasts appear at the correct position on mobile and desktop

**VERIFICATION CHECKLIST**
- [ ] `Toast.success('test')` renders green toast
- [ ] `Toast.error('test')` renders red toast
- [ ] No `style=` attributes on toast elements in the DOM
- [ ] Toasts appear at top-right on 768px+
- [ ] Toasts appear full-width at 375px

**ROLLBACK PLAN**
Delete `components/toast.html`. Restore `toastService.html` from version control.

---

### TASK-032 — Create `components/tables.html` with Mobile Card Transformation

**OBJECTIVE**
Create the canonical table component CSS including the full mobile card transformation pattern per `RESPONSIVE_PATTERNS.md` Section 8.1.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 8, Table Responsiveness
- `UI_PATTERN_REGISTRY.md` — Patterns T-01, T-02

**ALLOWED FILES**
- `src/ui/styles/components/tables.html` (create new)

**FORBIDDEN**
- Do not use `max-width` media queries
- Do not hardcode values
- Do not modify any controller or page file in this task

**IMPLEMENTATION RULES**
- Desktop table styles (default, will be mobile-first after transformation trigger):
- `.table-wrapper { overflow-x: auto; }` — scroll fallback at intermediate sizes
- `.table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }`
- `.table th { padding: var(--space-2) var(--space-3); background: var(--color-bg-subtle); font-weight: var(--font-weight-semibold); text-align: left; }`
- `.table td { padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--color-border-subtle); }`
- Mobile card transformation (default — mobile-first means these are the base styles):
- `.table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }` (sr-only pattern)
- `.table tr { display: block; margin-bottom: var(--space-3); border: 1px solid var(--color-border-default); border-radius: var(--radius-lg); padding: var(--space-3); background: var(--color-bg-card); }`
- `.table td { display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border-subtle); padding: var(--space-2) 0; }`
- `.table td::before { content: attr(data-label); font-weight: var(--font-weight-medium); color: var(--color-text-secondary); }`
- `.table td:last-child { border-bottom: none; }`
- At `min-width: var(--bp-tablet)`: restore traditional table layout — `thead` visible, `tr` as `table-row`, `td` as `table-cell` without `::before`

**SUCCESS CRITERIA**
- Below 768px: each table row renders as a card
- Above 768px: traditional table layout
- Card rows show `data-label` values as pseudo-element prefixes

**VERIFICATION CHECKLIST**
- [ ] At 375px: rows appear as cards with label: value pairs
- [ ] At 768px: traditional table layout with visible column headers
- [ ] `::before` content matches the `data-label` attribute value
- [ ] No hardcoded values

**ROLLBACK PLAN**
Delete `components/tables.html`. No other files modified.

---

### TASK-033 — Add `data-label` Attributes to All CRUD Table Templates

**OBJECTIVE**
Add `data-label` attributes to every `<td>` element in every CRUD entity table template so the mobile card transformation can display column names.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 8.1, Mobile Card Layout
- `UI_PATTERN_REGISTRY.md` — Pattern T-02

**ALLOWED FILES**
- `src/ui/modules/categories/categories.controller.html`
- `src/ui/modules/units/units.controller.html`
- `src/ui/modules/products/products.controller.html` (if exists)
- `src/ui/modules/sales/` relevant template files
- `src/ui/modules/stockMovements/` relevant template files

**FORBIDDEN**
- Do not change any visual styling
- Do not modify the table service (`tableService.html`)
- Do not change column order or content

**IMPLEMENTATION RULES**
- For each `<td>` in each table template, add `data-label="[Column Header Text]"` where the value matches the visible column heading
- Example: `<td data-label="Product Name">{{name}}</td>`
- Action column `<td>` should have `data-label="Actions"`

**SUCCESS CRITERIA**
- Every `<td>` in every CRUD table has a `data-label` attribute
- At 375px, the card transformation renders correct labels from these attributes

**VERIFICATION CHECKLIST**
- [ ] Open Categories at 375px — card rows show "Name:", "Description:", etc.
- [ ] Open Units at 375px — card rows show correct column labels
- [ ] Every `<td>` in each table has non-empty `data-label`

**ROLLBACK PLAN**
Remove the added `data-label` attributes from version control. No visual change occurs in production because the card transformation CSS requires them.

---

### TASK-034 — Add Component Imports to `main.css`

**OBJECTIVE**
Add all component CSS imports to `main.css`.

**ALLOWED FILES**
- `src/ui/styles/main.css`

**FORBIDDEN**
- Do not reorder existing imports
- Do not add page imports yet

**IMPLEMENTATION RULES**
- Add `/* === COMPONENTS === */` block after layout imports
- Import in order: `components/buttons.css`, `components/forms.css`, `components/cards.css`, `components/modals.css`, `components/toast.css`, `components/tables.css`

**SUCCESS CRITERIA**
- 6 component imports added after layout imports

**VERIFICATION CHECKLIST**
- [ ] Total imports in `main.css`: 9 tokens + 3 base + 5 utilities + 3 layout + 6 components = 26
- [ ] Order: tokens → base → utilities → layout → components

**ROLLBACK PLAN**
Remove the 6 added import lines from `main.css`.

---

## Phase 6 — CRUD Page Migration

---

### TASK-035 — Migrate Categories Page to Canonical Components

**OBJECTIVE**
Migrate `categories.html` to use shared components. Remove all inline Tailwind utility strings that duplicate component styles. This is the pilot migration — patterns established here apply to all subsequent CRUD pages.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Patterns C-01, C-02, T-01, B-01, M-01, F-01
- `MIGRATION_PLAN.md` — Phase 6, Per-Page Task Sequence

**ALLOWED FILES**
- `src/ui/pages/categories.html`
- `src/ui/modules/categories/categories.modal.html`
- `src/ui/modules/categories/categories.controller.html`

**FORBIDDEN**
- Do not introduce any new `<style>` blocks
- Do not introduce any inline `style=""` attributes
- Do not use Tailwind class names for anything covered by a component class
- Do not change any JavaScript logic — HTML and CSS only

**IMPLEMENTATION RULES**
1. Replace page header `<div class="flex items-center justify-between ...">` with `<div class="page-header">` structure
2. Replace content card `<div class="bg-white rounded shadow p-4">` with `<div class="card">`
3. Apply `.table`, `.table-wrapper` to the data table
4. Apply `.btn.btn--primary` to the "Add Category" button
5. In `categories.modal.html`: apply `.form-group`, `.form-label`, `.form-input` to form fields; apply `.btn.btn--primary.btn--lg.btn--full` to submit button; apply `.btn.btn--secondary` to cancel button
6. Remove all `<style>` blocks from both files
7. Apply `.badge` to any status or type indicators

**SUCCESS CRITERIA**
- Zero `<style>` blocks in modified files
- Zero inline `style=""` attributes
- Zero raw Tailwind utility strings on elements covered by canonical components
- Page renders identically at 375px, 768px, 1280px
- Create/Edit/Delete operations function correctly

**VERIFICATION CHECKLIST**
- [ ] No `<style>` block in `categories.html`
- [ ] No `<style>` block in `categories.modal.html`
- [ ] Create category modal opens, submits, and closes
- [ ] Edit category modal opens pre-populated
- [ ] Delete confirmation works
- [ ] Table card transformation renders at 375px
- [ ] Toast notifications appear on success/error

**ROLLBACK PLAN**
Restore all three files from version control.

---

### TASK-036 — Migrate Units, Products, Stock Movements, and Sales Pages

**OBJECTIVE**
Apply the same migration pattern established in TASK-035 to the four remaining CRUD pages.

**ARCHITECTURE REFERENCES**
- Same as TASK-035

**ALLOWED FILES**
- `src/ui/pages/units.html` + `src/ui/modules/units/`
- `src/ui/pages/products.html` + `src/ui/modules/products/`
- `src/ui/pages/stockMovements.html` + `src/ui/modules/stockMovements/`
- `src/ui/pages/sales.html` + `src/ui/modules/sales/`

**FORBIDDEN**
- Same as TASK-035
- Do not migrate `settings.html` in this task — it has a distinct layout pattern

**IMPLEMENTATION RULES**
- Follow the same 7-step sequence as TASK-035 for each page
- `sales.html` receipt display uses canonical P-06 classes (already unified in TASK-014)
- Migrate pages in order: units → products → stockMovements → sales
- After each page, run verification before beginning the next

**SUCCESS CRITERIA**
- All four pages: zero `<style>` blocks, zero inline styles, all operations functional at all breakpoints

**VERIFICATION CHECKLIST**
- [ ] Units: CRUD operations work, table card at 375px
- [ ] Products: CRUD operations work, table card at 375px
- [ ] Stock Movements: table renders, filter works
- [ ] Sales: receipt modal renders correctly using P-06 classes

**ROLLBACK PLAN**
Restore each page's files from version control independently.

---

### TASK-037 — Migrate Settings Page

**OBJECTIVE**
Migrate `settings.html` to canonical components. Settings has a distinct layout pattern (form sections, not a data table) requiring specific attention.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Patterns C-01, C-02, F-01, B-01

**ALLOWED FILES**
- `src/ui/pages/settings.html`

**FORBIDDEN**
- Do not change settings functionality
- Do not introduce page-level responsive rules — use existing component responsive behavior

**IMPLEMENTATION RULES**
- Replace settings card wrappers with `.card.card--lg`
- Replace settings page header with `.page-header`
- Replace all `<input>` elements with `.form-input`
- Replace all labels with `.form-label`
- Replace the Save button with `.btn.btn--primary.btn--lg`
- The `#taxRateInput` ID may remain for JavaScript targeting — only the visual class changes
- Remove the `<style>` block

**SUCCESS CRITERIA**
- Settings page renders correctly at all breakpoints
- Tax rate input functions correctly
- Save button submits correctly
- Zero `<style>` blocks

**VERIFICATION CHECKLIST**
- [ ] No `<style>` block in `settings.html`
- [ ] Settings save operation works
- [ ] Input fields have correct focus styles from `forms.html`
- [ ] Page renders correctly at 375px and 1280px

**ROLLBACK PLAN**
Restore `settings.html` from version control.

---

## Phase 7 — POS Migration

---

### TASK-038 — Namespace All POS-Specific CSS Classes

**OBJECTIVE**
Rename all unscoped POS class names with a `.pos-` prefix to prevent global collision. Update all HTML template references and JavaScript class string references simultaneously.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — POS-Specific UI Problems (CSS scope contamination)
- `MIGRATION_PLAN.md` — Task 7.2

**ALLOWED FILES**
- `src/ui/pages/pos.html` (HTML and CSS `<style>` block)

**FORBIDDEN**
- Do not rename classes that already belong to shared components (e.g., `.btn`, `.hidden`, `.card`)
- Do not change any visual behavior
- Do not change any JavaScript logic — only rename the string references that target CSS classes

**IMPLEMENTATION RULES**
- Classes to rename (examples — audit the full list before starting): `.spinner` → `.pos-spinner`, `.product-card` → `.pos-product-card`, `.product-grid` → `.pos-product-grid`, `.category-btn` → `.pos-category-btn`, `.cart-item` → `.pos-cart-item`, `.payment-method-btn` → `.pos-payment-method-btn`, `.checkout-btn` → `.pos-checkout-btn`, `.search-input` → `.pos-search-input`
- For each rename: update the CSS class definition, all HTML `class=""` attribute values, and all JavaScript `classList`, `querySelector`, `getElementsByClassName` references
- Work through the file systematically — do not rename in the CSS first and forget the HTML/JS

**SUCCESS CRITERIA**
- No unscoped generic class names remain in `pos.html`'s `<style>` block
- POS renders visually identically after renaming
- No JavaScript errors in the console

**VERIFICATION CHECKLIST**
- [ ] Full POS checkout flow works (products, cart, payment, receipt)
- [ ] No JavaScript console errors
- [ ] `grep` for `.spinner` in `pos.html` returns zero results (no unscoped usage)
- [ ] Visual comparison at 375px, 768px, 1280px shows no regression

**ROLLBACK PLAN**
Restore `pos.html` from version control.

---

### TASK-039 — Eliminate All POS Inline Visibility Styles

**OBJECTIVE**
Replace all 15+ `style="display:none"`, `style="display:block"`, `style="display:flex"` declarations in `pos.html` with the `.hidden` utility class and class-based toggling.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Inline Styling Problems
- `MIGRATION_PLAN.md` — Task 7.3

**ALLOWED FILES**
- `src/ui/pages/pos.html`

**FORBIDDEN**
- Do not change any POS layout values or component structure
- Do not change the timing or logic of when elements are shown/hidden
- Do not change `style` attributes that are not display-related (e.g., width, height)

**IMPLEMENTATION RULES**
- Map every `style="display:none"` element to its controlling JavaScript
- For elements initially hidden: replace `style="display:none"` with `class="... hidden"`
- For the controlling JavaScript: replace `element.style.display = 'none'` with `element.classList.add('hidden')` and `element.style.display = 'block'` (or `flex`) with `element.classList.remove('hidden')`
- Note: `.hidden` uses `display: none !important` — if a specific display value (flex vs block) is needed when visible, the component's CSS must define the correct default display, and `.hidden` only suppresses it
- Affected elements include: `#search-results`, `#change-row`, `#change-display`, `#credit-section`, `#credit-balance`, `#payment-loading-overlay`, cart empty state, payment method-specific panels

**SUCCESS CRITERIA**
- Zero `style="display:..."` attributes remain on any POS element
- Zero `element.style.display` assignments remain in POS JavaScript
- All show/hide behaviors function identically to before

**VERIFICATION CHECKLIST**
- [ ] Search for `style="display` in `pos.html` — zero results
- [ ] Search for `.style.display` in `pos.html` JavaScript — zero results
- [ ] Add items to cart — cart empty state disappears, items appear
- [ ] Select cash payment — amount input and change display appear
- [ ] Select non-cash payment — amount input hides
- [ ] Apply credit — credit section appears

**ROLLBACK PLAN**
Restore `pos.html` from version control.

---

### TASK-040 — Create `pages/pos.html` — POS Layout Structure

**OBJECTIVE**
Create the POS-specific layout CSS file defining the product/cart split on desktop and the stacked layout on mobile.

**ARCHITECTURE REFERENCES**
- `RESPONSIVE_PATTERNS.md` — Section 11.2, POS Split / Stack Layout
- `UI_PATTERN_REGISTRY.md` — Pattern R-03

**ALLOWED FILES**
- `src/ui/styles/pages/pos.html` (create new)

**FORBIDDEN**
- Do not use `max-width` media queries
- Do not hardcode pixel values
- Do not define component styles here — only POS layout composition

**IMPLEMENTATION RULES**
- `.pos-layout`: default (mobile): `display: flex; flex-direction: column; height: calc(100dvh - var(--topbar-height)); overflow: hidden;`
- `.pos-panel-products`: default: `flex: 1; overflow-y: auto; padding: var(--space-3);`
- `.pos-panel-cart`: default: `overflow-y: auto; padding: var(--space-3);`
- At `min-width: var(--bp-desktop)`: `.pos-layout { flex-direction: row; }`, `.pos-panel-products { flex: 1; }`, `.pos-panel-cart { width: var(--pos-cart-width); flex-shrink: 0; }`
- POS page overrides default content area padding to zero (per `RESPONSIVE_PATTERNS.md` Section 6.3): `.page-content--pos { padding: 0; }`

**SUCCESS CRITERIA**
- Side-by-side layout at 1280px
- Stacked layout at 375px
- Both panels scroll independently

**VERIFICATION CHECKLIST**
- [ ] At 1280px: product grid and cart panel are side-by-side
- [ ] At 375px: product grid stacks above cart panel
- [ ] Scrolling the product grid does not scroll the cart panel
- [ ] Layout height fills viewport minus topbar height
- [ ] No hardcoded values

**ROLLBACK PLAN**
Delete `pages/pos.html`. No other files modified.

---

### TASK-041 — Migrate POS Cart Item Row (P-02) and Fix Touch Targets

**OBJECTIVE**
Apply canonical P-02 cart item styles. Ensure quantity +/- and remove buttons meet the 44×44px touch target minimum.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Pattern P-02
- `RESPONSIVE_PATTERNS.md` — Section 12.1, Tap Target Rules

**ALLOWED FILES**
- `src/ui/styles/pages/pos.html`
- `src/ui/pages/pos.html` (HTML structure only — no new styles in template)

**FORBIDDEN**
- Do not change the cart item JavaScript logic
- Do not define cart item styles outside `pos.html`
- Do not use values outside the token system

**IMPLEMENTATION RULES**
- In `pos.html` (page styles): define `.pos-cart-item` styles using P-02 token references
- Quantity buttons (`.pos-qty-btn` or equivalent): enforce `min-width: 44px; min-height: 44px;` via `.btn.btn--icon`
- Remove button: enforce `min-width: 44px; min-height: 44px;`
- Apply `.btn.btn--icon` class to all three button types (increment, decrement, remove) in the HTML
- Product name: `.truncate` utility for single-line ellipsis
- Line total: `font-weight: var(--font-weight-bold);`

**SUCCESS CRITERIA**
- Cart item quantity controls measure ≥ 44×44px in DevTools
- Cart item renders correctly with product name, price, quantity, and total
- Long product names truncate with ellipsis

**VERIFICATION CHECKLIST**
- [ ] Measure increment button in DevTools: width ≥ 44px, height ≥ 44px
- [ ] Measure decrement button: same
- [ ] Measure remove button: same
- [ ] Long product name is truncated with ellipsis, not overflowing
- [ ] Cart item quantity can be incremented and decremented

**ROLLBACK PLAN**
Restore `pos.html` HTML and remove cart item styles from `pages/pos.html` via version control.

---

### TASK-042 — Fix Payment Modal Mobile Overflow (P-05, Critical Bug)

**OBJECTIVE**
Fix the active high-priority bug where payment modal content exceeds viewport height on mobile with no scroll fallback.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — High Priority Refactor Areas (payment modal mobile overflow)
- `RESPONSIVE_PATTERNS.md` — Section 11.5, Payment Modal Behavior
- `UI_PATTERN_REGISTRY.md` — Patterns M-01, P-04, P-05

**ALLOWED FILES**
- `src/ui/pages/pos.html` (payment modal HTML structure)
- `src/ui/styles/pages/pos.html`

**FORBIDDEN**
- Do not change payment validation logic
- Do not change payment method configuration
- Do not use `max-width` media queries

**IMPLEMENTATION RULES**
- The payment modal must be opened via `Modal.open()` using the existing modal service — if it is currently a custom div, migrate it to use the modal service
- If migrating to modal service: move `#paymentModalContent` HTML into a template compatible with `Modal.open()`
- The modal service's `modal--fullscreen` behavior (established in TASK-030) handles the overflow at mobile
- If the payment modal content is too tall to fit on mobile, the modal body's `overflow-y: auto` handles scrolling
- Payment method selector: default (mobile) `display: grid; grid-template-columns: 1fr 1fr;` for stacked layout; at `min-width: var(--bp-desktop)` `grid-template-columns: repeat(4, 1fr)` for horizontal
- Payment amount input: `min-height: 48px; font-size: var(--text-xl);` on mobile

**SUCCESS CRITERIA**
- At 375px, payment modal is fullscreen and scrollable
- All payment method buttons are visible and tappable
- Amount input is large and readable on mobile

**VERIFICATION CHECKLIST**
- [ ] At 375px: complete payment modal is visible and scrollable
- [ ] All payment options accessible without content being cut off
- [ ] Amount input height ≥ 48px at 375px
- [ ] Complete payment flow works end-to-end on mobile

**ROLLBACK PLAN**
Restore `pos.html` HTML and revert `pages/pos.html` payment modal styles from version control.

---

### TASK-043 — Add Print Styles for Receipt

**OBJECTIVE**
Add `@media print` styles for receipt rendering so printed receipts are clean and usable.

**ARCHITECTURE REFERENCES**
- `UI_PATTERN_REGISTRY.md` — Pattern P-06, Receipt Display
- `UI_AUDIT.md` — POS-Specific UI Problems (no print styles)

**ALLOWED FILES**
- `src/ui/styles/pages/pos.html`

**FORBIDDEN**
- Do not change any screen styles
- Do not use `max-width` media queries
- Do not add print styles to any other file

**IMPLEMENTATION RULES**
- `@media print { body { background: white; } .modal-overlay { background: none; box-shadow: none; } .receipt__actions { display: none; } .topbar { display: none; } .sidebar { display: none; } .pos-panel-products { display: none; } .pos-panel-cart { display: none; } .receipt { display: block; width: 100%; box-shadow: none; border: none; padding: 0; } }`
- Receipt content should be full-page width in print
- Font sizes in print context: minimum `10pt` for readability

**SUCCESS CRITERIA**
- Print preview shows only the receipt content
- Navigation, product grid, cart panel, and action buttons are hidden in print

**VERIFICATION CHECKLIST**
- [ ] Open browser print preview after a sale — only receipt content visible
- [ ] Receipt text is readable (not clipped or overflowing)
- [ ] No modal overlay or shadows in print output

**ROLLBACK PLAN**
Remove the `@media print` block from `pages/pos.html`.

---

### TASK-044 — Convert POS `<style>` Block to Token References and Remove It

**OBJECTIVE**
Replace every remaining hardcoded value in `pos.html`'s `<style>` block with token references, move any remaining POS-specific styles to `pages/pos.html`, then delete the `<style>` block entirely.

**ARCHITECTURE REFERENCES**
- `STYLING_ARCHITECTURE.md` — AI Agent Styling Rules
- `MIGRATION_PLAN.md` — Tasks 7.13, 7.14

**ALLOWED FILES**
- `src/ui/pages/pos.html` (`<style>` block only)
- `src/ui/styles/pages/pos.html`

**FORBIDDEN**
- Do not move styles that belong to a shared component into `pages/pos.html`
- Do not change any JavaScript logic
- Do not leave any `<style>` block in `pos.html`

**IMPLEMENTATION RULES**
- Audit every CSS rule remaining in `pos.html`'s `<style>` block
- For each rule: if it belongs to a shared component (button, card, modal), delete it — the component CSS handles it; if it is POS-specific layout, move it to `pages/pos.html` with values replaced by tokens
- After all rules are moved or deleted, remove the `<style>` element from `pos.html`

**SUCCESS CRITERIA**
- `pos.html` contains zero `<style>` elements
- Full POS flow works identically after removal

**VERIFICATION CHECKLIST**
- [ ] Search for `<style>` in `pos.html` — zero results
- [ ] Full POS checkout flow works at 375px, 768px, 1280px
- [ ] No visual regressions

**ROLLBACK PLAN**
Restore `pos.html` from version control. Remove additions to `pages/pos.html`.

---

### TASK-045 — Add `pages/pos.css` Import and Full POS Regression Test

**OBJECTIVE**
Add the POS page stylesheet to `main.css` and run the full POS checkout regression test to confirm the migration is complete.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Task 7.15, Regression Test Checklist

**ALLOWED FILES**
- `src/ui/styles/main.css`

**FORBIDDEN**
- Do not make any CSS or HTML changes in this task — imports and testing only

**IMPLEMENTATION RULES**
- Add `/* === PAGES === */` block after components
- Import `pages/pos.css`
- Execute the full regression test sequence from `MIGRATION_PLAN.md` Appendix C, POS Flow section
- Test at 375px, 768px, and 1280px

**SUCCESS CRITERIA**
- Complete POS checkout flow works at all three breakpoints
- All items in the regression checklist pass

**VERIFICATION CHECKLIST**
- [ ] Products display in grid
- [ ] Product search returns results
- [ ] Products add to cart on tap
- [ ] Quantity controls work (and are ≥ 44px)
- [ ] Cart item removal works
- [ ] Checkout opens payment modal
- [ ] Cash payment flow completes
- [ ] Receipt displays with correct totals
- [ ] New sale resets cart
- [ ] No JavaScript console errors at any breakpoint

**ROLLBACK PLAN**
Remove the `pages/pos.css` import from `main.css`. The POS page will lose its page-level styles but shared component styles remain intact.

---

## Phase 8 — Cleanup & Legacy Removal

---

### TASK-046 — Conduct Final Token, Inline Style, and Duplication Audits

**OBJECTIVE**
Search the entire codebase for three categories of remaining violations: hardcoded CSS values, inline `style=""` attributes, and duplicate CSS definitions. Produce a gap report.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Tasks 8.8, 8.9, 8.10

**ALLOWED FILES**
- All files (read-only audit — no modifications in this task)

**FORBIDDEN**
- Do not modify any files in this task

**IMPLEMENTATION RULES**
- Token audit: `grep -r "#[0-9a-fA-F]\{3,6\}" src/ui/styles/` (excluding `tokens/` directory) — every result is a violation
- Inline style audit: `grep -r "style=\"" src/ui/` — every result is a violation (except template-initial `.hidden` equivalents scheduled for previous tasks)
- Duplication audit: search for class names defined in more than one CSS file for the same visual purpose
- Record every finding as a task item for remediation in TASK-047

**SUCCESS CRITERIA**
- Complete gap list is produced
- Every finding is documented with file and line number

**VERIFICATION CHECKLIST**
- [ ] Token audit ran and results documented
- [ ] Inline style audit ran and results documented
- [ ] Duplication audit ran and results documented

**ROLLBACK PLAN**
No files modified. Nothing to roll back.

---

### TASK-047 — Remediate All Audit Findings from TASK-046

**OBJECTIVE**
Fix every violation identified in TASK-046's gap report.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Tasks 8.8, 8.9, 8.10

**ALLOWED FILES**
- Any file identified in the TASK-046 gap report

**FORBIDDEN**
- Do not introduce new violations while fixing existing ones
- Do not change functionality — only token replacement and inline style elimination

**IMPLEMENTATION RULES**
- For each hardcoded color: replace with nearest matching token
- For each hardcoded spacing value: replace with nearest `var(--space-*)` token
- For each inline style: replace with class toggling using `.hidden` or a component class
- For each duplicate definition: delete the secondary definition and confirm the primary is sufficient

**SUCCESS CRITERIA**
- Rerunning the audits from TASK-046 produces zero results (excluding `tokens/` directory)

**VERIFICATION CHECKLIST**
- [ ] Token audit: zero results outside `tokens/`
- [ ] Inline style audit: zero results
- [ ] No visual regressions after remediation

**ROLLBACK PLAN**
Restore each modified file from version control individually.

---

### TASK-048 — Remove Dead Files and Legacy Declarations

**OBJECTIVE**
Remove legacy files that have been fully superseded: the dead `modal.html` component, residual content from `theme.html` and `responsive.html`, and the Tailwind CDN import if no Tailwind classes remain.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Tasks 8.1, 8.2, 8.3, 8.4

**ALLOWED FILES**
- `src/ui/components/modal.html` (delete)
- `src/ui/styles/theme.html` (delete or convert to stub)
- `src/ui/styles/responsive.html` (delete or convert to stub)
- The application HTML entry point (remove Tailwind CDN `<link>` tag if applicable)

**FORBIDDEN**
- Do not delete `theme.html` or `responsive.html` if any file still imports them — audit import chains first
- Do not remove the Tailwind CDN link if any Tailwind class names remain in any template

**IMPLEMENTATION RULES**
- Audit all `import` and `<link>` references to each file before deletion
- Remove CDN link only after confirming zero remaining Tailwind class usage
- Delete `modal.html` after confirming no code references it

**SUCCESS CRITERIA**
- No dead files in the project
- No broken import references

**VERIFICATION CHECKLIST**
- [ ] `grep -r "modal.html"` returns zero references
- [ ] `grep -r "theme.html"` returns zero references (or only the file itself)
- [ ] `grep -r "responsive.html"` returns zero references
- [ ] All pages still render correctly after removals

**ROLLBACK PLAN**
Restore deleted files from version control. Re-add the CDN link if needed.

---

### TASK-049 — Replace Emoji Navigation Icons with SVG

**OBJECTIVE**
Replace emoji characters in the sidebar navigation with inline SVG icons that have `aria-hidden="true"`.

**ARCHITECTURE REFERENCES**
- `UI_AUDIT.md` — Low Priority Refactor Areas

**ALLOWED FILES**
- `src/ui/components/sidebar.html`

**FORBIDDEN**
- Do not change nav item labels, routes, or click behavior
- Do not introduce an external icon library

**IMPLEMENTATION RULES**
- Define a minimal SVG icon set inline for the navigation items present in the sidebar
- Each SVG must have `aria-hidden="true"` and `focusable="false"`
- Size icons at `20×20px` via `width` and `height` attributes
- Use `currentColor` for fill/stroke so icon color inherits from the nav item's CSS color token
- Replace each emoji with its corresponding SVG element

**SUCCESS CRITERIA**
- No emoji characters in the sidebar
- Icons render consistently across Chrome, Firefox, and Safari
- Icon color inherits the sidebar text token color

**VERIFICATION CHECKLIST**
- [ ] No emoji in sidebar navigation
- [ ] Icons visible at 375px and 1280px
- [ ] Active nav item icon changes color with the active state
- [ ] Screen reader does not announce icon content

**ROLLBACK PLAN**
Restore `sidebar.html` from version control.

---

### TASK-050 — Final System Regression Test

**OBJECTIVE**
Execute the complete regression test from `MIGRATION_PLAN.md` Appendix C across all pages and user flows at 375px, 768px, and 1280px. Confirm the migration is complete.

**ARCHITECTURE REFERENCES**
- `MIGRATION_PLAN.md` — Appendix C, Regression Test Checklist

**ALLOWED FILES**
- No files are modified in this task — testing only

**FORBIDDEN**
- Do not make any code changes in this task
- If a regression is found, create a new task to fix it rather than fixing inline

**IMPLEMENTATION RULES**
- Execute every item in `MIGRATION_PLAN.md` Appendix C
- Test at exactly 375px, 768px, and 1280px viewport widths
- Record any failures with file, viewport, and description

**SUCCESS CRITERIA**
- Every checklist item in Appendix C passes at all three viewport widths
- Zero console JavaScript errors on any page
- Zero visual regressions compared to pre-migration baseline

**VERIFICATION CHECKLIST**
- All items in `MIGRATION_PLAN.md` Appendix C: Visual Regression, Navigation, CRUD Operations, POS Flow, Responsive Contracts

**ROLLBACK PLAN**
The regression test does not modify files. Failures found become new tasks.

---

## Task Summary

| Task | Phase | Touches | Priority |
|------|-------|---------|----------|
| TASK-001 | P1 | Read-only audit | Critical |
| TASK-002 | P1 | `tokens/colors.html` | Critical |
| TASK-003 | P1 | `tokens/spacing.html` | Critical |
| TASK-004 | P1 | `tokens/typography.html` | Critical |
| TASK-005 | P1 | `tokens/radius.html`, `shadows.html`, `zindex.html` | Critical |
| TASK-006 | P1 | `tokens/breakpoints.html`, `animations.html`, `layout.html` | Critical |
| TASK-007 | P1 | `main.css` | Critical |
| TASK-008 | P1 | App entry point | Critical |
| TASK-009 | P1 | `theme.html` | Critical |
| TASK-010 | P2 | `base/reset.html` | Critical |
| TASK-011 | P2 | `base/globals.html`, `base/animations.html` | Critical |
| TASK-012 | P2 | `main.css` | Critical |
| TASK-013 | P2 | `modalService.html`, `components/modals.html` | Critical |
| TASK-014 | P2 | `sales.html`, `sales.modal.html` | Critical |
| TASK-015 | P2 | `pos.html`, `cartItemRow.html` | Critical |
| TASK-016 | P2 | `utilities/visibility.html` | Critical |
| TASK-017 | P3 | `utilities/flex.html`, `utilities/layout.html` | High |
| TASK-018 | P3 | `utilities/spacing.html`, `utilities/typography.html` | High |
| TASK-019 | P3 | `main.css` | High |
| TASK-020 | P3 | `pos.html`, `uiService.html`, `modals.html` | Critical |
| TASK-021 | P4 | `layout/app-shell.html` | Critical |
| TASK-022 | P4 | `layout/sidebar.html` | Critical |
| TASK-023 | P4 | `layout/topbar.html` | Critical |
| TASK-024 | P4 | `app.html` | Critical |
| TASK-025 | P4 | `sidebar.html`, `main.css` | High |
| TASK-026 | P4 | `app.html`, `topbar.html` | Medium |
| TASK-027 | P5 | `components/buttons.html` | Critical |
| TASK-028 | P5 | `components/forms.html` | Critical |
| TASK-029 | P5 | `components/cards.html` | Critical |
| TASK-030 | P5 | `components/modals.html` | Critical |
| TASK-031 | P5 | `components/toast.html`, `toastService.html` | Critical |
| TASK-032 | P5 | `components/tables.html` | High |
| TASK-033 | P5 | CRUD module templates | High |
| TASK-034 | P5 | `main.css` | High |
| TASK-035 | P6 | `categories.html`, `categories.modal.html` | High |
| TASK-036 | P6 | Units, Products, Stock, Sales files | High |
| TASK-037 | P6 | `settings.html` | Medium |
| TASK-038 | P7 | `pos.html` | Critical |
| TASK-039 | P7 | `pos.html` | Critical |
| TASK-040 | P7 | `pages/pos.html` | Critical |
| TASK-041 | P7 | `pos.html`, `pages/pos.html` | Critical |
| TASK-042 | P7 | `pos.html`, `pages/pos.html` | Critical |
| TASK-043 | P7 | `pages/pos.html` | High |
| TASK-044 | P7 | `pos.html`, `pages/pos.html` | Critical |
| TASK-045 | P7 | `main.css` | Critical |
| TASK-046 | P8 | Read-only audit | High |
| TASK-047 | P8 | Varies (gap report findings) | High |
| TASK-048 | P8 | Dead files | Medium |
| TASK-049 | P8 | `sidebar.html` | Low |
| TASK-050 | P8 | Read-only test | Critical |
ENDOFFILE
