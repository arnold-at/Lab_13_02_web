import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../api/productoService';
import '../styles/Lista.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await ProductoService.delete(id);
        cargarProductos();
      } catch (err) {
        alert('Error al eliminar el producto');
        console.error(err);
      }
    }
  };

  const handleVerDetalle = (id) => {
    navigate(`/productos/detalle/${id}`);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Productos</h1>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/productos/nuevo')}
        >
          + Nuevo Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <p className="empty-message">No hay productos registrados</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio?.toFixed(2)}</td>
                <td>{producto.categoriaId}</td>
                <td>
                  <button
                    className="btn-info"
                    onClick={() => handleVerDetalle(producto.id)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/productos/editar/${producto.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleEliminar(producto.id)}
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

export default ListaProductos;