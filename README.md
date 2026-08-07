# Study Point

Study Point is a production-ready coaching institute management platform and learning management system built for modern education businesses.

## Overview

This monorepo contains:
- Backend: Java 21 + Spring Boot 3 + Spring Security + Spring Data JPA + JWT
- Frontend: React 19 + Vite + React Router + Redux Toolkit + Tailwind CSS
- Database: MySQL 8 (`study_point`)
- DevOps: Docker, Kubernetes, CI/CD

## Project Structure

```text
StudyPoint/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/studypoint/backend/
│   │   │   │   ├── config/
│   │   │   │   ├── constants/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   │   ├── auth/
│   │   │   │   │   ├── request/
│   │   │   │   │   └── response/
│   │   │   │   ├── entity/
│   │   │   │   ├── exception/
│   │   │   │   ├── mapper/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   ├── service/
│   │   │   │   ├── util/
│   │   │   │   ├── validator/
│   │   │   │   ├── scheduler/
│   │   │   │   ├── websocket/
│   │   │   │   ├── notification/
│   │   │   │   └── StudyPointApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       ├── application-prod.yml
│   │   │       └── static/
│   │   └── test/
│   │       └── java/com/studypoint/backend/
│   ├── pom.xml
│   └── .mvn/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── forms/
│   │   │   ├── charts/
│   │   │   └── ui/
│   │   ├── config/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   ├── student/
│   │   │   ├── teacher/
│   │   │   ├── parent/
│   │   │   └── public/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   │   ├── slices/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── dashboard/
│   │   ├── chatbot/
│   │   ├── discussion/
│   │   ├── tests/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── database/
│   ├── schema/
│   ├── seed/
│   ├── migrations/
│   └── mysql-init.sql
├── docker/
│   ├── backend/
│   ├── frontend/
│   └── compose/
├── kubernetes/
│   ├── base/
│   ├── overlays/
│   ├── backend/
│   ├── frontend/
│   └── mysql/
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── deployment/
├── screenshots/
├── .github/
│   └── workflows/
├── .gitignore
├── .env.example
├── LICENSE
└── README.md
```

## Architectural Principles

- Clean architecture with distinct layers
- RESTful APIs and DTO-driven contracts
- Role-based access control
- Modular frontend component design
- Security-first implementation
- Scalable, testable, and maintainable software

## Expected Stack Configuration

- Java 21
- Spring Boot 3
- Spring Security 6
- Spring Data JPA
- MySQL 8
- JWT Authentication
- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Axios

## Notes

This repository is structured to support the following business domains:
- Admission and enrollment
- Student, teacher, parent, and admin management
- Attendance, fees, library, assessments, and schedules
- Communication, notifications, and discussion portals
- Reports, analytics, and dashboards
- Learning content and online classroom support

This is the architecture-first scaffold for the platform and does not yet include application logic.
