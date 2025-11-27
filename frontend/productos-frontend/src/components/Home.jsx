import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido al Sistema de Gestión</h1>
        <p className="home-subtitle">Administra tus productos y categorías de forma sencilla</p>
        
        <div className="home-cards">
          <div className="home-card">
            <div className="card-icon">📦</div>
            <h2>Productos</h2>
            <p>Gestiona tu catálogo de productos, precios y asociaciones con categorías</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/productos')}
            >
              Ver Productos
            </button>
          </div>

          <div className="home-card">
            <div className="card-icon">🏷️</div>
            <h2>Categorías</h2>
            <p>Organiza tus productos creando y administrando categorías</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/categorias')}
            >
              Ver Categorías
            </button>
          </div>
        </div>

        <div className="home-info">
          <p>💡 <strong>Consejo:</strong> Primero crea las categorías y luego asígnalas a tus productos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;