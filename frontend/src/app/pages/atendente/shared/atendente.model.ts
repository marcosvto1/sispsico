import { ModelBase } from 'src/app/shared/base/model.base';
import { ContratoTrabalho } from 'src/app/shared/model/contrato_trabalho.model';
import { Usuario } from '../../usuario/shared/usuario.model';
export class Atendente extends ModelBase {
  constructor(
    public id?: number,
    public usuario_id?: number,
    public usuario?: Usuario,
    public codigo?: string,
    public contrato_trabalho_id?: number,
    public contrato_trabalho?: ContratoTrabalho,
  ) {
    super();
  }

  static campos: string[] = ['id'];

  static fromJson(jsonData: any): Atendente {
    return Object.assign(new Atendente(), jsonData);
  }
}