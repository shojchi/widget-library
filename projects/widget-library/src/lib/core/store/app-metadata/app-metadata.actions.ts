import { createActionGroup, props } from '@ngrx/store';
import { Environment, FeatureFlags } from './app-metadata.state';

export const AppMetadataActions = createActionGroup({
  source: 'App Metadata',
  events: {
    'Set Locale': props<{ locale: string }>(),
    'Set Environment': props<{ environment: Environment }>(),
    'Toggle Feature': props<{ feature: keyof FeatureFlags; enabled: boolean }>()
  }
});
