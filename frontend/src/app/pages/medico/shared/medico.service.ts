import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Medico } from './medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends ServiceBase<Medico>{
  
  entity = 'atendente';

  constructor(
    injector: Injector
  ) { 
    super(injector);
  }

  fromJson(jsonData: any) {
    return Medico.fromJson(jsonData);
  }
}
