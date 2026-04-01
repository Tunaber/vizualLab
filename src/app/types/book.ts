export interface Book {
  id: number;
  title: string;
  titleRu: string;
  isbn: string;
  pageCount: number;
  authors: string[];
  authorsRu: string[];
  price: number;
  description?: string;
}

export interface GoogleBookImage {
  items?: Array<{
    volumeInfo?: {
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }>;
}