import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './auth.state';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Clear Error': emptyProps()
  }
});
