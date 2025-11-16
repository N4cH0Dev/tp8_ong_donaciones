// src/pages/EntregasPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function EntregasPage() {
  const { comedores, productos, entregas, addEntrega } = useOngStore();
  const [form, setForm] = useState({
    comedor_id: "",
    producto_id: "",
    cantidad: "",
    fecha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEntrega({
      comedor_id: Number(form.comedor_id),
      fecha: form.fecha,
      items: [
        {
          producto_id: Number(form.producto_id),
          cantidad: Number(form.cantidad),
        },
      ],
    });
    setForm({ comedor_id: "", producto_id: "", cantidad: "", fecha: "" });
  };

  return (
    <div>
      <h2 className="mb-3">Entregas a Comedores</h2>

      <div className="card mb-3">
        <div className="card-header">Registrar Entrega</div>
        <div className="card-body">
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <label className="form-label">Comedor</label>
              <select
                className="form-select"
                value={form.comedor_id}
                onChange={(e) =>
                  setForm({ ...form, comedor_id: e.target.value })
                }
                required
              >
                <option value="">Seleccione...</option>
                {comedores.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                value={form.producto_id}
                onChange={(e) =>
                  setForm({ ...form, producto_id: e.target.value })
                }
                required
              >
                <option value="">Seleccione...</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                className="form-control"
                value={form.cantidad}
                onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                required
                min="1"
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                required
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-success w-100" type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Últimas Entregas</div>
        <div className="card-body">
          {entregas.length === 0 ? (
            <p className="text-muted">No hay entregas registradas.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {entregas.map((e) => (
                <li key={e.id} className="list-group-item">
                  {e.fecha} - {e.comedor_nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
