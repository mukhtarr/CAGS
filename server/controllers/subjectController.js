const Subject = require("../models/Subject");

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("courseOutcomes");
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate(
      "courseOutcomes"
    );
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const { subjectCode, name, semester, credits, type, department, courseOutcomes } = req.body;
    const subject = new Subject({ subjectCode, name, semester, credits, type, department, courseOutcomes });
    const saved = await subject.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { subjectCode, name, semester, credits, type, department, courseOutcomes } = req.body;
    const updates = {};
    if (subjectCode !== undefined) updates.subjectCode = subjectCode;
    if (name !== undefined) updates.name = name;
    if (semester !== undefined) updates.semester = semester;
    if (credits !== undefined) updates.credits = credits;
    if (type !== undefined) updates.type = type;
    if (department !== undefined) updates.department = department;
    if (courseOutcomes !== undefined) updates.courseOutcomes = courseOutcomes;

    const subject = await Subject.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
