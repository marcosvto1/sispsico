import { ModelBase } from 'src/app/shared/base/model.base';
export class Paciente extends ModelBase {
  constructor(
    public id?: number,
    public nome?: string,
    public telefone?: string,
    public celular?: string,
    public responsavel?: string,
    public ativo?: number,
    public cpf?: string,
    public sexo?: string,
  ) {
    super();
  }

  static campos: string[] = ['id', 'nome', 'cpf'];

  static fromJson(jsonData: any): Paciente {
    return Object.assign(new Paciente(), jsonData);
  }
}