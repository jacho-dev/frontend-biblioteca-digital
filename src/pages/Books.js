import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';
import { useRentals } from '../hooks/useRentals';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { useAlert } from '../hooks/useAlert';
import './Books.css';

const Books = () => {
  const { books, loading, searchBooks } = useBooks();
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { rentBook } = useRentals(user);
  const { alert, showAlert, clearAlert } = useAlert();

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

  const handleRentBook = (book) => {
    const result = rentBook(book);

    if (!result.success) {
      showAlert('danger', result.error);
      return;
    }

    showAlert('success', `Libro "${book.title}" alquilado con éxito. Fecha de devolución: ${result.rental.dueDate}`);
  };

  const displayBooks = isSearching ? searchResults : books;

  return (
    <div className="books">
      <div className="container">
        <div className="books__header">
          <h1 className="books__title"><i className="fa-solid fa-book-open-reader" /> Catálogo de Libros</h1>
          <p className="books__subtitle">
            Explora nuestra colección de libros disponibles para alquiler
          </p>
        </div>

        <AlertMessage alert={alert} onClose={clearAlert} />

        <div className="books__search">
          <SearchBar onSearch={handleSearch} placeholder="Buscar por título, autor, ISBN, categoría..." />
        </div>

        {loading ? (
          <LoadingSpinner text="Cargando catálogo de libros..." />
        ) : displayBooks.length === 0 ? (
          <div className="books__no-results">
            <h2>No se encontraron libros</h2>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <>
            <div className="books__info">
              <p>
                {isSearching
                  ? `Se encontraron ${displayBooks.length} libros`
                  : `Mostrando ${displayBooks.length} libros disponibles`
                }
              </p>
            </div>

            <div className="books__grid">
              {displayBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onRent={handleRentBook}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
