import { createReducer, on } from '@ngrx/store';
import { initialAppMetadataState } from './app-metadata.state';
import { AppMetadataActions } from './app-metadata.actions';

export const appMetadataReducer = createReducer(
  initialAppMetadataState,
  on(AppMetadataActions.setLocale, (state, { locale }) => ({
    ...state,
    locale
  })),
  on(AppMetadataActions.setEnvironment, (state, { environment }) => ({
    ...state,
    environment
  })),
  on(AppMetadataActions.toggleFeature, (state, { feature }) => ({
    ...state,
    features: {
      ...state.features,
      [feature]: !state.features[feature]
    }
  }))
);
