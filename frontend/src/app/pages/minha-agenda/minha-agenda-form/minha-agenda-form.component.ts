import { Component, OnInit, Injector } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Agenda } from '../shared/agenda.model';
import { FormBase } from 'src/app/shared/base/form.base';
import { AgendaService } from '../shared/agenda.service';
import { Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Usuario } from '../../usuario/shared/usuario.model';
import { LoginService } from '../../auth/shared/login.service';

import { Options } from 'select2';
import { AtendenteService } from '../../atendente/shared/atendente.service';
import { Atendente } from '../../atendente/shared/atendente.model';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-minha-agenda-form',
  templateUrl: './minha-agenda-form.component.html',
  styleUrls: ['./minha-agenda-form.component.scss']
})
export class MinhaAgendaFormComponent extends FormBase<Agenda> {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  usuario_id: number;
  public options: Options;
  atendentes: any[];
  
  constructor(protected injector: Injector, 
    private agendaService: AgendaService, 
    private loginService: LoginService,
    private atendenteService: AtendenteService) {
    super(injector, new Agenda, agendaService);

    this.dropdownList = [
      { id: 1, text: 'Segunda' },
      { id: 2, text: 'Terça' },
      { id: 3, text: 'Quarta' },
      { id: 4, text: 'Quinta' },
      { id: 5, text: 'Sexta' },
      { id: 6, text: 'Sábado'},
      { id: 7, text: 'Domingo'}
    ];

    
   }

  protected buildResourceForm(result?: any): void {
   

      this.resourceForm = this.formBuilder.group({
        id: [null],
        descricao: [null, [Validators.required]],
        hora_inicial: [null, [Validators.required]],
        hora_final: [null, [Validators.required]],
        dias_disponivel: [null, [Validators.required]],
        listaAtendente: [null]
      });

    

  }

  ngOnInit() {
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
    this.setCurrentAction();
    this.loadResource();
    this.buildResourceForm();
    this.loadAtendente();
  }

  loadResource() {
    if (this.currentAction == 'edit') {
      const idResource = this.route.snapshot.params.id;
      this.service.consultarObjeto(idResource).subscribe(
        (result) => {
          this.resourceForm.get('dias_disponivel').patchValue(result.dias_disponivel.split(','));
          this.resourceForm.get('id').setValue(result.id);
          this.resourceForm.get('hora_inicial').setValue(result.hora_inicial);
          this.resourceForm.get('hora_final').setValue(result.hora_final);
          this.resourceForm.get('descricao').setValue(result.descricao);
          this.resourceForm.get('listaAtendente').setValue(result.listaAtendente.map((item) => item.atendente_id.toString()))
          this.resource = result;
        },
        (error) => {
          this.actionForError(error);
        }
      );
    }
  }

  loadAtendente() {
    this.atendenteService.consultarLista().subscribe(
      (result) => {
        this.atendentes = result.data.map((item) => {
          return {id: item.id, text: item.usuario.nome }
        }  
        );
      },
      (error) => {}
    ) 
  }

}
