const pool = require("../config/db");

async function historialPorDonante(req, res, next) {
  try {
    const donanteId = req.params.id;
    const [rows] = await pool.query(
      `
      SELECT d.id, d.fecha, d.cantidad,
             p.nombre AS producto_nombre,
             p.tipo AS producto_tipo
      FROM donaciones d
      JOIN productos p ON p.id = d.producto_id
      WHERE d.donante_id = ?
      ORDER BY d.fecha DESC;
      `,
      [donanteId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function historialPorComedor(req, res, next) {
  try {
    const comedorId = req.params.id;
    const [rows] = await pool.query(
      `
      SELECT e.id AS entrega_id, e.fecha,
             p.nombre AS producto_nombre,
             p.tipo AS producto_tipo,
             ed.cantidad
      FROM entregas e
      JOIN entrega_detalle ed ON ed.entrega_id = e.id
      JOIN productos p ON p.id = ed.producto_id
      WHERE e.comedor_id = ?
      ORDER BY e.fecha DESC;
      `,
      [comedorId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { historialPorDonante, historialPorComedor };
