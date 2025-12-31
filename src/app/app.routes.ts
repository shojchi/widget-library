import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GraphQLPlaygroundComponent } from './graphql-playground/graphql-playground.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'graphql-playground',
    component: GraphQLPlaygroundComponent
  }
];
