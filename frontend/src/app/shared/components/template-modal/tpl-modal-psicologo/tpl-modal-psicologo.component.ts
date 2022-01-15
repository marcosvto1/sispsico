import { ModalTemplateBase } from '../../../base/modal-template.base';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/usuario/shared/usuario.model';
import { ViewUsuarioPsicologoService } from 'src/app/shared/service/view-usuario-psicologo.service';

@Component({
  selector: 'app-tpl-modal-psicologo',
  templateUrl: './tpl-modal-psicologo.component.html',
  styleUrls: ['./tpl-modal-psicologo.component.scss']
})
export class TplModalPsicologoComponent extends ModalTemplateBase<Usuario> {
  campos = Usuario.campos;
  constructor(protected usuarioService: ViewUsuarioPsicologoService) {
    super(usuarioService);
  }
}
