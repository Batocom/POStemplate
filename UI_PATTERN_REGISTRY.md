# UI Pattern Registry                                                                                
                                                                                                     
## Layout Patterns                                                                                   
                                                                                                     
### Standard Page Layout                                                                             
                                                                                                     
**Used In:**                                                                                         
- sales.html                                                                                         
- categories.controller.html                                                                         
- units.controller.html                                                                              
- products.controller.html                                                                           
- settings.html                                                                                      
- stockMovements.controller.html                                                                     
                                                                                                     
**Responsibilities:**                                                                                
- Provide a consistent page structure with a header area (title, subtitle, action button) and a      
content area (table or card container).                                                              
- Allow the action button to trigger a modal for creating new records.                               
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<div class="flex items-center justify-between">                                                      
  <div>                                                                                              
    <h1 class="text-2xl font-bold">Title</h1>                                                        
    <p class="text-gray-500">Subtitle</p>                                                            
  </div>                                                                                             
  <button class="bg-blue-600 text-white px-4 py-2 rounded">Action</button>                           
</div>                                                                                               
<div class="bg-white rounded shadow p-4">                                                            
  <!-- table or content -->                                                                          
</div>                                                                                               
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Extract into a reusable page-header component and a card-container component.                      
- Standardize padding (currently p-4 in most pages, p-6 in settings).                                
- Ensure the action button uses the same vertical padding as other primary buttons (py-2 vs py-3).   
                                                                                                     
**Reuse Opportunities:**                                                                             
- 6 instances of identical header structure.                                                         
- 5 instances of identical card wrapper.                                                             
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
### Dashboard Layout                                                                                 
                                                                                                     
**Used In:**                                                                                         
- dashboard.html                                                                                     
                                                                                                     
**Responsibilities:**                                                                                
- Display summary cards (total sales, products, categories) and a recent sales table.                
- Provide a quick overview of key metrics.                                                           
                                                                                                     
**Shared Structure:**                                                                                
- A grid of stat cards (each with icon, value, label).                                               
- A table of recent sales below the cards.                                                           
                                                                                                     
**Migration Notes:**                                                                                 
- The stat cards could be extracted into a reusable metric-card component.                           
- The recent sales table could reuse the Standard CRUD Table pattern.                                
                                                                                                     
**Reuse Opportunities:**                                                                             
- Metric cards could be reused on other summary views (e.g., stock dashboard).                       
                                                                                                     
**Migration Priority:** Low                                                                          
                                                                                                     
---                                                                                                  
                                                                                                     
## Navigation Patterns                                                                               
                                                                                                     
### Sidebar Navigation                                                                               
                                                                                                     
**Used In:**                                                                                         
- app-shell.html (sidebar section)                                                                   
                                                                                                     
**Responsibilities:**                                                                                
- Provide persistent navigation across the application.                                              
- Highlight the current active page.                                                                 
- Collapse into an overlay drawer on mobile.                                                         
                                                                                                     
**Shared Structure:**                                                                                
- A fixed-width sidebar (256px desktop, 280px mobile) containing navigation links with icons.        
- An overlay that appears on mobile when the sidebar is open.                                        
                                                                                                     
**Migration Notes:**                                                                                 
- Add an active page indicator (currently missing).                                                  
- Add a transition animation for the overlay (currently instant display:block/none).                 
- Ensure hover states do not “stick” on touch devices (use @media (hover: hover)).                   
- Add :active state for touch feedback.                                                              
                                                                                                     
**Reuse Opportunities:**                                                                             
- The sidebar is a single instance; its structure is not duplicated elsewhere.                       
                                                                                                     
**Migration Priority:** High (responsive behavior)                                                   
                                                                                                     
---                                                                                                  
                                                                                                     
### Topbar Layout                                                                                    
                                                                                                     
**Used In:**                                                                                         
- app-shell.html (topbar section)                                                                    
                                                                                                     
**Responsibilities:**                                                                                
- Display the application logo, user info, and a mobile menu toggle button.                          
- Provide a consistent top bar across all pages.                                                     
                                                                                                     
**Shared Structure:**                                                                                
- A horizontal bar with logo on the left, user avatar/name on the right, and a hamburger button for  
mobile.                                                                                              
                                                                                                     
**Migration Notes:**                                                                                 
- Replace inline SVG styles with CSS classes.                                                        
- Ensure the topbar height is consistent (currently 80px desktop, may differ on mobile).             
                                                                                                     
**Reuse Opportunities:**                                                                             
- Single instance; no duplication.                                                                   
                                                                                                     
**Migration Priority:** Low                                                                          
                                                                                                     
---                                                                                                  
                                                                                                     
## Table Patterns                                                                                    
                                                                                                     
### Standard CRUD Table                                                                              
                                                                                                     
**Used In:**                                                                                         
- categories.controller.html                                                                         
- units.controller.html                                                                              
- products.controller.html                                                                           
- stockMovements.controller.html                                                                     
- sales.html (recent sales table)                                                                    
- dashboard.html (recent sales table)                                                                
                                                                                                     
**Responsibilities:**                                                                                
- Display a list of records with columns for each field.                                             
- Provide action links (Edit, Delete) for each row.                                                  
- Support loading, error, and empty states.                                                          
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<div class="bg-white rounded shadow p-4">                                                            
  <div id="loading">Loading...</div>                                                                 
  <div id="error" class="text-red-500">Error message</div>                                           
  <div id="empty" class="text-gray-500">No records found</div>                                       
  <table id="table">                                                                                 
    <thead>                                                                                          
      <tr>                                                                                           
        <th>Column1</th>                                                                             
        <th>Column2</th>                                                                             
        <th>Actions</th>                                                                             
      </tr>                                                                                          
    </thead>                                                                                         
    <tbody>                                                                                          
      <!-- rows rendered by JavaScript -->                                                           
    </tbody>                                                                                         
  </table>                                                                                           
</div>                                                                                               
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Extract into a reusable table-container component with loading, error, empty states.               
- Use the existing tableService.html (which already has sorting, pagination, search) instead of      
manual rendering.                                                                                    
- Add sticky table headers and sticky pagination/search.                                             
- Add responsive card transformation for mobile (see Mobile Table/Card Transformation pattern).      
                                                                                                     
**Reuse Opportunities:**                                                                             
- 6+ instances of identical wrapper HTML.                                                            
- 7+ loading state instances.                                                                        
- 6+ error state instances.                                                                          
- 2+ empty state instances.                                                                          
                                                                                                     
**Migration Priority:** High                                                                         
                                                                                                     
---                                                                                                  
                                                                                                     
### Mobile Table/Card Transformation                                                                 
                                                                                                     
**Used In:**                                                                                         
- Not yet implemented (currently no responsive table handling).                                      
                                                                                                     
**Responsibilities:**                                                                                
- Transform table rows into card-like layouts on small screens.                                      
- Provide horizontal scroll fallback with sticky first column for wide tables.                       
                                                                                                     
**Shared Structure:**                                                                                
- On viewports below 768px, each row becomes a card with stacked label-value pairs.                  
- On viewports below 480px, the card layout is the only option.                                      
                                                                                                     
**Migration Notes:**                                                                                 
- This pattern must be added to all CRUD tables.                                                     
- Use CSS media queries and a utility class (e.g., .table-card) to toggle between layouts.           
- Ensure touch targets (buttons, links) are at least 44px.                                           
                                                                                                     
**Reuse Opportunities:**                                                                             
- All CRUD tables will benefit from this pattern.                                                    
                                                                                                     
**Migration Priority:** High                                                                         
                                                                                                     
---                                                                                                  
                                                                                                     
## Form Patterns                                                                                     
                                                                                                     
### Standard CRUD Form                                                                               
                                                                                                     
**Used In:**                                                                                         
- categories.controller.html (modal form)                                                            
- units.controller.html (modal form)                                                                 
- products.controller.html (modal form)                                                              
- settings.html (inline form)                                                                        
                                                                                                     
**Responsibilities:**                                                                                
- Collect input fields for creating or editing a record.                                             
- Provide a submit button and a cancel button.                                                       
- Display validation errors inline.                                                                  
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<div class="mb-4">                                                                                   
  <label class="block text-gray-700">Field Name</label>                                              
  <input class="w-full border p-3 rounded" />                                                        
</div>                                                                                               
<button class="bg-blue-600 text-white px-4 py-3 rounded w-full">Save</button>                        
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Extract into a reusable form-field component with label, input, hint text, error state.            
- Standardize button padding (currently py-3 in modals, py-2 in page actions).                       
- Use the same input styling across all forms.                                                       
                                                                                                     
**Reuse Opportunities:**                                                                             
- 10+ instances of identical input styling.                                                          
- 6 form templates with identical structure.                                                         
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
### Modal Form                                                                                       
                                                                                                     
**Used In:**                                                                                         
- categories.controller.html                                                                         
- units.controller.html                                                                              
- products.controller.html                                                                           
- sales.html (receipt modal)                                                                         
- sales.modal.html (receipt modal)                                                                   
                                                                                                     
**Responsibilities:**                                                                                
- Display a form inside a modal overlay for creating or editing records.                             
- Provide a submit button and a cancel button.                                                       
- Handle loading state during submission.                                                            
                                                                                                     
**Shared Structure:**                                                                                
- A modal container with a header (title), body (form fields), and footer (buttons).                 
- The modal is opened/closed via the modal service.                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Consolidate the receipt modal into a single component (currently duplicated in sales.html and      
sales.modal.html with different class names).                                                        
- Ensure the modal uses the same form-field component as the Standard CRUD Form.                     
- Add overflow-x: auto to modal content for wide forms.                                              
                                                                                                     
**Reuse Opportunities:**                                                                             
- 5 instances of modal button pattern.                                                               
- 2 instances of receipt modal (should be 1).                                                        
                                                                                                     
**Migration Priority:** High (duplicate receipt modal)                                               
                                                                                                     
---                                                                                                  
                                                                                                     
## Modal Patterns                                                                                    
                                                                                                     
### Standard Modal                                                                                   
                                                                                                     
**Used In:**                                                                                         
- modalService.html (the modal service itself)                                                       
- sales.html (receipt modal)                                                                         
- sales.modal.html (receipt modal)                                                                   
- POS page (payment modal)                                                                           
                                                                                                     
**Responsibilities:**                                                                                
- Display content in an overlay with a backdrop.                                                     
- Support multiple sizes (small, medium, large, full).                                               
- Provide a close button and click-outside-to-close behavior.                                        
                                                                                                     
**Shared Structure:**                                                                                
- A fixed overlay with a centered content box.                                                       
- The content box has a max-width (e.g., 500px for medium) and max-height (90vh).                    
- The modal is opened/closed via JavaScript.                                                         
                                                                                                     
**Migration Notes:**                                                                                 
- Remove duplicate CSS in modalService.html (entire style block defined twice).                      
- Replace fixed pixel max-widths with fluid widths that respect viewport.                            
- Add overflow-x: auto to modal content.                                                             
- Ensure all modals use the same service (currently some modals are embedded directly in pages).     
                                                                                                     
**Reuse Opportunities:**                                                                             
- The modal service is the most reusable component; it should be used by all modals.                 
                                                                                                     
**Migration Priority:** High (duplicate CSS)                                                         
                                                                                                     
---                                                                                                  
                                                                                                     
### Confirmation Modal                                                                               
                                                                                                     
**Used In:**                                                                                         
- Not yet implemented (currently delete actions use a browser confirm dialog or no confirmation).    
                                                                                                     
**Responsibilities:**                                                                                
- Ask the user to confirm a destructive action (e.g., delete).                                       
- Provide “Cancel” and “Confirm” buttons.                                                            
                                                                                                     
**Shared Structure:**                                                                                
- A small modal with a warning icon, a message, and two buttons.                                     
                                                                                                     
**Migration Notes:**                                                                                 
- This pattern should be added to all delete actions.                                                
- It can reuse the Standard Modal component.                                                         
                                                                                                     
**Reuse Opportunities:**                                                                             
- All delete actions across categories, units, products, stock movements.                            
                                                                                                     
**Migration Priority:** Low                                                                          
                                                                                                     
---                                                                                                  
                                                                                                     
## Button Patterns                                                                                   
                                                                                                     
### Primary Action Button                                                                            
                                                                                                     
**Used In:**                                                                                         
- All CRUD pages (page action buttons)                                                               
- All modal forms (submit buttons)                                                                   
- Settings page (Save button)                                                                        
- POS page (Checkout button)                                                                         
                                                                                                     
**Responsibilities:**                                                                                
- Trigger the main action on the page or form (create, save, update, checkout).                      
- Be visually prominent (blue background, white text).                                               
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<button class="bg-blue-600 text-white px-4 py-2 rounded">Action</button>                             
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Standardize vertical padding (currently py-2 in page actions, py-3 in modal submit buttons, py-3   
with px-6 in settings).                                                                              
- Extract into a reusable button component with variants (primary, secondary, danger, text) and      
disabled state.                                                                                      
- Use the same border-radius (rounded vs rounded-lg).                                                
                                                                                                     
**Reuse Opportunities:**                                                                             
- 9+ instances of primary buttons with minor variations.                                             
- 4 instances of secondary/cancel buttons.                                                           
- 2 instances of danger/delete buttons.                                                              
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
### Secondary Button                                                                                 
                                                                                                     
**Used In:**                                                                                         
- Modal forms (Cancel button)                                                                        
- Settings page (Cancel button)                                                                      
                                                                                                     
**Responsibilities:**                                                                                
- Provide an alternative action (cancel, close).                                                     
- Be visually less prominent (gray background or outline).                                           
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<button class="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>                          
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Standardize with the Primary Action Button component.                                              
                                                                                                     
**Reuse Opportunities:**                                                                             
- 4 instances of secondary buttons.                                                                  
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
## Filter/Search Patterns                                                                            
                                                                                                     
### Standard Filter Bar                                                                              
                                                                                                     
**Used In:**                                                                                         
- POS page (product search input)                                                                    
- tableService.html (search input)                                                                   
                                                                                                     
**Responsibilities:**                                                                                
- Allow the user to filter a list of items by typing a search query.                                 
- Provide a clear button to reset the search.                                                        
- Debounce the search input to avoid excessive filtering.                                            
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<input type="text" placeholder="Search..." class="w-full border p-2 rounded" />                      
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Extract into a reusable search-input component with debounce and clear functionality.              
- Ensure the search input is accessible (label, aria attributes).                                    
                                                                                                     
**Reuse Opportunities:**                                                                             
- Used in table service and POS page; could be used in all CRUD tables.                              
                                                                                                     
**Migration Priority:** Low                                                                          
                                                                                                     
---                                                                                                  
                                                                                                     
## POS Patterns                                                                                      
                                                                                                     
### Product Grid                                                                                     
                                                                                                     
**Used In:**                                                                                         
- POS page (product listing area)                                                                    
                                                                                                     
**Responsibilities:**                                                                                
- Display products in a grid layout with image, name, and price.                                     
- Allow the user to tap/click a product to add it to the cart.                                       
- Support filtering by category and search.                                                          
                                                                                                     
**Shared Structure:**                                                                                
- A grid of product cards (each card is a touch target).                                             
- A category filter bar above the grid.                                                              
- A search input above the grid.                                                                     
                                                                                                     
**Migration Notes:**                                                                                 
- Ensure touch targets are at least 44px (currently product cards may be too small on mobile).       
- Add responsive grid columns (1 column on mobile, 2 on tablet, 3-4 on desktop).                     
                                                                                                     
**Reuse Opportunities:**                                                                             
- This pattern is specific to the POS page; no duplication elsewhere.                                
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
### Cart Item Row                                                                                    
                                                                                                     
**Used In:**                                                                                         
- POS page (cart area)                                                                               
- cartItemRow.html (separate utility)                                                                
                                                                                                     
**Responsibilities:**                                                                                
- Display a single item in the cart with product name, quantity, unit price, and total.              
- Provide quantity increment/decrement buttons and a remove button.                                  
                                                                                                     
**Shared Structure:**                                                                                
```html                                                                                              
<div class="cart-item">                                                                              
  <span class="cart-item__name">Product Name</span>                                                  
  <div class="cart-item__controls">                                                                  
    <button class="cart-item__qty-btn">-</button>                                                    
    <span class="cart-item__qty">1</span>                                                            
    <button class="cart-item__qty-btn">+</button>                                                    
  </div>                                                                                             
  <span class="cart-item__price">$10.00</span>                                                       
  <button class="cart-item__remove">×</button>                                                       
</div>                                                                                               
```                                                                                                  
                                                                                                     
**Migration Notes:**                                                                                 
- Consolidate into a single component (currently duplicated in pos.html and cartItemRow.html).       
- Ensure quantity buttons are at least 44px (currently 28px desktop, 24px mobile).                   
                                                                                                     
**Reuse Opportunities:**                                                                             
- 2 implementations (should be 1).                                                                   
                                                                                                     
**Migration Priority:** High (duplicate)                                                             
                                                                                                     
---                                                                                                  
                                                                                                     
### Checkout Panel                                                                                   
                                                                                                     
**Used In:**                                                                                         
- POS page (right panel)                                                                             
                                                                                                     
**Responsibilities:**                                                                                
- Display the cart summary (subtotal, tax, total).                                                   
- Provide a checkout button that opens the payment modal.                                            
- Show the selected payment method and any discount/tax adjustments.                                 
                                                                                                     
**Shared Structure:**                                                                                
- A fixed-width panel (420px) on desktop, stacked below the product grid on mobile.                  
- Contains cart items list, totals section, and checkout button.                                     
                                                                                                     
**Migration Notes:**                                                                                 
- Replace fixed width (420px) with responsive sizing (full width on mobile, 420px on desktop).       
- Add overflow handling for long cart item lists.                                                    
- Ensure the checkout button is sticky at the bottom on mobile.                                      
                                                                                                     
**Reuse Opportunities:**                                                                             
- This pattern is specific to the POS page; no duplication elsewhere.                                
                                                                                                     
**Migration Priority:** Medium                                                                       
                                                                                                     
---                                                                                                  
                                                                                                     
## Notification Patterns                                                                             
                                                                                                     
### Toast Notification                                                                               
                                                                                                     
**Used In:**                                                                                         
- toastService.html                                                                                  
                                                                                                     
**Responsibilities:**                                                                                
- Display a brief, non-blocking message to the user (success, error, info).                          
- Auto-dismiss after a timeout (300ms animation, 3-5 seconds visible).                               
- Support multiple simultaneous toasts.                                                              
                                                                                                     
**Shared Structure:**                                                                                
- A fixed container at the top-right (or top-center on mobile) that holds toast elements.            
- Each toast has an icon, message, and close button.                                                 
- Toasts slide in/out with CSS animations.                                                           
                                                                                                     
**Migration Notes:**                                                                                 
- Replace inline style manipulation with CSS classes.                                                
- Ensure the toast container does not overlap with the topbar on mobile.                             
- Standardize animation duration (currently 300ms; modal uses 200ms).                                
                                                                                                     
**Reuse Opportunities:**                                                                             
- The toast service is already a reusable component; no duplication.                                 
                                                                                                     
**Migration Priority:** Low                                                                          
                                                                                                     
---                                                                                                  
                                                                                                     
## Responsive Behavior Patterns                                                                      
                                                                                                     
### Sidebar Collapse                                                                                 
                                                                                                     
**Used In:**                                                                                         
- app-shell.html (sidebar)                                                                           
                                                                                                     
**Responsibilities:**                                                                                
- On viewports below 768px, the sidebar becomes a hidden overlay that slides in from the left.       
- A toggle button (hamburger) in the topbar opens/closes the sidebar.                                
- The overlay has a semi-transparent backdrop.                                                       
                                                                                                     
**Shared Structure:**                                                                                
- Desktop: sidebar is always visible (fixed position).                                               
- Mobile: sidebar is hidden by default, shown when a CSS class (e.g., .sidebar--open) is applied.    
- The overlay backdrop is a separate element that fades in/out.                                      
                                                                                                     
**Migration Notes:**                                                                                 
- Add a transition animation for the overlay (currently instant display:block/none).                 
- Ensure the sidebar closes with a transition delay (currently instant).                             
- Add @media (hover: hover) to distinguish hover-capable devices.                                    
                                                                                                     
**Reuse Opportunities:**                                                                             
- Single instance; no duplication.                                                                   
                                                                                                     
**Migration Priority:** High (responsive behavior)                                                   
                                                                                                     
---                                                                                                  
                                                                                                     
### Table Stack Pattern                                                                              
                                                                                                     
**Used In:**                                                                                         
- Not yet implemented (currently no responsive table handling).                                      
                                                                                                     
**Responsibilities:**                                                                                
- On viewports below 768px, transform a table into a stacked card layout where each row becomes a    
card with label-value pairs.                                                                         
- On viewports below 480px, the stacked layout is the only option.                                   
                                                                                                     
**Shared Structure:**                                                                                
- Use CSS media queries to toggle between table and card layouts.                                    
- Each card contains the same data as a table row, but displayed vertically.                         
                                                                                                     
**Migration Notes:**                                                                                 
- This pattern must be added to all CRUD tables.                                                     
- Ensure touch targets (buttons, links) are at least 44px.                                           
- Provide a visual indicator for horizontal scroll (shadow/gradient) if the table is not transformed.
                                                                                                     
**Reuse Opportunities:**                                                                             
- All CRUD tables will benefit from this pattern.                                                    
                                                                                                     
**Migration Priority:** High                                                                         
                                                                                                     
---                                                                                                  
                                                                                                     
## Summary of Migration Priorities                                                                   
                                                                                                     
| Priority | Patterns |                                                                              
|----------|----------|                                                                              
| High     | Standard CRUD Table, Mobile Table/Card Transformation, Modal Form (receipt duplication),
Standard Modal (duplicate CSS), Cart Item Row (duplicate), Sidebar Collapse, Table Stack Pattern |   
| Medium   | Standard Page Layout, Standard CRUD Form, Primary Action Button, Secondary Button,      
Product Grid, Checkout Panel |                                                                       
| Low      | Dashboard Layout, Topbar Layout, Confirmation Modal, Standard Filter Bar, Toast         
Notification | 