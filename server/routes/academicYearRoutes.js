const express = require("express");
const router = express.Router();
const {
  getAcademicYears,
  getAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../controllers/academicYearController");

router.route("/").get(getAcademicYears).post(createAcademicYear);
router
  .route("/:id")
  .get(getAcademicYear)
  .put(updateAcademicYear)
  .delete(deleteAcademicYear);

module.exports = router;
