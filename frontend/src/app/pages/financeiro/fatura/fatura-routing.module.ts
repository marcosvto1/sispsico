import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';
import { FaturaListComponent } from './fatura-list/fatura-list.component';

const routes: Routes = [
  {path: '', component: FaturaListComponent},
  {path: 'add', component: FaturaFormComponent},
  {path: ':id/edit', component: FaturaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaturaRoutingModule { }
