import { describe, it, expect } from 'vitest';
import { expectTypeOf } from 'vitest';
import {
  query,
  where,
  sort,
  groupBy,
  having,
  type Group,
  type Transform
} from '../tasks/task10.js';

describe('Задание 10: Конвейер преобразований с проверкой порядка', () => {
  type User = {
    id: number;
    name: string;
    surname: string;
    age: number;
    city: string;
  };

  const users: User[] = [
    { id: 1, name: 'John', surname: 'Doe', age: 34, city: 'NY' },
    { id: 2, name: 'John', surname: 'Doe', age: 33, city: 'NY' },
    { id: 3, name: 'John', surname: 'Doe', age: 35, city: 'LA' },
    { id: 4, name: 'Mike', surname: 'Doe', age: 35, city: 'LA' },
    { id: 5, name: 'Anna', surname: 'Smith', age: 28, city: 'NY' },
    { id: 6, name: 'Peter', surname: 'Jones', age: 42, city: 'LA' }
  ];

  describe('Тесты типов - проверка порядка операций', () => {
    it('должен позволять все where в начале', () => {
      expectTypeOf(query<User>(
        where('name', 'John'),
        where('surname', 'Doe'),
        where('city', 'NY')
      )).toBeFunction();
    });

    it('должен позволять where, затем groupBy', () => {
      expectTypeOf(query<User>(
        where('name', 'John'),
        where('surname', 'Doe'),
        groupBy('city')
      )).toBeFunction();
    });

    it('должен позволять where, groupBy, having', () => {
      expectTypeOf(query<User>(
        where('name', 'John'),
        groupBy('city'),
        having<User>((group) => group.items.length > 1)
      )).toBeFunction();
    });

    it('должен позволять where, groupBy, having, sort', () => {
      expectTypeOf(query<User>(
        where('name', 'John'),
        groupBy('city'),
        having<User>((group) => group.items.length > 1),
        sort('age')
      )).toBeFunction();
    });

    it('должен позволять несколько where, затем groupBy, затем having, затем несколько sort', () => {
      expectTypeOf(query<User>(
        where('name', 'John'),
        where('surname', 'Doe'),
        groupBy('city'),
        having<User>((group) => group.items.length > 1),
        sort('age'),
        sort('name')
      )).toBeFunction();
    });

    it('НЕ должен позволять groupBy перед where', () => {
      // @ts-expect-error - groupBy должен идти после всех where
      expectTypeOf(query<User>(
        groupBy('city'),
        where('name', 'John')
      )).toBeFunction();
    });

    it('НЕ должен позволять having перед groupBy', () => {
      // @ts-expect-error - having должен идти после groupBy
      expectTypeOf(query<User>(
        where('name', 'John'),
        having<User>((group) => group.items.length > 1),
        groupBy('city')
      )).toBeFunction();
    });

    it('НЕ должен позволять sort перед groupBy/having', () => {
      // @ts-expect-error - sort должен идти после всех группирующих операций
      expectTypeOf(query<User>(
        where('name', 'John'),
        sort('age'),
        groupBy('city')
      )).toBeFunction();
    });

    it('НЕ должен позволять groupBy после having', () => {
      // @ts-expect-error - groupBy не может идти после having
      expectTypeOf(query<User>(
        where('name', 'John'),
        groupBy('city'),
        having<User>((group) => group.items.length > 1),
        groupBy('age')
      )).toBeFunction();
    });

    it('НЕ должен позволять having после sort', () => {
      // @ts-expect-error - having не может идти после sort
      expectTypeOf(query<User>(
        where('name', 'John'),
        groupBy('city'),
        sort('age'),
        having<User>((group) => group.items.length > 1)
      )).toBeFunction();
    });

    it('НЕ должен позволять where после groupBy', () => {
      // @ts-expect-error - where не может идти после groupBy
      expectTypeOf(query<User>(
        groupBy('city'),
        where('name', 'John')
      )).toBeFunction();
    });

    it('должен позволять пустой конвейер', () => {
      expectTypeOf(query<User>()).toBeFunction();
    });
  });

  describe('where', () => {
    it('должен фильтровать по значению поля', () => {
      const filterByName = where<User>('name', 'John');
      const result = filterByName(users);

      expect(result).toHaveLength(3);
      expect(result.every(user => user.name === 'John')).toBe(true);
    });

    it('должен возвращать пустой массив если нет совпадений', () => {
      const filterByName = where<User>('name', 'NonExistent');
      const result = filterByName(users);

      expect(result).toHaveLength(0);
    });

    it('должен работать с числовыми значениями', () => {
      const filterByAge = where<User>('age', 35);
      const result = filterByAge(users);

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age === 35)).toBe(true);
    });
  });

  describe('sort', () => {
    it('должен сортировать по числовому полю', () => {
      const sortByAge = sort<User>('age');
      const result = sortByAge(users);

      expect(result[0]?.age).toBe(28);
      expect(result[1]?.age).toBe(33);
      expect(result[2]?.age).toBe(34);
      expect(result[3]?.age).toBe(35);
      expect(result[4]?.age).toBe(35);
      expect(result[5]?.age).toBe(42);
    });

    it('должен сортировать по строковому полю', () => {
      const sortByName = sort<User>('name');
      const result = sortByName(users);

      expect(result[0]?.name).toBe('Anna');
      expect(result[1]?.name).toBe('John');
      expect(result[2]?.name).toBe('John');
      expect(result[3]?.name).toBe('John');
      expect(result[4]?.name).toBe('Mike');
      expect(result[5]?.name).toBe('Peter');
    });

    it('не должен мутировать исходный массив', () => {
      const sortByAge = sort<User>('age');
      const result = sortByAge(users);

      expect(result).not.toBe(users);
      expect(users[0]?.age).toBe(34);
    });
  });

  describe('groupBy', () => {
    it('должен группировать по полю', () => {
      const groupByCity = groupBy<User>('city');
      const result = groupByCity(users);

      expect(result).toHaveLength(2);
      
      const nyGroup = result.find(g => g.key === 'NY');
      const laGroup = result.find(g => g.key === 'LA');

      expect(nyGroup?.items).toHaveLength(3);
      expect(laGroup?.items).toHaveLength(3);
    });

    it('должен создавать группы с правильной структурой', () => {
      const groupByAge = groupBy<User>('age');
      const result = groupByAge(users);

      expect(result[0]).toHaveProperty('key');
      expect(result[0]).toHaveProperty('items');
      expect(Array.isArray(result[0]?.items)).toBe(true);
    });
  });

  describe('having', () => {
    it('должен фильтровать группы по предикату', () => {
      const groupByCity = groupBy<User>('city');
      const groups = groupByCity(users);

      const filterGroups = having<User>((group) => group.items.length > 2);
      const result = filterGroups(groups);

      expect(result).toHaveLength(2);
      expect(result.every(g => g.items.length > 2)).toBe(true);
    });

    it('должен отфильтровывать группы, не удовлетворяющие условию', () => {
      const groupByCity = groupBy<User>('city');
      const groups = groupByCity(users);

      const filterGroups = having<User>((group) => group.items.length > 3);
      const result = filterGroups(groups);

      expect(result).toHaveLength(0);
    });
  });

  describe('query', () => {
    it('должен выполнять последовательность фильтраций', () => {
      const pipeline = query<User>(
        where('name', 'John'),
        where('surname', 'Doe'),
        sort('age')
      );

      const result = pipeline(users);

      expect(result).toHaveLength(3);
      expect(result[0]?.age).toBe(33);
      expect(result[1]?.age).toBe(34);
      expect(result[2]?.age).toBe(35);
    });

    it('должен работать с группировкой', () => {
      const pipeline = query<User>(
        where('surname', 'Doe'),
        groupBy('city')
      );

      const result = pipeline(users);

      expect(result).toHaveLength(2);
      const nyGroup = result.find(g => g.key === 'NY') as Group<User, 'city'>;
      const laGroup = result.find(g => g.key === 'LA') as Group<User, 'city'>;
      expect(nyGroup?.items).toHaveLength(2);
      expect(laGroup?.items).toHaveLength(2);
    });

    it('должен выполнять сложный конвейер с группировкой и фильтрацией', () => {
      const pipeline = query<User>(
        where('surname', 'Doe'),
        groupBy('city'),
        having<User>((group) => group.items.length > 1)
      );

      const result = pipeline(users);

      expect(result).toHaveLength(2);
      expect(result.every(g => g.items.length > 1)).toBe(true);
      
      const nyGroup = result.find(g => g.key === 'NY') as Group<User, 'city'>;
      const laGroup = result.find(g => g.key === 'LA') as Group<User, 'city'>;
      
      expect(nyGroup?.items).toHaveLength(2);
      expect(laGroup?.items).toHaveLength(2);
    });

    it('должен возвращать исходный массив при пустом конвейере', () => {
      const pipeline = query<User>();
      const result = pipeline(users);

      expect(result).toEqual(users);
      expect(result).not.toBe(users);
    });

    it('должен работать с одним шагом', () => {
      const pipeline = query<User>(
        where('city', 'NY')
      );

      const result = pipeline(users);

      expect(result).toHaveLength(3);
      expect(result.every(u => u.city === 'NY')).toBe(true);
    });

    it('должен позволять использовать кастомные шаги', () => {
      const pipeline = query<User>(
        where('city', 'LA'),
        ((data: User[]) => data.map(u => ({ ...u, age: u.age + 1 }))) as Transform<User>,
        sort('age')
      );

      const result = pipeline(users);
      
      expect(result).toHaveLength(3);
      expect(result.every(u => u.city === 'LA')).toBe(true);
      expect(result[0]?.age).toBe(36);
      expect(result[1]?.age).toBe(36);
      expect(result[2]?.age).toBe(43);
    });

    it('должен правильно обрабатывать having с условием >2', () => {
      const pipeline = query<User>(
        groupBy('city'),
        having<User>((group) => group.items.length > 2)
      );

      const result = pipeline(users);
      
      // Обе группы имеют по 3 пользователя, поэтому условие >2 должно пропустить обе группы
      expect(result).toHaveLength(2);
      expect(result.every(g => g.items.length > 2)).toBe(true);
      
      const nyGroup = result.find(g => g.key === 'NY') as Group<User, 'city'>;
      const laGroup = result.find(g => g.key === 'LA') as Group<User, 'city'>;
      
      expect(nyGroup?.items).toHaveLength(3);
      expect(laGroup?.items).toHaveLength(3);
    });

    it('должен правильно обрабатывать having с условием >3', () => {
      const pipeline = query<User>(
        groupBy('city'),
        having<User>((group) => group.items.length > 3)
      );

      const result = pipeline(users);
      
      // Ни одна группа не имеет >3 пользователей
      expect(result).toHaveLength(0);
    });

    it('должен правильно обрабатывать having с условием >=3', () => {
      const pipeline = query<User>(
        groupBy('city'),
        having<User>((group) => group.items.length >= 3)
      );

      const result = pipeline(users);
      
      // Обе группы имеют по 3 пользователя, поэтому условие >=3 должно пропустить обе группы
      expect(result).toHaveLength(2);
      expect(result.every(g => g.items.length >= 3)).toBe(true);
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен правильно обрабатывать реальный сценарий поиска', () => {
      const pipeline = query<User>(
        (data: User[]) => data.filter(u => u.surname === 'Doe' && u.age >= 30 && u.age <= 40),
        groupBy('city'),
        having<User>((group) => group.items.length > 1)
      );

      const result = pipeline(users);

      expect(result).toHaveLength(2);
      
      const nyGroup = result.find(g => g.key === 'NY');
      const laGroup = result.find(g => g.key === 'LA');
      
      expect(nyGroup?.items).toHaveLength(2);
      expect(laGroup?.items).toHaveLength(2);
    });

    it('должен корректно обрабатывать пустые результаты на любом этапе', () => {
      const pipeline = query<User>(
        where('name', 'NonExistent'),
        groupBy('city'),
        having<User>((group) => group.items.length > 0)
      );

      const result = pipeline(users);
      expect(result).toHaveLength(0);
    });
  });
});