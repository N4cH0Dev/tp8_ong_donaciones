const pool = require("../config/db");

async function getAllComedores() {
  const [rows] = await pool.query("SELECT * FROM comedores");
  return rows;
}

async function createComedor({ nombre, direccion }) {
  const [result] = await pool.query(
    "INSERT INTO comedores (nombre, direccion) VALUES (?, ?)",
    [nombre, direccion]
  );
  return { id: result.insertId, nombre, direccion };
}

module.exports = { getAllComedores, createComedor };
