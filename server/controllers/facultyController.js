const Faculty = require("../models/Faculty");

const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("subjects");
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("subjects");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { facultyId, firstName, lastName, email, phone, designation, department, subjects } = req.body;
    const faculty = new Faculty({ facultyId, firstName, lastName, email, phone, designation, department, subjects });
    const saved = await faculty.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const { facultyId, firstName, lastName, email, phone, designation, department, subjects } = req.body;
    const updates = {};
    if (facultyId !== undefined) updates.facultyId = facultyId;
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (designation !== undefined) updates.designation = designation;
    if (department !== undefined) updates.department = department;
    if (subjects !== undefined) updates.subjects = subjects;

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFaculties,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
