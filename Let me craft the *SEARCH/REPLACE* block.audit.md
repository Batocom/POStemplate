# Responsive Audit

## Fixed Width Problems

**Locations:**
- `src/ui/pages/settings.html` - Tax rate input: `class="w-32"` on the tax rate input field
- `src/ui/pages/settings.html` - System info section: `class="max-w-md"` on detail rows

**Issue:** Hardcoded width classes (`w-32`, `max-w-md`) restrict content on smaller viewports, causing the tax rate input to be too narrow and system info rows to overflow or compress awkwardly.

**Impact:** On mobile devices, the tax rate input becomes difficult to use and the settings layout breaks.

---

## Overflow Problems

**Locations:**
- `src/ui/pages/sales.html` - Receipt items table: no overflow-x handling on `.receipt-items-table`
- `src/ui/modules/sales/sales.modal.html` - Modal items table: no overflow-x handling on `.modal-items-table`

**Issue:** Tables with multiple columns (Product, Qty, Price, Subtotal) have no horizontal scroll or wrapping behavior. On narrow viewports, columns will overflow their container.

**Impact:** Sales receipt details and sale item lists become unreadable on mobile without horizontal scrolling capability.

---

## Table Responsiveness

**Locations:**
- `src/ui/pages/sales.html` - Receipt items table (`.receipt-items-table`)
- `src/ui/modules/sales/sales.modal.html` - Modal items table (`.modal-items-table`)
- `src/ui/modules/categories/categories.controller.html` - Categories table via `Table.render()`
- `src/ui/modules/units/units.controller.html` - Units table via `Table.render()`
- `src/ui/pages/products.html` - Products table container
- `src/ui/pages/stockMovements.html` - Stock movements table container

**Issue:** All tables use standard table markup with no responsive pattern (no card-based mobile fallback, no horizontal scroll wrapper, no stacked layout). The `Table.render()` utility does not appear to include responsive handling.

**Impact:** On mobile, tables will either force horizontal page scrolling, cause content overflow, or require excessive zooming to read.

---

## Modal Responsiveness

**Locations:**
- `src/ui/modules/products/products.modal.html` - Create/Edit product forms
- `src/ui/modules/categories/categories.modal.html` - Create/Edit category forms
- `src/ui/modules/units/units.modal.html` - Create/Edit unit forms
- `src/ui/pages/sales.html` - Receipt modal content (`#salesModalContent`)
- `src/ui/modules/sales/sales.modal.html` - Sales detail modal

**Issue:** Modal content uses fixed-width form inputs (`class="w-full"` within the modal, but the modal itself has no responsive sizing behavior). The `Modal.open()` calls pass `size: "lg"` or `size: "md"` without any viewport-aware fallback. Receipt and sales modals contain tables that will overflow.

**Impact:** On mobile, modals may exceed viewport width, require horizontal scrolling, or have content cut off. Form inputs may become too small to interact with comfortably.

---

## Navigation Responsiveness

**Locations:**
- `src/ui/components/sidebar.html` (referenced in file list, not provided in full)
- `src/ui/components/topbar.html` (referenced in file list, not provided in full)

**Issue:** Sidebar and topbar components are not included in the provided files for analysis. However, page templates show header sections with buttons (e.g., "Add Product", "Add Category", "Add Unit", "New Sale") that use `flex items-center justify-between` layout. On mobile, these header rows may wrap awkwardly or cause button overlap.

**Impact:** Without responsive sidebar/topbar patterns, mobile navigation may be broken or require horizontal scrolling.

---

## POS Responsiveness

**Locations:**
- `src/ui/pages/pos.html` (referenced in file list, not provided in full)

**Issue:** The POS page template is not included in the provided files for analysis. However, the POS system typically involves product grids, cart panels, and checkout flows that require careful responsive design.

**Impact:** Cannot assess POS-specific responsiveness without the file content.

---

## Touch Ergonomics

**Locations:**
- All modal forms: submit buttons with `class="px-4 py-3"` (12px horizontal, 12px vertical padding)
- All table action links: `class="text-blue-600"` and `class="text-red-600"` (inline text links)
- Settings save button: `class="px-6 py-3"` (24px horizontal, 12px vertical padding)

**Issue:** Inline text links for Edit/Delete actions have no minimum touch target size (recommended 44x44px). Form submit buttons have adequate padding but may be too small on very narrow screens. The settings save button has good padding.

**Impact:** Edit/Delete action links in tables are difficult to tap accurately on touch devices, leading to user frustration and accidental taps.

---

## Grid Collapse Issues

**Locations:**
- `src/ui/pages/settings.html` - Tax rate section: `class="flex gap-2 items-center"` (input, percentage sign, save button in a row)
- All page headers: `class="flex items-center justify-between"` (title + button in a row)

**Issue:** The tax rate row uses flex without wrapping behavior. On narrow viewports, the input, "%" label, and save button will either overflow or compress uncomfortably. Page headers with title and action button may wrap unpredictably.

**Impact:** Settings tax rate controls become unusable on mobile. Page headers may stack awkwardly with title above button or cause layout shifts.

---

## Mobile Spacing Issues

**Locations:**
- `src/ui/pages/settings.html` - Settings sections: `class="space-y-6"` on page container, `class="p-6"` on cards
- All page templates: `class="space-y-4"` on page containers
- All table containers: `class="bg-white rounded shadow p-4"`

**Issue:** Padding values (`p-4` = 16px, `p-6` = 24px) and spacing values (`space-y-4` = 16px, `space-y-6` = 24px) are uniform across all viewports. On mobile, these values may consume too much vertical space, reducing content visibility. On very small screens, `p-4` may not provide enough horizontal padding.

**Impact:** Content feels either too cramped or too spaced out depending on device size. No responsive spacing adjustments are present.
