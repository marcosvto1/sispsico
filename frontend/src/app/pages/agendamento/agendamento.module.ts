import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
@NgModule({
  declarations: [AgendamentoFormComponent, AgendamentoListComponent],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxFullCalendarModule,
    FullCalendarModule
  ]
})
export class AgendamentoModule { }
