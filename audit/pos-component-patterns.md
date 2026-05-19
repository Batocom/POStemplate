┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Component Pattern Audit                                                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Buttons                                                                                              

Primary Action Button                                                                                

Locations:                                                                                           

 • src/ui/pages/pos.html line 48: checkout-btn - "Checkout (KES 0.00)"                               
 • src/ui/pages/pos.html line 249: confirm-payment-btn - "Complete Sale"                             
 • src/ui/pages/pos.html line 244: modal-btn-primary class                                           

Shared Properties:                                                                                   

 • Blue background (bg-blue-600)                                                                     
 • White text                                                                                        
 • Rounded corners (rounded)                                                                         
 • Padding pattern (px-4 py-2 or px-6 py-3)                                                          
 • Bold font weight (font-bold)                                                                      
 • Disabled state support                                                                            

Differences:                                                                                         

 • Checkout button uses px-6 py-3 text-lg while confirm uses px-4 py-2                               
 • Checkout button is w-full, confirm button is not                                                  
 • Checkout button dynamically updates text with total amount, confirm button has static text        

Issues:                                                                                              

 • No shared CSS class for primary buttons                                                           
 • Inconsistent sizing between checkout and confirm buttons                                          
 • No disabled state styling defined in CSS (relies on HTML attribute)                               

Reuse Opportunity:                                                                                   

 • Create a .btn-primary CSS class with consistent styling                                           
 • Standardize padding/sizing across all primary action buttons                                      

Secondary/Danger Button                                                                              

Locations:                                                                                           

 • src/ui/pages/pos.html line 50: "New Sale" button (bg-red-600)                                     
 • src/ui/pages/pos.html line 245: modal-btn-secondary class                                         
 • src/ui/pages/pos.html line 256: "Close" button (bg-gray-500)                                      

Shared Properties:                                                                                   

 • White text                                                                                        
 • Rounded corners                                                                                   
 • Padding pattern (px-4 py-2)                                                                       

Differences:                                                                                         

 • New Sale uses red background, Close uses gray                                                     
 • No consistent secondary button class                                                              
 • Different hover states (none defined for these)                                                   

Issues:                                                                                              

 • No .btn-secondary or .btn-danger CSS class                                                        
 • Inconsistent color usage for similar actions                                                      

Reuse Opportunity:                                                                                   

 • Create .btn-secondary and .btn-danger CSS classes                                                 
 • Standardize hover states                                                                          

Quantity Buttons                                                                                     

Locations:                                                                                           

 • src/ui/pages/pos.html line 310-312: .qty-btn in cart items                                        
 • src/ui/components/cartItemRow.html line 20-22: .qty-btn (duplicate)                               

Shared Properties:                                                                                   

 • 28px width and height                                                                             
 • Circular (border-radius: 50%)                                                                     
 • Border: 1px solid #ddd                                                                            
 • White background                                                                                  
 • Centered content                                                                                  
 • Hover state: background: #f0f0f0                                                                  

Differences:                                                                                         

 • Identical in both locations (duplicated code)                                                     

Issues:                                                                                              

 • Duplicate CSS and HTML structure in cartItemRow.html and pos.html                                 
 • cartItemRow.html is unused if CartTable renders items directly                                    

Reuse Opportunity:                                                                                   

 • Remove cartItemRow.html or integrate it into CartTable.render()                                   
 • Use a single source for cart item HTML generation                                                 

Category Filter Buttons                                                                              

Locations:                                                                                           

 • src/ui/pages/pos.html line 67-69: .category-btn in category-filters                               

Shared Properties:                                                                                   

 • Padding: 6px 16px                                                                                 
 • Border: 1px solid #ddd                                                                            
 • Border radius: 20px (pill shape)                                                                  
 • White background                                                                                  
 • Hover: background: #f0f0f0                                                                        
 • Active state: blue background, white text                                                         

Differences:                                                                                         

 • Only one location, but dynamically generated                                                      

Issues:                                                                                              

 • No disabled state defined                                                                         
 • No focus state defined                                                                            

Reuse Opportunity:                                                                                   

 • Could be extracted as .btn-filter for reuse in other filter contexts                              

Payment Method Buttons                                                                               

Locations:                                                                                           

 • src/ui/pages/pos.html line 393-397: .payment-method-btn                                           

Shared Properties:                                                                                   

 • Flex column layout with icon and label                                                            
 • Border: 2px solid #e0e0e0                                                                         
 • Border radius: 8px                                                                                
 • White background                                                                                  
 • Active state: blue border, blue tint background                                                   

Differences:                                                                                         

 • Only used in payment modal                                                                        

Issues:                                                                                              

 • Duplicate .payment-method-btn CSS definition (lines 393 and 437)                                  
 • Inconsistent with other button patterns                                                           

Reuse Opportunity:                                                                                   

 • Could be generalized as .btn-option for selection-style buttons                                   

Receipt Action Buttons                                                                               

Locations:                                                                                           

 • src/ui/pages/pos.html line 253-256: Print and Close buttons in receipt modal                      

Shared Properties:                                                                                   

 • Flex layout with gap                                                                              
 • Icon + text pattern                                                                               

Differences:                                                                                         

 • Print uses blue, Close uses gray                                                                  
 • Inline styles for icon spacing                                                                    

Issues:                                                                                              

 • No consistent action bar pattern for modals                                                       

Reuse Opportunity:                                                                                   

 • Create a .modal-action-bar pattern with consistent button spacing                                 

-----------------------------------------------------------------------------------------------------


Tables                                                                                               

Cart Items Table                                                                                     

Locations:                                                                                           

 • src/ui/pages/pos.html line 296-330: .cart-item elements rendered by CartTable                     
 • src/ui/components/cartItemRow.html line 12-30: CartItemRow.render() (duplicate)                   

Shared Properties:                                                                                   

 • Flexbox layout (not actual <table>)                                                               
 • Product info, quantity controls, total, remove button                                             
 • White background, rounded corners, shadow                                                         
 • Hover state with increased shadow                                                                 

Differences:                                                                                         

 • CartTable.render() in pos.html generates HTML directly                                            
 • CartItemRow.render() in cartItemRow.html is a separate utility                                    
 • Both produce identical HTML structure                                                             

Issues:                                                                                              

 • Duplicate HTML generation logic                                                                   
 • cartItemRow.html is likely dead code if CartTable is used                                         
 • Not using semantic <table> element (accessibility concern)                                        

Reuse Opportunity:                                                                                   

 • Consolidate into single CartTable component                                                       
 • Remove cartItemRow.html if unused                                                                 

Receipt Items Table                                                                                  

Locations:                                                                                           

 • src/ui/pages/pos.html line 218-230: .receipt-items-table                                          

Shared Properties:                                                                                   

 • Semantic <table> element                                                                          
 • Header row with Product, Qty, Price, Subtotal columns                                             
 • Right-aligned numeric columns                                                                     
 • Bottom border on rows                                                                             

Differences:                                                                                         

 • Uses actual <table> instead of flexbox                                                            
 • Different column structure than cart items                                                        
 • Read-only display (no quantity controls)                                                          

Issues:                                                                                              

 • No shared table styling with other potential tables                                               
 • Table styles are scoped to receipt modal                                                          

Reuse Opportunity:                                                                                   

 • Create a reusable .data-table CSS class for all tables                                            
 • Standardize table header and cell styling                                                         

-----------------------------------------------------------------------------------------------------


Forms                                                                                                

Search Input                                                                                         

Locations:                                                                                           

 • src/ui/pages/pos.html line 60-66: #product-search-input                                           

Shared Properties:                                                                                   

 • Full-width input                                                                                  
 • Border: 2px solid #e0e0e0                                                                         
 • Border radius: 8px                                                                                
 • Focus state: blue border                                                                          
 • Clear button on right                                                                             

Differences:                                                                                         

 • Only one search input in POS page                                                                 

Issues:                                                                                              

 • No reusable search input component                                                                
 • Clear button visibility toggled manually                                                          

Reuse Opportunity:                                                                                   

 • Create a reusable search input component with built-in clear functionality                        

Payment Amount Input                                                                                 

Locations:                                                                                           

 • src/ui/pages/pos.html line 371-379: #payment-amount                                               

Shared Properties:                                                                                   

 • Number input with currency symbol prefix                                                          
 • Border: 2px solid #e0e0e0                                                                         
 • Border radius: 8px                                                                                
 • Focus state: blue border                                                                          
 • Bold font weight                                                                                  

Differences:                                                                                         

 • Only used in payment modal                                                                        

Issues:                                                                                              

 • No reusable currency input component                                                              
 • Currency symbol is hardcoded "KES"                                                                

Reuse Opportunity:                                                                                   

 • Create a .currency-input component with configurable currency symbol                              

Credit Notes Textarea                                                                                

Locations:                                                                                           

 • src/ui/pages/pos.html line 413: #credit-notes                                                     

Shared Properties:                                                                                   

 • Full-width textarea                                                                               
 • Border: 2px solid #e0e0e0                                                                         
 • Border radius: 8px                                                                                
 • Focus state: blue border                                                                          

Differences:                                                                                         

 • Only used in credit payment section                                                               

Issues:                                                                                              

 • No reusable form input pattern                                                                    

Reuse Opportunity:                                                                                   

 • Create a .form-input base class for all form elements                                             

Customer Select                                                                                      

Locations:                                                                                           

 • src/ui/pages/pos.html line 405: #credit-customer-select                                           

Shared Properties:                                                                                   

 • Full-width select                                                                                 
 • Border: 2px solid #e0e0e0                                                                         
 • Border radius: 8px                                                                                
 • Focus state: blue border                                                                          

Differences:                                                                                         

 • Only used in credit payment section                                                               

Issues:                                                                                              

 • No reusable select component                                                                      

Reuse Opportunity:                                                                                   

 • Create a .form-select base class                                                                  

-----------------------------------------------------------------------------------------------------


Modals                                                                                               

Payment Modal                                                                                        

Locations:                                                                                           

 • src/ui/pages/pos.html line 168-248: #paymentModalContent                                          

Shared Properties:                                                                                   

 • Hidden content div (display:none)                                                                 
 • Opened via Modal.open() with title and content                                                    
 • Contains: total display, payment methods, amount input, change display, credit section, summary,  
   action buttons                                                                                    
 • Loading overlay for async operations                                                              

Differences:                                                                                         

 • Only one payment modal instance                                                                   

Issues:                                                                                              

 • Modal content is embedded in pos.html rather than a separate template                             
 • Payment modal logic (PaymentModal) is in the same <script> as POS page                            
 • No standard modal structure across the app                                                        

Reuse Opportunity:                                                                                   

 • Extract payment modal to a separate file                                                          
 • Create a standard modal template pattern                                                          

Receipt Modal                                                                                        

Locations:                                                                                           

 • src/ui/pages/pos.html line 195-258: #salesModalContent                                            

Shared Properties:                                                                                   

 • Hidden content div (display:none)                                                                 
 • Opened via Modal.open()                                                                           
 • Contains: header info, items table, total section, action buttons                                 

Differences:                                                                                         

 • Different structure than payment modal                                                            
 • Uses table for items instead of list                                                              

Issues:                                                                                              

 • Receipt modal content is embedded in pos.html                                                     
 • Duplicate receipt display logic (also in CheckoutService._showReceipt())                          

Reuse Opportunity:                                                                                   

 • Extract receipt modal to a separate file                                                          
 • Create a reusable receipt display component                                                       

Modal Action Buttons Pattern                                                                         

Locations:                                                                                           

 • src/ui/pages/pos.html line 243-247: Payment modal actions                                         
 • src/ui/pages/pos.html line 252-257: Receipt modal actions                                         

Shared Properties:                                                                                   

 • Two buttons: Cancel/Close (secondary) and Confirm/Print (primary)                                 
 • Flex layout with gap                                                                              
 • Buttons use modal-btn classes                                                                     

Differences:                                                                                         

 • Payment modal: Cancel + Complete Sale                                                             
 • Receipt modal: Print Receipt + Close                                                              
 • Button order differs (secondary then primary vs primary then secondary)                           

Issues:                                                                                              

 • Inconsistent button order between modals                                                          
 • modal-btn classes are not defined in CSS (likely from modalService)                               

Reuse Opportunity:                                                                                   

 • Standardize modal action bar pattern                                                              
 • Define consistent button order (Cancel on left, Confirm on right)                                 

-----------------------------------------------------------------------------------------------------


Headers                                                                                              

Page Header                                                                                          

Locations:                                                                                           

 • src/ui/pages/pos.html line 44-51: .pos-header                                                     

Shared Properties:                                                                                   

 • Flexbox layout with space-between                                                                 
 • Title (h2) on left                                                                                
 • Action button on right                                                                            
 • Bottom margin                                                                                     

Differences:                                                                                         

 • Only one page header in POS                                                                       

Issues:                                                                                              

 • No reusable page header component                                                                 
 • Header styling is specific to POS layout                                                          

Reuse Opportunity:                                                                                   

 • Create a .page-header component for consistent page titles across the app                         

Cart Header                                                                                          

Locations:                                                                                           

 • src/ui/pages/pos.html line 283-286: .cart-header                                                  

Shared Properties:                                                                                   

 • Flexbox layout with space-between                                                                 
 • Title on left                                                                                     
 • Item count on right                                                                               
 • Bottom border                                                                                     
 • White background                                                                                  

Differences:                                                                                         

 • Only used in cart section                                                                         

Issues:                                                                                              

 • No reusable section header pattern                                                                

Reuse Opportunity:                                                                                   

 • Create a .section-header component                                                                

Receipt Header Info                                                                                  

Locations:                                                                                           

 • src/ui/pages/pos.html line 199-210: .receipt-header-info                                          

Shared Properties:                                                                                   

 • Grid of label-value pairs                                                                         
 • Gray background                                                                                   
 • Rounded corners                                                                                   

Differences:                                                                                         

 • Only used in receipt modal                                                                        

Issues:                                                                                              

 • No reusable info display pattern                                                                  

Reuse Opportunity:                                                                                   

 • Create a .info-grid component for displaying key-value pairs                                      

-----------------------------------------------------------------------------------------------------


Action Bars                                                                                          

Checkout Actions                                                                                     

Locations:                                                                                           

 • src/ui/pages/pos.html line 168-172: .checkout-actions                                             

Shared Properties:                                                                                   

 • Full-width button                                                                                 
 • Top border                                                                                        
 • Padding                                                                                           

Differences:                                                                                         

 • Only one checkout action bar                                                                      

Issues:                                                                                              

 • No reusable action bar pattern                                                                    

Reuse Opportunity:                                                                                   

 • Create a .action-bar component for bottom-of-section actions                                      

POS Header Actions                                                                                   

Locations:                                                                                           

 • src/ui/pages/pos.html line 48-50: .pos-actions                                                    

Shared Properties:                                                                                   

 • Action button aligned right in header                                                             

Differences:                                                                                         

 • Only one action in POS header                                                                     

Issues:                                                                                              

 • No reusable header action pattern                                                                 

Reuse Opportunity:                                                                                   

 • Create a .header-actions container pattern                                                        

-----------------------------------------------------------------------------------------------------


Cart Patterns                                                                                        

Cart State Management                                                                                

Locations:                                                                                           

 • src/ui/state/cartState.html: CartState object                                                     
 • src/ui/services/cartService.html: CartService object                                              
 • src/ui/services/pricingService.html: PricingService object                                        
 • src/ui/pages/pos.html: CartTable, TotalsPanel, PaymentModal                                       

Shared Properties:                                                                                   

 • Event-driven architecture using EventBus                                                          
 • State in CartState, logic in CartService, calculations in PricingService                          
 • UI components subscribe to events                                                                 

Differences:                                                                                         

 • CartService handles add/remove/update/clear                                                       
 • PricingService handles recalculation                                                              
 • CartState is pure data                                                                            
 • UI components (CartTable, TotalsPanel) are separate                                               

Issues:                                                                                              

 • CartService.add() directly mutates CartState.items (should go through a method)                   
 • CartService calls PricingService.recalculate() directly (tight coupling)                          
 • CartService calls Toast.warning() directly (UI concern in service)                                
 • CartService.updateQuantity() has UI logic (Toast warning)                                         

Reuse Opportunity:                                                                                   

 • This pattern is well-structured and could serve as a template for other modules                   
 • Consider making CartService event-driven instead of calling services directly                     

Cart Item Display                                                                                    

Locations:                                                                                           

 • src/ui/pages/pos.html line 296-330: Cart item HTML in CartTable.render()                          
 • src/ui/components/cartItemRow.html: CartItemRow.render() (duplicate)                              

Shared Properties:                                                                                   

 • Product name, price per unit                                                                      
 • Quantity controls (-, number, +)                                                                  
 • Line total                                                                                        
 • Remove button                                                                                     

Differences:                                                                                         

 • Duplicate implementations                                                                         

Issues:                                                                                              

 • Duplicate code                                                                                    
 • cartItemRow.html may be dead code                                                                 

Reuse Opportunity:                                                                                   

 • Consolidate into single CartTable component                                                       
 • Remove cartItemRow.html                                                                           

Empty Cart State                                                                                     

Locations:                                                                                           

 • src/ui/pages/pos.html line 290-295: #cart-empty                                                   

Shared Properties:                                                                                   

 • Centered text                                                                                     
 • Icon                                                                                              
 • Title message                                                                                     
 • Hint text                                                                                         

Differences:                                                                                         

 • Only one empty state in POS                                                                       

Issues:                                                                                              

 • No reusable empty state component                                                                 

Reuse Opportunity:                                                                                   

 • Create a reusable .empty-state component with icon, title, and description slots                  

-----------------------------------------------------------------------------------------------------


Checkout Patterns                                                                                    

Checkout Flow                                                                                        

Locations:                                                                                           

 • src/ui/services/checkoutService.html: CheckoutService.process()                                   
 • src/ui/pages/pos.html: PaymentModal.confirm()                                                     

Shared Properties:                                                                                   

 • Validate cart → Prepare payload → API call → Success handling → Clear cart                        
 • Event-driven status updates                                                                       
 • Toast notifications for success/failure                                                           

Differences:                                                                                         

 • PaymentModal handles UI state (loading overlay, button states)                                    
 • CheckoutService handles business logic                                                            
 • Payment validation is split between PaymentModal._validatePayment() and CartService.validate()    

Issues:                                                                                              

 • Payment validation logic is in PaymentModal (UI component) rather than CheckoutService            
 • CheckoutService._preparePayload() reads from DOM for credit customer/notes (should use state)     
 • CheckoutService._showReceipt() and _showReceiptModal() are duplicate methods                      
 • CheckoutService.calculateChange() duplicates PricingService.calculateChange()                     

Reuse Opportunity:                                                                                   

 • Move payment validation to CheckoutService                                                        
 • Remove DOM access from CheckoutService                                                            
 • Consolidate receipt display methods                                                               
 • Remove duplicate calculateChange() from CheckoutService                                           

Payment Method Selection                                                                             

Locations:                                                                                           

 • src/ui/pages/pos.html line 346-400: PaymentModal methods                                          

Shared Properties:                                                                                   

 • Method buttons with icons                                                                         
 • Method-specific UI sections (cash input, credit section)                                          
 • Amount auto-fill for non-cash methods                                                             

Differences:                                                                                         

 • Cash: manual amount input with change calculation                                                 
 • M-Pesa: auto-filled, disabled input                                                               
 • Credit: auto-filled, customer selection required                                                  

Issues:                                                                                              

 • Payment method configuration (PAYMENT_METHODS) is in PaymentModal (UI component)                  
 • Method-specific logic is in _handleMethodChange() switch statement                                
 • Adding new payment method requires modifying multiple methods                                     

Reuse Opportunity:                                                                                   

 • Extract payment method configuration to a separate service                                        
 • Create a plugin architecture for payment methods                                                  

Loading State Pattern                                                                                

Locations:                                                                                           

 • src/ui/pages/pos.html line 173-179: #payment-loading-overlay                                      

Shared Properties:                                                                                   

 • Absolute positioned overlay                                                                       
 • Semi-transparent white background                                                                 
 • Centered spinner with text                                                                        
 • Controlled by _setLoading() method                                                                

Differences:                                                                                         

 • Only used in payment modal                                                                        

Issues:                                                                                              

 • No reusable loading overlay component                                                             
 • Spinner CSS is duplicated (.spinner class)                                                        

Reuse Opportunity:                                                                                   

 • Create a reusable .loading-overlay component                                                      
 • Create a reusable .spinner CSS class                                                              

-----------------------------------------------------------------------------------------------------


Search Patterns                                                                                      

Product Search                                                                                       

Locations:                                                                                           

 • src/ui/pages/pos.html line 56-72: Search input and results container                              
 • src/ui/pages/pos.html line 462-530: ProductSearch object                                          
 • src/ui/services/searchService.html: Search utility                                                

Shared Properties:                                                                                   

 • Debounced input (200ms)                                                                           
 • Client-side filtering                                                                             
 • Search results dropdown                                                                           
 • Clear functionality                                                                               
 • Barcode scanning integration                                                                      

Differences:                                                                                         

 • ProductSearch uses direct DOM manipulation                                                        
 • Search utility is generic and reusable                                                            
 • ProductSearch has its own filtering logic instead of using Search utility                         

Issues:                                                                                              

 • ProductSearch does not use the Search utility for filtering                                       
 • Search logic is duplicated (could use Search.filter())                                            
 • ProductSearch.search() directly manipulates DOM (should emit events)                              
 • ProductSearch.selectProduct() calls CartService.add() directly (tight coupling)                   

Reuse Opportunity:                                                                                   

 • Refactor ProductSearch to use Search utility                                                      
 • Make ProductSearch event-driven                                                                   
 • Extract search component to a reusable pattern                                                    

Barcode Scanner Integration                                                                          

Locations:                                                                                           

 • src/ui/services/scannerService.html: ScannerService                                               
 • src/ui/pages/pos.html line 447: Scanner enabled in POSPage.init()                                 

Shared Properties:                                                                                   

 • Keyboard wedge scanner support                                                                    
 • Buffer accumulation with timeout                                                                  
 • Enter key detection                                                                               
 • Callback on scan complete                                                                         

Differences:                                                                                         

 • Only used in POS page                                                                             

Issues:                                                                                              

 • Scanner callback directly calls ProductSearch.searchByBarcode()                                   
 • No event-based integration                                                                        

Reuse Opportunity:                                                                                   

 • Scanner could emit events instead of using callbacks                                              
 • Could be used in other pages (e.g., stock movements)                                              

-----------------------------------------------------------------------------------------------------


Navigation Patterns                                                                                  

Category Filter Navigation                                                                           

Locations:                                                                                           

 • src/ui/pages/pos.html line 67-69: .category-filters                                               
 • src/ui/pages/pos.html line 532-550: ProductSearch.filterByCategory()                              

Shared Properties:                                                                                   

 • Horizontal button list                                                                            
 • Active state highlighting                                                                         
 • Dynamic rendering from backend data                                                               

Differences:                                                                                         

 • Only used in POS page                                                                             

Issues:                                                                                              

 • Filter buttons are dynamically generated but initial "All" button is hardcoded                    
 • No reusable filter bar component                                                                  

Reuse Opportunity:                                                                                   

 • Create a reusable .filter-bar component with active state management                              

-----------------------------------------------------------------------------------------------------


Summary of Key Findings                                                                              

Critical Duplications:                                                                               

 1 Cart item HTML generation in pos.html and cartItemRow.html                                        
 2 calculateChange() in CheckoutService and PricingService                                           
 3 Receipt display methods in CheckoutService                                                        
 4 Payment method button CSS defined twice                                                           

Tight Coupling Issues:                                                                               

 1 CartService calls PricingService, Toast, and EventBus directly                                    
 2 ProductSearch calls CartService and POSPage directly                                              
 3 CheckoutService reads from DOM                                                                    
 4 PaymentModal contains business logic                                                              

Missing Abstractions:                                                                                

 1 No reusable button classes (.btn-primary, .btn-secondary, .btn-danger)                            
 2 No reusable form input classes (.form-input, .form-select)                                        
 3 No reusable table component (.data-table)                                                         
 4 No reusable empty state component                                                                 
 5 No reusable loading overlay component                                                             
 6 No reusable page header component                                                                 
 7 No reusable search component                                                                      

Architecture Opportunities:                                                                          

 1 Event-driven communication between services and UI                                                
 2 Plugin architecture for payment methods                                                           
 3 Centralized validation service                                                                    
 4 Component-based UI rendering (instead of direct DOM manipulation)  