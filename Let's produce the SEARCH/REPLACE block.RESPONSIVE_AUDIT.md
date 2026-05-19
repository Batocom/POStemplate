# Responsive Audit

## Fixed Width Problems

**Locations:**
- `src/ui/pages/sales.html` line 82: `.receipt-items-table th:not(:first-child)` and `td:not(:first-child)` use `text-align: right` without any min-width or responsive handling
- `src/ui/pages/sales.html` line 30: `.receipt-field` uses `display: flex; justify-content: space-between` which can cause label/value overlap on narrow screens
- `src/ui/pages/settings.html` line 27: Tax rate input has `w-32` (8rem/128px) fixed width
- `src/ui/modules/sales/sales.modal.html` line 47: `.modal-items-table th` and `td` have fixed padding `8px 12px` with no responsive adjustment

**Issue:** Fixed pixel widths and rigid flex layouts that don't adapt to smaller viewports.

**Impact:** On mobile devices, content will overflow, overlap, or become unreadable.

---

## Overflow Problems

**Locations:**
- `src/ui/pages/sales.html` line 82-83: `.receipt-items-table` has no `overflow-x` handling for horizontal scrolling
- `src/ui/modules/sales/sales.modal.html` line 47: `.modal-items-table` has no overflow handling
- `src/ui/pages/settings.html` line 27: Fixed-width input `w-32` may overflow its container on small screens

**Issue:** Tables and fixed-width elements lack overflow-x: auto or wrapping behavior.

**Impact:** Content will overflow viewport on screens narrower than table content width.

---

## Table Responsiveness

**Locations:**
- `src/ui/pages/sales.html` line 82-83: Receipt items table uses standard `<table>` with no responsive pattern (no card layout fallback, no horizontal scroll wrapper)
- `src/ui/modules/sales/sales.modal.html` line 47: Modal items table has same issue
- `src/ui/pages/settings.html` line 37: `.flex.justify-between.max-w-md` pattern for info rows - no responsive breakpoint for stacking

**Issue:** All tables use traditional table markup without responsive patterns (horizontal scroll, stacked cards, or column hiding).

**Impact:** Tables will be unusable on mobile devices due to horizontal overflow and tiny text.

---

## Modal Responsiveness

**Locations:**
- `src/ui/pages/sales.html` line 30: `.receipt-field` uses `justify-content: space-between` - labels and values will collide on narrow screens
- `src/ui/modules/sales/sales.modal.html` line 47: Modal content has no max-width or padding adjustments for mobile
- `src/ui/modules/categories/categories.modal.html`: Form inputs have `w-full` but no max-width constraint - may become too wide on desktop
- `src/ui/modules/units/units.modal.html`: Same issue as categories modal
- `src/ui/modules/products/products.modal.html`: Form has multiple inputs stacked vertically with no responsive grouping

**Issue:** Modal content assumes desktop-width viewport with no mobile adaptations.

**Impact:** On mobile, modal content will be cramped, labels/values will overlap, and forms will be difficult to use.

---

## Navigation Responsiveness

**Locations:**
- `src/ui/pages/sales.html` line 8: Header uses `flex items-center justify-between` with no wrapping behavior
- `src/ui/pages/units.html` line 8: Same header pattern
- `src/ui/pages/categories.html` line 8: Same header pattern
- `src/ui/pages/products.html` line 8: Same header pattern
- `src/ui/pages/settings.html` line 8: Same header pattern
- `src/ui/pages/stockMovements.html` line 8: Same header pattern

**Issue:** Page headers with title + button use flex without wrapping. On narrow screens, the button may be pushed off-screen or overlap the title.

**Impact:** On mobile, the "Add" or action buttons may be inaccessible or cause layout breaks.

---

## POS Responsiveness

**Locations:**
- `src/ui/pages/sales.html` line 82-83: Receipt modal has no responsive adjustments for POS context
- `src/ui/modules/sales/sales.modal.html` line 47: Sale detail modal has no mobile adaptations

**Issue:** Sales/POS-related modals and tables lack any mobile-specific layout handling.

**Impact:** POS operations on mobile devices will be severely degraded.

---

## Touch Ergonomics

**Locations:**
- `src/ui/pages/sales.html` line 82-83: Table rows have no minimum touch target size (44px recommended)
- `src/ui/modules/categories/categories.modal.html`: Form inputs have `p-3` (12px) padding - may be small for touch targets
- `src/ui/modules/units/units.modal.html`: Same input padding issue
- `src/ui/modules/products/products.modal.html`: Same input padding issue
- `src/ui/pages/settings.html` line 27: Tax rate input has `py-3` (12px) vertical padding - small touch target

**Issue:** Interactive elements lack minimum touch target sizes for mobile.

**Impact:** Users on touch devices will have difficulty accurately tapping buttons, inputs, and table action links.

---

## Grid Collapse Issues

**Locations:**
- `src/ui/pages/settings.html` line 37: `.flex.justify-between.max-w-md` - no grid or flex-wrap fallback for narrow screens
- `src/ui/pages/sales.html` line 30: `.receipt-field` flex layout with no wrapping

**Issue:** Flex layouts that don't wrap or collapse to stacked layout on mobile.

**Impact:** Content will overlap or be cut off on small screens.

---

## Mobile Spacing Issues

**Locations:**
- `src/ui/pages/sales.html` line 82-83: Table cells have fixed padding `8px 12px` - no reduction for mobile
- `src/ui/modules/sales/sales.modal.html` line 47: Same fixed padding
- `src/ui/pages/settings.html` line 27: Input has `px-4 py-3` - no mobile-specific spacing reduction
- All page templates: Use `space-y-4` (16px) consistently with no mobile adjustment

**Issue:** Spacing values are uniform across all viewport sizes.

**Impact:** On mobile, excessive spacing wastes valuable screen real estate; on desktop, spacing may feel adequate but lacks responsive optimization.

---

## Sticky/Fixed Element Issues

**Locations:**
- `src/ui/pages/sales.html` line 82-83: Table headers are not sticky - on scroll, column headers will disappear
- `src/ui/modules/sales/sales.modal.html` line 47: Modal table headers not sticky

**Issue:** No sticky headers on tables that may scroll.

**Impact:** On long tables (especially on mobile), users lose context of which column is which when scrolling.

---

## Viewport Problems

**Locations:**
- All page templates: No viewport meta tag or responsive base styles visible in provided files
- `src/ui/pages/sales.html` line 82-83: No `max-width: 100vw` or overflow constraints on table containers

**Issue:** No viewport-level responsive constraints or meta viewport configuration visible.

**Impact:** Without proper viewport meta tag, mobile browsers may render pages at desktop width, requiring zoom and horizontal scrolling.
