=======
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
.
├── Code.js
├── appsscript.json
├── core
│   ├── auth
│   │   └── authService.js
│   ├── database
│   │   ├── db.js
│   │   ├── migrations
│   │   │   ├── migrationHelpers.js
│   │   │   ├── migrationRunner.js
│   │   │   └── migrationTracker.js
│   │   ├── relations
│   │   │   └── relations.js
│   │   ├── schema
│   │   │   ├── categories.schema.js
│   │   │   ├── migrations.schema.js
│   │   │   ├── products.schema.js
│   │   │   ├── sale_items.schema.js
│   │   │   ├── sales.schema.js
│   │   │   ├── schemaRegistry.js
│   │   │   ├── settings.schema.js
│   │   │   ├── stock_movements.schema.js
│   │   │   ├── units.schema.js
│   │   │   └── users.schema.js
│   │   └── seeders
│   │       ├── categoriesSeeder.js
│   │       ├── seedRunner.js
│   │       └── usersSeeder.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── router
│   │   └── router.js
│   ├── session
│   │   └── sessionManager.js
│   └── tests
│       ├── productTest.js
│       └── salesTest.js
├── modules
│   ├── categories
│   │   ├── categoryService.js
│   │   └── categoryValidator.js
│   ├── products
│   │   ├── productService.js
│   │   ├── productValidator.js
│   │   └── stockService.js
│   ├── sales
│   │   ├──  salesService.js
│   │   └── receiptService.js
│   ├── settings
│   │   └── taxService.js
│   ├── stock
│   │   ├── stockMovementService.js
│   │   └── stockMovementValidator.js
│   └── units
│       ├──  unitService.js
│       ├── unitService.js
│       └── unitValidator.js
└── ui
    ├── app
    │   ├── api.html
    │   ├── app.html
    │   ├── boot.html
    │   ├── index.html
    │   ├── router.html
    │   └── state.html
    ├── components
    │   ├── cartItemRow.html
    │   ├── modal.html
    │   ├── sidebar.html
    │   ├── table.html
    │   └── topbar.html
    ├── modules
    │   ├── categories
    │   │   ├── categories.controller.html
    │   │   └── categories.modal.html
    │   ├── products
    │   │   ├── products.controller.html
    │   │   └── products.modal.html
    │   ├── sales
    │   │   ├── sales.controller.html
    │   │   └── sales.modal.html
    │   ├── settings
    │   │   └── settings.controller.html
    │   └── units
    │       ├── units.controller.html
    │       └── units.modal.html
    ├── pages
    │   ├── categories.html
    │   ├── dashboard.html
    │   ├── login.html
    │   ├── pos.html
    │   ├── products.html
    │   ├── sales.html
    │   ├── settings.html
    │   ├── stockMovements.html
    │   └── units.html
    ├── services
    │   ├── cartService.html
    │   ├── checkoutService.html
    │   ├── editService.html
    │   ├── modalService.html
    │   ├── pricingService.html
    │   ├── printService.html
    │   ├── receiptService.html
    │   ├── scannerService.html
    │   ├── searchService.html
    │   ├── tableService.html
    │   ├── toastService.html
    │   └── uiService.html
    ├── state
    │   └── cartState.html
    └── styles
        ├── responsive.html
        └── theme.html


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
- categories
- stock

Modules should contain:
- services
- validators
- workflows
- helpers

Modules must NOT:
- manipulate DOM directly
- access UI state directly
- bypass validators

### Categories Module

The categories module manages product categories.

**Service API:**
- `CategoryService.getAll(token)` — Get all categories
- `CategoryService.getById(token, id)` — Get category by ID
- `CategoryService.create(token, data)` — Create new category
- `CategoryService.update(token, data)` — Update existing category
- `CategoryService.delete(token, id)` — Delete category

**Validation Rules:**
- Name is required (minimum 2 characters)
- Description is optional

**UI Files:**
- `ui/pages/categories.html` — Page template
- `ui/modules/categories/categories.modal.html` — Create/Edit modal templates
- `ui/modules/categories/categories.controller.html` — Controller logic

### Stock Movements Module

The stock movements module tracks all inventory changes.

**Movement Types:**
| Type | Description | Effect on Stock |
|------|-------------|-----------------|
| SALE | Sold to customer | Decrease |
| PURCHASE | Purchased from supplier | Increase |
| ADJUSTMENT | Manual stock adjustment | Configurable |
| RETURN | Customer return | Increase |
| DAMAGE | Damaged goods | Decrease |
| TRANSFER | Transfer between locations | Configurable |
| MANUAL_IN | Manual stock addition | Increase |
| MANUAL_OUT | Manual stock removal | Decrease |

**Service API:**
- `StockMovementService.getAll(token, filters)` — Get movements with optional filters
- `StockMovementService.getByProduct(token, productId)` — Get movements for a product
- `StockMovementService.record(token, data)` — Record a new movement
- `StockMovementService.getStockHistory(token, productId)` — Get running balance history
- `StockMovementService.getSummary(token, filters)` — Get movement statistics

**Filters for getAll():**
- `product_id` — Filter by product
- `type` — Filter by movement type
- `start_date` — Filter by start date
- `end_date` — Filter by end date

**UI Files:**
- `ui/pages/stockMovements.html` — Page template

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
- ToastService — notification system
- ModalService — popup management
- TableService — data rendering
- SearchService — client-side search/filter engine
- EditService — reusable edit modal engine

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
- react
