import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 *
 */
@Component({
  selector: 'wdg-widget-library',
  imports: [],
  template: ` <p>widget-library works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetLibrary {}
