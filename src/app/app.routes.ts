import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GraphQLPlaygroundComponent } from './components/graphql-playground/graphql-playground.component';
import { ApolloTestComponent } from './components/apollo-test/apollo-test.component';
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
        path: 'graphql-playground',
        component: GraphQLPlaygroundComponent
      },
      {
        path: 'apollo-test',
        component: ApolloTestComponent,
        providers: [provideTaskStore()]
      }
    ]
  }
];
