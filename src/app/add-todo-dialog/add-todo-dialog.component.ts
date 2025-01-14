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
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.scss',
})
export class AddTodoDialogComponent {
  newTodoTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    public snackbar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.newTodoTitle.trim()) {
      this.snackbar.open('Please enter a valid title', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.dialogRef.close({
      title: this.newTodoTitle,
    });
  }
}
