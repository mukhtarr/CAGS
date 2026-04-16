import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facultyAPI } from "../services/api";

function FacultyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    facultyId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    department: "Computer Engineering",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await facultyAPI.getById(id);
          setForm({
            facultyId: res.data.facultyId || "",
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            designation: res.data.designation || "",
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
        await facultyAPI.update(id, form);
      } else {
        await facultyAPI.create(form);
      }
      navigate("/faculties");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>{isEdit ? "Edit Faculty" : "Add Faculty"}</h1>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Faculty ID *</label>
            <input
              name="facultyId"
              value={form.facultyId}
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
            <label>Designation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Assistant Professor"
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
              onClick={() => navigate("/faculties")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FacultyForm;
