import api from './axios';

const ProductoService = {
  getAll: async () => {
    const response = await api.get('/api/productos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
  },

  create: async (producto) => {
    const response = await api.post('/api/productos', producto);
    return response.data;
  },

  update: async (id, producto) => {
    const response = await api.put(`/api/productos/${id}`, producto);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/productos/${id}`);
  },
};

export default ProductoService;