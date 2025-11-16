// src/pages/DonantesPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function DonantesPage() {
  const { donantes, addDonante } = useOngStore();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    await addDonante(form);
    setForm({ nombre: "", email: "", telefono: "" });
  };

  return (
    <div>
      <h2 className="mb-3">Donantes</h2>

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-3">
            <div className="card-header">Nuevo Donante</div>
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
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    className="form-control"
                    value={form.telefono}
                    onChange={(e) =>
                      setForm({ ...form, telefono: e.target.value })
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
            <div className="card-header">Listado de Donantes</div>
            <div className="card-body">
              {donantes.length === 0 ? (
                <p className="text-muted">No hay donantes registrados.</p>
              ) : (
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donantes.map((d) => (
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.nombre}</td>
                        <td>{d.email || "-"}</td>
                        <td>{d.telefono || "-"}</td>
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
