import { describe, it, expect } from 'vitest';
import { csvToJSON } from '../tasks/task8';

describe('Задание 8: csvToJSON', () => {
    describe('Корректные входные данные', () => {
        it('должен преобразовывать CSV с разделителем ";" в массив объектов', () => {
            const input = [
                "p1;p2;p3;p4",
                "1;A;b;c",
                "2;B;v;d"
            ];

            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { p1: 1, p2: 'A', p3: 'b', p4: 'c' },
                { p1: 2, p2: 'B', p3: 'v', p4: 'd' }
            ]);
        });

        it('должен преобразовывать CSV с разделителем "," в массив объектов', () => {
            const input = [
                "name,age,city",
                "John,25,New York",
                "Anna,30,London"
            ];

            const result = csvToJSON(input, ',');

            expect(result).toEqual([
                { name: 'John', age: 25, city: 'New York' },
                { name: 'Anna', age: 30, city: 'London' }
            ]);
        });

        it('должен корректно обрабатывать числовые значения', () => {
            const input = [
                "id;value;price",
                "1;42;10.5",
                "2;100;99.99"
            ];

            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { id: 1, value: 42, price: 10.5 },
                { id: 2, value: 100, price: 99.99 }
            ]);
        });

        it('должен сохранять строковые значения как строки', () => {
            const input = [
                "name;note",
                "Alice;hello world",
                "Bob;test123"
            ];

            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { name: 'Alice', note: 'hello world' },
                { name: 'Bob', note: 'test123' }
            ]);
        });

        it('должен обрабатывать одну строку данных', () => {
            const input = [
                "id;name",
                "1;Test"
            ];

            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { id: 1, name: 'Test' }
            ]);
        });

        it('должен обрезать пробелы в заголовках и значениях', () => {
            const input = [
                "  id  ;  name  ;  age  ",
                "  1  ;  John  ;  25  ",
                "  2  ;  Anna  ;  30  "
            ];

            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { id: 1, name: 'John', age: 25 },
                { id: 2, name: 'Anna', age: 30 }
            ]);
        });
    });

    describe('Некорректные входные данные', () => {
        it('должен выбрасывать ошибку при пустом массиве', () => {
            expect(() => csvToJSON([], ';')).toThrow('Input array is empty');
        });

        it('должен выбрасывать ошибку при массиве только из пустых строк', () => {
            const input = ["", "  ", ""];
            expect(() => csvToJSON(input, ';')).toThrow('Input array is empty');
        });

        it('должен выбрасывать ошибку при отсутствии заголовков (пустая строка)', () => {
            const input = [""];
            expect(() => csvToJSON(input, ';')).toThrow('Input array is empty');
        });

        it('должен выбрасывать ошибку при отсутствии заголовков (строка с разделителями)', () => {
            const input = [";;;"];
            expect(() => csvToJSON(input, ';')).toThrow('No headers found');
        });

        it('должен выбрасывать ошибку при отсутствии заголовков (строка с пробелами)', () => {
            const input = ["   "];
            expect(() => csvToJSON(input, ';')).toThrow('Input array is empty');
        });

        it('должен выбрасывать ошибку при несоответствии количества значений заголовкам', () => {
            const input = [
                "id;name;age",
                "1;John",
                "2;Anna;30"
            ];

            expect(() => csvToJSON(input, ';')).toThrow('Line 2: Number of values (2) does not match number of headers (3)');
        });

        it('должен обрабатывать пустые строки между данными', () => {
            const input = [
                "id;name",
                "",
                "1;John",
                "",
                "2;Anna"
            ];

            const result = csvToJSON(input, ';');
            expect(result).toEqual([
                { id: 1, name: 'John' },
                { id: 2, name: 'Anna' }
            ]);
        });
    });
});