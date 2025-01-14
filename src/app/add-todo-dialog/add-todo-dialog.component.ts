import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { CATEGORIES } from '../models/todo';

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
  newTodoTitle: string = '';
  newTodoCategory: string = '';

  categories = CATEGORIES;

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    public snackbar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.newTodoTitle.trim() || !this.newTodoCategory) {
      this.snackbar.open('Please fill in all fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.dialogRef.close({
      title: this.newTodoTitle,
      category: this.newTodoCategory,
    });
  }
}
