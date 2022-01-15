import { environment } from './../../../../environments/environment';
import { ServiceBase } from 'src/app/shared/base/service.base';
import { Injectable, Injector } from '@angular/core';
import { Dashboard } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ServiceBase<Dashboard> {

  entity = 'dashboard';

  constructor(protected injector: Injector) {
    super(injector);
  }

  fromJson(jsonData: any) {
    return Dashboard.fromJson(jsonData);
  }

  consultarDashboard() {
    return this.http.get(environment.url + '/dashboard');
  }
}
