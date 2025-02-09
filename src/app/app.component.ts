import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  imports: [SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
}
