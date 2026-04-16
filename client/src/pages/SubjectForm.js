import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { subjectAPI } from "../services/api";

function SubjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    subjectCode: "",
    name: "",
    semester: "",
    credits: "",
    type: "Theory",
    department: "Computer Engineering",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await subjectAPI.getById(id);
          setForm({
            subjectCode: res.data.subjectCode || "",
            name: res.data.name || "",
            semester: res.data.semester || "",
            credits: res.data.credits || "",
            type: res.data.type || "Theory",
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
      const data = { ...form };
      if (data.semester) data.semester = Number(data.semester);
      if (data.credits) data.credits = Number(data.credits);

      if (isEdit) {
        await subjectAPI.update(id, data);
      } else {
        await subjectAPI.create(data);
      }
      navigate("/subjects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Subject" : "Add Subject"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject Code *</label>
            <input
              name="subjectCode"
              value={form.subjectCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Semester *</label>
            <input
              name="semester"
              type="number"
              min="1"
              max="8"
              value={form.semester}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Credits</label>
            <input
              name="credits"
              type="number"
              min="1"
              value={form.credits}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Elective">Elective</option>
            </select>
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
              onClick={() => navigate("/subjects")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubjectForm;
