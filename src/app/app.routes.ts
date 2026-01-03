import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevLabComponent } from './components/dev-lab/dev-lab.component';
import { provideTaskStore } from '@lib/features/task/task-store.provider';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'dev',
    children: [
      {
        path: '',
        component: DevLabComponent,
        providers: [provideTaskStore()]
      }
    ]
  }
];
