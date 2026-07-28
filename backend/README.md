# Nirman (निर्माण) - Backend Foundation

Nirman is a startup-grade SaaS platform representing an autonomous AI software development company where specialized AI agents collaborate to build production-grade software. 

This repository contains the enterprise-ready, modular, and highly scalable backend foundation built with **FastAPI**, **SQLAlchemy 2.0 (Async)**, and **PostgreSQL**.

---

## Technical Stack

* **Framework**: FastAPI (Python 3.12+)
* **Database**: PostgreSQL
* **ORM**: SQLAlchemy 2.0 (with asyncio)
* **Validation**: Pydantic v2
* **Migration**: Alembic
* **Authentication**: JWT (Access and Refresh token standard)
* **Containerization**: Docker & Docker Compose
* **Testing**: Pytest & Pytest-asyncio

---

## Folder Structure

The project implements **Clean Architecture** patterns, separating concerns into presentation, business, repository, and database layers:

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth/           # Login, registration, token refresh routes
│   │       ├── users/          # Profile CRUD and role checks
│   │       ├── stubs.py        # Stubs for projects, agents, tasks, workflows, warroom
│   │       └── router.py       # Centrally registers v1 router routes
│   ├── core/
│   │   ├── config.py           # Settings management via Pydantic Settings
│   │   ├── database.py         # Async DB engine & SessionLocal factory
│   │   ├── dependencies.py     # Database and JWT authentication injectables
│   │   ├── logging.py          # Structured application-wide logging
│   │   └── security.py         # JWT tokens & bcrypt password hashing
│   ├── models/
│   │   ├── base.py             # Declarative base model containing UUID & timestamps
│   │   └── user.py             # User DB model
│   ├── schemas/
│   │   ├── auth.py             # Login & Token Pydantic validation schemas
│   │   └── user.py             # User CRUD Pydantic validation schemas
│   ├── repositories/
│   │   ├── base.py             # Generic repository CRUD operations template
│   │   └── user_repository.py  # User-specific query transaction handling
│   ├── services/
│   │   ├── auth_service.py     # Coordinates user logins, refresh, and registrations
│   │   └── user_service.py     # Coordinates profile fetch and editing
│   ├── middleware/
│   │   ├── logging.py          # Tracks HTTP details and route latency (ms)
│   │   └── security.py         # Appends security headers (X-Frame, X-Content, CSP)
│   └── main.py                 # FastAPI application initialization & lifespan context
├── tests/
│   ├── conftest.py            # Event loop, in-memory SQLite setup & client overrides
│   ├── test_health.py          # Validates root and active db health endpoints
│   └── test_auth.py            # Validates registration, JWT login, and token refresh
├── docker/
│   ├── Dockerfile              # Multi-stage production container
│   └── docker-compose.yml      # Orchestrates FastAPI app and PostgreSQL instances
├── migrations/                 # Alembic migration revisions history
├── alembic.ini                 # Migration config
├── requirements.txt            # Dependency list
└── README.md                   # Setup guide
```

---

## Local Setup

### 1. Prerequisites
Ensure you have **Python 3.12+** installed on your local operating system.

### 2. Virtual Environment
Clone the repository and set up a Python virtual environment:
```bash
# Navigate to the backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
```

### 3. Dependencies
Install the required packages:
```bash
pip install -r requirements.txt
```

### 4. Configuration
Create a `.env` file in the `backend/` root directory (you can copy `.env.example` as a starting point):
```bash
cp .env.example .env
```

Ensure you customize database connection strings and secret keys:
```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/nirman
JWT_SECRET_KEY=generate-something-secure-using-openssl-rand-hex-32
JWT_REFRESH_SECRET_KEY=generate-something-secure-using-openssl-rand-hex-32
```

### 5. Running Database Migrations
Verify PostgreSQL is running locally, then initialize database structures:
```bash
alembic upgrade head
```

### 6. Starting Development Server
Launch the server using Uvicorn:
```bash
uvicorn app.main:app --reload
```
The application will launch at `http://127.0.0.1:8000`. You can visit Swagger Interactive API Documentation at `http://127.0.0.1:8000/docs`.

---

## Running Automated Tests

Tests are executed inside an isolated in-memory SQLite database, requiring zero setup:
```bash
pytest -v
```

---

## Running with Docker

Orchestrate the database and FastAPI server using Docker Compose:
```bash
# Navigate to docker folder
cd docker

# Start services
docker-compose up --build
```
This boots up PostgreSQL on port `5432` and the FastAPI server on port `8000`, running database migrations automatically.
