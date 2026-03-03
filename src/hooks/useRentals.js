import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { mockRentals } from '../data/mockData';

export const useRentals = (user) => {
  const [rentals, setRentals] = useLocalStorage('rentals', mockRentals);

  const userRentals = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return rentals;
    return rentals.filter((rental) => rental.userId === user.id);
  }, [rentals, user]);

  const rentBook = (book) => {
    if (!user) {
      return { success: false, error: 'Debes iniciar sesión para alquilar un libro' };
    }

    const existingRental = rentals.find(
      (rental) =>
        rental.userId === user.id &&
        rental.bookId === book.id &&
        rental.status === 'active'
    );

    if (existingRental) {
      return { success: false, error: 'Ya tienes este libro alquilado' };
    }

    const newRental = {
      id: Date.now(),
      userId: user.id,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      rentalDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      returnDate: null,
      status: 'active',
      extended: false
    };

    setRentals([...rentals, newRental]);
    return { success: true, rental: newRental };
  };

  const extendRental = (rentalId) => {
    const rental = rentals.find((r) => r.id === rentalId);

    if (!rental || rental.status !== 'active') {
      return { success: false, error: 'No se pudo extender el alquiler' };
    }

    if (rental.extended) {
      return { success: false, error: 'Este alquiler ya fue extendido una vez' };
    }

    const updatedRentals = rentals.map((r) => {
      if (r.id !== rentalId) return r;
      const nextDueDate = new Date(r.dueDate);
      nextDueDate.setDate(nextDueDate.getDate() + 15);
      return {
        ...r,
        dueDate: nextDueDate.toISOString().split('T')[0],
        extended: true
      };
    });

    setRentals(updatedRentals);
    return { success: true };
  };

  const returnRental = (rentalId) => {
    const updatedRentals = rentals.map((r) => {
      if (r.id !== rentalId) return r;
      return {
        ...r,
        status: 'returned',
        returnDate: new Date().toISOString().split('T')[0]
      };
    });

    setRentals(updatedRentals);
    return { success: true };
  };

  return {
    rentals,
    userRentals,
    rentBook,
    extendRental,
    returnRental
  };
};
