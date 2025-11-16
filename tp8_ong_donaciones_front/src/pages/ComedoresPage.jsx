// src/pages/ComedoresPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function ComedoresPage() {
  const { comedores, addComedor } = useOngStore();
  const [form, setForm] = useState({ nombre: "", direccion: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    await addComedor(form);
    setForm({ nombre: "", direccion: "" });
  };

  return (
    <div>
      <h2 className="mb-3">Comedores / Beneficiarios</h2>

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-3">
            <div className="card-header">Nuevo Comedor</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    className="form-control"
                    value={form.direccion}
                    onChange={(e) =>
                      setForm({ ...form, direccion: e.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card">
            <div className="card-header">Listado de Comedores</div>
            <div className="card-body">
              {comedores.length === 0 ? (
                <p className="text-muted">No hay comedores registrados.</p>
              ) : (
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comedores.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.direccion || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
