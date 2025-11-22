const express = require("express");
const {
  listarProductos,
  crearProducto,
} = require("../controllers/productoController");

const router = express.Router();

router.get("/", listarProductos);
router.post("/", crearProducto);

module.exports = router;
