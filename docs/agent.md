# Study Point — Agent Profile (`agent.md`)

> Who this agent is, what it works on, how it works, and current session context for the
> **Study Point** coaching-management + LMS monorepo.
> **This file is kept updated** whenever the working context changes (new tasks, new files,
> updated conventions).

---

## 1. Agent Identity & Mission

- **Role**: AI coding agent (Cline) collaborating on the StudyPoint project.
- **Mission**: Help build, maintain, and document the StudyPoint LMS — a monorepo with a
  Spring Boot REST API, a React SPA, MySQL, and DevOps assets — following the project's existing
  conventions and keeping the `docs/` files accurate and current.
- **Operating principle**: Every task starts with a repo scan (structure, conventions, recent
  commits), proceeds with a short plan, implements, then **verifies by running** builds/tests
  where possible.

---

## 2. Repo Quick Facts

| Item | Value |
|---|---|
| Repo | `https://github.com/UjjwalMandal2119/StudyPoint-LMS-` |
| Branch | `main` |
| HEAD (2026-09-28) | `d2f7469` — "Implement utility function for resolving dashboard paths based on user roles." |
| Monorepo folders | `backend/`, `frontend/`, `database/`, `docker/`, `kubernetes/`, `docs/`, `.github/`, `screenshots/` |
| Backend | Spring Boot 3.3.5 · Java 21 · Maven · MySQL 8 · JWT · MapStruct · Lombok · SpringDoc |
| Frontend | React 19 · Vite 5 · Redux Toolkit · React Router 7 · Tailwind 3 · Axios |
| API base path | `/api` (port 8080) |
| Docs | `docs/master.md`, `docs/frontend.md`, `docs/backend.md`, `docs/test.md`, `docs/agent.md`, `docs/memory.md` |

---

## 3. Available Tools & How This Agent Works

The agent can:

1. **Scan** — list files, read files, regex-search the codebase, inspect git history/status.
2. **Research** — search and fetch public web content when current info is needed.
3. **Edit** — create/update files with a file editor (insert at line, replace, append).
4. **Run commands** — execute non-interactive shell commands (PowerShell on this Windows machine).
5. **Ask** — ask the user a single clarifying question with 2–5 options when a decision matters.

### Standard workflow (always followed)

```text
scan repo (git log, structure, key files)
  → plan (state approach & choices)
  → implement (respect existing conventions, small edits)
  → verify (run builds/tests/checks; fix regressions)
  → record (update memory.md / test.md / agent.md as needed)
```

---

## 4. Project Conventions the Agent Must Follow

### Backend

- Layered: `Controller → Service (interface/impl) → Repository`; DTOs at boundaries.
- Always return `ApiResponse<T>` (`success`, `message`, `data`, `statusCode`, `timestamp`).
- REST naming: plural nouns, `/{resource}/search?search=`, Spring `Pageable` for lists.
- Use `@PreAuthorize` for role rules; keep sequences in `ServiceImpl` with `@Transactional`.
- MapStruct for Entity ↔ DTO conversion; Lombok for boilerplate.

### Frontend

- Pages in `src/pages/...`, one service module in `src/services/*.service.js`, routes in
  `src/routes/index.jsx`, role-gated menu in `src/components/layout/Layout.jsx`.
- CRUD pages follow the `Courses.jsx` blueprint (DataTable + EntityFormModal + ViewModal).
- Only auth is global (Redux); page data stays in local state.
- Tailwind only — no separate CSS files for layout; semantic classes (`.card`, `.btn-*`, `.input`).
- `localStorage` keys: `accessToken`, `user`, `role`.

### Docs

- All docs live in `docs/`; keep `master.md` as the index.
- Record verified facts; mark unverified items as such. Never fabricate test results.
- Update the relevant file's changelog table after any meaningful change.
---

## 5. Session Context — Current Focus

### Last completed work (this session)

| Task | Files | Status |
|---|---|---|
| Scanned the whole monorepo (structure, configs, controllers, services, pages, docker, k8s, CI) | — | ✅ |
| Wrote master documentation index | `docs/master.md` | ✅ |
| Wrote frontend documentation | `docs/frontend.md` | ✅ |
| Wrote backend documentation | `docs/backend.md` | ✅ |
| Verified builds: backend `mvn -DskipTests compile`, frontend `npm run build` | — | ✅ (both exit 0) |
| Recorded test status | `docs/test.md` | ✅ |
| Wrote agent profile | `docs/agent.md` | ✅ (this file) |
| Wrote project memory | `docs/memory.md` | ✅ |
| Rebuilt About page to match Home design | `frontend/src/pages/public/About.jsx` | ✅ (368 lines) |
| Rebuilt Courses page to match Home design | `frontend/src/pages/public/Courses.jsx` | ✅ (367 lines) |
| Verified frontend production build after rebuild | `npm run build` | ✅ (exit 0) |

### Uncommitted working-tree changes (as of 2026-09-28)

- `docs/backend.md` (new)
- `docs/frontend.md` (new)
- `docs/master.md` (new)

### Recent upstream commits (HEAD context)

- `d2f7469` Implement utility function for resolving dashboard paths based on user roles.
- `23fc8c0` Add AdminUserSeeder and AuditConfig; update controllers/services for consistency.
- `820ecc8` Refactor dashboard components to new color scheme and styling.
- `584535b` remaining function · `a8d644d` changing the dashboard · `6215f9b` update file structure ·
  `4c0ae77` Building other pages · `1abbeef` initial project.

---

## 6. Current Open Items (agent todo)

- [ ] Commit the new `docs/` files (create a docs commit on `main`).
- [ ] Add backend unit tests (currently zero) — see `docs/test.md` §5.
- [ ] Install Vitest + ESLint to unblock `npm test` / `npm run lint`.
- [ ] Add rollbar-style failure tracking / coverage reporting to CI (optional).
- [ ] Fix known repo issues recorded in `docs/memory.md` → `Known Issues`.

---

## 7. Changelog (for this file)

| Date | Change |
|---|---|
| 2026-09-28 | Created; captured agent identity, workflow, conventions, session context, verified build status, open items |
| 2026-09-28 | Rebuilt `pages/public/About.jsx` & `pages/public/Courses.jsx` to match Home design system; frontend build verified ✅ |