import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';


@NgModule({
  declarations: [PerfilFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
