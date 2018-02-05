import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChurchControlSharedModule } from '../../shared';
import {
    MembrosChurchService,
    MembrosChurchPopupService,
    MembrosChurchComponent,
    MembrosChurchDetailComponent,
    MembrosChurchDialogComponent,
    MembrosChurchPopupComponent,
    MembrosChurchDeletePopupComponent,
    MembrosChurchDeleteDialogComponent,
    membrosRoute,
    membrosPopupRoute,
    MembrosChurchResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...membrosRoute,
    ...membrosPopupRoute,
];

@NgModule({
    imports: [
        ChurchControlSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MembrosChurchComponent,
        MembrosChurchDetailComponent,
        MembrosChurchDialogComponent,
        MembrosChurchDeleteDialogComponent,
        MembrosChurchPopupComponent,
        MembrosChurchDeletePopupComponent,
    ],
    entryComponents: [
        MembrosChurchComponent,
        MembrosChurchDialogComponent,
        MembrosChurchPopupComponent,
        MembrosChurchDeleteDialogComponent,
        MembrosChurchDeletePopupComponent,
    ],
    providers: [
        MembrosChurchService,
        MembrosChurchPopupService,
        MembrosChurchResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChurchControlMembrosChurchModule {}
