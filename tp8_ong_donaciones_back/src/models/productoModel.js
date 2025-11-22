const pool = require("../config/db");

async function getAllProductos() {
  const [rows] = await pool.query("SELECT * FROM productos");
  return rows;
}

async function createProducto({ nombre, tipo, stock }) {
  const stockInicial = stock ?? 0;

  const [result] = await pool.query(
    "INSERT INTO productos (nombre, tipo, stock) VALUES (?, ?, ?)",
    [nombre, tipo, stockInicial]
  );

  return { id: result.insertId, nombre, tipo, stock: stockInicial };
}

module.exports = { getAllProductos, createProducto };
