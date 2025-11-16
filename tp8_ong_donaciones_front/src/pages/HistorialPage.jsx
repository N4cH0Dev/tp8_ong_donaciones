// src/pages/HistorialPage.jsx
import { useState } from "react";
import { useOngStore } from "../store/useOngStore";

export function HistorialPage() {
  const {
    donantes,
    comedores,
    historialDonante,
    historialComedor,
    fetchHistorialDonante,
    fetchHistorialComedor,
  } = useOngStore();

  const [donanteId, setDonanteId] = useState("");
  const [comedorId, setComedorId] = useState("");

  const handleVerDonante = async () => {
    await fetchHistorialDonante(donanteId);
  };

  const handleVerComedor = async () => {
    await fetchHistorialComedor(comedorId);
  };

  return (
    <div>
      <h2 className="mb-3">Historial de Movimientos</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header">Por Donante</div>
            <div className="card-body">
              <div className="d-flex gap-2 mb-3">
                <select
                  className="form-select"
                  value={donanteId}
                  onChange={(e) => setDonanteId(e.target.value)}
                >
                  <option value="">Seleccione donante</option>
                  {donantes.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleVerDonante}
                  disabled={!donanteId}
                >
                  Ver
                </button>
              </div>

              {historialDonante.length === 0 ? (
                <p className="text-muted">Sin movimientos para mostrar.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {historialDonante.map((h) => (
                    <li key={h.id} className="list-group-item">
                      {h.fecha} - {h.cantidad} x {h.producto_nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-header">Por Comedor</div>
            <div className="card-body">
              <div className="d-flex gap-2 mb-3">
                <select
                  className="form-select"
                  value={comedorId}
                  onChange={(e) => setComedorId(e.target.value)}
                >
                  <option value="">Seleccione comedor</option>
                  {comedores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleVerComedor}
                  disabled={!comedorId}
                >
                  Ver
                </button>
              </div>

              {historialComedor.length === 0 ? (
                <p className="text-muted">Sin movimientos para mostrar.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {historialComedor.map((h) => (
                    <li
                      key={`${h.entrega_id}-${h.producto_nombre}-${h.fecha}`}
                      className="list-group-item"
                    >
                      {h.fecha} - {h.cantidad} x {h.producto_nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
