import { Link } from 'react-router-dom';
import { Home, Package, CakeSlice } from 'lucide-react';
import './Navbar.css'; 
/* Aqui importei incones do react e do lucide react para servir de exemplo */
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        <Home size={24} />
        <span>Início</span>
      </Link>
      
      <Link to="/insumos" className="nav-item">
        <Package size={24} />
        <span>Estoque</span>
      </Link>
      
      <Link to="/produtos" className="nav-item">
        <CakeSlice size={24} />
        <span>Cardápio</span>
      </Link>
    </nav>
  );
}