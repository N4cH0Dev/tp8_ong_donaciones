const express = require("express");
const {
  listarComedores,
  crearComedor,
} = require("../controllers/comedorController");

const router = express.Router();

router.get("/", listarComedores);
router.post("/", crearComedor);

module.exports = router;
