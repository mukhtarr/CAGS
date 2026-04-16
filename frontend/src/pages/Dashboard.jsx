import { useEffect, useState } from 'react';
import {
  FaCalendarAlt, FaChalkboardTeacher, FaLayerGroup, FaBook,
  FaUserGraduate, FaBullseye, FaStar, FaClipboardList
} from 'react-icons/fa';
import api from '../api/axios';

const stats = [
  { label: 'Students', endpoint: '/students', icon: <FaUserGraduate />, color: 'blue' },
  { label: 'Faculties', endpoint: '/faculties', icon: <FaChalkboardTeacher />, color: 'green' },
  { label: 'Subjects', endpoint: '/subjects', icon: <FaBook />, color: 'purple' },
  { label: 'Classes', endpoint: '/classes', icon: <FaLayerGroup />, color: 'orange' },
  { label: 'Academic Years', endpoint: '/academic-years', icon: <FaCalendarAlt />, color: 'teal' },
  { label: 'Program Outcomes', endpoint: '/program-outcomes', icon: <FaBullseye />, color: 'red' },
  { label: 'PSOs', endpoint: '/psos', icon: <FaStar />, color: 'indigo' },
  { label: 'Course Outcomes', endpoint: '/course-outcomes', icon: <FaClipboardList />, color: 'pink' },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.allSettled(
        stats.map((s) => api.get(s.endpoint))
      );
      const newCounts = {};
      results.forEach((res, idx) => {
        if (res.status === 'fulfilled') {
          newCounts[stats[idx].label] = res.value.data?.data?.length ?? 0;
        } else {
          newCounts[stats[idx].label] = '—';
        }
      });
      setCounts(newCounts);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of the Academic File Automation System</p>
        </div>
      </div>
      <div className="page-body">
        <div className="welcome-card">
          <h2>Welcome to CAGS - Academic File Automation System</h2>
          <p>
            Manage academic years, faculties, classes, subjects, students, and outcomes all in one place.
            Streamline academic documentation for the Computer Engineering Department.
          </p>
          <div className="dept">COMPUTER ENGINEERING DEPARTMENT</div>
        </div>

        {loading ? (
          <div className="loading">Loading statistics...</div>
        ) : (
          <div className="stat-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                <div className="stat-info">
                  <h3>{counts[s.label] ?? 0}</h3>
                  <p>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
