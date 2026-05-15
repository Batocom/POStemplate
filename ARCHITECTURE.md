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
- app boot logic

### Pages
Represent full screens.

### Components
Reusable UI sections.

### Styles
Centralized theming system.

## UI Architecture

The UI layer is divided into:
- pages
- components
- styles
- app boot logic

### Pages
Represent full screens.

### Components
Reusable UI sections.

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
