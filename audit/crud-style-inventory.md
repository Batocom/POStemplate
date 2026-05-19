# Style Inventory Audit

## Colors

### Blue-600 (#2563eb)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - button background
- `src/ui/modules/products/products.modal.html` - button background
- `src/ui/modules/units/units.modal.html` - button background
- `src/ui/pages/sales.html` - button background, total value color
- `src/ui/pages/settings.html` - button background
- `src/ui/pages/categories.html` - button background
- `src/ui/pages/units.html` - button background
- `src/ui/pages/products.html` - button background

**Properties:** `background`, `color`

**Frequency:** 8+ occurrences across 8 files

**Issues:** Hardcoded; no CSS variable reference

---

### White (#ffffff)

**Locations:**
- `src/ui/pages/sales.html` - table container background, receipt header background
- `src/ui/pages/settings.html` - card backgrounds
- `src/ui/pages/categories.html` - table container background
- `src/ui/pages/units.html` - table container background
- `src/ui/pages/products.html` - table container background
- `src/ui/pages/stockMovements.html` - table container background

**Properties:** `background`

**Frequency:** 6 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-500 (#6b7280 / text-gray-500)

**Locations:**
- `src/ui/pages/sales.html` - subtitle text
- `src/ui/pages/settings.html` - subtitle text, description text
- `src/ui/pages/categories.html` - subtitle text
- `src/ui/pages/units.html` - subtitle text
- `src/ui/pages/products.html` - subtitle text
- `src/ui/pages/stockMovements.html` - subtitle text

**Properties:** `color`

**Frequency:** 6 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-600 (#4b5563 / text-gray-600)

**Locations:**
- `src/ui/pages/settings.html` - percentage sign

**Properties:** `color`

**Frequency:** 1 occurrence

**Issues:** Inconsistent with other gray usage

---

### Gray-700 (#374151 / text-gray-700)

**Locations:**
- `src/ui/pages/settings.html` - label text

**Properties:** `color`

**Frequency:** 1 occurrence

**Issues:** Inconsistent with other gray usage

---

### Gray-400 (#9ca3af / text-gray-400)

**Locations:**
- `src/ui/pages/settings.html` - hint text

**Properties:** `color`

**Frequency:** 1 occurrence

**Issues:** Inconsistent with other gray usage

---

### Red-500 (#ef4444 / text-red-500)

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - error message
- `src/ui/modules/units/units.controller.html` - error message

**Properties:** `color`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Red-600 (#dc2626 / text-red-600)

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - delete action link
- `src/ui/modules/units/units.controller.html` - delete action link

**Properties:** `color`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with red-500 used for error messages

---

### Gray-300 (#d1d5db / border-gray-300)

**Locations:**
- `src/ui/pages/settings.html` - input border

**Properties:** `border-color`

**Frequency:** 1 occurrence

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-200 (#e5e7eb / border-gray-200)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table header border, total section border
- `src/ui/pages/sales.html` - table header border, receipt actions border

**Properties:** `border-bottom`, `border-top`

**Frequency:** 4 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-100 (#f3f4f6 / bg-gray-100)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table header background
- `src/ui/pages/sales.html` - receipt header background

**Properties:** `background`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-50 (#f9fafb / bg-gray-50)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - detail row border
- `src/ui/pages/sales.html` - item row border

**Properties:** `border-bottom`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### Gray-666 (#666666)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - label color, table header color
- `src/ui/pages/sales.html` - label color

**Properties:** `color`

**Frequency:** 3 occurrences

**Issues:** Not a standard Tailwind gray value; inconsistent with gray-500/gray-600

---

### Gray-333 (#333333)

**Locations:**
- `src/ui/pages/sales.html` - value color, section title color, total label color

**Properties:** `color`

**Frequency:** 3 occurrences

**Issues:** Not a standard Tailwind gray value; inconsistent with other gray usage

---

### Gray-e0 (#e0e0e0)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table header border, total section border
- `src/ui/pages/sales.html` - table header border, receipt actions border

**Properties:** `border-bottom`, `border-top`

**Frequency:** 4 occurrences

**Issues:** Not a standard Tailwind gray value; inconsistent with gray-200 usage

---

### Gray-f0 (#f0f0f0)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - detail row border, item row border
- `src/ui/pages/sales.html` - item row border

**Properties:** `border-bottom`

**Frequency:** 3 occurrences

**Issues:** Not a standard Tailwind gray value; inconsistent with gray-50 usage

---

### Gray-f8f9fa (#f8f9fa)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table header background
- `src/ui/pages/sales.html` - receipt header background

**Properties:** `background`

**Frequency:** 2 occurrences

**Issues:** Not a standard Tailwind gray value; inconsistent with gray-100 usage

---

## Spacing

### p-4 (16px padding)

**Locations:**
- `src/ui/pages/sales.html` - table container, receipt header
- `src/ui/pages/categories.html` - table container
- `src/ui/pages/units.html` - table container
- `src/ui/pages/products.html` - table container
- `src/ui/pages/stockMovements.html` - table container

**Properties:** `padding`

**Frequency:** 5 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### p-6 (24px padding)

**Locations:**
- `src/ui/pages/settings.html` - card padding

**Properties:** `padding`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with p-4 used elsewhere

---

### p-3 (12px padding)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - input/textarea padding
- `src/ui/modules/products/products.modal.html` - input/select padding
- `src/ui/modules/units/units.modal.html` - input padding

**Properties:** `padding`

**Frequency:** 10+ occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### px-4 (16px horizontal padding)

**Locations:**
- `src/ui/pages/sales.html` - button padding
- `src/ui/pages/settings.html` - input padding
- `src/ui/pages/categories.html` - button padding
- `src/ui/pages/units.html` - button padding
- `src/ui/pages/products.html` - button padding

**Properties:** `padding-left`, `padding-right`

**Frequency:** 6 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### px-6 (24px horizontal padding)

**Locations:**
- `src/ui/pages/settings.html` - save button padding

**Properties:** `padding-left`, `padding-right`

**Frequency:** 1 occurrence

**Issues:** Inconsistent with px-4 used elsewhere

---

### py-2 (8px vertical padding)

**Locations:**
- `src/ui/pages/sales.html` - button padding
- `src/ui/pages/categories.html` - button padding
- `src/ui/pages/units.html` - button padding
- `src/ui/pages/products.html` - button padding

**Properties:** `padding-top`, `padding-bottom`

**Frequency:** 4 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### py-3 (12px vertical padding)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - button padding
- `src/ui/modules/products/products.modal.html` - button padding
- `src/ui/modules/units/units.modal.html` - button padding
- `src/ui/pages/settings.html` - button padding

**Properties:** `padding-top`, `padding-bottom`

**Frequency:** 4 occurrences

**Issues:** Inconsistent with py-2 used elsewhere

---

### space-y-4 (16px vertical gap)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - form spacing
- `src/ui/pages/sales.html` - page layout
- `src/ui/pages/settings.html` - page layout
- `src/ui/modules/products/products.modal.html` - form spacing
- `src/ui/modules/units/units.modal.html` - form spacing
- `src/ui/pages/categories.html` - page layout
- `src/ui/pages/units.html` - page layout
- `src/ui/pages/products.html` - page layout
- `src/ui/pages/stockMovements.html` - page layout

**Properties:** `margin-top` (on children)

**Frequency:** 10+ occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### space-y-2 (8px vertical gap)

**Locations:**
- `src/ui/pages/settings.html` - system info list

**Properties:** `margin-top` (on children)

**Frequency:** 1 occurrence

**Issues:** Inconsistent with space-y-4 used elsewhere

---

### space-y-6 (24px vertical gap)

**Locations:**
- `src/ui/pages/settings.html` - page layout

**Properties:** `margin-top` (on children)

**Frequency:** 1 occurrence

**Issues:** Inconsistent with space-y-4 used elsewhere

---

### gap-2 (8px gap)

**Locations:**
- `src/ui/pages/sales.html` - button icon gap
- `src/ui/pages/settings.html` - input group gap

**Properties:** `gap`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### mb-4 (16px margin-bottom)

**Locations:**
- `src/ui/pages/settings.html` - section title margin, description margin

**Properties:** `margin-bottom`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### mb-8 (32px margin-bottom)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - detail section margin
- `src/ui/pages/sales.html` - receipt header margin

**Properties:** `margin-bottom`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with mb-4 used elsewhere

---

### mb-12 (48px margin-bottom)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - items section margin
- `src/ui/pages/sales.html` - items section margin

**Properties:** `margin-bottom`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with mb-4/mb-8 used elsewhere

---

### mt-2 (8px margin-top)

**Locations:**
- `src/ui/pages/settings.html` - hint text margin

**Properties:** `margin-top`

**Frequency:** 1 occurrence

**Issues:** Hardcoded; no CSS variable reference

---

### pt-12 (48px padding-top)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - total section padding
- `src/ui/pages/sales.html` - total section padding

**Properties:** `padding-top`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### px-12 (48px horizontal padding)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table cell padding
- `src/ui/pages/sales.html` - table cell padding

**Properties:** `padding-left`, `padding-right`

**Frequency:** 4 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### py-8 (8px vertical padding)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table cell padding
- `src/ui/pages/sales.html` - table cell padding

**Properties:** `padding-top`, `padding-bottom`

**Frequency:** 4 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### py-6 (6px vertical padding)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - detail row padding
- `src/ui/pages/sales.html` - receipt field padding

**Properties:** `padding-top`, `padding-bottom`

**Frequency:** 4 occurrences

**Issues:** Inconsistent with py-8 used elsewhere

---

## Typography

### text-2xl (24px / 1.5rem)

**Locations:**
- `src/ui/pages/sales.html` - page title
- `src/ui/pages/settings.html` - page title
- `src/ui/pages/categories.html` - page title
- `src/ui/pages/units.html` - page title
- `src/ui/pages/products.html` - page title
- `src/ui/pages/stockMovements.html` - page title

**Properties:** `font-size`

**Frequency:** 6 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### text-lg (18px / 1.125rem)

**Locations:**
- `src/ui/pages/settings.html` - section title, input font size

**Properties:** `font-size`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### text-sm (14px / 0.875rem)

**Locations:**
- `src/ui/pages/settings.html` - description text, label text, system info text

**Properties:** `font-size`

**Frequency:** 3 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### text-xs (12px / 0.75rem)

**Locations:**
- `src/ui/pages/settings.html` - hint text

**Properties:** `font-size`

**Frequency:** 1 occurrence

**Issues:** Hardcoded; no CSS variable reference

---

### 0.9rem (14.4px)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - label text, table cell text
- `src/ui/pages/sales.html` - receipt field text, table cell text

**Properties:** `font-size`

**Frequency:** 6 occurrences

**Issues:** Not a standard Tailwind size; inconsistent with text-sm (0.875rem)

---

### 0.85rem (13.6px)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - table header text
- `src/ui/pages/sales.html` - table header text

**Properties:** `font-size`

**Frequency:** 4 occurrences

**Issues:** Not a standard Tailwind size; inconsistent with text-xs (0.75rem)

---

### 1rem (16px)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - section title
- `src/ui/pages/sales.html` - section title

**Properties:** `font-size`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### 1.1rem (17.6px)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - total row text
- `src/ui/pages/sales.html` - total label text

**Properties:** `font-size`

**Frequency:** 2 occurrences

**Issues:** Not a standard Tailwind size; inconsistent with text-lg (1.125rem)

---

### 1.4rem (22.4px)

**Locations:**
- `src/ui/pages/sales.html` - total value text

**Properties:** `font-size`

**Frequency:** 1 occurrence

**Issues:** Not a standard Tailwind size; inconsistent with text-2xl (1.5rem)

---

### font-bold (700 weight)

**Locations:**
- `src/ui/pages/sales.html` - page title, total label
- `src/ui/pages/settings.html` - page title, section title, input font weight
- `src/ui/pages/categories.html` - page title
- `src/ui/pages/units.html` - page title
- `src/ui/pages/products.html` - page title
- `src/ui/pages/stockMovements.html` - page title

**Properties:** `font-weight`

**Frequency:** 9 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### font-medium (500 weight)

**Locations:**
- `src/ui/pages/settings.html` - button font weight, system info values
- `src/ui/modules/sales/sales.modal.html` - detail values
- `src/ui/pages/sales.html` - receipt values

**Properties:** `font-weight`

**Frequency:** 4 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### font-semibold (600 weight)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - section title
- `src/ui/pages/sales.html` - section title

**Properties:** `font-weight`

**Frequency:** 2 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### uppercase text-transform

**Locations:**
- `src/ui/pages/sales.html` - table header text

**Properties:** `text-transform`

**Frequency:** 1 occurrence

**Issues:** Inconsistent with sales.modal.html which does not use uppercase

---

## Shadows

### shadow (default box-shadow)

**Locations:**
- `src/ui/pages/sales.html` - table container
- `src/ui/pages/settings.html` - card containers
- `src/ui/pages/categories.html` - table container
- `src/ui/pages/units.html` - table container
- `src/ui/pages/products.html` - table container
- `src/ui/pages/stockMovements.html` - table container

**Properties:** `box-shadow`

**Frequency:** 6 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

## Border Radius

### rounded (4px / 0.25rem)

**Locations:**
- `src/ui/pages/sales.html` - button, table container
- `src/ui/pages/categories.html` - button, table container
- `src/ui/pages/units.html` - button, table container
- `src/ui/pages/products.html` - button, table container
- `src/ui/pages/stockMovements.html` - table container

**Properties:** `border-radius`

**Frequency:** 9 occurrences

**Issues:** Hardcoded; no CSS variable reference

---

### rounded-lg (8px / 0.5rem)

**Locations:**
- `src/ui/pages/settings.html` - input, button

**Properties:** `border-radius`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with `rounded` used elsewhere

---

### rounded (8px) in sales modal

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - receipt header
- `src/ui/pages/sales.html` - receipt header

**Properties:** `border-radius`

**Frequency:** 2 occurrences

**Issues:** Inconsistent with `rounded` (4px) used elsewhere

---

## Breakpoints

**No responsive breakpoints found in any of the provided files.**

**Issues:** All styling is static; no media queries or responsive utilities present

---

## Layout Spacing Patterns

### Page Header Pattern (flex items-center justify-between)

**Locations:**
- `src/ui/pages/sales.html` - title + button row
- `src/ui/pages/settings.html` - title row
- `src/ui/pages/categories.html` - title + button row
- `src/ui/pages/units.html` - title + button row
- `src/ui/pages/products.html` - title + button row
- `src/ui/pages/stockMovements.html` - title row (no button)

**Structure:**
```html
<div class="flex items-center justify-between">
  <div>
    <h1 class="text-2xl font-bold">Title</h1>
    <p class="text-gray-500">Subtitle</p>
  </div>
  <button class="bg-blue-600 text-white px-4 py-2 rounded">Action</button>
</div>
```

**Frequency:** 6 occurrences

**Issues:** Repeated verbatim across all CRUD pages; no component abstraction

---

### Card Container Pattern (bg-white rounded shadow p-4)

**Locations:**
- `src/ui/pages/sales.html` - table container
- `src/ui/pages/categories.html` - table container
- `src/ui/pages/units.html` - table container
- `src/ui/pages/products.html` - table container
- `src/ui/pages/stockMovements.html` - table container

**Structure:**
```html
<div class="bg-white rounded shadow p-4">
  Loading...
</div>
```

**Frequency:** 5 occurrences

**Issues:** Repeated verbatim; no component abstraction

---

### Settings Card Pattern (bg-white rounded shadow p-6)

**Locations:**
- `src/ui/pages/settings.html` - tax configuration card, system info card

**Structure:**
```html
<div class="bg-white rounded shadow p-6">
  <h2 class="text-lg font-bold mb-4">Title</h2>
  ...
</div>
```

**Frequency:** 2 occurrences

**Issues:** Inconsistent padding (p-6 vs p-4) with other card containers

---

### Form Input Pattern (w-full border p-3 rounded)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - input, textarea
- `src/ui/modules/products/products.modal.html` - input, select
- `src/ui/modules/units/units.modal.html` - input

**Structure:**
```html
<input class="w-full border p-3 rounded" />
```

**Frequency:** 10+ occurrences

**Issues:** Repeated verbatim across all modal forms; no component abstraction

---

### Modal Button Pattern (bg-blue-600 text-white px-4 py-3 rounded w-full)

**Locations:**
- `src/ui/modules/categories/categories.modal.html` - submit button
- `src/ui/modules/products/products.modal.html` - submit button
- `src/ui/modules/units/units.modal.html` - submit button

**Structure:**
```html
<button class="bg-blue-600 text-white px-4 py-3 rounded w-full">
  Save/Update
</button>
```

**Frequency:** 5 occurrences

**Issues:** Repeated verbatim; no component abstraction

---

### Page Action Button Pattern (bg-blue-600 text-white px-4 py-2 rounded)

**Locations:**
- `src/ui/pages/sales.html` - "New Sale" button
- `src/ui/pages/categories.html` - "Add Category" button
- `src/ui/pages/units.html` - "Add Unit" button
- `src/ui/pages/products.html` - "Add Product" button

**Structure:**
```html
<button class="bg-blue-600 text-white px-4 py-2 rounded">
  Action
</button>
```

**Frequency:** 4 occurrences

**Issues:** Inconsistent vertical padding (py-2 vs py-3) with modal buttons

---

### Table Action Link Pattern (text-blue-600 / text-red-600)

**Locations:**
- `src/ui/modules/categories/categories.controller.html` - Edit/Delete links
- `src/ui/modules/units/units.controller.html` - Edit/Delete links

**Structure:**
```javascript
{ label: 'Edit', class: 'text-blue-600', onClick: ... },
{ label: 'Delete', class: 'text-red-600', onClick: ... }
```

**Frequency:** 2 occurrences

**Issues:** Repeated verbatim; no component abstraction

---

### Receipt Detail Row Pattern (flex justify-between padding-6px)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - detail rows
- `src/ui/pages/sales.html` - receipt fields

**Structure:**
```css
.detail-row, .receipt-field {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}
```

**Frequency:** 2 occurrences (duplicated across files)

**Issues:** Duplicated CSS with slightly different class names; no shared component

---

### Receipt Table Pattern (full width, collapsed borders)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - items table
- `src/ui/pages/sales.html` - items table

**Structure:**
```css
.modal-items-table, .receipt-items-table {
  width: 100%;
  border-collapse: collapse;
}
```

**Frequency:** 2 occurrences (duplicated across files)

**Issues:** Duplicated CSS with different class names; no shared component

---

### Receipt Total Section Pattern (border-top, padding-top)

**Locations:**
- `src/ui/modules/sales/sales.modal.html` - totals section
- `src/ui/pages/sales.html` - totals section

**Structure:**
```css
.modal-totals, .receipt-total-section {
  border-top: 2px solid #e0e0e0;
  padding-top: 12px;
}
```

**Frequency:** 2 occurrences (duplicated across files)

**Issues:** Duplicated CSS with different class names; no shared component
