import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatCSVFileToJSONFile } from '../tasks/task9.js';
import * as task8 from '../tasks/task8.js';

// Мокаем модули
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn()
}));

vi.mock('../tasks/task8', () => ({
  csvToJSON: vi.fn()
}));

import { readFile, writeFile } from 'node:fs/promises';

describe('Задание 9: formatCSVFileToJSONFile', () => {
  const mockInputPath = 'input.csv';
  const mockOutputPath = 'output.json';
  const mockDelimiter = ';';
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('должен читать файл, преобразовывать CSV и записывать JSON', async () => {
    const mockFileContent = 'id;name;age\n1;John;25\n2;Anna;30';
    vi.mocked(readFile).mockResolvedValue(mockFileContent);
    const mockJsonResult = [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Anna', age: 30 }
    ];
    vi.mocked(task8.csvToJSON).mockReturnValue(mockJsonResult);
    await formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter);
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(mockInputPath, 'utf-8');
    expect(task8.csvToJSON).toHaveBeenCalledTimes(1);
    expect(task8.csvToJSON).toHaveBeenCalledWith(
      ['id;name;age', '1;John;25', '2;Anna;30'],
      mockDelimiter
    );
    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledWith(
      mockOutputPath,
      JSON.stringify(mockJsonResult, null, 2),
      'utf-8'
    );
  });

  it('должен удалять пустые строки из содержимого файла', async () => {

    const mockFileContent = 'id;name;age\n\n1;John;25\n\n2;Anna;30\n';
    vi.mocked(readFile).mockResolvedValue(mockFileContent);
    vi.mocked(task8.csvToJSON).mockReturnValue([]);
    await formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter);

    expect(task8.csvToJSON).toHaveBeenCalledWith(
      ['id;name;age', '1;John;25', '2;Anna;30'],
      mockDelimiter
    );
  });

  it('должен пробрасывать ошибку от readFile', async () => {
    const mockError = new Error('File not found');
    vi.mocked(readFile).mockRejectedValue(mockError);
    await expect(
      formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter)
    ).rejects.toThrow('File not found');
    expect(task8.csvToJSON).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('должен пробрасывать ошибку от csvToJSON', async () => {
    vi.mocked(readFile).mockResolvedValue('id;name\n1;John');
    const mockError = new Error('Invalid CSV format');
    vi.mocked(task8.csvToJSON).mockImplementation(() => {
      throw mockError;
    });
    await expect(
      formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter)
    ).rejects.toThrow('Invalid CSV format');
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('должен пробрасывать ошибку от writeFile', async () => {
    vi.mocked(readFile).mockResolvedValue('id;name\n1;John');
    vi.mocked(task8.csvToJSON).mockReturnValue([{ id: 1, name: 'John' }]);
    const mockError = new Error('Permission denied');
    vi.mocked(writeFile).mockRejectedValue(mockError);
    await expect(
      formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter)
    ).rejects.toThrow('Permission denied');
  });

  it('должен выбрасывать ошибку при пустом файле', async () => {
    vi.mocked(readFile).mockResolvedValue('');

    await expect(
      formatCSVFileToJSONFile(mockInputPath, mockOutputPath, mockDelimiter)
    ).rejects.toThrow('Input file is empty');
    
    expect(task8.csvToJSON).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });
});