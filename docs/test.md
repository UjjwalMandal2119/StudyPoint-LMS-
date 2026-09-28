# Study Point — Test Plan & Status (`test.md`)

> How to run tests in this monorepo and the current, verified pass/fail state.
> **This file is kept updated** — each verification run is recorded in the
> [Latest Test Run](#latest-test-run) table with a timestamp.

---

## Latest Test Run (verified 2026-09-28)

Environment used for verification:

| Tool | Version | Notes |
|---|---|---|
| Maven | 3.9.16 | System install; no `mvnw` wrapper in repo |
| Java (runtime) | 25.0.2 | Project targets **Java 21** (pom `java.version`) |
| Node | v24.14.1 | Project targets Node 20+ |
| npm | 11.11.0 | |

| # | Command | Location | Result | Exit | Notes |
|---|---|---|---|---|---|
| 1 | `mvn -DskipTests compile` | `backend/` | ✅ SUCCESS | 0 | Entire Java codebase compiles |
| 2 | `mvn test` | `backend/` | ✅ BUILD SUCCESS | 0 | No test sources found → "no tests run" phase passes |
| 3 | `npm run build` | `frontend/` | ✅ SUCCESS | 0 | 187 modules, `dist/` generated (2.56s) |
| 4 | `npm test -- --run` | `frontend/` | ❌ FAILS | 1 | **Vitest not installed** → `'vitest' is not recognized` |

> ⚠️ Commands 1–3 are green. Command 4 cannot pass until `vitest` is added to
> `frontend/package.json` devDependencies.

---

## 1. Test Stack Overview

### Backend

- **Frameworks**: JUnit 5, Spring Boot Test, Spring Security Test.
- **Database**: H2 (test scope) — integration tests do not require MySQL.
- **Runner**: Maven Surefire (`mvn test`), enforced in CI by `mvn -B -DskipTests=false clean package`.
- **Status**: `backend/src/test/` is currently **empty** (no committed test sources — phase passes
  with zero tests).

### Frontend

- **Runner**: `npm test` → `vitest` (declared in `package.json` scripts).
- **Status**: **Not runnable** — `vitest` is not in `devDependencies`. `frontend/src/tests/`
  contains only a `.gitkeep`. `npm run lint` has the same problem with ESLint.

### CI (`.github/workflows/ci.yml`)

- Triggered on push to `main`, `develop` and PRs to `main`.
- Spins up MySQL 8 service (`study_point` DB).
- Backend: `mvn -B -DskipTests=false clean package` (JDK 21 + Maven cache).
- Frontend: `npm ci` → `npm run build` (Node 20).
- Uploads build artifacts. **CI currently has no frontend test or lint step.**

---

## 2. Backend Testing Guide

```bash
cd backend

mvn test                      # run all tests
mvn -Dtest=ClassName test     # run one test class
mvn -Dtest=ClassName#method test
mvn clean package             # full build + tests
mvn -DskipTests clean package # build without tests
```

Conventions:

- Use `@SpringBootTest` + H2 for slice/integration tests; add `@Transactional` to roll back.
- Security-focused tests should use `spring-security-test` (`@WithMockUser`, `MockMvc`).
- Add any bootstrap SQL under `src/test/resources`, not the prod `application.yml`.
- Test classes live in `backend/src/test/java/com/studypoint/backend/...` mirroring main packages.

---

## 3. Frontend Testing Guide

```bash
cd frontend
npm test                # requires Vitest (NOT YET INSTALLED)
```

To get frontend tests running, install Vitest and add a config:

```bash
cd frontend
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Suggested additions:

- `vitest.config.js` (or extend `vite.config.js`) with `test.environment: 'jsdom'`.
- `frontend/src/tests/` for unit tests (starting with `authSlice`, `crud.js`, `dashboardPath.js` —
  the pure-logic modules).
- A CI step: `npm test -- --run` after `npm ci`.

> Current verified state: `npm test -- --run` → exit 1 (`'vitest' is not recognized`).

---

## 4. What CI Checks Today

| Step | Command | Runs now? |
|---|---|---|
| Backend compile + tests | `mvn -B -DskipTests=false clean package` | ✅ |
| Frontend install | `npm ci` | ✅ |
| Frontend production build | `npm run build` | ✅ |
| Frontend tests | `npm test` | ❌ (not configured) |
| Frontend lint | `npm run lint` | ❌ (ESLint not installed) |

---

## 5. Known Gaps & Next Steps

1. **Add backend unit tests** — no code in `backend/src/test/` yet. Priority targets:
   `AuthServiceImpl`, `CourseServiceImpl`, `JwtService`, `GlobalExceptionHandler`,
   mappers (MapStruct).
2. **Install Vitest + testing-library** — unblocks `npm test` and the future CI test step.
3. **Install ESLint** (or Pinia-style flat config) — unblocks `npm run lint`.
4. **Add smoke test** — one `@SpringBootTest` that boots the context and hits
   `GET /api/actuator/health` (H2-backed) to catch wiring regressions early.
5. **CI MySQL parity** — tests that require MySQL use the CI service instance; keep them separated
   from the H2 unit suite with a Maven profile (e.g. `-Pintegration`).

---

## 6. Changelog (for this file)

| Date | Change |
|---|---|
| 2026-09-28 | Created; recorded first verified run (compile ✅, `mvn test` ✅ w/ 0 tests, `npm run build` ✅, `npm test` ❌ Vitest missing) |