import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { LoginService } from 'src/app/pages/auth/shared/login.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceResolver implements Resolve<Usuario> {

  constructor(private loginService: LoginService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Usuario | import("rxjs").Observable<Usuario> | Promise<Usuario> | null {
    return this.loginService.currentUserSubject;
  }

}
