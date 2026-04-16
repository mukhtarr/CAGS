import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { academicYearAPI } from "../services/api";

function AcademicYearForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    year: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await academicYearAPI.getById(id);
          setForm({
            year: res.data.year || "",
            startDate: res.data.startDate
              ? res.data.startDate.substring(0, 10)
              : "",
            endDate: res.data.endDate
              ? res.data.endDate.substring(0, 10)
              : "",
            isCurrent: res.data.isCurrent || false,
          });
        } catch {
          setError("Failed to load data");
        }
      };
      fetchData();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await academicYearAPI.update(id, form);
      } else {
        await academicYearAPI.create(form);
      }
      navigate("/academic-years");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Academic Year" : "Add Academic Year"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Year (e.g. 2024-2025) *</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              placeholder="2024-2025"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                name="isCurrent"
                type="checkbox"
                checked={form.isCurrent}
                onChange={handleChange}
              />{" "}
              Current Academic Year
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/academic-years")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademicYearForm;
