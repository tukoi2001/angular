import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.dev';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private formatUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint.replace(/^\//, '')}`;
  }

  private mappingResponse<T>(response: T): T {
    if (response === null || response === undefined) {
      return {} as T;
    }
    return response;
  }

  /**
   * GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   */
  get<T>(
    endpoint: string,
    params?:
      | HttpParams
      | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
  ): Observable<T> {
    const options = {
      headers: this.createHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params as any }),
    };

    return this.http.get<T>(this.formatUrl(endpoint), options).pipe(map(this.mappingResponse<T>));
  }

  /**
   * POST request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param params - Query parameters
   */
  post<T, D = any>(
    endpoint: string,
    data: D,
    params?:
      | HttpParams
      | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
  ): Observable<T> {
    const options = {
      headers: this.createHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params as any }),
    };

    return this.http
      .post<T>(this.formatUrl(endpoint), data, options)
      .pipe(map(this.mappingResponse<T>));
  }

  /**
   * PUT request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param params - Query parameters
   */
  put<T>(
    endpoint: string,
    data: any,
    params?:
      | HttpParams
      | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
  ): Observable<T> {
    const options = {
      headers: this.createHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params as any }),
    };

    return this.http
      .put<T>(this.formatUrl(endpoint), data, options)
      .pipe(map(this.mappingResponse<T>));
  }

  /**
   * DELETE request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   */
  delete<T>(
    endpoint: string,
    params?:
      | HttpParams
      | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
  ): Observable<T> {
    const options = {
      headers: this.createHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params as any }),
    };

    return this.http
      .delete<T>(this.formatUrl(endpoint), options)
      .pipe(map(this.mappingResponse<T>));
  }

  /**
   * PATCH request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param params - Query parameters
   */
  patch<T>(
    endpoint: string,
    data: any,
    params?:
      | HttpParams
      | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] },
  ): Observable<T> {
    const options = {
      headers: this.createHeaders(),
      params: params instanceof HttpParams ? params : new HttpParams({ fromObject: params as any }),
    };

    return this.http
      .patch<T>(this.formatUrl(endpoint), data, options)
      .pipe(map(this.mappingResponse<T>));
  }
}
