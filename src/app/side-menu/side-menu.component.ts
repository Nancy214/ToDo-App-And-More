import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from '../header/header.component';
import { Todo } from '../models/todo';

interface Filters {
  status: {
    completed: boolean;
    active: boolean;
  };
  priority: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  category: {
    work: boolean;
    personal: boolean;
    home: boolean;
  };
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    TodoListComponent,
    HeaderComponent,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<Filters>();
  @Input() todos: Todo[] = [];

  filters: Filters = {
    status: {
      completed: false,
      active: false,
    },
    priority: {
      high: false,
      medium: false,
      low: false,
    },
    category: {
      work: false,
      personal: false,
      home: false,
    },
  };

  filteredTodos: Todo[] = [];

  ngOnInit() {
    this.filteredTodos = [...this.todos];
  }

  private updateFilteredTodos() {
    this.filteredTodos = this.todos.filter((todo) => {
      // Status filter
      const statusFilter =
        (!this.filters.status.completed && !this.filters.status.active) || // No status filter selected
        (this.filters.status.completed && todo.completed) || // Completed filter matches
        (this.filters.status.active && !todo.completed); // Active filter matches

      // Priority filter
      const priorityFilter =
        (!this.filters.priority.high &&
          !this.filters.priority.medium &&
          !this.filters.priority.low) || // No priority filter selected
        this.filters.priority[
          todo.priority.toLowerCase() as 'high' | 'medium' | 'low'
        ]; // Priority filter matches

      // Category filter
      const categoryFilter =
        (!this.filters.category.work &&
          !this.filters.category.personal &&
          !this.filters.category.home) || // No category filter selected
        this.filters.category[
          todo.category.toLowerCase() as 'work' | 'personal' | 'home'
        ]; // Category filter matches

      return statusFilter && priorityFilter && categoryFilter;
    });
  }

  clearAll(filterType: 'status' | 'priority' | 'category'): void {
    // Reset all checkboxes for the specified filter type
    Object.keys(this.filters[filterType] as Record<string, boolean>).forEach(
      (key) => {
        (this.filters[filterType] as Record<string, boolean>)[key] = false;
      }
    );

    // Emit the updated filters
    this.filterChanged.emit(this.filters);
    this.updateFilteredTodos();
  }

  filterTasks(event: {
    source: any;
    filterType: 'status' | 'priority' | 'category';
    value: string;
  }) {
    // Update the filter state
    (this.filters[event.filterType] as Record<string, boolean>)[event.value] =
      event.source.checked;

    // Emit the updated filters
    this.filterChanged.emit(this.filters);
    this.updateFilteredTodos();
  }
}
