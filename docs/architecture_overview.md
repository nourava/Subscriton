# Brightloop – Architecture Overview

## 1. System High-Level Topology

```
+-------------------------------------------------------------+
|                      React Frontend (Vite)                  |
|                                                             |
|  +-------------------+  +--------------------------------+  |
|  |    Core Auth      |  |         Shared Design System   |  |
|  | (RBAC: Admin/     |  | (Tokens, Navbar, Sidebar,     |  |
|  |  Staff/Customer)  |  |  Cards, Badges, ApiClient)     |  |
|  +-------------------+  +--------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                  10 Modular Features                  |  |
|  | AdminDashboard | Products | Plans | Customers | Quote |  |
|  | Subscriptions  | Invoices | Discounts | Pay | Reports |  |
|  +-------------------------------------------------------+  |
+------------------------------+------------------------------+
                               |
                   REST HTTP / JSON Requests
                               |
                               v
+-------------------------------------------------------------+
|               Django REST Framework (Backend)               |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                    config (Settings & URLs)           |  |
|  |   CORS Middleware  |  JWT / Session Auth  |  Routing  |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |                   9 Decoupled Django Apps             |  |
|  | accounts | products | plans | quotations | subs       |  |
|  | invoices | discounts | payments | reports             |  |
|  +-------------------------------------------------------+  |
+------------------------------+------------------------------+
                               |
                      Database ORM / SQL
                               |
                               v
+-------------------------------------------------------------+
|                 PostgreSQL Central Database                 |
|            (Tables, Foreign Keys, Indexes, JSONB)           |
+-------------------------------------------------------------+
```

## 2. Communication & State Flow
- **Frontend to Backend**:
  - `apiClient` manages standardized HTTP calls with Authorization headers.
  - Proxy configuration in `vite.config.js` routes `/api/*` to `http://localhost:8000/api/*`.
- **Live Health Polling**:
  - The Navbar automatically probes `/api/health/` every 30 seconds to provide developers immediate visual feedback on backend connectivity.
- **RBAC Enforcement**:
  - Frontend: `<ProtectedRoute allowedRoles={[...]}>` conditionally grants UI access and displays clear access restriction prompts.
  - Backend: Django permission classes (`IsAuthenticated`, `IsAdminUser`, role decorators) guard API endpoints.
