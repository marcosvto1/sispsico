import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoListComponent } from './pagamento-list/pagamento-list.component';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [PagamentoListComponent],
  imports: [
    CommonModule,
    PagamentoRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class PagamentoModule { }
