// Типы для операций
export type Transform<T> = (data: T[]) => T[];
export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};
export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

// Типы для конкретных операций
export type WhereOperation<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;
export type GroupByOperation<T> = <K extends keyof T>(key: K) => Transform<Group<T, K>>;
export type HavingOperation<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;
export type SortOperation<T> = <K extends keyof T>(key: K) => Transform<T>;

// Типы для маркировки состояний
interface WhereState { _tag: 'where' }
interface GroupState { _tag: 'group' }
interface HavingState { _tag: 'having' }
interface SortState { _tag: 'sort' }

// Типы для допустимых операций на каждом этапе
type AllowedInWhere = WhereOperation<any>;
type AllowedInGroup = GroupByOperation<any>;
type AllowedInHaving = HavingOperation<any>;
type AllowedInSort = SortOperation<any>;

// Проверка типа операции
type ExtractOperationType<T> = 
  T extends WhereOperation<any> ? WhereState :
  T extends GroupByOperation<any> ? GroupState :
  T extends HavingOperation<any> ? HavingState :
  T extends SortOperation<any> ? SortState :
  never;

// Проверка порядка операций
type ValidateOrder<Steps extends any[], CurrentState = never> = 
  Steps extends [] ? true :
  Steps extends [infer First, ...infer Rest] ?
    First extends AllowedInWhere ? 
      (IsNever<CurrentState> extends true ? ValidateOrder<Rest, WhereState> : false) :
    First extends AllowedInGroup ?
      (CurrentState extends WhereState | GroupState ? ValidateOrder<Rest, GroupState> : false) :
    First extends AllowedInHaving ?
      (CurrentState extends GroupState | HavingState ? ValidateOrder<Rest, HavingState> : false) :
    First extends AllowedInSort ?
      (CurrentState extends HavingState | SortState ? ValidateOrder<Rest, SortState> : false) :
    false :
  true;

type IsNever<T> = [T] extends [never] ? true : false;

// Перегрузки query для разных комбинаций параметров
export function query<T>(): Transform<T>;

export function query<T, S1 extends WhereOperation<T>>(
  step1: S1
): Transform<T>;

export function query<T, 
  S1 extends WhereOperation<T>,
  S2 extends WhereOperation<T> | GroupByOperation<T>
>(
  step1: S1,
  step2: S2
): Transform<T>;

export function query<T,
  S1 extends WhereOperation<T>,
  S2 extends WhereOperation<T> | GroupByOperation<T>,
  S3 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T>
>(
  step1: S1,
  step2: S2,
  step3: S3
): Transform<T>;

export function query<T,
  S1 extends WhereOperation<T>,
  S2 extends WhereOperation<T> | GroupByOperation<T>,
  S3 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T>,
  S4 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T> | SortOperation<T>
>(
  step1: S1,
  step2: S2,
  step3: S3,
  step4: S4
): Transform<T>;

export function query<T,
  S1 extends WhereOperation<T>,
  S2 extends WhereOperation<T> | GroupByOperation<T>,
  S3 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T>,
  S4 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T> | SortOperation<T>,
  S5 extends WhereOperation<T> | GroupByOperation<T> | HavingOperation<T> | SortOperation<T>
>(
  step1: S1,
  step2: S2,
  step3: S3,
  step4: S4,
  step5: S5
): Transform<T>;

// Основная реализация query
export function query<T>(...steps: any[]): Transform<T> {
  return (data: T[]): T[] => {
    let result: unknown = [...data];

    for (const step of steps) {
      result = step(result as any);

      if (!Array.isArray(result)) {
        throw new Error('Каждый шаг должен возвращать массив');
      }
    }

    return result as T[];
  };
}

// Реализация where
export function where<T, K extends keyof T>(key: K, value: T[K]): Transform<T> {
  return (data: T[]): T[] => {
    return data.filter((item): item is T => item[key] === value);
  };
}

// Реализация sort
export function sort<T, K extends keyof T>(key: K): Transform<T> {
  return (data: T[]): T[] => {
    return [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
  };
}

// Реализация groupBy
export function groupBy<T, K extends keyof T>(key: K): Transform<Group<T, K>> {
  return (data: T[]): Group<T, K>[] => {
    const groups = new Map<T[K], T[]>();

    for (const item of data) {
      const groupKey = item[key];
      const existingGroup = groups.get(groupKey);
      
      if (existingGroup) {
        existingGroup.push(item);
      } else {
        groups.set(groupKey, [item]);
      }
    }

    return Array.from(groups.entries()).map(([keyValue, items]) => ({
      key: keyValue,
      items
    }));
  };
}

// Реализация having
export function having<T, K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
): GroupTransform<T, K> {
  return (groups: Group<T, K>[]): Group<T, K>[] => {
    return groups.filter(predicate);
  };
}