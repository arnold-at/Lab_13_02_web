import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriaService from '../api/categoriaService';
import '../styles/Lista.css';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await CategoriaService.getAll();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await CategoriaService.delete(id);
        cargarCategorias();
      } catch (err) {
        alert('Error al eliminar la categoría');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Categorías</h1>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/categorias/nueva')}
        >
          + Nueva Categoría
        </button>
      </div>

      {categorias.length === 0 ? (
        <p className="empty-message">No hay categorías registradas</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/categorias/editar/${categoria.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleEliminar(categoria.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaCategorias;