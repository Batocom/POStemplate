# POS Workflow Documentation

## Overview

The Point of Sale (POS) system is the core transaction engine.
It handles product selection, cart management, pricing, payment,
and sale completion.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    UI LAYER (Frontend)                       │
│  pos.html → POSPage, ProductSearch, CartTable, TotalsPanel  │
│  PaymentModal, CartItemRow                                   │
├─────────────────────────────────────────────────────────────┤
│                  SERVICE LAYER (Frontend)                    │
│  cartService.html → CartService                              │
│  checkoutService.html → CheckoutService                      │
│  pricingService.html → PricingService                        │
│  scannerService.html → ScannerService                        │
│  searchService.html → Search (utility)                       │
├─────────────────────────────────────────────────────────────┤
│                  STATE LAYER (Frontend)                      │
│  cartState.html → CartState (single source of truth)         │
├─────────────────────────────────────────────────────────────┤
│                  API BOUNDARY (google.script.run)            │
├─────────────────────────────────────────────────────────────┤
│                  BACKEND LAYER (Apps Script)                 │
│  router.js → handleRequest()                                 │
│  salesService.js → SalesService.createSale()                 │
│  productService.js → ProductService                          │
│  stockService.js → StockService.decrease()                   │
│  receiptService.js → ReceiptService.generate()               │
│  authMiddleware.js → requireAuth(), requireRole()            │
└─────────────────────────────────────────────────────────────┘
```

## File Inventory

### Frontend Files

| File | Purpose |
|------|---------|
| `ui/pages/pos.html` | Main POS page template, layout, styles, and controller (POSPage, ProductSearch, CartTable, TotalsPanel, PaymentModal) |
| `ui/services/cartService.html` | Cart business logic: add, remove, update quantity, clear, validate |
| `ui/services/checkoutService.html` | Checkout orchestration: validate cart, prepare payload, call CREATE_SALE, show receipt |
| `ui/services/pricingService.html` | All price calculations: subtotal, tax, discount, total, profit, currency formatting |
| `ui/services/scannerService.html` | Barcode scanner support via keyboard wedge events |
| `ui/services/searchService.html` | Client-side search/filter utility (Search.filter, Search.highlight, etc.) |
| `ui/state/cartState.html` | Single source of truth for cart data: items, summary, payment, status |
| `ui/components/cartItemRow.html` | Utility for generating cart item HTML (not actively used by pos.html) |

### Backend Files

| File | Purpose |
|------|---------|
| `modules/sales/salesService.js` | Sale creation: validate items, create sale header, process items, deduct stock |
| `modules/sales/receiptService.js` | Receipt text generation from sale data |
| `modules/products/productService.js` | Product CRUD: create, getAll, getById, update |
| `modules/products/productValidator.js` | Product validation: canSell, validateNewProduct, validateUpdateProduct |
| `modules/products/stockService.js` | Stock management: increase, decrease |
| `core/router/router.js` | Request dispatcher: handleRequest(action, payload) |
| `core/middleware/authMiddleware.js` | Authentication: requireAuth, requireRole |

## Data Flow

### Complete Sale Flow

```
1. USER ACTION: Scan barcode or search product
   ↓
2. ScannerService / ProductSearch
   - ScannerService accumulates keystrokes, detects Enter key
   - ProductSearch filters local product array by name/barcode
   ↓
3. CartService.add(product)
   - Checks if product already in cart (CartState.getItem)
   - If exists: increments quantity
   - If new: pushes new item object to CartState.items
   - Sets CartState.status = "active"
   - Calls PricingService.recalculate()
   - Emits "cartUpdated" event
   ↓
4. PricingService.recalculate()
   - Iterates CartState.items
   - Calculates: subtotal, tax (8%), discount (0), total
   - Updates CartState.summary
   - Updates CartState.payment.balance and change
   - Emits "totalsUpdated" event
   ↓
5. UI Reacts to Events
   - CartTable.render() → rebuilds cart item list
   - TotalsPanel.render() → updates subtotal, tax, total, change
   - POSPage.updateCheckoutButton() → enables/disables checkout
   ↓
6. USER ACTION: Click "Checkout"
   ↓
7. PaymentModal.init()
   - Shows payment modal with total, item count
   - Resets amount input and change display
   - Sets default payment method to "cash"
   ↓
8. USER ACTION: Enter amount, select method, click "Complete Sale"
   ↓
9. PaymentModal.confirm()
   - Calls CheckoutService.process(paymentData)
   ↓
10. CheckoutService.process()
    - Calls CartService.validate() → checks items exist, quantities > 0, prices > 0
    - Updates CartState.payment with method and amountPaid
    - Sets CartState.status = "paying"
    - Emits "checkoutStarted"
    - Prepares payload via _preparePayload()
    - Calls api("CREATE_SALE", payload)
    ↓
11. Backend: router.js → SalesService.createSale(token, payload)
    - requireAuth(token) validates session
    - Validates items array is not empty
    - Creates sale header in "sales" table (UUID, invoice_no, customer_name, total_amount, payment_method, created_by)
    - For each item:
      - Fetches product from "products" table
      - Validates stock via ProductValidator.canSell()
      - Calculates subtotal and profit
      - Creates sale_item record in "sale_items" table
      - Calls StockService.decrease() to deduct stock
    - Updates sale total_amount
    - Returns { success, saleId, totalAmount, totalProfit }
    ↓
12. CheckoutService.process() (continued)
    - Parses response
    - Shows success toast
    - Calls _showReceipt(saleId) → api("PRINT_RECEIPT")
    - Calls CartService.clear() → CartState.reset()
    - Sets CartState.status = "completed"
    - Emits "saleCompleted"
    - Returns saleData
```

### Product Search Flow

```
1. USER ACTION: Type in search input
   ↓
2. Input event listener (200ms debounce)
   ↓
3. ProductSearch.search(query)
   - Filters ProductSearch.products array locally
   - Matches against name (case-insensitive) and barcode
   - Shows dropdown with top 10 results
   - Also filters product grid to show matches
   ↓
4. USER ACTION: Click search result
   ↓
5. ProductSearch.selectProduct(product)
   - Calls CartService.add(product)
   - Clears search input and hides dropdown
   - Refocuses search input
```

### Barcode Scan Flow

```
1. Scanner enabled (ScannerService.enable())
   ↓
2. Keydown events accumulate in buffer
   - Ignores events when focus is on INPUT/TEXTAREA
   - Resets buffer after 100ms of inactivity
   ↓
3. Enter key detected with non-empty buffer
   ↓
4. ScannerService callback fires with barcode string
   ↓
5. ProductSearch.searchByBarcode(barcode)
   - Finds product by exact barcode match
   - Calls CartService.add(product)
   - Shows success toast with product name
   - Shows warning toast if not found
```

## State Machine

### CartState.status Transitions

```
                    ┌──────────┐
                    │   idle   │
                    └────┬─────┘
                         │
              CartService.add()
                         │
                         ▼
                    ┌──────────┐
                    │  active  │
                    └────┬─────┘
                         │
              CheckoutService.process()
                         │
                         ▼
                    ┌──────────┐
                    │  paying  │
                    └────┬─────┘
                         │
              Success ───┤─── Failure
                         │
              ┌──────────▼──────┐
              │   completed     │
              └────────┬────────┘
                       │
              CartService.clear()
                       │
                       ▼
                  ┌──────────┐   
                  │   idle   │
                  └──────────┘

              Failure path:
              paying → active (error recovery)
```

## Event Bus Communication

### Events Emitted

| Event | Emitter | Listeners | Payload |
|-------|---------|-----------|---------|
| `cartUpdated` | CartService | POSPage, CartTable, TotalsPanel | none |
| `totalsUpdated` | PricingService | POSPage, TotalsPanel | none |
| `cartCleared` | CartService | POSPage, CartTable, TotalsPanel | none |
| `checkoutStarted` | CheckoutService | (future use) | none |
| `saleCompleted` | CheckoutService | (future use) | saleData |
| `checkoutFailed` | CheckoutService | (future use) | error |
| `customerChanged` | CartService | (future use) | customer |

## API Contracts

### Frontend → Backend

| Action | Payload | Response (success) | Response (error) |
|--------|---------|-------------------|------------------|
| `GET_PRODUCTS` | `{ token }` | `{ success: true, data: Product[] }` | `{ success: false, error: string }` |
| `CREATE_SALE` | `{ token, items, subtotal, tax, discount, total, payment_method, amount_paid, customer_id }` | `{ success: true, data: { saleId, totalAmount, totalProfit } }` | `{ success: false, error: string }` |
| `PRINT_RECEIPT` | `{ token, saleId }` | `{ success: true, data: string }` | `{ success: false, error: string }` |

### Product Object Shape

```javascript
{
  id: string,          // UUID
  name: string,
  barcode: string,
  buy_price: number,
  sell_price: number,
  stock: number,
  unit_id: string,
  category_id: string,
  created_at: Date,
  updated_at: Date
}
```

### Cart Item Object Shape

```javascript
{
  productId: string,
  name: string,
  barcode: string, 
  price: number,       // sell_price
  buyPrice: number,    // buy_price
  quantity: number,
  total: number,       // price * quantity
  stock: number,       // available stock
  unit: string         // "pcs" default
}
```

### Sale Payload Shape

```javascript
{
  items: [{
    product_id: string,
    name: string,
    quantity: number,
    price: number,
    total: number
  }],
  subtotal: number,
  tax: number,
  discount: number,
  total: number,
  payment_method: string,  // "cash" | "card" | "transfer"
  amount_paid: number,
  customer_id: string | null
}
```

## Error Handling Paths

### Frontend Error Handling

| Scenario | Where | Behavior |
|----------|-------|----------|
| Invalid product | CartService.add() | Throws "Invalid product" |
| Item not in cart | CartService.updateQuantity() | Throws "Item not found in cart" |
| Insufficient stock | CartService.updateQuantity() | Toast.warning, caps at available stock |
| Empty cart | CartService.validate() | Throws "Cart is empty" |
| Invalid quantity | CartService.validate() | Throws "Invalid quantity for {name}" |
| Invalid price | CartService.validate() | Throws "Invalid price for {name}" |
| API failure | CheckoutService.process() | Toast.error, status back to "active" |
| Receipt failure | CheckoutService._showReceipt() | console.error only (non-blocking) |

### Backend Error Handling

| Scenario | Where | Behavior |
|----------|-------|----------|
| Invalid token | requireAuth() | Throws error |
| Insufficient role | requireRole() | Throws "Forbidden: insufficient permissions" |
| No sale items | SalesService.createSale() | Throws "No sale items" |
| Product not found | SalesService.createSale() | Throws "Product not found" |
| Insufficient stock | ProductValidator.canSell() | Throws "Insufficient stock for {name}" |

## Key Business Rules

1. **Tax Rate**: 8% (hardcoded in PricingService.recalculate())
2. **Discount**: Currently 0 (placeholder for future)
3. **Stock Validation**: Cannot sell more than available stock
4. **Price Validation**: sell_price must be >= 0
5. **Payment**: Cash requires amount >= total; Card/Transfer auto-sets amountPaid = total
6. **Invoice Number**: Format "INV-" + Date.now() (timestamp-based)
7. **Customer**: Defaults to "Walk-in" if not specified

## Dependencies

### Service Dependency Graph

```
POSPage
  ├── ProductSearch
  │     └── api (GET_PRODUCTS)
  ├── CartTable
  │     └── CartState (read)
  ├── TotalsPanel
  │     ├── CartState (read)
  │     └── PricingService (formatCurrency)
  ├── PaymentModal
  │     ├── CartState (read/write)
  │     ├── PricingService (formatCurrency)
  │     └── CheckoutService (process)
  ├── CartService
  │     ├── CartState (read/write)
  │     ├── PricingService (recalculate)
  │     └── EventBus (emit)
  ├── CheckoutService
  │     ├── CartService (validate, clear)
  │     ├── CartState (read/write)
  │     ├── api (CREATE_SALE, PRINT_RECEIPT)
  │     ├── Toast (success, error)
  │     └── Modal (show receipt)
  ├── PricingService
  │     ├── CartState (read/write)
  │     └── EventBus (emit)
  └── ScannerService
        └── ProductSearch (searchByBarcode)
```

### Backend Dependency Graph

```
SalesService.createSale()
  ├── requireAuth()
  ├── DBInstance.table("sales").insert()
  ├── DBInstance.table("products").where()
  ├── ProductValidator.canSell()
  ├── StockService.decrease()
  │     ├── DBInstance.table("products").where()
  │     └── DBInstance.table("products").update()
  ├── DBInstance.table("sale_items").insert()
  └── DBInstance.table("sales").update()
```

## Missing Components (Future Work)

1. **Sales Validator** (`modules/sales/salesValidator.js`) - Dedicated validation for sale payloads
2. **Customer Module** - Customer management, history, loyalty
3. **Discount/Promotion System** - Coupons, percentage/flat discounts
4. **Payment Processing** - Split payments, multiple tender types
5. **Settings Module** - Configurable tax rate, currency, receipt header
6. **Offline Support** - Local storage queue for transactions
7. **EventBus Implementation** - Currently implied but not explicitly defined in provided files
