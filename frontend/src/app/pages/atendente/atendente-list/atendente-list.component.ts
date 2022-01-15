import { Component, OnInit, Injector } from '@angular/core';
import { Atendente } from '../shared/atendente.model';
import { AtendenteService } from '../shared/atendente.service';
import { ListBase } from 'src/app/shared/base/list.base';

@Component({
  selector: 'app-atendente-list',
  templateUrl: './atendente-list.component.html',
  styleUrls: ['./atendente-list.component.scss']
})
export class AtendenteListComponent extends ListBase<Atendente>{

  campos = Atendente.campos;
  constructor(protected injector: Injector, private atendenteService: AtendenteService ) { 
    super(injector, atendenteService, new Atendente(), true);
  }

  filtrar() {
    this.loadResources();
  }

}
