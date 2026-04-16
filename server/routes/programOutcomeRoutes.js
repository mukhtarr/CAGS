const express = require("express");
const router = express.Router();
const {
  getProgramOutcomes,
  getProgramOutcome,
  createProgramOutcome,
  updateProgramOutcome,
  deleteProgramOutcome,
} = require("../controllers/programOutcomeController");

router.route("/").get(getProgramOutcomes).post(createProgramOutcome);
router
  .route("/:id")
  .get(getProgramOutcome)
  .put(updateProgramOutcome)
  .delete(deleteProgramOutcome);

module.exports = router;
