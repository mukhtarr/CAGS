import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subjectAPI } from "../services/api";

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await subjectAPI.getAll();
        setSubjects(res.data);
      } catch {
        setError("Failed to fetch subjects");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      await subjectAPI.delete(id);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Subjects</h1>
        <Link to="/subjects/new" className="btn btn-primary">
          Add Subject
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Credits</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No subjects found
              </td>
            </tr>
          ) : (
            subjects.map((s) => (
              <tr key={s._id}>
                <td>{s.subjectCode}</td>
                <td>{s.name}</td>
                <td>{s.semester}</td>
                <td>{s.credits}</td>
                <td>{s.type}</td>
                <td className="actions-cell">
                  <Link
                    to={`/subjects/edit/${s._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectsPage;
