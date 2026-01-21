import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NotificationKey, ToastPosition, ToastType } from './notifications.state';

export const NotificationsActions = createActionGroup({
  source: 'Notifications',
  events: {
    'Show Toast': props<{
      toastType: ToastType;
      message: string;
      key: NotificationKey;
      duration?: number;
      dismissible?: boolean;
      timestamp: number;
      id?: string;
    }>(),
    'Dismiss Toast': props<{ key: NotificationKey }>(),
    'Dismiss All Toasts': emptyProps(),
    'Auto Dismiss Toast': props<{ key: NotificationKey }>(),
    'Update Position': props<{ position: ToastPosition }>()
  }
});
