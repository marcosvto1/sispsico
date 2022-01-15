import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsicologoRoutingModule } from './psicologo-routing.module';
import { PsicologoFormComponent } from './psicologo-form/psicologo-form.component';
import { PsicologoListComponent } from './psicologo-list/psicologo-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [PsicologoListComponent,PsicologoFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    PsicologoRoutingModule,
    ModalModule.forRoot()
  ]
})
export class PsicologoModule { }
