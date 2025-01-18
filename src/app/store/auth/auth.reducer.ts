import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import type { IAuthState } from './auth.state';

export const authFeatureKey = 'auth';

export const initialState: IAuthState = {
  currentUser: null,
  status: 'idle',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  //   Sign up
  on(AuthActions.signUp, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(AuthActions.signUpSuccess, state => ({ ...state, status: 'idle' }) as IAuthState),
  on(
    AuthActions.signUpFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Sign in
  on(AuthActions.signIn, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(
    AuthActions.signInSuccess,
    (state, { user }) => ({ ...state, currentUser: user, status: 'idle' }) as IAuthState,
  ),
  on(
    AuthActions.signInFailure,
    (state, { error }) => ({ ...state, currentUser: null, status: 'error', error }) as IAuthState,
  ),
  // Sign out
  on(AuthActions.signOut, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(
    AuthActions.signOutSuccess,
    state => ({ ...state, currentUser: null, status: 'idle' }) as IAuthState,
  ),
  on(
    AuthActions.signOutFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Verify OTP
  on(AuthActions.verifyOTP, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(AuthActions.verifyOTPSuccess, state => ({ ...state, status: 'idle' }) as IAuthState),
  on(
    AuthActions.verifyOTPFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Resend OTP
  on(AuthActions.resendOTP, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(AuthActions.resendOTPSuccess, state => ({ ...state, status: 'idle' }) as IAuthState),
  on(
    AuthActions.resendOTPFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Forgot Password
  on(AuthActions.forgotPassword, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(AuthActions.forgotPasswordSuccess, state => ({ ...state, status: 'idle' }) as IAuthState),
  on(
    AuthActions.forgotPasswordFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Reset Password
  on(AuthActions.resetPassword, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(AuthActions.resetPasswordSuccess, state => ({ ...state, status: 'idle' }) as IAuthState),
  on(
    AuthActions.resetPasswordFailure,
    (state, { error }) => ({ ...state, status: 'error', error }) as IAuthState,
  ),
  // Get Me
  on(AuthActions.getUser, state => ({ ...state, status: 'loading' }) as IAuthState),
  on(
    AuthActions.getUserSuccess,
    (state, { user }) => ({ ...state, currentUser: user, status: 'idle' }) as IAuthState,
  ),
  on(
    AuthActions.getUserFailure,
    (state, { error }) => ({ ...state, currentUser: null, status: 'error', error }) as IAuthState,
  ),
);
