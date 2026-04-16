const AcademicYear = require("../models/AcademicYear");

const getAcademicYears = async (req, res) => {
  try {
    const years = await AcademicYear.find().sort({ year: -1 });
    res.json(years);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAcademicYear = async (req, res) => {
  try {
    const year = await AcademicYear.findById(req.params.id);
    if (!year) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json(year);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAcademicYear = async (req, res) => {
  try {
    const { year, startDate, endDate, isCurrent } = req.body;
    const academicYear = new AcademicYear({ year, startDate, endDate, isCurrent });
    const saved = await academicYear.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAcademicYear = async (req, res) => {
  try {
    const { year, startDate, endDate, isCurrent } = req.body;
    const updates = {};
    if (year !== undefined) updates.year = year;
    if (startDate !== undefined) updates.startDate = startDate;
    if (endDate !== undefined) updates.endDate = endDate;
    if (isCurrent !== undefined) updates.isCurrent = isCurrent;

    const academicYear = await AcademicYear.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!academicYear) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json(academicYear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAcademicYear = async (req, res) => {
  try {
    const year = await AcademicYear.findByIdAndDelete(req.params.id);
    if (!year) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json({ message: "Academic Year deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAcademicYears,
  getAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
