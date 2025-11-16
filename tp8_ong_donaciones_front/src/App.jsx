import React, { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useOngStore } from "./store/useOngStore";

import { HomePage } from "./pages/HomePage";
import { DonantesPage } from "./pages/DonantesPage";
import { ComedoresPage } from "./pages/ComedoresPage";
import { ProductosPage } from "./pages/ProductosPage";
import { DonacionesPage } from "./pages/DonacionesPage";
import { EntregasPage } from "./pages/EntregasPage";
import { HistorialPage } from "./pages/HistorialPage";

function App() {
  const loadInitialData = useOngStore((state) => state.loadInitialData);
  const loading = useOngStore((state) => state.loading);
  const error = useOngStore((state) => state.error);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            ONG Donaciones
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNav" className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/donantes">
                  Donantes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/comedores">
                  Comedores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos">
                  Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/donaciones">
                  Donaciones
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entregas">
                  Entregas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/historial">
                  Historial
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text">
              {loading && <span>Cargando...</span>}
            </span>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donantes" element={<DonantesPage />} />
          <Route path="/comedores" element={<ComedoresPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/donaciones" element={<DonacionesPage />} />
          <Route path="/entregas" element={<EntregasPage />} />
          <Route path="/historial" element={<HistorialPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
