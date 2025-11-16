// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3002";

export const api = {
  // Donantes
  getDonantes: () => axios.get(`${API_URL}/donantes`),
  createDonante: (data) => axios.post(`${API_URL}/donantes`, data),

  // Comedores
  getComedores: () => axios.get(`${API_URL}/comedores`),
  createComedor: (data) => axios.post(`${API_URL}/comedores`, data),

  // Productos
  getProductos: () => axios.get(`${API_URL}/productos`),
  createProducto: (data) => axios.post(`${API_URL}/productos`, data),

  // Donaciones
  getDonaciones: () => axios.get(`${API_URL}/donaciones`),
  createDonacion: (data) => axios.post(`${API_URL}/donaciones`, data),

  // Entregas
  getEntregas: () => axios.get(`${API_URL}/entregas`),
  createEntrega: (data) => axios.post(`${API_URL}/entregas`, data),

  // Historial
  getHistorialDonante: (id) => axios.get(`${API_URL}/historial/donante/${id}`),
  getHistorialComedor: (id) => axios.get(`${API_URL}/historial/comedor/${id}`),
};
