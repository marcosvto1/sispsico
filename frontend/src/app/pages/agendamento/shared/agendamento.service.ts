import { Agendamento } from './agendamento.model';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService extends ServiceBase<Agendamento> {
  entity = 'agendamento';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
   }

  fromJson(jsonData: any) {
    return Agendamento.fromJson(jsonData);
  }

  

}
