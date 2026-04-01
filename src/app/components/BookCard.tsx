import React, { useState, useEffect } from 'react';
import type { Book } from '../types/book';
import { fetchBookCoverUrl } from '../services/bookService';
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const loadCover = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        const url = await fetchBookCoverUrl(book.isbn, book.title);
        
        if (url) {
          setCoverUrl(url);
          console.log(`✅ Got cover URL for: ${book.title}`);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(`Error loading cover for ${book.title}:`, err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCover();
  }, [book.isbn, book.title]);

  const handleBuyClick = () => {
    setIsAddingToCart(true);
    console.log(`🛒 Added to cart: ${book.titleRu} - ${book.price} ₽`);
    
    // Имитация добавления в корзину
    setTimeout(() => {
      setIsAddingToCart(false);
      alert(`Книга "${book.titleRu}" добавлена в корзину!\nЦена: ${book.price} ₽`);
    }, 500);
  };

  const authorsTextRu = Array.isArray(book.authorsRu) 
    ? book.authorsRu.join(', ') 
    : 'Неизвестный автор';

  // Форматируем цену
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(book.price);

  return (
    <div className="book-card">
      <div className="book-card__cover">
        {isLoading && (
          <div className="book-card__cover-placeholder">Loading cover...</div>
        )}
        {!isLoading && coverUrl && !error && (
          <img 
            src={coverUrl} 
            alt={`Cover of ${book.titleRu}`}
            className="book-card__image"
            onError={(e) => {
              setError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        {!isLoading && (error || !coverUrl) && (
          <div className="book-card__cover-placeholder">
            📚<br />Нет обложки
          </div>
        )}
      </div>
      
      <h3 className="book-card__title">{book.titleRu}</h3>
      <p className="book-card__authors">{authorsTextRu}</p>
      
      <div className="book-card__details">
        <div className="book-card__price">{formattedPrice}</div>
        <div className="book-card__pages">{book.pageCount} стр.</div>
      </div>
      
      <button 
        className={`book-card__button ${isAddingToCart ? 'book-card__button--loading' : ''}`}
        onClick={handleBuyClick}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? 'Добавление...' : 'Купить'}
      </button>
    </div>
  );
}