import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResolvedTheme, ThemeState } from "./theme.state";

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectThemePreference = createSelector(
    selectThemeState,
    (state: ThemeState) => state.preference
);

export const selectResolvedTheme = createSelector(
    selectThemeState,
    (state: ThemeState) => state.resolved
);

export const selectIsDarkMode = createSelector(
    selectResolvedTheme,
    (theme: ResolvedTheme) => theme === 'dark'
);