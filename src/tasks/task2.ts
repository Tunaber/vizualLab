// Задание 2: Интерфейс Book и функция createBook
export type Genre = 'fiction' | 'non-fiction';

export interface Book {
  title: string;
  author: string;
  year?: number;
  genre: Genre;
}

export function createBook(book: Book): Book {
  return { ...book };
}