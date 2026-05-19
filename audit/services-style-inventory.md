┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Style Inventory Audit                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Colors                                                                                               

Pattern: #e5e7eb (gray-200)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-header border-bottom, .modal-actions border-top, .modal-spinner border 
 • modalService.html – inline <style> block (same selectors)                                         

Properties: border-color, border-top-color                                                           

Frequency: 4 occurrences (2 in <style>, 2 in inline style.cssText)                                   

Issues: Duplicated across two style blocks; could be centralized.                                    

-----------------------------------------------------------------------------------------------------

Pattern: #6b7280 (gray-500)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-close-btn color, .modal-close-btn:hover color                          
 • modalService.html – inline <style> block (same selectors)                                         

Properties: color                                                                                    

Frequency: 4 occurrences                                                                             

Issues: Duplicated; also used in tableService.html for pagination ellipsis (<span class="px-2        
text-gray-500 font-bold">...</span>) but that is a Tailwind utility class, not a raw hex.            

-----------------------------------------------------------------------------------------------------

Pattern: #374151 (gray-700)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-close-btn:hover color, .modal-btn-secondary color                      
 • modalService.html – inline <style> block (same selectors)                                         

Properties: color                                                                                    

Frequency: 4 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: #f3f4f6 (gray-100)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-close-btn:hover background, .modal-btn-secondary background            
 • modalService.html – inline <style> block (same selectors)                                         
 • tableService.html – pagination button disabled state background (bg-gray-100)                     

Properties: background, background-color                                                             

Frequency: 5 occurrences (3 raw hex, 2 Tailwind utility)                                             

Issues: Mixed representation (raw hex vs Tailwind class).                                            

-----------------------------------------------------------------------------------------------------

Pattern: #2563eb (blue-600)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-btn-primary background                                                 
 • modalService.html – inline <style> block (same selector)                                          
 • tableService.html – active page button background (bg-blue-600)                                   

Properties: background, background-color                                                             

Frequency: 3 occurrences (2 raw hex, 1 Tailwind)                                                     

Issues: Mixed representation.                                                                        

-----------------------------------------------------------------------------------------------------

Pattern: #1d4ed8 (blue-700)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-btn-primary:hover background                                           
 • modalService.html – inline <style> block (same selector)                                          

Properties: background                                                                               

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: #ef4444 (red-500)                                                                           

Locations:                                                                                           

 • modalService.html – .modal-btn-danger background                                                  
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – COLORS.error value                                                            

Properties: background, color (in JS object)                                                         

Frequency: 3 occurrences (2 raw hex, 1 JS)                                                           

Issues: Mixed representation; also used in modalService.html for danger button.                      

-----------------------------------------------------------------------------------------------------

Pattern: #dc2626 (red-600)                                                                           

Locations:                                                                                           

 • modalService.html – .modal-btn-danger:hover background                                            
 • modalService.html – inline <style> block (same selector)                                          

Properties: background                                                                               

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: #10b981 (green-500)                                                                         

Locations:                                                                                           

 • toastService.html – COLORS.success value                                                          

Properties: background (used in toast creation)                                                      

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service; no corresponding button style.                                   

-----------------------------------------------------------------------------------------------------

Pattern: #f59e0b (amber-500)                                                                         

Locations:                                                                                           

 • toastService.html – COLORS.warning value                                                          

Properties: background                                                                               

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service.                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: #3b82f6 (blue-500)                                                                          

Locations:                                                                                           

 • toastService.html – COLORS.info value                                                             
 • modalService.html – .modal-spinner border-top-color                                               
 • modalService.html – inline <style> block (same selector)                                          

Properties: background, border-top-color                                                             

Frequency: 3 occurrences (1 JS, 2 raw hex)                                                           

Issues: Duplicated in modal style blocks.                                                            

-----------------------------------------------------------------------------------------------------

Pattern: #1f2937 (gray-800)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-header h2 color                                                        
 • modalService.html – inline <style> block (same selector)                                          

Properties: color                                                                                    

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: white / #ffffff                                                                             

Locations:                                                                                           

 • modalService.html – .modal-content background, .modal-btn-primary color, .modal-btn-danger color  
 • modalService.html – inline <style> block (same selectors)                                         
 • toastService.html – toast text color (color: white)                                               
 • tableService.html – pagination button background (bg-white)                                       

Properties: background, color                                                                        

Frequency: 8+ occurrences                                                                            

Issues: Mixed representation (keyword white vs Tailwind class bg-white).                             

-----------------------------------------------------------------------------------------------------

Pattern: rgba(0,0,0,0.4) (overlay background)                                                        

Locations:                                                                                           

 • modalService.html – .modal-overlay background (both <style> and inline block)                     

Properties: background                                                                               

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: rgba(0,0,0,0.1) (shadow color)                                                              

Locations:                                                                                           

 • toastService.html – box-shadow value                                                              

Properties: box-shadow color component                                                               

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service.                                                                  

-----------------------------------------------------------------------------------------------------


Spacing                                                                                              

Pattern: 16px (p-4)                                                                                  

Locations:                                                                                           

 • modalService.html – .modal-overlay padding (desktop), .modal-header padding (mobile), .modal-body 
   padding (mobile), .modal-actions padding (mobile)                                                 
 • modalService.html – inline <style> block (same selectors)                                         
 • toastService.html – toast padding (12px 24px – not 16px)                                          

Properties: padding                                                                                  

Frequency: 6+ occurrences                                                                            

Issues: Duplicated across two style blocks; also used in responsive overrides.                       

-----------------------------------------------------------------------------------------------------

Pattern: 24px (p-6)                                                                                  

Locations:                                                                                           

 • modalService.html – .modal-header padding (desktop), .modal-body padding (desktop), .modal-actions
   padding (desktop)                                                                                 
 • modalService.html – inline <style> block (same selectors)                                         

Properties: padding                                                                                  

Frequency: 6 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 12px (p-3)                                                                                  

Locations:                                                                                           

 • modalService.html – .modal-header padding (mobile 480px), .modal-body padding (mobile 480px),     
   .modal-actions padding (mobile 480px)                                                             
 • modalService.html – inline <style> block (same selectors)                                         
 • toastService.html – toast padding (12px 24px)                                                     

Properties: padding                                                                                  

Frequency: 7 occurrences                                                                             

Issues: Duplicated; also used in toast service.                                                      

-----------------------------------------------------------------------------------------------------

Pattern: 8px (p-2)                                                                                   

Locations:                                                                                           

 • modalService.html – .modal-close-btn padding, .modal-btn padding                                  
 • modalService.html – inline <style> block (same selectors)                                         
 • tableService.html – pagination button padding (px-3 py-1 – not 8px)                               

Properties: padding                                                                                  

Frequency: 4 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 16px gap (gap-4)                                                                            

Locations:                                                                                           

 • modalService.html – .modal-loading gap, .modal-actions gap                                        
 • modalService.html – inline <style> block (same selectors)                                         
 • tableService.html – bulk actions bar gap (gap-4)                                                  

Properties: gap                                                                                      

Frequency: 5 occurrences                                                                             

Issues: Duplicated; mixed representation (raw gap vs Tailwind gap-4).                                

-----------------------------------------------------------------------------------------------------

Pattern: 8px gap (gap-2)                                                                             

Locations:                                                                                           

 • modalService.html – .modal-actions gap (mobile 480px)                                             
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – toast inner gap (gap: 8px)                                                    
 • tableService.html – pagination gap (gap-2)                                                        

Properties: gap                                                                                      

Frequency: 5 occurrences                                                                             

Issues: Duplicated; mixed representation.                                                            

-----------------------------------------------------------------------------------------------------


Typography                                                                                           

Pattern: 14px font-size                                                                              

Locations:                                                                                           

 • modalService.html – .modal-btn font-size                                                          
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – toast font-size                                                               

Properties: font-size                                                                                

Frequency: 3 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 1.25rem (20px) font-size                                                                    

Locations:                                                                                           

 • modalService.html – .modal-header h2 font-size                                                    
 • modalService.html – inline <style> block (same selector)                                          

Properties: font-size                                                                                

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 1.1rem (approx 17.6px) font-size                                                            

Locations:                                                                                           

 • modalService.html – .modal-header h2 font-size (mobile 768px)                                     
 • modalService.html – inline <style> block (same selector)                                          

Properties: font-size                                                                                

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 0.9rem (approx 14.4px) font-size                                                            

Locations:                                                                                           

 • modalService.html – .modal-btn font-size (mobile 768px)                                           
 • modalService.html – inline <style> block (same selector)                                          

Properties: font-size                                                                                

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 18px font-size                                                                              

Locations:                                                                                           

 • toastService.html – icon span font-size                                                           

Properties: font-size                                                                                

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service.                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 1.5rem (24px) font-size                                                                     

Locations:                                                                                           

 • modalService.html – .modal-close-btn font-size                                                    
 • modalService.html – inline <style> block (same selector)                                          

Properties: font-size                                                                                

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 500 font-weight                                                                             

Locations:                                                                                           

 • modalService.html – .modal-btn font-weight                                                        
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – toast font-weight                                                             

Properties: font-weight                                                                              

Frequency: 3 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 700 font-weight                                                                             

Locations:                                                                                           

 • modalService.html – .modal-header h2 font-weight                                                  
 • modalService.html – inline <style> block (same selector)                                          

Properties: font-weight                                                                              

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------


Shadows                                                                                              

Pattern: 0 4px 6px rgba(0,0,0,0.1)                                                                   

Locations:                                                                                           

 • toastService.html – toast box-shadow                                                              

Properties: box-shadow                                                                               

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service; no corresponding shadow in modal or table.                       

-----------------------------------------------------------------------------------------------------

Pattern: shadow-sm (Tailwind utility)                                                                

Locations:                                                                                           

 • tableService.html – active page button (shadow-sm)                                                

Properties: box-shadow (via Tailwind)                                                                

Frequency: 1 occurrence                                                                              

Issues: Only used in table service; not a raw CSS value.                                             

-----------------------------------------------------------------------------------------------------


Border Radius                                                                                        

Pattern: 12px (rounded-xl)                                                                           

Locations:                                                                                           

 • modalService.html – .modal-content border-radius                                                  
 • modalService.html – inline <style> block (same selector)                                          

Properties: border-radius                                                                            

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 8px (rounded-lg)                                                                            

Locations:                                                                                           

 • modalService.html – .modal-content border-radius (mobile 768px)                                   
 • modalService.html – inline <style> block (same selector)                                          
 • toastService.html – toast border-radius                                                           

Properties: border-radius                                                                            

Frequency: 3 occurrences                                                                             

Issues: Duplicated; also used in toast service.                                                      

-----------------------------------------------------------------------------------------------------

Pattern: 4px (rounded)                                                                               

Locations:                                                                                           

 • modalService.html – .modal-close-btn border-radius                                                
 • modalService.html – inline <style> block (same selector)                                          
 • tableService.html – pagination button border (rounded)                                            

Properties: border-radius                                                                            

Frequency: 3 occurrences                                                                             

Issues: Duplicated; mixed representation (raw 4px vs Tailwind rounded).                              

-----------------------------------------------------------------------------------------------------

Pattern: 6px (rounded-md)                                                                            

Locations:                                                                                           

 • modalService.html – .modal-btn border-radius                                                      
 • modalService.html – inline <style> block (same selector)                                          

Properties: border-radius                                                                            

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: 50% (rounded-full)                                                                          

Locations:                                                                                           

 • modalService.html – .modal-spinner border-radius                                                  
 • modalService.html – inline <style> block (same selector)                                          

Properties: border-radius                                                                            

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------


Breakpoints                                                                                          

Pattern: 768px                                                                                       

Locations:                                                                                           

 • modalService.html – @media (max-width: 768px) (both <style> and inline block)                     
 • uiService.html – MOBILE_BREAKPOINT = 768                                                          

Properties: max-width media query, JS constant                                                       

Frequency: 3 occurrences                                                                             

Issues: Duplicated in modal style blocks; also defined in JS.                                        

-----------------------------------------------------------------------------------------------------

Pattern: 480px                                                                                       

Locations:                                                                                           

 • modalService.html – @media (max-width: 480px) (both <style> and inline block)                     

Properties: max-width media query                                                                    

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------


Layout Spacing Patterns                                                                              

Pattern: flex with justify-content: space-between and align-items: center                            

Locations:                                                                                           

 • modalService.html – .modal-header (both <style> and inline block)                                 
 • tableService.html – pagination container (flex items-center justify-between)                      

Properties: display: flex, justify-content: space-between, align-items: center                       

Frequency: 4 occurrences                                                                             

Issues: Duplicated; mixed representation (raw CSS vs Tailwind utilities).                            

-----------------------------------------------------------------------------------------------------

Pattern: flex with justify-content: flex-end and gap: 8px                                            

Locations:                                                                                           

 • modalService.html – .modal-actions (both <style> and inline block)                                

Properties: display: flex, justify-content: flex-end, gap: 8px                                       

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: flex with flex-direction: column and align-items: center                                    

Locations:                                                                                           

 • modalService.html – .modal-loading (both <style> and inline block)                                

Properties: display: flex, flex-direction: column, align-items: center                               

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: flex with flex-direction: column (mobile 480px)                                             

Locations:                                                                                           

 • modalService.html – .modal-actions (mobile 480px) (both <style> and inline block)                 

Properties: flex-direction: column                                                                   

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: overflow-y: auto with max-height: 90vh                                                      

Locations:                                                                                           

 • modalService.html – .modal-content (both <style> and inline block)                                

Properties: overflow-y: auto, max-height: 90vh                                                       

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: position: fixed with inset: 0 and z-index: 9998                                             

Locations:                                                                                           

 • modalService.html – .modal-overlay (both <style> and inline block)                                

Properties: position: fixed, inset: 0, z-index: 9998                                                 

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: position: fixed with top: 20px, right: 20px, z-index: 9999                                  

Locations:                                                                                           

 • toastService.html – toast container style.cssText                                                 

Properties: position: fixed, top: 20px, right: 20px, z-index: 9999                                   

Frequency: 1 occurrence                                                                              

Issues: Only used in toast service; z-index differs from modal (9999 vs 9998).                       

-----------------------------------------------------------------------------------------------------

Pattern: width: 100% on mobile content                                                               

Locations:                                                                                           

 • modalService.html – .modal-content (mobile 768px) (both <style> and inline block)                 

Properties: max-width: 100%                                                                          

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: flex: 1 on mobile buttons                                                                   

Locations:                                                                                           

 • modalService.html – .modal-btn (mobile 768px) (both <style> and inline block)                     

Properties: flex: 1                                                                                  

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------

Pattern: width: 100% on mobile 480px buttons                                                         

Locations:                                                                                           

 • modalService.html – .modal-btn (mobile 480px) (both <style> and inline block)                     

Properties: width: 100%                                                                              

Frequency: 2 occurrences                                                                             

Issues: Duplicated.                                                                                  

-----------------------------------------------------------------------------------------------------


Summary of Key Issues                                                                                

 1 Duplicate style blocks – modalService.html contains the same CSS rules twice (once in <style> at  
   top, once in ensureStyles() function). This leads to redundancy and potential maintenance drift.  
 2 Mixed representation – Colors, spacing, and border-radius values appear both as raw CSS (hex, px) 
   and as Tailwind utility classes (bg-gray-100, gap-4, rounded). This creates inconsistency and     
   makes global theming harder.                                                                      
 3 No shared design tokens – Values like #e5e7eb, 16px, 8px, 14px, 500 font-weight, 8px              
   border-radius, 768px breakpoint are repeated across files but never defined in a single source of 
   truth.                                                                                            
 4 Toast service uses unique values – 0 4px 6px rgba(0,0,0,0.1) shadow, 18px icon font-size, 20px    
   top/right positioning, z-index: 9999 are not reused elsewhere.                                    
 5 Animation durations – 200ms (modal), 300ms (toast) are hardcoded and differ between services.     
 6 No CSS custom properties – All values are literal; no --color-primary, --spacing-md, etc.  