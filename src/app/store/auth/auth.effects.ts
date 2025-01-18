import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { AuthActions } from './auth.actions';
import type {
  IForgotPasswordRequest,
  IOtpRequest,
  IResetPasswordRequest,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
} from '@models/auth.model';
import { ToastService } from '@services/toast.service';
import { ISignUpResponse } from '../../models/auth.model';
import { CookieService } from '@services/cookie.service';
import { Router } from '@angular/router';
import { IBaseResponse } from '../../models/app.model';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      exhaustMap((data: ISignUpRequest) =>
        this.authService.signUp(data).pipe(
          map((response: ISignUpResponse) => {
            this.cookieService.setUserInfo(response.userInfo);
            this.router.navigate(['/verify-otp']);
            return AuthActions.signUpSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.signUpFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap((data: ISignInRequest) =>
        this.authService.signIn(data).pipe(
          map(({ accessToken, refreshToken, userInfo }: ISignInResponse) => {
            this.cookieService.setAccessToken(accessToken);
            this.cookieService.setRefreshToken(refreshToken);
            this.cookieService.setUserInfo(userInfo);
            this.router.navigate(['/']);
            return AuthActions.signInSuccess({ user: userInfo });
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.signInFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() =>
        this.authService.signOut().pipe(
          map(({ message }: IBaseResponse) => {
            this.cookieService.revokeAuthentication();
            this.toastService.showSuccess(message as string);
            this.router.navigate(['/sign-in']);
            return AuthActions.signOutSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.signOutFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOTP),
      exhaustMap((data: IOtpRequest) =>
        this.authService.verifyOtp(data).pipe(
          map(({ message }: IBaseResponse) => {
            this.toastService.showSuccess(message as string);
            // TODO: set user again
            return AuthActions.verifyOTPSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.verifyOTPFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendOTP),
      exhaustMap((data: Pick<IOtpRequest, 'email'>) =>
        this.authService.resendOtp(data).pipe(
          map(({ message }: IBaseResponse) => {
            this.toastService.showSuccess(message as string);
            // TODO:
            return AuthActions.resendOTPSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.resendOTPFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap((data: IForgotPasswordRequest) =>
        this.authService.forgotPassword(data).pipe(
          map(({ message }: IBaseResponse) => {
            this.toastService.showSuccess(message as string);
            // TODO:
            return AuthActions.forgotPasswordSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.forgotPasswordFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap((data: IResetPasswordRequest) =>
        this.authService.resetPassword(data).pipe(
          map(({ message }: IBaseResponse) => {
            this.toastService.showSuccess(message as string);
            // TODO:
            return AuthActions.resetPasswordSuccess();
          }),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.resetPasswordFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      mergeMap(() =>
        this.authService.me().pipe(
          map((response: ISignUpResponse) =>
            AuthActions.getUserSuccess({ user: response.userInfo }),
          ),
          catchError(error => {
            this.toastService.showError(error.message);
            return of(AuthActions.getUserFailure({ error: error.message }));
          }),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly cookieService: CookieService,
  ) {}
}
