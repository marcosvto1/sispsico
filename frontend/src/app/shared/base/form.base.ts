import { OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModelBase } from 'src/app/shared/base/model.base';
import { ServiceBase } from './service.base';
import toastr from 'toastr';


export abstract class FormBase<T extends ModelBase> implements OnInit {
  currentAction: string;
  resourceForm: FormGroup;
  resource: T;

  // Injectables
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public model: T,
    protected service: ServiceBase<T>

  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
    this.buildResourceForm();
  }

  initDefault() {}

  loadResource() {
    if (this.currentAction == 'edit') {
      const idResource = this.route.snapshot.params.id;
      this.service.consultarObjeto(idResource).subscribe(
        (result) => {
          this.resourceForm.patchValue(result);
          this.resource = result;
        },
        (error) => {
          this.actionForError(error);
        }
      );
    }
  }

  onSubmit() {
    if (this.resourceForm.valid) {
      const jsonDados = this.service.fromJson(this.resourceForm.value);
      if (this.currentAction == 'add') {
        this.service.inserir(jsonDados).subscribe(
          result => {
            console.log(result);
            this.actionForSuccess(result);
          },
          error => {
            console.log(error);
            this.actionForError(error);
          }
        );
      } else {
        this.service.alterar(jsonDados).subscribe(
          result => {
            this.actionForSuccess(result);
          },
          error => {
            this.actionForError(error);
          }
        );
      }
    }
  }

  protected actionForSuccess(resource: T) {
    if (resource) {
      toastr.success('Ação processada com sucesso!');

      const urlTree = this.router.createUrlTree(['.'], { relativeTo: this.route.parent });
      const parentUrl = this.router.serializeUrl(urlTree);
  
      // redirect/reload component page
      this.router.navigateByUrl(parentUrl);

    }
  }

  protected actionForError(error: Error) {
    toastr.error('Ocorreu um erro ao processar solicitação');
  }

  protected setCurrentAction() {
    const lastUrl = this.route.snapshot.url.length - 1;
    if (this.route.snapshot.url[lastUrl].path == 'add') {
      this.currentAction = 'add';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected abstract buildResourceForm(): void;
  
}
