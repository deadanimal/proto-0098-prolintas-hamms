import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const PagesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
]