import { Component, OnInit, Injector } from '@angular/core';
import { FormBase } from 'src/app/shared/base/form.base';
import { Atendente } from '../shared/atendente.model';
import { AtendenteService } from '../shared/atendente.service';
import { Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TplModalUsuarioComponent } from 'src/app/shared/components/template-modal/tpl-modal-usuario/tpl-modal-usuario.component';
import { TplModalAtendenteComponent } from 'src/app/shared/components/template-modal/tpl-modal-atendente/tpl-modal-atendente.component';

@Component({
  selector: 'app-atendente-form',
  templateUrl: './atendente-form.component.html',
  styleUrls: ['./atendente-form.component.scss']
})
export class AtendenteFormComponent extends FormBase<Atendente> {

  modalRef: BsModalRef;

  constructor(protected injector: Injector, private atendenteService: AtendenteService, private modalService: BsModalService) { 
    super(injector, new Atendente(), atendenteService);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null],
      codigo: [null, [Validators.required]],
      usuario_id: [null],
      usuario: this.formBuilder.group({
        nome: [null]
      }),
      contrato_trabalho: this.formBuilder.group({
        matricula: [null, [Validators.required]],
        data_admissao: [null, [Validators.required]],
        data_demissao: [null],
        data_cadastro: [null, [Validators.required]],
        ctps_numero: [null],
        ctps_serie: [null],
        ctps_data_expedicao: [null],
        ctps_uf: [null],
        observacao: [null],
      }),
      ativo: [1, [Validators.required]]
    })
  }

  get contratoTrabalho () {
    return this.resourceForm.get('contrato_trabalho');
  }

  gerarModalUsuarioAtendente() {
    this.modalRef = this.modalService.show(TplModalAtendenteComponent);

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
          this.resourceForm.get('usuario_id').setValue(itemSelected.id);
          this.resourceForm.get('usuario').patchValue(itemSelected);
          console.log(this.resourceForm.value);
          this.modalRef.hide();
        }
      }
    );
  }

}
