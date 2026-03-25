import { User, createUser } from './tasks/task1';
import { Book, Genre, createBook } from './tasks/task2';
import { calculateArea } from './tasks/task3';
import { Status, getStatusColor } from './tasks/task4';
import { capitalizeFirst, trimAndTransform } from './tasks/task5';
import { getFirstElement } from './tasks/task6';
import { HasId, findById } from './tasks/task7';
import { csvToJSON } from './tasks/task8';
import { formatCSVFileToJSONFile } from './tasks/task9';

// Демонстрация задания 1
console.log('=== Задание 1: User ===');
const user1 = createUser(1, 'Иван Петров', 'ivan@example.com');
const user2 = createUser(2, 'Мария Сидорова');
console.log('User 1:', user1);
console.log('User 2:', user2);

// Демонстрация задания 2
console.log('\n=== Задание 2: Book ===');
const book1: Book = {
  title: 'Война и мир',
  author: 'Лев Толстой',
  year: 1869,
  genre: 'fiction'
};
const book2: Book = {
  title: 'Краткая история времени',
  author: 'Стивен Хокинг',
  genre: 'non-fiction'
};
console.log('Book 1:', createBook(book1));
console.log('Book 2:', createBook(book2));

// Демонстрация задания 3
console.log('\n=== Задание 3: calculateArea ===');
console.log('Площадь круга (r=5):', calculateArea('circle', 5));
console.log('Площадь квадрата (side=4):', calculateArea('square', 4));

// Демонстрация задания 4
console.log('\n=== Задание 4: getStatusColor ===');
const statuses: Status[] = ['active', 'inactive', 'new'];
statuses.forEach(status => {
  console.log(`Статус "${status}" имеет цвет: ${getStatusColor(status)}`);
});

// Демонстрация задания 5
console.log('\n=== Задание 5: StringFormatter ===');
const testStr = '  hello world  ';
console.log('capitalizeFirst:', capitalizeFirst(testStr));
console.log('capitalizeFirst (uppercase):', capitalizeFirst(testStr, true));
console.log('trimAndTransform:', trimAndTransform(testStr));
console.log('trimAndTransform (uppercase):', trimAndTransform(testStr, true));

// Демонстрация задания 6
console.log('\n=== Задание 6: getFirstElement ===');
const numbers = [1, 2, 3, 4, 5];
const strings = ['a', 'b', 'c'];
const emptyArray: any[] = [];
console.log('Первый элемент чисел:', getFirstElement(numbers));
console.log('Первый элемент строк:', getFirstElement(strings));
console.log('Пустой массив:', getFirstElement(emptyArray));

// Демонстрация задания 7
console.log('\n=== Задание 7: findById ===');
interface UserWithId extends HasId {
  name: string;
}
const users: UserWithId[] = [
  { id: 1, name: 'Анна' },
  { id: 2, name: 'Борис' },
  { id: 3, name: 'Виктор' }
];
console.log('Пользователь с id=2:', findById(users, 2));
console.log('Пользователь с id=5:', findById(users, 5));

// Демонстрация задания 8
console.log('\n=== Задание 8: csvToJSON ===');
const csvData = [
  "p1;p2;p3;p4",
  "1;A;b;c",
  "2;B;v;d"
];
try {
  const jsonResult = csvToJSON(csvData, ';');
  console.log('Результат преобразования CSV в JSON:');
  console.log(JSON.stringify(jsonResult, null, 2));
} catch (error) {
  console.error('Ошибка:', error.message);
}

// Демонстрация задания 9 (асинхронная, но для примера показываем как работает)
console.log('\n=== Задание 9: formatCSVFileToJSONFile ===');
console.log('Функция для работы с файлами определена.');
console.log('Пример использования (раскомментируйте для реального запуска):');
console.log(`
// await formatCSVFileToJSONFile('./data/input.csv', './data/output.json', ';');
// console.log('Файл успешно преобразован!');
`);