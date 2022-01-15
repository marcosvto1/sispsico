import { Component, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import { FaturaService } from './../shared/fatura.service';
import { FormBase } from 'src/app/shared/base/form.base';
import { Fatura } from '../shared/fatura.model';
import { TplModalPacienteComponent } from 'src/app/shared/components/template-modal/tpl-modal-paciente/tpl-modal-paciente.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-fatura-form',
  templateUrl: './fatura-form.component.html',
  styleUrls: ['./fatura-form.component.scss']
})
export class FaturaFormComponent extends FormBase<Fatura> {

  modalRef: BsModalRef;
  constructor(
    protected injector: Injector,
    protected faturaService: FaturaService,
    private modalService: BsModalService
    ) {
    super(injector, new Fatura(), faturaService);
   }

  // OVERRIDE
  loadResource() {
    if (this.currentAction == 'edit') {
      const idResource = this.route.snapshot.params.id;
      this.service.consultarObjeto(idResource).subscribe(
        (result: any) => {
          this.resourceForm.patchValue(result);
          this.lista_fatura_detalhe.clear();
          for (const item of result.lista_fatura_detalhe) {
            const faturaDetalhe = this.buildFaturaDetalheForm();
            faturaDetalhe.patchValue(item);
            this.lista_fatura_detalhe.push(faturaDetalhe);
          }
          this.atualizarValorFinal();
        },
        (error) => {
          this.actionForError(error);
        }
      );
    }
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      paciente_id: [null],
      data_fatura: [new Date(), [Validators.required]],
      data_vencimento: [new Date(), [Validators.required]],
      situacao: ['AP'],
      valor_total: [0],
      valor_final: [0],
      desconto: [0],
      lista_fatura_detalhe: this.formBuilder.array([this.buildFaturaDetalheForm()]),
      paciente: this.formBuilder.group({
        nome: [null]
      })
    });
  }

  buildFaturaDetalheForm() {
    return this.formBuilder.group({
      descricao: [null, [Validators.required]],
      valor_unitario: [0, [Validators.required]],
      qtde: [1, [Validators.required]],
      valor_total: [0]
    });
  }

  get lista_fatura_detalhe(): FormArray {
    return this.resourceForm.get('lista_fatura_detalhe') as FormArray;
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
          this.resourceForm.get('paciente').patchValue(itemSelected);
          this.resourceForm.get('paciente_id').setValue(itemSelected.id);
          this.modalRef.hide();
        }
      }
    );
  }

  addFaturaDetalhe() {
    this.lista_fatura_detalhe.push(this.buildFaturaDetalheForm());
  }

  handleValorUnitario(indici: number) {
    const valorUnitario = this.lista_fatura_detalhe.at(indici).get('valor_unitario').value;
    const qtde = this.lista_fatura_detalhe.at(indici).get('qtde').value;
    this.lista_fatura_detalhe.at(indici).get('valor_total').setValue(valorUnitario * qtde);

    this.atualizarValorFinal();
  }

  handleQuantidade(indici: number) {
    const valorUnitario = parseFloat(this.lista_fatura_detalhe.at(indici).get('valor_unitario').value);
    const qtde = this.lista_fatura_detalhe.at(indici).get('qtde').value;
    this.lista_fatura_detalhe.at(indici).get('valor_total').setValue(valorUnitario * qtde);
    this.atualizarValorFinal();
  }

  atualizarValorFinal() {
    let valorTotal = 0.0;
    let desconto = this.resourceForm.get('desconto').value / 100;
    for (let i = 0; i < this.lista_fatura_detalhe.length; i++) {
      const valorTotalDetalhe = parseFloat(this.lista_fatura_detalhe.at(i).get('valor_total').value);
      valorTotal += valorTotalDetalhe;
    }
    desconto = valorTotal * desconto;
    this.resourceForm.get('valor_total').setValue(valorTotal);
    this.resourceForm.get('valor_final').setValue((valorTotal - desconto));
  }


}
