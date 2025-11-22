const pool = require("../config/db");

async function listarEntregas(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT e.id, e.fecha,
             c.nombre AS comedor_nombre,
             c.direccion
      FROM entregas e
      JOIN comedores c ON c.id = e.comedor_id
      ORDER BY e.fecha DESC;
    `);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function crearEntrega(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const { comedor_id, fecha, items } = req.body;

    if (!comedor_id || !fecha || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "comedor_id, fecha e items son obligatorios",
      });
    }

    await connection.beginTransaction();

    const [comedorRows] = await connection.query(
      "SELECT id FROM comedores WHERE id = ?",
      [comedor_id]
    );
    if (comedorRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: "Comedor no existe" });
    }

    for (const { producto_id, cantidad } of items) {
      const [prodRows] = await connection.query(
        "SELECT stock FROM productos WHERE id = ?",
        [producto_id]
      );
      if (prodRows.length === 0) {
        await connection.rollback();
        return res
          .status(400)
          .json({ error: `Producto ${producto_id} no existe` });
      }
      if (prodRows[0].stock < cantidad) {
        await connection.rollback();
        return res.status(400).json({
          error: `Stock insuficiente para producto ${producto_id}`,
        });
      }
    }

    const [resultEntrega] = await connection.query(
      "INSERT INTO entregas (comedor_id, fecha) VALUES (?, ?)",
      [comedor_id, fecha]
    );
    const entregaId = resultEntrega.insertId;

    for (const { producto_id, cantidad } of items) {
      await connection.query(
        `
          INSERT INTO entrega_detalle (entrega_id, producto_id, cantidad)
          VALUES (?, ?, ?)
        `,
        [entregaId, producto_id, cantidad]
      );

      await connection.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [cantidad, producto_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      mensaje: "Entrega registrada correctamente",
      entrega_id: entregaId,
    });
  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
}

module.exports = { listarEntregas, crearEntrega };
