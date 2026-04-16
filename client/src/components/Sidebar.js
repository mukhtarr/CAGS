import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CAGS</h2>
        <p>Academic File Automation</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/academic-years">Academic Years</NavLink>
        <NavLink to="/faculties">Faculties</NavLink>
        <NavLink to="/subjects">Subjects</NavLink>
        <NavLink to="/classes">Classes</NavLink>
        <NavLink to="/course-outcomes">Course Outcomes</NavLink>
        <NavLink to="/program-outcomes">Program Outcomes</NavLink>
        <NavLink to="/psos">PSOs</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
