┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ CSS Architecture Audit                                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Inline Styles                                                                                        

Locations:                                                                                           

 • pos.html: style="display:none;" on multiple elements (#posPageTemplate, #salesModalContent,       
   #paymentModalContent, #search-results, #cart-items-list, #change-row, #change-display,            
   #credit-section, #credit-balance, #payment-loading-overlay)                                       
 • pos.html: style="display:block;" on #search-results, #cart-items-list, #change-display,           
   #credit-section, #credit-balance                                                                  
 • pos.html: style="display:flex;" on #change-row                                                    
 • pos.html: style="display:none;" on .search-clear-btn (initial state)                              
 • pos.html: style="display:block;" on .search-clear-btn (via JS)                                    
 • pos.html: style="display:none;" on #payment-loading-overlay (initial state)                       
 • pos.html: style="display:flex;" on #payment-loading-overlay (via JS)                              

Issues:                                                                                              

 • 15+ inline style declarations for visibility toggling                                             
 • Mix of display:none, display:block, display:flex for the same purpose (visibility)                
 • No CSS utility classes for show/hide states                                                       
 • Inline styles in HTML templates create tight coupling between markup and presentation             

Severity: Medium                                                                                     

-----------------------------------------------------------------------------------------------------


Duplicated CSS                                                                                       

Locations:                                                                                           

 1 .payment-method-btn defined twice in pos.html:                                                    
    • First definition (lines ~450-460): flex-direction: column, gap: 4px, padding: 12px 8px         
    • Second definition (lines ~470-480): same properties with slightly different values             
    • Both have identical border, background, cursor, font-weight, transition, font-size             
 2 .receipt-items-table th and .receipt-items-table td both have padding: 8px 12px and font-size:    
   0.9rem (duplicated across th/td)                                                                  
 3 .credit-customer-select and .credit-notes-input both have border: 2px solid #e0e0e0,              
   border-radius: 8px, outline: none (duplicated border styles)                                      
 4 .payment-amount-input-wrapper:focus-within and .credit-customer-select:focus both set             
   border-color: #2563eb (duplicated focus style)                                                    

Issues:                                                                                              

 • Payment method button styles defined twice (likely from copy-paste)                               
 • Shared border/focus styles not extracted into reusable classes                                    
 • Table cell padding duplicated across th and td                                                    

Severity: Low-Medium                                                                                 

-----------------------------------------------------------------------------------------------------


Naming Inconsistencies                                                                               

Locations:                                                                                           

 1 .pos-layout vs .pos-left / .pos-right — BEM-like prefix pos- mixed with flat naming               
 2 .cart-table-container vs .cart-header / .cart-items / .cart-item — cart- prefix inconsistent with 
   cart-table-                                                                                       
 3 .totals-panel vs .totals-row / .totals-label / .totals-value — totals- prefix (plural) vs total-  
   in other contexts                                                                                 
 4 .payment-total-display vs .payment-total-label / .payment-total-amount — payment-total- prefix    
 5 .payment-amount vs .payment-amount-label / .payment-amount-input-wrapper / .payment-amount-input —
   payment-amount- prefix                                                                            
  6 .payment-change vs .change-label / .change-amount — payment-change vs change- (inconsistent      
    prefix)                                                                                          
  7 .payment-credit-section vs .credit-customer / .credit-balance / .credit-note — payment-credit- vs
    credit- (inconsistent prefix)                                                                    
  8 .receipt-modal vs .receipt-header-info / .receipt-items-section / .receipt-total-section —       
    receipt- prefix consistent but not BEM                                                           
  9 .modal-btn vs .modal-btn-primary / .modal-btn-secondary — BEM-like but inconsistent with other   
    naming                                                                                           
 10 .product-card .product-name (descendant) vs .product-name (flat) — same class used both as       
    descendant and standalone                                                                        

Issues:                                                                                              

 • No consistent naming methodology (BEM, SMACSS, or utility-first)                                  
 • Mix of flat naming, BEM-like, and ad-hoc prefixes                                                 
 • Same concept named differently across components (e.g., change- vs payment-change)                
 • Plural/singular inconsistency (totals vs total)                                                   

Severity: Medium                                                                                     

-----------------------------------------------------------------------------------------------------


Style Leakage Risks                                                                                  

Locations:                                                                                           

 1 .product-card — No component scoping; styles could leak to other .product-card elements outside   
   POS                                                                                               
 2 .search-input — Generic class name could conflict with other search inputs                        
 3 .spinner — Extremely generic class name; high risk of collision                                   
 4 .modal-btn — Generic modal button class could conflict with other modal systems                   
 5 .receipt-items-table — Table styles not scoped to receipt context                                 
 6 .payment-method-btn — Could conflict with other payment method buttons in different contexts      
 7 .credit-customer-select — Generic select styling not scoped                                       

Issues:                                                                                              

 • No CSS scoping mechanism (shadow DOM, CSS modules, or scoped styles)                              
 • Generic class names that could easily conflict with other components                              
 • All styles are global; no isolation between POS page and other pages                              
 • No namespace prefix for POS-specific components                                                   

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


Responsive Logic Duplication                                                                         

Locations:                                                                                           

 1 .product-grid — Grid columns defined in 4 breakpoints:                                            
    • Desktop: repeat(auto-fill, minmax(140px, 1fr))                                                 
    • Tablet: repeat(auto-fill, minmax(120px, 1fr))                                                  
    • Mobile: repeat(auto-fill, minmax(100px, 1fr))                                                  
    • Small phone: repeat(2, 1fr)                                                                    
  2 .product-card — Padding and font sizes duplicated across 4 breakpoints                           
  3 .cart-item — Padding, font sizes, and dimensions duplicated across 4 breakpoints                 
  4 .totals-panel — Padding duplicated across 4 breakpoints                                          
  5 .checkout-actions — Padding and button styles duplicated across 4 breakpoints                    
  6 .payment-total-amount — Font size duplicated across 2 breakpoints                                
  7 .payment-method-btn — Padding and font size duplicated across 2 breakpoints                      
  8 .payment-amount-input — Padding duplicated across 2 breakpoints                                  
  9 .change-amount — Font size duplicated across 2 breakpoints                                       
 10 .receipt-items-table th/td — Padding and font size duplicated across 2 breakpoints               

Issues:                                                                                              

 • Same responsive adjustments repeated for every component at every breakpoint                      
 • No responsive utility classes or design tokens                                                    
 • Breakpoint values hardcoded in multiple places (1024px, 767px, 480px)                             
 • No centralized responsive spacing/font-size system                                                
 • Each component manually adjusts padding, font-size, and dimensions at each breakpoint             

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


High Specificity Problems                                                                            

Locations:                                                                                           

 1 .product-card .product-name (specificity 0,2,0) — Descendant selector unnecessarily specific      
 2 .product-card .product-price (specificity 0,2,0) — Same issue                                     
  3 .product-card .product-stock (specificity 0,2,0) — Same issue                                    
  4 .product-card .product-barcode (specificity 0,2,0) — Same issue                                  
  5 .search-result-item .result-name (specificity 0,2,0) — Unnecessary descendant                    
  6 .search-result-item .result-price (specificity 0,2,0) — Same issue                               
  7 .search-result-item .result-stock (specificity 0,2,0) — Same issue                               
  8 .cart-item .item-info (specificity 0,2,0) — Unnecessary descendant                               
  9 .cart-item .item-name (specificity 0,2,0) — Same issue                                           
 10 .cart-item .item-price (specificity 0,2,0) — Same issue                                          
 11 .cart-item .item-quantity (specificity 0,2,0) — Same issue                                       
 12 .cart-item .qty-btn (specificity 0,2,0) — Same issue                                             
 13 .cart-item .qty-value (specificity 0,2,0) — Same issue                                           
 14 .cart-item .item-total (specificity 0,2,0) — Same issue                                          
 15 .cart-item .item-remove (specificity 0,2,0) — Same issue                                         
 16 .receipt-items-table th (specificity 0,2,1) — Element + class selector                           
 17 .receipt-items-table td (specificity 0,2,1) — Same issue                                         

Issues:                                                                                              

 • Widespread use of descendant selectors where single class would suffice                           
 • 15+ instances of .parent .child pattern that could be .parent-child                               
 • Element selectors combined with classes (.receipt-items-table th) creates unnecessary specificity 
 • Makes overrides difficult and creates specificity arms race                                       

Severity: Medium-High                                                                                

-----------------------------------------------------------------------------------------------------


Architectural Debt                                                                                   

1. No CSS Custom Properties / Design Tokens                                                          

 • Colors hardcoded: #2563eb (blue) appears 20+ times, #e0e0e0 (border) appears 15+ times, #888      
   (gray) appears 10+ times                                                                          
 • Spacing values hardcoded: 16px, 12px, 8px, 4px repeated throughout                                
 • Border radius hardcoded: 8px, 12px, 20px, 50% repeated                                            
 • Font sizes hardcoded: 0.9rem, 0.85rem, 1rem, 1.2rem repeated                                      
 • No centralized theme or design system                                                             

2. No CSS Organization                                                                               

 • All styles in a single <style> block in pos.html                                                  
 • No separation of concerns (layout, components, utilities, responsive)                             
 • No CSS file structure or imports                                                                  
 • Styles mixed with HTML template                                                                   

3. Dead / Unused Styles                                                                              

 • .payment-modal-inner — Only has padding: 0 (could be removed)                                     
 • .receipt-actions button — Descendant selector for button styling that could be class-based        
 • .payment-method-icon — Only used for font-size (could be inline or utility)                       

4. Mixed Responsibilities                                                                            

 • pos.html contains: layout styles, component styles, responsive styles, animation keyframes, and   
   print styles                                                                                      
 • No separation between POS-specific styles and shared component styles                             
 • Payment modal styles mixed with POS layout styles                                                 

5. No Utility Classes                                                                                

 • No reusable classes for common patterns: .hidden, .flex, .gap-*, .text-center, .font-bold         
 • Instead, each component redefines the same properties                                             
 • Inline style="display:none" used instead of a .hidden class                                       

6. Animation Keyframes Not Scoped                                                                    

 • @keyframes spin defined globally — could conflict with other animations                           
 • No naming convention for keyframes                                                                

7. No Print Styles                                                                                   

 • No @media print rules for receipt printing                                                        
 • Receipt display relies on screen styles                                                           

8. Inconsistent Layout System                                                                        

 • POS layout uses flexbox (.pos-layout)                                                             
 • Product grid uses CSS Grid (.product-grid)                                                        
 • Cart items use flexbox (.cart-item)                                                               
 • No consistent layout methodology across components                                                

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


Summary                                                                                              

                                                  
 Category                      Count                    Severity    
 ────────────────────────────────────────────────────────────────── 
 Inline Styles                 15+                      Medium      
 Duplicated CSS                5+ instances             Low-Medium  
 Naming Inconsistencies        10+ instances            Medium      
 Style Leakage Risks           7+ instances             High        
 Responsive Logic Duplication  10+ components affected  High        
 High Specificity Problems     17+ selectors            Medium-High 
 Architectural Debt            8 categories             High        
                                                                    

Overall Assessment: The CSS architecture has significant technical debt. The most critical issues    
are: (1) no scoping mechanism leading to style leakage, (2) massive duplication of responsive logic  
across all components, (3) no design tokens or CSS custom properties, and (4) inconsistent naming    
conventions. These issues will compound as the application grows, making maintenance increasingly    
difficult.                                 ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ CSS Architecture Audit                                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Inline Styles                                                                                        

Locations:                                                                                           

 • pos.html: style="display:none;" on multiple elements (#posPageTemplate, #salesModalContent,       
   #paymentModalContent, #search-results, #cart-items-list, #change-row, #change-display,            
   #credit-section, #credit-balance, #payment-loading-overlay)                                       
 • pos.html: style="display:block;" on #search-results, #cart-items-list, #change-display,           
   #credit-section, #credit-balance                                                                  
 • pos.html: style="display:flex;" on #change-row                                                    
 • pos.html: style="display:none;" on .search-clear-btn (initial state)                              
 • pos.html: style="display:block;" on .search-clear-btn (via JS)                                    
 • pos.html: style="display:none;" on #payment-loading-overlay (initial state)                       
 • pos.html: style="display:flex;" on #payment-loading-overlay (via JS)                              

Issues:                                                                                              

 • 15+ inline style declarations for visibility toggling                                             
 • Mix of display:none, display:block, display:flex for the same purpose (visibility)                
 • No CSS utility classes for show/hide states                                                       
 • Inline styles in HTML templates create tight coupling between markup and presentation             

Severity: Medium                                                                                     

-----------------------------------------------------------------------------------------------------


Duplicated CSS                                                                                       

Locations:                                                                                           

 1 .payment-method-btn defined twice in pos.html:                                                    
    • First definition (lines ~450-460): flex-direction: column, gap: 4px, padding: 12px 8px         
    • Second definition (lines ~470-480): same properties with slightly different values             
    • Both have identical border, background, cursor, font-weight, transition, font-size             
 2 .receipt-items-table th and .receipt-items-table td both have padding: 8px 12px and font-size:    
   0.9rem (duplicated across th/td)                                                                  
 3 .credit-customer-select and .credit-notes-input both have border: 2px solid #e0e0e0,              
   border-radius: 8px, outline: none (duplicated border styles)                                      
 4 .payment-amount-input-wrapper:focus-within and .credit-customer-select:focus both set             
   border-color: #2563eb (duplicated focus style)                                                    

Issues:                                                                                              

 • Payment method button styles defined twice (likely from copy-paste)                               
 • Shared border/focus styles not extracted into reusable classes                                    
 • Table cell padding duplicated across th and td                                                    

Severity: Low-Medium                                                                                 

-----------------------------------------------------------------------------------------------------


Naming Inconsistencies                                                                               

Locations:                                                                                           

 1 .pos-layout vs .pos-left / .pos-right — BEM-like prefix pos- mixed with flat naming               
 2 .cart-table-container vs .cart-header / .cart-items / .cart-item — cart- prefix inconsistent with 
   cart-table-                                                                                       
 3 .totals-panel vs .totals-row / .totals-label / .totals-value — totals- prefix (plural) vs total-  
   in other contexts                                                                                 
 4 .payment-total-display vs .payment-total-label / .payment-total-amount — payment-total- prefix    
 5 .payment-amount vs .payment-amount-label / .payment-amount-input-wrapper / .payment-amount-input —
   payment-amount- prefix                                                                            
  6 .payment-change vs .change-label / .change-amount — payment-change vs change- (inconsistent      
    prefix)                                                                                          
  7 .payment-credit-section vs .credit-customer / .credit-balance / .credit-note — payment-credit- vs
    credit- (inconsistent prefix)                                                                    
  8 .receipt-modal vs .receipt-header-info / .receipt-items-section / .receipt-total-section —       
    receipt- prefix consistent but not BEM                                                           
  9 .modal-btn vs .modal-btn-primary / .modal-btn-secondary — BEM-like but inconsistent with other   
    naming                                                                                           
 10 .product-card .product-name (descendant) vs .product-name (flat) — same class used both as       
    descendant and standalone                                                                        

Issues:                                                                                              

 • No consistent naming methodology (BEM, SMACSS, or utility-first)                                  
 • Mix of flat naming, BEM-like, and ad-hoc prefixes                                                 
 • Same concept named differently across components (e.g., change- vs payment-change)                
 • Plural/singular inconsistency (totals vs total)                                                   

Severity: Medium                                                                                     

-----------------------------------------------------------------------------------------------------


Style Leakage Risks                                                                                  

Locations:                                                                                           

 1 .product-card — No component scoping; styles could leak to other .product-card elements outside   
   POS                                                                                               
 2 .search-input — Generic class name could conflict with other search inputs                        
 3 .spinner — Extremely generic class name; high risk of collision                                   
 4 .modal-btn — Generic modal button class could conflict with other modal systems                   
 5 .receipt-items-table — Table styles not scoped to receipt context                                 
 6 .payment-method-btn — Could conflict with other payment method buttons in different contexts      
 7 .credit-customer-select — Generic select styling not scoped                                       

Issues:                                                                                              

 • No CSS scoping mechanism (shadow DOM, CSS modules, or scoped styles)                              
 • Generic class names that could easily conflict with other components                              
 • All styles are global; no isolation between POS page and other pages                              
 • No namespace prefix for POS-specific components                                                   

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


Responsive Logic Duplication                                                                         

Locations:                                                                                           

 1 .product-grid — Grid columns defined in 4 breakpoints:                                            
    • Desktop: repeat(auto-fill, minmax(140px, 1fr))                                                 
    • Tablet: repeat(auto-fill, minmax(120px, 1fr))                                                  
    • Mobile: repeat(auto-fill, minmax(100px, 1fr))                                                  
    • Small phone: repeat(2, 1fr)                                                                    
  2 .product-card — Padding and font sizes duplicated across 4 breakpoints                           
  3 .cart-item — Padding, font sizes, and dimensions duplicated across 4 breakpoints                 
  4 .totals-panel — Padding duplicated across 4 breakpoints                                          
  5 .checkout-actions — Padding and button styles duplicated across 4 breakpoints                    
  6 .payment-total-amount — Font size duplicated across 2 breakpoints                                
  7 .payment-method-btn — Padding and font size duplicated across 2 breakpoints                      
  8 .payment-amount-input — Padding duplicated across 2 breakpoints                                  
  9 .change-amount — Font size duplicated across 2 breakpoints                                       
 10 .receipt-items-table th/td — Padding and font size duplicated across 2 breakpoints               

Issues:                                                                                              

 • Same responsive adjustments repeated for every component at every breakpoint                      
 • No responsive utility classes or design tokens                                                    
 • Breakpoint values hardcoded in multiple places (1024px, 767px, 480px)                             
 • No centralized responsive spacing/font-size system                                                
 • Each component manually adjusts padding, font-size, and dimensions at each breakpoint             

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


High Specificity Problems                                                                            

Locations:                                                                                           

 1 .product-card .product-name (specificity 0,2,0) — Descendant selector unnecessarily specific      
 2 .product-card .product-price (specificity 0,2,0) — Same issue                                     
  3 .product-card .product-stock (specificity 0,2,0) — Same issue                                    
  4 .product-card .product-barcode (specificity 0,2,0) — Same issue                                  
  5 .search-result-item .result-name (specificity 0,2,0) — Unnecessary descendant                    
  6 .search-result-item .result-price (specificity 0,2,0) — Same issue                               
  7 .search-result-item .result-stock (specificity 0,2,0) — Same issue                               
  8 .cart-item .item-info (specificity 0,2,0) — Unnecessary descendant                               
  9 .cart-item .item-name (specificity 0,2,0) — Same issue                                           
 10 .cart-item .item-price (specificity 0,2,0) — Same issue                                          
 11 .cart-item .item-quantity (specificity 0,2,0) — Same issue                                       
 12 .cart-item .qty-btn (specificity 0,2,0) — Same issue                                             
 13 .cart-item .qty-value (specificity 0,2,0) — Same issue                                           
 14 .cart-item .item-total (specificity 0,2,0) — Same issue                                          
 15 .cart-item .item-remove (specificity 0,2,0) — Same issue                                         
 16 .receipt-items-table th (specificity 0,2,1) — Element + class selector                           
 17 .receipt-items-table td (specificity 0,2,1) — Same issue                                         

Issues:                                                                                              

 • Widespread use of descendant selectors where single class would suffice                           
 • 15+ instances of .parent .child pattern that could be .parent-child                               
 • Element selectors combined with classes (.receipt-items-table th) creates unnecessary specificity 
 • Makes overrides difficult and creates specificity arms race                                       

Severity: Medium-High                                                                                

-----------------------------------------------------------------------------------------------------


Architectural Debt                                                                                   

1. No CSS Custom Properties / Design Tokens                                                          

 • Colors hardcoded: #2563eb (blue) appears 20+ times, #e0e0e0 (border) appears 15+ times, #888      
   (gray) appears 10+ times                                                                          
 • Spacing values hardcoded: 16px, 12px, 8px, 4px repeated throughout                                
 • Border radius hardcoded: 8px, 12px, 20px, 50% repeated                                            
 • Font sizes hardcoded: 0.9rem, 0.85rem, 1rem, 1.2rem repeated                                      
 • No centralized theme or design system                                                             

2. No CSS Organization                                                                               

 • All styles in a single <style> block in pos.html                                                  
 • No separation of concerns (layout, components, utilities, responsive)                             
 • No CSS file structure or imports                                                                  
 • Styles mixed with HTML template                                                                   

3. Dead / Unused Styles                                                                              

 • .payment-modal-inner — Only has padding: 0 (could be removed)                                     
 • .receipt-actions button — Descendant selector for button styling that could be class-based        
 • .payment-method-icon — Only used for font-size (could be inline or utility)                       

4. Mixed Responsibilities                                                                            

 • pos.html contains: layout styles, component styles, responsive styles, animation keyframes, and   
   print styles                                                                                      
 • No separation between POS-specific styles and shared component styles                             
 • Payment modal styles mixed with POS layout styles                                                 

5. No Utility Classes                                                                                

 • No reusable classes for common patterns: .hidden, .flex, .gap-*, .text-center, .font-bold         
 • Instead, each component redefines the same properties                                             
 • Inline style="display:none" used instead of a .hidden class                                       

6. Animation Keyframes Not Scoped                                                                    

 • @keyframes spin defined globally — could conflict with other animations                           
 • No naming convention for keyframes                                                                

7. No Print Styles                                                                                   

 • No @media print rules for receipt printing                                                        
 • Receipt display relies on screen styles                                                           

8. Inconsistent Layout System                                                                        

 • POS layout uses flexbox (.pos-layout)                                                             
 • Product grid uses CSS Grid (.product-grid)                                                        
 • Cart items use flexbox (.cart-item)                                                               
 • No consistent layout methodology across components                                                

Severity: High                                                                                       

-----------------------------------------------------------------------------------------------------


Summary                                                                                              

                                                  
 Category                      Count                    Severity    
 ────────────────────────────────────────────────────────────────── 
 Inline Styles                 15+                      Medium      
 Duplicated CSS                5+ instances             Low-Medium  
 Naming Inconsistencies        10+ instances            Medium      
 Style Leakage Risks           7+ instances             High        
 Responsive Logic Duplication  10+ components affected  High        
 High Specificity Problems     17+ selectors            Medium-High 
 Architectural Debt            8 categories             High        
                                                                    

Overall Assessment: The CSS architecture has significant technical debt. The most critical issues    
are: (1) no scoping mechanism leading to style leakage, (2) massive duplication of responsive logic  
across all components, (3) no design tokens or CSS custom properties, and (4) inconsistent naming    
conventions. These issues will compound as the application grows, making maintenance increasingly    
difficult.                                 