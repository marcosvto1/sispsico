import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Atendente } from './atendente.model';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService extends ServiceBase<Atendente>{
  
  entity = 'atendente';

  constructor(
    injector: Injector
  ) { 
    super(injector);
  }

  fromJson(jsonData: any) {
    return Atendente.fromJson(jsonData);
  }
}
