import { createReducer, on } from '@ngrx/store';
import { initialLoadingState } from './loading.state';
import { LoadingActions } from './loading.actions';

export const loadingReducer = createReducer(
  initialLoadingState,

  on(LoadingActions.startLoading, (state, { process, startedAt }) => ({
    ...state,
    operations: {
      ...state.operations,
      [process.operationName]: { ...process, startedAt }
    }
  })),

  on(LoadingActions.completeLoading, (state, { operationName }) => {
    const { [operationName]: removed, ...remaining } = state.operations;

    return {
      ...state,
      operations: remaining
    };
  }),

  on(LoadingActions.clearAllLoadings, () => initialLoadingState)
);
