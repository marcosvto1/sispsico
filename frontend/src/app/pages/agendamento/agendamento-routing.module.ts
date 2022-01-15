import { AgendamentoFormComponent } from './agendamento-form/agendamento-form.component';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaServiceResolver } from 'src/app/shared/resolvers/agenda.service.resolver';


const routes: Routes = [
  {path: '', component: AgendamentoListComponent, resolve: {agenda:AgendaServiceResolver}},
  {path: 'add', component: AgendamentoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule { }
