import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {path: '', component: AuthFormComponent},
  {path: 'register', component: RegisterFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
