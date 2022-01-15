import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FaturaService } from './../shared/fatura.service';
import { ListBase } from 'src/app/shared/base/list.base';
import { Component, OnInit, Injector, TemplateRef } from '@angular/core';
import { Fatura } from '../shared/fatura.model';
import { BsModalService } from 'ngx-bootstrap';
import { TplModalPacienteComponent } from 'src/app/shared/components/template-modal/tpl-modal-paciente/tpl-modal-paciente.component';

import toastr from 'toastr';

const initialFiltroJson = {
  campo: 'data_fatura',
  paciente_id: '',
  paciente: '',
  situacao: '',
  dataInicio: '',
  dataFinal: '',
};

@Component({
  selector: 'app-fatura-list',
  templateUrl: './fatura-list.component.html',
  styleUrls: ['./fatura-list.component.scss']
})
export class FaturaListComponent extends ListBase<Fatura> {
  campos = Fatura.campos;
  filtroJson = {...initialFiltroJson};
  modalRef: BsModalRef;
  form: FormGroup;
  faturaSelecionada: Fatura;

  totalFaturaPagas = 0;
  totalFaturaPendentes = 0;

  constructor(
    protected injector: Injector, private faturaService: FaturaService,
    private modalService: BsModalService,
    private formBulder: FormBuilder
  ) {
    super(injector, faturaService, new Fatura(), true);
    this.consultarTotais();
  }

  filtrar() {
    this.loadResources();
  }

  limparFiltro() {
    this.filtroJson = {...initialFiltroJson};
    console.log(this.filtroJson);
    this.loadResources();
  }

  // @override
  loadResources() {
    this.loadingResource = true;

    this.serviceResource.consultarLista(this.filtroJson, this.paginate == true ? this.page : null).subscribe(
      (result: any) => {
        this.loadingResource = false;
        this.listaResource = result.data;
        if (result.metadata) {
          this.total = result.metadata.total;
          this.pageCount = result.metadata.pageCount;
          this.count = result.metadata.count;
        }
      },
      (error) => {
        console.log(error);
        this.loadingResource = false;
      }
    );
  }

  buildForm() {
    this.form = this.formBulder.group({
      id: [null],
      situacao: [null],
      forma_pagamento: [null],
      valor_pago: [null],
      data_pagamento: [null]
    });
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
      (itemSelected: any) => {
        if (itemSelected) {
          this.filtroJson.paciente_id = itemSelected.id;
          this.filtroJson.paciente = itemSelected.nome;
          this.modalRef.hide();
        }
      }
    );
  }

  gerarModalSituacaoFatura(template: TemplateRef<any>, faturaSelecionada) {
    // Construi o formulário
    this.buildForm();

    // Associa a fatura em questão
    this.faturaSelecionada = faturaSelecionada;

    // associa os valores da futura com formulário
    this.form.patchValue(this.faturaSelecionada);
    this.form.get('valor_pago').setValue(this.faturaSelecionada.valor_final);

    // mostra o modal
    this.modalRef = this.modalService.show(template);
  }

  onSubmitFormSituacao() {

    if (this.form.get('situacao').value == 'PR') {
      this.form.get('data_pagamento').setValue(new Date().toISOString().slice(0, 10));
    }

    if (this.form.valid) {
      const jsonDados = Fatura.fromJson({
        ...this.faturaSelecionada,
        ...this.form.value
      });

      this.serviceResource.alterar(jsonDados).subscribe(
        (result) => {
          if (result) {
            toastr.success('Situaçao atualizada com sucesso');
            this.loadResources();
            this.modalRef.hide();
          }
        },
        (error) => {
          toastr.error('Ocorreu um erro ao processar solicitação');
        }
      );
    }
  }

  consultarTotais() {
    this.faturaService.consultarTotais().subscribe(
      ({totalFaturaPagas, totalFaturaPendentes}: any) => {
        this.totalFaturaPagas =  totalFaturaPagas;
        this.totalFaturaPendentes = totalFaturaPendentes;
      }
    );
  }

}
