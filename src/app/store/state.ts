export interface AuthState {
    isLoggedIn: boolean;
    userProfile: any | null;
    error: any
    loading: boolean;
  }
  
  export const initialState: AuthState = {
    isLoggedIn: false,
    userProfile: null,
    error: null,
    loading: false
  };