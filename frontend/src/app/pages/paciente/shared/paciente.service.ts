import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';
import { Paciente } from './paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends ServiceBase<Paciente> {
  entity = 'paciente';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
   }

  fromJson(jsonData: any) {
    return Paciente.fromJson(jsonData);
  }
}
