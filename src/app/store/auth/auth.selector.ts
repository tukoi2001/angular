import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { IAuthState } from './auth.state';

const featureAuth = createFeatureSelector<IAuthState>('feature_auth');

export const authCurrentUserSelector = createSelector(featureAuth, state => state.currentUser);
export const authStatusSelector = createSelector(featureAuth, state => state.status);
export const authErrorSelector = createSelector(featureAuth, state => state.error);
