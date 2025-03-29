import { Routes } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    },
    {
        path: "dashboard",
        loadComponent: () => import("./modules/dashboard/dashboard.component").then((m) => m.DashboardComponent),
        canActivate: [AuthGuard],
        children: [
            { path: 'users', loadComponent: () => import('./modules/users/users.component').then(m => m.UsersComponent) },
            { path: 'tasks', loadComponent: () => import('./modules/tasks/tasks.component').then(m => m.TasksComponent) }
        ]
    },
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    }
];
