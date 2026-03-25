// Задание: Утилитарные типы

// 1. DeepReadonly<T> - рекурсивный readonly
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// 2. PickedByType<T, U> - выбирает свойства типа U
export type PickedByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

// 3. EventHandlers<T> - генерирует обработчики событий
export type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};