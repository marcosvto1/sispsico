import { ModalTemplateBase } from '../../../base/modal-template.base';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { ViewUsuarioAtendenteService } from 'src/app/shared/service/view-usuario-atendente.service';

@Component({
  selector: 'app-tpl-modal-atendente',
  templateUrl: './tpl-modal-atendente.component.html',
  styleUrls: ['./tpl-modal-atendente.component.scss']
})
export class TplModalAtendenteComponent extends ModalTemplateBase<Usuario> {
  campos = Usuario.campos;
  constructor(protected usuarioService: ViewUsuarioAtendenteService) {
    super(usuarioService);
  }
}
