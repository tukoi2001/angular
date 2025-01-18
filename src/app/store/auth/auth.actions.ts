import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type {
  IForgotPasswordRequest,
  IOtpRequest,
  IResetPasswordRequest,
  ISignInRequest,
  ISignUpRequest,
  IUserResponse,
} from '@models/auth.model';

export const AuthActions = createActionGroup({
  source: 'feature_auth',
  events: {
    'Sign Up': props<ISignUpRequest>(),
    'Sign Up Success': emptyProps(),
    'Sign Up Failure': props<{ error: string }>(),

    'Sign In': props<ISignInRequest>(),
    'Sign In Success': props<{ user: IUserResponse }>(),
    'Sign In Failure': props<{ error: string }>(),

    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: string }>(),

    'Verify OTP': props<IOtpRequest>(),
    'Verify OTP Success': emptyProps(),
    'Verify OTP Failure': props<{ error: string }>(),

    'Resend OTP': props<Pick<IOtpRequest, 'email'>>(),
    'Resend OTP Success': emptyProps(),
    'Resend OTP Failure': props<{ error: string }>(),

    'Forgot Password': props<IForgotPasswordRequest>(),
    'Forgot Password Success': emptyProps(),
    'Forgot Password Failure': props<{ error: string }>(),

    'Reset Password': props<IResetPasswordRequest>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': props<{ error: string }>(),

    'Get User': emptyProps(),
    'Get User Success': props<{ user: IUserResponse }>(),
    'Get User Failure': props<{ error: string }>(),
  },
});
