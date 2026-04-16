const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    division: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
    },
    department: {
      type: String,
      default: "Computer Engineering",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
