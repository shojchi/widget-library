import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { taskClassicReducer } from './store/task-classic.reducer';
import { TaskClassicEffects } from './store/task-classic.effects';

export function provideTaskClassicStore() {
  return [
    provideState('taskClassic', taskClassicReducer),
    provideEffects([TaskClassicEffects])
  ];
}
