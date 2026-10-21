# Study Point — Repository Working Notes

This document records repository conventions and current implementation facts for contributors
working on the Study Point monorepo. It is not a running task log; use Git history and
`docs/memory.md` for project changes.

## Repository snapshot

| Area | Current implementation |
|---|---|
| Backend | Spring Boot 3.3.5, Java 21, Maven, Spring Security, Spring Data JPA, MySQL |
| Frontend | React 19, Vite 5, React Router 7, Redux Toolkit, Axios, Tailwind CSS 3 |
| API base | `/api` context path, port 8080 by default |
| Public site | Home, About, Contact, and Academics at `/courses` |
| Academics catalog | Public `GET /api/public/programs`, returning active, published courses |
| Data store | MySQL database `study_point` |

## Working conventions

### Backend

- Keep HTTP handling in controllers and business behavior in service implementations.
- Use request/response DTOs at API boundaries; do not return JPA entities.
- Wrap responses in `ApiResponse<T>`.
- Keep course management writes restricted to administrators; public catalog reads expose only
  explicitly published and active entries.
- New API paths require an explicit security review; routes are authenticated by default except
  those allowed by `SecurityConfig`.

### Frontend

- Keep public and portal pages in their existing route/component areas and services in
  `frontend/src/services/`.
- Use Redux for authentication state; keep page-specific state local unless there is an established
  shared-state requirement.
- Reuse shared layout, navigation, footer, and Academics components where appropriate.
- Most UI uses Tailwind utilities; custom page-level designs and animations may use scoped CSS in
  `frontend/src/styles/`.
- Preserve accessible labels, keyboard behavior, reduced-motion support, and responsive layouts.
- The public Academics display name does not change the established `/courses` route; portal course
  management remains a separate authenticated surface.

### Documentation and verification

- Document implemented behavior, not proposed API shapes or assumed deployment readiness.
- Keep the root README and the relevant subsystem guide consistent when public routes, API
  contracts, or build requirements change.
- Record test/build outcomes accurately. A successful Maven command with no discovered tests is not
  behavioral test coverage.
- Check `git status` before editing and preserve unrelated changes.

## Current implementation boundaries

- `Course` stores name, code, description, duration, fees, image URL, syllabus, published state, and
  active state. It does not store class group, medium, learning mode, or scholarship eligibility.
- The public program endpoint returns a restricted DTO and filters to active, published records.
- The Academics page adds class/medium/mode pathway metadata in the frontend. Scholarship cards and
  FAQs are currently static content.
- The contact admission enquiry prepares a WhatsApp message; it is not a server-side submission.
- There are no committed backend tests, and frontend test/lint dependencies are not configured.
- Docker/Kubernetes files are scaffolding with documented blockers; see
  [deployment status](deployment/deployment-guide.md).

## Changelog

| Date | Change |
|---|---|
| 2026-09-28 | Initial repository workflow notes. |
| 2026-10-22 | Replaced stale Cline identity, old page descriptions, and historical working-tree notes with current project conventions and Academics/API boundaries. |
