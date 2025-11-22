const pool = require("../config/db");

async function listarDonaciones(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT d.id, d.cantidad, d.fecha,
             don.nombre AS donante_nombre,
             p.nombre AS producto_nombre,
             p.tipo AS producto_tipo
      FROM donaciones d
      JOIN donantes don ON don.id = d.donante_id
      JOIN productos p ON p.id = d.producto_id
      ORDER BY d.fecha DESC;
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function crearDonacion(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const { donante_id, producto_id, cantidad, fecha } = req.body;

    if (!donante_id || !producto_id || !cantidad || !fecha) {
      return res.status(400).json({
        error: "donante_id, producto_id, cantidad y fecha son obligatorios",
      });
    }

    await connection.beginTransaction();

    const [donanteRows] = await connection.query(
      "SELECT id FROM donantes WHERE id = ?",
      [donante_id]
    );
    if (donanteRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: "Donante no existe" });
    }

    const [productoRows] = await connection.query(
      "SELECT stock FROM productos WHERE id = ?",
      [producto_id]
    );
    if (productoRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: "Producto no existe" });
    }

    const [resultDonacion] = await connection.query(
      `
        INSERT INTO donaciones (donante_id, producto_id, cantidad, fecha)
        VALUES (?, ?, ?, ?)
      `,
      [donante_id, producto_id, cantidad, fecha]
    );

    await connection.query(
      "UPDATE productos SET stock = stock + ? WHERE id = ?",
      [cantidad, producto_id]
    );

    await connection.commit();

    res.status(201).json({
      mensaje: "Donación registrada correctamente",
      donacion_id: resultDonacion.insertId,
    });
  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
}

module.exports = { listarDonaciones, crearDonacion };
