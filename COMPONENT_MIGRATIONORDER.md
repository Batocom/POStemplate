
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Component Migration Order                                                                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Foundation Components                                                                                                                           

Design Tokens                                                                                                                                   

 • Priority: 1 (first)                                                                                                                          
 • Dependencies: None                                                                                                                           
 • Risk Level: Low                                                                                                                              
 • Reuse Impact: All subsequent components depend on tokens                                                                                     
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: All pages (indirectly)                                                                                                       

Utility System                                                                                                                                  

 • Priority: 2                                                                                                                                  
 • Dependencies: Design Tokens                                                                                                                  
 • Risk Level: Low                                                                                                                              
 • Reuse Impact: All components will use utility classes instead of inline styles                                                               
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: All pages (indirectly)                                                                                                       


Layout Components                                                                                                                               

App Shell                                                                                                                                       

 • Priority: 3                                                                                                                                  
 • Dependencies: Design Tokens, Utility System                                                                                                  
 • Risk Level: Medium (sidebar overlay animation, topbar height change)                                                                         
 • Reuse Impact: Single instance; all pages share the same shell template                                                                       
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: All pages (via app-shell.html)                                                                                               

Sidebar                                                                                                                                         

 • Priority: 4                                                                                                                                  
 • Dependencies: App Shell, Design Tokens, Utility System                                                                                       
 • Risk Level: Medium (overlay transition, active page indicator)                                                                               
 • Reuse Impact: Single instance; navigation pattern used by all pages                                                                          
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: All pages (via sidebar.html)                                                                                                 

Topbar                                                                                                                                          

 • Priority: 5                                                                                                                                  
 • Dependencies: App Shell, Design Tokens, Utility System                                                                                       
 • Risk Level: Low (height change may affect page offsets)                                                                                      
 • Reuse Impact: Single instance; consistent top bar across all pages                                                                           
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: All pages (via topbar.html)                                                                                                  


Shared UI Components                                                                                                                            

Buttons                                                                                                                                         

 • Priority: 6                                                                                                                                  
 • Dependencies: Design Tokens, Utility System                                                                                                  
 • Risk Level: Medium (padding change may affect visual appearance)                                                                             
 • Reuse Impact: 9+ primary button instances, 4 secondary, 2 danger                                                                             
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: All CRUD pages, POS page, Settings page                                                                                      

Forms                                                                                                                                           

 • Priority: 7                                                                                                                                  
 • Dependencies: Design Tokens, Utility System, Buttons                                                                                         
 • Risk Level: Medium (input height change, label styling)                                                                                      
 • Reuse Impact: 10+ input instances, 6 form templates                                                                                          
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: categories.controller.html, units.controller.html, products.controller.html, settings.html, sales.html                       

Modals                                                                                                                                          

 • Priority: 8                                                                                                                                  
 • Dependencies: Design Tokens, Utility System, Buttons, Forms                                                                                  
 • Risk Level: High (duplicate CSS in modalService.html, receipt modal duplication)                                                             
 • Reuse Impact: 5 modal instances, 2 receipt modal duplicates                                                                                  
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: categories.controller.html, units.controller.html, products.controller.html, sales.html, sales.modal.html, POS page          

Tables                                                                                                                                          

 • Priority: 9                                                                                                                                  
 • Dependencies: Design Tokens, Utility System, Buttons                                                                                         
 • Risk Level: High (loading/error/empty states, responsive card transformation)                                                                
 • Reuse Impact: 6+ table instances, 7+ loading states, 6+ error states, 2+ empty states                                                        
 • Implementation Difficulty: High                                                                                                              
 • Pages Affected: categories.controller.html, units.controller.html, products.controller.html, stockMovements.controller.html, sales.html,     
   dashboard.html                                                                                                                               


CRUD Components                                                                                                                                 

Filter Bars                                                                                                                                     

 • Priority: 10                                                                                                                                 
 • Dependencies: Design Tokens, Utility System, Forms                                                                                           
 • Risk Level: Low                                                                                                                              
 • Reuse Impact: 2 instances (POS search, table service search); could be extended to all CRUD tables                                           
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: POS page, tableService.html (indirectly all CRUD pages)                                                                      

CRUD Tables                                                                                                                                     

 • Priority: 11                                                                                                                                 
 • Dependencies: Tables, Filter Bars, Buttons, Forms, Modals                                                                                    
 • Risk Level: High (responsive card transformation, sticky headers, pagination)                                                                
 • Reuse Impact: 6+ table instances across all CRUD pages                                                                                       
 • Implementation Difficulty: High                                                                                                              
 • Pages Affected: categories.controller.html, units.controller.html, products.controller.html, stockMovements.controller.html, sales.html,     
   dashboard.html                                                                                                                               


POS Components                                                                                                                                  

Product Grid                                                                                                                                    

 • Priority: 12                                                                                                                                 
 • Dependencies: Design Tokens, Utility System, Buttons                                                                                         
 • Risk Level: Medium (touch target size, responsive columns)                                                                                   
 • Reuse Impact: Single instance (POS page only)                                                                                                
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: POS page                                                                                                                     

Cart Item Row                                                                                                                                   

 • Priority: 13                                                                                                                                 
 • Dependencies: Design Tokens, Utility System, Buttons                                                                                         
 • Risk Level: Medium (duplicate implementation, quantity button size)                                                                          
 • Reuse Impact: 2 implementations (should be 1)                                                                                                
 • Implementation Difficulty: Low                                                                                                               
 • Pages Affected: POS page, cartItemRow.html                                                                                                   

Checkout Panel                                                                                                                                  

 • Priority: 14                                                                                                                                 
 • Dependencies: Design Tokens, Utility System, Buttons, Cart Item Row                                                                          
 • Risk Level: Medium (sticky behavior on mobile, overflow handling)                                                                            
 • Reuse Impact: Single instance (POS page only)                                                                                                
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: POS page                                                                                                                     


Cleanup & Legacy Removal                                                                                                                        

 • Priority: 15 (final)                                                                                                                         
 • Dependencies: All previous phases complete                                                                                                   
 • Risk Level: High (accidental removal of needed styles)                                                                                       
 • Reuse Impact: Removes duplicate CSS, inline styles, dead files                                                                               
 • Implementation Difficulty: Medium                                                                                                            
 • Pages Affected: All pages (cleanup only, no new functionality)                                                                               


Migration Sequencing Summary                                                                                                                    

                                                                  
 Order  Component       Dependencies                  Risk    Reuse Impact   
 ─────────────────────────────────────────────────────────────────────────── 
 1      Design Tokens   None                          Low     All components          
 2      Utility System  Tokens                        Low     All components          
 3      App Shell       Tokens, Utilities                  Medium  All pages               
 4      Sidebar         App Shell, Tokens, Utilities       Medium  All pages               
 5      Topbar          App Shell, Tokens, Utilities       Low     All pages               
 6      Buttons         Tokens, Utilities                            Medium  All CRUD, POS, Settings  
 7      Forms           Tokens, Utilities, Buttons                   Medium  CRUD pages, Settings     
 8      Modals          Tokens, Utilities, Buttons, Forms            High    CRUD pages, POS          
 9      Tables                    Tokens, Utilities, Buttons                   High    CRUD pages, Dashboard    
 10     Filter Bars               Tokens, Utilities, Forms                     Low     POS, all CRUD (indirect) 
 11     CRUD Tables               Tables, Filter Bars, Buttons, Forms, Modals  High    All CRUD pages           
 12     Product Grid              Tokens, Utilities, Buttons                   Medium  POS page                 
 13     Cart Item Row             Tokens, Utilities, Buttons                   Medium  POS page                 
 14     Checkout Panel            Tokens, Utilities, Buttons, Cart Item Row    Medium  POS page                 
 15     Cleanup & Legacy Removal  All previous phases                          High    All pages                
                                                                                                                


Key Migration Rules                                                                                                                             

 1 Foundation first – Tokens and Utilities must be completed before any component migration.                                                    
 2 Layout before content – App Shell, Sidebar, Topbar must be stable before shared components.                                                  
  3 Shared before specific – Buttons, Forms, Modals, Tables must be migrated before CRUD and POS components.                                    
  4 High-risk components require feature flags – Modals (duplicate CSS), Tables (responsive transformation), CRUD Tables (card layout) must be  
    feature-flagged.                                                                                                                            
  5 Validation gates – After each phase, run visual regression tests on 360px, 768px, 1280px viewports.                                         
  6 Backward compatibility – Legacy code must not be removed until the new code has been verified in production for at least one release cycle. 
  7 No inline styles after Phase 2 – All new code must use utility classes; existing inline styles must be removed during Cleanup phase.        
  8 Mobile-first CSS – All new CSS must be mobile-first; max-width queries are forbidden.                                                       
  9 Component isolation – Each component’s CSS must be scoped to its own class namespace.                                                       
 10 One source of truth – Breakpoints, spacing, typography, and colors must be referenced only from the token layer.