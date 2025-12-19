import { InjectionToken, inject } from '@angular/core';
import { WidgetLibraryConfig } from './widgets-config.interface';

/**
 * Injection token for SDK configuration
 * Used internally - consumers should use provideMySdk()
 */
export const WIDGET_LIBRARY_CONFIG = new InjectionToken<WidgetLibraryConfig>(
  'WidgetLibrary.Config',
  {
    providedIn: 'root',
    factory: (): WidgetLibraryConfig => {
      throw new Error(
        'WidgetLibrary is not configured. Please call provideWidgetLibrary() in your application providers.'
      );
    }
  }
);

/**
 * Helper function to inject the SDK configuration
 */
export function injectSdkConfig(): WidgetLibraryConfig {
  const config = inject(WIDGET_LIBRARY_CONFIG, { optional: true });

  if (!config) {
    throw new Error('WidgetLibrary is not configured. Call provideWidgetLibrary() first.');
  }

  return config;
}