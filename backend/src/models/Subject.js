const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  semester: { type: Number, min: 1, max: 8 },
  credits: { type: Number },
  type: { type: String, enum: ['Theory', 'Practical', 'Theory+Practical'], default: 'Theory' },
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
