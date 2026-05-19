# App Shell Style Inventory

## Colors

### Primary Colors
- `#2563eb` — Primary button background (login.html, theme.html)
- `#1d4ed8` — Primary hover (theme.html)
- `#3b82f6` — Chart blue (dashboard.html, theme.html)
- `#93c5fd` — Chart blue light (dashboard.html, theme.html)

### Sidebar Colors
- `#111827` — Sidebar background (theme.html, responsive.html)
- `#ffffff` — Sidebar text (theme.html, responsive.html)
- `rgba(255,255,255,0.1)` — Sidebar hover (theme.html)
- `#374151` — Sidebar border (responsive.html)
- `#9ca3af` — Sidebar close button (theme.html)
- `#ffffff` — Sidebar close hover (theme.html)

### Topbar Colors
- `#ffffff` — Topbar background (theme.html, responsive.html)
- `rgba(0,0,0,0.1)` — Topbar shadow (theme.html, responsive.html)
- `#374151` — Topbar hamburger icon (theme.html)
- `#f3f4f6` — Topbar hamburger hover bg (theme.html)
- `#111827` — Topbar title (theme.html)
- `#374151` — Topbar user text (theme.html)

### Logout Button Colors
- `#ef4444` — Logout background (theme.html, responsive.html)
- `#dc2626` — Logout hover background (theme.html, responsive.html)
- `#ffffff` — Logout text (theme.html, responsive.html)

### Overlay Colors
- `rgba(0,0,0,0.5)` — Overlay (theme.html, responsive.html)

### Chart Colors (theme.html)
- `#3b82f6` — Chart blue
- `#93c5fd` — Chart blue light
- `#10b981` — Chart emerald
- `#f59e0b` — Chart amber
- `#8b5cf6` — Chart violet
- `#ec4899` — Chart pink
- `#14b8a6` — Chart teal
- `#f97316` — Chart orange
- `#ffffff` — Chart white
- `#e5e7eb` — Chart grid
- `#6b7280` — Chart label
- `#374151` — Chart text
- `#9ca3af` — Chart subtext

### Status/Alert Colors
- `#ef4444` — Red (error, out of stock, danger)
- `#10b981` — Green (success, in stock)
- `#f59e0b` — Amber/yellow (warning, low stock)
- `#3b82f6` — Blue (info, cash payment)
- `#8b5cf6` — Purple (card/transfer payment)
- `#f97316` — Orange (credit payment)

### Text Colors
- `#111827` — Dark text (topbar title, chart text)
- `#374151` — Body text (topbar user, chart text)
- `#6b7280` — Secondary text (chart labels)
- `#9ca3af` — Muted text (chart subtext, sidebar close)
- `#ffffff` — White text (sidebar, logout button)

### Background Colors
- `#ffffff` — White (cards, topbar, modal content)
- `#f3f4f6` — Light gray (hamburger hover)
- `#e5e7eb` — Grid lines (chart)
- `#111827` — Dark (sidebar)
- `#374151` — Border (sidebar header)
- `rgba(0,0,0,0.5)` — Overlay
- `rgba(255,255,255,0.1)` — Sidebar hover

### Payment Method Colors (app.html)
- `text-green-600` — Cash
- `text-blue-600` — Mpesa
- `text-orange-600` — Credit
- `text-purple-600` — Card/Transfer
- `text-gray-600` — Default

### Stock Movement Type Colors (app.html)
- `text-red-600` — SALE
- `text-green-600` — PURCHASE
- `text-blue-600` — ADJUSTMENT
- `text-yellow-600` — RETURN
- `text-red-800` — DAMAGE
- `text-purple-600` — TRANSFER
- `text-green-800` — MANUAL_IN
- `text-orange-600` — MANUAL_OUT
- `text-gray-600` — Default

### Status Badge Colors (app.html, dashboard.html)
- `bg-red-100 text-red-800` — Out of Stock
- `bg-yellow-100 text-yellow-800` — Low Stock
- `bg-green-100 text-green-800` — In Stock

### Dashboard Card Icon Backgrounds (dashboard.html)
- `bg-blue-100` — Sales icon
- `bg-green-100` — Products icon
- `bg-purple-100` — Profit icon
- `bg-red-100` — Low stock icon

### Dashboard Card Icon Colors (dashboard.html)
- `text-blue-600` — Sales icon
- `text-green-600` — Products icon
- `text-purple-600` — Profit icon
- `text-red-600` — Low stock icon

## Spacing

### Padding Values
- `4px` — Not explicitly used in provided files
- `8px` — Sidebar close button padding, topbar hamburger padding, toast gap
- `12px` — Layout content padding, topbar padding, sidebar nav button padding
- `16px` — Sidebar header padding, sidebar nav padding, topbar padding, toast container right, modal content padding (implied)
- `20px` — Not explicitly used
- `24px` — Not explicitly used
- `32px` — Chart padding left (dashboard.html)

### Margin Values
- `0` — Body margin, topbar title margin
- `4px` — Sidebar nav button margin bottom
- `8px` — Grid gap (mobile), toast gap, topbar actions gap, modal margin
- `12px` — Grid gap (tablet)
- `16px` — Grid gap (desktop), toast container top, sidebar header padding
- `24px` — Not explicitly used
- `32px` — Not explicitly used

### Gap Values
- `8px` — Topbar actions gap, toast gap, grid gap (mobile)
- `12px` — Topbar flex gap, grid gap (tablet)
- `16px` — Grid gap (desktop)

### Border Radius Values
- `6px` — Sidebar nav button, topbar hamburger, logout button
- `8px` — Not explicitly used in provided files
- `12px` — Dashboard card (rounded-xl), login form container (rounded-xl)
- `16px` — Not explicitly used
- `full` — Dashboard card icon backgrounds (rounded-full)

## Typography

### Font Families
- `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif` — Body (theme.html)
- `sans-serif` — Chart labels (dashboard.html)

### Font Sizes
- `0.875rem` (14px) — Sidebar nav button, topbar user, topbar logout, text-sm-mobile
- `1.125rem` (18px) — Topbar title
- `1.5rem` (24px) — Sidebar header, topbar hamburger, sidebar close button
- `2xl` (24px) — Dashboard stat numbers
- `3xl` (30px) — Login page title
- `10px` — Chart X-axis labels (dashboard.html)
- `11px` — Chart legend text, center subtext (dashboard.html)
- `12px` — Chart Y-axis labels (dashboard.html)
- `14px` — Chart center text (dashboard.html)
- `16px` — Chart center bold text (dashboard.html)

### Font Weights
- `bold` — Sidebar header, topbar title, dashboard stat numbers, login title
- `font-medium` — Payment method labels, invoice numbers
- `font-semibold` — Chart section titles (dashboard.html)
- `normal` — Default body text

### Line Heights
- `1` — Sidebar close button
- `1.5` — Not explicitly defined

## Shadows

### Box Shadows
- `0 1px 3px var(--color-topbar-shadow)` — Topbar shadow (responsive.html)
- `shadow` — Dashboard cards (dashboard.html) — Tailwind utility class
- `shadow w-full max-w-md` — Login form container (login.html)

### Shadow Variables
- `--color-topbar-shadow: rgba(0,0,0,0.1)` — Topbar shadow color (theme.html)

## Border Radius

### Radius Values Used
- `6px` — Sidebar nav button, topbar hamburger, logout button
- `12px` — Dashboard cards (rounded-xl), login form (rounded-xl)
- `full` — Dashboard card icon backgrounds (rounded-full)
- `rounded` — Input fields (login.html), status badges (app.html)

## Transitions

### Transition Properties
- `transform 0.3s ease` — Mobile sidebar open/close (responsive.html)
- `slideIn` / `slideOut` animations — Defined in theme.html and responsive.html

### Animation Keyframes
- `slideIn` — translateX(100%) to translateX(0), opacity 0 to 1
- `slideOut` — translateX(0) to translateX(100%), opacity 1 to 0

## Breakpoints

### Defined Breakpoints (theme.html)
- `--bp-mobile: 480px`
- `--bp-tablet: 768px`
- `--bp-desktop: 1024px`
- `--bp-wide: 1280px`

### Media Queries Used (responsive.html)
- `max-width: 767px` — Mobile (hamburger visible, desktop sidebar hidden, mobile sidebar visible)
- `min-width: 768px` — Desktop (mobile sidebar hidden, overlay hidden)
- `min-width: 480px` — Grid: 3 columns
- `min-width: 768px` — Grid: 4 columns

### Responsive Classes
- `.hide-mobile` — Hidden on mobile
- `.show-mobile` — Visible only on mobile
- `.text-sm-mobile` — Smaller text on mobile

## Layout Spacing Patterns

### App Shell Structure
- Desktop: `display: flex; height: 100vh; overflow: hidden`
- Mobile: `display: flex; flex-direction: column; height: 100vh; overflow: hidden`

### Sidebar Dimensions
- Desktop: `width: 256px`
- Mobile: `width: 280px; max-width: 85vw`

### Content Padding
- Layout content: `padding: 12px` (responsive.html)
- Dashboard cards: `padding: 24px` (p-6 in dashboard.html)
- Login form: `padding: 32px` (p-8 in login.html)

### Grid Systems
- Dashboard stats: `grid-cols-1 md:grid-cols-4 gap-4`
- Charts row: `grid-cols-1 lg:grid-cols-2 gap-6`
- Responsive grid: `grid-template-columns: repeat(2, 1fr)` → `repeat(3, 1fr)` → `repeat(4, 1fr)`

### Modal Sizing
- Mobile: `width: 95%; max-width: 95%; margin: 8px auto; max-height: 90vh`
- Desktop: Uses modal-sm, modal-md, modal-lg classes (sizes not explicitly defined in provided files)

### Toast Positioning
- Desktop: `top: 16px; right: 16px; max-width: 90vw`
- Mobile: `left: 16px; right: 16px; top: 8px`

### Z-Index Values
- `40` — Sidebar overlay
- `50` — Mobile sidebar
- `9999` — Toast container

## Repeated Patterns Summary

### Most Frequently Used Colors
1. `#ffffff` — White (backgrounds, text, chart elements)
2. `#374151` — Dark gray (text, borders, icons)
3. `#3b82f6` — Blue (primary, chart, payment)
4. `#ef4444` — Red (danger, logout, out of stock)
5. `#10b981` — Green (success, in stock, purchase)
6. `#9ca3af` — Gray (muted text, subtext, close button)
7. `#111827` — Near black (sidebar bg, dark text)
8. `#6b7280` — Medium gray (secondary text, chart labels)
9. `#f59e0b` — Amber (warning, low stock, credit)
10. `#8b5cf6` — Purple (card/transfer payment, chart)

### Most Frequently Used Spacing Values
1. `16px` — Padding, margin, gap (most common)
2. `8px` — Small padding, gap, margin
3. `12px` — Content padding, button padding
4. `4px` — Small margin between nav items

### Most Frequently Used Border Radius
1. `6px` — Buttons, nav items
2. `12px` — Cards, containers
3. `full` — Icon backgrounds

### Most Frequently Used Font Sizes
1. `0.875rem` (14px) — Body text, buttons
2. `1.125rem` (18px) — Section titles
3. `1.5rem` (24px) — Headers, icons
4. `2xl` (24px) — Stat numbers
5. `3xl` (30px) — Page titles
