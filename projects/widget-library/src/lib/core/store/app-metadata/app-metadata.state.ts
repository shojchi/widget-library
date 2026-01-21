import packageJson from '../../../../../../../package.json';

export type Environment = 'development' | 'staging' | 'production';

export interface FeatureFlags {
  enableBetaWidgets: boolean;
  enableAnalytics: boolean;
  debugMode: boolean;
}

export interface AppMetadataState {
  environment: Environment;
  apiEndpoint: string;
  locale: string;
  timezone: string;
  features: FeatureFlags;
  appVersion: string;
  buildTimestamp: number;
}

export const initialAppMetadataState: AppMetadataState = {
  environment: 'development',
  apiEndpoint: 'http://localhost:3000',
  locale: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  features: {
    enableBetaWidgets: false,
    enableAnalytics: false,
    debugMode: false
  },
  appVersion: packageJson.version,
  buildTimestamp: Date.now()
};
