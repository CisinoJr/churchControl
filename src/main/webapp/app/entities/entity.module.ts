import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChurchControlMembrosChurchModule } from './membros-church/membros-church.module';
import { ChurchControlEnderecoChurchModule } from './endereco-church/endereco-church.module';
import { ChurchControlFilialChurchModule } from './filial-church/filial-church.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ChurchControlMembrosChurchModule,
        ChurchControlEnderecoChurchModule,
        ChurchControlFilialChurchModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChurchControlEntityModule {}
