import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendenteRoutingModule } from './atendente-routing.module';
import { AtendenteFormComponent } from './atendente-form/atendente-form.component';
import { AtendenteListComponent } from './atendente-list/atendente-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [AtendenteListComponent, AtendenteFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    AtendenteRoutingModule,
    ModalModule.forRoot()
  ]
})
export class AtendenteModule { }
