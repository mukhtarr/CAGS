const Class = require("../models/Class");

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("academicYear");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id).populate("academicYear");
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const { name, division, semester, academicYear, department } = req.body;
    const cls = new Class({ name, division, semester, academicYear, department });
    const saved = await cls.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, division, semester, academicYear, department } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (division !== undefined) updates.division = division;
    if (semester !== undefined) updates.semester = semester;
    if (academicYear !== undefined) updates.academicYear = academicYear;
    if (department !== undefined) updates.department = department;

    const cls = await Class.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
};
