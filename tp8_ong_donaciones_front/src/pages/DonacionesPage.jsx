// src/pages/DonacionesPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function DonacionesPage() {
  const { donantes, productos, donaciones, addDonacion } = useOngStore();
  const [form, setForm] = useState({
    donante_id: "",
    producto_id: "",
    cantidad: "",
    fecha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDonacion({
      donante_id: Number(form.donante_id),
      producto_id: Number(form.producto_id),
      cantidad: Number(form.cantidad),
      fecha: form.fecha,
    });
    setForm({ donante_id: "", producto_id: "", cantidad: "", fecha: "" });
  };

  return (
    <div>
      <h2 className="mb-3">Donaciones</h2>

      <div className="card mb-3">
        <div className="card-header">Registrar Donación</div>
        <div className="card-body">
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <label className="form-label">Donante</label>
              <select
                className="form-select"
                value={form.donante_id}
                onChange={(e) =>
                  setForm({ ...form, donante_id: e.target.value })
                }
                required
              >
                <option value="">Seleccione...</option>
                {donantes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre}
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
        <div className="card-header">Historial de Donaciones</div>
        <div className="card-body">
          {donaciones.length === 0 ? (
            <p className="text-muted">No hay donaciones registradas.</p>
          ) : (
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Donante</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {donaciones.map((d) => (
                  <tr key={d.id}>
                    <td>{d.fecha}</td>
                    <td>{d.donante_nombre}</td>
                    <td>{d.producto_nombre}</td>
                    <td>{d.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
