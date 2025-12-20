import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Main widget library component - entry point for the widget ecosystem
 * Uses Angular signals for reactive state management
 */
@Component({
  selector: 'wdg-widget-library',
  standalone: true,
  imports: [],
  template: `
    <div class="wdg-widget-library">
      <h2>{{ title() }}</h2>
      <p>Widget Library initialized with {{ widgetCount() }} widgets</p>
      <div class="wdg-status">Status: {{ isReady() ? 'Ready' : 'Initializing...' }}</div>
    </div>
  `,
  styles: [
    `
      .wdg-widget-library {
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f9f9f9;
      }

      .wdg-status {
        margin-top: 0.5rem;
        font-weight: 500;
        color: #666;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetLibrary {
  /** Library title signal */
  title = signal('Angular Widget Library');

  /** Number of registered widgets */
  widgetCount = signal(0);

  /** Ready state signal */
  isReady = signal(false);

  constructor() {
    // Simulate initialization
    setTimeout(() => {
      this.isReady.set(true);
      this.widgetCount.set(1); // This component counts as 1
    }, 100);
  }
}
