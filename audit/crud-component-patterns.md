# Component Pattern Audit

## Buttons

### Primary Action Button (Blue Background)

**Locations:**
- `src/ui/pages/sales.html` - "New Sale" button
- `src/ui/pages/categories.html` - "Add Category" button
- `src/ui/pages/units.html` - "Add Unit" button
- `src/ui/pages/products.html` - "Add Product" button
- `src/ui/pages/settings.html` - "Save" button
- `src/ui/modules/categories/categories.modal.html` - "Save Category" / "Update Category" buttons
- `src/ui/modules/products/products.modal.html` - "Save Product" / "Update Product" buttons
- `src/ui/modules/units/units.modal.html` - "Save Unit" / "Update Unit" buttons
- `src/ui/pages/sales.html` - "Print Receipt" button

**Shared Properties:**
- Background color: `#2563eb` (blue-600)
- Text color: `white`
- Border radius: `rounded` (4px) or `rounded-lg` (8px)
- Font weight: `font-medium` or `font-bold`

**Differences:**
- Page action buttons use `px-4 py-2` (8px vertical padding)
- Modal submit buttons use `px-4 py-3` (12px vertical padding)
- Settings "Save" button uses `px-6 py-3` (24px horizontal, 12px vertical padding) and `rounded-lg`
- Print button uses `flex items-center gap-2` for icon spacing

**Issues:**
- Inconsistent vertical padding (py-2 vs py-3)
- Inconsistent border radius (rounded vs rounded-lg)
- Inconsistent horizontal padding (px-4 vs px-6)
- No shared CSS class or component abstraction

**Reuse Opportunity:**
- 9+ instances of blue primary buttons with minor variations
- Could be unified into a single button component with size variants

---

### Secondary Action Link (Text-based)

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - "Edit" link (text-blue-600)
- `src/ui/modules/categories/categories.controller.html` - "Delete" link (text-red-600)
- `src/ui/modules/units/units.controller.html` - "Edit" link (text-blue-600)
- `src/ui/modules/units/units.controller.html` - "Delete" link (text-red-600)

**Shared Properties:**
- No background
- Text color only
- Inline with table rows

**Differences:**
- Edit uses `text-blue-600`
- Delete uses `text-red-600`

**Issues:**
- Duplicated across categories.controller.html and units.controller.html
- No shared component for action links

**Reuse Opportunity:**
- 4 instances of table action links with identical structure
- Could be a reusable action link component

---

## Tables

### Data Table Pattern

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - categories table via `Table.render()`
- `src/ui/modules/units/units.controller.html` - units table via `Table.render()`
- `src/ui/pages/sales.html` - sales table (implied via `salesTableContainer`)
- `src/ui/pages/products.html` - products table (implied via `productsTableContainer`)
- `src/ui/pages/stockMovements.html` - stock movements table (implied via `stockMovementsTableContainer`)

**Shared Properties:**
- All use `Table.render()` service for rendering
- All have columns configuration with `key`, `label`, `sortable` properties
- All have `actions` array with Edit/Delete links
- All have `pageSize: 10`
- All have `searchable: true`
- All have `emptyMessage` property
- All wrapped in `bg-white rounded shadow p-4` container

**Differences:**
- Categories table has 2 columns (name, description)
- Units table has 2 columns (name, symbol)
- Products table would have more columns (name, price, stock, etc.)
- Categories description column has custom `render` function
- Sales table is loaded via `loadSales()` function (not shown in provided files)

**Issues:**
- Table container HTML (`bg-white rounded shadow p-4`) duplicated across 5+ page templates
- Loading state text ("Loading...") duplicated across controllers
- Error state HTML (`<div class="text-red-500">...</div>`) duplicated across controllers
- Empty state HTML (`<div class="text-gray-500">No ... found</div>`) duplicated across controllers
- Data validation logic (checking `response.success`, `Array.isArray`, `length`) duplicated across controllers

**Reuse Opportunity:**
- 5+ table instances with identical container, loading, error, and empty state patterns
- Table container could be a reusable wrapper component
- Loading/error/empty states could be standardized

---

### Receipt Items Table

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - `.modal-items-table`
- `src/ui/pages/sales.html` - `.receipt-items-table`

**Shared Properties:**
- `width: 100%`
- `border-collapse: collapse`
- Same column structure: Product, Qty, Price, Subtotal
- Same header styling: `border-bottom: 2px solid #e0e0e0`, `font-size: 0.85rem`, `color: #666`
- Same cell padding: `padding: 8px 12px`
- Same cell border: `border-bottom: 1px solid #f0f0f0`

**Differences:**
- sales.modal.html uses class `modal-items-table`
- sales.html uses class `receipt-items-table`
- sales.html has `text-transform: uppercase` on headers
- sales.html has right-aligned columns for numeric values

**Issues:**
- Duplicated CSS with different class names
- Minor styling differences (uppercase, alignment)
- No shared component

**Reuse Opportunity:**
- 2 instances of identical receipt table structure
- Could be a single receipt table component

---

## Forms

### Create/Edit Form Pattern

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - create/edit category forms
- `src/ui/modules/products/products.modal.html` - create/edit product forms
- `src/ui/modules/units/units.modal.html` - create/edit unit forms

**Shared Properties:**
- All wrapped in `<form class="space-y-4">`
- All inputs use `class="w-full border p-3 rounded"`
- All submit buttons use `class="bg-blue-600 text-white px-4 py-3 rounded w-full"`
- All have create and edit template variants
- All edit forms have hidden ID input
- All use `onsubmit="submitCreateX(event)"` or `onsubmit="Edit.submit(event)"`

**Differences:**
- Category form has 2 fields (name, description textarea)
- Product form has 6 fields (name, sell price, buy price, stock, unit select, category select)
- Unit form has 2 fields (name, symbol)
- Product form has async dropdown loading for units and categories
- Product form uses `size: "lg"` modal, others use `size: "md"`

**Issues:**
- Form structure duplicated across 3 modules (categories, products, units)
- Input styling (`w-full border p-3 rounded`) repeated 10+ times
- Submit button styling repeated 6+ times
- Form spacing (`space-y-4`) repeated 6+ times
- No shared form field component

**Reuse Opportunity:**
- 6 form templates (3 create + 3 edit) with identical input and button styling
- Could use a shared form field component
- Could use a shared form layout component

---

### Settings Form

**Locations:**
- `src/ui/pages/settings.html` - tax rate configuration form

**Shared Properties:**
- Uses `max-w-md` for width constraint
- Has label, input, and hint text pattern
- Uses `border-2 border-gray-300 rounded-lg` for input styling

**Differences:**
- Uses different input styling than modal forms (`border-2` vs `border`, `rounded-lg` vs `rounded`)
- Has inline button next to input (flex layout)
- Has hint text below input

**Issues:**
- Inconsistent input styling with modal forms
- No shared form field component

**Reuse Opportunity:**
- Settings form pattern could be unified with modal form pattern

---

## Modals

### Modal Pattern

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - `Modal.open()` for create/edit
- `src/ui/modules/products/products.controller.html` - `Modal.open()` for create/edit
- `src/ui/modules/units/units.controller.html` - `Modal.open()` for create/edit
- `src/ui/modules/categories/categories.controller.html` - `Modal.confirm()` for delete
- `src/ui/modules/units/units.controller.html` - `Modal.confirm()` for delete

**Shared Properties:**
- All use `Modal.open()` with `{ title, content, size }` configuration
- All use `Modal.confirm()` for delete confirmation
- Content is loaded from template innerHTML
- All have create and edit modal variants

**Differences:**
- Category/Unit modals use `size: "md"`
- Product modals use `size: "lg"`
- Product modals have async dropdown loading after open

**Issues:**
- Modal open/close logic duplicated across controllers
- Template content loading pattern duplicated
- No shared modal content component

**Reuse Opportunity:**
- 6+ modal open calls with identical pattern
- Modal service already exists but content patterns are duplicated

---

### Receipt Modal

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - sales detail modal
- `src/ui/pages/sales.html` - receipt modal (same ID `salesModalContent`)

**Shared Properties:**
- Same modal ID: `salesModalContent`
- Same structure: details section, items table, totals section
- Same field IDs: `modal-invoice`, `modal-customer`, `modal-date`, `modal-payment`, `modal-items-body`, `modal-total`

**Differences:**
- sales.modal.html uses class names: `sales-modal-inner`, `sale-details`, `detail-row`, `detail-label`, `detail-value`, `modal-items-section`, `section-title`, `modal-items-table`, `modal-totals`, `total-row`, `total-amount`
- sales.html uses class names: `receipt-modal`, `receipt-header-info`, `receipt-field`, `receipt-label`, `receipt-value`, `receipt-items-section`, `receipt-section-title`, `receipt-items-table`, `receipt-total-section`, `receipt-total-row`, `receipt-total-label`, `receipt-total-value`, `receipt-actions`
- sales.html has print button in receipt actions
- sales.html has background color on header info section
- sales.html has different border colors and font sizes

**Issues:**
- Two separate implementations of the same modal with different class names
- Duplicated HTML structure
- Duplicated CSS with different class names
- Different styling values (border colors, font sizes, padding)
- Could cause rendering conflicts with same ID

**Reuse Opportunity:**
- 2 instances of identical modal content with different styling
- Could be a single receipt modal component

---

## Headers

### Page Header Pattern

**Locations:**
- `src/ui/pages/sales.html` - Sales History header
- `src/ui/pages/settings.html` - Settings header
- `src/ui/pages/categories.html` - Categories header
- `src/ui/pages/units.html` - Units header
- `src/ui/pages/products.html` - Products header
- `src/ui/pages/stockMovements.html` - Stock Movements header

**Shared Properties:**
- All use `flex items-center justify-between` layout
- All have title (`text-2xl font-bold`) and subtitle (`text-gray-500`)
- All wrapped in parent with `space-y-4`

**Differences:**
- Sales, Categories, Units, Products have action buttons
- Settings and StockMovements have no action buttons (just title + subtitle)
- Button text varies by page

**Issues:**
- Header HTML structure duplicated across 6 pages
- Title/subtitle pattern repeated verbatim
- No shared page header component

**Reuse Opportunity:**
- 6 instances of identical header structure
- Could be a reusable page header component with optional action button slot

---

## Action Bars

### Table Action Links

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - Edit/Delete actions
- `src/ui/modules/units/units.controller.html` - Edit/Delete actions

**Shared Properties:**
- Both use `actions` array in `Table.render()` configuration
- Both have `{ label: 'Edit', class: 'text-blue-600', onClick: ... }`
- Both have `{ label: 'Delete', class: 'text-red-600', onClick: ... }`
- Both open edit modal and confirm delete on click

**Differences:**
- Categories delete calls `deleteCategory(row.id)`
- Units delete calls `deleteUnit(row.id)`
- Edit modal configuration differs per entity

**Issues:**
- Action link configuration duplicated
- Delete confirmation pattern duplicated
- Edit modal open pattern duplicated

**Reuse Opportunity:**
- 2+ instances of identical action link pattern
- Could be a reusable action configuration

---

### Receipt Actions Bar

**Locations:**
- `src/ui/pages/sales.html` - `.receipt-actions`

**Shared Properties:**
- Contains print button
- Uses `display: flex; justify-content: center; gap: 8px`
- Has `border-top: 1px solid #e0e0e0`

**Differences:**
- Only appears in sales.html receipt modal
- Not present in sales.modal.html version

**Issues:**
- Only one instance, but could be needed elsewhere

**Reuse Opportunity:**
- Could be part of a reusable receipt component

---

## Empty States

### Empty Table State

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - "No categories found"
- `src/ui/modules/units/units.controller.html` - "No units found"

**Shared Properties:**
- Both use `<div class="text-gray-500">No ... found</div>`
- Both triggered when `data.length === 0`

**Differences:**
- Text varies by entity type

**Issues:**
- Empty state HTML duplicated across controllers
- No shared empty state component

**Reuse Opportunity:**
- 2+ instances of identical empty state pattern
- Could be a reusable empty state component with configurable message

---

### Loading State

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - `container.innerHTML = 'Loading...'`
- `src/ui/modules/units/units.controller.html` - `container.innerHTML = 'Loading...'`
- `src/ui/pages/sales.html` - "Loading sales..."
- `src/ui/pages/categories.html` - "Loading categories..."
- `src/ui/pages/units.html` - "Loading units..."
- `src/ui/pages/products.html` - "Loading products..."
- `src/ui/pages/stockMovements.html` - "Loading stock movements..."

**Shared Properties:**
- All show loading text in table container
- All replaced with actual content after API call

**Differences:**
- Some use inline text in template, others set via JavaScript
- Text varies by entity type

**Issues:**
- Loading state duplicated across 7+ locations
- No shared loading component

**Reuse Opportunity:**
- 7+ instances of identical loading state pattern
- Could be a reusable loading component

---

### Error State

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - `<div class="text-red-500">Failed to load categories</div>`
- `src/ui/modules/units/units.controller.html` - `<div class="text-red-500">Failed to load units</div>`
- `src/ui/modules/categories/categories.controller.html` - `<div class="text-red-500">Invalid categories data</div>`
- `src/ui/modules/units/units.controller.html` - `<div class="text-red-500">Invalid units data</div>`
- `src/ui/modules/categories/categories.controller.html` - `<div class="text-red-500">Something went wrong</div>`
- `src/ui/modules/units/units.controller.html` - `<div class="text-red-500">Something went wrong</div>`

**Shared Properties:**
- All use `text-red-500` class
- All set `container.innerHTML` directly
- All have similar error messages

**Differences:**
- Error messages vary: "Failed to load", "Invalid data", "Something went wrong"

**Issues:**
- Error state HTML duplicated across controllers
- Error handling logic duplicated
- No shared error state component

**Reuse Opportunity:**
- 6+ instances of identical error state pattern
- Could be a reusable error state component

---

## Cart Patterns

**No cart patterns found in the provided files.**

The cart-related files (`src/ui/state/cartState.html`, `src/ui/services/cartService.html`) were not included in the provided file contents.

---

## Checkout Patterns

**No checkout patterns found in the provided files.**

The checkout-related files (`src/ui/services/checkoutService.html`) were not included in the provided file contents.

---

## Navigation Patterns

### Page Navigation via Router

**Locations:**
- `src/ui/pages/sales.html` - `Router.go('pos')` for "New Sale" button

**Shared Properties:**
- Uses `Router.go()` for page navigation

**Differences:**
- Only one instance in provided files

**Issues:**
- Navigation pattern exists but only used once in provided files

**Reuse Opportunity:**
- Router service already exists for navigation

---

## Summary of Key Findings

### Most Duplicated Patterns
1. **Page Header** - 6 instances with identical structure
2. **Table Container** - 5+ instances with identical wrapper HTML
3. **Loading State** - 7+ instances with identical pattern
4. **Primary Button** - 9+ instances with minor variations
5. **Form Input** - 10+ instances with identical styling
6. **Modal Form** - 6 form templates with identical structure
7. **Error State** - 6+ instances with identical pattern
8. **Empty State** - 2+ instances with identical pattern
9. **Receipt Modal** - 2 instances with duplicated HTML/CSS
10. **Table Action Links** - 2+ instances with identical configuration

### Biggest Inconsistencies
1. Button padding (py-2 vs py-3)
2. Border radius (rounded vs rounded-lg)
3. Receipt modal class naming (sales-modal vs receipt-modal)
4. Form input border style (border vs border-2)
5. Settings card padding (p-6 vs p-4)
