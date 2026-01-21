import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppMetadataState, FeatureFlags } from './app-metadata.state';

export const selectAppMetadataState =
  createFeatureSelector<AppMetadataState>('appMetadata');

export const selectEnvironment = createSelector(
  selectAppMetadataState,
  (state: AppMetadataState) => state.environment
);

export const selectLocale = createSelector(
  selectAppMetadataState,
  (state: AppMetadataState) => state.locale
);

export const selectFeatureFlags = createSelector(
  selectAppMetadataState,
  (state: AppMetadataState) => state.features
);

export const selectFeatureFlag = (feature: keyof FeatureFlags) =>
  createSelector(selectFeatureFlags, (features: FeatureFlags) => features[feature]);
