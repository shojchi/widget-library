import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { taskReducer } from './store/task.reducer';
import { TaskEffects } from './store/task.effects';

export function provideTaskStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState('tasks', taskReducer),
    provideEffects([TaskEffects])
  ]);
}
