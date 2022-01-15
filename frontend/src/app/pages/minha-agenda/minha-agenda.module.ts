import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaAgendaRoutingModule } from './minha-agenda-routing.module';
import { MinhaAgendaFormComponent } from './minha-agenda-form/minha-agenda-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MinhaAgendaListComponent } from './minha-agenda-list/minha-agenda-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [MinhaAgendaFormComponent, MinhaAgendaListComponent],
  imports: [
    CommonModule,
    MinhaAgendaRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    NgSelect2Module
  ]
})
export class MinhaAgendaModule { }
