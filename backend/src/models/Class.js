const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  division: { type: String, trim: true },
  year: { type: String, enum: ['FY', 'SY', 'TY', 'Final Year'], required: true },
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
