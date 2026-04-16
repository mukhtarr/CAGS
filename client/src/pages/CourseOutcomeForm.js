import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseOutcomeAPI, subjectAPI } from "../services/api";

function CourseOutcomeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    code: "",
    description: "",
    subject: "",
    bloomLevel: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await subjectAPI.getAll();
        setSubjects(subRes.data);

        if (isEdit) {
          const res = await courseOutcomeAPI.getById(id);
          setForm({
            code: res.data.code || "",
            description: res.data.description || "",
            subject: res.data.subject?._id || "",
            bloomLevel: res.data.bloomLevel || "",
          });
        }
      } catch {
        setError("Failed to load data");
      }
    };
    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form };
      if (!data.bloomLevel) delete data.bloomLevel;

      if (isEdit) {
        await courseOutcomeAPI.update(id, data);
      } else {
        await courseOutcomeAPI.create(data);
      }
      navigate("/course-outcomes");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Course Outcome" : "Add Course Outcome"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Code *</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              placeholder="e.g. CO1"
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
            <label>Subject *</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.subjectCode} - {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Bloom&apos;s Taxonomy Level</label>
            <select
              name="bloomLevel"
              value={form.bloomLevel}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="Remember">Remember</option>
              <option value="Understand">Understand</option>
              <option value="Apply">Apply</option>
              <option value="Analyze">Analyze</option>
              <option value="Evaluate">Evaluate</option>
              <option value="Create">Create</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/course-outcomes")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseOutcomeForm;
