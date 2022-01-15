import { ModelBase } from 'src/app/shared/base/model.base';
import { Paciente } from './../../../paciente/shared/paciente.model';

export class Fatura extends ModelBase {
  constructor(
    public id?: number,
    public descricao?: string,
    public data_fatura?: Date,
    public data_vencimento?: Date,
    public valor_total?: number,
    public valor_final?: number,
    public desconto?: number,
    public situacao?: string,
    public paciente?: Paciente,
    public forma_pagamento?: string,
    public valor_pago?: number,
    public data_pagamento?: Date,
    public lista_fatura_detalhe?: any[]
  ) {
    super();
  }

  static campos: string[] = ['data_fatura'];
  static camposFiltro = [
    {campo: 'data_fatura', tipo: 'simples'},
    {campo: 'nome', tipo: 'date'}
  ];

  static domainFormaPagamento(formaPagamento) {
    if (formaPagamento == 'dinheiro') {
      return 'Dinheiro';
    } else if (formaPagamento == 'plano_saude') {
      return 'Plano de Sáude';
    } else if (formaPagamento == 'cheque') {
      return 'Cheque';
    } else if (formaPagamento == 'cartao_credido') {
      return 'Cartão de Credito';
    } else {
      return 'Indefinido';
    }
  }

  static fromJson(jsonDados: any): Fatura {
    return Object.assign(new Fatura(),
    {
      ...jsonDados,
      data_fatura: jsonDados.data_fatura != null ? new Date(jsonDados.data_fatura).toISOString().slice(0, 10) : null,
      data_vencimento: jsonDados.data_vencimento != null ? new Date(jsonDados.data_vencimento).toISOString().slice(0, 10) : null
    });
  }
}
