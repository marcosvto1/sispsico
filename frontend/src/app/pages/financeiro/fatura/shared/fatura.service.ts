import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';
import { Fatura } from './fatura.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaturaService extends ServiceBase<Fatura> {
  entity = 'fatura';

  constructor(protected injector: Injector) {
    super(injector);
  }

  fromJson(jsonData: any) {
    return Fatura.fromJson(jsonData);
  }

  consultarLista(filtro, page?: number, paginate: boolean = true): Observable<{ data: Fatura[], any}> {
    const filtroParams = Object.entries(filtro);
    let parametros = '?';
    for (let i = 0; i < Object.entries(filtro).length; i++) {
        if (filtroParams[i][0].includes('data') && (filtroParams[i][1] != '')) {
          parametros += `${filtroParams[i][0]}=${new Date(filtroParams[i][1].toString()).toISOString().slice(0,10)}&`;
        } else {
          parametros += `${filtroParams[i][0]}=${filtroParams[i][1]}&`;
        }
    }
    const pathUrl = environment.url + '/' + this.entity + parametros + 'paginate=true&page='+ page;
    return this.http
      .get(pathUrl)
      .pipe(map(this.jsonDataToResources.bind(this)));
  }

  consultarTotais() {
    return this.http.get(environment.url + '/' + this.entity + '/totais');
  }
}
