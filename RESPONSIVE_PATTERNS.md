# Responsive Patterns                                                                                                                           
                                                                                                                                                
## Responsive Philosophy                                                                                                                        
                                                                                                                                                
The application follows a strict mobile-first responsive philosophy.                                                                            
                                                                                                                                                
All responsive behavior must be:                                                                                                                
                                                                                                                                                
- **predictable** – the same viewport width always produces the same layout                                                                     
- **centralized** – breakpoints, collapse rules, and layout shifts are defined in a single source of truth                                      
- **reusable** – responsive patterns are applied consistently across all modules                                                                
- **mobile-first** – default styles target the smallest viewport; larger viewports progressively enhance the layout                             
                                                                                                                                                
No page-specific responsive logic is permitted. Every responsive decision must be derived from the centralized breakpoint system and the        
collapse rules defined below.                                                                                                                   
                                                                                                                                                
## Breakpoint System                                                                                                                            
                                                                                                                                                
Breakpoints are defined as CSS custom properties on `:root`. All responsive behavior must reference these tokens. Custom breakpoints are        
forbidden.                                                                                                                                      
                                                                                                                                                
| Token               | Value   | Target Device |                                                                                               
|---------------------|---------|---------------|                                                                                               
| `--bp-mobile`       | 480px   | Small phones  |                                                                                               
| `--bp-tablet`       | 768px   | Tablets       |                                                                                               
| `--bp-desktop`      | 1024px  | Laptops       |                                                                                               
| `--bp-wide`         | 1280px  | Desktops      |                                                                                               
                                                                                                                                                
Rules:                                                                                                                                          
                                                                                                                                                
- All media queries must use `min-width` (mobile-first).                                                                                        
- No `max-width` queries are allowed.                                                                                                           
- The breakpoint tokens are the only values that may appear in media queries.                                                                   
                                                                                                                                                
## Layout Collapse Rules                                                                                                                        
                                                                                                                                                
### Grid Collapse Rules                                                                                                                         
                                                                                                                                                
- **Default (mobile):** all grid containers use a single column (`grid-template-columns: 1fr`).                                                 
- **At `--bp-tablet`:** two-column grids become active.                                                                                         
- **At `--bp-desktop`:** three- or four-column grids become active, depending on the component’s defined maximum columns.                       
- **No grid container may define more columns than its maximum allowed columns at any breakpoint.**                                             
                                                                                                                                                
### Container Width Rules                                                                                                                       
                                                                                                                                                
- **Default (mobile):** containers are full width (`width: 100%`) with a small horizontal padding.                                              
- **At `--bp-tablet`:** containers may have a fixed max-width (e.g., `max-width: 720px`) and become centered.                                   
- **At `--bp-desktop`:** containers may have a larger max-width (e.g., `max-width: 960px`).                                                     
- **At `--bp-wide`:** containers may have a maximum width of `1200px`.                                                                          
- **No container may exceed `1200px` total width.**                                                                                             
                                                                                                                                                
### Page Padding Rules                                                                                                                          
                                                                                                                                                
- **Default (mobile):** page content has `--space-4` (16px) horizontal padding.                                                                 
- **At `--bp-tablet`:** horizontal padding increases to `--space-6` (24px).                                                                     
- **At `--bp-desktop`:** horizontal padding increases to `--space-8` (32px).                                                                    
- **Vertical padding** remains consistent across all breakpoints (`--space-4` top and bottom).                                                  
                                                                                                                                                
## Navigation Responsiveness                                                                                                                    
                                                                                                                                                
### Sidebar Behavior                                                                                                                            
                                                                                                                                                
- **Default (mobile):** the sidebar is hidden off-screen (left). It is revealed as an overlay drawer when a `.sidebar--open` class is applied.  
- **At `--bp-tablet` and above:** the sidebar is always visible as a fixed-width column (256px on desktop, 280px on tablet).                    
- **The sidebar must never overlap page content on desktop.** The main content area must have a left margin equal to the sidebar width.         
- **Transition:** opening/closing the sidebar must use a CSS transition (duration `--transition-normal`, easing `ease-in-out`). The overlay     
backdrop must fade in/out with the same duration.                                                                                               
                                                                                                                                                
### Mobile Navigation Drawer                                                                                                                    
                                                                                                                                                
- The drawer is a full-height overlay that slides in from the left edge.                                                                        
- The drawer width is `280px` on mobile.                                                                                                        
- A semi-transparent backdrop covers the rest of the viewport.                                                                                  
- Tapping the backdrop closes the drawer.                                                                                                       
- The drawer must not scroll with the page body; it is fixed-positioned.                                                                        
                                                                                                                                                
### Topbar Behavior                                                                                                                             
                                                                                                                                                
- **Default (mobile):** the topbar is `56px` tall and contains a hamburger menu button on the left, the application logo, and a user avatar on  
the right.                                                                                                                                      
- **At `--bp-tablet` and above:** the topbar height increases to `64px`. The hamburger button is hidden (sidebar is always visible).            
- **The topbar must remain sticky at the top of the viewport at all breakpoints.**                                                              
                                                                                                                                                
## Table Responsiveness                                                                                                                         
                                                                                                                                                
### CRUD Table → Card Transformation                                                                                                            
                                                                                                                                                
- **Default (mobile):** each table row is rendered as a stacked card. Column headers become labels placed above each value. Action buttons are  
placed at the bottom of each card.                                                                                                              
- **At `--bp-tablet` and above:** the traditional table layout is used. Rows are horizontal, headers are in the `<thead>`.                      
- **The transformation must be handled entirely by CSS media queries.** No JavaScript is required to toggle between layouts.                    
- **Each card must have a minimum touch target of 44px for any interactive element.**                                                           
                                                                                                                                                
### Horizontal Scroll Rules                                                                                                                     
                                                                                                                                                
- **Horizontal scrolling is forbidden on mobile.** If a table cannot be transformed into cards, the table must be hidden and a message displayed
(“Use a larger screen to view this data”).                                                                                                      
- **On desktop**, horizontal scrolling is permitted only when the table width exceeds the container width. A scroll shadow/gradient must        
indicate overflow.                                                                                                                              
                                                                                                                                                
## Form Responsiveness                                                                                                                          
                                                                                                                                                
### Mobile Form Stacking                                                                                                                        
                                                                                                                                                
- **Default (mobile):** all form fields are stacked vertically (one per row). Each field occupies `100%` width.                                 
- **At `--bp-tablet` and above:** related fields may be placed side by side (e.g., first name / last name). The maximum number of inline fields 
is two.                                                                                                                                         
- **Labels** remain above inputs at all breakpoints (never left-aligned).                                                                       
                                                                                                                                                
### Input Sizing Rules                                                                                                                          
                                                                                                                                                
- **Default (mobile):** inputs have `height: 44px` (touch-friendly) and `padding: --space-3` (12px) horizontally.                               
- **At `--bp-tablet` and above:** input height may be reduced to `40px`. Padding remains `--space-3`.                                           
- **All inputs must use the same sizing rules regardless of page.**                                                                             
                                                                                                                                                
## Modal Responsiveness                                                                                                                         
                                                                                                                                                
### Mobile Fullscreen Modal                                                                                                                     
                                                                                                                                                
- **Default (mobile):** the modal occupies the full viewport (`width: 100vw`, `height: 100dvh`). The header contains a close button and the     
title. The body scrolls independently. The footer is sticky at the bottom.                                                                      
- **The modal must have `overflow-y: auto` on the body content.**                                                                               
- **No backdrop is shown on mobile** (the modal covers the entire screen).                                                                      
                                                                                                                                                
### Desktop Centered Modal                                                                                                                      
                                                                                                                                                
- **At `--bp-tablet` and above:** the modal is centered vertically and horizontally. Its width is constrained to a maximum of `500px` (medium)  
or `800px` (large). Its height is constrained to `90vh`.                                                                                        
- **A semi-transparent backdrop is shown behind the modal.**                                                                                    
- **Clicking the backdrop closes the modal.**                                                                                                   
                                                                                                                                                
## POS Responsiveness                                                                                                                           
                                                                                                                                                
### Product Grid Collapse                                                                                                                       
                                                                                                                                                
- **Default (mobile):** the product grid displays one column (single product per row).                                                          
- **At `--bp-tablet`:** two columns.                                                                                                            
- **At `--bp-desktop`:** three columns.                                                                                                         
- **At `--bp-wide`:** four columns.                                                                                                             
- **Each product card must have a minimum touch target of 44px × 44px.**                                                                        
                                                                                                                                                
### Cart Drawer Behavior                                                                                                                        
                                                                                                                                                
- **Default (mobile):** the cart is a full-width drawer that slides up from the bottom. It is hidden by default and toggled via a floating cart 
button.                                                                                                                                         
- **At `--bp-tablet` and above:** the cart is a fixed-width panel (420px) on the right side of the screen, always visible.                      
- **The cart drawer must have a maximum height of `60vh` on mobile, with internal scrolling for long item lists.**                              
                                                                                                                                                
### Checkout Sticky Behavior                                                                                                                    
                                                                                                                                                
- **Default (mobile):** the checkout button and totals are sticky at the bottom of the viewport. They are always visible while the cart drawer  
is open.                                                                                                                                        
- **At `--bp-tablet` and above:** the checkout section is part of the cart panel and scrolls with it (no sticky behavior).                      
                                                                                                                                                
### Payment Modal Behavior                                                                                                                      
                                                                                                                                                
- **Default (mobile):** the payment modal is fullscreen (see Mobile Fullscreen Modal pattern).                                                  
- **At `--bp-tablet` and above:** the payment modal is a centered medium-sized modal (max-width 500px).                                         
- **The payment form must be keyboard-friendly and avoid layout shifts when the virtual keyboard opens.**                                       
                                                                                                                                                
## Touch Ergonomics                                                                                                                             
                                                                                                                                                
### Tap Target Rules                                                                                                                            
                                                                                                                                                
- **All interactive elements** (buttons, links, inputs, quantity controls, remove buttons) must have a minimum touch target of `44px × 44px`.   
- **Spacing between interactive elements** must be at least `8px` (to prevent accidental taps).                                                 
- **These rules apply at all breakpoints, but are especially critical on mobile.**                                                              
                                                                                                                                                
### Mobile Spacing Rules                                                                                                                        
                                                                                                                                                
- **Default (mobile):** vertical spacing between elements is `--space-4` (16px). Horizontal spacing inside cards is `--space-3` (12px).         
- **At `--bp-tablet` and above:** vertical spacing may increase to `--space-5` (20px). Horizontal spacing may increase to `--space-4` (16px).   
- **No element may have less than `--space-2` (8px) of padding on any side on mobile.**                                                         
                                                                                                                                                
## Sticky Element Rules                                                                                                                         
                                                                                                                                                
- **Only the following elements may be sticky:**                                                                                                
  - Topbar (always sticky)                                                                                                                      
  - Sidebar (sticky on desktop, not on mobile)                                                                                                  
  - Checkout controls on POS (mobile only)                                                                                                      
  - Modal footers (mobile only)                                                                                                                 
- **No other element may use `position: sticky`.**                                                                                              
- **Sticky elements must not overlap each other.** The topbar occupies the top `56px` (mobile) / `64px` (desktop). Any other sticky element must
account for this offset.                                                                                                                        
                                                                                                                                                
## Overflow Prevention Rules                                                                                                                    
                                                                                                                                                
- **No horizontal overflow is permitted on the `<body>` element at any breakpoint.**                                                            
- **Content that exceeds the viewport width must be hidden (`overflow-x: hidden`) or transformed (e.g., table → cards).**                       
- **Vertical overflow is permitted and should scroll naturally.**                                                                               
- **Long words or unbreakable strings must be broken (`word-break: break-word` or `overflow-wrap: break-word`).**                               
                                                                                                                                                
## Responsive Utility Behavior                                                                                                                  
                                                                                                                                                
- **Utility classes** that affect responsive behavior must follow the naming convention:                                                        
  - `.hidden-mobile` – hidden below `--bp-tablet`                                                                                               
  - `.hidden-tablet` – hidden between `--bp-tablet` and `--bp-desktop`                                                                          
  - `.hidden-desktop` – hidden at `--bp-desktop` and above                                                                                      
  - `.visible-mobile` – visible only below `--bp-tablet`                                                                                        
  - `.visible-tablet` – visible only between `--bp-tablet` and `--bp-desktop`                                                                   
  - `.visible-desktop` – visible only at `--bp-desktop` and above                                                                               
- **No other responsive utility classes may be created.**                                                                                       
- **These utilities must be defined once in the utility layer and reused across all components.**