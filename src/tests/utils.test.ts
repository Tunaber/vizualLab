import { describe, it, expectTypeOf } from 'vitest';
import { 
  DeepReadonly, 
  PickedByType, 
  EventHandlers 
} from '../tasks/utils.js';

describe('Утилитарные типы', () => {
  
  describe('DeepReadonly<T>', () => {
    it('должен делать все свойства readonly на верхнем уровне', () => {
      type Original = {
        name: string;
        age: number;
      };
      
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        readonly name: string;
        readonly age: number;
      }>();
    });

    it('должен рекурсивно делать свойства readonly для вложенных объектов', () => {
      type Original = {
        user: {
          name: string;
          address: {
            city: string;
            street: string;
          };
        };
        settings: {
          theme: string;
        };
      };
      
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        readonly user: {
          readonly name: string;
          readonly address: {
            readonly city: string;
            readonly street: string;
          };
        };
        readonly settings: {
          readonly theme: string;
        };
      }>();
    });

    it('должен корректно обрабатывать массивы', () => {
      type Original = {
        items: Array<{ id: number; name: string }>;
        tags: string[];
      };
      
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        readonly items: readonly { readonly id: number; readonly name: string }[];
        readonly tags: readonly string[];
      }>();
    });

    it('должен корректно обрабатывать примитивные типы', () => {
      type Original = {
        a: string;
        b: number;
        c: boolean;
        d: null;
        e: undefined;
      };
      
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        readonly a: string;
        readonly b: number;
        readonly c: boolean;
        readonly d: null;
        readonly e: undefined;
      }>();
    });

    it('должен корректно обрабатывать пустой объект', () => {
      type Original = {};
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toEqualTypeOf<{}>();
    });

    it('должен корректно обрабатывать вложенные объекты с несколькими уровнями', () => {
      type Original = {
        level1: {
          level2: {
            level3: {
              value: string;
            };
          };
        };
      };
      
      type Result = DeepReadonly<Original>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        readonly level1: {
          readonly level2: {
            readonly level3: {
              readonly value: string;
            };
          };
        };
      }>();
    });
  });

  describe('PickedByType<T, U>', () => {
    it('должен выбирать только свойства типа string', () => {
      type Original = {
        name: string;
        age: number;
        city: string;
        isActive: boolean;
      };
      
      type Result = PickedByType<Original, string>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        name: string;
        city: string;
      }>();
      
      // Проверяем, что числовые и булевы свойства исключены
      expectTypeOf<Result>().not.toMatchTypeOf<{
        age: number;
      }>();
      
      expectTypeOf<Result>().not.toMatchTypeOf<{
        isActive: boolean;
      }>();
    });

    it('должен выбирать только свойства типа number', () => {
      type Original = {
        id: number;
        name: string;
        age: number;
        email: string;
        score: number;
      };
      
      type Result = PickedByType<Original, number>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        id: number;
        age: number;
        score: number;
      }>();
      
      expectTypeOf<Result>().not.toMatchTypeOf<{
        name: string;
        email: string;
      }>();
    });

    it('должен выбирать только свойства типа boolean', () => {
      type Original = {
        isActive: boolean;
        name: string;
        isVerified: boolean;
        age: number;
        isAdmin: boolean;
      };
      
      type Result = PickedByType<Original, boolean>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        isActive: boolean;
        isVerified: boolean;
        isAdmin: boolean;
      }>();
      
      expectTypeOf<Result>().not.toMatchTypeOf<{
        name: string;
        age: number;
      }>();
    });

    it('должен выбирать свойства типа object', () => {
      type Original = {
        user: { id: number };
        name: string;
        settings: { theme: string };
        age: number;
        config: { api: string };
      };
      
      type Result = PickedByType<Original, object>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        user: { id: number };
        settings: { theme: string };
        config: { api: string };
      }>();
      
      expectTypeOf<Result>().not.toMatchTypeOf<{
        name: string;
        age: number;
      }>();
    });

    it('должен возвращать пустой объект если нет свойств нужного типа', () => {
      type Original = {
        name: string;
        age: number;
        city: string;
      };
      
      type Result = PickedByType<Original, boolean>;
      
      expectTypeOf<Result>().toEqualTypeOf<{}>();
    });

    it('должен корректно обрабатывать union типы', () => {
      type Original = {
        id: number;
        value: string | number;
        name: string;
        status: 'active' | 'inactive';
      };
      
      type Result = PickedByType<Original, string>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        name: string;
        status: 'active' | 'inactive';
      }>();
      
      // Свойство value имеет тип string | number, оно не должно попасть в результат
      expectTypeOf<Result>().not.toMatchTypeOf<{
        value: string | number;
      }>();
    });

    it('должен корректно обрабатывать опциональные свойства', () => {
      type Original = {
        required: string;
        optional?: string;
        number?: number;
      };
      
      type Result = PickedByType<Original, string>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        required: string;
        optional?: string;
      }>();
    });
  });

  describe('EventHandlers<T>', () => {
    it('должен генерировать обработчики с префиксом "on" и заглавной буквой', () => {
      type Events = {
        click: { x: number; y: number };
        hover: { element: HTMLElement };
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onClick: (event: { x: number; y: number }) => void;
        onHover: (event: { element: HTMLElement }) => void;
      }>();
    });

    it('должен корректно обрабатывать события с разными типами', () => {
      type Events = {
        submit: { formData: FormData };
        change: { value: string };
        focus: { target: HTMLInputElement };
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onSubmit: (event: { formData: FormData }) => void;
        onChange: (event: { value: string }) => void;
        onFocus: (event: { target: HTMLInputElement }) => void;
      }>();
    });

    it('должен корректно обрабатывать события с примитивными типами', () => {
      type Events = {
        load: number;
        error: string;
        success: boolean;
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onLoad: (event: number) => void;
        onError: (event: string) => void;
        onSuccess: (event: boolean) => void;
      }>();
    });

    it('должен корректно обрабатывать события с void типом', () => {
      type Events = {
        init: void;
        destroy: void;
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onInit: (event: void) => void;
        onDestroy: (event: void) => void;
      }>();
    });

    it('должен корректно обрабатывать события с union типами', () => {
      type Events = {
        status: 'loading' | 'success' | 'error';
        data: string | null;
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onStatus: (event: 'loading' | 'success' | 'error') => void;
        onData: (event: string | null) => void;
      }>();
    });

    it('должен сохранять опциональность свойств', () => {
      type Events = {
        required: { data: string };
        optional?: { value: number };
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onRequired: (event: { data: string }) => void;
        onOptional?: (event: { value: number }) => void;
      }>();
    });

    it('должен корректно обрабатывать пустой объект событий', () => {
      type Events = {};
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toEqualTypeOf<{}>();
    });

    it('должен корректно преобразовывать имена с несколькими словами', () => {
      type Events = {
        'drag-start': { x: number };
        'drop-end': { y: number };
        'double-click': { button: number };
      };
      
      type Result = EventHandlers<Events>;
      
      expectTypeOf<Result>().toMatchTypeOf<{
        onDragStart: (event: { x: number }) => void;
        onDropEnd: (event: { y: number }) => void;
        onDoubleClick: (event: { button: number }) => void;
      }>();
    });
  });
});