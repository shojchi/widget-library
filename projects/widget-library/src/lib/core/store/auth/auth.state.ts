// export type AuthStatus = 'anonymous' | 'authenticating' | 'authenticated' | 'error';

export enum AuthStatus {
  ANONYMOUS = 'anonymous',
  AUTHENTICATING = 'authenticating',
  AUTHENTICATED = 'authenticated',
  ERROR = 'error'
}

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  status: AuthStatus.ANONYMOUS,
  user: null,
  error: null
};
