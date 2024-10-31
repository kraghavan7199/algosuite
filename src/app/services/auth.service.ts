import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environment';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthState } from '../store/state';
import * as AuthActions from '../store/actions'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userProfileSubject = new BehaviorSubject<any | null>(null);
  
  constructor(private http: HttpClient, private store: Store<{ auth: AuthState }>, private router: Router) {
  }

   getStoredToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }


  storeTokens(authResponse: any): void {
    localStorage.setItem(this.tokenKey, authResponse.token);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    this.userProfileSubject.next(null);
  }


  getUserProfile(): Observable<any> {
    const token = this.getStoredToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders().set('auth-key', `${token}`);
    
    return this.http.get<any>(`${this.apiUrl}/auth/user`, { headers }).pipe(
      tap(profile => this.userProfileSubject.next(profile))
    );
  }

  login(credentials: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)
  }

  logout(){
    this.clearTokens();
    this.store.dispatch(AuthActions.logout());
    this.router.navigate([''])
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  getCurrentUser(): Observable<any | null> {
    return this.userProfileSubject.asObservable();
  }


  register(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, credentials)
  }

}