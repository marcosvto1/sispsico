import { Usuario } from './usuario.model';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

  entity = 'usuario';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
   }

  fromJson(jsonData: any) {
    return Usuario.fromJson(jsonData);
  }

}
