import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Psicologo } from './psicologo.model';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService extends ServiceBase<Psicologo>{
  
  entity = 'psicologo';

  constructor(
    injector: Injector
  ) { 
    super(injector);
  }

  fromJson(jsonData: any) {
    return Psicologo.fromJson(jsonData);
  }
}
