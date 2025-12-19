import { Injectable, Inject, Optional } from '@angular/core';
import { SDK_CONFIG } from './widgets-config.token';
import { WidgetLibraryConfig } from './widgets-config.interface';

const DEFAULT_CONFIG: WidgetLibraryConfig = {
  api: {
    graphqlEndpoint: 'http://localhost:3000/graphql', // Default local dev
    timeout: 30000 // 30 seconds
  },
  state: {
    enableDevTools: false,
    enableRuntimeChecks: false
  },
  ui: {
    theme: 'light',
    primaryColor: '#3f51b5'
  },
  features: {
    analytics: false,
    offlineSupport: true
  },
  errorHandling: {
    displayStrategy: 'toast',
    logToConsole: true
  }
};