import { createAction, props } from "@ngrx/store";



export const loadUserProfile = createAction('[Auth] Load User Profile');
export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ profile: any }>()
);
export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: any }>()
);


export const login = createAction(
  '[Auth] Login',
  props<{ credentials: any }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ credentials: any }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success');

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const signupFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const logout = createAction('[Auth] Logout');