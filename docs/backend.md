# Study Point — Backend Documentation

> Spring Boot 3 REST API for the Study Point coaching institute + LMS platform.
> Layered, DTO-driven, security-first architecture with JWT authentication, role-based access
> control, Spring Data JPA + MySQL, MapStruct mapping, and SpringDoc OpenAPI (Swagger).

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Layered Architecture](#5-layered-architecture)
6. [Entities (Domain Model)](#6-entities-domain-model)
7. [REST Controllers & Endpoints](#7-rest-controllers--endpoints)
8. [Authentication & Security](#8-authentication--security)
9. [Mappers (MapStruct)](#9-mappers-mapstruct)
10. [Configuration & Profiles](#10-configuration--profiles)
11. [Error Handling & Validation](#11-error-handling--validation)
12. [Database](#12-database)
13. [API Docs (Swagger)](#13-api-docs-swagger)
14. [Build, Test & Docker](#14-build-test--docker)

---

## 1. Overview

The backend is a single Maven module (`studypoint-backend`, `com.studypoint.backend`) exposed at
context path **`/api`** (port 8080 by default). It implements:

- **Clean layering**: `Controller → Service (interface + impl) → Repository` with DTOs at the
  boundary and JPA entities used only inside the service layer.
- **JWT authentication** with access + refresh tokens, stateless sessions, and method-level
  `@PreAuthorize` authorization alongside a central `SecurityFilterChain`.
- **Standard response envelope** (`ApiResponse<T>`) for every endpoint.
- **SpringDoc OpenAPI 3** at `/api/swagger-ui.html`.
- Out-of-the-box actuators, scheduled tasks (`@EnableScheduling`), async support
  (`@EnableAsync`), and JPA auditing (`@EnableJpaAuditing`).

---

## 2. Tech Stack & Dependencies

From `backend/pom.xml`:

| Category | Dependency | Version |
|---|---|---|
| Runtime | Java 21 | — |
| Framework | spring-boot-starter-web / data-jpa / security / validation / mail / websocket / actuator | Boot 3.3.5 |
| Database | mysql-connector-j | runtime |
| Auth | jjwt-api / jjwt-impl / jjwt-jackson | 0.12.6 |
| Mapping | lombok | 1.18.40 |
| Mapping | mapstruct + mapstruct-processor + lombok-mapstruct-binding | 1.6.2 / 0.2.0 |
| API docs | springdoc-openapi-starter-webmvc-ui | 2.6.0 |
| Excel | poi-ooxml | 5.3.0 |
| Test | spring-boot-starter-test, spring-security-test, h2 | — |

Plugins: `spring-boot-maven-plugin` (excludes Lombok) and `maven-compiler-plugin` with the Lombok +
MapStruct annotation processor pipeline.

---

## 3. Getting Started

### Prerequisites

- JDK 21
- Maven 3.9+ (or `./mvnw`)
- MySQL 8 running locally (or via Docker Compose)

### Run

```bash
cd backend
./mvnw spring-boot:run          # or mvn spring-boot:run
# API base:   http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

Active profile defaults to `dev` (`SPRING_PROFILES_ACTIVE=dev`). The dev profile connects to
`jdbc:mysql://localhost:3306/study_point` (`createDatabaseIfNotExist=true`) with
`ddl-auto: update` and HikariCP defaults.

### Tests

```bash
./mvnw test                     # JUnit 5 + Spring Security test + H2
```

---

## 4. Project Structure

```text
backend/src/main/java/com/studypoint/backend/
├── StudyPointApplication.java   # @SpringBootApplication + @EnableJpaAuditing/@EnableAsync/@EnableScheduling
├── config/                      # SecurityConfig, AdminUserSeeder, AuditConfig
├── constants/                   # Enums + app constants (Role, statuses, ExamType, QuestionType, ...)
├── controller/                  # REST controllers (auth, common, admin, student, teacher)
├── dto/
│   ├── auth/                    # LoginRequest, RegisterRequest, RefreshTokenRequest, JwtAuthResponse
│   ├── request/                 # Resource create/update payloads (XxxRequest)
│   └── response/                # XxxResponse, XxxListResponse, Page wrappers, ApiResponse
├── entity/                      # JPA entities + base/ (BaseEntity, Auditable)
├── exception/                   # Domain exceptions + GlobalExceptionHandler
├── mapper/                      # MapStruct mappers (Entity ↔ DTO)
├── notification/                # Notification utilities (scaffold)
├── repository/                  # Spring Data JPA repositories (+ base/)
├── scheduler/                   # Scheduled tasks (scaffold)
├── security/                    # JWT filter/service, CustomUserDetailsService, REST handlers
├── service/
│   ├── *.java                   # Service interfaces
│   └── impl/                    # ServiceImpl classes
├── util/                        # Helpers
├── validator/                   # Custom bean validators
└── websocket/                   # WebSocket support (scaffold)
```

Resources: `application.yml`, `application-dev.yml`, `application-prod.yml`, `static/`.
Tests: `src/test/` (JUnit 5 tests are generated into `target/`).
---

## 5. Layered Architecture

```
HTTP request
   │
   ▼
SecurityConfig (JWT filter chain, CORS, stateless sessions)
   │
   ▼
Controller  (@RestController, @RequestMapping("/<resource>"))
   │  request DTO (validated) / response DTO
   ▼
Service interface  →  ServiceImpl  (business rules, transactions)
   │
   ├──→ Repository (Spring Data JPA) ─→ MySQL
   ├──→ Mapper (MapStruct)  DTO ↔ Entity
   └──→ Domain exceptions → GlobalExceptionHandler
```

- **Controllers** are thin: validate input, delegate to a service, wrap results in `ApiResponse`.
- **Services** own the business logic and persistence. One interface + one `Impl` per domain
  (e.g. `CourseService` / `CourseServiceImpl`).
- **Repositories** extend `JpaRepository` / `PagingAndSortingRepository`; domain-specific queries
  are declared as derived query methods.
- **DTOs** keep the API contract decoupled from JPA entities. Request DTOs live in `dto/request`,
  response DTOs in `dto/response`, auth DTOs in `dto/auth`.
- **Mappers** (MapStruct) convert between entities and DTOs; see [§9](#9-mappers-mapstruct).

---

## 6. Entities (Domain Model)

All entities live in `entity/` and extend `BaseEntity` (id + auditing timestamps via JPA auditing).

| Entity | Domain | Notes |
|---|---|---|
| `User` | Identity | Login/register, roles, lock/unlock |
| `Student` | Student management | Linked to User, Batch |
| `Teacher` | Faculty | Linked to User, subjects |
| `Parent` | Guardians | Linked to User, students |
| `Course` | Catalog | fee, duration, publish/active flags |
| `Subject` | Catalog | Belongs to Course |
| `Batch` | Scheduling | Belongs to Course, assigned Teacher |
| `Timetable` | Scheduling | Per batch, day slot |
| `Enrollment` | Admissions | Student ↔ Batch, approve/reject workflow |
| `AdmissionApplication` | Admissions | Public application + review workflow |
| `Attendance` | Academic ops | Per student, per session |
| `TeacherAttendance` | Academic ops | Per teacher |
| `Exam` | Assessments | Per batch/subject, exam type |
| `Question` | Assessments | Question bank, approval workflow, bulk import |
| `Result` | Assessments | Per exam per student |
| `Assignment` | Assessments | Per batch/subject |
| `AssignmentSubmission` | Assessments | Student submission + grading |
| `StudyMaterial` | Learning content | Public flag, download tracking |
| `Notice` | Communication | publish/unpublish, important flag |
| `Notification` | Communication | Per-user read state |
| `Discussion` / `DiscussionReply` | Communication | Pin, resolve, close, like, report |
| `Grievance` | Support | Tracking number, status/category workflow |
| `Fee` / `Payment` | Finance | Fees & payment records |
| `Book` / `BookIssue` | Library | Catalog + issue tracking |
| `Certificate` | Academic ops | Certificates |
| `Event` / `Gallery` | Institute | Events & gallery |
| `OnlineClass` / `RecordedLecture` | Online learning | Live/recorded classes |
| `ChatbotConversation` | Support | Chatbot history |
| `Message` | Communication | Messaging |
| `FAQ` | Support | FAQs |
| `ActivityLog` | Audit | Audit trail (AuditConfig) |

### Constants (`constants/`)

Enums and constants used across the domain: `Role`, `AssignmentStatus`, `AttendanceStatus`,
`BookStatus`, `DiscussionStatus`, `EnrollmentStatus`, `ExamType`, `GrievanceStatus`,
`MessageType`, `NotificationType`, `PaymentStatus`, `QuestionType`, `SubmissionStatus`,
plus `AppConstants`.
---

## 7. REST Controllers & Endpoints

All endpoints are prefixed with the server context path **`/api`**. Pagination uses Spring
`Pageable` (`?page=0&size=10&sort=id,desc`). Responses are always `ApiResponse<T>`.

### Auth — `AuthController` (`/auth`)

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/auth/login` | Login with username/email + password → JWT pair | Public |
| POST | `/auth/register` | Register a new user → JWT pair | Public |
| POST | `/auth/refresh-token` | Exchange refresh token for new access token | Public |
| POST | `/auth/logout` | Invalidate session | Authenticated |

### Admissions — `AdmissionController` (`/admissions`)

| Method | Path | Description | Access |
|---|---|---|---|
| GET | `/admissions` | List applications (paged) | Public (permitAll) |
| GET | `/admissions/status/{status}` | Filter by status | Public |
| GET | `/admissions/track` | Track by reference | Public |
| GET | `/admissions/{id}` | Get one application | Public |
| PUT | `/admissions/{id}` | Update application | Public |
| POST | `/admissions/{id}/review` | Review / change status | Public |
| DELETE | `/admissions/{id}` | Delete application | Public |

### Courses — `CourseController` (`/courses`)

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/courses` | Create course | ADMIN, SUPER_ADMIN |
| PUT | `/courses/{id}` | Update course | ADMIN, SUPER_ADMIN |
| DELETE | `/courses/{id}` | Delete course | ADMIN, SUPER_ADMIN |
| GET | `/courses` | List courses (paged) | Authenticated |
| GET | `/courses/{id}` | Get course | Authenticated |
| GET | `/courses/code/{code}` | Get by code | Authenticated |
| GET | `/courses/search?search=` | Search | Authenticated |
| POST/PUT | `/courses/{id}/publish` | Publish/unpublish | ADMIN, SUPER_ADMIN |
| PATCH/PUT | `/courses/{id}/toggle-active` | Toggle active | ADMIN, SUPER_ADMIN |

### Students — `StudentController` (`/students`)

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/students` | Create student | STUDENT, TEACHER, ADMIN, SUPER_ADMIN, PARENT, RECEPTIONIST |
| PUT | `/students/{id}` | Update student | same as above |
| DELETE | `/students/{id}` | Delete student | same |
| GET | `/students` | List (paged) | same |
| GET | `/students/{id}` | Get | same |
| GET | `/students/user/{userId}` | Get by user | same |
| GET | `/students/batch/{batchId}` | List by batch | same |
| GET | `/students/search?search=` | Search | same |

### Teachers — `TeacherController` (`/teachers`)

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/teachers` | Create teacher | TEACHER, ADMIN, SUPER_ADMIN |
| PUT | `/teachers/{id}` | Update teacher | same |
| DELETE | `/teachers/{id}` | Delete teacher | same |
| GET | `/teachers` | List (paged) | same |
| GET | `/teachers/{id}` | Get | same |
| GET | `/teachers/user/{userId}` | Get by user | same |
| GET | `/teachers/search?search=` | Search | same |

### Parents — `ParentController` (`/parents`)

| Method | Path | Description | Access |
|---|---|---|---|
| POST | `/parents` | Create parent | PARENT, ADMIN, SUPER_ADMIN |
| PUT | `/parents/{id}` | Update parent | same |
| DELETE | `/parents/{id}` | Delete parent | same |
| GET | `/parents` | List (paged) | same |
| GET | `/parents/{id}` | Get | same |

### Users — `UserController` (`/users`)

| Method | Path | Description |
|---|---|---|
| GET | `/users` | List users (paged) |
| GET | `/users/{id}` | Get user |
| GET | `/users/username/{username}` | Get by username |
| PUT | `/users/{id}` | Update user |
| DELETE | `/users/{id}` | Delete user |
| GET | `/users/search?search=` | Search users |
| GET | `/users/count/role/{role}` | Count users by role |
| PUT | `/users/{id}/lock` · `/unlock` | Lock / unlock account |
### Batches — `BatchController` (`/batches`)

CRUD at `/batches` plus `GET /batches/course/{courseId}`, `GET /batches/teacher/{teacherId}`.

### Subjects — `SubjectController` (`/subjects`)

CRUD at `/subjects` plus `GET /subjects/course/{courseId}`, `GET /subjects/teacher/{teacherId}`.

### Exams — `ExamController` (`/exams`)

CRUD at `/exams` plus `GET /exams/batch/{batchId}`, `GET /exams/subject/{subjectId}`.

### Questions — `QuestionController` (`/questions`)

CRUD at `/questions`, `POST /questions/bulk` (bulk import),
`GET /questions/subject/{subjectId}`, `GET /questions/subject/{subjectId}/approved`.

### Assignments — `AssignmentController` (`/assignments`)

CRUD at `/assignments` plus `GET /assignments/batch/{batchId}`,
`GET /assignments/subject/{subjectId}`.

### Assignment Submissions — `AssignmentSubmissionController` (`/assignment-submissions`)

`POST /assignment-submissions/submit`, `PUT /{id}/grade`, `GET /{id}`,
`GET /assignment/{assignmentId}`, `GET /student/{studentId}`.

### Attendance — `AttendanceController` (`/attendance`)

`POST /attendance/mark`, `POST /attendance/bulk-mark`, `GET /attendance/student/{studentId}`,
`GET /attendance/batch/{batchId}`, `GET /attendance/summary/{studentId}`.

### Teacher Attendance — `TeacherAttendanceController` (`/teacher-attendance`)

`POST /teacher-attendance/mark`, `GET /teacher-attendance/teacher/{teacherId}`.

### Timetable — `TimetableController` (`/timetable`)

CRUD at `/timetable` plus `GET /timetable/batch/{batchId}`,
`GET /timetable/batch/{batchId}/day/{day}`.

### Enrollments — `EnrollmentController` (`/enrollments`)

CRUD at `/enrollments` plus `GET /enrollments/student/{studentId}`,
`GET /enrollments/batch/{batchId}`, `POST /enrollments/{id}/approve?approvedBy=`,
`POST /enrollments/{id}/reject?remarks=`.

### Results — `ResultController` (`/results`)

`GET /results` (paged), `GET /results/{id}`, `GET /results/exam/{examId}`,
`GET /results/student/{studentId}`, `GET /results/exam/{examId}/student/{studentId}`.

### Study Materials — `StudyMaterialController` (`/study-materials`)

CRUD at `/study-materials` plus `GET /study-materials/public`,
`GET /study-materials/subject/{subjectId}`, `GET /study-materials/batch/{batchId}`,
`POST /study-materials/{id}/download`.

### Notices — `NoticeController` (`/notices`)

CRUD at `/notices` plus `POST /notices/{id}/publish`, `POST /notices/{id}/unpublish`,
`GET /notices/published`, `GET /notices/active`, `GET /notices/important`.

### Notifications — `NotificationController` (`/notifications`)

`GET /notifications/my`, `GET /notifications/unread`, `GET /notifications/unread-count`,
`POST /notifications/mark-all-read`, `GET /notifications/{id}`, `POST /notifications/{id}/read`,
`DELETE /notifications/{id}`.

### Discussions — `DiscussionController` (`/discussions`)

CRUD at `/discussions` plus search, `GET /discussions/pinned`, tag/status filters,
`GET /discussions/my`, `POST /{id}/like|resolve|close|pin|unpin|report`,
`POST /{id}/replies`, `GET /{id}/replies`, reply like/accept/delete.

### Grievances — `GrievanceController` (`/grievances`)

CRUD at `/grievances` plus `GET /grievances/my`, `GET /grievances/status/{status}`,
`GET /grievances/category/{category}`, `GET /grievances/search`,
`GET /grievances/track/{trackingNumber}`.

### Dashboards — `DashboardController` (`/dashboard`)

| Method | Path | Access | Data |
|---|---|---|---|
| GET | `/dashboard/admin` | ADMIN, SUPER_ADMIN | `AdminDashboardStats` |
| GET | `/dashboard/student` | STUDENT | `StudentDashboardStats` |
| GET | `/dashboard/teacher` | TEACHER | `TeacherDashboardStats` |
| GET | `/dashboard/parent` | PARENT | `ParentDashboardStats` |

Each resolves the current user from the JWT principal and returns role-specific aggregates.
---

## 8. Authentication & Security

### JWT flow

1. `POST /auth/login` (or `/auth/register`) → `JwtAuthResponse`
   `{ accessToken, refreshToken, tokenType, userId, username, email, role }`.
2. Subsequent requests send `Authorization: Bearer <accessToken>`.
3. `JwtAuthenticationFilter` validates the token, loads the user via `CustomUserDetailsService`,
   and populates the `SecurityContext`.
4. `POST /auth/refresh-token` issues a new access token from the refresh token.
5. `POST /auth/logout` invalidates the session server-side.

### Security components (`security/`)

| Class | Responsibility |
|---|---|
| `JwtService` | Token generation, parsing, validation (jjwt 0.12) |
| `JwtAuthenticationFilter` | Once-per-request JWT auth filter |
| `CustomUserDetailsService` | Loads `UserDetails` by username/email |
| `RestAuthenticationEntryPoint` | 401 JSON responses for unauthenticated requests |
| `RestAccessDeniedHandler` | 403 JSON responses for forbidden requests |

### `SecurityConfig` rules

- CSRF disabled, CORS enabled from `app.cors.allowed-origins`, sessions stateless.
- Public: `/auth/**`, `/public/**`, `/admissions/**`, Swagger (`/swagger-ui/**`,
  `/swagger-ui.html`, `/api-docs/**`, `/v3/api-docs/**`), `/actuator/health`, `/uploads/**`,
  `/websocket/**`.
- Role-gated path rules: `/admin/**` (SUPER_ADMIN, ADMIN), `/students/**` (STUDENT, TEACHER,
  ADMIN, SUPER_ADMIN, PARENT, RECEPTIONIST), `/teachers/**` (TEACHER, ADMIN, SUPER_ADMIN),
  `/parents/**` (PARENT, ADMIN, SUPER_ADMIN).
- Everything else requires authentication.
- `@EnableMethodSecurity` enables `@PreAuthorize` on controllers (e.g. course writes are
  ADMIN/SUPER_ADMIN only).
- Passwords hashed with `BCryptPasswordEncoder`.

### Audit & seed

- `AuditConfig` + `@EnableJpaAuditing` populate audit fields on `BaseEntity`.
- `AdminUserSeeder` creates the initial admin user on startup.

---

## 9. Mappers (MapStruct)

`mapper/` holds MapStruct interfaces that convert between JPA entities and DTOs. The Maven
compiler plugin wires Lombok + MapStruct annotation processors together
(`lombok-mapstruct-binding`), so generated mapper implementations are produced at build time.

Typical contract:

```java
@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponse toResponse(Course course);
    CourseListResponse toListResponse(Course course);
}
```

---

## 10. Configuration & Profiles

### `application.yml` (base)

| Key | Value |
|---|---|
| `spring.jpa.hibernate.ddl-auto` | `update` |
| `spring.jpa.open-in-view` | `false` |
| `server.port` | `${SERVER_PORT:8080}` |
| `server.servlet.context-path` | `/api` |
| `spring.servlet.multipart` | max 50MB |
| `springdoc.swagger-ui.path` | `/swagger-ui.html` |
| `management.endpoints.web.exposure.include` | `health,info,metrics` |
| `app.jwt.expiration-ms` | `${JWT_EXPIRATION_MS:86400000}` (1 day) |
| `app.jwt.refresh-expiration-ms` | `${JWT_REFRESH_EXPIRATION_MS:604800000}` (7 days) |
| `app.cors.allowed-origins` | `${CORS_ALLOWED_ORIGINS:http://localhost:5173,http://localhost:3000}` |
| `app.upload.base-dir` | `${UPLOAD_DIR:./uploads}` |

### `application-dev.yml`

- MySQL URL with `createDatabaseIfNotExist=true`, `useSSL=false`.
- HikariCP pool: max 20, min 10.
- `ddl-auto: update` (schema auto-created from entities).

### `application-prod.yml`

- MySQL URL with `useSSL=true&requireSSL=true`.
- HikariCP pool: max 50.
- `ddl-auto: validate` (schema must already exist).
- Stricter logging (WARN root), CORS origins required via env.

### Environment variables (from `.env.example`)

`SPRING_PROFILES_ACTIVE`, `SERVER_PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`,
`DB_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, `JWT_REFRESH_EXPIRATION_MS`,
`CORS_ALLOWED_ORIGINS`, `FRONTEND_URL`, `UPLOAD_DIR`.
---

## 11. Error Handling & Validation

### Standard envelope — `dto/response/ApiResponse.java`

```json
{
  "success": true,
  "message": "Course created successfully",
  "data": { "...": "..." },
  "statusCode": 201,
  "timestamp": "2026-09-28T10:00:00"
}
```

`data` is omitted when null (`@JsonInclude(NON_NULL)`). Static factories:
`success(data, message, code)`, `success(data, code)`, `success(message, code)`,
`error(message, code)`, `error(errors, code)`.

### `GlobalExceptionHandler` (`@RestControllerAdvice`)

| Exception | HTTP status | Response |
|---|---|---|
| `ResourceNotFoundException` | 404 | `error(message, 404)` |
| `BadRequestException` | 400 | `error(message, 400)` |
| `ConflictException` | 409 | `error(message, 409)` |
| `BadCredentialsException` | 401 | "Invalid username or password" |
| `UsernameNotFoundException` | 401 | message |
| `AccessDeniedException` | 403 | "Access denied. You don't have permission." |
| `MethodArgumentNotValidException` | 400 | field → message map (`data.errors`) |
| `Exception` (fallback) | 500 | "An unexpected error occurred" |

### Validation

Request DTOs use Jakarta Bean Validation (`@NotBlank`, `@Valid @RequestBody` in controllers,
`validator/` package for custom constraints). Server error messages are hidden from responses
(`server.error.include-message: never`).

---

## 12. Database

- **Engine**: MySQL 8, database name `study_point`.
- **Schema management**: dev `ddl-auto: update`; prod `ddl-auto: validate`.
- **Seed/bootstrap**: `database/mysql-init.sql` is mounted into the MySQL container by
  Docker Compose as the init script.
- **Persistence**: Spring Data JPA repositories (`repository/`), HikariCP connection pools.
- **Auditing**: `BaseEntity` + `AuditConfig` give every entity audited timestamps.
- **Batching**: Hibernate batch inserts/updates (size 25) enabled in the base config.

Local dev connection (from `application-dev.yml`):

```text
jdbc:mysql://localhost:3306/study_point?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

---

## 13. API Docs (Swagger)

SpringDoc OpenAPI 3 is included. With the backend running:

- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api/api-docs`

The docs scan `com.studypoint.backend.controller` (tags sorted alphabetically). Auth endpoints are
public; other endpoints show the JWT bearer security requirement.

---

## 14. Build, Test & Docker

### Build & test

```bash
cd backend
./mvnw clean package          # compile + generate MapStruct mappers + run tests
./mvnw test                   # run tests only (JUnit 5 + H2 for integration)
java -jar target/studypoint-backend-1.0.0.jar
```

### Docker image (`docker/backend/Dockerfile`)

Build stage (`eclipse-temraform:21-jre` as written in the Dockerfile — effectively the Temurin
JRE image) → `./mvnw -B -DskipTests package`; runtime stage copies
`target/studypoint-backend-*.jar` and runs `java -jar app.jar`, exposing `8080`.

### Docker Compose (`docker/compose/docker-compose.yml`)

- `mysql:8.0` — health-checked, mounts `database/mysql-init.sql` and a named volume.
- `backend` — built from `docker/backend/Dockerfile`, depends on healthy MySQL, env-driven config,
  uploads volume at `/app/uploads`.
- `frontend` — nginx-served React build (see frontend docs).

### Kubernetes

Base manifests in `kubernetes/base/` (`backend-deployment/service`, `frontend-deployment/service`,
`mysql-deployment/service/config`) with Kustomize overlays `dev` and `prod`, plus
`kubernetes/ingress/ingress.yaml`.

### CI/CD

`.github/workflows/ci.yml` builds and tests both backend and frontend on push/PR.

---

## Appendix — Developer Notes

- **Add a new feature**: Model the entity in `entity/`, request/response DTOs in `dto/`,
  MapStruct mapper in `mapper/`, repository in `repository/`, service pair in `service/`,
  controller in `controller/`, and wire search/paging via Spring `Pageable`.
- **Security defaults**: new endpoints are authenticated by default; open them explicitly in
  `SecurityConfig` (public) or via `@PreAuthorize` (fine-grained roles).
- **API contract**: always return `ApiResponse<T>`; never leak entities or stack traces.
- **Pagination convention**: accept `Pageable` and return `Page<XxxListResponse>`.
- **Transactions**: annotate service methods that write with `@Transactional` as needed.