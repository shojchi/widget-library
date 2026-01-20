import { createReducer, on } from '@ngrx/store';
import { NotificationsActions } from './notifications.actions';
import { initialNotificationState, Toast } from './notifications.state';

export const notificationsReducer = createReducer(
  initialNotificationState,

  on(
    NotificationsActions.showToast,
    (state, { toastType, message, key, duration, dismissible }) => {
      const existingToast = state.toastsMap[key];
      const now = Date.now();

      const toastDuration = duration ?? 5000;
      const toastDismissible = dismissible ?? true;

      if (existingToast) {
        return {
          ...state,
          toastsMap: {
            ...state.toastsMap,
            [key]: {
              ...existingToast,
              count: existingToast.count + 1,
              lastOccurredAt: now
            }
          }
        };
      } else {
        const newToast: Toast = {
          id: crypto.randomUUID(),
          toastType,
          message,
          key,
          count: 1,
          firstOccurredAt: now,
          lastOccurredAt: now,
          duration: toastDuration,
          dismissible: toastDismissible
        };

        const newVisibleKeys =
          state.visibleKeys.length < state.maxVisible
            ? [...state.visibleKeys, key]
            : state.visibleKeys;

        return {
          ...state,
          toastsMap: {
            ...state.toastsMap,
            [key]: newToast
          },
          visibleKeys: newVisibleKeys
        };
      }
    }
  ),

  on(NotificationsActions.dismissToast, (state, { key }) => ({
    ...state,
    visibleKeys: state.visibleKeys.filter(k => k !== key)
  })),

  on(NotificationsActions.autoDismissToast, (state, { key }) => ({
    ...state,
    visibleKeys: state.visibleKeys.filter(k => k !== key)
  })),

  on(NotificationsActions.dismissAllToasts, state => ({
    ...state,
    visibleKeys: []
  })),

  on(NotificationsActions.updatePosition, (state, { position }) => ({
    ...state,
    position
  }))
);
