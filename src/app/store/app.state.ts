import type { IAuthState } from './auth/auth.state';

export interface IAppState {
  feature_auth: IAuthState;
}
