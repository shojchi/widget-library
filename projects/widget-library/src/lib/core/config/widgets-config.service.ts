// src/lib/core/config/sdk-config.service.ts
import { Injectable, inject, InjectFlags } from '@angular/core';
import { WIDGET_LIBRARY_CONFIG } from './widgets-config.token';
import { WidgetLibraryConfig, PartialWidgetLibraryConfig } from './widgets-config.interface';

// Default configuration - production safe
const DEFAULT_CONFIG: WidgetLibraryConfig = {
  api: {
    graphqlEndpoint: 'http://localhost:3000/graphql', // Encourage local dev
    timeout: 30000,
    enableInterceptors: false
  },
  state: {
    enableDevTools: false,
    enableRuntimeChecks: false,
    serializability: 'warn'
  },
  ui: {
    theme: 'light',
    primaryColor: '#3f51b5',
    cssPrefix: 'my-sdk'
  },
  features: {
    analytics: false,
    offlineSupport: true,
    subscriptions: false,
    experimental: false
  },
  logging: {
    level: 'warn',
    console: false,
    errorDisplay: 'toast'
  }
};

// Check if we're in development mode
const isDevMode = () => {
  try {
    return typeof window !== 'undefined' &&
      (window as any).ngDevMode !== false;
  } catch {
    return false;
  }
};

// Deep merge utility
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }

  return result;
}

@Injectable({
  providedIn: 'root'
})
export class SdkConfigService {
  private readonly _config: WidgetLibraryConfig;
  private readonly _isDev: boolean;

  constructor() {
    // Inject config with optional flag - might not be available yet
    const userConfig = inject(WIDGET_LIBRARY_CONFIG, InjectFlags.Optional);
    this._isDev = isDevMode();

    // Merge user config with defaults
    this._config = this.buildConfig(userConfig);

    // Validate final config
    this.validateConfig(this._config);

    // Apply dev mode overrides
    if (this._isDev) {
      this.applyDevOverrides();
    }

    // Log initialization if enabled
    if (this._config.logging?.console && this._config.logging.level === 'debug') {
      console.debug('MySdk initialized with config:', this._config);
    }
  }

  /**
   * Get the current configuration (readonly)
   */
  get config(): Readonly<WidgetLibraryConfig> {
    return this._config;
  }

  /**
   * Get a specific configuration section
   */
  getSection<T extends keyof WidgetLibraryConfig>(section: T): Readonly<WidgetLibraryConfig[T]> {
    return this._config[section];
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(feature: keyof WidgetLibraryConfig['features']): boolean {
    return !!this._config.features?.[feature];
  }

  /**
   * Update configuration at runtime (use with caution)
   */
  updateConfig(updates: PartialWidgetLibraryConfig): void {
    const newConfig = deepMerge(this._config, updates);
    this.validateConfig(newConfig);
    Object.assign(this._config, newConfig);

    if (this._config.logging?.console) {
      console.info('MySdk configuration updated:', updates);
    }
  }

  private buildConfig(userConfig?: Partial<WidgetLibraryConfig>): WidgetLibraryConfig {
    // Start with defaults
    let config = { ...DEFAULT_CONFIG };

    // Apply user config if provided
    if (userConfig) {
      config = deepMerge(config, userConfig);
    }

    return config;
  }

  private applyDevOverrides(): void {
    const devConfig: PartialWidgetLibraryConfig = {
      api: {
        enableInterceptors: true
      },
      state: {
        enableDevTools: true,
        enableRuntimeChecks: true
      },
      logging: {
        console: true,
        level: 'info'
      }
    };

    Object.assign(this._config, deepMerge(this._config, devConfig));
  }

  private validateConfig(config: WidgetLibraryConfig): void {
    const { api, ui, logging } = config;

    // Validate required fields
    if (!api.graphqlEndpoint?.trim()) {
      throw new Error('[MySdk] Configuration error: graphqlEndpoint is required');
    }

    // Validate URL format
    try {
      new URL(api.graphqlEndpoint);
    } catch {
      throw new Error(
        `[MySdk] Configuration error: Invalid graphqlEndpoint URL: ${api.graphqlEndpoint}`
      );
    }

    // Validate timeout
    if (api.timeout && api.timeout < 100) {
      throw new Error(
        `[MySdk] Configuration error: timeout must be at least 100ms, got ${api.timeout}`
      );
    }

    // Validate theme
    const validThemes = ['light', 'dark', 'system'];
    if (ui?.theme && !validThemes.includes(ui.theme)) {
      throw new Error(
        `[MySdk] Configuration error: Invalid theme "${ui.theme}". Must be one of: ${validThemes.join(', ')}`
      );
    }

    // Validate log level
    const validLevels = ['debug', 'info', 'warn', 'error', 'off'];
    if (logging?.level && !validLevels.includes(logging.level)) {
      throw new Error(
        `[MySdk] Configuration error: Invalid log level "${logging.level}". Must be one of: ${validLevels.join(', ')}`
      );
    }
  }
}