export type WidgetStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface WidgetInfo {
  id: string; // Unique widget identifier
  loadedAt: number | null; // Timestamp when loaded, null if not loaded
  status: WidgetStatus;
  errorMessage?: string; // Present only if status === 'error'
}

export interface WidgetRegistryState {
  widgets: Record<string, WidgetInfo>; // Key = widget ID
}

export const initialWidgetRegistryState: WidgetRegistryState = {
  widgets: {}
};