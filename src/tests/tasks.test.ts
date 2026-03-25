import { describe, it, expect } from 'vitest';
import { createUser, User } from '../tasks/task1';
import { createBook, Book, Genre } from '../tasks/task2';
import { calculateArea } from '../tasks/task3';
import { getStatusColor, Status } from '../tasks/task4';
import { capitalizeFirst, trimAndTransform } from '../tasks/task5';
import { getFirstElement } from '../tasks/task6';
import { findById, HasId } from '../tasks/task7';

describe('Задание 1: User', () => {
  it('должен создавать пользователя со всеми полями', () => {
    const user = createUser(1, 'Иван', 'ivan@mail.com');
    expect(user).toEqual({
      id: 1,
      name: 'Иван',
      email: 'ivan@mail.com',
      isActive: true
    });
  });

  it('должен создавать пользователя без email', () => {
    const user = createUser(2, 'Петр');
    expect(user).toEqual({
      id: 2,
      name: 'Петр',
      isActive: true
    });
    expect(user.email).toBeUndefined();
  });

  it('должен создавать неактивного пользователя', () => {
    const user = createUser(3, 'Мария', undefined, false);
    expect(user.isActive).toBe(false);
  });
});

describe('Задание 2: Book', () => {
  it('должен создавать книгу со всеми полями', () => {
    const book: Book = {
      title: 'Война и мир',
      author: 'Толстой',
      year: 1869,
      genre: 'fiction'
    };
    const result = createBook(book);
    expect(result).toEqual(book);
  });

  it('должен создавать книгу без года', () => {
    const book: Book = {
      title: 'Краткая история времени',
      author: 'Хокинг',
      genre: 'non-fiction'
    };
    const result = createBook(book);
    expect(result).toEqual(book);
    expect(result.year).toBeUndefined();
  });

  it('должен принимать только допустимые жанры', () => {
    const fictionBook: Book = {
      title: 'Тест',
      author: 'Автор',
      genre: 'fiction'
    };
    const nonFictionBook: Book = {
      title: 'Тест',
      author: 'Автор',
      genre: 'non-fiction'
    };
    
    expect(() => {
      createBook(fictionBook);
      createBook(nonFictionBook);
    }).not.toThrow();
  });
});

describe('Задание 3: calculateArea', () => {
  it('должен правильно вычислять площадь круга', () => {
    expect(calculateArea('circle', 5)).toBeCloseTo(78.5398, 4);
    expect(calculateArea('circle', 0)).toBe(0);
    expect(calculateArea('circle', 10)).toBeCloseTo(314.159, 3);
  });

  it('должен правильно вычислять площадь квадрата', () => {
    expect(calculateArea('square', 4)).toBe(16);
    expect(calculateArea('square', 0)).toBe(0);
    expect(calculateArea('square', 2.5)).toBe(6.25);
  });
});

describe('Задание 4: getStatusColor', () => {
  it('должен возвращать правильные цвета для статусов', () => {
    expect(getStatusColor('active')).toBe('green');
    expect(getStatusColor('inactive')).toBe('gray');
    expect(getStatusColor('new')).toBe('blue');
  });

  it('должен принимать только допустимые статусы', () => {
    const statuses: Status[] = ['active', 'inactive', 'new'];
    statuses.forEach(status => {
      expect(() => getStatusColor(status)).not.toThrow();
    });
  });
});

describe('Задание 5: StringFormatter', () => {
  describe('capitalizeFirst', () => {
    it('должен делать первую букву заглавной', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
      expect(capitalizeFirst('мир')).toBe('Мир');
      expect(capitalizeFirst('')).toBe('');
    });

    it('должен обрезать пробелы', () => {
      expect(capitalizeFirst('  hello  ')).toBe('Hello');
    });

    it('должен приводить к верхнему регистру при uppercase=true', () => {
      expect(capitalizeFirst('hello world', true)).toBe('Hello world');
      expect(capitalizeFirst('  hello  ', true)).toBe('Hello');
    });
  });

  describe('trimAndTransform', () => {
    it('должен обрезать пробелы', () => {
      expect(trimAndTransform('  hello  ')).toBe('hello');
      expect(trimAndTransform('  world  ')).toBe('world');
    });

    it('должен приводить к верхнему регистру при uppercase=true', () => {
      expect(trimAndTransform('  hello  ', true)).toBe('HELLO');
      expect(trimAndTransform('  world  ', true)).toBe('WORLD');
    });

    it('не должен изменять пустую строку', () => {
      expect(trimAndTransform('')).toBe('');
      expect(trimAndTransform('', true)).toBe('');
    });
  });
});

describe('Задание 6: getFirstElement', () => {
  it('должен возвращать первый элемент массива чисел', () => {
    expect(getFirstElement([1, 2, 3])).toBe(1);
    expect(getFirstElement([5])).toBe(5);
  });

  it('должен возвращать первый элемент массива строк', () => {
    expect(getFirstElement(['a', 'b', 'c'])).toBe('a');
    expect(getFirstElement(['test'])).toBe('test');
  });

  it('должен возвращать undefined для пустого массива', () => {
    expect(getFirstElement([])).toBeUndefined();
  });

  it('должен работать с массивами любого типа', () => {
    const mixedArray = [1, 'two', true];
    expect(getFirstElement(mixedArray)).toBe(1);
    
    const objectArray = [{ id: 1 }, { id: 2 }];
    expect(getFirstElement(objectArray)).toEqual({ id: 1 });
  });
});

describe('Задание 7: findById', () => {
  interface TestItem extends HasId {
    name: string;
  }

  const items: TestItem[] = [
    { id: 1, name: 'Первый' },
    { id: 2, name: 'Второй' },
    { id: 3, name: 'Третий' }
  ];

  it('должен находить объект по id', () => {
    expect(findById(items, 2)).toEqual({ id: 2, name: 'Второй' });
    expect(findById(items, 1)).toEqual({ id: 1, name: 'Первый' });
  });

  it('должен возвращать undefined для несуществующего id', () => {
    expect(findById(items, 5)).toBeUndefined();
    expect(findById(items, 0)).toBeUndefined();
  });

  it('должен работать с пустым массивом', () => {
    expect(findById([], 1)).toBeUndefined();
  });

  it('должен работать с объектами разных типов, имеющих id', () => {
    interface AnotherItem extends HasId {
      value: string;
    }
    
    const anotherItems: AnotherItem[] = [
      { id: 10, value: 'тест' }
    ];
    
    expect(findById(anotherItems, 10)).toEqual({ id: 10, value: 'тест' });
  });
});