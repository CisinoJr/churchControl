import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FilialChurch } from './filial-church.model';
import { FilialChurchPopupService } from './filial-church-popup.service';
import { FilialChurchService } from './filial-church.service';

@Component({
    selector: 'jhi-filial-church-delete-dialog',
    templateUrl: './filial-church-delete-dialog.component.html'
})
export class FilialChurchDeleteDialogComponent {

    filial: FilialChurch;

    constructor(
        private filialService: FilialChurchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filialService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'filialListModification',
                content: 'Deleted an filial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filial-church-delete-popup',
    template: ''
})
export class FilialChurchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filialPopupService: FilialChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.filialPopupService
                .open(FilialChurchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
