import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChurchControlSharedModule } from '../../shared';
import {
    EnderecoChurchService,
    EnderecoChurchPopupService,
    EnderecoChurchComponent,
    EnderecoChurchDetailComponent,
    EnderecoChurchDialogComponent,
    EnderecoChurchPopupComponent,
    EnderecoChurchDeletePopupComponent,
    EnderecoChurchDeleteDialogComponent,
    enderecoRoute,
    enderecoPopupRoute,
    EnderecoChurchResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...enderecoRoute,
    ...enderecoPopupRoute,
];

@NgModule({
    imports: [
        ChurchControlSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnderecoChurchComponent,
        EnderecoChurchDetailComponent,
        EnderecoChurchDialogComponent,
        EnderecoChurchDeleteDialogComponent,
        EnderecoChurchPopupComponent,
        EnderecoChurchDeletePopupComponent,
    ],
    entryComponents: [
        EnderecoChurchComponent,
        EnderecoChurchDialogComponent,
        EnderecoChurchPopupComponent,
        EnderecoChurchDeleteDialogComponent,
        EnderecoChurchDeletePopupComponent,
    ],
    providers: [
        EnderecoChurchService,
        EnderecoChurchPopupService,
        EnderecoChurchResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChurchControlEnderecoChurchModule {}
