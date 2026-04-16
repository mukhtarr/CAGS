const mongoose = require('mongoose');

const courseOutcomeSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  bloomsLevel: { type: String, enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'] },
  programOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgramOutcome' }],
  psos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PSO' }],
}, { timestamps: true });

module.exports = mongoose.model('CourseOutcome', courseOutcomeSchema);
