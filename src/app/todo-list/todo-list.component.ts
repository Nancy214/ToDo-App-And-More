import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { CATEGORIES, PRIORITIES, Todo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() set filteredTodos(todos: Todo[]) {
    if (todos && todos.length > 0) {
      this.todos = todos;
    }
  }

  todos: Todo[] = [
    {
      id: 1,
      title: 'Write 5 pages',
      category: 'Work',
      completed: false,
      priority: 'High',
    },
    {
      id: 2,
      title: 'Proofread documents',
      category: 'Work',
      completed: false,
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Walk 5 miles',
      category: 'Personal',
      completed: false,
      priority: 'Low',
    },
    {
      id: 4,
      title: 'Do skincare',
      category: 'Personal',
      completed: false,
      priority: 'High',
    },
    {
      id: 5,
      title: 'Buy groceries',
      category: 'Home',
      completed: false,
      priority: 'Medium',
    },
    {
      id: 6,
      title: 'Change towels',
      category: 'Home',
      completed: true,
      priority: 'Low',
    },
  ];

  categories = CATEGORIES;
  priorities = PRIORITIES;

  editingToDoId: number | boolean = false;
  selectedCategory: string = '';
  searchText: string = '';
  private allTodos: Todo[] = [];

  constructor(public snackbar: MatSnackBar, private dialog: MatDialog) {
    this.allTodos = [...this.todos];
  }

/*   get filteredTodos(): Todo[] {
    return this.todos.filter(todo => {
      const matchesSearch = this.searchText ? 
        todo.title.toLowerCase().includes(this.searchText.toLowerCase()) : true;
      const matchesCategory = this.selectedCategory ? 
        todo.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  } */

  onSearch(): void {
    if (!this.searchText) {
      this.todos = [...this.allTodos];
      return;
    }

    this.todos = this.allTodos.filter(todo =>
      todo.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleCompletion(todo: Todo): void {
    const index = this.todos.findIndex(t => t.id === todo.id);
    this.todos[index] = { ...todo, completed: !todo.completed };
    
    if (this.todos[index].completed) {
      this.snackbar.open('Task completed! 🎉', 'Close', {
        duration: 3000,
      });
    }
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.allTodos = this.allTodos.filter((todo) => todo.id !== todoId);
    this.snackbar.open('To Do item deleted', 'Close', {
      duration: 3000,
    });
  }

  openAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTodo: Todo = {
          id: this.todos.length + 1,
          title: result.title,
          category: result.category,
          completed: false,
          priority: result.priority,
        };
        this.todos.push(newTodo);
        this.allTodos.push(newTodo);
        this.snackbar.open('To Do item added', 'Close', { duration: 3000 });
      }
    });
  }

  openEditTodoDialog(todo: any): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      data: todo,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        todo.title = result.title;
        todo.category = result.category;
        todo.priority = result.priority;
      }
    });
  }
}
