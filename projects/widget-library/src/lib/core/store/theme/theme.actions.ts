import { createActionGroup, props } from "@ngrx/store";
import { ResolvedTheme, ThemePreference } from "./theme.state";

export const ThemeActions = createActionGroup({
  source: 'Theme',
  events: {
    'Set Preference': props<{preference: ThemePreference}>(),
    'System Preference Changed': props<{systemTheme: ResolvedTheme}>(),
    'Resolved Theme Updated': props<{resolved: ResolvedTheme}>(),
  }
})