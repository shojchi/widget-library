// 1. Type definitions
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// 2. Notification keys enum for grouping
export enum NotificationKey {
  TASK_CREATE_SUCCESS = 'TASK_CREATE_SUCCESS',
  TASK_CREATE_ERROR = 'TASK_CREATE_ERROR',
  TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS',
  TASK_UPDATE_ERROR = 'TASK_UPDATE_ERROR',
  TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS',
  TASK_DELETE_ERROR = 'TASK_DELETE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  GENERIC_ERROR = 'GENERIC_ERROR',
  GENERIC_SUCCESS = 'GENERIC_SUCCESS'
}

// 3. Toast interface
export interface Toast {
  id: string;
  toastType: ToastType;
  message: string;
  key: NotificationKey;
  count: number;
  firstOccurredAt: number;
  lastOccurredAt: number;
  duration: number;
  dismissible: boolean;
}

// 4. Notification state
export interface NotificationState {
  toastsMap: Record<string, Toast>;
  visibleKeys: string[];
  position: ToastPosition;
  maxVisible: number;
}

// 5. Initial state
export const initialNotificationState: NotificationState = {
  toastsMap: {},
  visibleKeys: [],
  position: 'top-right',
  maxVisible: 3
};
