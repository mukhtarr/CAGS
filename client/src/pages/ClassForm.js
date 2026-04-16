import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classAPI, academicYearAPI } from "../services/api";

function ClassForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    division: "",
    semester: "",
    academicYear: "",
    department: "Computer Engineering",
  });
  const [years, setYears] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearRes = await academicYearAPI.getAll();
        setYears(yearRes.data);

        if (isEdit) {
          const res = await classAPI.getById(id);
          setForm({
            name: res.data.name || "",
            division: res.data.division || "",
            semester: res.data.semester || "",
            academicYear: res.data.academicYear?._id || "",
            department: res.data.department || "Computer Engineering",
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
      if (data.semester) data.semester = Number(data.semester);
      if (!data.academicYear) delete data.academicYear;

      if (isEdit) {
        await classAPI.update(id, data);
      } else {
        await classAPI.create(data);
      }
      navigate("/classes");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Class" : "Add Class"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. CE-3"
            />
          </div>
          <div className="form-group">
            <label>Division</label>
            <input
              name="division"
              value={form.division}
              onChange={handleChange}
              placeholder="e.g. A"
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
            <label>Academic Year</label>
            <select
              name="academicYear"
              value={form.academicYear}
              onChange={handleChange}
            >
              <option value="">Select Academic Year</option>
              {years.map((y) => (
                <option key={y._id} value={y._id}>
                  {y.year}
                </option>
              ))}
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
              onClick={() => navigate("/classes")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassForm;
