import { Component, OnInit, Injector } from '@angular/core';
import { Psicologo } from '../shared/psicologo.model';
import { PsicologoService } from '../shared/psicologo.service';

import { ListBase } from 'src/app/shared/base/list.base';

@Component({
  selector: 'app-psicologo-list',
  templateUrl: './psicologo-list.component.html',
  styleUrls: ['./psicologo-list.component.scss']
})
export class PsicologoListComponent extends ListBase<Psicologo> {

  campos = Psicologo.campos;
  constructor(protected injector: Injector, private psicologoService: PsicologoService ) { 
    super(injector, psicologoService, new Psicologo(), true);
  }

  filtrar() {
    this.loadResources();
  }

}
