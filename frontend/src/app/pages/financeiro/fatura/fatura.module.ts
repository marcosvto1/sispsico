import { SharedModule, options } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaturaRoutingModule } from './fatura-routing.module';
import { FaturaListComponent } from './fatura-list/fatura-list.component';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};


@NgModule({
  declarations: [FaturaListComponent, FaturaFormComponent],
  imports: [
    CommonModule,
    FaturaRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CurrencyMaskModule,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class FaturaModule { }
