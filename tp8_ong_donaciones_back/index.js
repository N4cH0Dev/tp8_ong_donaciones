// index.js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json()); // para leer JSON en req.body

// ---------------- DONANTES ----------------

// Crear donante
app.post("/donantes", async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const [result] = await pool.query(
      "INSERT INTO donantes (nombre, email, telefono) VALUES (?, ?, ?)",
      [nombre, email, telefono]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono,
    });
  } catch (error) {
    console.error("Error al crear donante:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar donantes
app.get("/donantes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM donantes");
    res.json(rows);
  } catch (error) {
    console.error("Error al listar donantes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------- COMEDORES ----------------

// Crear comedor
app.post("/comedores", async (req, res) => {
  try {
    const { nombre, direccion } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const [result] = await pool.query(
      "INSERT INTO comedores (nombre, direccion) VALUES (?, ?)",
      [nombre, direccion]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      direccion,
    });
  } catch (error) {
    console.error("Error al crear comedor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar comedores
app.get("/comedores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM comedores");
    res.json(rows);
  } catch (error) {
    console.error("Error al listar comedores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------- PRODUCTOS ----------------

// Crear producto
app.post("/productos", async (req, res) => {
  try {
    const { nombre, tipo, stock } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const stockInicial = stock || 0;

    const [result] = await pool.query(
      "INSERT INTO productos (nombre, tipo, stock) VALUES (?, ?, ?)",
      [nombre, tipo, stockInicial]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      tipo,
      stock: stockInicial,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar productos
app.get("/productos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------- DONACIONES (ENTRADA DE STOCK) ----------------
/*
Body esperado:
{
  "donante_id": 1,
  "producto_id": 2,
  "cantidad": 10,
  "fecha": "2025-11-16"
}
*/
app.post("/donaciones", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { donante_id, producto_id, cantidad, fecha } = req.body;

    if (!donante_id || !producto_id || !cantidad || !fecha) {
      return res.status(400).json({
        error: "donante_id, producto_id, cantidad y fecha son obligatorios",
      });
    }

    await connection.beginTransaction();

    // Verificar donante y producto
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

    // Registrar donación
    const [resultDonacion] = await connection.query(
      `
        INSERT INTO donaciones (donante_id, producto_id, cantidad, fecha)
        VALUES (?, ?, ?, ?)
      `,
      [donante_id, producto_id, cantidad, fecha]
    );

    // Aumentar stock
    await connection.query(
      "UPDATE productos SET stock = stock + ? WHERE id = ?",
      [cantidad, producto_id]
    );

    await connection.commit();

    res.status(201).json({
      mensaje: "Donación registrada correctamente",
      donacion_id: resultDonacion.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error al registrar donación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    connection.release();
  }
});

// Listar donaciones
app.get("/donaciones", async (req, res) => {
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
  } catch (error) {
    console.error("Error al listar donaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------- ENTREGAS (SALIDA A COMEDORES) ----------------
/*
Body esperado:
{
  "comedor_id": 1,
  "fecha": "2025-11-16",
  "items": [
    { "producto_id": 1, "cantidad": 5 },
    { "producto_id": 2, "cantidad": 3 }
  ]
}
*/
app.post("/entregas", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { comedor_id, fecha, items } = req.body;

    if (!comedor_id || !fecha || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "comedor_id, fecha e items son obligatorios",
      });
    }

    await connection.beginTransaction();

    // Verificar comedor
    const [comedorRows] = await connection.query(
      "SELECT id FROM comedores WHERE id = ?",
      [comedor_id]
    );
    if (comedorRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: "Comedor no existe" });
    }

    // Verificar stock de cada producto
    for (const item of items) {
      const { producto_id, cantidad } = item;

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
        return res
          .status(400)
          .json({ error: `Stock insuficiente para producto ${producto_id}` });
      }
    }

    // Crear entrega
    const [resultEntrega] = await connection.query(
      "INSERT INTO entregas (comedor_id, fecha) VALUES (?, ?)",
      [comedor_id, fecha]
    );
    const entregaId = resultEntrega.insertId;

    // Registrar detalle y bajar stock
    for (const item of items) {
      const { producto_id, cantidad } = item;

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
  } catch (error) {
    await connection.rollback();
    console.error("Error al registrar entrega:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    connection.release();
  }
});

// Listar entregas
app.get("/entregas", async (req, res) => {
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
  } catch (error) {
    console.error("Error al listar entregas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Historial por donante
app.get("/historial/donante/:id", async (req, res) => {
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
  } catch (error) {
    console.error("Error al obtener historial por donante:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Historial por comedor
app.get("/historial/comedor/:id", async (req, res) => {
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
  } catch (error) {
    console.error("Error al obtener historial por comedor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------- SERVIDOR ----------------
const PORT = 3002; // TP8 en puerto 3002 para no chocar con los otros
app.listen(PORT, () => {
  console.log(`Servidor ONG escuchando en http://localhost:${PORT}`);
});
