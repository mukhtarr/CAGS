const mongoose = require('mongoose');

const programOutcomeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  department: { type: String, default: 'Computer Engineering', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('ProgramOutcome', programOutcomeSchema);
