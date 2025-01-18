import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import type {
  IForgotPasswordRequest,
  IOtpRequest,
  IRefreshTokenRequest,
  IResetPasswordRequest,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
  ITokenResponse,
} from '@models/auth.model';
import { IBaseResponse } from '@models/app.model';
import { CookieService } from './cookie.service';
import { environment } from '@environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );

  constructor(
    private readonly requestService: RequestService,
    private readonly cookieService: CookieService,
  ) {}

  isRefreshingToken(): boolean {
    return this.isRefreshing;
  }

  setRefreshingToken(status: boolean): void {
    this.isRefreshing = status;
  }

  getRefreshTokenSubject(): BehaviorSubject<string | null> {
    return this.refreshTokenSubject;
  }

  handleUnauthorized(): void {
    this.cookieService.revokeAuthentication();
    window.location.href = `${environment.API_URL}/sign-in`;
  }

  signUp(data: ISignUpRequest): Observable<ISignUpResponse> {
    return this.requestService.post<ISignUpResponse, ISignUpRequest>('/auth/sign-up', data);
  }

  signIn(data: ISignInRequest): Observable<ISignInResponse> {
    return this.requestService.post<ISignInResponse, ISignInRequest>('/auth/sign-in', data);
  }

  signOut(): Observable<IBaseResponse> {
    return this.requestService.get<IBaseResponse>('/auth/sign-out');
  }

  verifyOtp(data: IOtpRequest): Observable<IBaseResponse> {
    return this.requestService.post<IBaseResponse, IOtpRequest>('/auth/verify-otp', data);
  }

  resendOtp(data: Pick<IOtpRequest, 'email'>): Observable<IBaseResponse> {
    return this.requestService.post<IBaseResponse, Pick<IOtpRequest, 'email'>>(
      '/auth/resend-otp',
      data,
    );
  }

  forgotPassword(data: IForgotPasswordRequest): Observable<IBaseResponse> {
    return this.requestService.post<IBaseResponse, IForgotPasswordRequest>(
      '/auth/forgot-password',
      data,
    );
  }

  resetPassword(data: IResetPasswordRequest): Observable<IBaseResponse> {
    return this.requestService.post<IBaseResponse, IResetPasswordRequest>(
      '/auth/reset-password',
      data,
    );
  }

  refreshToken(): Observable<ITokenResponse> {
    const refreshToken = this.cookieService.getRefreshToken();
    return this.requestService.post<ITokenResponse, IRefreshTokenRequest>('/auth/refresh-token', {
      refreshToken,
    });
  }

  me(): Observable<ISignUpResponse> {
    return this.requestService.get<ISignUpResponse>('/auth/me');
  }
}
