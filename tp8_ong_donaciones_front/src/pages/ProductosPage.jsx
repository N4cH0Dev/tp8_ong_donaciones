// src/pages/ProductosPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function ProductosPage() {
  const { productos, addProducto } = useOngStore();
  const [form, setForm] = useState({ nombre: "", tipo: "", stock: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    await addProducto({
      ...form,
      stock: Number(form.stock || 0),
    });
    setForm({ nombre: "", tipo: "", stock: 0 });
  };

  return (
    <div>
      <h2 className="mb-3">Productos</h2>

      <div className="row">
        <div className="col-md-5">
          <div className="card mb-3">
            <div className="card-header">Nuevo Producto</div>
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
                  <label className="form-label">Tipo</label>
                  <input
                    className="form-control"
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock inicial</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    min="0"
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
            <div className="card-header">Listado de Productos</div>
            <div className="card-body">
              {productos.length === 0 ? (
                <p className="text-muted">No hay productos registrados.</p>
              ) : (
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.tipo || "-"}</td>
                        <td>{p.stock}</td>
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
