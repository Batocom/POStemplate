# CSS Architecture Audit

## Inline Styles

**Locations:**
- `src/ui/pages/sales.html` line 1: `<div id="salesModalContent" style="display:none;">`
- `src/ui/modules/sales/sales.modal.html` line 1: `<div id="salesModalContent" style="display:none;">`

**Issues:** Two separate files contain identical inline `style="display:none;"` on elements with the same ID `salesModalContent`. This creates a conflict where both elements exist in the DOM simultaneously, and the inline style prevents proper CSS-based show/hide control.

**Severity:** Medium - Duplicate IDs cause DOM ambiguity, and inline styles override any CSS-based display control.

---

## Duplicated CSS

**Locations:**
- `src/ui/pages/sales.html` lines 30-100: Complete receipt modal CSS styles
- `src/ui/modules/sales/sales.modal.html` lines 30-80: Similar modal CSS styles with different class names but identical patterns

**Issues:** The sales page contains its own `<style>` block for receipt modal styling, while the sales modal file contains a separate `<style>` block for the same modal. Both define:
- `.receipt-field` / `.detail-row` - identical flex justify-between patterns
- `.receipt-items-table` / `.modal-items-table` - identical table styling
- `.receipt-total-section` / `.modal-totals` - identical total section styling

**Severity:** High - CSS is duplicated across files with different class names for identical visual patterns, increasing maintenance burden and file size.

---

## Naming Inconsistencies

**Locations:**
- `src/ui/pages/sales.html`: Uses `.receipt-modal`, `.receipt-field`, `.receipt-label`, `.receipt-value`, `.receipt-items-table`, `.receipt-total-section`, `.receipt-total-row`, `.receipt-total-label`, `.receipt-total-value`, `.receipt-actions`
- `src/ui/modules/sales/sales.modal.html`: Uses `.sales-modal-inner`, `.sale-details`, `.detail-row`, `.detail-label`, `.detail-value`, `.modal-items-section`, `.section-title`, `.modal-items-table`, `.modal-totals`, `.total-row`, `.total-amount`

**Issues:** Two files styling the same modal use completely different naming conventions:
- Sales page uses `receipt-*` prefix (descriptive of purpose)
- Sales modal uses generic `detail-*`, `modal-*`, `total-*` prefixes (descriptive of location)
- No consistent BEM, SMACSS, or component-based naming convention across the codebase
- `src/ui/pages/settings.html` uses utility classes (`max-w-md`, `w-32`, `px-4`, `py-3`) mixed with semantic classes (`text-gray-500`, `font-bold`)

**Severity:** High - Inconsistent naming makes it difficult to understand component relationships and increases cognitive load for developers.

---

## Style Leakage Risks

**Locations:**
- `src/ui/pages/sales.html` lines 30-100: `<style>` block inside a template that may be injected into the DOM multiple times
- `src/ui/modules/sales/sales.modal.html` lines 30-80: `<style>` block inside a hidden div that may be rendered in the DOM

**Issues:**
- Styles defined in `<style>` blocks within templates or hidden divs will apply globally once the template is rendered
- No scoping mechanism (Shadow DOM, CSS modules, or unique parent class) to prevent style leakage
- `.receipt-items-table th` and `.modal-items-table th` selectors could affect other tables on the page if class names collide
- Generic class names like `.section-title`, `.total-row`, `.total-amount` could conflict with other components

**Severity:** High - Global style leakage can cause unexpected visual bugs when multiple components are rendered on the same page.

---

## Responsive Logic Duplication

**Locations:**
- `src/ui/pages/sales.html`: No responsive media queries present
- `src/ui/modules/sales/sales.modal.html`: No responsive media queries present
- `src/ui/pages/settings.html`: No responsive media queries present
- `src/ui/modules/categories/categories.modal.html`: No responsive media queries present
- `src/ui/modules/units/units.modal.html`: No responsive media queries present
- `src/ui/modules/products/products.modal.html`: No responsive media queries present

**Issues:** Zero responsive media queries exist across all provided files. Every component relies on fixed pixel values and flex layouts with no breakpoint handling. If responsive logic is added, it will need to be duplicated across every file.

**Severity:** Critical - Complete absence of responsive design patterns means the application is unusable on mobile devices, and any future responsive implementation will require significant duplication.

---

## High Specificity Problems

**Locations:**
- `src/ui/pages/sales.html` line 82: `.receipt-items-table th:not(:first-child)` - specificity (0,2,1)
- `src/ui/pages/sales.html` line 86: `.receipt-items-table td:not(:first-child)` - specificity (0,2,1)
- `src/ui/pages/sales.html` line 90: `.receipt-items-table td:not(:first-child)` - specificity (0,2,1)
- `src/ui/pages/settings.html` line 27: `#taxRateInput` - specificity (1,0,0) with ID selector

**Issues:**
- ID selector `#taxRateInput` creates high specificity that is difficult to override
- `:not(:first-child)` pseudo-class selectors add unnecessary specificity without clear benefit
- No low-specificity base styles that can be easily overridden by component-specific styles

**Severity:** Medium - High specificity makes it difficult to create theme overrides or component variants without using `!important`.

---

## Architectural Debt

**Locations:**
- `src/ui/pages/sales.html`: Contains both page template AND modal template AND modal styles in a single file
- `src/ui/modules/sales/sales.modal.html`: Duplicate modal content with different styling
- `src/ui/pages/settings.html`: Uses utility classes (`w-32`, `px-4`, `py-3`, `px-6`, `py-3`) inconsistently mixed with custom values
- All modal files: Use `p-3` (12px) consistently but with no responsive adjustment

**Issues:**
1. **Mixed Responsibilities**: `src/ui/pages/sales.html` contains page layout, modal template, and modal styles - violating separation of concerns
2. **Duplicate Modal Definitions**: The sales receipt modal is defined in two places (`sales.html` and `sales.modal.html`) with different class names and styles
3. **Inconsistent Utility Usage**: Settings page uses Tailwind-like utility classes (`w-32`, `px-4`, `py-3`) but other pages use custom CSS with fixed pixel values
4. **No CSS Custom Properties**: Zero CSS custom properties (variables) are used for colors, spacing, or typography - making theme changes require find-and-replace across all files
5. **No Typography Scale**: Font sizes are hardcoded (`0.9rem`, `1rem`, `1.1rem`, `1.4rem`) with no consistent typographic scale
6. **No Color System**: Colors are hardcoded (`#666`, `#333`, `#2563eb`, `#e0e0e0`, `#f0f0f0`, `#f8f9fa`) with no design token abstraction
7. **No Spacing Scale**: Padding and margin values are arbitrary (`4px`, `6px`, `8px`, `12px`, `16px`, `20px`) with no consistent spacing scale

**Severity:** Critical - The architectural debt makes the codebase difficult to maintain, theme, or extend without significant refactoring.
