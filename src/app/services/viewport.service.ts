import { DestroyRef, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map } from 'rxjs';
import { Breakpoint, DeviceType, ViewportActions } from 'widget-library';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  public initializeViewportListener(): void {
    this.updateViewport(window.innerWidth);

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        map(() => window.innerWidth),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(width => this.updateViewport(width));
  }

  updateViewport(width: number): void {
    const breakpoint = this.calculateBreakpoint(width);
    const deviceType = this.calculateDeviceType(breakpoint);

    this.store.dispatch(ViewportActions.breakpointChanged({ breakpoint }));
    this.store.dispatch(ViewportActions.deviceTypeChanged({ deviceType }));
  }

  private calculateBreakpoint(width: number): Breakpoint {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  }

  private calculateDeviceType(breakpoint: Breakpoint): DeviceType {
    if (breakpoint === 'xs' || breakpoint === 'sm') return 'mobile';
    if (breakpoint === 'md' || breakpoint === 'lg') return 'tablet';
    return 'desktop';
  }
}
