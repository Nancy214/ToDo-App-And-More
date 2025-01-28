import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatSidenavModule,
    MatMenuModule,
    TodoListComponent,
    HeaderComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menuItems = [
    /* { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'task', label: 'Tasks', route: '/tasks' },
    { icon: 'calendar_today', label: 'Calendar', route: '/calendar' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' } */
  ];
}
