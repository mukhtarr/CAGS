import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaCalendarAlt, FaChalkboardTeacher,
  FaLayerGroup, FaBook, FaUserGraduate, FaBullseye,
  FaStar, FaClipboardList
} from 'react-icons/fa';

const navItems = [
  { to: '/', icon: <FaTachometerAlt />, label: 'Dashboard', section: 'MAIN' },
  { to: '/academic-years', icon: <FaCalendarAlt />, label: 'Academic Years', section: 'MANAGEMENT' },
  { to: '/faculties', icon: <FaChalkboardTeacher />, label: 'Faculties', section: null },
  { to: '/classes', icon: <FaLayerGroup />, label: 'Classes', section: null },
  { to: '/subjects', icon: <FaBook />, label: 'Subjects', section: null },
  { to: '/students', icon: <FaUserGraduate />, label: 'Students', section: null },
  { to: '/program-outcomes', icon: <FaBullseye />, label: 'Program Outcomes', section: 'OUTCOMES' },
  { to: '/psos', icon: <FaStar />, label: 'PSOs', section: null },
  { to: '/course-outcomes', icon: <FaClipboardList />, label: 'Course Outcomes', section: null },
];

export default function Sidebar() {
  let lastSection = null;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>CAGS</h1>
        <p>Academic File Automation</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, idx) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          return (
            <div key={idx}>
              {showSection && (
                <div className="sidebar-section-label">{item.section}</div>
              )}
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
