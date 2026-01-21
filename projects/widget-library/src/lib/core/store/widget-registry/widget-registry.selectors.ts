import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WidgetRegistryState, WidgetStatus } from './widget-registry.state';

export const selectWidgetRegistryState =
  createFeatureSelector<WidgetRegistryState>('widgetRegistry');

export const selectAllWidgets = createSelector(
  selectWidgetRegistryState,
  (state: WidgetRegistryState) => state.widgets
);

export const selectAllLoadedWidgets = createSelector(
  selectWidgetRegistryState,
  (state: WidgetRegistryState) =>
    Object.values(state.widgets).filter(widget => widget.status === 'ready')
);

export const selectWidgetById = (id: string) =>
  createSelector(
    selectWidgetRegistryState,
    (state: WidgetRegistryState) => state.widgets[id]
  );

export const selectAllBrokenWidgets = createSelector(
  selectWidgetRegistryState,
  (state: WidgetRegistryState) =>
    Object.values(state.widgets).filter(widget => widget.status === 'error')
);

export const selectIsAnyWidgetLoading = createSelector(
  selectWidgetRegistryState,
  (state: WidgetRegistryState) =>
    Object.values(state.widgets).some(widget => widget.status === 'loading')
);

export const selectWidgetCountByStatus = createSelector(
  selectWidgetRegistryState,
  (state: WidgetRegistryState) =>
    Object.values(state.widgets).reduce((acc, widget) => {
      acc[widget.status] = (acc[widget.status] || 0) + 1;
      return acc;
    }, {} as Record<WidgetStatus, number>)
);
