import { AuthGuard } from './shared/helpers/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { resolve } from 'url';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'medicos',
    loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'psicologos',
    loadChildren: () => import('./pages/psicologo/psicologo.module').then(m => m.PsicologoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'atendentes',
    loadChildren: () => import('./pages/atendente/atendente.module').then(m => m.AtendenteModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./pages/agendamento/agendamento.module').then(m => m.AgendamentoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'financeiro',
    loadChildren: () => import('./pages/financeiro/financeiro.module').then(m => m.FinanceiroModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'minha-agenda',
    loadChildren: () => import('./pages/minha-agenda/minha-agenda.module').then(m => m.MinhaAgendaModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
