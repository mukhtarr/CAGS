import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { classAPI } from "../services/api";

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await classAPI.getAll();
        setClasses(res.data);
      } catch {
        setError("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this class?")) return;
    try {
      await classAPI.delete(id);
      setClasses(classes.filter((c) => c._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Classes</h1>
        <Link to="/classes/new" className="btn btn-primary">
          Add Class
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Division</th>
            <th>Semester</th>
            <th>Academic Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No classes found
              </td>
            </tr>
          ) : (
            classes.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.division || "-"}</td>
                <td>{c.semester}</td>
                <td>{c.academicYear?.year || "-"}</td>
                <td className="actions-cell">
                  <Link
                    to={`/classes/edit/${c._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
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

export default ClassesPage;
