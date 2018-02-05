import { BaseEntity } from './../../shared';

export class FilialChurch implements BaseEntity {
    constructor(
        public id?: number,
        public razaoSocial?: string,
        public cnpj?: string,
        public tipo?: string,
        public telefone?: string,
        public endereco?: BaseEntity,
    ) {
    }
}
