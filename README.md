# Study Point

Study Point is a coaching-institute management and learning platform. This repository contains a React single-page application, a Spring Boot REST API, and MySQL-backed application data, together with Docker and Kubernetes deployment files.

## Contents

- [What the application includes](#what-the-application-includes)
- [Technology](#technology)
- [Architecture](#architecture)
- [Run locally](#run-locally)
- [Configuration](#configuration)
- [Build and test](#build-and-test)
- [API and documentation](#api-and-documentation)
- [Deployment status](#deployment-status)
- [Repository layout](#repository-layout)

## What the application includes

The current web application provides public pages, sign-in and registration, role-based dashboards, and protected management pages for:

- Admissions and enrollments
- Courses, subjects, batches, and timetables
- Students, teachers, parents, and users
- Attendance and teacher attendance
- Exams, questions, assignments, submissions, and results
- Study materials
- Notices, notifications, discussions, and grievances

The frontend defines roles for `SUPER_ADMIN`, `ADMIN`, `TEACHER`, `STUDENT`, `PARENT`, `RECEPTIONIST`, `ACCOUNTANT`, and `LIBRARIAN`. Dashboards are provided for administrators, students, teachers, and parents; the remaining roles use the application's general dashboard behavior.

## Technology

| Area | Main technologies |
| --- | --- |
| Backend | Java 21, Spring Boot 3.3, Spring MVC, Spring Security, Spring Data JPA |
| Authentication | JWT access and refresh tokens; role-based authorization |
| Persistence | MySQL 8, Hibernate, MapStruct |
| Frontend | React 19, Vite 5, React Router 7 |
| Frontend state and requests | Redux Toolkit, Axios |
| Styling | Tailwind CSS 3 |
| API documentation | SpringDoc OpenAPI / Swagger UI |
| Deployment assets | Docker, Docker Compose, Kubernetes/Kustomize |
| CI | GitHub Actions |

## Architecture

```text
Browser
  React + Vite application
       │  /api requests (Vite proxy in development)
       ▼
  Spring Boot REST API
  Controller → Service → Repository
       │
       ▼
  MySQL database
```

The backend exposes the API under `/api`. It uses request and response DTOs at the HTTP boundary, Spring Data repositories for persistence, and a shared API response envelope. The frontend sends authenticated requests through its shared Axios client and protects application routes based on the current login state.

## Run locally

### Prerequisites

- JDK 21
- Maven 3.9 or later
- Node.js 20 or later and npm
- MySQL 8, running locally or otherwise reachable by the backend

### 1. Start MySQL

The default development profile connects to `localhost:3306` as `root` with password `admin` and creates the `study_point` database if it does not already exist. Configure MySQL to match these values, or provide the corresponding environment variables described under [Configuration](#configuration).

`database/mysql-init.sql` creates the database only; it does not add demo users or seed application data. In development, Hibernate updates the schema from the application's entities.

### 2. Start the backend

From the repository root:

```bash
cd backend
mvn spring-boot:run
```

The backend uses the `dev` profile by default and listens at `http://localhost:8080/api`.

### 3. Start the frontend

In a second terminal, from the repository root:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`. The Vite development server proxies `/api` requests to `http://localhost:8080`; start the backend first for API-backed features.

## Configuration

Spring Boot reads configuration from its process environment and the files in `backend/src/main/resources`. The root `.env.example` documents variables used by deployment tooling; a `.env` file is not automatically loaded by a directly launched Maven or Vite process.

| Variable | Purpose |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | Spring profile; defaults to `dev` |
| `SERVER_PORT` | Backend port; defaults to `8080` |
| `DB_HOST`, `DB_PORT`, `DB_NAME` | MySQL address and database |
| `DB_USERNAME`, `DB_PASSWORD` | MySQL credentials |
| `JWT_SECRET` | Signing secret for JWTs; provide a strong, private value outside local development |
| `JWT_EXPIRATION_MS`, `JWT_REFRESH_EXPIRATION_MS` | Access-token and refresh-token lifetimes |
| `CORS_ALLOWED_ORIGINS` | Allowed browser origins |
| `FRONTEND_URL` | Frontend origin used by the backend |
| `UPLOAD_DIR` | Backend upload directory |
| `VITE_API_URL` | Optional frontend API base URL; defaults to `/api` |

Do not use the sample credentials or JWT configuration for a public or production deployment. Keep real secrets out of source control.

## Build and test

### Backend

```bash
cd backend
mvn clean package
mvn test
```

The Maven project includes JUnit, Spring Boot Test, Spring Security Test, and H2 test dependencies. There are currently no committed backend test source files, so `mvn test` does not exercise application behavior yet.

### Frontend

```bash
cd frontend
npm ci
npm run build
```

The frontend package also declares `npm test` and `npm run lint` scripts, but their runners (Vitest and ESLint) are not declared in `frontend/package.json`; those commands are not currently ready to use. The CI workflow builds the backend and frontend, but does not run frontend tests or lint.

## API and documentation

With the backend running:

- API base URL: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api/api-docs`
- Health endpoint: `http://localhost:8080/api/actuator/health`

Further project documentation:

- [Master documentation](docs/master.md) — project overview and architecture notes
- [Backend guide](docs/backend.md) — backend structure, API, security, configuration, and build
- [Frontend guide](docs/frontend.md) — frontend structure, routing, state, and components
- [Test plan and status](docs/test.md) — current test setup and gaps
- [Architecture overview](docs/architecture/architecture.md)
- [Backend package structure](docs/architecture/enterprise-structure.md)
- [Deployment guide](docs/deployment/deployment-guide.md)
- [Agent profile](docs/agent.md)
- [Project memory](docs/memory.md)

## Deployment status

Docker and Kubernetes files are included as deployment scaffolding, but the current configurations should not be treated as ready-to-run or production-ready. The Compose file's relative build and database-volume paths do not match its location, the backend Dockerfile refers to a base image that must be corrected and expects a Maven wrapper that is not checked in, and the Kubernetes manifests contain sample configuration and non-persistent storage. Review and correct these files, replace all sample credentials and secrets, and configure persistent storage and TLS before deploying.

The GitHub Actions workflow builds the Maven package and frontend bundle. Its deployment job also builds and pushes Docker images when changes reach `main`; configure the required repository secrets and image publishing settings before relying on that job.

## Repository layout

```text
.
├── backend/                 # Spring Boot API, configuration, and Maven build
├── database/                # MySQL initialization script
├── docker/                  # Backend/frontend Dockerfiles and Compose file
├── docs/                    # Project, architecture, testing, and deployment guides
├── frontend/                # React application and Vite build
├── kubernetes/              # Kubernetes base manifests and overlays
├── screenshots/             # Project screenshots
├── .github/workflows/       # CI/CD workflow
├── .env.example             # Example environment settings
└── README.md
```

Key source areas:

- `backend/src/main/java/com/studypoint/backend/` — controllers, DTOs, entities, repositories, services, security, and configuration
- `backend/src/main/resources/` — shared and profile-specific Spring configuration
- `frontend/src/pages/` — public pages, authentication, and management pages
- `frontend/src/dashboard/` — role-based dashboards
- `frontend/src/routes/` — application routes
- `frontend/src/services/` — API service modules
- `frontend/src/store/` — Redux store and authentication state
