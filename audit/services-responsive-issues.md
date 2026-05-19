Component Pattern Audit                       
Buttons                                                                                              

Pattern: Primary Action Button                                                                       

Locations:                                                                                           

 • modalService.html – .modal-btn-primary (blue background, white text)                              
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – no primary button                                                             
 • tableService.html – no primary button (uses Tailwind classes text-blue-600 for action links)      

Shared Properties:                                                                                   

 • background: #2563eb                                                                               
 • color: white                                                                                      
 • border-radius: 6px                                                                                
 • padding: 8px 16px                                                                                 
 • font-size: 14px                                                                                   
 • font-weight: 500                                                                                  
 • cursor: pointer                                                                                   
 • border: none                                                                                      
 • transition: background 0.15s                                                                      

Differences:                                                                                         

 • tableService.html uses inline <button> with Tailwind classes (text-blue-600, mr-2) instead of a   
   reusable button class                                                                             
 • modalService.html has hover state (#1d4ed8); tableService.html has no hover state                 
 • modalService.html has disabled state via disabled attribute; tableService.html uses opacity-50    
   cursor-not-allowed classes                                                                        

Issues:                                                                                              

 • No shared button component; each service defines its own button styles                            
 • tableService.html action buttons are not styled as primary buttons (they are text links)          
 • Disabled state styling is inconsistent (attribute vs Tailwind classes)                            

Reuse Opportunity:                                                                                   

 • Extract a reusable <button> component with variants (primary, secondary, danger, text) and        
   disabled state                                                                                    

-----------------------------------------------------------------------------------------------------

Pattern: Secondary / Cancel Button                                                                   

Locations:                                                                                           

 • modalService.html – .modal-btn-secondary (gray background, dark text)                             
 • modalService.html – inline <style> block (same selector)                                          

Shared Properties:                                                                                   

 • background: #f3f4f6                                                                               
 • color: #374151                                                                                    
 • border-radius: 6px                                                                                
 • padding: 8px 16px                                                                                 
 • font-size: 14px                                                                                   
 • font-weight: 500                                                                                  
 • cursor: pointer                                                                                   
 • border: none                                                                                      

Differences:                                                                                         

 • Only used in modal confirm dialog; not used elsewhere                                             
 • No hover state defined in tableService.html                                                       

Issues:                                                                                              

 • Only one consumer (modal confirm)                                                                 
 • No hover state in tableService.html for secondary buttons                                         

Reuse Opportunity:                                                                                   

 • Could be reused for cancel buttons in forms, but currently no form component exists               

-----------------------------------------------------------------------------------------------------

Pattern: Danger / Delete Button                                                                      

Locations:                                                                                           

 • modalService.html – .modal-btn-danger (red background, white text)                                
 • modalService.html – inline <style> block (same selector)                                          

Shared Properties:                                                                                   

 • background: #ef4444                                                                               
 • color: white                                                                                      
 • border-radius: 6px                                                                                
 • padding: 8px 16px                                                                                 
 • font-size: 14px                                                                                   
 • font-weight: 500                                                                                  
 • cursor: pointer                                                                                   
 • border: none                                                                                      
 • hover state: #dc2626                                                                              

Differences:                                                                                         

 • Only used in modal confirm dialog                                                                 
 • No danger button in tableService.html or toastService.html                                        

Issues:                                                                                              

 • Only one consumer                                                                                 
 • No disabled state defined                                                                         

Reuse Opportunity:                                                                                   

 • Could be reused for delete actions in tables, but currently no delete button exists in            
   tableService.html                                                                                 

-----------------------------------------------------------------------------------------------------

Pattern: Close Button (Icon)                                                                         

Locations:                                                                                           

 • modalService.html – .modal-close-btn (× icon)                                                     
 • modalService.html – inline <style> block (same selector)                                          

Shared Properties:                                                                                   

 • background: none                                                                                  
 • border: none                                                                                      
 • font-size: 1.5rem                                                                                 
 • cursor: pointer                                                                                   
 • color: #6b7280                                                                                    
 • padding: 4px 8px                                                                                  
 • border-radius: 4px                                                                                
 • line-height: 1                                                                                    
 • hover state: background: #f3f4f6, color: #374151                                                  

Differences:                                                                                         

 • Only used in modal header                                                                         
 • No close button in toastService.html (toast auto-dismisses)                                       

Issues:                                                                                              

 • No close button in toast (by design)                                                              
 • No close button in table                                                                          

Reuse Opportunity:                                                                                   

 • Could be reused for dismissible banners or panels                                                 

-----------------------------------------------------------------------------------------------------

Pattern: Pagination Buttons                                                                          

Locations:                                                                                           

 • tableService.html – Prev/Next buttons, page number buttons                                        

Shared Properties:                                                                                   

 • padding: 8px 12px (Tailwind px-3 py-1)                                                            
 • border: 1px solid (Tailwind border)                                                               
 • border-radius: 4px (Tailwind rounded)                                                             
 • font-size: 14px (Tailwind text-sm)                                                                
 • font-weight: 500 (Tailwind font-medium)                                                           
 • cursor: pointer                                                                                   
 • Active state: background: #2563eb, color: white, border-color: #2563eb                            
 • Disabled state: opacity-50 cursor-not-allowed bg-gray-100 text-gray-400                           

Differences:                                                                                         

 • Uses Tailwind classes instead of raw CSS                                                          
 • No hover state defined for non-active buttons (Tailwind hover:bg-gray-100)                        
 • Active state uses shadow-sm (Tailwind)                                                            

Issues:                                                                                              

 • Inconsistent with modal button styling (Tailwind vs raw CSS)                                      
 • No shared pagination component                                                                    

Reuse Opportunity:                                                                                   

 • Could be extracted as a reusable pagination component                                             

-----------------------------------------------------------------------------------------------------


Tables                                                                                               

Pattern: Data Table with Sorting, Pagination, Search, Selection                                      

Locations:                                                                                           

 • tableService.html – entire Table service                                                          

Shared Properties:                                                                                   

 • Column headers with sort icons                                                                    
 • Row rendering with optional custom render function                                                
 • Pagination controls (page numbers, prev/next, page size selector)                                 
 • Search bar                                                                                        
 • Row selection (checkbox per row + select all)                                                     
 • Bulk actions bar (select all checkbox, selected count)                                            
 • Empty state message                                                                               
 • Action buttons per row                                                                            

Differences:                                                                                         

 • No other table implementation exists in the provided files                                        
 • tableService.html is the only table component                                                     

Issues:                                                                                              

 • No table component in modalService.html or toastService.html                                      
 • No table component in editService.html (edit service uses modal, not table)                       
 • No table component in uiService.html                                                              

Reuse Opportunity:                                                                                   

 • Table service is already reusable; could be used by other modules (products, sales, categories,   
   etc.)                                                                                             

-----------------------------------------------------------------------------------------------------


Forms                                                                                                

Pattern: Edit Form (via EditService)                                                                 

Locations:                                                                                           

 • editService.html – Edit.open() and Edit.submit()                                                  

Shared Properties:                                                                                   

 • Uses a template (templateId) for form HTML                                                        
 • Fetches data via fetchApi                                                                         
 • Populates form fields via populate(entity) callback                                               
 • Submits via updateApi with payload from getPayload() callback                                     
 • Shows loading state on submit button                                                              
 • Displays success/error toasts                                                                     
 • Closes modal on success                                                                           

Differences:                                                                                         

 • No other form implementation exists in the provided files                                         
 • editService.html is the only form service                                                         

Issues:                                                                                              

 • No form validation logic (relies on external validators)                                          
 • No form field component (uses raw HTML templates)                                                 
 • No form reset functionality                                                                       
 • No form dirty state tracking                                                                      

Reuse Opportunity:                                                                                   

 • Could be extended to support create forms (not just edit)                                         
 • Could be used by all entity modules (products, categories, units, etc.)                           

-----------------------------------------------------------------------------------------------------


Modals                                                                                               

Pattern: Modal Overlay with Header, Body, Actions                                                    

Locations:                                                                                           

 • modalService.html – Modal service (open, close, confirm, alert, loading)                          
 • editService.html – uses Modal.open() internally                                                   
 • modal.html – legacy placeholder (no functionality)                                                

Shared Properties:                                                                                   

 • Overlay with rgba(0,0,0,0.4) background                                                           
 • Content container with border-radius: 12px, max-width: 560px (default)                            
 • Header with title and close button                                                                
 • Body with content                                                                                 
 • Optional actions footer                                                                           
 • Sizes: sm (400px), md (560px), lg (720px), xl (960px), full (calc(100% - 32px))                   
 • Animations: fadeIn/fadeOut (200ms), slideIn/slideOut (200ms)                                      
 • Close on Escape key                                                                               
 • Close on outside click                                                                            
 • Loading state with spinner                                                                        

Differences:                                                                                         

 • editService.html uses Modal.open() but does not use Modal.confirm() or Modal.alert()              
 • editService.html manages its own loading state via submit button text change, not via             
   Modal.setLoading()                                                                                
 • editService.html does not use Modal.loading() for initial data fetch (uses Toast.error on failure)

Issues:                                                                                              

 • editService.html duplicates loading state management (button text vs modal spinner)               
 • editService.html does not use Modal.setLoading() during API call                                  
 • No modal component in tableService.html (table uses inline actions, not modals)                   
 • No modal component in toastService.html (toast is separate)                                       

Reuse Opportunity:                                                                                   

 • Modal service is already reusable; editService.html could be refactored to use Modal.setLoading() 
   and Modal.loading()                                                                               

-----------------------------------------------------------------------------------------------------


Headers                                                                                              

Pattern: Modal Header                                                                                

Locations:                                                                                           

 • modalService.html – .modal-header (title + close button)                                          

Shared Properties:                                                                                   

 • display: flex                                                                                     
 • justify-content: space-between                                                                    
 • align-items: center                                                                               
 • padding: 16px 24px                                                                                
 • border-bottom: 1px solid #e5e7eb                                                                  
 • Title: font-size: 1.25rem, font-weight: 700, color: #1f2937                                       
 • Close button: font-size: 1.5rem, color: #6b7280                                                   

Differences:                                                                                         

 • No other header pattern exists in the provided files                                              
 • tableService.html has no header (table is standalone)                                             
 • toastService.html has no header (toast is a single line)                                          

Issues:                                                                                              

 • No page-level header component                                                                    
 • No breadcrumb component                                                                           
 • No action bar header                                                                              

Reuse Opportunity:                                                                                   

 • Could be reused for page headers (title + actions)                                                

-----------------------------------------------------------------------------------------------------


Action Bars                                                                                          

Pattern: Bulk Selection Action Bar                                                                   

Locations:                                                                                           

 • tableService.html – bulk actions bar (select all checkbox + selected count)                       

Shared Properties:                                                                                   

 • display: flex                                                                                     
 • align-items: center                                                                               
 • gap: 16px (Tailwind gap-4)                                                                        
 • margin-bottom: 16px (Tailwind mb-4)                                                               
 • Select all checkbox                                                                               
 • Selected count text (text-sm text-gray-500)                                                       

Differences:                                                                                         

 • No other action bar exists in the provided files                                                  
 • modalService.html has no action bar (modal actions are in footer)                                 
 • editService.html has no action bar (edit form is in modal body)                                   

Issues:                                                                                              

 • No action bar component for page-level actions (e.g., "Add Product" button)                       
 • No action bar for table-level actions (e.g., "Delete Selected" button)                            

Reuse Opportunity:                                                                                   

 • Could be extended to include action buttons (e.g., "Delete Selected", "Export")                   

-----------------------------------------------------------------------------------------------------


Empty States                                                                                         

Pattern: Empty Table Message                                                                         

Locations:                                                                                           

 • tableService.html – emptyMessage option (default: "No data found")                                

Shared Properties:                                                                                   

 • text-align: center                                                                                
 • padding: 32px (Tailwind py-8)                                                                     
 • color: #6b7280 (Tailwind text-gray-500)                                                           

Differences:                                                                                         

 • No other empty state exists in the provided files                                                 
 • modalService.html has no empty state (modal always has content)                                   
 • toastService.html has no empty state (toast is ephemeral)                                         

Issues:                                                                                              

 • No empty state component for other UI elements (e.g., empty search results, empty cart)           
 • No illustration or icon support                                                                   

Reuse Opportunity:                                                                                   

 • Could be reused for empty search results, empty lists, etc.                                       

-----------------------------------------------------------------------------------------------------


Search Bars                                                                                          

Pattern: Search Input                                                                                

Locations:                                                                                           

 • tableService.html – search bar (input with placeholder "Search...")                               

Shared Properties:                                                                                   

 • width: 100% (Tailwind w-full)                                                                     
 • border: 1px solid (Tailwind border)                                                               
 • padding: 8px (Tailwind p-2)                                                                       
 • border-radius: 4px (Tailwind rounded)                                                             
 • margin-bottom: 16px (Tailwind mb-4)                                                               
 • oninput handler triggers search                                                                   

Differences:                                                                                         

 • No other search bar exists in the provided files                                                  
 • modalService.html has no search bar                                                               
 • editService.html has no search bar                                                                

Issues:                                                                                              

 • No search bar component for other contexts (e.g., search in modal, search in header)              
 • No debounce mechanism (fires on every keystroke)                                                  

Reuse Opportunity:                                                                                   

 • Could be extracted as a reusable search input component with debounce                             

-----------------------------------------------------------------------------------------------------


Navigation Patterns                                                                                  

Pattern: Mobile Sidebar Toggle                                                                       

Locations:                                                                                           

 • uiService.html – toggleSidebar(), openSidebar(), closeSidebar()                                   

Shared Properties:                                                                                   

 • Sidebar open/close state managed in UIService                                                     
 • DOM manipulation via updateSidebarDOM() (adds/removes open class, sets display: block/none)       
 • Overlay element (sidebarOverlay) with display: block/none                                         
 • Body overflow hidden when sidebar open                                                            
 • Responsive: closes sidebar when resizing to desktop (MOBILE_BREAKPOINT = 768)                     

Differences:                                                                                         

 • No other navigation pattern exists in the provided files                                          
 • No desktop sidebar pattern (assumes always visible on desktop)                                    
 • No hamburger menu button component                                                                

Issues:                                                                                              

 • No navigation component (sidebar is assumed to exist in HTML but not defined in these files)      
 • No active link highlighting                                                                       
 • No submenu support                                                                                

Reuse Opportunity:                                                                                   

 • Could be extended to support desktop sidebar collapse/expand                                      

-----------------------------------------------------------------------------------------------------


Cart Patterns                                                                                        

No cart patterns found in the provided files.                                                        

-----------------------------------------------------------------------------------------------------


Checkout Patterns                                                                                    

No checkout patterns found in the provided files.                                                    

-----------------------------------------------------------------------------------------------------


Summary of Key Issues                                                                                

 1 No shared button component – Buttons are defined in multiple places with inconsistent styling (raw
   CSS vs Tailwind, different hover states, different disabled states).                              
 2 No shared form component – editService.html is the only form service, but it relies on raw HTML   
   templates and has no validation, reset, or dirty state tracking.                                  
 3 No shared pagination component – Pagination is embedded in tableService.html and cannot be reused 
   outside tables.                                                                                   
 4 No shared search component – Search bar is embedded in tableService.html and cannot be reused     
    outside tables.                                                                                  
  5 No shared empty state component – Empty state is embedded in tableService.html and cannot be     
    reused outside tables.                                                                           
  6 No shared action bar component – Bulk selection bar is embedded in tableService.html and cannot  
    be reused outside tables.                                                                        
  7 No shared navigation component – Sidebar logic is in uiService.html but no sidebar markup or     
    component exists in these files.                                                                 
  8 No cart or checkout patterns – These are absent from the provided files, indicating they may be  
    in other files not included in this audit.                                                       
  9 Modal service is the most reusable – Modal service is used by editService.html and could be used 
    by other modules, but editService.html does not fully leverage Modal's loading states.           
 10 Table service is the most feature-rich – Table service includes sorting, pagination, search,     
    selection, and actions, but is not used by any other service in these files.                     


Tokens: 21k sent, 3.5k received. Cost: $0.0072 message, $0.01 session.
─────────────────────────────────────────────────────────────────────────────────────────────────────
src/ui/components/modal.html      src/ui/components/table.html      src/ui/services/editService.html 
src/ui/services/modalService.html src/ui/services/tableService.html src/ui/services/toastService.html
src/ui/services/uiService.html                                                                       
> ... 
>  
> ## Grid Collapse Issues 
>  
> ... 
>  
> ## Mobile Spacing Issues 
>  
> ... 
>  
> Document findings structurally and precisely. 
>                                                                                                    

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Responsive Audit                                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Fixed Width Problems                                                                                 

Locations:                                                                                           

 • modalService.html – .modal-content default max-width: 560px (desktop)                             
 • modalService.html – .modal-content.sm max-width: 400px                                            
 • modalService.html – .modal-content.lg max-width: 720px                                            
 • modalService.html – .modal-content.xl max-width: 960px                                            
 • modalService.html – .modal-content.full max-width: calc(100% - 32px)                              

Issue:                                                                                               

 • All modal sizes except full use fixed pixel max-widths. On viewports between the breakpoint       
   (768px) and the modal's max-width (e.g., 720px for lg), the modal will be constrained but still   
   have horizontal padding, potentially causing content to overflow or appear cramped.               

Impact:                                                                                              

 • On tablets (768px–1024px), xl modals (960px) will overflow horizontally unless the viewport is at 
   least 960px + 32px padding. The full size is the only one that adapts to viewport width.          

-----------------------------------------------------------------------------------------------------


Overflow Problems                                                                                    

Locations:                                                                                           

 • modalService.html – .modal-content max-height: 90vh; overflow-y: auto                             
 • tableService.html – table container <div class="overflow-x-auto">                                 

Issue:                                                                                               

 • Modal content uses overflow-y: auto for vertical overflow, but there is no overflow-x: auto or    
   overflow-x: hidden. If modal content (e.g., a wide form or table) exceeds the modal width, it will
   overflow horizontally without a scrollbar.                                                        
 • Table container uses overflow-x-auto, which is correct for horizontal table overflow, but the     
   table itself has no min-width or width: 100% guarantee, so on very narrow viewports the table may 
   still overflow the container.                                                                     

Impact:                                                                                              

 • On mobile (480px), a modal containing a wide form or table will cause horizontal overflow,        
   potentially breaking layout or requiring horizontal scrolling of the entire page.                 
 • Table horizontal scrolling works but may not be obvious to users (no visual indicator like a      
   shadow or gradient).                                                                              

-----------------------------------------------------------------------------------------------------


Table Responsiveness                                                                                 

Locations:                                                                                           

 • tableService.html – entire Table service                                                          

Issue:                                                                                               

 • The table uses a standard <table> element with overflow-x-auto wrapper. On mobile (480px), columns
   are not collapsed or stacked; all columns remain visible, forcing horizontal scrolling.           
 • No responsive table pattern (e.g., card layout on mobile, column hiding, or horizontal scroll with
   sticky first column).                                                                             
 • Pagination controls are placed below the table and are not sticky, so on long tables the user must
   scroll past all rows to reach pagination.                                                         
 • Search bar is above the table and not sticky, so on long tables the user must scroll back up to   
   search.                                                                                           

Impact:                                                                                              

 • On mobile, users must horizontally scroll to see all columns, which is cumbersome for data entry  
   or review.                                                                                        
 • No column priority or hiding strategy; all columns are equally visible.                           
 • Pagination and search are not accessible without scrolling.                                       

-----------------------------------------------------------------------------------------------------


Modal Responsiveness                                                                                 

Locations:                                                                                           

 • modalService.html – @media (max-width: 768px) and @media (max-width: 480px) rules                 

Issue:                                                                                               

 • At 768px, modal content max-width is overridden to 100%, which is correct.                        
 • At 480px, modal padding is reduced to 8px (overlay) and 12px (header/body/actions), which is      
   appropriate.                                                                                      
 • However, modal sizes (sm, md, lg, xl, full) are not responsive; they all collapse to 100% at      
   768px, losing the size distinction.                                                               
 • Modal actions at 480px switch to flex-direction: column, which is correct, but buttons become     
   width: 100%, which may be too wide for short action labels.                                       

Impact:                                                                                              

 • On mobile, all modals appear the same width regardless of size setting, reducing the usefulness of
   size variants.                                                                                    
 • Full-width buttons on mobile may look disproportionate for short labels (e.g., "OK", "Cancel").   

-----------------------------------------------------------------------------------------------------


Navigation Responsiveness                                                                            

Locations:                                                                                           

 • uiService.html – UIService sidebar logic                                                          

Issue:                                                                                               

 • Sidebar is toggled via display: block/none and open class. On desktop (>=768px), sidebar is       
   assumed to be always visible (no toggle). On mobile (<768px), sidebar is hidden by default and    
   shown via toggle.                                                                                 
 • No responsive sidebar pattern for tablet (768px–1024px): sidebar may be too narrow for desktop    
   navigation but too wide for mobile overlay.                                                       
 • No hamburger menu button component is defined in these files; the toggle is triggered             
   programmatically but no UI element is provided.                                                   
 • Sidebar overlay uses display: block/none with no transition animation (only open class toggles    
   display). This may cause abrupt appearance/disappearance.                                         

Impact:                                                                                              

 • On tablet, sidebar behavior is ambiguous: it may be shown as an overlay (mobile pattern) or as a  
   persistent sidebar (desktop pattern). The current code treats <768px as mobile, but tablets often 
   have enough width for a persistent sidebar.                                                       
 • No visual transition for sidebar open/close, which may feel jarring.                              
 • No hamburger button means the toggle must be triggered by other UI elements (not defined in these 
   files).                                                                                           

-----------------------------------------------------------------------------------------------------


POS Responsiveness                                                                                   

No POS-specific responsive patterns found in the provided files. The files are generic UI services   
(modal, table, toast, edit, sidebar). POS-specific layouts (e.g., product grid, cart, checkout) are  
not present.                                                                                         

-----------------------------------------------------------------------------------------------------


Touch Ergonomics                                                                                     

Locations:                                                                                           

 • tableService.html – action buttons (<button> elements)                                            
 • modalService.html – modal buttons (.modal-btn)                                                    
 • modalService.html – close button (.modal-close-btn)                                               
 • tableService.html – pagination buttons                                                            
 • tableService.html – checkboxes (row selection, select all)                                        

Issue:                                                                                               

 • All buttons have padding: 8px 16px (modal) or px-3 py-1 (table), which translates to approximately
   8px vertical padding and 12px horizontal padding. This results in a tap target of roughly         
   32px–40px height, which is below the recommended 44px minimum for touch targets (WCAG 2.5.5).     
 • Checkboxes are standard <input type="checkbox"> without custom sizing, so their tap target is the 
   default browser size (~13px), which is far below the recommended minimum.                         
 • Pagination page number buttons have padding: 8px 12px, resulting in a tap target of approximately 
   32px–36px, also below 44px.                                                                       

Impact:                                                                                              

 • On touch devices (phones, tablets), users may accidentally tap adjacent buttons or miss the       
   intended target, especially for small pagination numbers and checkboxes.                          
 • This is a usability and accessibility concern.                                                    

-----------------------------------------------------------------------------------------------------


Grid Collapse Issues                                                                                 

No grid layouts found in the provided files. The files use flexbox for layout (modal header, modal   
actions, table bulk actions, pagination). No CSS Grid is used, so no grid collapse issues exist.     

-----------------------------------------------------------------------------------------------------


Mobile Spacing Issues                                                                                

Locations:                                                                                           

 • modalService.html – @media (max-width: 480px) rules                                               

Issue:                                                                                               

 • At 480px, modal overlay padding is 8px, modal header/body/actions padding is 12px. This is        
   appropriate.                                                                                      
 • However, modal body padding is 12px on mobile, which may be insufficient for forms with multiple  
   fields (no vertical spacing between fields is defined in these files).                            
 • Table search bar has margin-bottom: 16px (Tailwind mb-4), which is consistent on all viewports. No
   mobile-specific spacing adjustment.                                                               
 • Table bulk actions bar has margin-bottom: 16px (Tailwind mb-4), also consistent.                  
 • Pagination controls have margin-top: 16px and padding-top: 16px (Tailwind mt-4 pt-4 border-t),    
   consistent on all viewports.                                                                      

Impact:                                                                                              

 • On mobile, the 16px spacing between table elements (search, bulk actions, table, pagination) may  
   be adequate but could be reduced to save vertical space.                                          
 • Modal body padding (12px) may be tight for forms, but no form fields are defined in these files to
   evaluate.                                                                                         

-----------------------------------------------------------------------------------------------------


Sticky / Fixed Element Issues                                                                        

Locations:                                                                                           

 • modalService.html – .modal-overlay position: fixed; inset: 0; z-index: 9998                       
 • toastService.html – toast container position: fixed; top: 20px; right: 20px; z-index: 9999        

Issue:                                                                                               

 • Modal overlay is fixed and covers the entire viewport, which is correct.                          
 • Toast is fixed at top-right, which may overlap with modal overlay (z-index 9999 vs 9998). On      
   mobile, the toast may be partially hidden by the notch or status bar.                             
 • No sticky elements in table or other components.                                                  

Impact:                                                                                              

 • Toast may appear above modal overlay, which is acceptable (toast should be on top). However, on   
   mobile with a notch, the toast's top: 20px may be too close to the status bar.                    
 • No sticky table header or sticky pagination, which may cause usability issues on long tables (user
   must scroll to see column headers or pagination).                                                 

-----------------------------------------------------------------------------------------------------


Viewport Problems                                                                                    

Locations:                                                                                           

 • modalService.html – no viewport meta tag (assumed to be in parent HTML)                           
 • tableService.html – no viewport meta tag                                                          
 • toastService.html – no viewport meta tag                                                          
 • editService.html – no viewport meta tag                                                           
 • uiService.html – no viewport meta tag                                                             

Issue:                                                                                               

 • None of the provided files include a <meta name="viewport" content="width=device-width,           
   initial-scale=1"> tag. This tag is typically placed in the parent HTML file (e.g., index.html),   
   which is not included in this audit. If the parent HTML lacks this tag, the page will not scale   
   correctly on mobile devices.                                                                      

Impact:                                                                                              

 • If the viewport meta tag is missing, mobile browsers may render the page at a desktop width (e.g.,
   980px) and then scale down, causing text to be too small and requiring pinch-to-zoom.             
 • This is a critical issue for mobile responsiveness.                                               

-----------------------------------------------------------------------------------------------------


Summary of Key Issues                                                                                

 1 Fixed modal widths – All modal sizes except full use fixed pixel max-widths, causing overflow on  
   viewports between the breakpoint and the modal width.                                             
 2 No horizontal overflow handling in modals – Modal content uses overflow-y: auto but not           
   overflow-x: auto, so wide content will overflow horizontally.                                     
 3 Table not responsive – Table uses horizontal scroll wrapper but no column collapsing, hiding, or  
   card layout on mobile. All columns remain visible, forcing horizontal scrolling.                  
 4 Pagination and search not sticky – On long tables, users must scroll past all rows to reach       
    pagination or scroll back up to search.                                                          
  5 Sidebar behavior ambiguous on tablet – The 768px breakpoint treats tablets as mobile (overlay    
    sidebar), but tablets often have enough width for a persistent sidebar.                          
  6 Touch targets too small – Buttons (32–40px) and checkboxes (~13px) are below the recommended 44px
    minimum for touch targets.                                                                       
  7 No viewport meta tag in provided files – If the parent HTML lacks it, mobile rendering will be   
    incorrect.                                                                                       
  8 No sticky table header – Column headers scroll away on long tables, reducing usability.          
  9 Modal size variants lost on mobile – All sizes collapse to 100% at 768px, making size selection  
    meaningless on mobile.                                                                           
 10 No visual indicator for horizontal scroll – Table horizontal scroll wrapper has no shadow or     
    gradient to indicate scrollable content.