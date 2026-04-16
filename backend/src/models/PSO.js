const mongoose = require('mongoose');

const psoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  department: { type: String, default: 'Computer Engineering', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('PSO', psoSchema);
