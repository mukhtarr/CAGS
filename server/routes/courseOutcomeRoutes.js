const express = require("express");
const router = express.Router();
const {
  getCourseOutcomes,
  getCourseOutcome,
  createCourseOutcome,
  updateCourseOutcome,
  deleteCourseOutcome,
} = require("../controllers/courseOutcomeController");

router.route("/").get(getCourseOutcomes).post(createCourseOutcome);
router
  .route("/:id")
  .get(getCourseOutcome)
  .put(updateCourseOutcome)
  .delete(deleteCourseOutcome);

module.exports = router;
