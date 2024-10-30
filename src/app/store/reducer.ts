// src/app/store/reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './actions';
import { initialState } from './state';

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
    on(AuthActions.loginSuccess, (state, { userProfile }) => ({
      ...state,
      isLoggedIn: true,
      userProfile,
      loading: false,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      isLoggedIn: false,
      userProfile: null,
      loading: false,
    })),
    on(AuthActions.loadUserProfile, (state) => ({
      ...state,
      loading: true
    })),
    on(AuthActions.loadUserProfileSuccess, (state, { profile }) => ({
      ...state,
      isLoggedIn: true,
      userProfile: profile,
      loading: false
    })),
    on(AuthActions.loadUserProfileFailure, (state, { error }) => ({
      ...state,
      isLoggedIn: false,
      userProfile: null,
      error,
      loading: false
    }))
);
