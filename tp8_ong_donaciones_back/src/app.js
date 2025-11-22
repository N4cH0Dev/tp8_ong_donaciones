const express = require("express");
const cors = require("cors");

const donanteRoutes = require("./routes/donanteRoutes");
const comedorRoutes = require("./routes/comedorRoutes");
const productoRoutes = require("./routes/productoRoutes");
const donacionRoutes = require("./routes/donacionRoutes");
const entregaRoutes = require("./routes/entregaRoutes");
const historialRoutes = require("./routes/historialRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/donantes", donanteRoutes);
app.use("/comedores", comedorRoutes);
app.use("/productos", productoRoutes);
app.use("/donaciones", donacionRoutes);
app.use("/entregas", entregaRoutes);
app.use("/historial", historialRoutes);

// Middleware de error (último)
app.use(errorHandler);

module.exports = app;
