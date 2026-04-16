import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { programOutcomeAPI } from "../services/api";

function ProgramOutcomesPage() {
  const [outcomes, setOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await programOutcomeAPI.getAll();
        setOutcomes(res.data);
      } catch {
        setError("Failed to fetch program outcomes");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program outcome?")) return;
    try {
      await programOutcomeAPI.delete(id);
      setOutcomes(outcomes.filter((o) => o._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Program Outcomes</h1>
        <Link to="/program-outcomes/new" className="btn btn-primary">
          Add Program Outcome
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outcomes.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No program outcomes found
              </td>
            </tr>
          ) : (
            outcomes.map((o) => (
              <tr key={o._id}>
                <td>{o.code}</td>
                <td>{o.description}</td>
                <td>{o.department}</td>
                <td className="actions-cell">
                  <Link
                    to={`/program-outcomes/edit/${o._id}`}
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

export default ProgramOutcomesPage;
