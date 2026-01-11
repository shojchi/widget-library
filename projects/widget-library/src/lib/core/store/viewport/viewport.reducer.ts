import { createReducer, on } from '@ngrx/store';
import { initialViewportState } from './viewport.state';
import { ViewportActions } from './viewport.actions';

export const viewportReducer = createReducer(
  initialViewportState,
  on(ViewportActions.breakpointChanged, (state, { breakpoint }) => ({
    ...state,
    breakpoint
  })),
  on(ViewportActions.deviceTypeChanged, (state, { deviceType }) => ({
    ...state,
    deviceType
  }))
);
