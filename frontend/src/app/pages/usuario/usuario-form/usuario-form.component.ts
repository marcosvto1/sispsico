import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormBase } from 'src/app/shared/base/form.base';
import { UsuarioService } from './../shared/usuario.service';
import { Usuario } from './../shared/usuario.model';
import { RepeatPasswordValidator } from 'src/app/shared/validators/validators';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends FormBase<Usuario>{

  constructor(protected injector: Injector, private usuarioService: UsuarioService) {
    super(injector, new Usuario(), usuarioService);
   }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
      papel: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      logradouro: [null],
      numero: [null],
      bairro: [null],
      cidade: [null],
      ativo: [1, [Validators.required]],
      admin: [0]
    }, {validator: RepeatPasswordValidator});
  }

}
