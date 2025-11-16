// src/store/useOngStore.js
import { create } from "zustand";
import { api } from "../services/api";

export const useOngStore = create((set, get) => ({
  donantes: [],
  comedores: [],
  productos: [],
  donaciones: [],
  entregas: [],
  historialDonante: [],
  historialComedor: [],
  loading: false,
  error: null,

  // Cargar todo al inicio
  loadInitialData: async () => {
    try {
      set({ loading: true, error: null });
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

      set({
        donantes: resDonantes.data,
        comedores: resComedores.data,
        productos: resProductos.data,
        donaciones: resDonaciones.data,
        entregas: resEntregas.data,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: "Error cargando datos iniciales" });
    }
  },

  // Acciones
  addDonante: async (data) => {
    await api.createDonante(data);
    await get().loadInitialData();
  },

  addComedor: async (data) => {
    await api.createComedor(data);
    await get().loadInitialData();
  },

  addProducto: async (data) => {
    await api.createProducto(data);
    await get().loadInitialData();
  },

  addDonacion: async (data) => {
    await api.createDonacion(data);
    await get().loadInitialData();
  },

  addEntrega: async (data) => {
    await api.createEntrega(data);
    await get().loadInitialData();
  },

  fetchHistorialDonante: async (id) => {
    if (!id) return;
    const res = await api.getHistorialDonante(id);
    set({ historialDonante: res.data });
  },

  fetchHistorialComedor: async (id) => {
    if (!id) return;
    const res = await api.getHistorialComedor(id);
    set({ historialComedor: res.data });
  },
}));
