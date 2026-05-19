Responsive Audit

Fixed Width Problems                                                                                 

Pattern: width: 256px on desktop sidebar                                                             

Locations:                                                                                           

 • src/ui/styles/responsive.html (line 27): .sidebar--desktop { width: 256px; }                      

Issue: Fixed pixel width does not scale with font-size or viewport. On very small desktop screens    
(1024px), the sidebar consumes 25% of the viewport width, leaving limited space for content.         

Impact: Content area becomes cramped on smaller desktop screens. No max-width or min-width fallback. 

-----------------------------------------------------------------------------------------------------

Pattern: width: 280px on mobile sidebar                                                              

Locations:                                                                                           

 • src/ui/styles/responsive.html (line 33): .sidebar--mobile { width: 280px; }                       

Issue: Fixed pixel width with max-width: 85vw is a partial fix, but the base width is still a        
hardcoded pixel value.                                                                               

Impact: On very narrow phones (320px), the sidebar could be wider than the viewport if the max-width 
clamp fails.                                                                                         

-----------------------------------------------------------------------------------------------------

Pattern: width: 220px on donut chart canvas                                                          

Locations:                                                                                           

 • src/ui/pages/dashboard.html (line 206): canvas.width = 220;                                       

Issue: Hardcoded pixel width for canvas element. Does not respond to container width changes.        

Impact: On mobile, the chart may overflow its container or appear too small. The canvas does not     
resize when the parent container shrinks.                                                            

-----------------------------------------------------------------------------------------------------

Pattern: width: 95% on mobile modals                                                                 

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 107-109): .modal-content { width: 95% !important; }          

Issue: Using !important to override desktop modal widths. The base modal widths (modal-sm, modal-md, 
modal-lg) are likely defined in pixels elsewhere.                                                    

Impact: Fragile override pattern. If modal widths change, the mobile override may not apply          
correctly.                                                                                           

-----------------------------------------------------------------------------------------------------


Overflow Problems                                                                                    

Pattern: No overflow handling on sidebar nav buttons                                                 

Locations:                                                                                           

 • src/ui/components/sidebar.html (lines 12-26): Navigation buttons with emoji + text labels         

Issue: Long page names or translations could cause text overflow. No text-overflow: ellipsis or      
overflow: hidden on sidebar nav buttons.                                                             

Impact: On narrow mobile sidebar (280px), long labels could break layout or be cut off without       
indication.                                                                                          

-----------------------------------------------------------------------------------------------------

Pattern: No overflow handling on topbar user name                                                    

Locations:                                                                                           

 • src/ui/components/topbar.html (line 16): <span class="topbar__user">${State.user?.name ||         
   ""}</span>                                                                                        
 • src/ui/styles/responsive.html (line 82): .topbar__user { max-width: 120px; overflow: hidden;      
   text-overflow: ellipsis; white-space: nowrap; }                                                   

Issue: The topbar user name has overflow handling, but the sidebar nav buttons do not. Inconsistent  
overflow strategy.                                                                                   

Impact: Sidebar nav buttons may overflow on mobile while topbar user name is properly truncated.     

-----------------------------------------------------------------------------------------------------

Pattern: No overflow handling on table cells                                                         

Locations:                                                                                           

 • src/ui/app/app.html (lines 60-100): Sales table with invoice numbers, customer names, amounts     
 • src/ui/app/app.html (lines 170-220): Products table with names, prices, stock values              
 • src/ui/pages/dashboard.html (lines 130-170): Low stock products table                             
 • src/ui/pages/dashboard.html (lines 175-215): Recent transactions table                            

Issue: Table cells have no max-width, overflow: hidden, or text-overflow: ellipsis. Long product     
names or invoice numbers will cause horizontal overflow.                                             

Impact: On mobile, tables will scroll horizontally or cells will expand beyond the viewport.         

-----------------------------------------------------------------------------------------------------


Table Responsiveness                                                                                 

Pattern: No responsive table transformation                                                          

Locations:                                                                                           

 • src/ui/app/app.html (lines 60-100): Sales table with 5 columns                                    
 • src/ui/app/app.html (lines 170-220): Products table with 6 columns                                
 • src/ui/app/app.html (lines 230-280): Stock movements table with 5 columns                         
 • src/ui/pages/dashboard.html (lines 130-170): Low stock products table with 3 columns              
 • src/ui/pages/dashboard.html (lines 175-215): Recent transactions table with 5 columns             

Issue: All tables use traditional <table> layout with no responsive transformation (no card-based    
layout on mobile). The overflow-x-auto wrapper is used in dashboard tables but not consistently.     

Impact: On mobile screens (<768px), tables with 5-6 columns will be extremely narrow or require      
horizontal scrolling. The overflow-x-auto wrapper in dashboard tables provides horizontal scroll, but
the app.html tables (rendered via Table.render()) may not have this wrapper.                         

-----------------------------------------------------------------------------------------------------

Pattern: Inconsistent overflow-x-auto usage                                                          

Locations:                                                                                           

 • src/ui/pages/dashboard.html (line 145): html += '<div class="overflow-x-auto"><table class="w-full
   text-left">';                                                                                     
 • src/ui/pages/dashboard.html (line 190): html += '<div class="overflow-x-auto"><table class="w-full
   text-left">';                                                                                     

Issue: Dashboard tables use overflow-x-auto wrapper, but app.html tables (rendered via               
Table.render()) do not show this wrapper in the provided code.                                       

Impact: Inconsistent table responsiveness. Some tables scroll horizontally, others may break layout. 

-----------------------------------------------------------------------------------------------------

Pattern: No horizontal scroll on Table.render() output                                               

Locations:                                                                                           

 • src/ui/app/app.html (lines 60-100): Table.render('salesTableInner', { ... })                      
 • src/ui/app/app.html (lines 170-220): Table.render('productsTableInner', { ... })                  
 • src/ui/app/app.html (lines 230-280): Table.render('stockMovementsTableInner', { ... })            

Issue: The Table.render() function output is not wrapped in an overflow-x-auto container in the      
provided code. The table component implementation is in src/ui/components/table.html (not provided), 
but the calling code does not show any responsive wrapper.                                           

Impact: Tables may overflow their containers on mobile without horizontal scrolling capability.      

-----------------------------------------------------------------------------------------------------


Modal Responsiveness                                                                                 

Pattern: Mobile modal width override with !important                                                 

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 107-109): .modal-content { width: 95% !important; }          

Issue: Using !important to override desktop modal widths. This is a fragile pattern that can be      
broken by specificity changes.                                                                       

Impact: If modal widths are updated, the mobile override may not apply correctly. The !important flag
makes debugging difficult.                                                                           

-----------------------------------------------------------------------------------------------------

Pattern: No modal height handling on mobile                                                          

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 107-109): .modal-content { max-height: 90vh !important; }    

Issue: Modal content is limited to 90vh, but there is no overflow handling for long content. No      
overflow-y: auto is specified.                                                                       

Impact: Long modal content (e.g., receipt details, product lists) may be cut off on mobile without   
scroll capability.                                                                                   

-----------------------------------------------------------------------------------------------------

Pattern: No modal position adjustment on mobile                                                      

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 107-109): Modal responsive styles                            

Issue: Modal positioning (centered on desktop) may not work well on mobile where the keyboard can    
push content. No top or margin adjustments for mobile.                                               

Impact: On mobile with keyboard open, modals may be pushed off-screen or become inaccessible.        

-----------------------------------------------------------------------------------------------------


Navigation Responsiveness                                                                            

Pattern: Sidebar close button only visible on mobile                                                 

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 49-51): .sidebar__close-btn { display: none; }               
 • src/ui/styles/responsive.html (lines 55-57): @media (max-width: 767px) { .sidebar__close-btn {    
   display: block; } }                                                                               

Issue: The close button is hidden on desktop and shown only on mobile. This is correct behavior, but 
the close button is inside the sidebar header, which is always rendered.                             

Impact: On desktop, the close button SVG is still in the DOM but hidden. Minor performance impact,   
but no functional issue.                                                                             

-----------------------------------------------------------------------------------------------------

Pattern: Sidebar overlay only on mobile                                                              

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 44-46): .sidebar-overlay { display: none; }                  
 • src/ui/styles/responsive.html (lines 60-62): @media (min-width: 768px) { .sidebar--mobile,        
   .sidebar-overlay { display: none !important; } }                                                  

Issue: The overlay is correctly hidden on desktop. However, the overlay uses display: none which     
cannot be animated. The sidebar uses transform: translateX(-100%) with transition, but the overlay   
toggles between display: none and display: block.                                                    

Impact: The overlay appears/disappears instantly without fade animation, creating a jarring UX on    
mobile.                                                                                              

-----------------------------------------------------------------------------------------------------

Pattern: No active page indicator in sidebar                                                         

Locations:                                                                                           

 • src/ui/components/sidebar.html (lines 12-26): Navigation buttons                                  

Issue: No visual indicator for the currently active page. All buttons look identical regardless of   
current page.                                                                                        

Impact: Users cannot easily identify which page they are on, especially on mobile where the sidebar  
is hidden after navigation.                                                                          

-----------------------------------------------------------------------------------------------------

Pattern: Sidebar closes on navigation but no animation                                               

Locations:                                                                                           

 • src/ui/components/sidebar.html (lines 12-26): onclick="Router.go('dashboard');                    
   UIService.closeSidebar();"                                                                        

Issue: Sidebar closes immediately on navigation with no transition delay. The sidebar has a CSS      
transition (0.3s ease), but the navigation happens instantly.                                        

Impact: Users see the new page content before the sidebar finishes closing, which can be             
disorienting.                                                                                        

-----------------------------------------------------------------------------------------------------


POS Responsiveness                                                                                   

Pattern: No POS-specific responsive styles in provided files                                         

Locations:                                                                                           

 • src/ui/pages/pos.html: POS page (not provided in full)                                            
 • src/ui/styles/responsive.html: No POS-specific responsive rules                                   

Issue: The POS page is the most interaction-heavy interface but has no responsive styles in the      
provided files. The POS_WORKFLOW.md mentions "stacked layout" and "collapsible cart" for mobile, but 
no CSS implementation is visible.                                                                    

Impact: POS page may not render correctly on mobile devices. Cart and product grid may not stack     
properly.                                                                                            

-----------------------------------------------------------------------------------------------------

Pattern: No touch-friendly spacing for POS                                                           

Locations:                                                                                           

 • src/ui/styles/responsive.html: No touch-target size specifications                                

Issue: No minimum touch target sizes (44px recommended) for POS buttons, cart items, or product grid 
items.                                                                                               

Impact: On mobile, buttons and interactive elements may be too small to tap accurately, causing user 
frustration.                                                                                         

-----------------------------------------------------------------------------------------------------


Touch Ergonomics                                                                                     

Pattern: No minimum touch target sizes                                                               

Locations:                                                                                           

 • src/ui/styles/responsive.html: All interactive elements                                           
 • src/ui/components/sidebar.html (lines 12-26): Sidebar nav buttons with padding: 10px 12px         
 • src/ui/components/topbar.html (line 5): Hamburger button with padding: 8px                        
 • src/ui/components/topbar.html (line 18): Logout button with padding: 6px 12px                     

Issue: No minimum touch target size (44x44px recommended by WCAG). Sidebar nav buttons are           
approximately 40px tall (10px padding top + 10px padding bottom + font-size 14px). Hamburger button  
is approximately 40px tall (8px padding top + 8px padding bottom + 24px icon). Logout button is      
approximately 26px tall (6px padding top + 6px padding bottom + 14px font).                          

Impact: On mobile, buttons may be too small to tap accurately, especially the logout button (26px    
tall) and hamburger button (40px tall).                                                              

-----------------------------------------------------------------------------------------------------

Pattern: No hover state fallback for touch devices                                                   

Locations:                                                                                           

 • src/ui/styles/responsive.html (line 68): .sidebar__nav-btn:hover { background:                    
   var(--color-sidebar-hover); }                                                                     
 • src/ui/styles/responsive.html (line 84): .topbar__hamburger:hover { background:                   
   var(--color-topbar-hamburger-hover-bg); }                                                         
 • src/ui/styles/responsive.html (line 104): .topbar__logout:hover { background-color:               
   var(--color-logout-hover-bg); }                                                                   

Issue: Hover states are defined but there is no @media (hover: hover) query to distinguish between   
hover-capable and touch devices. On touch devices, hover states may "stick" after tapping.           

Impact: On mobile, buttons may show hover state after tap, which persists until the user taps        
elsewhere. This creates visual confusion.                                                            

-----------------------------------------------------------------------------------------------------

Pattern: No active state for touch feedback                                                          

Locations:                                                                                           

 • src/ui/styles/responsive.html: All interactive elements                                           

Issue: No :active state defined for any button. Touch devices rely on :active for immediate visual   
feedback.                                                                                            

Impact: Users receive no visual confirmation when tapping buttons on mobile, making the interface    
feel unresponsive.                                                                                   

-----------------------------------------------------------------------------------------------------


Grid Collapse Issues                                                                                 

Pattern: Dashboard stats cards grid                                                                  

Locations:                                                                                           

 • src/ui/pages/dashboard.html (line 4): <div class="grid grid-cols-1 md:grid-cols-4 gap-4">         

Issue: The grid uses Tailwind-like classes grid-cols-1 md:grid-cols-4. On mobile (single column),    
each card is full width. On desktop (4 columns), cards are side by side. This is correct behavior,   
but the cards have p-6 padding which may be too large on mobile.                                     

Impact: On mobile, 4 stacked cards with p-6 (24px) padding each may consume too much vertical space  
before any content is visible.                                                                       

-----------------------------------------------------------------------------------------------------

Pattern: Charts row grid                                                                             

Locations:                                                                                           

 • src/ui/pages/dashboard.html (line 30): <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">        

Issue: Charts stack on mobile (single column) and sit side by side on desktop (2 columns). The gap-6 
(24px) gap is consistent. However, the chart canvases have hardcoded pixel dimensions (220px for     
donut, calculated for bar chart).                                                                    

Impact: On mobile, the bar chart canvas width is calculated from parent.clientWidth - 32, which      
should work. The donut chart has a hardcoded 220px width, which may be too small on mobile or        
overflow on very small screens.                                                                      

-----------------------------------------------------------------------------------------------------

Pattern: No responsive grid for product grid in POS                                                  

Locations:                                                                                           

 • src/ui/pages/pos.html: POS page (not provided in full)                                            

Issue: The POS page likely has a product grid that needs responsive behavior. No responsive grid     
styles are visible in the provided files.                                                            

Impact: Product grid may not adapt to mobile screens, showing too many columns or overflowing.       

-----------------------------------------------------------------------------------------------------


Mobile Spacing Issues                                                                                

Pattern: Inconsistent content padding                                                                

Locations:                                                                                           

 • src/ui/styles/responsive.html (line 22): .layout__content { padding: 12px; }                      

Issue: Content area has 12px padding on all sides. This is consistent across mobile and desktop since
no media query overrides it.                                                                         

Impact: On desktop, 12px padding may feel too tight. On mobile, it may be adequate. No responsive    
adjustment.                                                                                          

-----------------------------------------------------------------------------------------------------

Pattern: Dashboard card padding                                                                      

Locations:                                                                                           

 • src/ui/pages/dashboard.html (lines 5-28): Stats cards with p-6 (24px padding)                     
 • src/ui/pages/dashboard.html (lines 31-42): Chart cards with p-6 (24px padding)                    
 • src/ui/pages/dashboard.html (lines 45-52): Low stock card with p-6 (24px padding)                 
 • src/ui/pages/dashboard.html (lines 55-62): Recent transactions card with p-6 (24px padding)       

Issue: All dashboard cards use p-6 (24px) padding. On mobile, this padding combined with the 12px    
content padding creates 36px of horizontal padding on each side, leaving only approximately 248px of 
content width on a 320px phone.                                                                      

Impact: Content inside cards becomes very narrow on mobile. Text may wrap awkwardly, and tables may  
overflow.                                                                                            

-----------------------------------------------------------------------------------------------------

Pattern: No responsive spacing scale                                                                 

Locations:                                                                                           

 • src/ui/styles/responsive.html: All spacing values                                                 

Issue: Spacing values (padding, margin, gap) are not adjusted for mobile. The same values are used   
across all breakpoints.                                                                              

Impact: On mobile, spacing may be too large (wasting vertical space) or too small (cramped layout).  
No responsive spacing strategy exists.                                                               

-----------------------------------------------------------------------------------------------------

Pattern: Toast container positioning on mobile                                                       

Locations:                                                                                           

 • src/ui/styles/responsive.html (lines 97-103): .toast-container { position: fixed; top: 16px;      
   right: 16px; }                                                                                    
 • src/ui/styles/responsive.html (lines 105-108): @media (max-width: 767px) { .toast-container {     
   left: 16px; right: 16px; top: 8px; } }                                                            

Issue: Toast container expands to full width on mobile (left: 16px, right: 16px). This is correct for
mobile, but the toast messages themselves may not have responsive width handling.                    

Impact: Long toast messages may overflow or wrap awkwardly on mobile.                                

-----------------------------------------------------------------------------------------------------


Summary of Key Findings                                                                              

                                                               
 Issue Category                      Severity  Locations                  
 ──────────────────────────────────────────────────────────────────────── 
 Fixed width sidebar (256px)         Medium    responsive.html            
 Fixed width mobile sidebar (280px)  Low       responsive.html            
 Fixed width canvas (220px)          Medium    dashboard.html             
 No table responsive transformation  High      app.html, dashboard.html   
 Inconsistent overflow-x-auto        Medium    app.html vs dashboard.html 
 Modal !important override                   Medium    responsive.html            
 No modal scroll on mobile                   Medium    responsive.html            
 Sidebar overlay no animation                Low       responsive.html            
 No active page indicator                    Medium    sidebar.html               
 No POS responsive styles                    High      pos.html (missing)         
 No minimum touch targets (44px)             High      All buttons                
 No hover/touch distinction                  Medium    responsive.html            
 No active state for touch                   Medium    All buttons                
 Dashboard card padding too large on mobile  Medium    dashboard.html             
 No responsive spacing scale                 Medium    responsive.html            
 Content padding not responsive              Low       responsive.html            
                                                                         