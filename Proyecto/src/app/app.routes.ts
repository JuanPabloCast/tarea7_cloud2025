import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskSearchComponent } from './components/task-search/task-search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

export const routes: Routes = [ 
    {
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent},
    {
        path: 'register', 
        component: RegisterComponent },
    {
        path: 'toolbar',
        component: ToolbarComponent},
    {   
        path: 'add-task',
        component: AddTaskComponent }, 
    {   
        path: 'task-list', 
        component: TaskListComponent },
    {   
        path: 'task-search', 
        component: TaskSearchComponent },
    {
        path: '**', 
        redirectTo: 'login' },
];
