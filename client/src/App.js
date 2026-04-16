import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import StudentForm from "./pages/StudentForm";
import AcademicYearsPage from "./pages/AcademicYearsPage";
import AcademicYearForm from "./pages/AcademicYearForm";
import FacultiesPage from "./pages/FacultiesPage";
import FacultyForm from "./pages/FacultyForm";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectForm from "./pages/SubjectForm";
import ClassesPage from "./pages/ClassesPage";
import ClassForm from "./pages/ClassForm";
import CourseOutcomesPage from "./pages/CourseOutcomesPage";
import CourseOutcomeForm from "./pages/CourseOutcomeForm";
import ProgramOutcomesPage from "./pages/ProgramOutcomesPage";
import ProgramOutcomeForm from "./pages/ProgramOutcomeForm";
import PSOsPage from "./pages/PSOsPage";
import PSOForm from "./pages/PSOForm";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/academic-years" element={<AcademicYearsPage />} />
            <Route path="/academic-years/new" element={<AcademicYearForm />} />
            <Route
              path="/academic-years/edit/:id"
              element={<AcademicYearForm />}
            />
            <Route path="/faculties" element={<FacultiesPage />} />
            <Route path="/faculties/new" element={<FacultyForm />} />
            <Route path="/faculties/edit/:id" element={<FacultyForm />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/new" element={<SubjectForm />} />
            <Route path="/subjects/edit/:id" element={<SubjectForm />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/new" element={<ClassForm />} />
            <Route path="/classes/edit/:id" element={<ClassForm />} />
            <Route path="/course-outcomes" element={<CourseOutcomesPage />} />
            <Route path="/course-outcomes/new" element={<CourseOutcomeForm />} />
            <Route
              path="/course-outcomes/edit/:id"
              element={<CourseOutcomeForm />}
            />
            <Route path="/program-outcomes" element={<ProgramOutcomesPage />} />
            <Route
              path="/program-outcomes/new"
              element={<ProgramOutcomeForm />}
            />
            <Route
              path="/program-outcomes/edit/:id"
              element={<ProgramOutcomeForm />}
            />
            <Route path="/psos" element={<PSOsPage />} />
            <Route path="/psos/new" element={<PSOForm />} />
            <Route path="/psos/edit/:id" element={<PSOForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
