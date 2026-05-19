                                                                                                                                                
# UI Migration Plan                                                                                                                             
                                                                                                                                                
## Migration Philosophy                                                                                                                         
                                                                                                                                                
The migration follows a **foundation-first** approach. Each phase builds on the previous one, ensuring that every layer of the styling          
architecture is stable before higher-level components are migrated.                                                                             
                                                                                                                                                
- **No big‑bang rewrites.** Every phase produces a working application that can be deployed independently.                                      
- **Backward compatibility is maintained** until the final cleanup phase. Legacy code coexists with new code during the transition.             
- **Validation gates** are required before moving to the next phase.                                                                            
- **AI‑assisted development** is supported by the explicit, token‑driven structure defined in the styling architecture.                         
                                                                                                                                                
## Migration Rules                                                                                                                              
                                                                                                                                                
1. **Token first** – no CSS value may be hardcoded after Phase 1.                                                                               
2. **Utility first** – component styles must use utility classes before adding custom CSS.                                                      
3. **Mobile first** – all new CSS must be mobile‑first; `max‑width` queries are forbidden.                                                      
4. **No inline styles** – after Phase 2, no new inline styles may be introduced; existing inline styles must be removed during Phase 8.         
5. **Component isolation** – each component’s CSS must be scoped to its own class namespace.                                                    
6. **One source of truth** – breakpoints, spacing, typography, and colors must be referenced only from the token layer.                         
7. **No page‑specific responsive logic** – all responsive behavior must be derived from the centralized breakpoint system.                      
                                                                                                                                                
## Migration Safety Rules                                                                                                                       
                                                                                                                                                
- **Every phase must be reversible.** If a phase introduces a regression, the team must be able to roll back to the previous phase without data 
loss.                                                                                                                                           
- **Legacy code must not be removed** until the new code has been verified in production for at least one release cycle.                        
- **Feature flags** must be used for any migration that changes visible layout behavior (e.g., responsive table transformation).                
- **Automated visual regression tests** must be added before each phase that alters layout.                                                     
- **Manual QA checklist** must be executed on three viewport widths (360 px, 768 px, 1280 px) after each phase.                                 
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 1 — Design System Foundation                                                                                                           
                                                                                                                                                
**Purpose:** Establish the token layer and base styles so that all subsequent phases can reference a single source of truth.                    
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. Define CSS custom properties for:                                                                                                            
   - Colors (primary, secondary, success, danger, warning, info, gray scale)                                                                    
   - Spacing scale (`--space‑1` through `--space‑8`)                                                                                            
   - Typography scale (`--text‑xs` through `--text‑xl`)                                                                                         
   - Border radius (`--radius‑sm`, `--radius‑md`, `--radius‑lg`)                                                                                
   - Shadows (`--shadow‑sm`, `--shadow‑md`, `--shadow‑lg`)                                                                                      
   - Z‑index values (`--z‑dropdown`, `--z‑modal`, `--z‑toast`, `--z‑sidebar`)                                                                   
   - Breakpoints (`--bp‑mobile`, `--bp‑tablet`, `--bp‑desktop`, `--bp‑wide`)                                                                    
   - Transition durations (`--transition‑fast`, `--transition‑normal`, `--transition‑slow`)                                                     
2. Create `reset.css` (normalize browser defaults).                                                                                             
3. Create `globals.css` (body defaults, font family, line height, color).                                                                       
4. Create `animations.css` (keyframes for `fadeIn`, `fadeOut`, `slideIn`, `slideOut`, `slideUp`, `slideDown`).                                  
5. Create `main.css` entry point that imports all token and base files.                                                                         
6. Add the `<link>` to `main.css` in the parent HTML template (or inject via server‑side include).                                              
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- None (this is the first phase).                                                                                                               
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Token naming conflicts** – ensure token names do not collide with existing CSS variables in `theme.html`. A prefix (`--pos‑`) may be used   
temporarily and removed later.                                                                                                                  
- **Missing tokens** – some design values may not be captured in the initial token set. The team must be prepared to add tokens during later    
phases.                                                                                                                                         
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- `ui/styles/tokens/colors.css`                                                                                                                 
- `ui/styles/tokens/spacing.css`                                                                                                                
- `ui/styles/tokens/typography.css`                                                                                                             
- `ui/styles/tokens/shadows.css`                                                                                                                
- `ui/styles/tokens/radius.css`                                                                                                                 
- `ui/styles/tokens/breakpoints.css`                                                                                                            
- `ui/styles/tokens/zindex.css`                                                                                                                 
- `ui/styles/base/reset.css`                                                                                                                    
- `ui/styles/base/globals.css`                                                                                                                  
- `ui/styles/base/animations.css`                                                                                                               
- `ui/styles/main.css`                                                                                                                          
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- All tokens are accessible via `var(--token‑name)` in the browser’s developer tools.                                                           
- No hardcoded color, spacing, or typography values remain in the token files.                                                                  
- The page renders without visual regressions (baseline screenshot comparison).                                                                 
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- Token layer is merged into the main branch.                                                                                                   
- All team members can reference tokens in their local development environment.                                                                 
- Automated visual regression tests pass.                                                                                                       
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 2 — Utility System                                                                                                                     
                                                                                                                                                
**Purpose:** Create a reusable utility layer that eliminates repetitive CSS patterns and reduces the need for custom component styles.          
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. Create `ui/styles/utilities/layout.css`:                                                                                                     
   - `.flex`, `.flex‑col`, `.flex‑wrap`, `.items‑center`, `.justify‑between`, `.justify‑center`, `.gap‑*` (using spacing tokens).               
2. Create `ui/styles/utilities/spacing.css`:                                                                                                    
   - `.p‑*`, `.px‑*`, `.py‑*`, `.pt‑*`, `.pb‑*`, `.pl‑*`, `.pr‑*`, `.m‑*`, `.mx‑*`, `.my‑*`.                                                    
3. Create `ui/styles/utilities/typography.css`:                                                                                                 
   - `.text‑*` (using typography tokens), `.font‑bold`, `.font‑medium`, `.font‑semibold`, `.text‑center`, `.text‑left`, `.text‑right`.          
4. Create `ui/styles/utilities/visibility.css`:                                                                                                 
   - `.hidden`, `.visible`, `.hidden‑mobile`, `.hidden‑tablet`, `.hidden‑desktop`, `.visible‑mobile`, `.visible‑tablet`, `.visible‑desktop`.    
5. Create `ui/styles/utilities/responsive.css`:                                                                                                 
   - `.w‑full`, `.max‑w‑*` (using container width tokens), `.overflow‑hidden`, `.overflow‑auto`.                                                
6. Update `main.css` to import all utility files.                                                                                               
7. Replace the most common inline style patterns (e.g., `style="display:none"`) with utility classes in a single page (e.g., POS page) as a     
proof of concept.                                                                                                                               
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 1 (token layer must exist).                                                                                                             
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Utility class naming collisions** – existing Tailwind‑like classes (e.g., `p‑4`, `bg‑blue‑600`) may conflict. The team must decide whether  
to adopt the same naming or use a prefix. **Recommendation:** adopt the same naming to ease migration, but document that these are now custom   
utilities, not Tailwind.                                                                                                                        
- **Over‑engineering** – avoid creating utilities that are never used. Start with the most common patterns identified in the UI audit.          
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Utility CSS files listed above.                                                                                                               
- Updated `main.css`.                                                                                                                           
- Proof‑of‑concept page (POS) using utility classes instead of inline styles.                                                                   
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- Utility classes render correctly across all breakpoints.                                                                                      
- No regression in the proof‑of‑concept page.                                                                                                   
- All utility classes are documented in a style guide (can be a simple HTML page).                                                              
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- Utility layer is merged.                                                                                                                      
- Team members can use utility classes in new code.                                                                                             
- At least one page uses utilities instead of inline styles.                                                                                    
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 3 — Responsive Foundation                                                                                                              
                                                                                                                                                
**Purpose:** Implement the centralized responsive behavior contracts defined in `RESPONSIVE_PATTERNS.md`. This phase ensures that all future    
components and pages behave consistently across viewports.                                                                                      
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. Create `ui/styles/layout/grid.css`:                                                                                                          
   - `.grid`, `.grid‑cols‑1`, `.grid‑cols‑2`, `.grid‑cols‑3`, `.grid‑cols‑4` with mobile‑first media queries.                                   
2. Create `ui/styles/layout/containers.css`:                                                                                                    
   - `.container`, `.container‑sm`, `.container‑md`, `.container‑lg` with max‑width and centering.                                              
3. Create `ui/styles/layout/app‑shell.css`:                                                                                                     
   - Sidebar and topbar responsive rules (sidebar hidden on mobile, visible on tablet+; topbar height change).                                  
4. Create `ui/styles/layout/sidebar.css`:                                                                                                       
   - Overlay drawer behavior, transition, backdrop.                                                                                             
5. Create `ui/styles/layout/topbar.css`:                                                                                                        
   - Sticky positioning, height, hamburger visibility.                                                                                          
6. Add responsive utility classes for page padding (`.page‑padding`).                                                                           
7. Update `main.css` to import all layout files.                                                                                                
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 1 (tokens for breakpoints, spacing).                                                                                                    
- Phase 2 (utility classes for flex/grid helpers).                                                                                              
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Sidebar overlay animation** – the current sidebar uses `display: block/none`. Changing to a transition may cause a flash of content. Use a  
feature flag to toggle the new behavior.                                                                                                        
- **Topbar height change** – existing pages may rely on the 80 px topbar offset. The new 56 px/64 px heights must be tested across all pages.   
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Layout CSS files listed above.                                                                                                                
- Updated `main.css`.                                                                                                                           
- Feature‑flagged sidebar overlay animation.                                                                                                    
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- Sidebar opens/closes with animation on mobile.                                                                                                
- Sidebar is always visible on tablet+.                                                                                                         
- Topbar is sticky and does not overlap page content.                                                                                           
- Page padding matches the contract at each breakpoint.                                                                                         
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- Responsive layout foundation is merged.                                                                                                       
- All new pages must use the layout classes.                                                                                                    
- Legacy pages continue to work (no regression).                                                                                                
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 4 — App Shell Migration                                                                                                                
                                                                                                                                                
**Purpose:** Migrate the app shell (sidebar, topbar, main content wrapper) to use the new layout and utility layers. This is the first phase    
that touches existing HTML templates.                                                                                                           
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. Refactor `app‑shell.html`:                                                                                                                   
   - Replace inline SVG styles with utility classes.                                                                                            
   - Use `.sidebar`, `.topbar`, `.main‑content` classes from Phase 3.                                                                           
   - Add `.sidebar--open` class toggle via JavaScript (already exists).                                                                         
   - Ensure the sidebar overlay uses the new transition.                                                                                        
2. Refactor `sidebar.html` (if separate) to use utility classes.                                                                                
3. Refactor `topbar.html` (if separate) to use utility classes.                                                                                 
4. Remove any duplicate HTML in mobile/desktop branches (if present).                                                                           
5. Add active page indicator to sidebar (CSS only, no JavaScript).                                                                              
6. Add `:active` state for touch feedback on sidebar links.                                                                                     
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 3 (layout CSS must be in place).                                                                                                        
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Sidebar width mismatch** – the new CSS uses 256 px desktop / 280 px tablet. Existing pages may have hardcoded margins. A global             
search‑and‑replace may be needed.                                                                                                               
- **Topbar height change** – same risk as Phase 3, but now applied to the actual template.                                                      
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Updated `app‑shell.html`.                                                                                                                     
- Updated `sidebar.html` (if exists).                                                                                                           
- Updated `topbar.html` (if exists).                                                                                                            
- Active page indicator CSS.                                                                                                                    
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- App shell renders correctly on mobile (sidebar hidden, topbar 56 px).                                                                         
- App shell renders correctly on tablet+ (sidebar visible, topbar 64 px).                                                                       
- Sidebar overlay animation works.                                                                                                              
- Active page indicator highlights the current page.                                                                                            
- Touch feedback (`:active`) is visible.                                                                                                        
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- App shell migration is merged.                                                                                                                
- All pages use the same shell template.                                                                                                        
- No regression in navigation behavior.                                                                                                         
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 5 — Shared Component Migration                                                                                                         
                                                                                                                                                
**Purpose:** Extract the most duplicated UI patterns into reusable components. This phase reduces code duplication and establishes a component  
library.                                                                                                                                        
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. **Button component** (`ui/components/buttons.css`):                                                                                          
   - `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--danger`, `.btn--text`.                                                                  
   - Disabled state (`.btn--disabled`).                                                                                                         
   - Standardize padding (use `--space‑3` vertical, `--space‑4` horizontal).                                                                    
2. **Form field component** (`ui/components/forms.css`):                                                                                        
   - `.form‑field`, `.form‑field__label`, `.form‑field__input`, `.form‑field__hint`, `.form‑field__error`.                                      
   - Input sizing (44 px height mobile, 40 px tablet+).                                                                                         
3. **Card component** (`ui/components/cards.css`):                                                                                              
   - `.card`, `.card__header`, `.card__body`, `.card__footer`.                                                                                  
   - Consistent padding (`--space‑4`).                                                                                                          
4. **Table container component** (`ui/components/tables.css`):                                                                                  
   - `.table‑container`, `.table‑container__loading`, `.table‑container__error`, `.table‑container__empty`.                                     
   - Responsive card transformation (CSS only).                                                                                                 
5. **Modal component** (`ui/components/modals.css`):                                                                                            
   - `.modal`, `.modal--fullscreen`, `.modal--centered`, `.modal__header`, `.modal__body`, `.modal__footer`.                                    
   - Remove duplicate CSS from `modalService.html`.                                                                                             
6. **Toast component** (`ui/components/toast.css`):                                                                                             
   - `.toast`, `.toast--success`, `.toast--error`, `.toast--info`.                                                                              
   - Replace inline style manipulation with CSS classes.                                                                                        
7. **Cart item component** (`ui/components/cart.css`):                                                                                          
   - `.cart‑item`, `.cart‑item__name`, `.cart‑item__controls`, `.cart‑item__qty‑btn`, `.cart‑item__remove`.                                     
   - Ensure quantity buttons are 44 px × 44 px.                                                                                                 
8. Update `main.css` to import all component files.                                                                                             
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 2 (utility classes for layout).                                                                                                         
- Phase 3 (responsive foundation for modal sizing).                                                                                             
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Button padding change** – existing buttons use `py‑2` (8 px) or `py‑3` (12 px). Standardizing to `--space‑3` (12 px) will change visual     
appearance. Must get design approval.                                                                                                           
- **Modal CSS removal** – the duplicate style block in `modalService.html` must be removed carefully. Ensure the new `modals.css` is loaded     
before any modal is opened.                                                                                                                     
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Component CSS files listed above.                                                                                                             
- Updated `main.css`.                                                                                                                           
- Updated `modalService.html` (remove duplicate CSS, use new classes).                                                                          
- Updated `toastService.html` (use CSS classes instead of inline styles).                                                                       
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- All buttons render with consistent padding.                                                                                                   
- Form fields have correct height and spacing.                                                                                                  
- Cards have consistent padding.                                                                                                                
- Table container shows loading/error/empty states correctly.                                                                                   
- Modal opens/closes with correct sizing (fullscreen on mobile, centered on desktop).                                                           
- Toast notifications animate correctly.                                                                                                        
- Cart item quantity buttons are 44 px × 44 px.                                                                                                 
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- Component CSS files are merged.                                                                                                               
- `modalService.html` no longer contains duplicate CSS.                                                                                         
- `toastService.html` uses CSS classes.                                                                                                         
- All new components are documented in the style guide.                                                                                         
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 6 — CRUD Page Migration                                                                                                                
                                                                                                                                                
**Purpose:** Migrate all CRUD pages (categories, units, products, stock movements, sales, settings) to use the new component and utility layers.
This phase eliminates the duplicated page header, card container, and table patterns.                                                           
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. **Page header** – replace the 6 instances of the header pattern with a reusable `.page‑header` component (CSS only, no JavaScript).          
2. **Card container** – replace the 5 instances of the card wrapper with `.card` component.                                                     
3. **Table rendering** – replace manual table HTML with the table container component. Use the existing `tableService.html` (or a simplified    
version) for data binding.                                                                                                                      
4. **Form fields** – replace input HTML with `.form‑field` component.                                                                           
5. **Modal forms** – ensure all modal forms use the modal component and form field component.                                                   
6. **Action buttons** – replace all primary/secondary/danger buttons with `.btn` classes.                                                       
7. **Loading/error/empty states** – use the table container component’s built‑in states.                                                        
8. **Responsive behavior** – add responsive card transformation to all tables (CSS only).                                                       
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 5 (component CSS must be in place).                                                                                                     
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Table service adoption** – the existing `tableService.html` is feature‑rich but not used by any module. Migrating to it may introduce bugs. 
**Recommendation:** create a simplified version that only handles rendering, not sorting/pagination, and add those features later.              
- **Form field consistency** – some forms have unique fields (e.g., settings page). Ensure the form field component is flexible enough to       
accommodate them.                                                                                                                               
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Updated CRUD page templates (categories, units, products, stock movements, sales, settings).                                                  
- Updated JavaScript controllers (if needed) to use new component classes.                                                                      
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- Each CRUD page renders correctly on mobile (card layout) and desktop (table layout).                                                          
- Loading, error, and empty states display correctly.                                                                                           
- Form fields have correct sizing and spacing.                                                                                                  
- Buttons have consistent padding.                                                                                                              
- Modal forms open/close correctly.                                                                                                             
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- All CRUD pages use the new component and utility layers.                                                                                      
- No duplicate page header or card container patterns remain.                                                                                   
- Responsive table transformation works on mobile.                                                                                              
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 7 — POS Migration                                                                                                                      
                                                                                                                                                
**Purpose:** Migrate the POS page to use the new component and responsive layers. This is the most interaction‑heavy page and requires careful  
handling of touch ergonomics and layout shifts.                                                                                                 
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. **Product grid** – use `.grid` and `.grid‑cols‑*` classes for responsive columns.                                                            
2. **Product card** – ensure minimum touch target of 44 px × 44 px.                                                                             
3. **Cart drawer** – use `.cart‑drawer` component with responsive behavior (full‑width on mobile, fixed‑width on desktop).                      
4. **Cart item** – use `.cart‑item` component (consolidate with `cartItemRow.html`).                                                            
5. **Checkout section** – use sticky behavior on mobile (`.checkout‑sticky`), scroll with cart on desktop.                                      
6. **Payment modal** – use modal component with fullscreen on mobile, centered on desktop.                                                      
7. **Quantity buttons** – increase to 44 px × 44 px.                                                                                            
8. **Inline styles** – replace all `style="display:none/block/flex"` with utility classes (`.hidden`, `.flex`).                                 
9. **Payment method buttons** – consolidate duplicate CSS into `.btn` variants.                                                                 
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- Phase 5 (component CSS for cart, modal, buttons).                                                                                             
- Phase 3 (responsive layout for grid and cart drawer).                                                                                         
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Cart drawer animation** – the current cart uses `display: block/none`. Changing to a slide‑up animation may cause layout shift. Use a       
feature flag.                                                                                                                                   
- **Quantity button size increase** – may affect layout of cart items. Test on multiple screen sizes.                                           
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Updated POS page template.                                                                                                                    
- Updated POS JavaScript (if needed) to use new component classes.                                                                              
- Consolidated `cartItemRow.html` (or removed if dead code).                                                                                    
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- Product grid displays 1 column on mobile, 2 on tablet, 3 on desktop, 4 on wide.                                                               
- Cart drawer slides up on mobile, is fixed on desktop.                                                                                         
- Checkout button is sticky on mobile, scrolls on desktop.                                                                                      
- Payment modal is fullscreen on mobile, centered on desktop.                                                                                   
- All interactive elements have 44 px minimum touch target.                                                                                     
- No inline styles remain in POS page.                                                                                                          
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- POS page migration is merged.                                                                                                                 
- Cart item rendering is consolidated into a single component.                                                                                  
- All inline styles are replaced with utility classes.                                                                                          
                                                                                                                                                
---                                                                                                                                             
                                                                                                                                                
## Phase 8 — Cleanup & Legacy Removal                                                                                                           
                                                                                                                                                
**Purpose:** Remove all legacy CSS, duplicated styles, inline styles, and dead code. This phase finalizes the migration and ensures the codebase
is clean.                                                                                                                                       
                                                                                                                                                
### Tasks                                                                                                                                       
                                                                                                                                                
1. **Remove duplicate CSS in modal service** – verify that `modals.css` is loaded and the duplicate `<style>` block in `modalService.html` can  
be safely deleted.                                                                                                                              
2. **Remove duplicate receipt modal** – consolidate `sales.html` and `sales.modal.html` into a single component. Update all references.         
3. **Remove dead file `modal.html`** – delete if it contains only a comment and legacy script.                                                  
4. **Remove unused chart color tokens** – delete from CSS if not used.                                                                          
5. **Replace all remaining inline styles** – search for `style=` in all HTML files and replace with utility classes.                            
6. **Remove legacy CSS from `<style>` blocks** – after all components are migrated, delete the `<style>` blocks from individual pages.          
7. **Remove Tailwind‑like classes** – if the team decided to use custom utilities, replace any remaining Tailwind classes with the custom       
equivalents.                                                                                                                                    
8. **Remove `theme.html`** – if all its tokens are now in the token layer, delete it.                                                           
9. **Remove `responsive.html`** – if all its styles are now in the layout layer, delete it.                                                     
10. **Final visual regression test** – compare screenshots of all pages before and after cleanup.                                               
                                                                                                                                                
### Dependencies                                                                                                                                
                                                                                                                                                
- All previous phases must be complete.                                                                                                         
                                                                                                                                                
### Risks                                                                                                                                       
                                                                                                                                                
- **Accidental removal of needed styles** – some legacy styles may still be referenced by JavaScript that hasn’t been migrated. Use a search    
tool to verify no references remain before deleting.                                                                                            
- **Receipt modal consolidation** – two files share the same modal ID (`salesModalContent`). Ensure all JavaScript references are updated to the
single component.                                                                                                                               
                                                                                                                                                
### Deliverables                                                                                                                                
                                                                                                                                                
- Cleaned‑up HTML files (no inline styles, no `<style>` blocks).                                                                                
- Deleted legacy files (modal.html, theme.html, responsive.html if applicable).                                                                 
- Consolidated receipt modal component.                                                                                                         
- Updated `modalService.html` (no duplicate CSS).                                                                                               
                                                                                                                                                
### Validation Requirements                                                                                                                     
                                                                                                                                                
- All pages render without visual regressions.                                                                                                  
- No inline styles remain in any HTML file.                                                                                                     
- No duplicate CSS exists in any file.                                                                                                          
- All legacy files are deleted.                                                                                                                 
- Visual regression tests pass.                                                                                                                 
                                                                                                                                                
### Completion Criteria                                                                                                                         
                                                                                                                                                
- Cleanup phase is merged.                                                                                                                      
- Codebase is fully migrated to the new styling architecture.                                                                                   
- No legacy CSS, inline styles, or duplicated patterns remain.                                                                                  
- The application is ready for future enhancements (dark mode, theming, PWA).  