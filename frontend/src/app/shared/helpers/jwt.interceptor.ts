import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../../pages/auth/shared/login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available

      const currentUser = this.loginService.currentUserValue;
      if (currentUser && currentUser.access_token) {
          if (request.url.split('//')[1].split('/')[0] != 'viacep.com.br') {
              return next.handle(this.setToken(request, currentUser));
          } else {
              return next.handle(request);
          }
      } else {
          return next.handle(request);
      }

  }

  setToken(request: HttpRequest<any>, currentUser) {
    return request.clone({
      setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
      }
    });
  }

}
