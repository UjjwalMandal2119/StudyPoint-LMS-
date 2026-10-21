# Study Point — Test Plan & Status

> Commands and verification status for the monorepo. Results below distinguish a successful build
> from tests that actually exercise application behavior.

## Latest verified run

The latest recorded verification was run on **2026-10-21** during the Academics page and public
program-catalog work.

| Command / check | Location | Result | Notes |
|---|---|---|---|
| `mvn test` | `backend/` | Build succeeded | No committed Java test sources were found; this did not exercise application behavior. |
| `npm run build` | `frontend/` | Passed | Vite production build completed; it reported a non-blocking chunk-size warning (>500 kB). |
| Academics browser smoke check | `/courses`, mobile viewport | Passed | Five program cards, five admission steps, six FAQs, Academics navigation, Take Admission CTA, and no horizontal overflow at 390px. |
| Public catalog request | `/api/public/programs` from local frontend | Not verified successfully | The local backend was unavailable and the request returned HTTP 500. The UI displayed an error and kept its pathway outlines visible. |

Environment versions were not recorded for this run. Backend Maven output ended with `BUILD
SUCCESS`; because there are no committed test sources, that result is compilation/package success,
not evidence of passing behavioral tests.

## 1. Test stack and current coverage

### Backend

- Maven Surefire runs tests with `mvn test`.
- JUnit 5, Spring Boot Test, Spring Security Test, and H2 dependencies are available.
- `backend/src/test/` currently contains no committed Java test classes.

### Frontend

- `npm run build` is the verified production compilation check.
- `npm test` invokes Vitest, but Vitest is not declared in `frontend/package.json`.
- `npm run lint` invokes ESLint, but ESLint is not declared in `frontend/package.json`.
- `frontend/src/tests/` currently contains only `.gitkeep`; frontend unit tests are not configured.

### CI

The GitHub Actions workflow builds the backend and frontend. It does not currently run frontend unit
tests or lint. Consult `.github/workflows/ci.yml` for the active triggers and exact jobs.

## 2. Backend commands

Run from `backend/` (Maven must be installed; there is no checked-in Maven wrapper):

```powershell
mvn test
mvn -Dtest=ClassName test
mvn -Dtest=ClassName#method test
mvn clean package
mvn -DskipTests clean package
```

Suggested coverage includes service rules, public-vs-authenticated access, DTO mapping, validation,
and the `GET /api/public/programs` filter for active and published courses. Use H2 for isolated
integration tests and Spring Security Test/MockMvc for authorization behavior.

## 3. Frontend checks

```powershell
cd frontend
npm run build
npm test -- --run       # unavailable until Vitest is installed and configured
npm run lint            # unavailable until ESLint and a compatible config are installed
```

When a browser is available, verify:

- Public navigation and admission CTAs at desktop and mobile widths.
- Academics program content, catalog loading/error states, FAQ interaction, and no mobile overflow.
- Contact form WhatsApp handoff text and that the page does not claim to submit until the visitor
  sends the prepared message.
- Authenticated management routes and role-filtered navigation.

## 4. Known coverage gaps

1. Add backend unit/integration tests; `mvn test` currently discovers no committed test classes.
2. Add and configure Vitest with React Testing Library before relying on `npm test`.
3. Add and configure ESLint using a version/config compatible with the frontend toolchain.
4. Add a live-backend integration check for the public program catalog, including unpublished and
   inactive records.
5. Keep browser smoke coverage for responsive public pages and accessible FAQ/form interactions.

## 5. Changelog

| Date | Change |
|---|---|
| 2026-09-28 | Initial test inventory: backend build passed with no test sources; frontend test runner was not installed. |
| 2026-10-21 | Recorded successful Maven test command (zero test sources), frontend build, Academics mobile smoke check, and unavailable local public-catalog API. |
