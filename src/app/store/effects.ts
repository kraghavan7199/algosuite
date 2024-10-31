import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      switchMap(() =>
        this.authService.getUserProfile().pipe(
          map(profile => {
            return AuthActions.loadUserProfileSuccess({ profile });
          }),
          catchError(error => {
            return of(AuthActions.loadUserProfileFailure({ error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          tap(response => this.authService.storeTokens(response)),
          mergeMap(response =>
            of(
              AuthActions.loginSuccess(),
              AuthActions.loadUserProfile()
            )
          ),
          tap(() => this.router.navigate(['/private/dashboard'])),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          tap(response => this.authService.storeTokens(response)),
          mergeMap(response =>
            of(
              AuthActions.loginSuccess(),
              AuthActions.loadUserProfile()
            )
          ), tap(() => this.router.navigate(['/private/dashboard'])),
          catchError(error => of(AuthActions.signupFailure({ error }))
        )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
