# Nirman — Production-Grade AI Software Engineering Platform

Nirman is an enterprise-grade AI Software Engineering SaaS Platform that simulates a full software development company. Multiple specialized AI agents collaborate across all 20 SDLC phases to transform ideas into production-ready software products.

---

## 🌟 Vision & Key Features

- **20-Phase SDLC Pipeline**: Follows full software lifecycle from Product Discovery to PRDs, SRS, 3NF DB design, Clean Architecture, FastAPI micro-services, Next.js frontend, PyTest suites, Docker, and monitoring.
- **14 Specialized AI Employee Roles**: CEO, Business Analyst, Product Manager, Solution Architect, System Architect, DB Architect, UI/UX Designer, Frontend Engineer, Backend Engineer, API Engineer, AI Engineer, Security Engineer, QA Engineer, DevOps Engineer.
- **AI War Room**: Real-time multi-agent debate stream, consensus builder, and directive console.
- **Enterprise Dark Aesthetics**: Modern glassmorphic UI inspired by Vercel, Linear, and Stripe.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, TanStack Query, Zod.
- **Backend**: FastAPI (Python), Async SQLAlchemy 2.0, Pydantic v2, JWT Security, SQLite (Zero-Setup) / PostgreSQL.
- **DevOps**: Docker, Docker Compose, Nginx.

---

## 🚀 Quickstart Guide

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
pip install -r requirements.txt
python -m app.main
```
FastAPI server starts at `http://localhost:8000`. OpenAPI docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Next.js web app opens at `http://localhost:3000`.

### 3. Docker Compose Stack
```bash
docker-compose up --build
```
