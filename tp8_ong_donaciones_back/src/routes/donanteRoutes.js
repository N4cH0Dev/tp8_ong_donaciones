const express = require("express");
const {
  listarDonantes,
  crearDonante,
} = require("../controllers/donanteController");

const router = express.Router();

router.get("/", listarDonantes);
router.post("/", crearDonante);

module.exports = router;
