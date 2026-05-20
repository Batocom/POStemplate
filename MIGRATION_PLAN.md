# UI Migration Plan

**Version:** 1.1 (Apps Script Refactored)
**Status:** Execution Blueprint
**Depends On:** `UI_AUDIT.md`, `UI_PATTERN_REGISTRY.md`, `RESPONSIVE_PATTERNS.md`, `STYLING_ARCHITECTURE.md`

This document defines the phased migration execution plan for transforming the current broken and rigid POS UI into the modular, token-driven, responsive architecture defined in the system's architectural documents. Each phase has a defined purpose, ordered task list, dependency contract, risk profile, and completion criteria.

This is a sequencing and execution document. It does not define implementation details — those are owned by `UI_PATTERN_REGISTRY.md`, `RESPONSIVE_PATTERNS.md`, and `STYLING_ARCHITECTURE.md`.

---

## Migration Philosophy

### Migrate From the Bottom Up

The current architecture fails because its foundation is absent: no token system, no utility layer, no shared components, no responsive contracts. Building new patterns on the broken foundation only deepens the debt.

Migration must proceed from the lowest dependency level upward:

```
Tokens → Base Styles → Utilities → Layout → Components → Pages → Cleanup
```

No layer may be migrated before the layer it depends on is complete. This sequence is not advisory — it is enforced by the dependency contracts in each phase.

### Parallel Existence Is Acceptable, Divergence Is Not

During migration, the old system and new system will coexist in the same codebase. This is acceptable and expected. What is not acceptable is allowing the old system to continue diverging — adding new inline styles, new hardcoded colors, new duplicated layout blocks — while migration is in progress.

From migration start, a freeze applies to the old system:

- No new inline styles may be added.
- No new hardcoded color or spacing values may be added.
- No new per-page responsive rules may be added.
- No new component implementations may be created outside the component layer.

New UI work during migration must use the new system, even if it means temporarily referencing tokens before their consuming components are fully migrated.

### Migrate One Pattern at a Time

Each pattern defined in `UI_PATTERN_REGISTRY.md` is migrated as a complete unit. Partial pattern migrations — where the HTML structure is updated but the CSS still references old values, or the token is assigned but not yet consumed — are not complete migrations. They introduce silent inconsistency.

A pattern migration is complete only when:

1. The component CSS uses tokens exclusively.
2. The HTML structure matches the pattern definition.
3. The old implementation is removed.
4. The pattern renders correctly at all three responsive tiers.

### The POS Page Migrates Last Among Pages

The POS page is the highest-stakes interface and the most architecturally complex. It also has the most active inline style usage, the most breakpoint inconsistencies, and the most component duplication. It must not be migrated until all shared components it depends on are complete and validated. Attempting POS migration before its dependencies are ready will cause regression in the highest-priority user flow.

---

## Migration Rules

These rules apply for the entire duration of the migration across all phases and all contributors.

**Rule 1 — No New Hardcoded Values**
From migration start, no CSS rule may use a raw color hex, raw pixel spacing value, or raw breakpoint value. All new CSS must reference tokens. This applies to patches, hotfixes, and feature additions made during the migration period.

**Rule 2 — No New Inline Styles**
No new `style="..."` attributes may be added to any HTML element. State changes must be implemented via CSS class toggling. The only exception is server-rendered initial hidden state, which must be resolved in Phase 2.

**Rule 3 — No New Max-Width Media Queries**
All responsive CSS authored during migration must use `min-width` breakpoints only, referencing the canonical breakpoint tokens.

**Rule 4 — No New Page-Level Responsive Rules**
All responsive behavior must be defined at the component or layout layer. Page files may not introduce new media queries.

**Rule 5 — One Definition Per Pattern**
If a pattern is being migrated, its old definition must be deleted in the same task. Duplicate coexistence of old and new definitions is not permitted beyond a single working session.

**Rule 6 — Validate Before Proceeding**
Each phase has defined completion criteria and validation requirements. The next phase must not begin until the current phase passes all validation requirements. Skipping validation to accelerate delivery produces regression debt that compounds in later phases.

**Rule 7 — AI Agent Compliance**
AI agents working on this codebase during migration must read the relevant architectural documents before generating any output. The rules in this document, `STYLING_ARCHITECTURE.md`, `UI_PATTERN_REGISTRY.md`, and `RESPONSIVE_PATTERNS.md` are enforced constraints, not suggestions.

---

## Migration Safety Rules

These rules specifically address regression risk — the risk that migrating one thing breaks something else.

**Safety Rule 1 — Snapshot Before Each Phase**
Before beginning each phase, capture a visual snapshot of every page affected by that phase. The snapshot serves as the regression baseline.

**Safety Rule 2 — Test at Three Breakpoints**
Every component or pattern change must be verified at mobile (375px), tablet (768px), and desktop (1280px) before the task is considered complete.

**Safety Rule 3 — Test the POS Checkout Flow After Any Shared Component Change**
The POS checkout flow is the highest-risk user flow. Any change to a shared component (buttons, modals, forms, cart) must be followed by a full POS checkout flow test before the change is committed.

**Safety Rule 4 — Don't Merge Token Changes Without Full Audit**
Token value changes (modifying an existing token's value, not adding new tokens) affect every consumer simultaneously. A token value change requires verifying every pattern that references that token.

**Safety Rule 5 — Dead Code Removal Is a Separate Task**
When a pattern is migrated and its old implementation is to be deleted, the deletion is a separate, explicitly staged task. Migrating and deleting in the same unreviewed operation masks errors.

**Safety Rule 6 — JavaScript That References Class Names Must Be Updated Alongside CSS**
Several components use JavaScript to toggle class names or check element state. When class names change during migration, the JavaScript references must be updated in the same task. A CSS rename without a matching JS update is an invisible runtime bug.

---

## Phase 1 — Design System Foundation

### Purpose

Establish the complete token system that all subsequent migration phases depend on. No other phase can produce correct, maintainable output without this foundation. Tokens are the single source of truth for every visual value in the system.

This phase produces no visible UI change. Its output is consumed by every subsequent phase.

### Tasks

**Task 1.1 — Audit Existing Token Declarations**
Review `theme.html` and identify all CSS custom properties currently defined. Map them against the token taxonomy defined in `STYLING_ARCHITECTURE.md`. Identify which tokens exist, which are missing, and which are defined but never consumed.

**Task 1.2 — Define Color Tokens**
Create `src/ui/styles/tokens/colors.css`. Define all color tokens required by the pattern registry. This includes:

- Primary color scale (`--color-primary`, `--color-primary-hover`, `--color-primary-subtle`)
- Semantic feedback colors (`--color-success`, `--color-warning`, `--color-danger`, `--color-info` and their `-subtle` variants)
- Surface colors (`--color-bg-surface`, `--color-bg-card`, `--color-bg-subtle`)
- Border colors (`--color-border-default`, `--color-border-subtle`)
- Text colors (`--color-text-primary`, `--color-text-secondary`, `--color-text-disabled`)
- Overlay colors (`--color-overlay`, `--color-overlay-light`)
- Sidebar colors (`--color-sidebar-bg`, `--color-sidebar-text`, `--color-sidebar-hover`, `--color-sidebar-active`)

All values must be sourced from the audit's documented existing colors. No new colors are introduced in this phase — the goal is to name and centralize, not redesign.

**Task 1.3 — Define Spacing Tokens**
Create `src/ui/styles/tokens/spacing.css`. Define the spacing scale `--space-1` through `--space-8` (4px increments). Map against the audit-identified spacing values to ensure the scale covers all currently used values.

**Task 1.4 — Define Typography Tokens**
Create `src/ui/styles/tokens/typography.css`. Define:

- Font size scale: `--text-xs` through `--text-xl`
- Font weight tokens: `--font-weight-normal`, `--font-weight-medium`, `--font-weight-bold`
- Line height tokens: `--leading-tight`, `--leading-normal`, `--leading-relaxed`

**Task 1.5 — Define Radius Tokens**
Create `src/ui/styles/tokens/radius.css`. Define `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`.

**Task 1.6 — Define Shadow Tokens**
Create `src/ui/styles/tokens/shadows.css`. Define `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`.

**Task 1.7 — Define Z-Index Tokens**
Create `src/ui/styles/tokens/zindex.css`. Define the complete z-index stack: `--z-base`, `--z-sticky`, `--z-topbar`, `--z-sidebar`, `--z-dropdown`, `--z-modal`, `--z-toast`.

**Task 1.8 — Define Breakpoint Tokens**
Create `src/ui/styles/tokens/breakpoints.css`. Define `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`, `--bp-wide: 1280px`. These values already exist in `theme.html` but are consumed by nothing — this task moves them to a canonical location.

**Task 1.9 — Define Animation Tokens**
Create `src/ui/styles/tokens/animations.css`. Define `--transition-fast` (150ms), `--transition-normal` (250ms), `--transition-slow` (400ms). Sourced from the audit's identified animation durations (modal: 200ms, toast: 300ms — normalized to system scale).

**Task 1.10 — Define Layout Tokens**
Create `src/ui/styles/tokens/layout.css`. Add `--topbar-height` and `--pos-cart-width`. These are referenced by the shell and POS layout calculations per the responsive contracts.

**Task 1.11 — Wire Tokens to `stylesLoader.html`**
Update `src/ui/styles/stylesLoader.html` to include all token files via `<?!= HtmlService.createHtmlOutputFromFile() ?>`. The include order must match the token dependency order: colors → spacing → typography → radius → shadows → zindex → breakpoints → animations → layout.

**Task 1.12 — Remove Duplicate Token Definitions from `theme.html`**
After the token files are established and `stylesLoader.html` includes them, remove the CSS custom property definitions from `theme.html`. The `theme.html` file's token content is now superseded by the token layer. Retain any non-token content in `theme.html` (animations, box-sizing, body defaults) — those will be migrated in Phase 2.

### Dependencies

- No prior migration phase required.
- The audit document (`UI_AUDIT.md`) must be available to source existing color and spacing values.

### Migration Order

Tasks 1.1 → 1.2 through 1.10 (parallelizable after 1.1) → 1.11 → 1.12

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Token value chosen doesn't match existing rendered value | Medium | Medium | Source values directly from audit-documented hex values, not from memory |
| Breakpoint tokens defined but still not consumed (repeating current failure) | High | High | Phase 3 explicitly wires breakpoint tokens to all consuming layers — this phase only defines them |
| `theme.html` removal breaks pages that import it | Medium | High | Audit all import chains before Task 1.12; do not remove until imports are redirected |

### Validation Requirements

- All token files exist in `src/ui/styles/tokens/` directory.
- All tokens referenced in `RESPONSIVE_PATTERNS.md` Appendix B are defined.
- All tokens referenced in the `UI_PATTERN_REGISTRY.md` cross-reference table are defined.
- `stylesLoader.html` includes all token files via `<?!= HtmlService.createHtmlOutputFromFile() ?>`.
- No page visual appearance has changed (this phase produces zero visible change).

### Completion Criteria

All token files are created, all values are sourced from the audit, `stylesLoader.html` includes are established, and `theme.html` duplicate token definitions are removed. The token system is the single source of truth for all design values.

---

## Phase 2 — Base Layer & Active Duplication Elimination

### Purpose

Establish global base styles and immediately eliminate the three active duplication problems identified in the audit as highest-risk divergence points: the modal CSS duplication, the receipt display duplication, and the cart item row duplication. These three issues are actively accumulating divergence with each feature change and must be resolved before any component work begins.

### Tasks

**Task 2.1 — Create `src/ui/styles/base/reset.css`**
Implement CSS reset: `box-sizing: border-box`, margin/padding normalization, `inherit` for font properties on form elements, and `display: block` on media elements.

**Task 2.2 — Create `src/ui/styles/base/globals.css`**
Implement global body styles using tokens: `background-color`, `color`, `font-family`, `font-size`, `line-height`. Apply global scrollbar styling. Establish the `sr-only` accessibility helper class.

**Task 2.3 — Create `src/ui/styles/base/animations.css`**
Define global keyframe animations: `@keyframes fadeIn`, `@keyframes slideUp`, `@keyframes slideInLeft`, `@keyframes spin`. Use `--transition-*` tokens for durations.

**Task 2.4 — Resolve Modal CSS Duplication**
The modal service contains a static `<style>` block and a runtime-injected `ensureStyles()` block that are verbatim duplicates of approximately 130 lines.

- Audit both blocks to confirm they are identical.
- Move the unified CSS to `src/ui/styles/components/modals.css`.
- Remove the static `<style>` block from the modal service HTML template.
- Remove the `ensureStyles()` function entirely.
- Verify modal renders identically after removal.

**Task 2.5 — Resolve Receipt Display Duplication**
`sales.html` and `sales.modal.html` each contain an independent receipt display implementation with different class names but identical layout logic.

- Audit both implementations. Document every class name difference.
- Define a single receipt display structure using canonical class names from pattern P-06.
- Update both files to use the canonical structure.
- Delete both old implementations.

**Task 2.6 — Resolve Cart Item Row Duplication**
`CartTable.render()` in `pos.html` and `CartItemRow.render()` in `cartItemRow.html` both generate cart item row HTML.

- Audit which rendering path is active in the current POS flow.
- Confirm the inactive path produces no visible output.
- Delete the inactive implementation.

**Task 2.7 — Implement `.hidden` Utility Class**
Create `src/ui/styles/utilities/visibility.css`. Define `.hidden { display: none !important; }` — the single, system-wide visibility suppression class.

**Task 2.8 — Wire Base Layer Includes to `stylesLoader.html`**
Add base layer includes to `stylesLoader.html` after the token block. Use `<?!= HtmlService.createHtmlOutputFromFile() ?>` for each file. Include order: `base/reset.css` → `base/globals.css` → `base/animations.css`.

**Task 2.9 — Migrate Non-Token Content from `theme.html` to Base Files**
Move the following from `theme.html` to the appropriate base files:
- `* { box-sizing: border-box; }` → `base/reset.css`
- `body { font-family: ...; margin: 0; padding: 0; }` → `base/globals.css`
- `@keyframes slideIn`, `@keyframes slideOut` → `base/animations.css`

After migration, remove these rules from `theme.html`. The file may be deleted or reduced to a documentation stub.

### Dependencies

- Phase 1 must be complete. Base styles must reference tokens.
- Audit document must be available for the duplication resolution tasks.

### Migration Order

2.1 → 2.2 → 2.3 (parallelizable) → 2.7 → 2.4 → 2.5 → 2.6 → 2.8 → 2.9

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Modal CSS duplication is not truly identical — subtle differences exist | Medium | High | Diff both blocks explicitly before deleting either; treat differences as bugs to resolve |
| Removing `ensureStyles()` breaks modal rendering in an edge case | Low | High | Test modal open/close sequence in full after removal |
| Deleting the wrong cart item row implementation | Medium | Critical | Trace the active render path in code before deletion |
| Receipt display unification breaks sales or sales modal rendering | Medium | Medium | Test both receipt views end-to-end after task 2.5 |

### Validation Requirements

- No CSS is injected via JavaScript `<style>` blocks at runtime.
- Modal renders correctly in all usage contexts after `ensureStyles()` removal.
- Receipt renders identically in `sales.html` and `sales.modal.html`.
- Cart item rows render correctly in the POS cart.
- `.hidden` class is available and suppresses display when applied.
- No visible UI regression on any page.

### Completion Criteria

Base layer files exist. Three active duplications are resolved. `.hidden` utility is available. `stylesLoader.html` includes are updated. Non-token content from `theme.html` is migrated.

---

## Phase 3 — Utility System & Responsive Foundation

### Purpose

Build the complete utility layer and wire breakpoint tokens to all consuming layers. This phase eliminates the systemic breakpoint inconsistency identified in the audit (the `767px` vs `768px` vs hardcoded JS `768` problem) and provides the responsive utility classes that all component and page migrations depend on.

### Tasks

**Task 3.1 — Create `src/ui/styles/utilities/flex.css`**
Define flex utilities: `.flex`, `.flex-col`, `.flex-row`, `.items-center`, `.items-start`, `.items-end`, `.justify-between`, `.justify-center`, `.justify-end`, `.flex-wrap`, `.flex-1`, `.flex-shrink-0`.

**Task 3.2 — Create `src/ui/styles/utilities/layout.css`**
Define layout utilities: `.w-full`, `.h-full`, `.min-h-screen`, `.block`, `.inline-block`, `.relative`, `.absolute`, `.fixed`, `.sticky`, `.overflow-hidden`, `.overflow-auto`, `.overflow-x-hidden`.

**Task 3.3 — Create `src/ui/styles/utilities/spacing.css`**
Define spacing utilities using token scale: `.gap-1` through `.gap-6`, `.p-1` through `.p-6`, `.px-*`, `.py-*`, `.m-auto`. All values must reference spacing tokens.

**Task 3.4 — Create `src/ui/styles/utilities/typography.css`**
Define typography utilities: `.text-xs` through `.text-xl`, `.font-medium`, `.font-bold`, `.text-left`, `.text-center`, `.text-right`, `.truncate`, `.line-clamp-1`, `.line-clamp-2`, `.break-words`.

**Task 3.5 — Expand `src/ui/styles/utilities/visibility.css`**
Add responsive visibility utilities: `.hidden-mobile`, `.hidden-tablet`, `.visible-mobile-only`, `.visible-tablet-only`. All breakpoints must reference `--bp-tablet` and `--bp-desktop` tokens.

**Task 3.6 — Create `src/ui/styles/utilities/responsive.css`**
Define responsive display utilities: `.flex-desktop`, `.block-mobile`, `.flex-mobile`.

**Task 3.7 — Unify the Breakpoint Value**
Three locations must be updated to a single canonical value:

- POS page `max-width: 767px` media query → migrate to `min-width` using `--bp-tablet`.
- Modal service `768px` media query → reference `--bp-tablet` token.
- UI service `MOBILE_BREAKPOINT = 768` JavaScript constant → document as a token bridge that must stay synchronized with `--bp-tablet`. Update value to `768` and add a comment flagging it as a CSS token mirror.

**Task 3.8 — Rewrite POS Responsive Rules to Mobile-First**
The POS page currently uses `max-width: 767px`. All POS media queries must be rewritten to `min-width` patterns referencing `--bp-tablet` and `--bp-desktop`. This task rewrites media query direction only — not POS CSS values or component structure.

**Task 3.9 — Wire Utility Layer Includes to `stylesLoader.html`**
Add utility layer includes after base includes. Use `<?!= HtmlService.createHtmlOutputFromFile() ?>` for each file. Include order: `utilities/flex.css` → `utilities/layout.css` → `utilities/spacing.css` → `utilities/typography.css` → `utilities/visibility.css` → `utilities/responsive.css`.

### Dependencies

- Phase 1 (tokens) must be complete.
- Phase 2 (base + `.hidden`) must be complete.

### Migration Order

3.1–3.6 (parallelizable) → 3.7 → 3.8 → 3.9

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Rewriting POS `max-width` to `min-width` alters visual rendering at breakpoint | Medium | High | Compare before/after at exactly 768px — visual result should be identical |
| JS `MOBILE_BREAKPOINT` constant becomes inconsistent if CSS token changes later | High (long-term) | Medium | Document the bridge explicitly; treat as a known debt item with a clear owner |
| Utility class names conflict with existing Tailwind class names on CRUD pages | High | Medium | Audit class name collisions before Task 3.9; prefix utilities if needed |

### Validation Requirements

- All utility files exist and are included in `stylesLoader.html`.
- `min-width` used exclusively in all new and rewritten media queries.
- POS responsive behavior is visually identical to pre-migration at all breakpoints.
- Breakpoint value `767px` no longer appears anywhere in the codebase.
- `.hidden-mobile` utility correctly hides elements below 768px.

### Completion Criteria

Full utility library exists. Breakpoint system is unified. POS media queries are mobile-first. All utilities included in `stylesLoader.html`.

---

## Phase 4 — App Shell Migration

### Purpose

Migrate the app shell — sidebar, topbar, and main content layout — to the new architecture. This is the structural skeleton wrapping every page. The audit's most critical shell problem is the dual DOM structure in `renderAppShell()` which renders two conditional branches. The target is a single DOM structure with CSS-driven responsive behavior.

### Tasks

**Task 4.1 — Create `src/ui/styles/layout/app-shell.css`**
Define the root layout shell using flexbox. Define the content area offset for the sidebar at `--bp-desktop`. All values reference tokens.

**Task 4.2 — Create `src/ui/styles/layout/sidebar.css`**
Define the sidebar in its two states:

- Desktop: fixed, 256px, full height, `--z-sidebar`.
- Mobile/Tablet: off-screen via `transform: translateX(-100%)`, overlay mode, animated open state via `.sidebar--open` modifier class, semi-transparent backdrop.

Single DOM element. `.sidebar--open` class controls open state. No duplicate DOM branches.

**Task 4.3 — Create `src/ui/styles/layout/topbar.css`**
Define the topbar: fixed to top, full width of main area, `--topbar-height`, `--z-topbar`. Hamburger toggle button: visible below `--bp-desktop`, hidden above.

**Task 4.4 — Create `src/ui/styles/layout/containers.css`**
Define the page content area: padding rules per responsive tier (per `RESPONSIVE_PATTERNS.md` Section 6), `overflow-x: hidden`, content offset by `--topbar-height`.

**Task 4.5 — Collapse the Dual DOM Structure in `renderAppShell()`**
Refactor `src/ui/app/app.html` to render a single unified DOM structure. Remove conditional mobile/desktop branch. JavaScript is responsible only for:

- Toggle button click → add/remove `.sidebar--open`.
- Overlay click → remove `.sidebar--open`.
- Escape key → remove `.sidebar--open`.
- Route change → remove `.sidebar--open`.

**Task 4.6 — Implement Active Nav State**
Define `.nav-item--active` modifier class. Update the routing layer to apply it to the current page's nav item by comparing against `State.currentPage`.

**Task 4.7 — Add Sidebar Accessibility Attributes**
Add `aria-expanded` to the hamburger toggle. Add `aria-controls` linking to the sidebar. Implement focus trap within open drawer. Return focus to toggle on close.

**Task 4.8 — Wire Layout Layer Includes to `stylesLoader.html`**
Add layout layer includes after utility includes. Use `<?!= HtmlService.createHtmlOutputFromFile() ?>` for each file. Include order: `layout/app-shell.css` → `layout/sidebar.css` → `layout/topbar.css` → `layout/containers.css`.

**Task 4.9 — Migrate Content from `responsive.html` to Layout Files**  
Move the following from `responsive.html` to the appropriate layout files:
- `.layout--desktop`, `.layout--mobile`, `.layout__main`, `.layout__content` → `layout/app-shell.css`
- `.sidebar--desktop`, `.sidebar--mobile`, `.sidebar-overlay`, `.sidebar__*` → `layout/sidebar.css`
- `.topbar`, `.topbar__*` → `layout/topbar.css`
- `.grid-responsive` → `layout/containers.css`
- `.toast-container` → `components/toast.css` (Phase 5)
- `.modal-content`, `.modal-sm`, `.modal-md`, `.modal-lg` → `components/modals.css` (Phase 5)

After migration, remove these rules from `responsive.html`. The file may be deleted or reduced to a documentation stub.

### Dependencies

- Phase 1 (tokens) — layout uses `--topbar-height`, `--z-*`, `--bp-*`, `--color-sidebar-*`.
- Phase 2 (base) — `box-sizing` reset must be in place before layout math is reliable.
- Phase 3 (utilities) — layout composes responsive utilities.

### Migration Order

4.1 → 4.2 → 4.3 → 4.4 (parallelizable after 4.1) → 4.5 → 4.6 → 4.7 → 4.8 → 4.9

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Collapsing dual DOM structure breaks page routing or state management | Medium | Critical | Audit all JS references to sidebar and topbar DOM elements before Task 4.5 |
| Active nav state logic breaks on route changes | Medium | Medium | Test all navigation routes after Task 4.6 |
| Sidebar CSS transition creates layout reflow on open | Low | Medium | Confirm sidebar is `position: fixed` — must not affect document flow |

### Validation Requirements

- Sidebar renders identically on desktop across all pages.
- Sidebar drawer opens and closes correctly on mobile and tablet.
- Overlay dismisses the drawer when tapped.
- Active nav item is highlighted on every page.
- No horizontal overflow introduced by the shell layout.
- Layout verified at 375px, 768px, and 1280px.

### Completion Criteria

Single DOM app shell structure. CSS-driven sidebar responsive behavior. Active nav state implemented. Accessibility attributes applied. All layout files included in `stylesLoader.html`. Content from `responsive.html` migrated.

---

## Phase 5 — Shared Component Migration

### Purpose

Build the complete shared component library, migrating each pattern from `UI_PATTERN_REGISTRY.md` to its canonical implementation in the component layer. This phase replaces all duplicated component definitions across CRUD pages, modal service, table service, and POS with a single authoritative source per component.

### Tasks

**Task 5.1 — Migrate Button Component (B-01 through B-05)**
Create `src/ui/styles/components/buttons.css`. Define all button variants using tokens. Remove independent button definitions from: modal service CSS, CRUD Tailwind strings, POS-specific button classes. Apply canonical button classes to all existing button elements.

**Task 5.2 — Migrate Form Component (F-01, F-02)**
Create `src/ui/styles/components/forms.css`. Define base input, select, textarea, label, and form group classes. Remove per-modal repeated input styling from all entity modal templates. Apply canonical form classes to all modal forms.

**Task 5.3 — Migrate Card Component (C-01, C-02)**
Create `src/ui/styles/components/cards.css`. Define page header and content card wrapper. Remove the six-way duplication of page header HTML from all CRUD pages.

**Task 5.4 — Migrate Modal Component (M-01, M-02)**
Update `src/ui/styles/components/modals.css` (established in Phase 2). Apply token references to all modal CSS values. Define `.modal--fullscreen` (mobile) and `.modal--centered` (desktop) states per `RESPONSIVE_PATTERNS.md` Section 10.

**Task 5.5 — Migrate Toast Component (NT-01)**
Create `src/ui/styles/components/toast.css`. Move all visual toast styling from JavaScript `style.cssText` assignments into the CSS file. Refactor the toast service to add/remove CSS classes rather than set inline styles.

**Task 5.6 — Migrate Table Component (T-01, T-02)**
Create `src/ui/styles/components/tables.css`. Define standard table styles and the complete mobile card transformation per `RESPONSIVE_PATTERNS.md` Section 8.1. Add `data-label` attributes to all `<td>` elements in all CRUD table templates.

**Task 5.7 — Migrate Status Badge (C-06)**
Define badge component. Replace all Tailwind color utility strings used for status display with the canonical badge component.

**Task 5.8 — Migrate Empty State (C-03)**
Define the empty state pattern. Apply to all tables and lists that currently show no empty state feedback.

**Task 5.9 — Migrate Loading Overlay (C-04)**
Define `.loading-overlay` with `.overlay--absolute` and `.overlay--fixed` variants. Replace the POS payment loading overlay's inline `display: flex` toggle with class-based activation.

**Task 5.10 — Migrate Filter Bar (S-01)**
Add filter bar to `src/ui/styles/components/forms.css`. Define layout at all responsive tiers. Apply to all CRUD pages.

**Task 5.11 — Migrate Dropdown / Search (S-02)**
Create `src/ui/styles/components/dropdowns.css`. Define search input with dropdown. Apply to POS product search.

**Task 5.12 — Wire Component Layer Includes to `stylesLoader.html`**
Add component layer includes after layout includes. Use `<?!= HtmlService.createHtmlOutputFromFile() ?>` for each file. Include order: `components/buttons.css` → `components/forms.css` → `components/cards.css` → `components/modals.css` → `components/toast.css` → `components/tables.css` → `components/dropdowns.css`.

### Migration Order Within Phase 5

```
5.1 (Buttons) → 5.2 (Forms) → 5.3 (Cards) → 5.4 (Modal) → 5.5 (Toast)
                                            → 5.6 (Table) → 5.7 (Badge) → 5.8 (Empty State)
                                                          → 5.9 (Loading)
                            → 5.10 (Filter Bar) → 5.11 (Dropdown)
→ 5.12 (Includes)
```

Buttons and Forms must be complete before Modals. Cards must be complete before Tables. Toast is independent.

### Dependencies

- Phases 1, 2, 3, 4 must be complete.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Toast refactor breaks notification delivery in a timing edge case | Medium | High | Test toast trigger from every user action that fires a toast |
| Table card transformation breaks table service pagination or sorting | Medium | Medium | Test full table lifecycle after 5.6 |
| Button migration changes element dimensions and breaks touch targets | Low | Medium | Measure button heights against 44px minimum after migration |

### Validation Requirements

- Every component renders correctly at all three breakpoints.
- No component CSS contains a hardcoded color, spacing value, or breakpoint.
- No inline styles remain on any component element.
- Toast notifications appear and dismiss correctly for all trigger types.
- Table card transformation renders correctly on mobile.
- Modal opens and closes correctly for all entity types.
- POS checkout flow is unbroken (Safety Rule 3).

### Completion Criteria

All registry patterns implemented in the component layer. All duplicated component definitions from service files and CRUD templates removed. No raw CSS values in any component file. All components included in `stylesLoader.html`.

---

## Phase 6 — CRUD Page Migration

### Purpose

Migrate all six CRUD management pages to use the shared component and utility library. These pages currently contain inline Tailwind utility strings, no responsive behavior, and duplicated layout structures.

### Pages

`categories.html`, `units.html`, `products.html`, `sales.html`, `stockMovements.html`, `settings.html`

### Per-Page Task Sequence

Each page follows the same migration sequence:

1. Replace page header HTML with canonical C-01 component.
2. Replace content card wrapper with canonical C-02 component.
3. Apply T-01 table classes. Add `data-label` attributes to all `<td>` elements.
4. Apply canonical button classes (B-01, B-02, B-03) to all action buttons.
5. Apply S-01 filter bar component.
6. Update entity modal templates to use M-01 modal, F-01/F-02 form, and B-01 submit button.
7. Replace inline Tailwind status strings with C-06 badge component.
8. Delete all remaining per-page `<style>` blocks.
9. Validate responsive behavior at 375px, 768px, 1280px.

### Page Migration Order

```
categories.html → units.html → products.html → stockMovements.html → sales.html → settings.html
```

Simpler pages first to validate the migration pattern before applying it to more complex pages. `sales.html` receipt display was resolved in Phase 2.

### Additional Tasks

**Task 6.7 — Create `src/ui/styles/pages/` CSS Files for Residual Composition**
If any page requires composition rules not expressible through utilities or components, create a minimal `src/ui/styles/pages/[page].css`. This file may only define page-specific layout composition — never tokens, component styles, or breakpoint rules.

**Task 6.8 — Wire Page Layer Includes to `stylesLoader.html`**
Add page layer includes after component includes. Use `<?!= HtmlService.createHtmlOutputFromFile() ?>` for each file. Include order: `pages/dashboard.css` → `pages/products.css` → `pages/categories.css` → `pages/sales.css` → `pages/stock.css` → `pages/pos.css`.

**Task 6.9 — Verify CRUD Responsive Behavior**
After component migration, verify that components provide sufficient responsive behavior (table card transformation, modal fullscreen, form stacking). Add page-level composition adjustments only for gaps.

### Dependencies

- Phase 5 (all shared components) must be complete before any CRUD page is migrated.
- Phase 4 (app shell) must be complete.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CRUD entity controllers reference DOM elements by class names that change during migration | High | Medium | Audit all `querySelector` calls in each entity controller before migrating that page |
| Removing `<style>` blocks reveals styles that were page-global and affect other components | Medium | Medium | Search each class name across the full codebase before deleting |
| Product page modal has complexity not covered by base form component | Medium | Low | Extend F-01 if needed; do not introduce page-specific form CSS |

### Validation Requirements

- All six CRUD pages render correctly at mobile, tablet, and desktop.
- All six pages have zero embedded `<style>` blocks.
- All six pages have zero inline style attributes.
- Table card transformation works on all pages with tables.
- All modals are fullscreen on mobile.
- Entity CRUD operations function correctly on all pages.

### Completion Criteria

All six CRUD pages use canonical components. All page-level `<style>` blocks removed. All pages responsive per `RESPONSIVE_PATTERNS.md`. Page CSS files included in `stylesLoader.html`.

---

## Phase 7 — POS Migration

### Purpose

Migrate the POS page — the most complex and highest-stakes interface in the application. By this phase, all components the POS depends on are complete and validated. This phase replaces extensive inline style usage, hardcoded values, and duplicated component definitions with the shared library and layout system.

### Tasks

**Task 7.1 — Migrate Product Grid (P-01)**
Create `src/ui/styles/pages/pos.css`. Define POS-specific layout: product panel + cart panel split, responsive collapse. Apply grid column contracts from `RESPONSIVE_PATTERNS.md` Section 4.1.

**Task 7.2 — Namespace POS CSS**
Rename all POS-specific classes with a `.pos-` prefix (`.spinner` → `.pos-spinner`, `.product-card` → `.pos-product-card`, etc.). Update all HTML template references and all JavaScript class references simultaneously.

**Task 7.3 — Eliminate All POS Inline Styles**
Replace all 15+ `style="display:none"`, `style="display:block"`, `style="display:flex"` declarations with `.hidden` class toggling. Update all JavaScript that sets `element.style.display` to use `classList.add/remove('hidden')`. Affected elements: `#search-results`, `#cart-items-list`, `#change-row`, `#change-display`, `#credit-section`, `#credit-balance`, `#payment-loading-overlay`.

**Task 7.4 — Migrate Cart Item Row (P-02)**
Apply canonical P-02 styles to the active cart item row implementation. Ensure quantity +/- buttons meet 44px touch target minimum.

**Task 7.5 — Migrate Checkout / Totals Panel (P-03)**
Apply canonical P-03 styles. Implement sticky positioning per `RESPONSIVE_PATTERNS.md` Section 11.4. Verify sticky behavior in both desktop cart panel and mobile cart drawer.

**Task 7.6 — Implement Cart Drawer (Mobile)**
Implement mobile cart drawer behavior per `RESPONSIVE_PATTERNS.md` Sections 11.2 and 11.3. Add the cart summary bar (fixed bottom bar with item count and total). Wire show/hide state to class toggling — no inline styles.

**Task 7.7 — Migrate Payment Method Selector (P-04)**
Apply canonical P-04 styles. Implement responsive behavior: stacked on mobile, horizontal row on desktop.

**Task 7.8 — Migrate Payment Amount Input (P-05)**
Apply canonical P-05 styles. Enforce `--text-xl` minimum font size on mobile numeric input.

**Task 7.9 — Fix Payment Modal Mobile Overflow**
This is an active high-priority bug (audit finding). Apply fullscreen modal behavior per `RESPONSIVE_PATTERNS.md` Section 10.1. Enable scroll within modal content area.

**Task 7.10 — Migrate Receipt Display (P-06)**
Apply canonical P-06 styles (unified in Phase 2). Add print media styles for receipt rendering.

**Task 7.11 — Confirm Loading Overlay Migration**
Confirm class-based activation from Task 5.9 is applied to the POS payment loading overlay context.

**Task 7.12 — Migrate Product Search (S-02)**
Apply canonical dropdown search component from Phase 5. Add debounce to the search input event handler.

**Task 7.13 — Convert All POS CSS to Token References**
Audit `pos.html`'s `<style>` block for all remaining hardcoded values. Replace every raw color, spacing, and typography value with the corresponding token.

**Task 7.14 — Remove POS `<style>` Block**
Delete the POS page's embedded `<style>` block entirely. All styles are now in the component and layout layers.

**Task 7.15 — Full POS Regression Test**
Execute the complete POS user flow: product browse → search → add to cart → adjust quantity → remove item → apply credit → checkout → payment (cash and credit) → receipt display → new sale. Test at 375px, 768px, and 1280px.

### Migration Order Within Phase 7

```
7.2 (Namespace) → 7.3 (Inline elimination) → 7.1 (Product grid) → 7.4 (Cart row)
→ 7.5 (Totals) → 7.6 (Cart drawer) → 7.7 (Payment method) → 7.8 (Payment input)
→ 7.9 (Payment modal overflow) → 7.10 (Receipt) → 7.11 (Loading overlay)
→ 7.12 (Product search) → 7.13 (Token audit) → 7.14 (Remove style block)
→ 7.15 (Full regression test)
```

Namespacing (7.2) and inline style elimination (7.3) must be first. Regression test (7.15) must be last.

### Dependencies

- Phase 5 (all shared components) must be complete.
- Phase 6 (CRUD page migration) must be complete — shared component stability must be confirmed across all CRUD pages before POS touches them.
- Phase 2 — cart item row and receipt display must be unified.
- Phase 3 — POS breakpoints must already be mobile-first.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Inline style elimination breaks POS visibility state in an edge case | High | Critical | Map every inline-styled element to its controlling JavaScript before beginning Task 7.3 |
| CSS class namespacing breaks JavaScript event handlers referencing old class names | High | High | Search entire `pos.html` JavaScript for every class string reference before Task 7.2 |
| Cart drawer behavior on mobile is incorrect on first implementation | Medium | High | Test drawer open/close/dismiss cycle exhaustively after Task 7.6 |
| Payment modal overflow fix breaks desktop centered modal layout | Medium | Medium | Test payment modal at all three breakpoints after Task 7.9 |

### Validation Requirements

- Complete POS checkout flow works at all three breakpoints.
- No inline styles remain on any POS element.
- No hardcoded values remain in any POS CSS.
- POS `<style>` block is deleted.
- Quantity control touch targets measure at least 44px.
- Payment modal is scrollable on mobile without viewport overflow.
- Cart drawer opens and dismisses correctly on mobile and tablet.
- Product search debounces correctly.
- Receipt renders correctly on screen and in print preview.

### Completion Criteria

Full POS migration complete. All inline styles replaced with class-based state. All CSS in component and layout layers. POS regression test passes at all breakpoints.

---

## Phase 8 — Cleanup & Legacy Removal

### Purpose

Remove all remaining legacy code, dead files, and residual technical debt that does not belong in the target architecture. This phase has no functional changes — the system already works correctly. It removes the old structure.

### Tasks

**Task 8.1 — Remove Dead `modal.html` File**
Delete the legacy `src/ui/components/modal.html` file that contains only a comment.

**Task 8.2 — Remove Tailwind CDN Dependency**
Audit for any remaining Tailwind class usage. Remove the CDN `<script>` tag from `src/ui/app/index.html` if no remaining usage exists.

**Task 8.3 — Remove Residual `theme.html` Content**
Audit for any remaining content. Remove or convert to a documentation stub.

**Task 8.4 — Remove `responsive.html`**
Audit for remaining content. Remove if the new responsive system has fully superseded it.

**Task 8.5 — Replace Emoji Navigation Icons with SVG**
Replace sidebar emoji icons with inline SVGs with `aria-hidden="true"`. Sourced from a defined icon registry.

**Task 8.6 — Remove Duplicate `CheckoutService.calculateChange()`**
Remove the duplicate logic from `CheckoutService`. Verify the correct `PricingService` method is called in all checkout paths.

**Task 8.7 — Remove `_showReceipt()` / `_showReceiptModal()` Duplication**
Determine the active method in `CheckoutService`. Remove the inactive one.

**Task 8.8 — Conduct Final Token Audit**
Search the entire codebase for raw hex values, raw `px` spacing values, and raw breakpoint values in CSS files. Each finding is a migration gap requiring resolution.

**Task 8.9 — Conduct Final Inline Style Audit**
Search the entire codebase for `style="` attributes in HTML and `element.style.` assignments in JavaScript. Each finding is a migration gap.

**Task 8.10 — Conduct Final Duplication Audit**
Review the component layer for any remaining duplicate definitions — class names defined in more than one file for the same visual purpose.

**Task 8.11 — Update `stylesLoader.html` Include Audit**
Verify the `stylesLoader.html` include order is correct and complete: tokens → base → utilities → layout → components → pages.

**Task 8.12 — Full System Regression Test**
Execute a full regression test across all pages and user flows at 375px, 768px, and 1280px:

- Dashboard: stat cards, charts, recent tables.
- All CRUD pages: browse, create, edit, delete, search, paginate.
- POS: full checkout flow, payment types, receipt, new sale.
- Navigation: all routes, active state, mobile drawer.

### Dependencies

- Phases 1 through 7 must be complete.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Removing Tailwind CDN reveals missed Tailwind classes not yet migrated | Medium | Medium | Audit Tailwind class usage exhaustively before removing CDN (Task 8.2) |
| Removing `responsive.html` or `theme.html` removes a file still imported somewhere | Medium | High | Search all `HtmlService.createHtmlOutputFromFile()` calls before deletion |
| Token audit reveals significant migration gaps requiring rework of earlier phases | Low | High | Run partial token audits at the end of each preceding phase to catch gaps early |

### Validation Requirements

- Zero raw hex color values in any CSS file.
- Zero raw pixel spacing values in any CSS file (except within token definitions).
- Zero hardcoded breakpoint pixel values in any CSS file (except within token definitions).
- Zero inline `style=""` attributes in any HTML template.
- Zero `element.style.` property assignments in any JavaScript file.
- Zero dead files in the project.
- All pages pass visual regression at three breakpoints.

### Completion Criteria

The codebase contains no legacy CSS, no inline styles, no hardcoded values, no dead files, and no duplicated implementations. The architecture matches the vision defined in `STYLING_ARCHITECTURE.md` in every layer.

---

## Appendix A — Phase Dependency Graph

```
Phase 1 — Design System Foundation
    │
    ▼
Phase 2 — Base Layer & Active Duplication Elimination
    │
    ▼
Phase 3 — Utility System & Responsive Foundation
    │
    ▼
Phase 4 — App Shell Migration
    │
    ▼
Phase 5 — Shared Component Migration
    │
    ▼
Phase 6 — CRUD Page Migration
    │
    ▼
Phase 7 — POS Migration
    │
    ▼
Phase 8 — Cleanup & Legacy Removal
```

Each phase is a hard prerequisite for the next. No phase may begin until the previous phase's completion criteria are met.

---

## Appendix B — Migration Freeze Rules

These rules apply from the moment migration begins and do not expire until Phase 8 is complete.

| Rule | Applies To |
|------|-----------|
| No new inline styles | All HTML templates and JavaScript files |
| No new hardcoded colors | All CSS, HTML, and JavaScript files |
| No new hardcoded spacing values | All CSS files |
| No new max-width media queries | All CSS files |
| No new page-level responsive rules | All page-level CSS and `<style>` blocks |
| No new duplicated component implementations | All templates and service files |
| No new per-page `<style>` blocks | All HTML page templates |

Violations of freeze rules are blocking issues, not technical debt items.

---

## Appendix C — Regression Test Checklist

Use after every phase and as the final Phase 8 validation.

**Visual Regression**
- [ ] Dashboard renders at 375px, 768px, 1280px
- [ ] Categories page renders at 375px, 768px, 1280px
- [ ] Units page renders at 375px, 768px, 1280px
- [ ] Products page renders at 375px, 768px, 1280px
- [ ] Sales page renders at 375px, 768px, 1280px
- [ ] Stock Movements page renders at 375px, 768px, 1280px
- [ ] Settings page renders at 375px, 768px, 1280px
- [ ] POS page renders at 375px, 768px, 1280px

**Navigation**
- [ ] Sidebar opens and closes on mobile
- [ ] Sidebar overlay dismisses drawer
- [ ] Active nav item is highlighted on all pages
- [ ] Escape key closes mobile sidebar

**CRUD Operations**
- [ ] Create modal opens, submits, and closes on all entity types
- [ ] Edit modal opens pre-populated, submits, and closes on all entity types
- [ ] Delete confirmation modal opens and confirms on all entity types
- [ ] Toast notifications appear for create, edit, delete success and failure

**POS Flow**
- [ ] Products display and are searchable
- [ ] Product added to cart on card tap
- [ ] Cart quantity controls function
- [ ] Cart item removal functions
- [ ] Checkout opens payment modal
- [ ] Cash payment flow completes
- [ ] Credit payment flow completes
- [ ] Receipt displays after payment
- [ ] New sale resets cart

**Responsive Contracts**
- [ ] Table card transformation works on all CRUD pages at 375px
- [ ] Modal is fullscreen on mobile (375px)
- [ ] POS product grid is 2 columns at 375px, 4 columns at 1280px
- [ ] Cart is a drawer on mobile (375px) and a fixed panel on desktop (1280px)
- [ ] Payment modal is scrollable on mobile (375px)
- [ ] All interactive elements measure ≥ 44px height at 375px

---

## Appendix D — Phase Completion Summary

| Phase | Primary Output | Visible Change? | Regression Risk |
|-------|---------------|-----------------|-----------------|
| 1 — Design System Foundation | Token files | None | Low |
| 2 — Base Layer & Duplication Elimination | Base CSS, resolved duplications | Minor | Medium |
| 3 — Utility System & Responsive Foundation | Utility library, unified breakpoints | Minor | Medium |
| 4 — App Shell Migration | Single DOM shell, CSS sidebar | Visible | High |
| 5 — Shared Component Migration | Complete component library | Visible | High |
| 6 — CRUD Page Migration | All management pages migrated | Visible | Medium |
| 7 — POS Migration | POS fully migrated | Visible | Critical |
| 8 — Cleanup & Legacy Removal | Zero legacy code | None | Low |
