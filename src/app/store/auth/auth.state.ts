import { IUserResponse } from '@models/auth.model';

export interface IAuthState {
  currentUser: IUserResponse | null;
  status: 'idle' | 'loading' | 'error';
  error?: string | null;
}
