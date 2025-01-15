import { Injectable } from '@angular/core';
import Cookies from 'universal-cookie';
import { EncryptService } from './encrypt.service';
import { TOKEN, REFRESH_TOKEN, USER_INFO } from '@constants/cookie.constants';
import { IUserResponse } from '@models/auth.model';
import type { CookieSetOptions } from 'universal-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly cookies = new Cookies();

  private readonly cookieOptions: CookieSetOptions = {
    path: '/',
    secure: true,
    sameSite: 'strict' as const,
  };

  constructor(private readonly encryptService: EncryptService) {}

  getAccessToken(): string {
    return this.cookies.get(TOKEN) ?? '';
  }

  getRefreshToken(): string {
    return this.cookies.get(REFRESH_TOKEN) ?? '';
  }

  getCurrentUser(): IUserResponse | null {
    const encryptUser = this.cookies.get(USER_INFO);
    return encryptUser ? this.encryptService.decryptObject<IUserResponse>(encryptUser) : null;
  }

  setAccessToken(token: string): void {
    this.cookies.set(TOKEN, token, this.cookieOptions);
  }

  setRefreshToken(refreshToken: string): void {
    this.cookies.set(REFRESH_TOKEN, refreshToken, this.cookieOptions);
  }

  setUserInfo(user: IUserResponse): void {
    const encryptedData = this.encryptService.encryptObject<IUserResponse>(user);
    this.cookies.set(USER_INFO, encryptedData, this.cookieOptions);
  }

  revokeAuthentication(): void {
    this.cookies.remove(TOKEN, this.cookieOptions);
    this.cookies.remove(REFRESH_TOKEN, this.cookieOptions);
    this.cookies.remove(USER_INFO, this.cookieOptions);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const userInfo = this.getCurrentUser();
    return Boolean(token) && Boolean(userInfo);
  }
}
