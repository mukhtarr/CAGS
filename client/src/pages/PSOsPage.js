import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { psoAPI } from "../services/api";

function PSOsPage() {
  const [psos, setPSOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await psoAPI.getAll();
        setPSOs(res.data);
      } catch {
        setError("Failed to fetch PSOs");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PSO?")) return;
    try {
      await psoAPI.delete(id);
      setPSOs(psos.filter((p) => p._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Program Specific Outcomes (PSOs)</h1>
        <Link to="/psos/new" className="btn btn-primary">
          Add PSO
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
          {psos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No PSOs found
              </td>
            </tr>
          ) : (
            psos.map((p) => (
              <tr key={p._id}>
                <td>{p.code}</td>
                <td>{p.description}</td>
                <td>{p.department}</td>
                <td className="actions-cell">
                  <Link
                    to={`/psos/edit/${p._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
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

export default PSOsPage;
