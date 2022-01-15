import { ModelBase } from 'src/app/shared/base/model.base';
import { ContratoTrabalho } from 'src/app/shared/model/contrato_trabalho.model';
import { Usuario } from '../../usuario/shared/usuario.model';
export class Medico extends ModelBase {
  constructor(
    public id?: number,
    public usuario_id?: number,
    public usuario?: Usuario,
    public codigo?: string,
    public crm?: string,
    public especialidade?: string,
    public contrato_trabalho_id?: number,
    public contrato_trabalho?: ContratoTrabalho,
  ) {
    super();
  }

  static campos: string[] = ['id', 'codigo', 'crm'];

  static fromJson(jsonData: any): Medico {
    return Object.assign(new Medico(), jsonData);
  }
}