import { createActionGroup, props } from "@ngrx/store";

export const WidgetRegistryActions = createActionGroup({
  source: 'Widget Registry',
  events: {
    'Register Widget': props<{ id: string }>(),
    'Widget Loading': props<{ id: string }>(),
    'Widget Loaded': props<{ id: string, loadedAt: number }>(),
    'Widget Error': props<{ id: string; errorMessage: string }>(),
    'Unregister Widget': props<{ id: string }>()
  }
});