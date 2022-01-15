import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [MedicoListComponent, MedicoFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    MedicoRoutingModule,
    ModalModule.forRoot()
  ]
})
export class MedicoModule { }
