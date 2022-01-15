export class Filtro {
  constructor(
    public campo?: string,
    public valor?: string,
    public dataInicio?: string,
    public dataFinal?: string,
  ) {}

  static fromJson(jsonData: any): Filtro {
    return Object.assign(new Filtro(), { ...jsonData });
  }
}
