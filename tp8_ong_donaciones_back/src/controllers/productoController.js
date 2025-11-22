const Producto = require("../models/productoModel");

async function listarProductos(req, res, next) {
  try {
    const productos = await Producto.getAllProductos();
    res.json(productos);
  } catch (err) {
    next(err);
  }
}

async function crearProducto(req, res, next) {
  try {
    const { nombre, tipo, stock } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    const nuevo = await Producto.createProducto({
      nombre,
      tipo,
      stock: Number(stock ?? 0),
    });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

module.exports = { listarProductos, crearProducto };
