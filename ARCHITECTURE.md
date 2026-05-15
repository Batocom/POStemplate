# POS Architecture

## Overview

This project is an AI-native Point of Sale (POS) and business
operating system built on Google Apps Script and Google Sheets.

The system is designed to:
- be modular
- support scalable business workflows
- support AI-assisted development
- allow future migration beyond Apps Script
- maintain schema-driven architecture
- support multi-module business operations

The architecture prioritizes:
- maintainability
- readability
- reusability
- migration safety
- predictable runtime flow
- AI agent compatibility

## Core Philosophy

The system follows these principles:

1. Schema-first development
2. Modular business domains
3. Clear separation of concerns
4. Predictable data flow
5. Centralized services
6. Migration-safe database evolution
7. Reusable UI components
8. AI-readable architecture
9. Minimal hidden dependencies
10. Explicit business logic

## Architecture Layers

The application is divided into 3 major layers:

### Core Layer
Handles:
- authentication
- database
- routing
- middleware
- sessions
- infrastructure

### Module Layer
Handles:
- business logic
- workflows
- validations
- domain-specific services

### UI Layer
Handles:
- rendering
- pages
- components
- state
- routing
- frontend interactions

## Directory Structure
|   appsscript.json
|   Code.js
|
+---core
|   +---auth
|   |       authService.js
|   |
|   +---database
|   |   |   db.js
|   |   |
|   |   +---migrations
|   |   |       migrationHelpers.js
|   |   |       migrationRunner.js
|   |   |       migrationTracker.js
|   |   |
|   |   +---relations
|   |   |       relations.js
|   |   |
|   |   +---schema
|   |   |       migrations.schema.js
|   |   |       products.schema.js
|   |   |       sales.schema.js
|   |   |       sale_items.schema.js
|   |   |       schemaRegistry.js
|   |   |       stock_movements.schema.js
|   |   |       units.schema.js
|   |   |       users.schema.js
|   |   |
|   |   \---seeders
|   |           seedRunner.js
|   |           usersSeeder.js
|   |
|   +---middleware
|   |       authMiddleware.js
|   |
|   +---router
|   |       router.js
|   |
|   +---session
|   |       sessionManager.js
|   |
|   \---tests
|           productTest.js
|           salesTest.js
|
+---modules
|   +---products
|   |       productService.js
|   |       productValidator.js
|   |       stockService.js
|   |
|   +---sales
|   |        salesService.js
|   |       receiptService.js
|   |
|   \---units
|            unitService.js
|
\---ui
    +---app
    |       api.html
    |       app.html
    |       boot.html
    |       index.html
    |       router.html
    |       state.html
    |
    +---components
    |       modal.html
    |       sidebar.html
    |       topbar.html
    |
    +---modules
    |   \---products
    |           products.controller.html
    |           products.modal.html
    |
    +---pages
    |       dashboard.html
    |       login.html
    |       products.html
    |
    +---services
    |       toastService.html
    |
    \---styles
            theme.html

## Runtime Flow

The system follows this request lifecycle:

UI Event
→ Router
→ Middleware
→ Service Layer
→ Database Layer
→ State Update
→ UI Re-render

## Database Architecture

The database layer is schema-driven.

Each table is defined using:
- schema files
- migration files
- relation definitions
- seeders

### Database Responsibilities
- schema validation
- migrations
- data persistence
- relationship management
- audit consistency

## Schema Rules

All schemas must:
- include timestamps
- use consistent IDs
- define relationships explicitly
- avoid hidden fields
- support migration safety

## Module Architecture

Each module represents a business domain.

Example:
- products
- sales
- units

Modules should contain:
- services
- validators
- workflows
- helpers

Modules must NOT:
- manipulate DOM directly
- access UI state directly
- bypass validators

## Service Layer Rules

Services are responsible for:
- business logic
- calculations
- workflows
- orchestration

Services should:
- remain stateless where possible
- avoid UI rendering
- avoid direct DOM access
- return structured responses

## Validation Rules

All user input must pass through validators.

Examples:
- productValidator.js
- salesValidator.js

Validation should occur before:
- database writes
- stock updates
- calculations

## UI Architecture

The UI layer is divided into:
- pages
- components
- styles
- services
- app boot logic

### Pages
Represent full screens.

### Components
Reusable UI sections.

### Services
Reusable infrastructure components that provide:
- consistent APIs
- centralized logic
- cross-module functionality

Examples:
- ToastService - notification system
- ModalService - popup management
- TableService - data rendering

## UI Services Reference

### ToastService (`src/ui/services/toastService.html`)

A centralized notification system for displaying temporary messages.

**API:**
```javascript
Toast.success(message)   // Green success toast
Toast.error(message)     // Red error toast
Toast.warning(message)   // Yellow warning toast
Toast.info(message)      // Blue info toast
```

**Usage:**
```javascript
// After successful operation
Toast.success('Product created successfully');

// After failed operation
Toast.error('Failed to delete product');

// For warnings
Toast.warning('Stock is running low');

// For informational messages
Toast.info('Processing your request...');
```

**Behavior:**
- Toasts auto-dismiss after 3 seconds
- Only one toast visible at a time (new toast replaces existing)
- Slide-in/slide-out animations
- Positioned at top-right corner
- Color-coded by type

### ModalService (`src/ui/services/modalService.html`)

A centralized popup/modal system for displaying dialogs, forms, confirmations, and loading states.

### SearchService (`src/ui/services/searchService.html`)

A standalone client-side search/filter engine that can be used independently of tables, dropdowns, lists, or any UI component.

**API:**
```javascript
Search.filter(data, query, fields, options)     // Filter array of objects
Search.highlight(text, query)                    // Wrap matches in <mark> tags
Search.matches(text, query)                      // Boolean check if text matches
Search.score(text, query)                        // Return match score (0-1)
Search.suggest(data, query, field, limit)        // Get autocomplete suggestions
```

**`Search.filter()` Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | Array | required | Array of objects to filter |
| `query` | string | required | Search query string |
| `fields` | Array\|string | required | Field(s) to search (supports dot notation) |
| `options.threshold` | number | 0 | Minimum score to include (0-1) |
| `options.sortByScore` | boolean | false | Sort results by relevance |

**Usage Examples:**

```javascript
// 1. Basic search across multiple fields
const results = Search.filter(users, 'john', ['name', 'email']);

// 2. Search with nested fields
const results = Search.filter(products, 'laptop', ['title', 'category.name']);

// 3. Search with relevance sorting
const results = Search.filter(items, 'abc', 'name', {
  sortByScore: true,
  threshold: 0.2
});

// 4. Highlight matches in text
const html = Search.highlight('John Doe', 'john');
// Returns: '<mark>John</mark> Doe'

// 5. Check if text matches
if (Search.matches(product.name, 'laptop')) {
  // do something
}

// 6. Get autocomplete suggestions
const suggestions = Search.suggest(products, 'lap', 'name', 5);
// Returns: ['Laptop', 'Laptop Bag']

// 7. Score a match (0-1)
const relevance = Search.score('John Doe', 'john');
// Returns: 0.8 (starts with)
```

**Scoring Rules:**
| Score | Condition |
|-------|-----------|
| 1.0 | Exact match |
| 0.8 | Starts with query |
| 0.6 | Contains query as whole word |
| 0.4 | Contains query |
| 0.0 | No match |

**Architecture Rules:**
1. Use `Search.filter()` instead of manual `Array.filter()` for search functionality
2. Use `Search.highlight()` to show matches in UI
3. Use `Search.suggest()` for autocomplete/typeahead features
4. Always specify fields explicitly — never search all fields blindly
5. Use dot notation for nested fields (e.g., `category.name`)
6. The `TableService` uses `Search.filter()` internally — no need to duplicate search logic

### TableService (`src/ui/services/tableService.html`)

A reusable data table engine for displaying, sorting, searching, and paginating tabular data.

**API:**
```javascript
Table.render(containerId, options)     // Render a table in a container
Table.refresh(containerId, newData)    // Update table data
Table.destroy(containerId)             // Remove table instance
Table.getSelectedIds(containerId)      // Get currently selected row IDs
```

**`Table.render()` Options:**
```javascript
Table.render('containerId', {
  columns: [
    { key: 'name', label: 'Product', sortable: true },
    { key: 'price', label: 'Price', sortable: true,
      render: function(val, row) { return '$' + val; }
    }
  ],
  data: [
    { id: '1', name: 'Product A', price: 10.99 },
    { id: '2', name: 'Product B', price: 24.99 }
  ],
  actions: [
    { label: 'Edit', class: 'text-blue-600', onClick: function(row) { ... } },
    { label: 'Delete', class: 'text-red-600', onClick: function(row) { ... } }
  ],
  selectable: true,
  onSelectionChange: function(selectedIds) { ... },
  pageSize: 10,
  searchable: true,
  emptyMessage: 'No data found',
  onSort: function(key, direction) { ... }
})
```

**Column Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `key` | string | required | Data field name (supports dot notation) |
| `label` | string | required | Column header text |
| `sortable` | boolean | true | Enable sorting on this column |
| `render` | function | null | Custom render function `(value, row) => HTML` |
| `width` | string | null | Tailwind width class (e.g., '32') |

**Features:**
- Column sorting (click header to toggle asc/desc)
- Client-side search/filter across all columns
- Pagination with configurable page size
- Bulk select with Select All checkbox
- Custom cell rendering via `render` function
- Action buttons per row
- Empty state message
- Selection change callback

**Usage Examples:**

```javascript
// 1. Basic table
Table.render('myTable', {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ],
  data: users
});

// 2. Table with custom rendering
Table.render('productsTable', {
  columns: [
    { key: 'name', label: 'Product' },
    { key: 'stock', label: 'Stock',
      render: function(val) {
        if (val > 10) return '<span class="text-green-600">' + val + '</span>';
        if (val > 0) return '<span class="text-yellow-600">' + val + '</span>';
        return '<span class="text-red-600">Out of Stock</span>';
      }
    }
  ],
  data: products,
  actions: [
    { label: 'Edit', onClick: function(row) { editProduct(row.id); } }
  ],
  selectable: true,
  searchable: true,
  pageSize: 20
});

// 3. Refresh table data
Table.refresh('productsTable', newProducts);

// 4. Get selected IDs
const selected = Table.getSelectedIds('productsTable');

// 5. Destroy table
Table.destroy('productsTable');
```

**Architecture Rules:**
1. All data tables must use `TableService` — never create custom table HTML
2. Column definitions should be in the page controller, not in templates
3. Use `render` functions for formatting, not inline HTML
4. Always provide an `id` field in data for selection to work
5. Use `Table.refresh()` instead of re-rendering for data updates
6. Destroy tables when navigating away from a page

**File Organization:**
```
ui/
├── services/
│   ├── toastService.html      # Toast notifications
│   ├── modalService.html      # Modal/popup system
│   ├── searchService.html     # Search/filter engine
│   └── tableService.html      # Data table engine
├── components/
│   ├── modal.html             # Legacy stub
│   └── table.html             # Table component stub
└── modules/
    └── products/
        ├── products.controller.html
        └── products.modal.html
```

**Loading Order (in index.html):**
```
1. state.html          # State management
2. api.html            # API communication
3. router.html         # Page routing
4. sidebar.html        # UI components
5. topbar.html         # UI components
6. modal.html          # Legacy stub
7. toastService.html   # Services
8. modalService.html   # Services
9. searchService.html  # Services (utility, before tableService)
10. tableService.html  # Services (AFTER searchService)
11. login.html         # Pages
11. dashboard.html     # Pages
12. products.html      # Pages
13. products.modal.html # Module templates
14. products.controller.html # Module controllers
15. app.html           # App shell
16. boot.html          # Bootstrap
```

**API:**
```javascript
Modal.open(options)                    // Open a custom modal
Modal.close()                          // Close the current modal
Modal.confirm(message)                 // Show confirm dialog, returns Promise<boolean>
Modal.alert(message)                   // Show alert dialog
Modal.loading(message)                 // Show loading spinner
Modal.setLoading(state)                // Toggle loading state in current modal
```

**`Modal.open()` Options:**
```javascript
Modal.open({
  title: 'Modal Title',                // Header text
  content: '<p>HTML content</p>',      // Body content (HTML string)
  size: 'md',                          // sm | md | lg | xl | full
  closable: true,                      // Show close button
  closeOnEscape: true,                 // Close on Escape key
  closeOnOutsideClick: true,           // Close on overlay click
  onClose: function() { ... }          // Callback when modal closes
})
```

**Usage Examples:**

```javascript
// 1. Open a form modal
Modal.open({
  title: 'Add Product',
  content: document.getElementById('formTemplate').innerHTML,
  size: 'lg'
});

// 2. Confirm dialog (async)
const confirmed = await Modal.confirm('Are you sure you want to delete this product?');
if (confirmed) {
  // proceed with deletion
}

// 3. Alert dialog
Modal.alert('Product saved successfully');

// 4. Loading state
Modal.loading('Processing your order...');

// 5. Update loading state
Modal.setLoading(true);   // Show spinner
Modal.setLoading(false);  // Hide spinner

// 6. Close modal programmatically
Modal.close();
```

**Backward Compatibility:**
The following legacy functions are still available for existing code:
```javascript
openModal(content)   // Equivalent to Modal.open({ content, size: 'lg' })
closeModal()         // Equivalent to Modal.close()
```

**Modal Sizes:**
| Size | CSS Class | Use Case |
|------|-----------|----------|
| `sm` | `max-w-sm` | Confirmations, alerts |
| `md` | `max-w-lg` | Default, simple forms |
| `lg` | `max-w-2xl` | Complex forms, data entry |
| `xl` | `max-w-4xl` | Large content, tables |
| `full` | `max-w-full mx-4` | Full-width content |

**Architecture Rules:**
1. All modals must use `ModalService` — never create custom modal HTML
2. Modal content should be defined in `<template>` tags in dedicated files
3. Modal controllers should be in `ui/modules/<module>/` directory
4. Never duplicate modal HTML across pages
5. Use `Modal.confirm()` instead of native `confirm()` for consistency
6. Use `Modal.alert()` instead of native `alert()` for consistency

**File Organization:**
```
ui/
├── services/
│   ├── toastService.html      # Toast notifications
│   └── modalService.html      # Modal/popup system
├── modules/
│   └── products/
│       ├── products.controller.html   # Product modal logic
│       └── products.modal.html        # Product modal templates
└── components/
    └── modal.html             # Legacy stub (backward compat only)
```

**Loading Order (in index.html):**
```
1. state.html          # State management
2. api.html            # API communication
3. router.html         # Page routing
4. sidebar.html        # UI components
5. topbar.html         # UI components
6. modal.html          # Legacy stub
7. toastService.html   # Services
8. modalService.html   # Services (AFTER toastService)
9. login.html          # Pages
10. dashboard.html     # Pages
11. products.html      # Pages
12. products.modal.html # Module templates
13. products.controller.html # Module controllers
14. app.html           # App shell
15. boot.html          # Bootstrap
```

### Styles
Centralized theming system.

## UI Architecture

The UI layer is divided into:
- pages
- components
- styles
- services
- app boot logic

### Pages
Represent full screens.

### Components
Reusable UI sections.

### Services
Reusable infrastructure components that provide:
- consistent APIs
- centralized logic
- cross-module functionality

Examples:
- ToastService - notification system
- ModalService - popup management
- TableService - data rendering

### Styles
Centralized theming system.

## State Management

Frontend state should remain centralized.

State examples:
- authenticated user
- cart state
- loaded products
- dashboard metrics

UI should render from state,
not directly from API responses.

## Authentication Flow

Authentication flow:

Login Page
→ Auth Service
→ Session Manager
→ Auth Middleware
→ Route Access

## Routing System

The router is responsible for:
- page navigation
- access control
- middleware execution
- page rendering

## Error Handling

Errors should:
- be centralized
- return structured responses
- avoid silent failures
- provide actionable messages

try/catch conventions
logging rules

## API Communication Standard

All communication between frontend and backend
must follow this pattern:

### Server Side (router.js)
All `handleRequest` cases must return
`JSON.stringify()` wrapped responses:

```javascript
case "GET_PRODUCTS":
  const data = Service.getAll(token);
  return JSON.stringify({ success: true, data });
```

### Client Side (api.html)
The `api()` function returns raw response.
Each consumer must parse the JSON string:

```javascript
const raw = await api('GET_PRODUCTS');
const response = typeof raw === 'string'
  ? JSON.parse(raw)
  : raw;

if (!response.success) {
  // handle error
}

const data = response.data;
```

### Rationale
Google Apps Script's `google.script.run`
cannot reliably serialize complex objects
(arrays of objects, nested structures).
Returning JSON strings ensures data integrity
across the client-server boundary.

### Error Responses
Errors should follow the same pattern:

```javascript
return JSON.stringify({
  success: false,
  error: "Error message"
});
```

### Client Error Handling
```javascript
if (!response.success) {
  throw new Error(response.error);
}
```

This standard ensures:
- reliable data transfer
- consistent error handling
- scalable communication
- easy debugging
- migration safety

## Testing Strategy

The system supports:
- module tests
- workflow tests
- integration tests

New features should include tests where possible.

## AI Agent Rules

AI agents working on this project must:

1. Never bypass validators
2. Never modify schemas without migrations
3. Never access database tables directly outside db.js
4. Never manipulate DOM from services
5. Always use module boundaries
6. Preserve naming conventions
7. Maintain backward compatibility where possible
8. Add tests for critical workflows
9. Avoid global variables outside app namespace
10. Document major architectural changes

## Naming Conventions

Services:
productService.js

Validators:
productValidator.js

Schemas:
products.schema.js

Methods:
createProduct()
updateStock()
generateReceipt()

## Planned Evolution

Future architecture goals:
- centralized state manager
- event-driven workflows
- AI assistant integration
- multi-store support
- offline support
- API abstraction layer
- external database migration support

## Migration Vision

The architecture is intentionally designed
to support future migration from:
- Google Sheets
- Apps Script

to:
- Supabase
- PostgreSQL
- Firebase
- Node.js
- React
