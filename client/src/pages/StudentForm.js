import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentAPI, classAPI, academicYearAPI } from "../services/api";

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    enrollmentNo: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    class: "",
    academicYear: "",
    semester: "",
  });
  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clsRes, yearRes] = await Promise.all([
          classAPI.getAll(),
          academicYearAPI.getAll(),
        ]);
        setClasses(clsRes.data);
        setYears(yearRes.data);

        if (isEdit) {
          const res = await studentAPI.getById(id);
          setForm({
            enrollmentNo: res.data.enrollmentNo || "",
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            class: res.data.class?._id || "",
            academicYear: res.data.academicYear?._id || "",
            semester: res.data.semester || "",
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
      if (!data.class) delete data.class;
      if (!data.academicYear) delete data.academicYear;
      if (data.semester) data.semester = Number(data.semester);

      if (isEdit) {
        await studentAPI.update(id, data);
      } else {
        await studentAPI.create(data);
      }
      navigate("/students");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save student");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enrollment No *</label>
            <input
              name="enrollmentNo"
              value={form.enrollmentNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Class</label>
            <select name="class" value={form.class} onChange={handleChange}>
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} {c.division ? `- ${c.division}` : ""}
                </option>
              ))}
            </select>
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
            <label>Semester</label>
            <input
              name="semester"
              type="number"
              min="1"
              max="8"
              value={form.semester}
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
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
