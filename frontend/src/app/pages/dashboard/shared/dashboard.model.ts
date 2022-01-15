import { ModelBase } from 'src/app/shared/base/model.base';
export class Dashboard extends ModelBase {
  constructor(
    public qtd_psicologos?: number,
    public qtd_pacientes?: number,
    public qtd_agendamento_atendido?: number,
    public qtd_agendamento_pendente?: number,
  ) {
    super();
  }

  static campos: string[] = ['id', 'nome', 'cpf'];

  static fromJson(jsonData: any): Dashboard {
    return Object.assign(new Dashboard(), jsonData);
  }
}