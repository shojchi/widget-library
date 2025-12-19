import { InjectionToken } from '@angular/core';
import { MySdkConfig } from './widgets-config.interface';


export const SDK_CONFIG = new InjectionToken<MySdkConfig>(
    'SDK_CONFIG',
    {
        providedIn: 'root',
        factory: () => {
            throw new Error(
                'SDK_CONFIG must be provided using MySdkModule.forRoot()'
            );
        }
    }
);