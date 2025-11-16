// src/App.jsx
import { useEffect, useState } from "react";
import { api } from "./services/api";

function App() {
  const [donantes, setDonantes] = useState([]);
  const [comedores, setComedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [donaciones, setDonaciones] = useState([]);
  const [entregas, setEntregas] = useState([]);

  // Formularios
  const [nuevoDonante, setNuevoDonante] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [nuevoComedor, setNuevoComedor] = useState({
    nombre: "",
    direccion: "",
  });
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    tipo: "",
    stock: 0,
  });

  const [donacionForm, setDonacionForm] = useState({
    donante_id: "",
    producto_id: "",
    cantidad: "",
    fecha: "",
  });

  const [entregaForm, setEntregaForm] = useState({
    comedor_id: "",
    fecha: "",
    producto_id: "",
    cantidad: "",
  });

  const [historialDonanteId, setHistorialDonanteId] = useState("");
  const [historialComedorId, setHistorialComedorId] = useState("");
  const [historialDonante, setHistorialDonante] = useState([]);
  const [historialComedor, setHistorialComedor] = useState([]);

  // Cargar datos al inicio
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const [
        resDonantes,
        resComedores,
        resProductos,
        resDonaciones,
        resEntregas,
      ] = await Promise.all([
        api.getDonantes(),
        api.getComedores(),
        api.getProductos(),
        api.getDonaciones(),
        api.getEntregas(),
      ]);

      setDonantes(resDonantes.data);
      setComedores(resComedores.data);
      setProductos(resProductos.data);
      setDonaciones(resDonaciones.data);
      setEntregas(resEntregas.data);
    } catch (err) {
      console.error("Error cargando datos iniciales:", err);
    }
  };

  // Crear donante
  const handleCrearDonante = async (e) => {
    e.preventDefault();
    try {
      await api.createDonante(nuevoDonante);
      setNuevoDonante({ nombre: "", email: "", telefono: "" });
      cargarDatosIniciales();
    } catch (err) {
      console.error("Error creando donante:", err);
    }
  };

  // Crear comedor
  const handleCrearComedor = async (e) => {
    e.preventDefault();
    try {
      await api.createComedor(nuevoComedor);
      setNuevoComedor({ nombre: "", direccion: "" });
      cargarDatosIniciales();
    } catch (err) {
      console.error("Error creando comedor:", err);
    }
  };

  // Crear producto
  const handleCrearProducto = async (e) => {
    e.preventDefault();
    try {
      await api.createProducto({
        ...nuevoProducto,
        stock: Number(nuevoProducto.stock || 0),
      });
      setNuevoProducto({ nombre: "", tipo: "", stock: 0 });
      cargarDatosIniciales();
    } catch (err) {
      console.error("Error creando producto:", err);
    }
  };

  // Registrar donación
  const handleCrearDonacion = async (e) => {
    e.preventDefault();
    try {
      await api.createDonacion({
        ...donacionForm,
        cantidad: Number(donacionForm.cantidad),
      });
      setDonacionForm({
        donante_id: "",
        producto_id: "",
        cantidad: "",
        fecha: "",
      });
      cargarDatosIniciales();
    } catch (err) {
      console.error("Error creando donación:", err);
    }
  };

  // Registrar entrega (1 producto por vez para simplificar el TP)
  const handleCrearEntrega = async (e) => {
    e.preventDefault();
    try {
      await api.createEntrega({
        comedor_id: Number(entregaForm.comedor_id),
        fecha: entregaForm.fecha,
        items: [
          {
            producto_id: Number(entregaForm.producto_id),
            cantidad: Number(entregaForm.cantidad),
          },
        ],
      });

      setEntregaForm({
        comedor_id: "",
        fecha: "",
        producto_id: "",
        cantidad: "",
      });
      cargarDatosIniciales();
    } catch (err) {
      console.error("Error creando entrega:", err);
    }
  };

  // Historial por donante
  const handleVerHistorialDonante = async () => {
    try {
      const res = await api.getHistorialDonante(historialDonanteId);
      setHistorialDonante(res.data);
    } catch (err) {
      console.error("Error obteniendo historial donante:", err);
    }
  };

  // Historial por comedor
  const handleVerHistorialComedor = async () => {
    try {
      const res = await api.getHistorialComedor(historialComedorId);
      setHistorialComedor(res.data);
    } catch (err) {
      console.error("Error obteniendo historial comedor:", err);
    }
  };

  return (
    <div style={{ padding: "1.5rem", fontFamily: "sans-serif" }}>
      <h1>Sistema de Gestión de Donaciones para ONG</h1>

      {/* Sección Donantes */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Donantes</h2>
        <form onSubmit={handleCrearDonante} style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Nombre"
            value={nuevoDonante.nombre}
            onChange={(e) =>
              setNuevoDonante({ ...nuevoDonante, nombre: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={nuevoDonante.email}
            onChange={(e) =>
              setNuevoDonante({ ...nuevoDonante, email: e.target.value })
            }
          />
          <input
            placeholder="Teléfono"
            value={nuevoDonante.telefono}
            onChange={(e) =>
              setNuevoDonante({ ...nuevoDonante, telefono: e.target.value })
            }
          />
          <button type="submit">Agregar Donante</button>
        </form>

        <ul>
          {donantes.map((d) => (
            <li key={d.id}>
              {d.id} - {d.nombre} ({d.email || "sin mail"})
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Comedores */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Comedores / Beneficiarios</h2>
        <form onSubmit={handleCrearComedor} style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Nombre"
            value={nuevoComedor.nombre}
            onChange={(e) =>
              setNuevoComedor({ ...nuevoComedor, nombre: e.target.value })
            }
          />
          <input
            placeholder="Dirección"
            value={nuevoComedor.direccion}
            onChange={(e) =>
              setNuevoComedor({ ...nuevoComedor, direccion: e.target.value })
            }
          />
          <button type="submit">Agregar Comedor</button>
        </form>

        <ul>
          {comedores.map((c) => (
            <li key={c.id}>
              {c.id} - {c.nombre} ({c.direccion || "sin dirección"})
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Productos */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Productos</h2>
        <form onSubmit={handleCrearProducto} style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
          />
          <input
            placeholder="Tipo"
            value={nuevoProducto.tipo}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, tipo: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock inicial"
            value={nuevoProducto.stock}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
            }
          />
          <button type="submit">Agregar Producto</button>
        </form>

        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              {p.id} - {p.nombre} ({p.tipo || "sin tipo"}) | Stock: {p.stock}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Donaciones */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Registrar Donación</h2>
        <form onSubmit={handleCrearDonacion} style={{ marginBottom: "1rem" }}>
          <select
            value={donacionForm.donante_id}
            onChange={(e) =>
              setDonacionForm({ ...donacionForm, donante_id: e.target.value })
            }
          >
            <option value="">Seleccione donante</option>
            {donantes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>

          <select
            value={donacionForm.producto_id}
            onChange={(e) =>
              setDonacionForm({ ...donacionForm, producto_id: e.target.value })
            }
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={donacionForm.cantidad}
            onChange={(e) =>
              setDonacionForm({ ...donacionForm, cantidad: e.target.value })
            }
          />
          <input
            type="date"
            value={donacionForm.fecha}
            onChange={(e) =>
              setDonacionForm({ ...donacionForm, fecha: e.target.value })
            }
          />
          <button type="submit">Registrar Donación</button>
        </form>

        <h3>Últimas donaciones</h3>
        <ul>
          {donaciones.map((d) => (
            <li key={d.id}>
              {d.fecha}: {d.donante_nombre} donó {d.cantidad} de{" "}
              {d.producto_nombre}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Entregas */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Registrar Entrega a Comedor</h2>
        <form onSubmit={handleCrearEntrega} style={{ marginBottom: "1rem" }}>
          <select
            value={entregaForm.comedor_id}
            onChange={(e) =>
              setEntregaForm({ ...entregaForm, comedor_id: e.target.value })
            }
          >
            <option value="">Seleccione comedor</option>
            {comedores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <select
            value={entregaForm.producto_id}
            onChange={(e) =>
              setEntregaForm({ ...entregaForm, producto_id: e.target.value })
            }
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={entregaForm.cantidad}
            onChange={(e) =>
              setEntregaForm({ ...entregaForm, cantidad: e.target.value })
            }
          />

          <input
            type="date"
            value={entregaForm.fecha}
            onChange={(e) =>
              setEntregaForm({ ...entregaForm, fecha: e.target.value })
            }
          />

          <button type="submit">Registrar Entrega</button>
        </form>

        <h3>Últimas entregas</h3>
        <ul>
          {entregas.map((e) => (
            <li key={e.id}>
              {e.fecha}: Entrega al comedor {e.comedor_nombre}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Historial */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Historial</h2>

        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <h3>Por Donante</h3>
            <select
              value={historialDonanteId}
              onChange={(e) => setHistorialDonanteId(e.target.value)}
            >
              <option value="">Seleccione donante</option>
              {donantes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
            <button onClick={handleVerHistorialDonante}>
              Ver Historial Donante
            </button>
            <ul>
              {historialDonante.map((h) => (
                <li key={h.id}>
                  {h.fecha}: {h.cantidad} de {h.producto_nombre}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Por Comedor</h3>
            <select
              value={historialComedorId}
              onChange={(e) => setHistorialComedorId(e.target.value)}
            >
              <option value="">Seleccione comedor</option>
              {comedores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <button onClick={handleVerHistorialComedor}>
              Ver Historial Comedor
            </button>
            <ul>
              {historialComedor.map((h) => (
                <li key={`${h.entrega_id}-${h.producto_nombre}-${h.fecha}`}>
                  {h.fecha}: {h.cantidad} de {h.producto_nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
