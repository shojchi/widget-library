import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingProcess, LoadingState } from './loading.state';

export const selectLoadingState = createFeatureSelector<LoadingState>('loading');

export const selectAllOperations = createSelector(selectLoadingState, state =>
  Object.values(state.operations)
);

export const selectIsLoading = createSelector(
  selectAllOperations,
  oprations => oprations.length > 0
);

export const selectIsOperationLoading = (operationName: string) =>
  createSelector(
    selectLoadingState,
    (state: LoadingState) => !!state.operations[operationName]
  );
