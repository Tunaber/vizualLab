// Задание 5: Тип StringFormatter и функции форматирования
export type StringFormatter = (str: string, uppercase?: boolean) => string;

export const capitalizeFirst: StringFormatter = (str: string, uppercase: boolean = false): string => {
  if (str.length === 0) return str;
  
  const trimmed = str.trim();
  if (uppercase) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const trimAndTransform: StringFormatter = (str: string, uppercase: boolean = false): string => {
  const trimmed = str.trim();
  return uppercase ? trimmed.toUpperCase() : trimmed;
};