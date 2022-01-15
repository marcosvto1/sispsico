import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ViewUsuarioAtendenteService extends ServiceBase<Usuario> {
  entity = 'view_usuario_atendente';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
   }

  fromJson(jsonData: any) {
    return Usuario.fromJson(jsonData);
  }
}
