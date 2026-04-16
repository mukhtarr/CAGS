const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Theory", "Practical", "Elective"],
      default: "Theory",
    },
    department: {
      type: String,
      default: "Computer Engineering",
      trim: true,
    },
    courseOutcomes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseOutcome",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
