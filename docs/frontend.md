# Study Point — Frontend Documentation

> React 19 single-page application for the Study Point coaching institute + LMS platform.
> Serves public marketing pages, authentication, and role-based portals (admin, teacher,
> student, parent) backed by the Spring Boot REST API.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Application Bootstrapping](#5-application-bootstrapping)
6. [Routing](#6-routing)
7. [Layout & Navigation](#7-layout--navigation)
8. [State Management (Redux)](#8-state-management-redux)
9. [API Layer & Services](#9-api-layer--services)
10. [Reusable Components](#10-reusable-components)
11. [Pages](#11-pages)
12. [Styling System](#12-styling-system)
13. [Environment Variables](#13-environment-variables)
14. [Build, Docker & Production](#14-build-docker--production)

---

## 1. Overview

The frontend is a **Vite + React 19** SPA that:

- Uses **React Router DOM v7** (`useRoutes`) for declarative routing.
- Uses **Redux Toolkit** for global state (auth session only — everything else is local state).
- Talks to the backend through a single **Axios** instance with a JWT bearer-token interceptor.
- Is styled entirely with **Tailwind CSS 3** using a navy/amber "academic" theme.
- Consumes Spring's paginated `Page<T>` responses via reusable `DataTable` + `EntityFormModal`
  components, so every CRUD page follows the same pattern.

### Feature map

| Area | Path prefix | Notes |
|---|---|---|
| Public site | `/`, `/about`, `/contact`, `/courses` | Marketing pages |
| Auth | `/login`, `/register` | JWT login/register |
| Landing | `/dashboard` | Role-based redirect hub |
| Admin portal | `/admin-dashboard`, all CRUD pages | Role-gated sidebar |
| Student portal | `/student-dashboard` | Stats, quick links |
| Teacher portal | `/teacher-dashboard` | Stats, quick links |
| Parent portal | `/parent-dashboard` | Stats, quick links |

---

## 2. Tech Stack

| Concern | Choice | Config |
|---|---|---|
| Framework | React 19 | `package.json` |
| Build tool | Vite 5 | `vite.config.js` |
| Router | react-router-dom 7 | `src/routes/index.jsx` |
| Global state | @reduxjs/toolkit 2 + react-redux 9 | `src/store/` |
| HTTP | axios 1.x | `src/api/axios.js` |
| Styling | tailwindcss 3 + postcss + autoprefixer | `tailwind.config.js`, `postcss.config.js` |
| Icons | react-icons (Feather set, `fi`) | pages/components |
| UI kit | Custom semantic classes (`.card`, `.btn-*`, `.input`) | `src/index.css` |

### package.json scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Dev server on :5173 with `/api` proxy → :8080 |
| `build` | `vite build` | Production bundle → `dist/` |
| `preview` | `vite preview` | Preview built bundle |
| `lint` | `eslint src/ --fix` | Lint + autofix |
| `test` | `vitest` | Test runner stub (Vitest not currently installed) |
## 3. Getting Started

```bash
cd frontend
npm install        # install dependencies
npm run dev        # develop at http://localhost:5173  (proxies /api → backend)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

The dev server expects the Spring Boot backend on **http://localhost:8080**. The Vite config
proxies `/api` to it automatically, so the app uses relative URLs in development.

```js
// vite.config.js (essence)
server: {
  port: 5173,
  open: true,
  proxy: {
    '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false },
  },
}
```

---

## 4. Project Structure

```text
frontend/
├── index.html                  # HTML entry (mounts #root, loads src/main.jsx)
├── package.json
├── vite.config.js              # plugin-react + dev server /api proxy
├── tailwind.config.js          # theme palette (lms-*, navy-*, accent-amber, status-*)
├── postcss.config.js           # tailwindcss + autoprefixer
├── public/                     # static assets served at /
├── dist/                       # production build output (gitignored)
└── src/
    ├── main.jsx                # ReactDOM.createRoot + <Provider> + <BrowserRouter>
    ├── App.jsx                 # uses useRoutes(routes)
    ├── index.css               # Tailwind layers + semantic component classes
    ├── api/axios.js            # Axios instance + auth request interceptor + 401 cleanup
    ├── config/index.js         # API_BASE_URL, APP_NAME, ROLES, PAGINATION
    ├── constants/index.js      # VALID_ROLES, GENDER_OPTIONS
    ├── components/
    │   ├── common/             # DataTable, ProtectedRoute
    │   ├── forms/              # EntityFormModal (generic CRUD form modal)
    │   ├── layout/             # Layout (authenticated shell), header/*, footer/Footer
    │   └── ui/                 # Button, Card, RoleBadge, StatusBadge, ViewModal, CalloutBanner
    ├── pages/                  # All route components (see Pages section)
    │   ├── auth/               # Login, Register
    │   ├── admin/              # AdminDashboard
    │   ├── student/            # StudentDashboard
    │   ├── teacher/            # TeacherDashboard
    │   ├── parent/             # ParentDashboard
    │   └── public/             # Home, About, Contact, Courses
    ├── routes/index.jsx        # Central route table
    ├── services/               # One module per backend resource (see API layer)
    ├── store/
    │   ├── index.js            # configureStore({ auth: authReducer })
    │   └── slices/authSlice.js # auth slice (token/user/role + localStorage)
    ├── utils/dashboardPath.js  # role → dashboard route mapping
    └── (scaffold dirs) hooks/ layouts/ context/ tests/ chatbot/ discussion/ dashboard/
```

---

## 5. Application Bootstrapping

Entry chain: `index.html → src/main.jsx → src/App.jsx → src/routes/index.jsx`

```jsx
// src/main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>        {/* Redux store */}
    <BrowserRouter>              {/* Router context */}
      <App />
    </BrowserRouter>
  </Provider>
);
```

```jsx
// src/App.jsx — renders the route table as a single element tree
function App() {
  const element = useRoutes(routes);
  return element;
}
```

`src/store/index.js` creates the store with a single `auth` slice:

```js
const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
```

---

## 6. Routing

All routes are declared declaratively in `src/routes/index.jsx` with `useRoutes()`.

### Public routes (no auth required)

| Path | Component | File |
|---|---|---|
| `/` and `/home` | `Home` | `pages/public/Home.jsx` |
| `/about` | `About` | `pages/public/About.jsx` |
| `/contact` | `Contact` | `pages/public/Contact.jsx` |
| `/courses` | `PublicCourses` | `pages/public/Courses.jsx` |
| `/login` | `Login` | `pages/auth/Login.jsx` |
| `/register` | `Register` | `pages/auth/Register.jsx` |

### Authenticated routes

| Path | Protection | Notes |
|---|---|---|
| `dashboard` | `<ProtectedRoute>` | Role-based landing page, redirects to each role's portal |
| `admin-dashboard` … `grievances` | `<ProtectedRoute>` + `<Layout>` | All portal pages render inside the shared layout |

### Portal routes (children of `Layout`)

| Path | Component | File |
|---|---|---|
| `/admin-dashboard` | `AdminDashboard` | `dashboard/AdminDashboard.jsx` |
| `/student-dashboard` | `StudentDashboard` | `dashboard/StudentDashboard.jsx` |
| `/teacher-dashboard` | `TeacherDashboard` | `dashboard/TeacherDashboard.jsx` |
| `/parent-dashboard` | `ParentDashboard` | `dashboard/ParentDashboard.jsx` |
| `/courses` | `Courses` | `pages/Courses.jsx` |
| `/subjects` | `Subjects` | `pages/Subjects.jsx` |
| `/batches` | `Batches` | `pages/Batches.jsx` |
| `/exams` | `Exams` | `pages/Exams.jsx` |
| `/questions` | `Questions` | `pages/Questions.jsx` |
| `/assignments` | `Assignments` | `pages/Assignments.jsx` |
| `/users` | `Users` | `pages/Users.jsx` |
| `/students` | `Students` | `pages/Students.jsx` |
| `/teachers` | `Teachers` | `pages/Teachers.jsx` |
| `/attendance` | `Attendance` | `pages/Attendance.jsx` |
| `/enrollments` | `Enrollments` | `pages/Enrollments.jsx` |
| `/results` | `Results` | `pages/Results.jsx` |
| `/timetable` | `Timetable` | `pages/Timetable.jsx` |
| `/parents` | `Parents` | `pages/Parents.jsx` |
| `/admissions` | `Admissions` | `pages/Admissions.jsx` |
| `/notices` | `Notices` | `pages/Notices.jsx` |
| `/notifications` | `Notifications` | `pages/Notifications.jsx` |
| `/study-materials` | `StudyMaterials` | `pages/StudyMaterials.jsx` |
| `/discussions` | `Discussions` | `pages/Discussions.jsx` |
| `/grievances` | `Grievances` | `pages/Grievances.jsx` |

### ProtectedRoute

`components/common/ProtectedRoute.jsx` reads `state.auth.token` from Redux. Without a token it
redirects to `/login` with `<Navigate replace>`, otherwise it renders children.

### Role → dashboard mapping (`utils/dashboardPath.js`)

```js
ADMIN|SUPER_ADMIN → /admin-dashboard
STUDENT           → /student-dashboard
TEACHER           → /teacher-dashboard
PARENT            → /parent-dashboard
anything else     → /dashboard   // RECEPTIONIST, ACCOUNTANT, LIBRARIAN, ...
```

The same mapping is used by the `Dashboard` landing page and the auth-aware header
"Dashboard" button (`getDashboardPath(role)`).

---

## 7. Layout & Navigation

### Authenticated shell — `components/layout/Layout.jsx`

- Fixed **sidebar** (collapsible `w-64 ↔ w-16`) with Study Point branding and a role-filtered
  `NavLink` menu.
- **Top bar** + `<Header sticky={false} />` + `<main>` with `<Outlet />` + `<Footer />`.
- The menu is built from an array of `{ to, label, roles }` items. Only items whose `roles`
  array includes the signed-in user's role are rendered:

```js
const filteredNav = nav.filter((item) => !item.roles || item.roles.includes(role));
```

| Menu item | Roles allowed |
|---|---|
| Dashboard | All roles |
| Admin Panel | ADMIN, SUPER_ADMIN |
| Student Panel | STUDENT |
| Teacher Panel | TEACHER |
| Parent Panel | PARENT |
| Courses | ADMIN, SUPER_ADMIN, TEACHER, RECEPTIONIST, LIBRARIAN |
| Subjects | ADMIN, SUPER_ADMIN, TEACHER |
| Batches | ADMIN, SUPER_ADMIN, TEACHER, RECEPTIONIST |
| Exams | ADMIN, SUPER_ADMIN, TEACHER |
| Questions | ADMIN, SUPER_ADMIN, TEACHER |
| Assignments | ADMIN, SUPER_ADMIN, TEACHER, STUDENT |
| Users | ADMIN, SUPER_ADMIN |
| Students | ADMIN, SUPER_ADMIN, TEACHER, RECEPTIONIST, PARENT |
| Teachers | ADMIN, SUPER_ADMIN, RECEPTIONIST |
| Attendance | ADMIN, SUPER_ADMIN, TEACHER, STUDENT, PARENT |
| Enrollments | ADMIN, SUPER_ADMIN, RECEPTIONIST |
| Results | ADMIN, SUPER_ADMIN, TEACHER, STUDENT, PARENT |
| Timetable | ADMIN, SUPER_ADMIN, TEACHER, STUDENT |
| Parents | ADMIN, SUPER_ADMIN |
| Admissions | ADMIN, SUPER_ADMIN, RECEPTIONIST |
| Notices | ADMIN, SUPER_ADMIN, TEACHER, STUDENT, PARENT, RECEPTIONIST |
| Notifications | ADMIN, SUPER_ADMIN, STUDENT, TEACHER, PARENT, RECEPTIONIST, ACCOUNTANT, LIBRARIAN |
| Study Materials | ADMIN, SUPER_ADMIN, TEACHER, STUDENT |
| Discussions | ADMIN, SUPER_ADMIN, STUDENT, TEACHER, PARENT |
| Grievances | ADMIN, SUPER_ADMIN, STUDENT, TEACHER, PARENT, RECEPTIONIST |

### Public header — `components/layout/header/Header.jsx`

- Three-section CSS grid (`1fr auto 1fr`): logo | centered nav | auth actions.
- **Guest**: "Login" (outline) + "Enroll Now" (solid). **Signed in**: "Dashboard" +
  "Logout" buttons.
- Sticky by default; pass `sticky={false}` inside the portal layout.
- Accessible mobile menu (Escape closes, focus returns to toggle) via `MobileNavigation`.

Navigation config lives in `components/layout/header/navigation.js` (Home, About, Courses, Contact)
and is shared by `DesktopNavigation` and `MobileNavigation`.

### Footer — `components/layout/footer/Footer.jsx`
---

## 8. State Management (Redux)

Only **authentication** is held in Redux — all page data uses local `useState`/`useEffect`.

### `store/slices/authSlice.js`

| Action | Effect |
|---|---|
| `setCredentials(payload)` | Sets `token`, `user`, `role`; persists to `localStorage` keys `accessToken`, `user`, `role` |
| `logout()` | Clears Redux state **and** `localStorage` |

Initial state is hydrated from `localStorage` (`loadFromStorage()`), so a page refresh restores
the session.

```js
const initialState = loadFromStorage(); // { token, user, role } from localStorage
```

### Login / Register flow

1. `Login.jsx` / `Register.jsx` call `services/auth.service.js`.
2. Success returns `{ accessToken, refreshToken, user, role }`.
3. `dispatch(setCredentials(result))` → state + `localStorage`.
4. `navigate('/dashboard')` → role landing page.
5. Header becomes auth-aware (Dashboard / Logout buttons).

### Logout

`Header` and `MobileNavigation` dispatch `logout()` and navigate to `/login`. The Axios response
interceptor also clears `localStorage` on any `401`, so expired sessions eventually return the user
to the login page.

---

## 9. API Layer & Services

### Axios instance — `api/axios.js`

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});
```

- **Request interceptor**: attaches `Authorization: Bearer <accessToken>` from `localStorage`.
- **Response interceptor**: on `401`, wipes `accessToken`/`user`/`role` from `localStorage`.

### CRUD helpers — `services/crud.js`

Central helpers that normalize every backend call:

| Helper | Purpose |
|---|---|
| `request(method, url, payload)` | Raw call; unwraps `ApiResponse` into `{ data, success, message, status }`; normalizes errors into `Error` with `status` and `errors` |
| `apiGet(url)` | `request('GET', url)` |
| `apiCreate(url, payload)` | `request('POST', url, payload)` |
| `apiUpdate(url, payload)` | `request('PUT', url, payload)` |
| `apiDelete(url)` | `request('DELETE', url)` |
| `listPage(url)` | Unwraps a Spring `Page` → `{ items, totalElements, totalPages, number, size }` |

The backend envelope is `{ success, message, data, statusCode, timestamp }`; `data` holds either the
payload or a Spring `Page` object (`content`, `totalElements`, `totalPages`, `number`, `size`).

### Service modules (`src/services/*.service.js`)

One module per backend resource. Every module re-exports named functions (list/get/create/update/
remove/search where applicable).

| Module | Endpoints hit | Highlighted functions |
|---|---|---|
| `auth.service.js` | `/auth/login`, `/auth/register`, `/auth/logout` | `login`, `register`, `logout` |
| `admission.service.js` | `/admissions` | `list`, `create`, `review`, `track` |
| `assignment.service.js` | `/assignments` | `list`, `get`, `create`, `update`, `remove` |
| `attendance.service.js` | `/attendance` | `mark`, `bulkMark`, `getByStudent`, `getByBatch`, `summary` |
| `batch.service.js` | `/batches` | CRUD + `getByCourse`, `getByTeacher` |
| `course.service.js` | `/courses` | CRUD + `search`, `publish`, `toggleActive`, `getByCode` |
| `dashboard.service.js` | `/dashboard/{admin,student,teacher,parent}` | `getAdminStats`, `getStudentStats`, `getTeacherStats`, `getParentStats` |
| `discussion.service.js` | `/discussions` | CRUD + reply, like, resolve, close, pin, report |
| `enrollment.service.js` | `/enrollments` | CRUD + `approve`, `reject`, `getByStudent`, `getByBatch` |
| `exam.service.js` | `/exams` | CRUD + `getByBatch`, `getBySubject` |
| `grievance.service.js` | `/grievances` | CRUD + `search`, tracking, status/category filters |
| `notice.service.js` | `/notices` | CRUD + `publish`, `unpublish`, `getPublished`, `getImportant` |
| `notification.service.js` | `/notifications` | `getMy`, `getUnread`, `getUnreadCount`, `markAllRead`, `markRead` |
| `parent.service.js` | `/parents` | CRUD |
| `question.service.js` | `/questions` | CRUD + `bulk`, `getBySubject`, `getApproved` |
| `result.service.js` | `/results` | `list`, `getByExam`, `getByStudent` |
| `student.service.js` | `/students` | CRUD + `getByUserId`, `getByBatch`, `search` |
| `studymaterial.service.js` | `/study-materials` | CRUD + `getPublic`, `getBySubject`, `getByBatch`, `download` |
| `subject.service.js` | `/subjects` | CRUD + `getByCourse`, `getByTeacher` |
| `teacher.service.js` | `/teachers` | CRUD + `getByUserId`, `search` |
| `timetable.service.js` | `/timetable` | CRUD + `getByBatch`, `getByBatchAndDay` |
| `user.service.js` | `/users` | `list`, `get`, `search`, `update`, `remove`, `countByRole`, `lock`, `unlock` |
---

## 10. Reusable Components

### Common (`components/common/`)

| Component | File | Purpose |
|---|---|---|
| `DataTable` | `components/common/DataTable.jsx` | Server-paginated table. Props: `columns`, `data`, `loading`, `error`, `totalElements`, `totalPages`, `pageNumber`, `pageSize`, `onPageChange`, `onSearch`. Columns support `key`, `label`, `className`, and `render(row)` |
| `ProtectedRoute` | `components/common/ProtectedRoute.jsx` | Redirects unauthenticated users to `/login` |

### Forms (`components/forms/`)

| Component | Purpose |
|---|---|
| `EntityFormModal` | Generic modal CRUD form. Declarative `fields` array: `{ name, label, type?: text\|number\|textarea\|select\|checkbox\|date\|datetime, required?, options? }`. Calls `onSubmit(values)` / `onClose()` |

### UI (`components/ui/`)

| Component | Purpose |
|---|---|
| `Button` | Thin wrapper over `.btn` classes; `variant`: primary / outline / ghost / danger |
| `Card` | White surface with optional `title`, `subtitle`, `actions` |
| `RoleBadge` | Colored badge for a user role |
| `StatusBadge` | Colored badge for record status |
| `ViewModal` | Read-only detail modal. Declarative `fields: { key, label, render? }[]` |
| `CalloutBanner` | Info / warning / tip banner |

### Layout (`components/layout/`)

| Component | Purpose |
|---|---|
| `Layout` | Authenticated shell: collapsible role-filtered sidebar + header + `<Outlet />` + footer |
| `Header`, `DesktopNavigation`, `MobileNavigation`, `Logo`, `LoginButton`, `EnrollButton` | Public website header (sticky, `1fr auto 1fr`, mobile menu) |
| `navigation.js` | Shared nav config object |
| `Footer` | Site footer |

---

## 11. Pages

### Public pages

- `Home`, `About`, `Contact`, `Courses` (marketing/public course list) — see `pages/public/`.

### Auth pages

- `Login` (`pages/auth/Login.jsx`) — username-or-email + password, show/hide password, loading and
  error states, dispatch → `setCredentials` → redirect `/dashboard`.
- `Register` (`pages/auth/Register.jsx`) — username, email, password, first/last name, phone, role
  select (defaults to `STUDENT`). Same post-success flow as login.

### Dashboards

Every dashboard fetches role-specific stats from `services/dashboard.service.js` and renders
stat cards, progress bars/trends, recent data, and quick links.

| Dashboard | Stats shown (from `GET /dashboard/...`) |
|---|---|
| `AdminDashboard` | totalStudents/Teachers/Parents/Courses/Subjects/Batches/Users, male/female split, 6-month registration trend, recent notices |
| `StudentDashboard` | attendance %, pending/published assignments, upcoming exams, results + average %, unread notifications, enrolled courses, present/total days |
| `TeacherDashboard` | teacher-centric counts (per `TeacherDashboardStats`) |
| `ParentDashboard` | parent-centric counts (per `ParentDashboardStats`) |

### CRUD pages (same blueprint)

All management pages (`Courses`, `Subjects`, `Batches`, `Exams`, `Questions`, `Assignments`,
`Users`, `Students`, `Teachers`, `Attendance`, `Enrollments`, `Results`, `Timetable`, `Parents`,
`Admissions`, `Notices`, `Notifications`, `StudyMaterials`, `Discussions`, `Grievances`) follow the
same pattern used in `pages/Courses.jsx`:

1. **State**: paginated `page`, `loading`, `error`, `searchTerm`, `openModal`, `editing`,
   `viewing`, `formLoading`.
2. **Fetch**: `fetchPage(n)` calls `list()` or `search()` from the matching service.
3. **Table**: `<DataTable columns={COLS} ... onPageChange={fetchPage} onSearch={...} />`.
4. **Create/Edit**: `<EntityFormModal ... fields={FIELDS} onSubmit={...} />`.
5. **View**: `<ViewModal fields={viewFields} ... />`.
6. **Actions**: inline buttons for View / Edit / Delete (+ resource-specific actions such as
   publish, approve, toggle active).

---

## 12. Styling System

### Tailwind theme (`tailwind.config.js`)

Custom color tokens used throughout the app:

| Token | Value | Usage |
|---|---|---|
| `lms-bg` | `#f3f5f9` | App background |
| `lms-card` | `#ffffff` | Card surfaces |
| `lms-border` | `#e2e8f0` | Borders |
| `lms-code` | `#0f172a` | Code blocks |
| `navy-dark` | `#0f172a` | Dark branding / text |
| `navy-primary` | `#1e3a8a` | Primary brand (buttons, headings) |
| `navy-hover` | `#2563eb` | Hover states |
| `accent-amber` | `#f59e0b` | Accent (badges, highlights) |
| `status-easy / mid / hard` | green/amber/red | Difficulty badges |
| `info/warn/tip-banner` | blue/orange/green tones | Callout banners |

Font stack: `Segoe UI`, system-ui, -apple-system. Shadows: `card`, `lift`.

### Semantic CSS classes (`src/index.css`)

Defined under `@layer components` and reused everywhere:

| Class | Description |
|---|---|
| `.card` / `.card-pad` | Card surface + padding |
| `.btn` + `.btn-primary` / `.btn-outline` / `.btn-ghost` / `.btn-danger` | Button variants |
| `.input` | Text/select/textarea styling |
| `.badge` | Pill badge |

Base layer: body background, headings colored `navy-dark`, custom scrollbar, antialiasing.

---

## 13. Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `/api` | Axios `baseURL`. In dev, Vite's proxy handles the relative path; use the full backend URL when the API is hosted separately |

Example `.env` for a standalone API:

```ini
VITE_API_URL=http://localhost:8080/api
```

> Only `VITE_`-prefixed variables are exposed to the client bundle by Vite. Other app constants
> (`APP_NAME`, `ROLES`, `PAGINATION`) are exported from `src/config/index.js`.

---

## 14. Build, Docker & Production

### Production build

```bash
npm run build        # outputs static files to frontend/dist
npm run preview      # local preview of the build
```

### Docker image (`docker/frontend/Dockerfile`)

Multi-stage build:

1. `node:20-alpine` builds with `npm ci && npm run build`.
2. `nginx:alpine` serves `build/dist` and copies `nginx.conf`.

### nginx runtime config (`docker/frontend/nginx.conf`)

```nginx
location /          { try_files $uri $uri/ /index.html; }   # SPA fallback
location /api/      { proxy_pass http://backend:8080/api/; } # → Spring Boot
location /uploads/  { proxy_pass http://backend:8080/uploads/; }
```

- Serves the SPA with history-mode routing fallback.
- Proxies `/api/` and `/uploads/` to the backend container so the frontend can use relative URLs
  in production.
- Compose publishes container port `80` as host port `5173`.

### Containerized stack

```bash
cd docker/compose && docker-compose up -d
```

Compose starts `mysql` (healthy gate), `backend`, then `frontend`.

### Kubernetes

Kubernetes manifests live in `kubernetes/`:

- `base/` — backend/frontend deployments + services, MySQL deployment/service/config.
- `overlays/dev/` and `overlays/prod/` — Kustomize overlays.
- `ingress/ingress.yaml` — ingress rules.

### CI/CD

`.github/workflows/ci.yml` builds and tests the project on push/PR.

---

## Appendix — Developer Notes

- **Adding a new management page**: create `pages/Xyz.jsx` following `Courses.jsx`, add a
  `services/xyz.service.js` module, register the route in `routes/index.jsx`, and optionally add a
  role-filtered sidebar entry in `Layout.jsx`.
- **State**: keep server data in local component state; only auth is global (Redux).
- **Error handling**: services throw errors with a `message` (unwrapped from `ApiResponse`) — pages
  read `err.message` for inline display.
- **Lint/test scripts**: `npm run lint` expects ESLint and `npm test` expects Vitest; neither is
  currently installed as a devDependency, so those workflows are stubs until those tools are added.