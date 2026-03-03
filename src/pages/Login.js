import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(formData.username, formData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login__card">
          <div className="login__header">
            <h1 className="login__title">Iniciar Sesión</h1>
            <p className="login__subtitle">
              Accede a tu cuenta para alquilar libros
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login__form">
            {error && (
              <div className="login__error">
                {error}
              </div>
            )}

            <div className="form__group">
              <label htmlFor="username" className="form__label">
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form__input"
                required
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form__input"
                required
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary login__button"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login__demo">
            <h3>Cuentas de Demostración</h3>
            <div className="login__demo-accounts">
              <div className="login__demo-account">
                <strong>Administrador:</strong>
                <br />
                Usuario: admin | Contraseña: admin123
              </div>
              <div className="login__demo-account">
                <strong>Usuario:</strong>
                <br />
                Usuario: usuario | Contraseña: usuario123
              </div>
            </div>
          </div>

          <div className="login__footer">
            <p>
              ¿No tienes una cuenta?{' '}
              <Link to="/" className="login__link">
                Volver al inicio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
