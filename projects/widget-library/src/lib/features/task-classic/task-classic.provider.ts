import { provideState } from '@ngrx/store';
import { taskClassicReducer } from './store/task-classic.reducer';

export function provideTaskClassicStore() {
  return provideState('taskClassic', taskClassicReducer);
}
