import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';

export function provideTaskStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState('tasks', taskReducer)
  ]);
}