import { createReducer, on } from '@ngrx/store';
import { initialWidgetRegistryState } from './widget-registry.state';
import { WidgetRegistryActions } from './widget-registry.actions';

export const widgetRegistryReducer = createReducer(
  initialWidgetRegistryState,
  on(WidgetRegistryActions.registerWidget, (state, { id }) => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: {
        id,
        loadedAt: null,
        status: 'idle'
      }
    }
  })),
  on(WidgetRegistryActions.widgetLoading, (state, { id }) => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: {
        id,
        loadedAt: null,
        status: 'loading'
      }
    }
  })),
  on(WidgetRegistryActions.widgetLoaded, (state, { id, loadedAt }) => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: {
        id,
        loadedAt,
        status: 'ready'
      }
    }
  })),
  on(WidgetRegistryActions.widgetError, (state, { id, errorMessage }) => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: {
        id,
        loadedAt: null,
        status: 'error',
        errorMessage
      }
    }
  })),
  on(WidgetRegistryActions.unregisterWidget, (state, { id }) => {
    const { [id]: removed, ...remainingWidgets} = state.widgets;
    return {
      ...state,
      widgets: remainingWidgets
    };
  })
);
