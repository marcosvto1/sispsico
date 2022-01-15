import { LoginService } from '../../auth/shared/login.service';
import { UsuarioService } from '../../usuario/shared/usuario.service';
import { Usuario } from '../../usuario/shared/usuario.model';
import { TplModalPacienteComponent } from '../../../shared/components/template-modal/tpl-modal-paciente/tpl-modal-paciente.component';
import { PacienteService } from '../../paciente/shared/paciente.service';
import { Agendamento } from '../shared/agendamento.model';
import { FormBase } from 'src/app/shared/base/form.base';
import { Component, OnInit, Injector } from '@angular/core';
import { AgendamentoService } from '../shared/agendamento.service';
import { Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TplModalUsuarioComponent } from 'src/app/shared/components/template-modal/tpl-modal-usuario/tpl-modal-usuario.component';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.scss']
})
export class AgendamentoFormComponent extends FormBase<Agendamento> implements OnInit {
  modalRef: BsModalRef;
  nomePsicologo: string;
  horas: string[] = [];
  listaMinDuracao: string[] = [
    '15',
    '30',
    '45',
    '60',
  ];
  listaMin: string[] = [
    '00',
    '30',
    '60',
  ];
  currentUser;

  constructor(
    protected injector: Injector,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService,
    private loginService: LoginService,
    private modalService: BsModalService
    ) {
    super(injector, new Agendamento(), agendamentoService);
    for (let i = 7; i <= 18; i++) {
      this.horas.push((i > 9 ? '' : '0' ) + i);
    }
    this.loginService.currentUser.subscribe(result => {
      this.currentUser = result;
    });
   }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required]],
        telefone: [null],
        celular: [null],
        responsavel: [null],
        situacao: ['R', [Validators.required]],
        data_inicio: [new Date(), [Validators.required]],
        hora_inicio: ['07', [Validators.required]],
        min_inicio: ['00', [Validators.required]],

        data_final: [new Date(), [Validators.required]],
        hora_final: ['08', [Validators.required]],
        min_final: ['00', [Validators.required]],

        paciente_id: [null],
        usuario_id: [null],
        paciente: [null]
    });

    if (Object.keys(this.route.snapshot.params).length !== 0 && this.route.snapshot.params.constructor === Object) {
      this.resourceForm.get('data_inicio').setValue(new Date(this.route.snapshot.params.dataInicio));
      this.resourceForm.get('min_inicio').setValue(this.route.snapshot.params.minInicio);
      this.resourceForm.get('hora_inicio').setValue(this.route.snapshot.params.horaInicio);

      this.resourceForm.get('data_final').setValue(new Date(this.route.snapshot.params.dataFinal));
      this.resourceForm.get('min_final').setValue(this.route.snapshot.params.minFinal);
      this.resourceForm.get('hora_final').setValue(this.route.snapshot.params.horaFinal);

      if (this.currentUser.user.papel == 'P') {
        this.resourceForm.get('usuario_id').setValue(this.currentUser.user.id);
      }
    }

  }

  gerarModalPaciente() {
    this.modalRef = this.modalService.show(TplModalPacienteComponent, {
      class: 'modal-lg'
    });

    this.modalRef.content.onHide.subscribe(
      (isHide) => {
        if (isHide) {
          this.modalRef.hide();
        }
      }
    );

    this.modalRef.content.onSelected.subscribe(
      (itemSelected) => {
        if (itemSelected) {
          this.resourceForm.get('nome').setValue(itemSelected.nome);
          this.resourceForm.get('telefone').setValue(itemSelected.telefone);
          this.resourceForm.get('celular').setValue(itemSelected.celular);
          this.resourceForm.get('responsavel').setValue(itemSelected.responsavel);
          this.resourceForm.get('paciente').patchValue(itemSelected);
          this.resourceForm.get('paciente_id').setValue(itemSelected.id);
          this.modalRef.hide();
        }
      }
    );
  }

  gerarModalUsuario() {
    this.modalRef = this.modalService.show(TplModalUsuarioComponent, {
      class: 'modal-lg'
    });

    this.modalRef.content.onHide.subscribe(
      (isHide) => {
        if (isHide) {
          this.modalRef.hide();
        }
      }
    );

    this.modalRef.content.onSelected.subscribe(
      (itemSelected) => {
        if (itemSelected) {
          console.log(itemSelected);
          this.nomePsicologo = itemSelected.nome;
          this.resourceForm.get('usuario_id').setValue(itemSelected.id);
          this.modalRef.hide();
        }
      }
    );
  }


}
