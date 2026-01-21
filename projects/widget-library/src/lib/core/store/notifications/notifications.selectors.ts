import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState, NotificationKey } from './notifications.state';

export const selectNotificationState =
  createFeatureSelector<NotificationState>('notifications');

export const selectToastByKey = (key: NotificationKey) =>
  createSelector(selectNotificationState, state => state.toastsMap[key]);

export const selectVisibleToasts = createSelector(
  selectNotificationState,
  state => state.visibleKeys.map(key => state.toastsMap[key])
);

export const selectToastCount = createSelector(
  selectNotificationState,
  state => state.visibleKeys.length
);

export const selectAbleToShowToast = createSelector(
  selectNotificationState,
  state => state.visibleKeys.length < state.maxVisible
);

