Component Pattern Audit

Buttons                                                                                              

Pattern: Primary Action Button                                                                       

Locations:                                                                                           

 • src/ui/pages/login.html (line 30): Login button with w-full text-white p-3 rounded and inline     
   background: var(--color-primary)                                                                  
 • src/ui/app/app.html (line 155): Bulk delete button with bg-red-600 text-white px-4 py-2 rounded   
   disabled:opacity-50                                                                               

Shared Properties:                                                                                   

 • White text                                                                                        
 • Rounded corners                                                                                   
 • Padding on y-axis                                                                                 
 • Full width or inline-block                                                                        

Differences:                                                                                         

 • Login uses inline style for background; bulk delete uses Tailwind-like class bg-red-600           
 • Login uses p-3 (12px padding); bulk delete uses px-4 py-2 (16px horizontal, 8px vertical)         
 • Login has no disabled state; bulk delete has disabled:opacity-50                                  
 • Login is full width; bulk delete is inline                                                        

Issues:                                                                                              

 • No reusable button component exists                                                               
 • Inconsistent padding values (p-3 vs px-4 py-2)                                                    
 • Inconsistent color application (inline style vs class)                                            
 • No hover states defined for primary buttons                                                       
 • No button size variants                                                                           

Reuse Opportunity:                                                                                   

 • Create a .btn base class with variants: .btn--primary, .btn--danger, .btn--ghost                  
 • Standardize padding: --btn-padding-y: 8px; --btn-padding-x: 16px;                                 
 • Use CSS variable var(--color-primary) for primary button background                               

-----------------------------------------------------------------------------------------------------

Pattern: Sidebar Navigation Button                                                                   

Locations:                                                                                           

 • src/ui/components/sidebar.html (lines 12-26): 8 navigation buttons with class sidebar__nav-btn    
 • src/ui/styles/responsive.html (lines 62-69): .sidebar__nav-btn styles                             

Shared Properties:                                                                                   

 • Full width                                                                                        
 • Left-aligned text                                                                                 
 • Padding: 10px 12px                                                                                
 • Border radius: 6px                                                                                
 • Background: none                                                                                  
 • Border: none                                                                                      
 • White text color                                                                                  
 • Font size: 0.875rem                                                                               
 • Margin bottom: 4px                                                                                
 • Hover background: var(--color-sidebar-hover)                                                      

Differences:                                                                                         

 • Each button has different emoji prefix and text label                                             
 • No active/selected state styling                                                                  

Issues:                                                                                              

 • No active state indicator                                                                         
 • No icon component separation (emoji mixed with text)                                              
 • No keyboard navigation support                                                                    

Reuse Opportunity:                                                                                   

 • Extract as .sidebar-nav-btn component with active state                                           
 • Separate icon from text using <span class="sidebar-nav-btn__icon"> and <span                      
   class="sidebar-nav-btn__label">                                                                   

-----------------------------------------------------------------------------------------------------

Pattern: Logout Button                                                                               

Locations:                                                                                           

 • src/ui/components/topbar.html (line 18): <button onclick="logout()"                               
   class="topbar__logout">Logout</button>                                                            
 • src/ui/styles/responsive.html (lines 98-105): .topbar__logout and .topbar__logout:hover styles    

Shared Properties:                                                                                   

 • Background: var(--color-logout-bg) (#ef4444)                                                      
 • White text                                                                                        
 • Padding: 6px 12px                                                                                 
 • Border radius: 6px                                                                                
 • Font size: 0.875rem                                                                               
 • Hover background: var(--color-logout-hover-bg) (#dc2626)                                          

Differences:                                                                                         

 • Only used once in the topbar                                                                      

Issues:                                                                                              

 • No size variants                                                                                  
 • No icon support                                                                                   
 • Only used in one location but could be reused in settings or user menu                            

Reuse Opportunity:                                                                                   

 • Create a .btn--danger variant that matches this pattern                                           
 • Could be reused in settings page for "Delete Account" or similar destructive actions              

-----------------------------------------------------------------------------------------------------

Pattern: Hamburger Menu Button                                                                       

Locations:                                                                                           

 • src/ui/components/topbar.html (lines 5-11): <button onclick="UIService.toggleSidebar()"           
   id="hamburgerBtn" class="topbar__hamburger">                                                      
 • src/ui/styles/responsive.html (lines 76-85): .topbar__hamburger and .topbar__hamburger:hover      
   styles                                                                                            

Shared Properties:                                                                                   

 • Background: none                                                                                  
 • Border: none                                                                                      
 • Cursor: pointer                                                                                   
 • Padding: 8px                                                                                      
 • Font size: 1.5rem                                                                                 
 • Border radius: 6px                                                                                
 • Color: var(--color-topbar-hamburger) (#374151)                                                    
 • Hover background: var(--color-topbar-hamburger-hover-bg) (#f3f4f6)                                
 • Display: none on desktop, block on mobile                                                         

Differences:                                                                                         

 • Only used once                                                                                    

Issues:                                                                                              

 • Inline SVG for icon (not reusable)                                                                
 • No aria-expanded state management                                                                 
 • No animation for icon change (hamburger to close)                                                 

Reuse Opportunity:                                                                                   

 • Create a reusable .icon-btn component for icon-only buttons                                       
 • Extract SVG as a template or CSS background                                                       

-----------------------------------------------------------------------------------------------------


Tables                                                                                               

Pattern: Data Table with Actions                                                                     

Locations:                                                                                           

 • src/ui/app/app.html (lines 60-100): Sales table rendered via Table.render() with columns, actions,
   pagination, search                                                                                
 • src/ui/app/app.html (lines 170-220): Products table rendered via Table.render() with columns,     
   actions, selectable rows, pagination, search                                                      
 • src/ui/app/app.html (lines 230-280): Stock movements table rendered via Table.render() with       
   columns, pagination, search                                                                       
 • src/ui/pages/dashboard.html (lines 130-170): Low stock products table (hand-written HTML)         
 • src/ui/pages/dashboard.html (lines 175-215): Recent transactions table (hand-written HTML)        

Shared Properties:                                                                                   

 • Column headers with labels                                                                        
 • Data rows with alternating or bordered rows                                                       
 • Action buttons per row (Edit, Delete, Receipt)                                                    
 • Pagination (pageSize: 10)                                                                         
 • Search functionality (searchable: true)                                                           
 • Empty state message                                                                               

Differences:                                                                                         

 • Sales table uses Table.render() with columns config object                                        
 • Products table uses Table.render() with selectable: true and onSelectionChange callback           
 • Stock movements table uses Table.render() with product name lookup via productMap                 
 • Dashboard tables use hand-written HTML with <table>, <thead>, <tbody>                             
 • Dashboard tables have no pagination, search, or actions                                           
 • Column render functions are defined inline in each call                                           

Issues:                                                                                              

 • Dashboard tables bypass the reusable Table component entirely                                     
 • Column render functions are duplicated across table calls (e.g., currency formatting, status      
   badges)                                                                                           
 • No standardized column definition format across all tables                                        
 • Product name lookup logic is duplicated in stock movements table                                  
 • No sort indicators in column headers                                                              
 • No loading skeleton state                                                                         

Reuse Opportunity:                                                                                   

 • Migrate dashboard tables to use Table.render() component                                          
 • Extract common render functions: formatCurrency(), formatDate(), statusBadge()                    
 • Create column presets for common patterns (currency columns, date columns, status columns)        
 • Standardize onSelectionChange pattern for bulk actions                                            

-----------------------------------------------------------------------------------------------------

Pattern: Status Badge in Tables                                                                      

Locations:                                                                                           

 • src/ui/app/app.html (lines 80-85): Payment method status with color classes (text-green-600,      
   text-blue-600, etc.)                                                                              
 • src/ui/app/app.html (lines 195-205): Stock status with background color classes (bg-green-100     
   text-green-800, bg-yellow-100 text-yellow-800, bg-red-100 text-red-800)                           
 • src/ui/app/app.html (lines 245-255): Movement type status with color classes (text-red-600,       
   text-green-600, etc.)                                                                             
 • src/ui/pages/dashboard.html (lines 145-150): Low stock status with background color classes       
 • src/ui/pages/dashboard.html (lines 195-200): Payment method status with color classes             

Shared Properties:                                                                                   

 • Color-coded text or background based on value                                                     
 • Font weight: medium or bold                                                                       
 • Inline <span> elements                                                                            

Differences:                                                                                         

 • Stock status uses background color (bg-green-100 text-green-800); payment method uses text color  
   only (text-green-600)                                                                             
 • Stock status has rounded corners (px-2 py-1 rounded text-sm); payment method has no padding       
 • Movement type uses text color only; stock status uses background + text color                     
 • Dashboard duplicates the same patterns as app.html                                                

Issues:                                                                                              

 • No reusable badge component                                                                       
 • Inconsistent styling (background vs text-only)                                                    
 • Color mapping logic duplicated in every table render function                                     
 • No standardized status values (e.g., "In Stock", "Low Stock", "Out of Stock" repeated)            

Reuse Opportunity:                                                                                   

 • Create a .badge component with variants: .badge--success, .badge--warning, .badge--danger,        
   .badge--info                                                                                      
 • Create a renderStatusBadge(value, type) helper function                                           
 • Standardize status color mapping in a single configuration object                                 

-----------------------------------------------------------------------------------------------------


Forms                                                                                                

Pattern: Login Form                                                                                  

Locations:                                                                                           

 • src/ui/pages/login.html (lines 8-38): Login form with email, password, submit button              

Shared Properties:                                                                                   

 • Stacked layout with space-y-4                                                                     
 • Full-width inputs with w-full border p-3 rounded                                                  
 • Full-width submit button                                                                          
 • Centered card container                                                                           

Differences:                                                                                         

 • Only used once                                                                                    

Issues:                                                                                              

 • No form validation styling (error states, success states)                                         
 • No input labels (only placeholders)                                                               
 • No loading state on submit button                                                                 
 • No accessibility attributes (aria-label, aria-describedby)                                        
 • Inline style for button background instead of class                                               

Reuse Opportunity:                                                                                   

 • Create reusable .form-input, .form-label, .form-error components                                  
 • Create a .btn--loading state with spinner                                                         
 • Standardize form layout patterns for future forms (settings, user profile)                        

-----------------------------------------------------------------------------------------------------

Pattern: Search Input                                                                                

Locations:                                                                                           

 • src/ui/app/app.html (lines 60, 170, 230): searchable: true in Table.render() config               
 • src/ui/services/searchService.html: Search utility service                                        

Shared Properties:                                                                                   

 • Client-side filtering                                                                             
 • Debounced input handling                                                                          
 • Case-insensitive matching                                                                         

Differences:                                                                                         

 • Search is embedded in Table component; no standalone search bar component                         
 • No visual search input rendered in the provided files (search UI is inside Table component)       

Issues:                                                                                              

 • No standalone search bar component for use outside tables                                         
 • No search icon or clear button visible in provided code                                           
 • No keyboard shortcut support (e.g., Ctrl+F)                                                       

Reuse Opportunity:                                                                                   

 • Create a standalone .search-bar component with input, icon, clear button                          
 • Integrate with Table component via props                                                          
 • Add keyboard shortcut support                                                                     

-----------------------------------------------------------------------------------------------------


Modals                                                                                               

Pattern: Confirmation Modal                                                                          

Locations:                                                                                           

 • src/ui/app/app.html (line 155): await Modal.confirm('Delete ' + selectedIds.length + '            
   product(s)?')                                                                                     
 • src/ui/app/app.html (line 165): await Modal.confirm('Are you sure you want to delete this         
   product?')                                                                                        

Shared Properties:                                                                                   

 • Async confirmation dialog                                                                         
 • Returns boolean (true/false)                                                                      
 • Custom message text                                                                               

Differences:                                                                                         

 • Different message text                                                                            
 • No custom button labels                                                                           

Issues:                                                                                              

 • No custom button text support (e.g., "Yes, Delete" vs "Cancel")                                   
 • No danger variant for destructive actions                                                         
 • No modal component visible in provided files (Modal service implementation not shown)             

Reuse Opportunity:                                                                                   

 • Create modal variants: .modal--danger, .modal--warning                                            
 • Support custom confirm/cancel button text                                                         
 • Support custom icon or illustration                                                               

-----------------------------------------------------------------------------------------------------

Pattern: Receipt Modal                                                                               

Locations:                                                                                           

 • src/ui/app/app.html (line 110): await ReceiptService.show(saleId)                                 
 • src/ui/app/app.html (line 115): PrintService.printReceipt(window._currentReceiptData)             

Shared Properties:                                                                                   

 • Shows sale receipt details                                                                        
 • Has print button                                                                                  
 • Uses window._currentReceiptData for print                                                         

Differences:                                                                                         

 • Only used in sales context                                                                        

Issues:                                                                                              

 • Global variable window._currentReceiptData for data sharing                                       
 • No modal component visible in provided files                                                      
 • Tightly coupled to sales module                                                                   

Reuse Opportunity:                                                                                   

 • Create a reusable .receipt-modal component                                                        
 • Pass data via function parameters instead of global variable                                      
 • Support different receipt layouts (thermal, A4, email)                                            

-----------------------------------------------------------------------------------------------------


Headers                                                                                              

Pattern: Page Header with Title                                                                      

Locations:                                                                                           

 • src/ui/components/topbar.html (line 14): <div                                                     
   class="topbar__title">${State.currentPage?.toUpperCase() || "POS"}</div>                          
 • src/ui/pages/dashboard.html (lines 30, 40, 50, 60): Card headers with <h3 class="text-lg          
   font-semibold mb-4">                                                                              

Shared Properties:                                                                                   

 • Bold text                                                                                         
 • Uppercase or capitalized                                                                          
 • Margin bottom for spacing                                                                         

Differences:                                                                                         

 • Topbar title is uppercase and dynamic; card headers are static and sentence case                  
 • Topbar title uses font-size: 1.125rem; card headers use text-lg (1.125rem equivalent)             
 • Topbar title has no margin; card headers have mb-4                                                

Issues:                                                                                              

 • No standardized page header component                                                             
 • Inconsistent capitalization (uppercase vs sentence case)                                          
 • No breadcrumb support                                                                             
 • No action buttons in header                                                                       

Reuse Opportunity:                                                                                   

 • Create a .page-header component with title, subtitle, and actions slot                            
 • Standardize heading hierarchy: h1 for page title, h2 for section title, h3 for card title         

-----------------------------------------------------------------------------------------------------


Action Bars                                                                                          

Pattern: Bulk Action Bar                                                                             

Locations:                                                                                           

 • src/ui/app/app.html (lines 150-155): Bulk delete button above products table                      
 • src/ui/app/app.html (lines 155-160): onSelectionChange callback enabling/disabling button         

Shared Properties:                                                                                   

 • Positioned above table                                                                            
 • Disabled when no items selected                                                                   
 • Shows count of selected items                                                                     
 • Triggers confirmation modal                                                                       

Differences:                                                                                         

 • Only used in products table                                                                       
 • No "Select All" checkbox in header                                                                

Issues:                                                                                              

 • No reusable action bar component                                                                  
 • Button text hardcoded ("Delete Selected")                                                         
 • No loading state during bulk operation                                                            
 • No progress indicator for multi-item operations                                                   

Reuse Opportunity:                                                                                   

 • Create a .action-bar component with selected count, action buttons, and loading state             
 • Support multiple actions (delete, export, print)                                                  
 • Add "Select All" checkbox integration                                                             

-----------------------------------------------------------------------------------------------------


Cart Patterns                                                                                        

Pattern: Cart Item Row                                                                               

Locations:                                                                                           

 • src/ui/components/cartItemRow.html: Cart item row utility                                         
 • src/ui/services/cartService.html: Cart business logic                                             
 • src/ui/state/cartState.html: Cart state management                                                

Shared Properties:                                                                                   

 • Product name, quantity, price, total                                                              
 • Quantity adjustment controls                                                                      
 • Remove item button                                                                                
 • Real-time total calculation                                                                       

Differences:                                                                                         

 • Cart item row component exists but may not be actively used by pos.html (per POS_WORKFLOW.md)     

Issues:                                                                                              

 • Cart item row component may be unused or duplicated in pos.html                                   
 • No loading state for cart operations                                                              
 • No image support for products                                                                     
 • No variant support (size, color)                                                                  

Reuse Opportunity:                                                                                   

 • Ensure cartItemRow.html is the single source of truth for cart item rendering                     
 • Add product image thumbnail support                                                               
 • Add variant selector support                                                                      

-----------------------------------------------------------------------------------------------------


Checkout Patterns                                                                                    

Pattern: Payment Modal                                                                               

Locations:                                                                                           

 • src/ui/pages/pos.html: PaymentModal class (per POS_WORKFLOW.md)                                   
 • src/ui/services/checkoutService.html: Checkout orchestration                                      

Shared Properties:                                                                                   

 • Shows total amount                                                                                
 • Payment method selection (cash, card, transfer)                                                   
 • Amount input field                                                                                
 • Change calculation                                                                                
 • Complete sale button                                                                              

Differences:                                                                                         

 • Payment modal implementation is in pos.html (not shown in provided files)                         
 • Checkout service handles API calls and receipt display                                            

Issues:                                                                                              

 • Payment modal tightly coupled to POS page                                                         
 • No split payment support                                                                          
 • No payment confirmation step                                                                      
 • No receipt preview before completing sale                                                         

Reuse Opportunity:                                                                                   

 • Create a reusable .payment-modal component                                                        
 • Support multiple payment methods with configuration                                               
 • Add receipt preview before confirmation                                                           
 • Add payment retry logic                                                                           

-----------------------------------------------------------------------------------------------------


Navigation Patterns                                                                                  

Pattern: Sidebar Navigation                                                                          

Locations:                                                                                           

 • src/ui/components/sidebar.html (lines 1-28): Sidebar with header and nav buttons                  
 • src/ui/styles/responsive.html (lines 25-69): Sidebar styles for desktop and mobile                

Shared Properties:                                                                                   

 • Vertical navigation list                                                                          
 • Icon + text labels                                                                                
 • Active page indicator (missing)                                                                   
 • Mobile drawer behavior                                                                            
 • Close on navigation                                                                               

Differences:                                                                                         

 • Desktop sidebar is always visible; mobile sidebar is a drawer                                     
 • Desktop sidebar has no close button; mobile sidebar has close button                              
 • No active state styling                                                                           

Issues:                                                                                              

 • No active page indicator                                                                          
 • No sub-navigation support                                                                         
 • No collapse/expand animation for mobile                                                           
 • No keyboard navigation (arrow keys, tab order)                                                    
 • Emoji icons are not accessible (screen readers)                                                   

Reuse Opportunity:                                                                                   

 • Create a .nav-list component with active state                                                    
 • Add aria-current="page" for active link                                                           
 • Replace emoji with accessible icon system                                                         
 • Add keyboard navigation support                                                                   

-----------------------------------------------------------------------------------------------------

Pattern: Topbar Navigation                                                                           

Locations:                                                                                           

 • src/ui/components/topbar.html (lines 1-22): Topbar with hamburger, title, user info, logout       
 • src/ui/styles/responsive.html (lines 72-105): Topbar styles                                       

Shared Properties:                                                                                   

 • Fixed or sticky position                                                                          
 • Left section: hamburger + title                                                                   
 • Right section: user info + actions                                                                
 • Responsive: hamburger visible on mobile only                                                      

Differences:                                                                                         

 • Only used once                                                                                    

Issues:                                                                                              

 • No notification badge support                                                                     
 • No user menu dropdown                                                                             
 • No search bar in topbar                                                                           
 • No responsive title truncation                                                                    

Reuse Opportunity:                                                                                   

 • Create a .topbar component with slots for left, center, right sections                            
 • Add user dropdown menu component                                                                  
 • Add notification bell with badge                                                                  

-----------------------------------------------------------------------------------------------------


Empty States                                                                                         

Pattern: No Data Message                                                                             

Locations:                                                                                           

 • src/ui/app/app.html (lines 70, 180, 250): emptyMessage: 'No sales found', emptyMessage: 'No       
   products found', emptyMessage: 'No stock movements found'                                         
 • src/ui/pages/dashboard.html (lines 135, 180): <p class="text-gray-500">No low stock products</p>, 
   <p class="text-gray-500">No recent transactions</p>                                               

Shared Properties:                                                                                   

 • Gray text color (text-gray-500)                                                                   
 • Centered or inline text                                                                           
 • Descriptive message                                                                               

Differences:                                                                                         

 • Table component uses emptyMessage config property                                                 
 • Dashboard uses hardcoded HTML with text-gray-500 class                                            
 • No icon or illustration in empty states                                                           

Issues:                                                                                              

 • No reusable empty state component                                                                 
 • No icon or illustration support                                                                   
 • No action button in empty state (e.g., "Add your first product")                                  
 • Inconsistent implementation (config vs hardcoded)                                                 

Reuse Opportunity:                                                                                   

 • Create a .empty-state component with icon, title, description, and action button                  
 • Standardize empty state messages across all modules                                               
 • Add illustration or icon support                                                                  

-----------------------------------------------------------------------------------------------------


Summary of Key Findings                                                                              

                                                                                
 Pattern             Locations  Reuse Opportunity                               
 ────────────────────────────────────────────────────────────────────────────── 
 Primary Button      2          Create .btn base with variants                    
 Sidebar Nav Button  8          Extract as reusable component with active state   
 Logout Button       1          Create .btn--danger variant                       
 Hamburger Button    1          Create .icon-btn component                        
 Data Table          5          Standardize column config, extract render helpers 
 Status Badge        5          Create .badge component with variants             
 Login Form          1          Create reusable form components                   
 Search Input        3          Create standalone .search-bar component           
 Confirmation Modal  2          Create modal variants                             
 Receipt Modal       1          Create reusable receipt component                 
 Page Header         5          Create .page-header component                     
 Bulk Action Bar     1          Create .action-bar component                      
 Cart Item Row       1          Ensure single source of truth                     
 Payment Modal       1          Create reusable .payment-modal component          
 Sidebar Navigation  8          Add active state, keyboard nav                    
 Topbar Navigation   1          Add user menu, notifications                      
 Empty State         5          Create .empty-state component        