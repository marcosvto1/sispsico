import { ModelBase } from 'src/app/shared/base/model.base';

export class Agenda extends ModelBase {
    constructor(
        public id?: number,
        public dias_disponivel?: string,
        public hora_inicial?: string,
        public hora_final?: string,
        public descricao?: string,
        public listaAtendente?: any
    ) {
        super();
    }

    static mapToDays(dias: any) {
        if (dias) {
            const dias_semana = [
                '',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sabado',
                'Domingo'
            ];
            const arr = dias.split(',');
            return arr.map((item) => { return { id: item, text: dias_semana[item] } });
        }

    }


    static fromJson(jsonDados: any): Agenda {
        return Object.assign(new Agenda, { ...jsonDados });
    }
}