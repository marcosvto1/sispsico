import { HttpClient, HttpParams } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { ModelBase } from "./model.base";
import { Filtro } from "../model/transiente/filtro";
import { environment } from './../../../environments/environment';

export abstract class ServiceBase<T extends ModelBase> {
  protected http: HttpClient;
  protected url = environment.url;

  abstract entity: string;
  abstract fromJson(jsonData: any);

  constructor(protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  consultarLista(filtro?: Filtro, page?: number, paginate: boolean = true): Observable<{ data: T[], any}> {
    let pathUrl = this.tratarFiltro(filtro, page);
    pathUrl = this.tratarPaginacao(pathUrl, paginate);

    return this.http
      .get(pathUrl)
      .pipe(map(this.jsonDataToResources.bind(this)));
  }

  consultarObjeto(id: number): Observable<T> {
    return this.http.get(`${this.url}/${this.entity}/${id}`).pipe(
      map((result: any) => this.fromJson(result.data))
    );
  }

  inserir(resource: T): Observable<T> {
    return this.http
      .post(`${this.url}/${this.entity}`, resource)
      .pipe(map(result => this.fromJson(result)));
  }

  alterar(resource: T): Observable<T> {
    return this.http
      .put(`${this.url}/${this.entity}/${resource.id}`, resource)
      .pipe(map(result => this.fromJson(result)));
  }

  excluir(id): Observable<any> {
    return this.http.delete(`${this.url}/${this.entity}/${id}`);
  }

  protected jsonDataToResources(jsonData: any): {data: T[], metadata: any} {
    const resources: T[] = [];
    console.log(jsonData);
    if ('data' in jsonData && 'meta' in jsonData) {
      const {data} = jsonData;
      const {current_page: page, total, per_page: pageCount, to: count} = jsonData.meta;
      data.forEach(element => resources.push(this.fromJson(element)));
      return {data: resources, metadata: {page, total, pageCount, count}};
    } else {
      if ('data' in jsonData) {
        const {data} = jsonData;
        data.forEach(element => resources.push(this.fromJson(element)));
        return {data: resources, metadata: null};
      } else {
        jsonData.forEach(element => resources.push(this.fromJson(element)));
        return {data: resources, metadata: null};
      }
    }
  }

  protected tratarFiltro(filtro, page) {
    let queryParams = '';
    if (filtro) {
      if ('campo' in filtro && 'valor' in filtro) {
        if (typeof filtro.campo !== 'undefined' && typeof filtro.valor !== 'undefined') {
          queryParams = `?filter=${filtro.campo}||$cont||${filtro.valor}`;
          if (page != null) {
            queryParams += `&page=${page}`;
          }
        } else {
          if (page != null) {
            queryParams += `?page=${page}`;
          }
        }

      } else {
        if (page != null) {
          queryParams += `?page=${page}`;
        }
      }
    }

    return `${this.url}/${this.entity}/${queryParams}`;
  }

  protected tratarPaginacao(pathUrl, paginate) {
    if (pathUrl.includes('?')) {
      return pathUrl + '&paginate=' + paginate;
    } else {
      return pathUrl + '?paginate=' + paginate;
    }
  }
}
