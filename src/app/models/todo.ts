export interface Todo {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

export const CATEGORIES = ['Work', 'Personal', 'Home'];
