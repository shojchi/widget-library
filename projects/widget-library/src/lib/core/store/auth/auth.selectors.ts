import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AuthStatus } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.status === AuthStatus.AUTHENTICATED
);

export const selectIsAuthenticating = createSelector(
  selectAuthState,
  (state: AuthState) => state.status === AuthStatus.AUTHENTICATING
);

export const selectIsAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.status === AuthStatus.ERROR
);
