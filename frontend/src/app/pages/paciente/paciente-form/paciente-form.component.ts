import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { PacienteService } from './../shared/paciente.service';
import { FormBase } from 'src/app/shared/base/form.base';
import { Paciente } from '../shared/paciente.model';


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent extends FormBase<Paciente> {

  constructor(protected injector: Injector, private pacienteService: PacienteService) {
    super(injector, new Paciente(), pacienteService);
   }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      telefone: [null],
      celular: [null],
      responsavel: [null],
      ativo: [1, [Validators.required]],
      cpf: [null],
      sexo: ['M']
   });
  }
}
