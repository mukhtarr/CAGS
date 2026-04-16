import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  studentAPI,
  academicYearAPI,
  facultyAPI,
  subjectAPI,
  classAPI,
  courseOutcomeAPI,
  programOutcomeAPI,
  psoAPI,
} from "../services/api";

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    academicYears: 0,
    faculties: 0,
    subjects: 0,
    classes: 0,
    courseOutcomes: 0,
    programOutcomes: 0,
    psos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          students,
          years,
          faculties,
          subjects,
          classes,
          cos,
          pos,
          psos,
        ] = await Promise.all([
          studentAPI.getAll(),
          academicYearAPI.getAll(),
          facultyAPI.getAll(),
          subjectAPI.getAll(),
          classAPI.getAll(),
          courseOutcomeAPI.getAll(),
          programOutcomeAPI.getAll(),
          psoAPI.getAll(),
        ]);
        setCounts({
          students: students.data.length,
          academicYears: years.data.length,
          faculties: faculties.data.length,
          subjects: subjects.data.length,
          classes: classes.data.length,
          courseOutcomes: cos.data.length,
          programOutcomes: pos.data.length,
          psos: psos.data.length,
        });
      } catch {
        // API may not be running yet
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  const cards = [
    { label: "Students", count: counts.students, link: "/students" },
    {
      label: "Academic Years",
      count: counts.academicYears,
      link: "/academic-years",
    },
    { label: "Faculties", count: counts.faculties, link: "/faculties" },
    { label: "Subjects", count: counts.subjects, link: "/subjects" },
    { label: "Classes", count: counts.classes, link: "/classes" },
    {
      label: "Course Outcomes",
      count: counts.courseOutcomes,
      link: "/course-outcomes",
    },
    {
      label: "Program Outcomes",
      count: counts.programOutcomes,
      link: "/program-outcomes",
    },
    { label: "PSOs", count: counts.psos, link: "/psos" },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-grid">
        {cards.map((card) => (
          <Link to={card.link} key={card.label} className="dashboard-card">
            <h3>{card.label}</h3>
            <div className="count">{card.count}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
