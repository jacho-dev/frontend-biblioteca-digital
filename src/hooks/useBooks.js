import { useState, useEffect } from 'react';
import { mockBooks } from '../data/mockData';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setBooks(mockBooks);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los libros');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const searchBooks = (query) => {
    if (!query) return books;
    
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery) ||
      book.isbn10.includes(query) ||
      book.isbn13.includes(query) ||
      book.language.toLowerCase().includes(lowercaseQuery) ||
      book.synopsis.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getBookById = (id) => {
    return books.find(book => book.id === parseInt(id));
  };

  return {
    books,
    loading,
    error,
    searchBooks,
    getBookById
  };
};
