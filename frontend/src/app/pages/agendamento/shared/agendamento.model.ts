import { Usuario } from './../../usuario/shared/usuario.model';
import { ModelBase } from 'src/app/shared/base/model.base';
import { Paciente } from '../../paciente/shared/paciente.model';
export class Agendamento extends ModelBase {
  constructor(
    public id?: number,
    public data_inicio?: Date,
    public data_final?: Date,
    public situacao?: string,
    public paciente_id?: string,
    public usuario_id?: number,
    public nome?: string,
    public telefone?: string,
    public celular?: string,
    public paciente?: Paciente,
    public usuario?: Usuario
  ) {
    super();
  }

  static campos: string[] = ['id', 'nome', 'cpf'];

  static fromJson(jsonData: any): Agendamento {
    return Object.assign(new Agendamento(), jsonData);
  }
}