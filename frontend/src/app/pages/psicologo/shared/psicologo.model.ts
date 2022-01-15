import { ModelBase } from 'src/app/shared/base/model.base';
import { ContratoTrabalho } from 'src/app/shared/model/contrato_trabalho.model';
import { Usuario } from '../../usuario/shared/usuario.model';
export class Psicologo extends ModelBase {
  constructor(
    public id?: number,
    public usuario_id?: number,
    public usuario?: Usuario,
    public codigo?: string,
    public crp?: string,
    public especialidade?: string,
    public contrato_trabalho_id?: number,
    public contrato_trabalho?: ContratoTrabalho,
  ) {
    super();
  }

  static campos: string[] = ['id', 'codigo', 'crp'];

  static fromJson(jsonData: any): Psicologo {
    return Object.assign(new Psicologo(), jsonData);
  }
}