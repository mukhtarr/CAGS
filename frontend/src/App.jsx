import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AcademicYears from './pages/AcademicYears';
import Faculties from './pages/Faculties';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import Students from './pages/Students';
import ProgramOutcomes from './pages/ProgramOutcomes';
import PSOs from './pages/PSOs';
import CourseOutcomes from './pages/CourseOutcomes';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/academic-years" element={<AcademicYears />} />
            <Route path="/faculties" element={<Faculties />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/students" element={<Students />} />
            <Route path="/program-outcomes" element={<ProgramOutcomes />} />
            <Route path="/psos" element={<PSOs />} />
            <Route path="/course-outcomes" element={<CourseOutcomes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
