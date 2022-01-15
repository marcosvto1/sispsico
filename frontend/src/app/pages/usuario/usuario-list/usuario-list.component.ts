import { UsuarioService } from './../shared/usuario.service';
import { Component, OnInit, Injector } from '@angular/core';

import { Usuario } from './../shared/usuario.model';
import { ListBase } from 'src/app/shared/base/list.base';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent extends ListBase<Usuario> {
  campos = Usuario.campos;
  constructor(
    protected injector: Injector,
    private usuarioService: UsuarioService
  ) {
    super(injector, usuarioService, new Usuario() , true);
  }

  filtrar() {
    // chamar a consulta usando o filtro
    this.loadResources();
  }
}
