import { ModalTemplateBase } from '../../../base/modal-template.base';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { UsuarioService } from 'src/app/pages/usuario/shared/usuario.service';


@Component({
  selector: 'app-tpl-modal-usuario',
  templateUrl: './tpl-modal-usuario.component.html',
  styleUrls: ['./tpl-modal-usuario.component.scss']
})
export class TplModalUsuarioComponent extends ModalTemplateBase<Usuario> {
  campos = Usuario.campos;
  constructor(protected usuarioService: UsuarioService) {
    super(usuarioService);
  }
}
