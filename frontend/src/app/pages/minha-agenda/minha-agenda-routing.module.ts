import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinhaAgendaFormComponent } from './minha-agenda-form/minha-agenda-form.component';
import { AgendaServiceResolver } from 'src/app/shared/resolvers/agenda.service.resolver';
import { MinhaAgendaListComponent } from './minha-agenda-list/minha-agenda-list.component';


const routes: Routes = [
  {path: '', component: MinhaAgendaListComponent, resolve: {agenda:AgendaServiceResolver}},
  {path: 'add', component: MinhaAgendaFormComponent},
  {path: ':id/edit', component: MinhaAgendaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhaAgendaRoutingModule { }
