const PSO = require("../models/PSO");

const getPSOs = async (req, res) => {
  try {
    const psos = await PSO.find().sort({ code: 1 });
    res.json(psos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPSO = async (req, res) => {
  try {
    const pso = await PSO.findById(req.params.id);
    if (!pso) {
      return res.status(404).json({ message: "PSO not found" });
    }
    res.json(pso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPSO = async (req, res) => {
  try {
    const pso = new PSO(req.body);
    const saved = await pso.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePSO = async (req, res) => {
  try {
    const pso = await PSO.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pso) {
      return res.status(404).json({ message: "PSO not found" });
    }
    res.json(pso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePSO = async (req, res) => {
  try {
    const pso = await PSO.findByIdAndDelete(req.params.id);
    if (!pso) {
      return res.status(404).json({ message: "PSO not found" });
    }
    res.json({ message: "PSO deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPSOs, getPSO, createPSO, updatePSO, deletePSO };
