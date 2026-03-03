import React, { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import './Books.css';

const Books = () => {
  const { books, loading, searchBooks } = useBooks();
  const { isAuthenticated } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [rentals, setRentals] = useLocalStorage('rentals', []);

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
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para alquilar un libro');
      return;
    }

    const existingRental = rentals.find(
      rental => rental.bookId === book.id && rental.status === 'active'
    );

    if (existingRental) {
      alert('Ya tienes este libro alquilado');
      return;
    }

    const newRental = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      rentalDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returnDate: null,
      status: 'active',
      extended: false
    };

    setRentals([...rentals, newRental]);
    alert(`Libro "${book.title}" alquilado con éxito. Fecha de devolución: ${newRental.dueDate}`);
  };

  const displayBooks = isSearching ? searchResults : books;

  return (
    <div className="books">
      <div className="container">
        <div className="books__header">
          <h1 className="books__title">Catálogo de Libros</h1>
          <p className="books__subtitle">
            Explora nuestra colección de libros disponibles para alquiler
          </p>
        </div>

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
              {displayBooks.map(book => (
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
