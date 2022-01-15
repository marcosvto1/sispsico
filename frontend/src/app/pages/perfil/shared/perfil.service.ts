import { environment } from './../../../../environments/environment';
import { Usuario } from './../../usuario/shared/usuario.model';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends ServiceBase<Usuario> {

  entity = 'perfil';

  constructor(
    protected injector: Injector
  ) {
    super(injector);
   }

  fromJson(jsonData: any) {
    return Usuario.fromJson(jsonData);
  }

  getPerfil() {
    return this.http.get(environment.url + '/perfil')
  }

  alterarSenha(dadosJson) {
    return this.http.put(environment.url + '/alterar_senha/' + dadosJson.id, dadosJson);
  }
}
