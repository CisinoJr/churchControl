import { BaseEntity } from './../../shared';

export class MembrosChurch implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public celular?: string,
        public email?: string,
        public dataNascimento?: any,
        public endereco?: BaseEntity,
    ) {
    }
}
