import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from '../../pages/auth/shared/login.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private loginService: LoginService, protected router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          this.loginService.cleanSession();
          this.router.navigate(['auth']);
        }

        return throwError(error);

      }));
  }

}
