import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRentals } from '../hooks/useRentals';
import AlertMessage from '../components/AlertMessage';
import { useAlert } from '../hooks/useAlert';
import './MyRentals.css';

const MyRentals = () => {
  const { user } = useAuth();
  const { userRentals, extendRental, returnRental } = useRentals(user);
  const [filter, setFilter] = useState('all');
  const { alert, showAlert, clearAlert } = useAlert();

  if (!user) {
    return (
      <div className="my-rentals">
        <div className="container">
          <div className="my-rentals__login-required">
            <h2>Debes iniciar sesión</h2>
            <p>Para ver tus alquileres, necesitas iniciar sesión primero.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredRentals = userRentals.filter((rental) => {
    if (filter === 'all') return true;
    if (filter === 'active') return rental.status === 'active';
    if (filter === 'returned') return rental.status === 'returned';
    return true;
  });

  const handleExtendRental = (rentalId) => {
    const result = extendRental(rentalId);
    showAlert(result.success ? 'success' : 'warning', result.success ? 'Alquiler extendido 15 días con éxito' : result.error);
  };

  const handleReturnBook = (rentalId) => {
    returnRental(rentalId);
    showAlert('success', 'Libro devuelto con éxito');
  };

  const getStatusClass = (status) => {
    return status === 'active' ? 'status--active' : 'status--returned';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Activo' : 'Devuelto';
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="my-rentals">
      <div className="container">
        <div className="my-rentals__header">
          <h1 className="my-rentals__title"><i className="fa-solid fa-clock-rotate-left" /> Mis Alquileres</h1>
          <p className="my-rentals__subtitle">
            Gestiona tus libros alquilados y sus fechas de devolución
          </p>
        </div>

        <AlertMessage alert={alert} onClose={clearAlert} />

        <div className="my-rentals__filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
          >
            Todos ({userRentals.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-btn ${filter === 'active' ? 'filter-btn--active' : ''}`}
          >
            Activos ({userRentals.filter((r) => r.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('returned')}
            className={`filter-btn ${filter === 'returned' ? 'filter-btn--active' : ''}`}
          >
            Devueltos ({userRentals.filter((r) => r.status === 'returned').length})
          </button>
        </div>

        {filteredRentals.length === 0 ? (
          <div className="my-rentals__empty">
            <h2>No tienes alquileres {filter === 'all' ? '' : getStatusText(filter.toLowerCase())}</h2>
            <p>
              {filter === 'active'
                ? 'No tienes libros alquilados actualmente.'
                : filter === 'returned'
                ? 'No has devuelto ningún libro aún.'
                : 'Comienza alquilando libros desde nuestro catálogo.'
              }
            </p>
          </div>
        ) : (
          <div className="my-rentals__list">
            {filteredRentals.map((rental) => {
              const overdue = rental.status === 'active' && isOverdue(rental.dueDate);

              return (
                <div key={rental.id} className="rental-card">
                  <div className="rental-card__content">
                    <div className="rental-card__info">
                      <h3 className="rental-card__title">{rental.bookTitle}</h3>
                      <p className="rental-card__author">por {rental.bookAuthor}</p>

                      <div className="rental-card__details">
                        <div className="rental-card__detail">
                          <span className="rental-card__label">Fecha de alquiler:</span>
                          <span className="rental-card__value">{rental.rentalDate}</span>
                        </div>
                        <div className="rental-card__detail">
                          <span className="rental-card__label">Fecha de devolución:</span>
                          <span className={`rental-card__value ${overdue ? 'overdue' : ''}`}>
                            {rental.dueDate}
                            {overdue && ' ⚠️ Vencido'}
                          </span>
                        </div>
                        {rental.returnDate && (
                          <div className="rental-card__detail">
                            <span className="rental-card__label">Devuelto el:</span>
                            <span className="rental-card__value">{rental.returnDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="rental-card__status">
                        <span className={`status ${getStatusClass(rental.status)}`}>
                          {getStatusText(rental.status)}
                        </span>
                        {rental.extended && (
                          <span className="extended-badge">Extendido</span>
                        )}
                      </div>
                    </div>

                    <div className="rental-card__actions">
                      {rental.status === 'active' && (
                        <>
                          {!rental.extended && (
                            <button
                              onClick={() => handleExtendRental(rental.id)}
                              className="btn btn--secondary"
                            >
                              Extender 15 días
                            </button>
                          )}
                          <button
                            onClick={() => handleReturnBook(rental.id)}
                            className="btn btn--primary"
                          >
                            Devolver Libro
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
