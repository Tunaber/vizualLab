
export type Transform<T> = (data: T[]) => T[];
export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;
export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;
export type Group<T, K extends keyof T> = {
  key: T[K];
  items: T[];
};
export type GroupBy<T> = <K extends keyof T>(key: K) => Transform<Group<T, K>>;
export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];
export type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
) => GroupTransform<T, K>;
type PipelineStep<T> = Transform<T> | GroupTransform<T, keyof T>;


export function query<T>(...steps: PipelineStep<T>[]): Transform<T> {
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


export function where<T, K extends keyof T>(key: K, value: T[K]): Transform<T> {
  return (data: T[]): T[] => {
    return data.filter((item): item is T => item[key] === value);
  };
}


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

export function having<T, K extends keyof T>(
  predicate: (group: Group<T, K>) => boolean
): GroupTransform<T, K> {
  return (groups: Group<T, K>[]): Group<T, K>[] => {
    return groups.filter(predicate);
  };
}