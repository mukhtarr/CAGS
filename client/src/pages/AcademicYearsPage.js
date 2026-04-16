import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { academicYearAPI } from "../services/api";

function AcademicYearsPage() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await academicYearAPI.getAll();
        setYears(res.data);
      } catch {
        setError("Failed to fetch academic years");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this academic year?")) return;
    try {
      await academicYearAPI.delete(id);
      setYears(years.filter((y) => y._id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Academic Years</h1>
        <Link to="/academic-years/new" className="btn btn-primary">
          Add Academic Year
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Current</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No academic years found
              </td>
            </tr>
          ) : (
            years.map((y) => (
              <tr key={y._id}>
                <td>{y.year}</td>
                <td>
                  {y.startDate
                    ? new Date(y.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {y.endDate ? new Date(y.endDate).toLocaleDateString() : "-"}
                </td>
                <td>{y.isCurrent ? "Yes" : "No"}</td>
                <td className="actions-cell">
                  <Link
                    to={`/academic-years/edit/${y._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(y._id)}
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

export default AcademicYearsPage;
