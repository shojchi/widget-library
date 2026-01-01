import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GraphQLPlaygroundComponent } from './components/graphql-playground/graphql-playground.component';
import { ApolloTestComponent } from './components/apollo-test/apollo-test.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'graphql-playground',
    component: GraphQLPlaygroundComponent
  },
  {
    path: 'apollo-test',
    component: ApolloTestComponent
  }
];
