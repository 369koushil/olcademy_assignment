# Full Stack CI/CD Pipeline with Jenkins, Docker, and Nginx

This project demonstrates an end-to-end CI/CD pipeline for a full stack application using **Jenkins**, **Docker**, **Docker Compose**, and **Nginx**.  
The focus of the project is on **DevOps practices**, not application complexity.

The pipeline automatically builds, pushes, and deploys frontend and backend Docker images whenever code is updated.

---

## High-Level Architecture

- Frontend: React (built into static files and served by Nginx)
- Backend: Node.js REST API
- Database: MongoDB
- CI/CD: Jenkins (SCM-based pipeline)
- Containerization: Docker
- Reverse Proxy: Nginx (handles frontend → backend communication)

---

## CI/CD Pipeline Overview

The Jenkins pipeline is defined as an **SCM-based Jenkinsfile**, meaning the pipeline code is stored inside the Git repository and version-controlled.

Pipeline stages:

1. **Checkout Source Code**
2. **Build Docker Images**
3. **Push Docker Images to Docker Hub**
4. **Deploy Application using Docker Compose**

Each pipeline run is fully automated and repeatable.

---

## Jenkins Pipeline Stages

### 1. Declarative Checkout SCM
- Jenkins pulls the latest code from the Git repository
- Triggered automatically on commits (via webhook or polling)

---

### 2. Build Docker Images
- Builds two Docker images:
  - Frontend image
  - Backend image
- Uses multi-stage Docker builds for optimized image size
- No application code is run outside containers

---

### 3. Push Docker Images
- Images are pushed to Docker Hub
- Docker Hub credentials are securely managed using Jenkins credentials
- Authentication is handled via a shared Jenkins library function

---

### 4. Deploy Stage
- Uses `docker compose up --build -d`
- Pulls the latest images
- Starts or updates all containers
- Ensures idempotent deployments (safe to run multiple times)

---

## Jenkins Shared Library Usage

This project uses a **Jenkins Shared Library** to keep the pipeline clean and reusable.

Shared library responsibilities:
- Docker login logic
- Docker image build logic
- Docker image push logic

Benefits:
- No hardcoded credentials in Jenkinsfile
- Reusable functions across multiple pipelines
- Cleaner and more readable pipeline code

Example shared library usage:
```groovy
dockerLogin('docker-hub-creds')
buildDockerImages("boolean99", "frontend", "frontend")
pushDockerImages("boolean99", "backend")
