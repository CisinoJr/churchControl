import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MembrosChurch } from './membros-church.model';
import { MembrosChurchPopupService } from './membros-church-popup.service';
import { MembrosChurchService } from './membros-church.service';

@Component({
    selector: 'jhi-membros-church-delete-dialog',
    templateUrl: './membros-church-delete-dialog.component.html'
})
export class MembrosChurchDeleteDialogComponent {

    membros: MembrosChurch;

    constructor(
        private membrosService: MembrosChurchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.membrosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'membrosListModification',
                content: 'Deleted an membros'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-membros-church-delete-popup',
    template: ''
})
export class MembrosChurchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private membrosPopupService: MembrosChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.membrosPopupService
                .open(MembrosChurchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
