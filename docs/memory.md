# Study Point — Project Memory (`memory.md`)

> Persistent, cross-session memory for the StudyPoint monorepo. Read this first when starting any
> task; update it whenever project state changes.
> **Last updated**: 2026-09-28.

---

## 1. Project Snapshot

| Field | Value |
|---|---|
| Project | StudyPoint — Coaching Management System + Learning Management System (monorepo) |
| Repository | https://github.com/UjjwalMandal2119/StudyPoint-LMS- |
| Branch / HEAD | `main` @ `d2f7469` ("Implement utility function for resolving dashboard paths based on user roles.") |
| Backend | Spring Boot 3.3.5 · Java 21 · Maven (`com.studypoint.backend`) |
| Frontend | React 19 · Vite 5 · Redux Toolkit 2 · React Router DOM 7 · Tailwind CSS 3 |
| Database | MySQL 8 (`study_point`) |
| API | REST at `/api` context path, port 8080, Swagger at `/api/swagger-ui.html` |
| DevOps | Docker Compose (`docker/compose/`), Kubernetes + Kustomize (`kubernetes/`), GitHub Actions (`.github/workflows/ci.yml`) |

---

## 2. Architecture Memory (verified facts)

- Backend layering is strict: `Controller → Service (interface + impl) → Repository`.
  DTOs at every boundary; entities never leak to controllers.
- Every backend response is the `ApiResponse<T>` envelope:
  `{ success, message, data, statusCode, timestamp }` (`data` omitted when null).
  Frontend `services/crud.js` unwraps it into `{ data, success, message, status }`.
- Lists are Spring `Page<XxxListResponse>`; frontend consumes
  `{ content, totalElements, totalPages, number, size }`.
- Auth: JWT access (1d) + refresh (7d); frontend stores `accessToken`, `user`, `role` keys in
  `localStorage`; Axios attaches `Authorization: Bearer <accessToken>`.
- Vite dev server proxies `/api` → `http://localhost:8080`. Production nginx proxies
  `/api/` and `/uploads/` → `backend:8080`.
- Role→dashboard mapping (frontend `utils/dashboardPath.js` + `Dashboard` page):
  `ADMIN|SUPER_ADMIN→/admin-dashboard`, `STUDENT→/student-dashboard`,
  `TEACHER→/teacher-dashboard`, `PARENT→/parent-dashboard`, everything else → `/dashboard`.
- Eight roles exist: `SUPER_ADMIN, ADMIN, TEACHER, STUDENT, PARENT, RECEPTIONIST, ACCOUNTANT, LIBRARIAN`.
- JPA auditing (`@EnableJpaAuditing` + `AuditConfig`) fills timestamps on `BaseEntity`;
  `AdminUserSeeder` seeds the initial admin.

---

## 3. Decisions & Conventions (remember these)

### Backend

- REST plural nouns; custom actions as sub-paths (`/courses/{id}/publish`,
  `/enrollments/{id}/approve`, `/attendance/bulk-mark`).
- Search everywhere follows `GET /{resource}/search?search=<term>&page=&size=`.
- `@PreAuthorize` for method-level roles; `SecurityConfig` handles path-level rules.
- MapStruct mappers (interface + `@Mapper(componentModel="spring")`) with Lombok binding.
- Date/time serialized ISO-8601, UTC (`write-dates-as-timestamps: false`).

### Frontend

- One Redux slice only: `auth` (`store/slices/authSlice.js`). Everything else is local state.
- CRUD pages all copy the `pages/Courses.jsx` blueprint — new pages should mirror it.
- Menu visibility is role-filtered in `components/layout/Layout.jsx` (per-item `roles` array).
- Use semantic Tailwind classes from `src/index.css` (`.card`, `.btn-*`, `.input`, `.badge`)
  and the `lms-*` / `navy-*` / `accent-amber` palette.

### Docs

- `docs/master.md` is the documentation index; frontend/backend/test/agent/memory files separate.
- Record only **verified** facts; never fabricate build/test results. Add changelog rows.

---

## 4. Known Issues / Landmines

| # | Issue | Details | Suggested fix |
|---|---|---|---|
| 1 | No Maven wrapper in repo | `mvnw`/`mvnw.cmd` absent, but `docker/backend/Dockerfile` and README reference `./mvnw` | Generate wrapper (`mvn wrapper:wrapper`) or fix Dockerfile to use `mvn` |
| 2 | Backend Dockerfile base-image typo | `eclipse-temraform:21-jre` (misspelled) in `docker/backend/Dockerfile` | Correct to `eclipse-temurin:21-jre` |
| 3 | Frontend test/lint scripts non-runnable | `vitest` and `eslint` are referenced by `package.json` scripts but not installed | Add devDependencies + configs |
| 4 | Zero backend tests | `backend/src/test/` is empty; `mvn test` succeeds with no tests | Add JUnit/H2 unit + `@SpringBootTest` smoke test |
| 5 | `user.service.js` odd import | `src/services/user.service.js` imports `'../services/crud'` (self-relative path that resolves correctly by coincidence) | Normalize to `'./crud'` |
| 6 | Em-dash/UTF-8 in docs | Files are UTF-8; PowerShell console may render `—` as `â€” (cosmetic only) | Use the read tool to view files, not console |
| 7 | Local JDK 25 vs target 21 | Machine runs JDK 25; backend targets Java 21. `mvn compile` works, but tooling mismatch may bite | Use JDK 21 (as CI does via temurin)
---

## 5. Recurring Commands Cheat Sheet

```bash
# Backend
cd backend && mvn -DskipTests compile    # quick compile check
cd backend && mvn test                   # run tests (currently 0 tests, passes)
cd backend && mvn clean package          # full build

# Frontend
cd frontend && npm run dev               # dev server :5173
cd frontend && npm run build             # production build → dist/
cd frontend && npm test                  # BROKEN until vitest installed

# Stack
cd docker/compose && docker-compose up -d
```

---

## 6. Recent Changes Log

### Commits on `main`

| Commit | Message | Implication |
|---|---|---|
| `d2f7469` | Implement utility function for resolving dashboard paths based on user roles | Header "Dashboard" button now uses role-based route via `utils/dashboardPath.js` |
| `23fc8c0` | Add AdminUserSeeder and AuditConfig; update controllers and services for improved functionality and consistency | Initial admin seeded on startup; entities audited |
| `820ecc8` | Refactor dashboard components to use new color scheme and improve styling | Navy/amber palette refactor |
| `584535b` / `a8d644d` / `6215f9b` / `4c0ae77` | remaining functions / dashboard work / file structure / more pages | Incremental feature building |
| `1abbeef` | Study point learning management system personal project | Initial commit |

### Working-tree changes (2026-09-28 — this session)

| File | Change |
|---|---|
| `docs/master.md` | **New** — master documentation index (overview, architecture, quick start, roles, conventions, deployment) |
| `docs/frontend.md` | **New** — full frontend docs (stack, structure, routing, Redux, services, components, styling, docker) |
| `docs/backend.md` | **New** — full backend docs (layers, entities, all endpoints, security, config, db, build) |
| `docs/test.md` | **New** — test plan/status; verified: compile ✅, `mvn test` ✅(0 tests), `npm run build` ✅, `npm test` ❌ |
| `docs/agent.md` | **New** — agent profile, workflow, conventions, session context |
| `docs/memory.md` | **New** — this file |
| `frontend/src/pages/public/About.jsx` | **Rebuilt** — Home-style design: full-bleed navy hero + stats strip, our story, why-choose-us grid, vision/mission/values, founder message section, contact strip, gradient CTA (368 lines) |
| `frontend/src/pages/public/Courses.jsx` | **Rebuilt** — Home-style design: full-bleed navy hero + stats strip, 6 program cards with tags, "what's included" split section, 3-step journey, contact strip, gradient CTA (367 lines) |

---

## 7. Open Items / Next Steps

- [ ] Commit the six new `docs/` files.
- [ ] Resolve Known Issues §4 (mvnw, Dockerfile base image, vitest/eslint, backend tests, import cleanup).
- [ ] Consider adding backend unit tests before more features (see `docs/test.md` §5).
- [ ] Keep `memory.md` updated on every significant state change.

---

## 8. Changelog (for this file)

| Date | Change |
|---|---|
| 2026-09-28 | Created; snapshot at HEAD `d2f7469`, recorded verified build/test status, conventions, known issues, recent changes |
| 2026-09-28 | Rebuilt `pages/public/About.jsx` & `pages/public/Courses.jsx` to match Home page design system; frontend `npm run build` verified ✅ (exit 0) |