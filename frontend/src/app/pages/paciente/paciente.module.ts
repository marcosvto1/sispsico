import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PacienteListComponent, PacienteFormComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    SharedModule,
  ]
})
export class PacienteModule { }
