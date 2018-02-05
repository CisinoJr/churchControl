import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChurchControlSharedModule } from '../../shared';
import {
    FilialChurchService,
    FilialChurchPopupService,
    FilialChurchComponent,
    FilialChurchDetailComponent,
    FilialChurchDialogComponent,
    FilialChurchPopupComponent,
    FilialChurchDeletePopupComponent,
    FilialChurchDeleteDialogComponent,
    filialRoute,
    filialPopupRoute,
    FilialChurchResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...filialRoute,
    ...filialPopupRoute,
];

@NgModule({
    imports: [
        ChurchControlSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilialChurchComponent,
        FilialChurchDetailComponent,
        FilialChurchDialogComponent,
        FilialChurchDeleteDialogComponent,
        FilialChurchPopupComponent,
        FilialChurchDeletePopupComponent,
    ],
    entryComponents: [
        FilialChurchComponent,
        FilialChurchDialogComponent,
        FilialChurchPopupComponent,
        FilialChurchDeleteDialogComponent,
        FilialChurchDeletePopupComponent,
    ],
    providers: [
        FilialChurchService,
        FilialChurchPopupService,
        FilialChurchResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChurchControlFilialChurchModule {}
