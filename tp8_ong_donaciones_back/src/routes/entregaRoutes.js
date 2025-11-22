const express = require("express");
const {
  listarEntregas,
  crearEntrega,
} = require("../controllers/entregaController");

const router = express.Router();

router.get("/", listarEntregas);
router.post("/", crearEntrega);

module.exports = router;
