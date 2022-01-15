import { OnInit } from '@angular/core';
import { Injector } from '@angular/core';
import { Filtro } from './../model/transiente/filtro';
import { ModelBase } from 'src/app/shared/base/model.base';
import { ServiceBase } from './service.base';

import toastr from 'toastr';

export abstract class ListBase<T extends ModelBase> implements OnInit {
  loadingResource = true;
  listaResource: T[] = [];
  paginate = false;
  filtro: Filtro = new Filtro();
  count: number;
  total: number;
  page = 1;
  pageCount: number;

  constructor(
    protected injector: Injector,
    protected serviceResource: ServiceBase<T>,
    protected resource: T,
    protected isPaginate: boolean
    ) {
      this.paginate = isPaginate;
    }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.loadingResource = true;
    this.serviceResource.consultarLista(this.filtro, this.paginate == true ? this.page : null).subscribe(
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

  pageChanged({page}) {
    this.page = page;
    this.loadResources();
  }

  pageNext({page}) {
    this.page = page;
    if (this.page < this.pageCount) {
      this.loadResources();
    }
  }

  pageBack({page}) {
    this.page = page;
    if (this.page > 1) {
      this.loadResources();
    }
  }

  remove(id) {
    const res = confirm('*** Tem certeza que deseja excluir este registro ***??');
    if (res) {
      this.serviceResource.excluir(id).subscribe(
        (result) => {
          toastr.success('Registro removido com sucesso!');
          this.loadResources();
        },
        (error) => {
          toastr.error('Ocorreu um erro ao remover registro');
        }
      );
    }
  }

}
