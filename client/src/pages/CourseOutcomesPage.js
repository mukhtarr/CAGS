import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseOutcomeAPI } from "../services/api";

function CourseOutcomesPage() {
  const [outcomes, setOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await courseOutcomeAPI.getAll();
        setOutcomes(res.data);
      } catch {
        setError("Failed to fetch course outcomes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course outcome?")) return;
    try {
      await courseOutcomeAPI.delete(id);
      setOutcomes(outcomes.filter((o) => o._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Course Outcomes</h1>
        <Link to="/course-outcomes/new" className="btn btn-primary">
          Add Course Outcome
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Bloom Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outcomes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No course outcomes found
              </td>
            </tr>
          ) : (
            outcomes.map((o) => (
              <tr key={o._id}>
                <td>{o.code}</td>
                <td>{o.description}</td>
                <td>{o.subject?.name || "-"}</td>
                <td>{o.bloomLevel || "-"}</td>
                <td className="actions-cell">
                  <Link
                    to={`/course-outcomes/edit/${o._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(o._id)}
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

export default CourseOutcomesPage;
