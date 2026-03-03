import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { books, loading, searchBooks } = useBooks();
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
    } else {
      const results = searchBooks(query);
      setSearchResults(results);
      setIsSearching(true);
    }
  };

  const displayBooks = isSearching ? searchResults : books.slice(0, 3);

  const handleRentBook = (book) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para alquilar un libro');
      return;
    }
    alert(`Libro "${book.title}" agregado al carrito de alquiler`);
  };

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <h1 className="home__title">Bienvenido a la Biblioteca Digital</h1>
            <p className="home__subtitle">
              Descubre miles de libros y alquílalos desde la comodidad de tu hogar
            </p>
            <div className="home__actions">
              <Link to="/books" className="btn btn--primary btn--large">
                Explorar Libros
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="btn btn--secondary btn--large">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home__search">
        <div className="container">
          <h2 className="home__section-title">Buscar Libros</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="home__featured">
        <div className="container">
          <h2 className="home__section-title">
            {isSearching ? 'Resultados de Búsqueda' : 'Libros Destacados'}
          </h2>
          
          {loading ? (
            <LoadingSpinner />
          ) : displayBooks.length === 0 ? (
            <div className="home__no-results">
              <p>No se encontraron libros que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="home__books-grid">
              {displayBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onRent={handleRentBook}
                />
              ))}
            </div>
          )}
          
          {!isSearching && books.length > 3 && (
            <div className="home__view-all">
              <Link to="/books" className="btn btn--primary">
                Ver Todos los Libros
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="home__features">
        <div className="container">
          <h2 className="home__section-title">Características</h2>
          <div className="home__features-grid">
            <div className="home__feature">
              <div className="home__feature-icon">📚</div>
              <h3>Amplia Colección</h3>
              <p>Miles de libros en diferentes categorías y idiomas</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">🔍</div>
              <h3>Búsqueda Avanzada</h3>
              <p>Encuentra libros por título, autor, ISBN o categoría</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">⏰</div>
              <h3>Alquiler Flexible</h3>
              <p>Alquila libros por el tiempo que necesites con opción de extensión</p>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">💬</div>
              <h3>Reseñas</h3>
              <p>Lee y comparte reseñas de otros usuarios</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
