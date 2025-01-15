import { FormControl } from '@angular/forms';

export interface IAuthSignUpRequest {
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
  remember: FormControl<boolean | null>;
}

export interface IUserResponse {
  //
}
