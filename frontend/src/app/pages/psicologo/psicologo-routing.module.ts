import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsicologoListComponent } from './psicologo-list/psicologo-list.component';
import { PsicologoFormComponent } from './psicologo-form/psicologo-form.component';


const routes: Routes = [
  {path: '', component: PsicologoListComponent},
  {path: 'add', component: PsicologoFormComponent},
  {path: ':id/edit', component: PsicologoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsicologoRoutingModule { }
