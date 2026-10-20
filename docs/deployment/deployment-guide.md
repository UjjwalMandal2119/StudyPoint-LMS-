# Deployment Status

The repository includes Docker, Docker Compose, and Kubernetes files as deployment scaffolding. They are not ready-to-run or production-ready in their current state. Review and correct the configurations before attempting a deployment.

## Current blockers

- The Compose file is under `docker/compose/`, but its relative build contexts and MySQL initialization-script mount do not resolve to the repository paths they reference.
- The backend Dockerfile uses an invalid base-image name and invokes `./mvnw`, but no Maven wrapper is checked into the repository.
- The Kubernetes manifests include sample credentials and secrets, use ephemeral storage for MySQL and uploads, and require environment-specific configuration.

Do not expose these configurations publicly or use the sample credentials in production. Before deploying, correct the paths and images, generate private credentials, configure persistent storage and TLS, and verify probes, ingress, database access, and CORS for the target environment.

## Local development

For the supported local development workflow, start MySQL, run the Spring Boot backend, and then run the Vite frontend as described in the root [README](../../README.md#run-locally).

## Deployment assets

- `docker/compose/docker-compose.yml` — Compose services for MySQL, backend, and frontend
- `docker/backend/Dockerfile` and `docker/frontend/Dockerfile` — container build definitions
- `kubernetes/base/` — Kubernetes resources for the application and MySQL
- `kubernetes/overlays/dev/` and `kubernetes/overlays/prod/` — Kustomize overlays
- `kubernetes/ingress/ingress.yaml` — example ingress configuration
