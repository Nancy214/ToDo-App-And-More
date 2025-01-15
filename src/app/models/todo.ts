export interface Todo {
  id: number;
  title: string;
  category: string;
  priority: string;
  completed: boolean;
}

export const CATEGORIES = ['Work', 'Personal', 'Home'];

export const PRIORITIES = ['High', 'Medium', 'Low'];
