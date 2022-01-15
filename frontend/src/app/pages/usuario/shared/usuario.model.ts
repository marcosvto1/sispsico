import { ModelBase } from 'src/app/shared/base/model.base';
export class Usuario extends ModelBase {
  constructor(
    public id?: number,
    public nome?: string,
    public usuario?: string,
    public password?: string,
    public papel?: string,
    public ativo?: number,
    public logradouro?: string,
    public numero?: string,
    public bairro?: string,
    public cidade?: string,
    public email?: string,
    public admin?: number
  ) {
    super();
  }

  static campos: string[] = ['id', 'nome'];

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}