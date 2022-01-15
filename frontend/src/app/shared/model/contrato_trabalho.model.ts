import { ModelBase } from '../base/model.base';

export class ContratoTrabalho extends ModelBase {
    constructor(
        public id?: number,
        public data_admissao?: Date,
        public data_demissao?: Date,
        public matricula?: string,
        public ctps_numero?: string,
        public ctps_serie?: string,
        public ctps_data_expedicao?: Date,
        public ctps_uf?: string,
        public observacao?: string

    ) {
        super();
    }
}