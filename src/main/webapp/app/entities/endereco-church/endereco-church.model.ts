import { BaseEntity } from './../../shared';

export class EnderecoChurch implements BaseEntity {
    constructor(
        public id?: number,
        public rua?: string,
        public numero?: string,
        public cep?: string,
        public cidade?: string,
        public estado?: string,
    ) {
    }
}
