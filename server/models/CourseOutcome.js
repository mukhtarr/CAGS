const mongoose = require("mongoose");

const courseOutcomeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    bloomLevel: {
      type: String,
      enum: [
        "Remember",
        "Understand",
        "Apply",
        "Analyze",
        "Evaluate",
        "Create",
      ],
    },
    mappedPOs: [
      {
        po: { type: mongoose.Schema.Types.ObjectId, ref: "ProgramOutcome" },
        level: { type: Number, min: 1, max: 3 },
      },
    ],
    mappedPSOs: [
      {
        pso: { type: mongoose.Schema.Types.ObjectId, ref: "PSO" },
        level: { type: Number, min: 1, max: 3 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseOutcome", courseOutcomeSchema);
