# Study Point — Enterprise Backend Structure

This document defines the **standardized enterprise package and file structure** for the
Study Point backend (`com.studypoint.backend`). Every package declares its responsibility
via a `package-info.java`; keep this layout when adding or moving code.

## Layered Architecture

| Layer | Package(s) | Responsibility |
|-------|------------|----------------|
| Web / Presentation | `controller`, `controller.*` | Thin REST controllers; validate requests, delegate to services, return `ApiResponse` |
| API contract | `dto/request`, `dto/response`, `dto/auth` | Request/response DTOs with Bean Validation; never expose entities directly |
| Business | `service`, `service.impl`, `service.*` | Interfaces + `@Service`/`@Transactional` implementations containing the use-cases |
| Data access | `repository` | Spring Data JPA repositories |
| Domain / Persistence | `entity` | JPA entities |
| Mapping | `mapper` | MapStruct converters (`Entity ↔ DTO`) |
| Security | `security`, `config` | JWT filter/service, `UserDetailsService`, `SecurityFilterChain`, CORS |
| Cross-cutting | `exception`, `constants`, `util`, `validator` | Global exception handler, enums/constants, stateless helpers, custom constraints |
| Extensions (reserved) | `notification`, `scheduler`, `websocket` | Email/push delivery, background jobs, realtime messaging |

## Package Tree (canonical)

```text
com.studypoint.backend
├── StudyPointApplication.java      # Spring Boot entry point
├── config/                         # Security, OpenAPI, async & infra beans
├── constants/                      # Enums & shared constants
├── controller/                     # Role-agnostic REST endpoints
│   ├── admin/                      # Admin-only endpoints
│   ├── auth/                       # login / register / refresh / logout
│   ├── common/                     # Shared endpoints
│   ├── student/                    # Student endpoints
│   └── teacher/                    # Teacher endpoints
├── dto/
│   ├── auth/                       # Token request/response payloads
│   ├── request/                    # Create/update payloads (+ validation)
│   └── response/                   # ApiResponse, list & page responses
├── entity/                         # JPA entities (base classes under entity/base)
├── exception/                      # Domain exceptions + GlobalExceptionHandler
├── mapper/                         # MapStruct mappers
├── notification/                   # (reserved) email/push/SMS abstraction
├── repository/                     # Spring Data repositories (base under repository/base)
├── scheduler/                      # (reserved) scheduled jobs
├── security/                       # JwtService, JwtAuthenticationFilter, UserDetails
├── service/
│   ├── impl/                       # Concrete @Service implementations
│   ├── admin/ │ auth/ │ student/ │ teacher/   # role-scoped interfaces
├── util/                           # Stateless helpers
├── validator/                       # Reusable validation constraints
└── websocket/                       # (reserved) WebSocket handling
```

## Rules

1. **Controllers stay thin** — no business logic; return the standardized `ApiResponse`
   envelope; rely on `GlobalExceptionHandler` for error contracts.
2. **DTOs, not entities, cross the API boundary** — use MapStruct mappers.
3. **Use-case interfaces** live in `service/`; implementations in `service/impl/`.
4. **Role-based endpoints** are grouped under `controller/<role>` & `service/<role>`.
5. **Validation** is declarative on request DTOs (`@Valid`) with reusable constraints in `validator/`.
6. **Components** use Lombok + constructor injection; business code is `@Transactional`.
7. New packages must include a `package-info.java` describing responsibility.

## Run (dev)

```bash
# 1. MySQL (local) — or: docker compose up mysql
# 2. Backend
cd backend && mvn spring-boot:run        # http://localhost:8080/api  (Swagger: /api/swagger-ui.html)
# 3. Frontend
cd frontend && npm run dev              # http://localhost:5173
```