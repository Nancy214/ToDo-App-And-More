import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from '../header/header.component';

interface Filters {
  status: {
    all: boolean;
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
    HeaderComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit {
  filters: Filters = {
    status: {
      all: true,
      completed: false,
      active: false
    },
    priority: {
      high: false,
      medium: false,
      low: false
    },
    category: {
      work: false,
      personal: false,
      home: false
    }
  };

  filteredTodos: any[] = [];

  ngOnInit() {
    //this.filterTasks(event);
    console.log(this.filters.priority);
  }

  clearAll(){
    console.log(this.filters.priority);
    this.filters.status.all = false;
    this.filters.status.completed = false;
    this.filters.status.active = false;
    this.filters.priority.high = false;
    this.filters.priority.medium = false;
    this.filters.priority.low = false;
    this.filters.category.work = false;
    this.filters.category.personal = false;
    this.filters.category.home = false;
    console.log(this.filters.priority);
    //this.filterTasks();
    
  }

  filterTasks(event: any) {
    // Implement your filtering logic here based on this.filters
    // You'll need to get the todos from a service and filter them
    // Then update filteredTodos which will be passed to todo-list component
    console.log(event.checked);
  }
}
