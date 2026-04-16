# CAGS – Academic File Automation

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for managing academic records of the **Computer Engineering Department**.

## Features

Manage all of the following entities with full **Create / Read / Update / Delete** support:

| Entity | Description |
|---|---|
| **Academic Years** | Define academic years (e.g. 2024-25) and mark active year |
| **Faculties** | Faculty members with designation and contact details |
| **Classes** | FY / SY / TY / Final Year classes with divisions |
| **Subjects** | Subjects with code, semester, credits and faculty assignment |
| **Students** | Student records linked to class and academic year |
| **Program Outcomes (POs)** | Standard engineering PO1–PO12 |
| **PSOs** | Program Specific Outcomes for Computer Engineering |
| **Course Outcomes (COs)** | COs per subject mapped to Bloom's taxonomy, POs and PSOs |

## Project Structure

```
CAGS/
├── backend/          # Node.js + Express + Mongoose API
│   ├── server.js
│   ├── .env.example
│   └── src/
│       ├── models/       # Mongoose schemas
│       ├── routes/       # RESTful route handlers
│       ├── controllers/  # Generic CRUD controller factory
│       └── middleware/   # Rate limiter
└── frontend/         # Vite + React SPA
    └── src/
        ├── api/          # Axios instance
        ├── components/   # Sidebar, Modal, Table
        └── pages/        # One page per entity + Dashboard
```

## Prerequisites

- Node.js ≥ 18
- MongoDB running locally (default: `mongodb://localhost:27017/cags`) or a MongoDB Atlas URI

## Getting Started

### 1. Backend

```bash
cd backend
cp .env.example .env          # edit MONGO_URI if needed
npm install
npm run dev                   # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## API Endpoints

All routes are under `/api/`:

| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/api/academic-years` | List / Create academic years |
| GET/PUT/DELETE | `/api/academic-years/:id` | Read / Update / Delete |
| GET/POST | `/api/faculties` | List / Create faculties |
| GET/PUT/DELETE | `/api/faculties/:id` | Read / Update / Delete |
| GET/POST | `/api/classes` | List / Create classes |
| GET/PUT/DELETE | `/api/classes/:id` | Read / Update / Delete |
| GET/POST | `/api/subjects` | List / Create subjects |
| GET/PUT/DELETE | `/api/subjects/:id` | Read / Update / Delete |
| GET/POST | `/api/students` | List / Create students |
| GET/PUT/DELETE | `/api/students/:id` | Read / Update / Delete |
| GET/POST | `/api/program-outcomes` | List / Create POs |
| GET/PUT/DELETE | `/api/program-outcomes/:id` | Read / Update / Delete |
| GET/POST | `/api/psos` | List / Create PSOs |
| GET/PUT/DELETE | `/api/psos/:id` | Read / Update / Delete |
| GET/POST | `/api/course-outcomes` | List / Create COs |
| GET/PUT/DELETE | `/api/course-outcomes/:id` | Read / Update / Delete |
| GET | `/api/health` | Health check |
