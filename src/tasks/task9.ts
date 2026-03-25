// Задание 9: Функция для чтения CSV файла и записи JSON файла
import { readFile, writeFile } from 'node:fs/promises';
import { csvToJSON } from './task8';

export async function formatCSVFileToJSONFile(
    input: string,
    output: string,
    delimiter: string
): Promise<void> {
    try {
        // Читаем содержимое файла
        const fileContent = await readFile(input, 'utf-8');

        // Разбиваем содержимое на строки и фильтруем пустые
        const lines = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            throw new Error('Input file is empty');
        }

        // Преобразуем CSV в JSON
        const jsonData = csvToJSON(lines, delimiter);

        // Записываем результат в файл
        await writeFile(output, JSON.stringify(jsonData, null, 2), 'utf-8');
    } catch (error) {
        throw error;
    }
}