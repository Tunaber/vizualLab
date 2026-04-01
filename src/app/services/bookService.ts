import type { Book, GoogleBookImage } from '../types/book';
import { mockBooks } from '../data/mockBooks';

const USE_MOCK_DATA = true;

export async function fetchBooks(): Promise<Book[]> {
  if (USE_MOCK_DATA) {
    console.log('Using mock data');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBooks), 500);
    });
  }
  
  try {
    const response = await fetch('/api/books');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

// Прямое получение URL обложки (без Blob)
export async function fetchBookCoverUrl(isbn: string, title: string): Promise<string | null> {
  if (!isbn && !title) {
    console.log('No ISBN or title provided');
    return null;
  }
  
  // Очищаем ISBN от дефисов и пробелов
  const cleanIsbn = isbn ? isbn.replace(/[-\s]/g, '') : '';
  
  try {
    // Сначала пробуем найти по ISBN
    if (cleanIsbn) {
      const isbnUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`;
      console.log(`🔍 Searching by ISBN: ${cleanIsbn}`);
      
      const isbnResponse = await fetch(isbnUrl);
      const isbnData: GoogleBookImage = await isbnResponse.json();
      
      if (isbnData.items && isbnData.items.length > 0) {
        const thumbnail = isbnData.items[0]?.volumeInfo?.imageLinks?.thumbnail;
        if (thumbnail) {
          const httpsThumbnail = thumbnail.replace('http://', 'https://');
          console.log(`✅ Found cover by ISBN: ${httpsThumbnail}`);
          return httpsThumbnail;
        }
      }
    }
    
    // Если по ISBN не нашли, пробуем по названию
    if (title) {
      const encodedTitle = encodeURIComponent(title);
      const titleUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedTitle}&maxResults=1`;
      console.log(`🔍 Searching by title: ${title}`);
      
      const titleResponse = await fetch(titleUrl);
      const titleData: GoogleBookImage = await titleResponse.json();
      
      if (titleData.items && titleData.items.length > 0) {
        const thumbnail = titleData.items[0]?.volumeInfo?.imageLinks?.thumbnail;
        if (thumbnail) {
          const httpsThumbnail = thumbnail.replace('http://', 'https://');
          console.log(`✅ Found cover by title: ${httpsThumbnail}`);
          return httpsThumbnail;
        }
      }
    }
    
    console.log(`❌ No cover found for: ${title || cleanIsbn}`);
    return null;
    
  } catch (error) {
    console.error('Error fetching cover:', error);
    return null;
  }
}

// Оставляем для совместимости, но теперь используем прямые URL
export async function fetchBookCover(isbn: string): Promise<string | null> {
  return fetchBookCoverUrl(isbn, '');
}

export async function fetchBookCoverAsBlob(isbn: string, title?: string): Promise<Blob | null> {
  const imageUrl = await fetchBookCoverUrl(isbn, title || '');
  if (!imageUrl) return null;
  
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    console.log(`📸 Loaded image blob: ${blob.size} bytes`);
    return blob;
  } catch (error) {
    console.error('Error fetching image blob:', error);
    return null;
  }
}