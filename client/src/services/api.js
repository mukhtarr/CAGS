import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Students
export const studentAPI = {
  getAll: () => api.get("/students"),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post("/students", data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// Academic Years
export const academicYearAPI = {
  getAll: () => api.get("/academic-years"),
  getById: (id) => api.get(`/academic-years/${id}`),
  create: (data) => api.post("/academic-years", data),
  update: (id, data) => api.put(`/academic-years/${id}`, data),
  delete: (id) => api.delete(`/academic-years/${id}`),
};

// Faculties
export const facultyAPI = {
  getAll: () => api.get("/faculties"),
  getById: (id) => api.get(`/faculties/${id}`),
  create: (data) => api.post("/faculties", data),
  update: (id, data) => api.put(`/faculties/${id}`, data),
  delete: (id) => api.delete(`/faculties/${id}`),
};

// Subjects
export const subjectAPI = {
  getAll: () => api.get("/subjects"),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post("/subjects", data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// Classes
export const classAPI = {
  getAll: () => api.get("/classes"),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post("/classes", data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

// Course Outcomes
export const courseOutcomeAPI = {
  getAll: () => api.get("/course-outcomes"),
  getById: (id) => api.get(`/course-outcomes/${id}`),
  create: (data) => api.post("/course-outcomes", data),
  update: (id, data) => api.put(`/course-outcomes/${id}`, data),
  delete: (id) => api.delete(`/course-outcomes/${id}`),
};

// Program Outcomes
export const programOutcomeAPI = {
  getAll: () => api.get("/program-outcomes"),
  getById: (id) => api.get(`/program-outcomes/${id}`),
  create: (data) => api.post("/program-outcomes", data),
  update: (id, data) => api.put(`/program-outcomes/${id}`, data),
  delete: (id) => api.delete(`/program-outcomes/${id}`),
};

// PSOs
export const psoAPI = {
  getAll: () => api.get("/psos"),
  getById: (id) => api.get(`/psos/${id}`),
  create: (data) => api.post("/psos", data),
  update: (id, data) => api.put(`/psos/${id}`, data),
  delete: (id) => api.delete(`/psos/${id}`),
};

export default api;
