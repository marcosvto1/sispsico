import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
  declarations: [UsuarioListComponent, UsuarioFormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
