const Student = require("../models/Student");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("class")
      .populate("academicYear");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("class")
      .populate("academicYear");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE student
const createStudent = async (req, res) => {
  try {
    const { enrollmentNo, firstName, lastName, email, phone, class: cls, academicYear, semester } = req.body;
    const student = new Student({ enrollmentNo, firstName, lastName, email, phone, class: cls, academicYear, semester });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE student
const updateStudent = async (req, res) => {
  try {
    const { enrollmentNo, firstName, lastName, email, phone, class: cls, academicYear, semester } = req.body;
    const updates = {};
    if (enrollmentNo !== undefined) updates.enrollmentNo = enrollmentNo;
    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (cls !== undefined) updates.class = cls;
    if (academicYear !== undefined) updates.academicYear = academicYear;
    if (semester !== undefined) updates.semester = semester;

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
