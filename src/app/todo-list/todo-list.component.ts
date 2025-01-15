import { Component } from '@angular/core';
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
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
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
      completed: false,
      priority: 'Low',
    },
  ];

  categories = CATEGORIES;
  priorities = PRIORITIES;

  editingToDoId: number | boolean = false;

  constructor(public snackbar: MatSnackBar, private dialog: MatDialog) {}

  startEditing(todoId: number): void {
    this.editingToDoId = todoId;
  }

  cancelEdit(): void {
    this.editingToDoId = false;
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  saveEdit(todoId: number, updatedTitle: string): void {
    const todo = this.todos.find((t) => t.id === todoId);
    if (!todo) return;

    if (!updatedTitle.trim()) {
      this.snackbar.open('Title cannot be empty.', 'Close', {
        duration: 3000,
      });
      return;
    }

    todo.title = updatedTitle;
    this.editingToDoId = false;
    this.snackbar.open('To Do item updated successfully', 'Close', {
      duration: 3000,
    });
  }

  deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
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
        this.snackbar.open('To Do item added', 'Close', { duration: 3000 });
      }
    });
  }
}
