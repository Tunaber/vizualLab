// Задание 4: Тип Status и функция getStatusColor
export type Status = 'active' | 'inactive' | 'new';

export function getStatusColor(status: Status): string {
  const colors: Record<Status, string> = {
    'active': 'green',
    'inactive': 'gray',
    'new': 'blue'
  };
  return colors[status];
}