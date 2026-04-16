const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const sanitizeInput = require("./middleware/sanitize");

dotenv.config();

connectDB();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(sanitizeInput);

// Routes
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/academic-years", require("./routes/academicYearRoutes"));
app.use("/api/faculties", require("./routes/facultyRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/course-outcomes", require("./routes/courseOutcomeRoutes"));
app.use("/api/program-outcomes", require("./routes/programOutcomeRoutes"));
app.use("/api/psos", require("./routes/psoRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "CAGS Academic File Automation API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
