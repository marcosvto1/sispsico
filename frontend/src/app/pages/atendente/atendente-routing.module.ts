import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendenteListComponent } from './atendente-list/atendente-list.component';
import { AtendenteFormComponent } from './atendente-form/atendente-form.component';


const routes: Routes = [
  {path: '', component: AtendenteListComponent},
  {path: 'add', component: AtendenteFormComponent},
  {path: ':id/edit', component: AtendenteFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendenteRoutingModule { }
