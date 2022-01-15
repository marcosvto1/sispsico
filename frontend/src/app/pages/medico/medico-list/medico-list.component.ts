import { Component, OnInit, Injector } from '@angular/core';
import { ListBase } from 'src/app/shared/base/list.base';
import { Medico } from '../shared/medico.model';
import { MedicoService } from '../shared/medico.service';

@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.scss']
})
export class MedicoListComponent extends ListBase<Medico> {

  campos = Medico.campos;
  constructor(protected injector: Injector, private psicologoService: MedicoService ) { 
    super(injector, psicologoService, new Medico(), true);
  }

  filtrar() {
    this.loadResources();
  }


}
