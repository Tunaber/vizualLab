import React, { useState, useEffect } from 'react';
import { BookList } from './components/BookList';
import { mockBooks } from './data/mockBooks';
import type { Book } from './types/book';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитируем загрузку данных
    setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>📚 Книжный магазин</h1>
        <p>Лучшие книги для программистов и любителей чтения</p>
        <div className="app__stats">
          {!isLoading && <span>В наличии: {books.length} книг</span>}
        </div>
      </header>
      <main className="app__main">
        <BookList books={books} isLoading={isLoading} error={null} />
      </main>
    </div>
  );
}

export default App;