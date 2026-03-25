import { User, createUser } from './tasks/task1';
import { Book, Genre, createBook } from './tasks/task2';
import { calculateArea } from './tasks/task3';
import { Status, getStatusColor } from './tasks/task4';
import { capitalizeFirst, trimAndTransform } from './tasks/task5';
import { getFirstElement } from './tasks/task6';
import { HasId, findById } from './tasks/task7';
import { csvToJSON } from './tasks/task8';
import { formatCSVFileToJSONFile } from './tasks/task9';
import { 
  query, where, sort, groupBy, having,
  type Transform, type Where, type Sort, 
  type Group, type GroupBy, type GroupTransform, type Having
} from './tasks/task10';

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

// Демонстрация задания 9
console.log('\n=== Задание 9: formatCSVFileToJSONFile ===');
console.log('Функция для работы с файлами определена.');
console.log('Пример использования (раскомментируйте для реального запуска):');
console.log(`
// await formatCSVFileToJSONFile('./data/input.csv', './data/output.json', ';');
// console.log('Файл успешно преобразован!');
`);

// Демонстрация задания 10
console.log('\n=== Задание 10: Конвейер преобразований ===');

type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
};

const demoUsers: User[] = [
  { id: 1, name: 'John', surname: 'Doe', age: 34, city: 'NY' },
  { id: 2, name: 'John', surname: 'Doe', age: 33, city: 'NY' },
  { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' },
  { id: 4, name: 'Mike', surname: 'Doe', age: 35, city: 'LA' },
  { id: 5, name: 'Anna', surname: 'Smith', age: 28, city: 'NY' },
  { id: 6, name: 'Peter', surname: 'Jones', age: 42, city: 'LA' }
];

console.log('\nИсходные данные:', JSON.stringify(demoUsers, null, 2));

// Пример 1: Фильтрация и сортировка
console.log('\n--- Пример 1: Фильтрация и сортировка ---');
console.log('Поиск пользователей с именем John и фамилией Doe, сортировка по возрасту:');

const filterAndSort = query<User>(
  where('name', 'John'),
  where('surname', 'Doe'),
  sort('age')
);

const result1 = filterAndSort(demoUsers);
console.log('Результат:', JSON.stringify(result1, null, 2));

// Пример 2: Группировка
console.log('\n--- Пример 2: Группировка по городу ---');
console.log('Группировка всех пользователей по городу:');

const groupByCity = query<User>(
  groupBy('city')
);

const result2 = groupByCity(demoUsers);
console.log('Результат:', JSON.stringify(result2, null, 2));

// Пример 3: Группировка и фильтрация групп
console.log('\n--- Пример 3: Группировка и фильтрация групп ---');
console.log('Группировка по городу, оставляем только города с количеством пользователей больше 1:');

const groupAndFilter = query<User>(
  groupBy('city'),
  having<User>((group) => group.items.length > 1)
);

const result3 = groupAndFilter(demoUsers);
console.log('Результат:', JSON.stringify(result3, null, 2));

// Пример 4: Сложный конвейер
console.log('\n--- Пример 4: Сложный конвейер ---');
console.log('Пользователи с фамилией Doe, сгруппированные по городу, оставляем только группы где есть кто-то старше 34 лет:');

const complexPipeline = query<User>(
  where('surname', 'Doe'),
  groupBy('city'),
  having<User>((group) => group.items.some(u => u.age > 34))
);

const result4 = complexPipeline(demoUsers);
console.log('Результат:', JSON.stringify(result4, null, 2));

// Пример 5: Комбинирование разных типов преобразований
console.log('\n--- Пример 5: Комбинирование разных типов преобразований ---');
console.log('Все пользователи, сгруппированные по городу, затем сортировка групп по количеству элементов:');

// Сначала группируем, потом сортируем группы по размеру
const groupThenSort = query<User>(
  groupBy('city'),
  (groups: Group<User, 'city'>[]) => [...groups].sort((a, b) => b.items.length - a.items.length)
);

const result5 = groupThenSort(demoUsers);
console.log('Результат (группы отсортированы по убыванию количества):', JSON.stringify(result5, null, 2));

// Пример 6: Многоступенчатая фильтрация
console.log('\n--- Пример 6: Многоступенчатая фильтрация ---');
console.log('Пользователи из NY или LA, старше 30 лет, отсортированные по имени:');

const multiFilter = query<User>(
  (data: User[]) => data.filter(u => u.city === 'NY' || u.city === 'LA'),
  (data: User[]) => data.filter(u => u.age > 30),
  sort('name')
);

const result6 = multiFilter(demoUsers);
console.log('Результат:', JSON.stringify(result6, null, 2));

// Пример 7: Работа с пустым конвейером
console.log('\n--- Пример 7: Пустой конвейер ---');
console.log('Конвейер без шагов возвращает исходные данные:');

const emptyPipeline = query<User>();
const result7 = emptyPipeline(demoUsers);
console.log('Результат (должен совпадать с исходными данными):', JSON.stringify(result7, null, 2));

console.log('\n=== Задание 10 успешно продемонстрировано ===');