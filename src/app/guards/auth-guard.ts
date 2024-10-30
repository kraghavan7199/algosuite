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
  console.log('Auth Guard triggered');
  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      console.log('here')
      const returnUrl = state.url;
      router.navigate(['/auth'], {
        queryParams: { returnUrl }
      });
      return false;
    })
  );
};
