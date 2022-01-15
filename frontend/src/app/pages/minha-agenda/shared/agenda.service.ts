import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Agenda } from './agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends ServiceBase<Agenda> {
  entity = 'agenda';

  constructor(protected injector: Injector) {
    super(injector);
  }

  fromJson(jsonData: any): Agenda {
    return Agenda.fromJson(jsonData);
  }

  consultarAgendaUsuario(id: number) {
    return this.http.get(this.url + '' + '/agenda_usuario/' +  id);
  }
}
