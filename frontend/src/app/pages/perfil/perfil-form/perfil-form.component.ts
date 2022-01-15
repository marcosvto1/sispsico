import { PerfilService } from './../shared/perfil.service';
import { Usuario } from './../../usuario/shared/usuario.model';
import { FormBase } from 'src/app/shared/base/form.base';
import { Component, OnInit, Injector } from '@angular/core';
import { UsuarioService } from '../../usuario/shared/usuario.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import toastr from 'toastr';

import { RepeatPasswordValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent implements OnInit {
  perfilForm: FormGroup;
  alterarSenhaForm: FormGroup;
  listErrors: any[] = [];

  constructor(private usuarioService: UsuarioService, private perfilService: PerfilService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildResourceForm();
    this.loadResource();
  }

  loadResource() {
    this.perfilService.getPerfil().subscribe(
      (result: any) => {
        this.perfilForm.patchValue(result.data);
        this.alterarSenhaForm.get('id').setValue(result.data.id);
      }
    );
  }

  protected buildResourceForm(): void {
    this.perfilForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      usuario: [null, [Validators.required]],
      logradouro: [null],
      numero: [null],
      bairro: [null],
      cidade: [null],
    });

    this.alterarSenhaForm = this.formBuilder.group({
      id: [null],
      senha_atual: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]]
    },  { validator: RepeatPasswordValidator });
  }

  onSubmitPerfilForm() {

    this.perfilService.alterar(this.alterarSenhaForm.value).subscribe(
      (result) => {
        toastr.success('Perfil alterado com sucesso!');
      },
      (erro) => {
        toastr.error('Ocorreu um erro ao processar');
      }
    );
  }


  onSubmitAlterarSenhaForm() {
    this.listErrors = [];
    this.perfilService.alterarSenha(this.alterarSenhaForm.value).subscribe(
      (result) => {
        toastr.success('Senha Alterada com sucesso!');
      },
      (error) => {
        toastr.error('Ocorreu um erro ao processar');
        console.log(error);
        if (error.status == 400) {
          this.listErrors = error.error.mensagem;
        }
      }
    );
  }

}
