import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏪 Sistema de Productos
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link 
              to="/productos" 
              className={location.pathname.includes('/productos') ? 'navbar-link active' : 'navbar-link'}
            >
              Productos
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/categorias" 
              className={location.pathname.includes('/categorias') ? 'navbar-link active' : 'navbar-link'}
            >
              Categorías
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;