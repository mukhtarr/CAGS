const ProgramOutcome = require("../models/ProgramOutcome");

const getProgramOutcomes = async (req, res) => {
  try {
    const outcomes = await ProgramOutcome.find().sort({ code: 1 });
    res.json(outcomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramOutcome = async (req, res) => {
  try {
    const outcome = await ProgramOutcome.findById(req.params.id);
    if (!outcome) {
      return res.status(404).json({ message: "Program Outcome not found" });
    }
    res.json(outcome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProgramOutcome = async (req, res) => {
  try {
    const { code, description, department } = req.body;
    const outcome = new ProgramOutcome({ code, description, department });
    const saved = await outcome.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProgramOutcome = async (req, res) => {
  try {
    const { code, description, department } = req.body;
    const updates = {};
    if (code !== undefined) updates.code = code;
    if (description !== undefined) updates.description = description;
    if (department !== undefined) updates.department = department;

    const outcome = await ProgramOutcome.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!outcome) {
      return res.status(404).json({ message: "Program Outcome not found" });
    }
    res.json(outcome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProgramOutcome = async (req, res) => {
  try {
    const outcome = await ProgramOutcome.findByIdAndDelete(req.params.id);
    if (!outcome) {
      return res.status(404).json({ message: "Program Outcome not found" });
    }
    res.json({ message: "Program Outcome deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgramOutcomes,
  getProgramOutcome,
  createProgramOutcome,
  updateProgramOutcome,
  deleteProgramOutcome,
};
