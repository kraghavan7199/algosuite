
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getStoredToken();
    let clonedRequest = req;
    
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
            'auth-key' : token
        }
      });
    }

    return next.handle(clonedRequest);
  }
}
