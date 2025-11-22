const Comedor = require("../models/comedorModel");

async function listarComedores(req, res, next) {
  try {
    const comedores = await Comedor.getAllComedores();
    res.json(comedores);
  } catch (err) {
    next(err);
  }
}

async function crearComedor(req, res, next) {
  try {
    const { nombre, direccion } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    const nuevo = await Comedor.createComedor({ nombre, direccion });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

module.exports = { listarComedores, crearComedor };
