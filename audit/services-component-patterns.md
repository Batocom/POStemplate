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