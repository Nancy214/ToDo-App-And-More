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

import { Todo } from '../models/todo';
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
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos: Todo[] = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Clean the house', completed: false },
    { id: 3, title: 'Workout', completed: false },
  ];

  editingToDoId: number | boolean = false;
  newToDoTitle: string = '';

  constructor(public snackbar: MatSnackBar, private dialog: MatDialog) {}

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  startEditing(todoId: number): void {
    this.editingToDoId = todoId;
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

  cancelEdit(): void {
    this.editingToDoId = false;
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
          completed: false,
        };
        this.todos.push(newTodo);
        this.snackbar.open('To Do item added', 'Close', { duration: 3000 });
      }
    });
  }
}
