import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceType, ViewportState } from './viewport.state';

export const selectViewportState = createFeatureSelector<ViewportState>('viewport');

export const selectBreakpoint = createSelector(
  selectViewportState,
  (state: ViewportState) => state.breakpoint
);

export const selectDeviceType = createSelector(
  selectViewportState,
  (state: ViewportState) => state.deviceType
);

export const selectIsMobile = createSelector(
  selectDeviceType,
  (deviceType: DeviceType) => deviceType === 'mobile'
);
export const selectIsTablet = createSelector(
  selectDeviceType,
  (deviceType: DeviceType) => deviceType === 'tablet'
);
export const selectIsDesktop = createSelector(
  selectDeviceType,
  (deviceType: DeviceType) => deviceType === 'desktop'
);
