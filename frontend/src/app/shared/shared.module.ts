import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableItemDirective } from './components/my-table/table-item.directive';
import { MyTableComponent } from './components/my-table/my-table.component';

import { MenuComponent } from './components/menu/menu.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TplModalPacienteComponent } from './components/template-modal/tpl-modal-paciente/tpl-modal-paciente.component';
import { TplModalUsuarioComponent } from './components/template-modal/tpl-modal-usuario/tpl-modal-usuario.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TplModalAtendenteComponent } from './components/template-modal/tpl-modal-atendente/tpl-modal-atendente.component';
import { TplModalPsicologoComponent } from './components/template-modal/tpl-modal-psicologo/tpl-modal-psicologo.component';
import { TplModalMedicoComponent } from './components/template-modal/tpl-modal-medico/tpl-modal-medico.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    MyTableComponent,
    TableItemDirective,
    MenuComponent,
    PaginateComponent,
    TplModalPacienteComponent,
    TplModalUsuarioComponent,
    TplModalAtendenteComponent,
    TplModalPsicologoComponent,
    TplModalMedicoComponent,
    
  ],
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule,
    PaginationModule.forRoot(), NgxMaskModule.forRoot(options),
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    MyTableComponent,
    TableItemDirective,
    MenuComponent,
    PaginateComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxLoadingModule,
  ],
  entryComponents: [
    TplModalPacienteComponent, 
    TplModalUsuarioComponent, 
    TplModalAtendenteComponent,
    TplModalPsicologoComponent,
    TplModalMedicoComponent,

  ]
})
export class SharedModule {}
