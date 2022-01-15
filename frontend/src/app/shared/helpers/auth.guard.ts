import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/auth/shared/login.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userCurrent = this.loginService.currentUserValue;
    if (userCurrent) {
      return true;
    } else {
      this.loginService.cleanSession();
      this.router.navigate(['auth']);
    }

    return false;
  }
}
