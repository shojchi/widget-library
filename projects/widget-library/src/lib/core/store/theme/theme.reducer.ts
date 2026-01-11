import { createReducer, on } from '@ngrx/store';
import { ThemeActions } from './theme.actions';
import { initialThemeState } from './theme.state';

export const themeReducer = createReducer(
  initialThemeState,
  on(ThemeActions.setPreference, (state, { preference }) => ({
    ...state,
    preference,
    resolved: preference === 'system' ? state.resolved : preference
  })),
  on(ThemeActions.systemPreferenceChanged, (state, { systemTheme }) => ({
    ...state,
    resolved: state.preference === 'system' ? systemTheme : state.resolved
  })),
  on(ThemeActions.resolvedThemeUpdated, (state, { resolved }) => ({
    ...state,
    resolved
  }))
);
