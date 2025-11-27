import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import DetalleProducto from './components/DetalleProducto';
import ListaCategorias from './components/ListaCategorias';
import FormularioCategoria from './components/FormularioCategoria';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rutas de Productos */}
          <Route path="/productos" element={<ListaProductos />} />
          <Route path="/productos/nuevo" element={<FormularioProducto />} />
          <Route path="/productos/editar/:id" element={<FormularioProducto />} />
          <Route path="/productos/detalle/:id" element={<DetalleProducto />} />
          
          {/* Rutas de Categorías */}
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/categorias/nueva" element={<FormularioCategoria />} />
          <Route path="/categorias/editar/:id" element={<FormularioCategoria />} />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;