import api from './axios';

const CategoriaService = {
  getAll: async () => {
    const response = await api.get('/api/categorias');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/categorias/${id}`);
    return response.data;
  },

  create: async (categoria) => {
    const response = await api.post('/api/categorias', categoria);
    return response.data;
  },

  update: async (id, categoria) => {
    const response = await api.put(`/api/categorias/${id}`, categoria);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/categorias/${id}`);
  },
};

export default CategoriaService;