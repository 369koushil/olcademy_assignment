# Full Stack CI/CD Pipeline with Jenkins, Docker, and Nginx

This project demonstrates an end-to-end CI/CD pipeline for a full stack application using **Jenkins**, **Docker**, **Docker Compose**, and **Nginx**.  
The focus of the project is on **DevOps practices**, automation, and deployment workflows rather than application complexity.

The pipeline automatically builds, pushes, and deploys frontend and backend Docker images whenever code is updated in the repository.

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

The Jenkins pipeline is implemented as an **SCM-based Jenkinsfile**, meaning the pipeline definition is stored inside the Git repository and version-controlled along with the application code.

Pipeline stages:

1. **Checkout Source Code**
2. **Build Docker Images**
3. **Push Docker Images to Docker Hub**
4. **Deploy Application using Docker Compose**

Each pipeline run is fully automated, repeatable, and triggered by code changes.

---

## GitHub Webhook Integration

A **GitHub webhook** is configured to notify Jenkins whenever code is pushed to the repository.

Flow:
1. Developer pushes code to GitHub
2. GitHub webhook triggers Jenkins
3. Jenkins pulls the latest code
4. CI/CD pipeline executes automatically

This ensures continuous integration without manual pipeline execution.

---

## Jenkins Pipeline Stages

### 1. Declarative Checkout SCM
- Jenkins pulls the latest code from the Git repository
- Triggered automatically via GitHub webhook
- Ensures the pipeline always runs against the latest commit

---

### 2. Build Docker Images
- Builds two Docker images:
  - Frontend image
  - Backend image
- Uses Dockerfiles defined in the repository
- Multi-stage Docker builds are used where applicable to reduce image size
- Application code is always executed inside containers

---

### 3. Push Docker Images
- Built images are pushed to Docker Hub
- Docker Hub credentials are securely stored in Jenkins Credentials
- Authentication is handled via a Jenkins Shared Library function
- No credentials are exposed in the Jenkinsfile or repository

---

### 4. Deploy Stage
- Uses `docker compose up --build -d`
- Starts or updates all required containers
- Ensures idempotent deployments (safe to run multiple times)
- Application becomes available immediately after deployment

---

## Jenkins Shared Library Usage

This project uses a **Jenkins Shared Library** to keep the pipeline logic clean, reusable, and modular.

The shared library is maintained in a separate GitHub repository:

**Shared Library Repository:**  
https://github.com/369koushil/shared_lib_jenkins

Shared library responsibilities:
- Docker login logic
- Docker image build logic
- Docker image push logic

Benefits:
- No hardcoded credentials in Jenkinsfile
- Reusable functions across multiple pipelines
- Cleaner and more readable pipeline code
- Easier maintenance and scaling of CI/CD workflows

Example shared library usage:
```groovy
dockerLogin('docker-hub-creds')
buildDockerImages("boolean99", "frontend", "frontend")
buildDockerImages("boolean99", "backend", "backend")
pushDockerImages("boolean99", "frontend")
pushDockerImages("boolean99", "backend")
