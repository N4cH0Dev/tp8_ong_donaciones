const Donante = require("../models/donanteModel");

async function listarDonantes(req, res, next) {
  try {
    const donantes = await Donante.getAllDonantes();
    res.json(donantes);
  } catch (err) {
    next(err);
  }
}

async function crearDonante(req, res, next) {
  try {
    const { nombre, email, telefono } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    const nuevo = await Donante.createDonante({ nombre, email, telefono });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

module.exports = { listarDonantes, crearDonante };
