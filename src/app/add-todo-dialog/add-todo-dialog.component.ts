import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { CATEGORIES, PRIORITIES } from '../models/todo';

@Component({
  selector: 'app-add-todo-dialog',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.scss',
})
export class AddTodoDialogComponent {
  title: string = '';
  category: string = '';
  priority: string = '';

  categories = CATEGORIES;
  prorities = PRIORITIES;

  constructor(
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editTodo: any
  ) {
    if (editTodo) {
      this.title = editTodo.title || '';
      this.category = editTodo.category || '';
      this.priority = editTodo.priority || '';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.title.trim()) {
      this.snackbar.open('Title cannot be empty', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.dialogRef.close({
      title: this.title,
      category: this.category,
      priority: this.priority,
    });
  }
}
