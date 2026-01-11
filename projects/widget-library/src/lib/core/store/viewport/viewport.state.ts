export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const BREAKPOINTS = {
  xs: 375, // Mobile portrait (iPhone, small phones)
  sm: 640, // Mobile landscape
  md: 768, // Tablet portrait
  lg: 1024, // Tablet landscape / Small desktop
  xl: 1280 // Desktop
} as const;

export interface ViewportState {
    breakpoint: Breakpoint;
    deviceType: DeviceType;
}

export const initialViewportState: ViewportState = {
    breakpoint: 'xl',
    deviceType: 'desktop'
};
