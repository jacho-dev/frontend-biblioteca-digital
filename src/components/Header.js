import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <Link to="/" className="header__logo">
            📚 Biblioteca Digital
          </Link>
          
          <ul className="header__menu">
            <li className="header__menu-item">
              <Link to="/" className="header__link">Inicio</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/books" className="header__link">Libros</Link>
            </li>
            {isAuthenticated && (
              <li className="header__menu-item">
                <Link to="/my-rentals" className="header__link">Mis Alquileres</Link>
              </li>
            )}
          </ul>

          <div className="header__auth">
            {isAuthenticated ? (
              <div className="header__user">
                <span className="header__username">
                  👤 {user.name} ({user.role === 'admin' ? 'Admin' : 'Usuario'})
                </span>
                <button onClick={handleLogout} className="btn btn--secondary">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn--primary">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
