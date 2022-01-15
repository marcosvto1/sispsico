import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'fatura', loadChildren: () => import('./fatura/fatura.module').then(m => m.FaturaModule)
  },
  {
    path: 'pagamento', loadChildren: () => import('./pagamento/pagamento.module').then(m => m.PagamentoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
