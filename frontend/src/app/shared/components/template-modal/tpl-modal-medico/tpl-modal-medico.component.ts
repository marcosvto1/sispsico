import { ModalTemplateBase } from '../../../base/modal-template.base';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { ViewUsuarioMedicoService } from 'src/app/shared/service/view-usuario-medico.service';

@Component({
  selector: 'app-tpl-modal-medico',
  templateUrl: './tpl-modal-medico.component.html',
  styleUrls: ['./tpl-modal-medico.component.scss']
})
export class TplModalMedicoComponent extends ModalTemplateBase<Usuario> {
  campos = Usuario.campos;
  constructor(protected usuarioService: ViewUsuarioMedicoService) {
    super(usuarioService);
  }
}
