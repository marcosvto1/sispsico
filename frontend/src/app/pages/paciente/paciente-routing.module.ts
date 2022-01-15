import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';


const routes: Routes = [
  {path: '', component: PacienteListComponent},
  {path: 'add', component: PacienteFormComponent},
  {path: ':id/edit', component: PacienteFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
