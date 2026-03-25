// Задание 7: Интерфейс HasId и функция findById
export interface HasId {
  id: number;
}

export function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}