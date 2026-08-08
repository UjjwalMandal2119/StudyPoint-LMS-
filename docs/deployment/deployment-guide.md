# Deployment Guide

## Docker Compose (Development)
Run from the project root:
```bash
docker-compose -f docker/compose/docker-compose.yml up -d
```

## Kubernetes (Production)
```bash
kubectl apply -k kubernetes/overlays/prod
```

## Environment Variables
Copy `.env.example` to `.env` and adjust values for your environment.