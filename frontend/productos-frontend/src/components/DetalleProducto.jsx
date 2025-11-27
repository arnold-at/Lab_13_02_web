import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductoService from '../api/productoService';
import '../styles/Detalle.css';

const DetalleProducto = () => {
  const [productoResponse, setProductoResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getById(id);
      setProductoResponse(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!productoResponse) return <div className="error">Producto no encontrado</div>;

  const { producto, categoria } = productoResponse;

  return (
    <div className="container">
      <div className="detalle-container">
        <h1>Detalle del Producto</h1>
        
        <div className="detalle-card">
          <div className="detalle-row">
            <span className="detalle-label">ID:</span>
            <span className="detalle-value">{producto.id}</span>
          </div>
          
          <div className="detalle-row">
            <span className="detalle-label">Nombre:</span>
            <span className="detalle-value">{producto.nombre}</span>
          </div>
          
          <div className="detalle-row">
            <span className="detalle-label">Precio:</span>
            <span className="detalle-value precio">${producto.precio?.toFixed(2)}</span>
          </div>
          
          <div className="detalle-row">
            <span className="detalle-label">Categoría:</span>
            <span className="detalle-value">
              {categoria ? (
                <span className="categoria-badge">
                  {categoria.nombre} (ID: {categoria.id})
                </span>
              ) : (
                <span className="no-categoria">Sin categoría</span>
              )}
            </span>
          </div>
        </div>

        <div className="detalle-actions">
          <button
            className="btn-secondary"
            onClick={() => navigate(`/productos/editar/${producto.id}`)}
          >
            Editar
          </button>
          <button
            className="btn-primary"
            onClick={() => navigate('/productos')}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;