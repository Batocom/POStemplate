Styles
Pages
Modules
Services
State
Existing (unchanged)
ui/styles/pos/ (NEW folder)
pos-layout.html
.pos-layout/left/right
pos-product.html
.product-* .search-*
pos-cart.html
.cart-* .totals-*
.payment-* .credit-*
pos-receipt.html
.receipt-*
pos-responsive.html
layout breakpoints only
ui/styles/stylesLoader.html
(existing — add 6 lines)
...existing includes...
include pos-layout
include pos-product
include pos-cart
include pos-payment
include pos-receipt
include pos-responsive
ui/pages/pos.html (REFACTORED)
slim shell: includes only, no inline style/script
ui/modules/pos/ (NEW folder)
pos.controller.html
POSPage object
init() / destroy()
renderProductGrid()
updateCheckoutBtn()
EventBus wiring
pos.product.html
ProductSearch object
loadProducts()
loadCategories()
search / filter
owns input listener
pos.cart.html
CartTable + TotalsPanel
CartTable.render()
TotalsPanel.render()
pure renderers,
read CartState only
pos.payment.html (biggest change)
PaymentModal — method registry pattern replaces switch statements
PaymentMethods{cash, mpesa, credit, split} each: renderSection() onSelect() validate() getPaymentData()
owns amount input listener — SplitLedger sub-object — MpesaHandler sub-object (STK push)
ui/services/ (NEW files only)
paymentMethodService.html
PaymentMethodRegistry
register(id, handler)
getAll() / get(id)
mpesaService.html
MpesaService
initiateSTK(phone, amt)
pollStatus(ref) / cancel()
debtService.html
DebtService
recordDebt(sale, customer)
recordPayment(id, amount)
ui/state/ (EXTEND existing)
cartState.html (extend, not replace)
add payment.splits[] and payment.ledger
debtState.html (NEW)
active debts list, selected customer debt
Here is the full structural plan with every file, its exact path, its prerequisites, and the logical task order.

Complete file map
New folder: ui/styles/pos/
Six .html files replacing the monolithic <style> block in pos.html. Each file is a pure <style> tag with its own responsive overrides co-located at the bottom — no more hunting across four breakpoint blocks.
FileWhat it containsPrerequisitepos-layout.html.pos-layout, .pos-left, .pos-right, .pos-header + layout breakpointsNonepos-product.html.product-grid, .product-card, .product-search, .search-*, .category-btn + product breakpointsNonepos-cart.html.cart-*, .totals-*, .checkout-actions + cart breakpointsNonepos-payment.html.payment-*, .credit-*, .change-*, .spinner, .split-ledger-* (new)Nonepos-receipt.html.receipt-*Nonepos-responsive.htmlOnly breakpoints that affect the two-panel layout flip (the flex-direction: row at 1024px)pos-layout.html
After creating these, add six <?!= include('ui/styles/pos/pos-*'); ?> lines to stylesLoader.html — that is the only change to an existing file in this phase.

New folder: ui/modules/pos/
Four .html files. Each is a <script> block only — no markup, no styles. They follow the same pattern as ui/modules/categories/categories.controller.html etc.
pos.controller.html
Contains POSPage. Stripped of input wiring (moved to pos.product.html and pos.payment.html). Its init() becomes a clean 8-line boot sequence: load products → load categories → fetch tax → enable scanner → subscribe EventBus → render grid.
Prerequisite: all other pos.* modules must be included before this one.
pos.product.html
Contains ProductSearch. Gains its own init() that wires the #product-search-input listener and the keydown Escape handler. POSPage.init() calls ProductSearch.init() instead of wiring it inline.
Prerequisite: cartService.html, pricingService.html.
pos.cart.html
Contains CartTable and TotalsPanel (they are tightly paired, pure renderers, no reason to separate them). No changes to logic.
Prerequisite: cartState.html, pricingService.html.
pos.payment.html
Contains the refactored PaymentModal using the method registry pattern, plus three sub-objects: SplitLedger, MpesaHandler, and CreditHandler. The HTML template sections for each method are rendered dynamically by each handler's renderSection() — the paymentModalContent template in ui/pages/pos.html becomes a minimal shell with only a #payment-method-options slot and a #payment-method-body slot.
Prerequisite: paymentMethodService.html, mpesaService.html, debtService.html, cartState.html, checkoutService.html.

New files: ui/services/
Three new service files, consistent with the existing service pattern.
paymentMethodService.html
PaymentMethodRegistry — a registry object with register(id, handlerObj) and get(id). This is what pos.payment.html reads when rendering method buttons. Keeping it as a separate service means any other page (e.g. a sales return page) can reuse the same registered methods.
Prerequisite: None. Load before pos.payment.html.
mpesaService.html
MpesaService — initiateSTK(phone, amount) which calls your backend api('MPESA_STK_PUSH', {...}), then pollStatus(checkoutRequestId) which polls api('MPESA_STATUS', {...}) on an interval until confirmed or timed out. Starts as a stub that resolves immediately — you wire the real API call when credentials are ready.
Prerequisite: api.html (already exists in ui/app/).
debtService.html
DebtService — recordDebt(saleId, customerId, amount, notes) and recordPayment(debtId, amount, method). These call your existing api() wrapper against new backend actions (CREATE_DEBT, RECORD_DEBT_PAYMENT, GET_CUSTOMER_DEBTS). Also needs matching backend work in modules/sales/salesService.js and a new debts.schema.js.
Prerequisite: api.html.
Extend: ui/state/cartState.html
Add payment.splits = [] (array of {method, amount}) and payment.ledger (running total paid in split mode) to the existing CartState object. Do not replace the file — add to the existing payment sub-object.
New file: ui/state/debtState.html
DebtState — holds the currently selected customer's debt list, the active debt record being paid, and payment history for the session. Follows the same flat object pattern as cartState.html.

Refactor: ui/pages/pos.html
The page file becomes a thin shell — consistent with how ui/pages/products.html, ui/pages/categories.html etc. work in your structure. It contains:

The .pos-layout HTML template (or <?!= include('ui/modules/pos/pos.template.html'); ?> if you want to split templates too)
The paymentModalContent shell (just the slots, no hardcoded sections)
The salesModalContent receipt template (no change needed)
Includes for the four pos.* module scripts in dependency order

No <style> block — styles come from stylesLoader.html. No inline service logic — everything is delegated.

Task order with prerequisites
Phase 1 — Styles (no risk, fully isolated)

Create ui/styles/pos/ folder with the six style files — extract directly from pos.html's <style> block
Add the six include lines to stylesLoader.html
Delete the <style> block from pos.html and verify visually

Phase 2 — New services (no UI impact yet)
4. Create paymentMethodService.html — registry shell, no registered methods yet
5. Create mpesaService.html — stub that logs and resolves
6. Create debtService.html — stub that calls api() with not-yet-existing actions
Phase 3 — State extensions (low risk)
7. Extend cartState.html — add splits[] and ledger to the payment object
8. Create debtState.html
Phase 4 — Module extraction (one at a time, test after each)
9. Create pos.cart.html — extract CartTable + TotalsPanel, add includes to pos.html, remove from inline script, test cart renders
10. Create pos.product.html — extract ProductSearch, move input wiring into it, test search and category filter
11. Create pos.payment.html — refactor to registry pattern with stubs for split and M-Pesa, test cash and credit flows still work
12. Create pos.controller.html — what remains of POSPage after extraction, test full page init
Phase 5 — Feature build (new functionality)
13. Implement SplitLedger inside pos.payment.html — add split method button, ledger UI, validation
14. Wire M-Pesa STK push in mpesaService.html — requires corresponding backend action in Code.js / router.js
15. Wire debtService.html to backend — add CREATE_DEBT and RECORD_DEBT_PAYMENT actions, debts.schema.js, migration
16. Build debt repayment UI — either extend the payment modal or create ui/modules/pos/pos.debtpayment.html as a separate modal flow
Phase 6 — Cleanup
17. Remove the now-empty <script> block from pos.html
18. Verify pos.html is a clean shell: only template HTML + includes

The critical rule throughout: only one phase-4 step at a time. Extract one module, verify the page still works, commit, then move to the next. The method registry refactor in step 11 is the highest-risk change — do it last among the extractions so you have a stable base. Phases 1–3 have zero runtime risk and can all land in one commit before you touch any logic.