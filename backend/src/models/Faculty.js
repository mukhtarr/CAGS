const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  designation: { type: String, trim: true },
  department: { type: String, default: 'Computer Engineering', trim: true },
  phone: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
