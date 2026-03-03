import React from 'react';
import { useBooks } from '../hooks/useBooks';
import { useRentals } from '../hooks/useRentals';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { books } = useBooks();
  const { rentals } = useRentals(user);

  const activeRentals = rentals.filter((rental) => rental.status === 'active');
  const returnedRentals = rentals.filter((rental) => rental.status === 'returned');

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Panel de Administración</h1>
          <p className="admin-dashboard__subtitle">
            Control de catálogo y seguimiento de alquileres de la biblioteca.
          </p>
        </header>

        <section className="admin-dashboard__stats">
          <article className="admin-dashboard__stat-card">
            <h2>Total de libros</h2>
            <p>{books.length}</p>
          </article>
          <article className="admin-dashboard__stat-card">
            <h2>Alquileres activos</h2>
            <p>{activeRentals.length}</p>
          </article>
          <article className="admin-dashboard__stat-card">
            <h2>Alquileres devueltos</h2>
            <p>{returnedRentals.length}</p>
          </article>
        </section>

        <section className="admin-dashboard__rentals">
          <h2 className="admin-dashboard__section-title">Histórico de alquileres (mock)</h2>
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Libro</th>
                  <th>Inicio</th>
                  <th>Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td>#{rental.userId}</td>
                    <td>{rental.bookTitle}</td>
                    <td>{rental.rentalDate}</td>
                    <td>{rental.dueDate}</td>
                    <td>{rental.status === 'active' ? 'Activo' : 'Devuelto'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
