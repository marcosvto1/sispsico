import { Component, OnInit, Injector } from '@angular/core';
import { Psicologo } from '../shared/psicologo.model';
import { FormBase } from 'src/app/shared/base/form.base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PsicologoService } from '../shared/psicologo.service';
import { Validators } from '@angular/forms';
import { TplModalPsicologoComponent } from 'src/app/shared/components/template-modal/tpl-modal-psicologo/tpl-modal-psicologo.component';

@Component({
  selector: 'app-psicologo-form',
  templateUrl: './psicologo-form.component.html',
  styleUrls: ['./psicologo-form.component.scss']
})
export class PsicologoFormComponent extends FormBase<Psicologo> {

  modalRef: BsModalRef;

  constructor(protected injector: Injector, private psicologoService: PsicologoService, private modalService: BsModalService) { 
    super(injector, new Psicologo(), psicologoService);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null],
      codigo: [null, [Validators.required]],
      crp: [null, [Validators.required]],
      especialidade: [null, [Validators.required]],
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

  gerarModalUsuarioPsicologo() {
    this.modalRef = this.modalService.show(TplModalPsicologoComponent);

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
