import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onRent }) => {
  const handleRentClick = () => {
    if (onRent) {
      onRent(book);
    }
  };

  return (
    <div className="book-card">
      <div className="book-card__cover">
        <img 
          src={book.cover} 
          alt={`Portada de ${book.title}`}
          className="book-card__image"
        />
      </div>
      
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">por {book.author}</p>
        
        <div className="book-card__details">
          <span className="book-card__year">{book.year}</span>
          <span className="book-card__category">{book.category}</span>
        </div>
        
        <div className="book-card__rating">
          <span className="book-card__stars">
            {'★'.repeat(Math.floor(book.rating))}{'☆'.repeat(5 - Math.floor(book.rating))}
          </span>
          <span className="book-card__rating-value">({book.rating})</span>
        </div>
        
        <p className="book-card__synopsis">
          {book.synopsis.substring(0, 100)}...
        </p>
        
        <div className="book-card__actions">
          <button 
            onClick={handleRentClick}
            className="btn btn--primary book-card__rent-btn"
          >
            Alquilar Libro
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
