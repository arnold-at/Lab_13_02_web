import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductoService from '../api/productoService';
import CategoriaService from '../api/categoriaService';
import '../styles/Formulario.css';

const FormularioProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoriaId: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  useEffect(() => {
    cargarCategorias();
    if (esEdicion) {
      cargarProducto();
    }
  }, [id]);

  const cargarCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const cargarProducto = async () => {
    try {
      const data = await ProductoService.getById(id);
      setFormData({
        nombre: data.producto.nombre,
        precio: data.producto.precio,
        categoriaId: data.producto.categoriaId,
      });
    } catch (err) {
      alert('Error al cargar el producto');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.precio || !formData.categoriaId) {
      alert('Todos los campos son requeridos');
      return;
    }

    if (parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    setLoading(true);
    try {
      const producto = {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        categoriaId: parseInt(formData.categoriaId),
      };
      
      if (esEdicion) {
        await ProductoService.update(id, producto);
      } else {
        await ProductoService.create(producto);
      }
      
      navigate('/productos');
    } catch (err) {
      alert('Error al guardar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{esEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              step="0.01"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ingrese el precio"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoriaId">Categoría:</label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/productos')}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProducto;