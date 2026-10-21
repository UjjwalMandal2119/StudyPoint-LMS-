# Study Point — Project Memory

> A concise, verified snapshot of architecture decisions and current boundaries.
> **Last updated: 2026-10-22**

## 1. Project snapshot

| Area | Details |
|---|---|
| Repository | `UjjwalMandal2119/StudyPoint-LMS-` |
| Backend | Spring Boot 3.3.5, Java 21, Maven, package `com.studypoint.backend` |
| Frontend | React 19, Vite 5, React Router DOM 7, Redux Toolkit, Tailwind CSS 3, Axios |
| Database | MySQL 8, database `study_point` |
| API | `/api` context path; default backend port 8080 |
| Public pages | Home, About, Contact, Academics (`/courses`) |
| Runtime setup | Vite proxies `/api` to the local backend; production proxy settings are in deployment assets |

## 2. Verified architecture and conventions

- Backend flow: controller → service interface/implementation → repository. DTOs cross the API
  boundary; responses use `ApiResponse<T>`.
- The frontend Axios client uses `VITE_API_URL` (default `/api`) and attaches the stored access
  token when present. Authentication is held in Redux; most page state is local.
- Admin course CRUD is separate from the public Academics display.
- `GET /api/public/programs` returns only published and active courses as a restricted public DTO.
- Existing authenticated course-list/detail/search endpoints remain available to logged-in users;
  course writes and publish/active management are admin-authorized.
- The public Academics page enriches matching course records with frontend pathway metadata. The
  current `Course` entity does not define class groups, medium, learning mode, or scholarship
  eligibility. Scholarship content and FAQs have no public API endpoint yet.
- Contact admission enquiries currently open a prefilled WhatsApp message; the visitor must review
  and send it. This is not a server-side admissions API submission.
- Documentation lives in `docs/`; `docs/master.md` is the index.

## 3. Current limitations

| Area | Verified limitation |
|---|---|
| Backend tests | No committed test source files; `mvn test` completes without behavioral tests. |
| Frontend tests | `vitest` is referenced by the npm script but is not declared in package dependencies. |
| Frontend lint | `eslint` is referenced by the npm script but is not declared in package dependencies. |
| Local catalog integration | The public endpoint requires a running backend and published active course records; the frontend reports request errors rather than claiming catalog success. |
| Deployment | Docker Compose paths, backend image/wrapper, and Kubernetes secrets/storage require correction; see `docs/deployment/deployment-guide.md`. |

## 4. Useful commands

```powershell
# Backend (Maven must be installed; there is no checked-in wrapper)
cd backend
mvn test

# Frontend
cd frontend
npm run dev
npm run build
```

`npm test` and `npm run lint` are not currently usable without adding their missing tools and
configuration. The frontend production build may emit a non-blocking Vite warning about a chunk
larger than 500 kB.

## 5. Recent documented project changes

| Date | Change |
|---|---|
| 2026-10-21 | Public Academics page uses the existing `/courses` route, shared program components, pathway metadata, and API-backed program records. |
| 2026-10-21 | Added `GET /api/public/programs`, a public read-only catalog of active, published course DTOs. |
| 2026-10-21 | Public site navigation labels the route “Academics” and the primary header action “Take Admission.” |
| 2026-10-22 | Refreshed project documentation against the current routes, API contract, and verification status. |
