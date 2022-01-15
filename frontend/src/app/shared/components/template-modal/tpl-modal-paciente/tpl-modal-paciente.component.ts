import { Component, OnInit } from '@angular/core';

import { ModalTemplateBase } from '../../../base/modal-template.base';
import { Paciente } from 'src/app/pages/paciente/shared/paciente.model';
import { PacienteService } from 'src/app/pages/paciente/shared/paciente.service';

@Component({
  selector: 'app-tpl-modal-paciente',
  templateUrl: './tpl-modal-paciente.component.html',
  styleUrls: ['./tpl-modal-paciente.component.scss']
})
export class TplModalPacienteComponent extends ModalTemplateBase<Paciente> {
  campos = Paciente.campos;
  constructor(protected pacienteService: PacienteService) {
    super(pacienteService);
  }
}
