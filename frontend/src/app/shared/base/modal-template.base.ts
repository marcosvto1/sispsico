import { Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiceBase } from './service.base';
import { Filtro } from '../model/transiente/filtro';

export class ModalTemplateBase<T> implements OnInit {

  @Output()
  onHide: EventEmitter<boolean> = new EventEmitter();

  @Output()
  onSelected: EventEmitter<T> = new EventEmitter<T>();

  listaResource: T[] = [];
  compos: string[];
  filtro: Filtro = new Filtro();
  page = 1;
  total: number;
  pageCount: number;
  count: number;

  constructor(protected service: ServiceBase<T>) {
  }

  ngOnInit() {
    this.loadResources();
  }

  loadResources() {
    console.log(this.filtro);
    this.service.consultarLista(this.filtro, this.page).subscribe(
      (result: any) => {
        this.listaResource = result.data;
        if (result.metadata) {
          this.total = result.metadata.total;
          this.pageCount = result.metadata.pageCount;
        }
      },
      (error) => {}
    );
  }

  modalHide() {
    this.onHide.emit(true);
  }

  pageNext({page}) {
    this.page = page;
    this.loadResources();
  }
  pageBack({page}) {
    this.page = page;
    this.loadResources();
  }
}
