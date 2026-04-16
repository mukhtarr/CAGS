# CAGS - Academic File Automation

A MERN stack application for managing academic files of the Computer Engineering department. Manage students, academic years, faculties, subjects, classes, Course Outcomes (COs), Program Outcomes (POs), and Program Specific Outcomes (PSOs).

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM

## Project Structure

```
CAGS/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components (list + form for each entity)
│       └── services/       # API service layer
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   └── routes/             # API routes
└── package.json            # Root package with dev scripts
```

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** (local or Atlas cloud)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mukhtarr/CAGS.git
   cd CAGS
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment**
   ```bash
   cp server/.env.example server/.env
   ```
   Edit `server/.env` and set your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/cags
   PORT=5000
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   This starts both the backend (port 5000) and frontend (port 3000) concurrently.

   Or run them separately:
   ```bash
   npm run server   # Backend only
   npm run client   # Frontend only
   ```

## API Endpoints

| Resource          | Endpoint                | Methods                    |
|-------------------|-------------------------|----------------------------|
| Students          | `/api/students`         | GET, POST, PUT, DELETE     |
| Academic Years    | `/api/academic-years`   | GET, POST, PUT, DELETE     |
| Faculties         | `/api/faculties`        | GET, POST, PUT, DELETE     |
| Subjects          | `/api/subjects`         | GET, POST, PUT, DELETE     |
| Classes           | `/api/classes`          | GET, POST, PUT, DELETE     |
| Course Outcomes   | `/api/course-outcomes`  | GET, POST, PUT, DELETE     |
| Program Outcomes  | `/api/program-outcomes` | GET, POST, PUT, DELETE     |
| PSOs              | `/api/psos`             | GET, POST, PUT, DELETE     |

## Features

- **Dashboard** with entity count overview
- Full **CRUD** operations for all entities
- **Relational data**: Students linked to classes and academic years, COs mapped to subjects and POs/PSOs
- **Bloom's Taxonomy** levels for Course Outcomes
- **CO-PO/PSO mapping** with correlation levels (1-3)
- Responsive sidebar navigation
