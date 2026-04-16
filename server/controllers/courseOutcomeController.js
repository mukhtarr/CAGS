const CourseOutcome = require("../models/CourseOutcome");

const getCourseOutcomes = async (req, res) => {
  try {
    const outcomes = await CourseOutcome.find()
      .populate("subject")
      .populate("mappedPOs.po")
      .populate("mappedPSOs.pso");
    res.json(outcomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseOutcome = async (req, res) => {
  try {
    const outcome = await CourseOutcome.findById(req.params.id)
      .populate("subject")
      .populate("mappedPOs.po")
      .populate("mappedPSOs.pso");
    if (!outcome) {
      return res.status(404).json({ message: "Course Outcome not found" });
    }
    res.json(outcome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourseOutcome = async (req, res) => {
  try {
    const outcome = new CourseOutcome(req.body);
    const saved = await outcome.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCourseOutcome = async (req, res) => {
  try {
    const outcome = await CourseOutcome.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!outcome) {
      return res.status(404).json({ message: "Course Outcome not found" });
    }
    res.json(outcome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourseOutcome = async (req, res) => {
  try {
    const outcome = await CourseOutcome.findByIdAndDelete(req.params.id);
    if (!outcome) {
      return res.status(404).json({ message: "Course Outcome not found" });
    }
    res.json({ message: "Course Outcome deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourseOutcomes,
  getCourseOutcome,
  createCourseOutcome,
  updateCourseOutcome,
  deleteCourseOutcome,
};
