const pool = require("../config/db");

async function getAllDonantes() {
  const [rows] = await pool.query("SELECT * FROM donantes");
  return rows;
}

async function createDonante({ nombre, email, telefono }) {
  const [result] = await pool.query(
    "INSERT INTO donantes (nombre, email, telefono) VALUES (?, ?, ?)",
    [nombre, email, telefono]
  );
  return { id: result.insertId, nombre, email, telefono };
}

module.exports = { getAllDonantes, createDonante };
