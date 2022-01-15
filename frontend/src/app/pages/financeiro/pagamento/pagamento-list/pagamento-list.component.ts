import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Fatura } from '../../fatura/shared/fatura.model';
import { TplModalPacienteComponent } from 'src/app/shared/components/template-modal/tpl-modal-paciente/tpl-modal-paciente.component';
import { ListBase } from 'src/app/shared/base/list.base';
import { FaturaService } from './../../fatura/shared/fatura.service';

import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';

const initialFitroJson =  {
  campo: 'data_pagamento',
  paciente_id: '',
  paciente: '',
  situacao: 'PR',
  dataInicio: '',
  dataFinal: '',
};

@Component({
  selector: 'app-pagamento-list',
  templateUrl: './pagamento-list.component.html',
  styleUrls: ['./pagamento-list.component.scss']
})
export class PagamentoListComponent extends ListBase<Fatura> {
  campos = Fatura.campos;
  domainFormPagamento = Fatura.domainFormaPagamento;
  filtroJson = {...initialFitroJson};
  modalRef: BsModalRef;
  listaResource: any[];

  totalFaturaPagas = 0;
  totalFaturaPendentes = 0;

  constructor(
    protected injector: Injector, 
    private faturaService: FaturaService,
    private modalService: BsModalService,
    private formBulder: FormBuilder
  ) {
    super(injector, faturaService, new Fatura(), true);
    this.consultarTotais();
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

  filtrar() {
    this.loadResources();
  }

  limparFiltro() {
    this.filtroJson = {...initialFitroJson};
    this.loadResources();
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
