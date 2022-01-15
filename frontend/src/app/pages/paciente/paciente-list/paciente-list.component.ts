import { PacienteService } from './../shared/paciente.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Paciente } from './../shared/paciente.model';
import { ListBase } from 'src/app/shared/base/list.base';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent extends ListBase<Paciente>{
  campos = Paciente.campos;
  constructor(protected injector: Injector, private pacienteService: PacienteService ) { 
    super(injector, pacienteService, new Paciente(), true);
  }

  filtrar() {
    this.loadResources();
  }
}
