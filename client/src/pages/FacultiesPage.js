import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { facultyAPI } from "../services/api";

function FacultiesPage() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await facultyAPI.getAll();
        setFaculties(res.data);
      } catch {
        setError("Failed to fetch faculties");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty?")) return;
    try {
      await facultyAPI.delete(id);
      setFaculties(faculties.filter((f) => f._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Faculties</h1>
        <Link to="/faculties/new" className="btn btn-primary">
          Add Faculty
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No faculties found
              </td>
            </tr>
          ) : (
            faculties.map((f) => (
              <tr key={f._id}>
                <td>{f.facultyId}</td>
                <td>
                  {f.firstName} {f.lastName}
                </td>
                <td>{f.email}</td>
                <td>{f.designation}</td>
                <td className="actions-cell">
                  <Link
                    to={`/faculties/edit/${f._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(f._id)}
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

export default FacultiesPage;
