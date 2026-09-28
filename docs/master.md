# Study Point — Master Documentation

> **Study Point** is a production-ready **Coaching Management System + Learning Management System (LMS)**.
> This file is the master documentation index for the monorepo. Detailed documentation for each
> subsystem lives in its own file and is linked below.

---

## Documentation Index

| Document | Path | Covers |
|---|---|---|
| **Master Documentation** (this file) | [`docs/master.md`](./master.md) | Project overview, architecture, workflows, config, deployment |
| **Frontend Documentation** | [`docs/frontend.md`](./frontend.md) | React app: structure, routing, state, services, components, styling, build |
| **Backend Documentation** | [`docs/backend.md`](./backend.md) | Spring Boot app: layers, entities, endpoints, security, config, build |
| **Test Plan & Status** | [`docs/test.md`](./test.md) | How to run tests, verified test results, CI checks, gaps |
| **Agent Profile** | [`docs/agent.md`](./agent.md) | Agent identity, workflow, conventions, session context |
| **Project Memory** | [`docs/memory.md`](./memory.md) | Persistent project facts, decisions, known issues, changelog |
| API reference | `docs/api/` | REST endpoints, request/response contracts (Swagger generated) |
| Database docs | `docs/database/` | MySQL schema, seed data, migrations |
| Deployment docs | `docs/deployment/` | Docker, Kubernetes, CI/CD runbooks |

---

## 1. Project Overview

Study Point is a single repository (monorepo) containing a **Spring Boot REST API**, a **React SPA**,
a **MySQL database**, and **DevOps** assets (Docker, Kubernetes, GitHub Actions).

The platform serves eight roles on one codebase:

| Role | Portal |
|---|---|
| `SUPER_ADMIN` | Admin dashboard |
| `ADMIN` | Admin dashboard |
| `TEACHER` | Teacher dashboard |
| `STUDENT` | Student dashboard |
| `PARENT` | Parent dashboard |
| `RECEPTIONIST` | Generic dashboard (fallback) |
| `ACCOUNTANT` | Generic dashboard (fallback) |
| `LIBRARIAN` | Generic dashboard (fallback) |

### Feature domains

- Admissions & enrollment lifecycle
- Academic catalog: courses, subjects, batches, timetable
- Assessments: exams, question banks, results, assignments (+ submissions/grading)
- Attendance (students) and teacher attendance
- People management: students, teachers, parents, users
- Communication: notices, notifications, discussions, grievances
- Learning content: study materials
- Role-based dashboards with live statistics

---

## 2. Repository Layout

```text
studypoint/
├── backend/                 # Spring Boot 3 (Java 21, Maven)
│   ├── src/main/java/com/studypoint/backend/{config,controller,dto,entity,
│   │   exception,mapper,notification,repository,scheduler,security,service,util,validator,websocket}
│   ├── src/main/resources/  # application.yml, application-{dev,prod}.yml
│   ├── src/test/            # Unit & integration tests (JUnit 5, H2)
│   └── pom.xml
├── frontend/                # React 19 + Vite SPA
│   ├── src/{api,assets,components,config,constants,context,pages,routes,
│   │   services,store,styles,utils,hooks,layouts,dashboard,chatbot,discussion,tests}
│   ├── public/              # Static assets
│   └── package.json
├── database/
│   ├── mysql-init.sql       # DB bootstrap script (used by docker-compose)
│   └── {schema, seed, migrations}/
├── docker/
│   ├── backend/Dockerfile
│   ├── frontend/Dockerfile + nginx.conf
│   └── compose/docker-compose.yml
├── kubernetes/
│   ├── base/                # Backend, frontend, MySQL manifests
│   ├── overlays/{dev,prod}/ # Kustomize overlays
│   └── ingress/ingress.yaml
├── docs/                    # ← You are here
├── .github/workflows/ci.yml # CI/CD
├── .env.example             # Environment template
├── README.md                # Upstream summary
└── screenshots/             # Project screenshots
```
---

## 3. Tech Stack

| Layer | Technology | Where |
|---|---|---|
| Backend runtime | Java 21 | `backend/` |
| Backend framework | Spring Boot 3.3, Spring Security 6, Spring Data JPA | `backend/` |
| API documentation | SpringDoc OpenAPI 3 (Swagger UI) | `backend/` |
| Database | MySQL 8 | `database/`, `docker/` |
| Authentication | JWT (access + refresh tokens) | `backend/security/`, `frontend/src/store/` |
| ORM mapping | MapStruct, Lombok | `backend/mapper/`, `backend/entity/` |
| Excel export | Apache POI | `backend/` |
| Frontend framework | React 19 | `frontend/` |
| Build tool (FE) | Vite 5 | `frontend/` |
| State management | Redux Toolkit 2 + react-redux 9 | `frontend/src/store/` |
| Routing | React Router DOM 7 | `frontend/src/routes/` |
| Styling | Tailwind CSS 3 | `frontend/tailwind.config.js` |
| HTTP client | Axios | `frontend/src/api/` |
| Icons | react-icons (Feather) | `frontend/src/` |
| Containerization | Docker, Docker Compose | `docker/` |
| Orchestration | Kubernetes + Kustomize | `kubernetes/` |
| CI/CD | GitHub Actions | `.github/workflows/ci.yml` |

---

## 4. Architecture at a Glance

```text
┌──────────────────────────────┐
│   React SPA (Vite :5173)     │
│  ┌────────────────────────┐  │
│  │ pages / routes / state │  │
│  │ services (Axios)       │─┐│
│  └────────────────────────┘ ││
└────────────────────────────┼┘
                             │ /api  (proxy → :8080 in dev; nginx in prod)
                             ▼
┌────────────────────────────────────────┐
│  Spring Boot REST API (:8080/api)      │
│  ┌──────────────────────────────────┐  │
│  │ SecurityConfig → JWT Filter       │  │
│  │ Controller → Service → Repository│  │
│  │ DTO ↔ Entity (MapStruct)         │  │
│  └──────────────────────────────────┘  │
└───────────────────────┬────────────────┘
                        │ JPA / JDBC
                        ▼
              ┌──────────────────┐
              │   MySQL 8        │
              │   study_point DB │
              └──────────────────┘
```

Key integration points:

- **Dev proxy** — `vite.config.js` proxies `/api` → `http://localhost:8080`.
- **Prod proxy** — `docker/frontend/nginx.conf` proxies `/api/` and `/uploads/` → `backend:8080`.
- **API contract** — Every response is wrapped in the `ApiResponse<T>` envelope
  (`success`, `message`, `data`, `statusCode`, `timestamp`).
- **Auth contract** — JWT is sent as `Authorization: Bearer <accessToken>`; tokens are stored in
  `localStorage` under `accessToken`, `user`, `role`.

### Module dependency flow (backend)

`Controller → Service interface → ServiceImpl → Repository(Spring Data JPA) → MySQL`

Backend is organized per-feature (admissions, assignments, attendance, batches, courses, …)
with cross-cutting packages for `config`, `security`, `exception`, `dto`, `mapper`, and `constants`.
---

## 5. Quick Start

### Prerequisites

- Java 21+
- Node.js 20+
- MySQL 8+
- Maven 3.9+ (or use the Maven wrapper)
- Docker (optional, for containerized dev)

### 1. Environment

```bash
cp .env.example .env   # adjust DB credentials, JWT secret, origins
```

Key variables:

| Variable | Default | Used by |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | `dev` | Backend |
| `SERVER_PORT` | `8080` | Backend |
| `DB_HOST` / `DB_PORT` / `DB_NAME` | `localhost` / `3306` / `study_point` | Backend |
| `DB_USERNAME` / `DB_PASSWORD` | `root` / `admin` | Backend |
| `JWT_SECRET` | dev secret | Backend |
| `JWT_EXPIRATION_MS` | `86400000` (1 day) | Backend |
| `JWT_REFRESH_EXPIRATION_MS` | `604800000` (7 days) | Backend |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Backend |
| `UPLOAD_DIR` | `./uploads` | Backend |
| `VITE_API_URL` | `http://localhost:8080/api` | Frontend |

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run        # or: mvn spring-boot:run
# API base:   http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

### 4. Full stack with Docker Compose

```bash
cd docker/compose
docker-compose up -d          # mysql + backend + frontend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/api/swagger-ui.html

---

## 6. Roles & Access Rules

Role constants live in `backend/.../constants/Role.java` and `frontend/src/config/index.js`.

### Backend security (`SecurityConfig`)

| Pattern | Access |
|---|---|
| `/auth/**`, `/public/**`, `/admissions/**`, `/uploads/**`, `/websocket/**`, Swagger, actuator health | Permit all |
| `/admin/**` | `SUPER_ADMIN`, `ADMIN` only |
| `/students/**` | STUDENT, TEACHER, ADMIN, SUPER_ADMIN, PARENT, RECEPTIONIST |
| `/teachers/**` | TEACHER, ADMIN, SUPER_ADMIN |
| `/parents/**` | PARENT, ADMIN, SUPER_ADMIN |
| anything else | Authenticated |

Method-level `@PreAuthorize` further restricts writes (e.g. course create/update/delete and
publish/toggle are `hasRole('ADMIN') or hasRole('SUPER_ADMIN')`).

### Frontend sidebar visibility (role-gated)

The portal sidebar (`frontend/src/components/layout/Layout.jsx`) shows menu items only when the
signed-in user's role is in the item's `roles` array. All CRUD pages share the same set of routes;
menu visibility + backend authorization gate access.
---

## 7. Conventions

- **REST** — plural nouns (`/courses`, `/students`), CRUD via `GET/POST/PUT/DELETE`, custom actions
  as sub-paths (`/courses/{id}/publish`, `/enrollments/{id}/approve`, `/attendance/bulk-mark`).
- **Pagination** — Spring `Pageable` + `Page<T>`; query params `page`, `size`, `sort`; frontend
  consumes `{ content, totalElements, totalPages, number, size }`.
- **Search** — `GET /{resource}/search?search=<term>&page=&size=`.
- **Response envelope** — always `ApiResponse<T>`.
- **Errors** — standardized via `GlobalExceptionHandler`; validation errors map field → message.
- **Date/time** — ISO-8601 strings (Jackson `write-dates-as-timestamps: false`), UTC.
- **Naming** — Backend: `XxxController`, `XxxService`, `XxxServiceImpl`, `XxxRepository`,
  `XxxRequest`/`XxxResponse`. Frontend: `Xxx.service.js`, `Xxx.jsx` pages, `Xxx.jsx` components.
- **UI conventions** — Tailwind utility classes + semantic component classes implemented in
  `frontend/src/index.css` (`.card`, `.btn-*`, `.input`, `.badge`) and the `lms-*` / `navy-*` palette.

---

## 8. Deployment Options

1. **Local** — run backend + frontend separately (see Quick Start).
2. **Docker Compose** — `docker/compose/docker-compose.yml` spins up MySQL, backend, and an
   nginx-served static frontend build.
3. **Kubernetes** — base manifests + Kustomize overlays (`dev`, `prod`) + ingress in `kubernetes/`.
4. **CI/CD** — `.github/workflows/ci.yml` runs the pipeline on push/PR (see the workflow file for
   exact jobs).

---

## 9. Useful Links

- Repository: https://github.com/UjjwalMandal2119/StudyPoint-LMS-
- Backend documentation: [docs/backend.md](./backend.md)
- Frontend documentation: [docs/frontend.md](./frontend.md)
- Test plan & status: [docs/test.md](./test.md)
- Agent profile: [docs/agent.md](./agent.md)
- Project memory: [docs/memory.md](./memory.md)
- Project README: [`README.md`](../README.md)