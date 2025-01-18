import { FormControl } from '@angular/forms';
import { AuthRole } from '@enums/auth.enum';
import type { IBaseResponse } from './app.model';

export interface ISignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNumber?: string;
  address?: string;
  remember?: boolean;
}

export interface ISignUpFormBuilder {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

export interface IUserResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  role: AuthRole;
  isActive: boolean;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IOtpRequest {
  otp: string;
  email: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  newPassword: string;
  token?: string;
  confirmNewPassword?: string;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}

export interface ITokenResponse extends IBaseResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInResponse extends ITokenResponse {
  userInfo: IUserResponse;
}

export interface ISignUpResponse extends IBaseResponse {
  userInfo: IUserResponse;
}
