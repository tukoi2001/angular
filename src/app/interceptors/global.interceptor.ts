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
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from '@services/cookie.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.getAccessToken();

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');

    // Add correlation ID for request tracking
    headers = headers.set('X-Correlation-ID', this.generateCorrelationId());

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Clone the request with the new headers
    const modifiedRequest = request.clone({ headers });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const status = error.status;
        switch (status) {
          case 401:
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            break;
          case 403:
            this.router.navigate(['/forbidden']);
            break;
          case 404:
            this.router.navigate(['/not-found']);
            break;
          case 500:
          default:
            break;
        }
        return throwError(() => error);
      }),
      finalize(() => {
        // Perform any cleanup or logging if needed after the request
      }),
    );
  }

  private generateCorrelationId(): string {
    // Generate a unique correlation ID for request tracking
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}
