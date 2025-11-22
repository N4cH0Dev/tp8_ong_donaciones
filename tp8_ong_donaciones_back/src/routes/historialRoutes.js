const express = require("express");
const {
  historialPorDonante,
  historialPorComedor,
} = require("../controllers/historialController");

const router = express.Router();

router.get("/donante/:id", historialPorDonante);
router.get("/comedor/:id", historialPorComedor);

module.exports = router;
