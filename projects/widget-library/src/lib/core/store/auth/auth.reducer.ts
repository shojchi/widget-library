import { createReducer, on } from '@ngrx/store';
import { AuthStatus, initialAuthState } from './auth.state';
import { AuthActions } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({
    ...state,
    status: AuthStatus.AUTHENTICATING,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    status: AuthStatus.AUTHENTICATED,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    status: AuthStatus.ERROR,
    user: null,
    error
  })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.clearError, state => ({
    ...state,
    error: null
  }))
);
