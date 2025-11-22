const express = require("express");
const {
  listarDonaciones,
  crearDonacion,
} = require("../controllers/donacionController");

const router = express.Router();

router.get("/", listarDonaciones);
router.post("/", crearDonacion);

module.exports = router;
