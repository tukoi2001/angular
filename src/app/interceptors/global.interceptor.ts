import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from '@services/cookie.service';
import { AuthService } from '@services/auth.service';
import { StatusCode } from '@enums/app.enum';
import { ToastService } from '@services/toast.service';
import type { ITokenResponse } from '../models/auth.model';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly toastService: ToastService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case StatusCode.Unauthorized:
            this.authService.handleUnauthorized();
            break;
          case StatusCode.Forbidden:
            this.router.navigate(['/forbidden']);
            break;
          case StatusCode.NotFound:
            this.router.navigate(['/not-found']);
            break;
          case StatusCode.AccessTokenExpired:
            return this.handleRefreshToken(request, next);
          case StatusCode.InternalServerError:
          case StatusCode.TooManyRequest:
          default:
            this.toastService.showError(error.message);
            break;
        }
        return throwError(() => error);
      }),
    );
  }

  private createHeadersWithAuth(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  private addAuthenticationToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.cookieService.getAccessToken();

    if (!Boolean(token)) {
      return request;
    }

    const headers = this.createHeadersWithAuth(token);
    return request.clone({ headers });
  }

  private handleRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.isRefreshingToken()) {
      this.authService.setRefreshingToken(true);
      this.authService.getRefreshTokenSubject().next(null);

      return this.authService.refreshToken().pipe(
        switchMap(({ accessToken, refreshToken }: Partial<ITokenResponse>) => {
          this.authService.setRefreshingToken(false);
          this.cookieService.setAccessToken(accessToken as string);
          this.cookieService.setRefreshToken(refreshToken as string);
          this.authService.getRefreshTokenSubject().next(accessToken as string);
          return next.handle(this.addAuthenticationToken(request));
        }),
        catchError(error => {
          this.authService.setRefreshingToken(false);
          this.authService.handleUnauthorized();
          return throwError(() => error);
        }),
      );
    }

    return this.authService.getRefreshTokenSubject().pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addAuthenticationToken(request))),
    );
  }
}
