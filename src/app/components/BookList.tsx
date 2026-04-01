import React from 'react';
import { BookCard } from './BookCard';
import type { Book } from '../types/book';
import './BookList.css';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

export function BookList({ books, isLoading, error }: BookListProps) {
  if (isLoading) {
    return (
      <div className="book-list__loading">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-list__error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="book-list__empty">
        <p>No books found.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}