import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingProcess, LoadingState } from './loading.state';

export const selectLoadingState = createFeatureSelector<LoadingState>('loading');

export const selectActiveOperations = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.activeOperations
);

export const selectIsLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.activeOperations.length > 0
);

export const selectLoadingStartedAt = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.startedAt
);

export const selectLoadingData = createSelector(
  selectLoadingState,
  (state: LoadingState) => ({
    isLoading: state.activeOperations.length > 0,
    startedAt: state.startedAt,
    delayBeforeSpinner: state.delayBeforeSpinner
  })
);
