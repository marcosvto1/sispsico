import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { LoginService } from 'src/app/pages/auth/shared/login.service';
import { Agenda } from 'src/app/pages/minha-agenda/shared/agenda.model';
import { AgendaService } from 'src/app/pages/minha-agenda/shared/agenda.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaServiceResolver implements Resolve<Agenda> {

  constructor(private loginService: LoginService, private agendaService: AgendaService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Agenda | import("rxjs").Observable<Agenda> | Promise<Agenda> | null {
    const id = this.loginService.currentUserValue.user.original.usuario_id;
    return this.agendaService.consultarAgendaUsuario(id);
  }

}
