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
            <i className="fa-solid fa-book-open-reader" /> Biblioteca Digital
          </Link>

          <ul className="header__menu">
            <li className="header__menu-item">
              <Link to="/" className="header__link"><i className="fa-solid fa-house" /> Inicio</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/books" className="header__link"><i className="fa-solid fa-book" /> Libros</Link>
            </li>
            {isAuthenticated && (
              <li className="header__menu-item">
                <Link to="/my-rentals" className="header__link"><i className="fa-solid fa-clock-rotate-left" /> Mis Alquileres</Link>
              </li>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <li className="header__menu-item">
                <Link to="/admin" className="header__link"><i className="fa-solid fa-chart-line" /> Panel Admin</Link>
              </li>
            )}
          </ul>

          <div className="header__auth">
            {isAuthenticated ? (
              <div className="header__user">
                <span className="header__username">
                  <i className="fa-solid fa-circle-user" /> {user.name} ({user.role === 'admin' ? 'Admin' : 'Usuario'})
                </span>
                <button onClick={handleLogout} className="btn btn--secondary">
                  <i className="fa-solid fa-right-from-bracket" /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn--primary">
                <i className="fa-solid fa-right-to-bracket" /> Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
