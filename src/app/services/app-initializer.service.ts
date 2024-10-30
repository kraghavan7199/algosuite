import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError, filter, first, firstValueFrom, of } from 'rxjs';
import { loadUserProfile } from '../store/actions';
import { selectIsLoggedIn, selectLoading, selectUserProfile } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  async initializeApp(): Promise<void> {
    try {
      this.store.dispatch(loadUserProfile());
      await firstValueFrom(
        this.store.select(selectLoading).pipe(
          filter(loading => !loading),
          catchError(() => of(false))
        )
      );

      const isLoggedIn = await firstValueFrom(this.store.select(selectIsLoggedIn));
      
    } catch (error) {
      console.error('App initialization failed:', error);
      await this.router.navigate(['/landing']);
    }
  }
}