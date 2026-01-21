import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProcess } from './loading.state';

export const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    'Start Loading': props<{ process: LoadingProcess; startedAt: number }>(),
    'Complete Loading': props<{ id: string }>(),
    'Clear All Loadings': emptyProps()
  }
});
