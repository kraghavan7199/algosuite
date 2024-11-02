import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  CanMatchFn,
  Route,
  UrlSegment,
  CanActivateChildFn
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsLoggedIn } from '../store/selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);  
  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      const returnUrl = state.url;
      router.navigate(['/auth']);
      return false;
    })
  );
};
