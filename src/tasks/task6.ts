// Задание 6: Обобщенная функция getFirstElement
export function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}