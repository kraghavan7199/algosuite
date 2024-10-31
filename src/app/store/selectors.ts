import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';


const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectUserProfile = createSelector(
  selectAuthState,
  (state) => state.userProfile
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);