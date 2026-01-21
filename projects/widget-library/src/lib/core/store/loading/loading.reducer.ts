import { createReducer, on } from '@ngrx/store';
import { initialLoadingState } from './loading.state';
import { LoadingActions } from './loading.actions';

export const loadingReducer = createReducer(
  initialLoadingState,
  on(
    LoadingActions.startLoading,
    (state, { process, startedAt }) => {
      const newOperations = [...state.activeOperations, process];

      return {
        ...state,
        activeOperations: newOperations,
        startedAt: state.startedAt ?? startedAt
      };
    }
  ),
  on(LoadingActions.completeLoading, (state, { id }) => {
    const newOperations = state.activeOperations.filter(op => op.id !== id);
    const newStartedAt = newOperations.length === 0 ? null : state.startedAt;
    return { ...state, activeOperations: newOperations, startedAt: newStartedAt };
  }),
  on(LoadingActions.clearAllLoadings, () => initialLoadingState)
);
