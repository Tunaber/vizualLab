// Задание 1: Интерфейс User и функция createUser
export interface User {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
}

export function createUser(id: number, name: string, email?: string, isActive: boolean = true): User {
  return {
    id,
    name,
    ...(email && { email }),
    isActive
  };
}