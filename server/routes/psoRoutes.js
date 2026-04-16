const express = require("express");
const router = express.Router();
const {
  getPSOs,
  getPSO,
  createPSO,
  updatePSO,
  deletePSO,
} = require("../controllers/psoController");

router.route("/").get(getPSOs).post(createPSO);
router.route("/:id").get(getPSO).put(updatePSO).delete(deletePSO);

module.exports = router;
