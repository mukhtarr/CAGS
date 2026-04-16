import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { programOutcomeAPI } from "../services/api";

function ProgramOutcomeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    code: "",
    description: "",
    department: "Computer Engineering",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await programOutcomeAPI.getById(id);
          setForm({
            code: res.data.code || "",
            description: res.data.description || "",
            department: res.data.department || "Computer Engineering",
          });
        } catch {
          setError("Failed to load data");
        }
      };
      fetchData();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await programOutcomeAPI.update(id, form);
      } else {
        await programOutcomeAPI.create(form);
      }
      navigate("/program-outcomes");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Program Outcome" : "Add Program Outcome"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Code * (e.g. PO1)</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              placeholder="PO1"
            />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/program-outcomes")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProgramOutcomeForm;
