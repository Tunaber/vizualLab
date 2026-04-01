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

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Unlocking Android",
    titleRu: "Android. Разработка приложений",
    isbn: "1933988673",
    pageCount: 416,
    authors: ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    authorsRu: ["У. Фрэнк Аблесон", "Чарли Коллинз", "Роби Сен"],
    price: 1250,
    description: "Полное руководство по разработке приложений для Android"
  },
  {
    id: 2,
    title: "Specification by Example",
    titleRu: "Specification by Example. Как успешные команды реализуют нужный продукт",
    isbn: "1617290084",
    pageCount: 296,
    authors: ["Gojko Adzic"],
    authorsRu: ["Гойко Аджич"],
    price: 1890,
    description: "Как успешные команды реализуют нужный продукт"
  },
  {
    id: 3,
    title: "The Great Gatsby",
    titleRu: "Великий Гэтсби",
    isbn: "9780743273565",
    pageCount: 180,
    authors: ["F. Scott Fitzgerald"],
    authorsRu: ["Ф. Скотт Фицджеральд"],
    price: 450,
    description: "Классический роман о американской мечте"
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    titleRu: "Убить пересмешника",
    isbn: "9780061120084",
    pageCount: 336,
    authors: ["Harper Lee"],
    authorsRu: ["Харпер Ли"],
    price: 520,
    description: "Знаменитый роман о расовой несправедливости"
  },
  {
    id: 5,
    title: "1984",
    titleRu: "1984",
    isbn: "9780451524935",
    pageCount: 328,
    authors: ["George Orwell"],
    authorsRu: ["Джордж Оруэлл"],
    price: 480,
    description: "Культовая антиутопия"
  },
  {
    id: 6,
    title: "Clean Code",
    titleRu: "Чистый код",
    isbn: "9780132350884",
    pageCount: 464,
    authors: ["Robert C. Martin"],
    authorsRu: ["Роберт Мартин"],
    price: 2350,
    description: "Создание, анализ и рефакторинг"
  },
  {
    id: 7,
    title: "The Pragmatic Programmer",
    titleRu: "Программист-прагматик",
    isbn: "9780201616224",
    pageCount: 352,
    authors: ["Andrew Hunt", "David Thomas"],
    authorsRu: ["Эндрю Хант", "Дэвид Томас"],
    price: 2100,
    description: "Путь от подмастерья к мастеру"
  },
  {
    id: 8,
    title: "Harry Potter and the Sorcerer's Stone",
    titleRu: "Гарри Поттер и философский камень",
    isbn: "9780439708180",
    pageCount: 309,
    authors: ["J.K. Rowling"],
    authorsRu: ["Дж.К. Роулинг"],
    price: 890,
    description: "Первая книга о юном волшебнике"
  },
  {
    id: 9,
    title: "The Hobbit",
    titleRu: "Хоббит, или Туда и обратно",
    isbn: "9780547928227",
    pageCount: 300,
    authors: ["J.R.R. Tolkien"],
    authorsRu: ["Дж.Р.Р. Толкин"],
    price: 750,
    description: "Классическое фэнтези"
  },
  {
    id: 10,
    title: "The Da Vinci Code",
    titleRu: "Код да Винчи",
    isbn: "9780307474278",
    pageCount: 489,
    authors: ["Dan Brown"],
    authorsRu: ["Дэн Браун"],
    price: 590,
    description: "Интеллектуальный триллер"
  },
  {
    id: 11,
    title: "JavaScript: The Good Parts",
    titleRu: "JavaScript. Сильные стороны",
    isbn: "9780596517748",
    pageCount: 176,
    authors: ["Douglas Crockford"],
    authorsRu: ["Дуглас Крокфорд"],
    price: 1450,
    description: "Изучение лучших частей JavaScript"
  },
  {
    id: 12,
    title: "You Don't Know JS",
    titleRu: "Вы не знаете JS",
    isbn: "9781491924464",
    pageCount: 600,
    authors: ["Kyle Simpson"],
    authorsRu: ["Кайл Симпсон"],
    price: 3200,
    description: "Комплект из 6 книг о JavaScript"
  }
];