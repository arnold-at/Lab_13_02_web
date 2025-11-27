import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriaService from '../api/categoriaService';
import '../styles/Formulario.css';

const FormularioCategoria = () => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  useEffect(() => {
    if (esEdicion) {
      cargarCategoria();
    }
  }, [id]);

  const cargarCategoria = async () => {
    try {
      const data = await CategoriaService.getById(id);
      setNombre(data.nombre);
    } catch (err) {
      alert('Error al cargar la categoría');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    setLoading(true);
    try {
      const categoria = { nombre };
      
      if (esEdicion) {
        await CategoriaService.update(id, categoria);
      } else {
        await CategoriaService.create(categoria);
      }
      
      navigate('/categorias');
    } catch (err) {
      alert('Error al guardar la categoría');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{esEdicion ? 'Editar Categoría' : 'Nueva Categoría'}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese el nombre de la categoría"
              disabled={loading}
            />
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
              onClick={() => navigate('/categorias')}
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

export default FormularioCategoria;