# Study Point

Study Point is a production-ready coaching institute management platform and learning management system built for modern education businesses.

## Overview

This monorepo contains:
- **Backend**: Java 21 + Spring Boot 3 + Spring Security + Spring Data JPA + JWT
- **Frontend**: React 19 + Vite + React Router + Redux Toolkit + Tailwind CSS
- **Database**: MySQL 8 (`study_point`)
- **DevOps**: Docker, Kubernetes, CI/CD

## Project Structure

```text
StudyPoint/
├── backend/                              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/studypoint/backend/
│   │   │   │   ├── config/               # Spring configuration (Security, etc.)
│   │   │   │   ├── constants/           # Enums and constants
│   │   │   │   ├── controller/          # REST controllers
│   │   │   │   ├── dto/
│   │   │   │   │   ├── auth/            # Auth request/response DTOs
│   │   │   │   │   ├── request/         # Entity request DTOs
│   │   │   │   │   └── response/        # Entity response DTOs + ApiResponse
│   │   │   │   ├── entity/              # JPA entities
│   │   │   │   ├── exception/           # Custom exceptions + global handler
│   │   │   │   ├── mapper/              # MapStruct mappers
│   │   │   │   ├── repository/          # Spring Data JPA repositories
│   │   │   │   ├── security/            # JWT filters, UserDetailsService
│   │   │   │   ├── service/             # Service interfaces
│   │   │   │   │   └── impl/            # Service implementations
│   │   │   │   ├── util/                # Utility classes
│   │   │   │   ├── validator/           # Bean validators
│   │   │   │   ├── scheduler/           # Scheduled tasks (future)
│   │   │   │   ├── websocket/           # WebSocket config (future)
│   │   │   │   ├── notification/        # Notification service (future)
│   │   │   │   └── StudyPointApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml      # Base config
│   │   │       ├── application-dev.yml  # Development profile
│   │   │       ├── application-prod.yml # Production profile
│   │   │       └── static/              # Static resources
│   │   └── test/                        # Unit & integration tests
│   └── pom.xml
├── frontend/                            # React + Vite application
│   ├── public/                          # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── api/                         # Axios instance & interceptors
│   │   ├── assets/                      # Images, icons, fonts
│   │   ├── components/
│   │   │   ├── common/                  # Reusable: DataTable, ProtectedRoute
│   │   │   ├── layout/                  # Layout component
│   │   │   ├── forms/                   # Form components: EntityFormModal
│   │   │   └── ui/                      # UI components: RoleBadge, ViewModal
│   │   ├── config/                      # App configuration
│   │   ├── constants/                   # App-wide constants
│   │   ├── context/                     # React context providers
│   │   ├── hooks/                       # Custom hooks
│   │   ├── layouts/                     # Page layouts
│   │   ├── pages/
│   │   │   ├── auth/                    # Login, Register
│   │   │   ├── admin/                   # Admin dashboard
│   │   │   ├── student/                 # Student dashboard
│   │   │   ├── teacher/                 # Teacher dashboard
│   │   │   ├── parent/                  # Parent dashboard
│   │   │   └── public/                  # Home, About, Contact
│   │   ├── routes/                      # React Router route definitions
│   │   ├── services/                    # API service layer
│   │   ├── store/
│   │   │   ├── slices/                 # Redux Toolkit slices
│   │   │   │   └── index.js            # Barrel export
│   │   │   └── index.js                # Store configuration
│   │   ├── styles/                      # Global stylesheets
│   │   ├── utils/                       # Utility functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── database/                           # Database scripts
│   ├── schema/                         # Schema definitions
│   ├── seed/                           # Seed data
│   ├── migrations/                   # Database migrations
│   └── mysql-init.sql                  # MySQL initialization
├── docker/                             # Docker configuration
│   ├── backend/
│   │   └── Dockerfile
│   ├── frontend/
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   └── compose/
│       └── docker-compose.yml
├── kubernetes/                         # Kubernetes manifests
│   ├── base/                           # Base manifests
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   ├── mysql-deployment.yaml
│   │   ├── mysql-service.yaml
│   │   └── mysql-config.yaml
│   ├── overlays/
│   │   ├── dev/
│   │   │   └── kustomization.yaml
│   │   └── prod/
│   │       └── kustomization.yaml
│   └── ingress/
│       └── ingress.yaml
├── docs/                               # Documentation
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── deployment/
├── .github/
│   └── workflows/
│       └── ci.yml                      # CI/CD pipeline
├── .gitignore
├── .env.example
├── LICENSE
└── README.md
```

## Quick Start

### Prerequisites
- Java 21+
- Node.js 20+
- MySQL 8+
- Docker (optional, for containerized dev)

### Environment Setup
```bash
# Copy environment template
cp .env.example .env
# Edit .env and adjust values as needed
```

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Docker Compose (all services)
```bash
cd docker/compose
docker-compose up -d
```

## Architectural Principles

- Clean architecture with distinct layers
- RESTful APIs and DTO-driven contracts
- Role-based access control
- Modular frontend component design
- Security-first implementation
- Scalable, testable, and maintainable software

## Tech Stack

| Layer       | Technology                                         |
|-------------|----------------------------------------------------|
| Runtime     | Java 21                                            |
| Framework   | Spring Boot 3, Spring Security 6, Spring Data JPA  |
| Database    | MySQL 8                                            |
| Auth        | JWT (access + refresh tokens)                      |
| Frontend    | React 19, Vite, React Router, Redux Toolkit        |
| Styling     | Tailwind CSS 3                                     |
| HTTP Client | Axios                                              |
| Build       | Maven, npm                                         |
| DevOps      | Docker, Kubernetes, GitHub Actions                 |
| API Docs    | SpringDoc OpenAPI 3 (Swagger UI at /swagger-ui.html) |

## Business Domains

- Admission and enrollment
- Student, teacher, parent, and admin management
- Attendance, fees, library, assessments, and schedules
- Communication, notifications, and discussion portals
- Reports, analytics, and dashboards
- Learning content and online classroom support

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- API Docs: `http://localhost:8080/api/api-docs`