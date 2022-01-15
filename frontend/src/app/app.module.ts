import { CoreModule } from "./core/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbMenuModule, NbIconModule} from '@nebular/theme';
import { SharedModule } from './shared/shared.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { AtendenteListComponent } from './pages/atendente/atendente-list/atendente-list.component';
import { MedicoFormComponent } from './pages/medico/medico-form/medico-form.component';
import { PsicologoListComponent } from './pages/psicologo/psicologo-list/psicologo-list.component';
import { PsicologoFormComponent } from './pages/psicologo/psicologo-form/psicologo-form.component';


@NgModule({
  declarations: [AppComponent,],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
