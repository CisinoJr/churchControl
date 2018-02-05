import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EnderecoChurch } from './endereco-church.model';
import { EnderecoChurchPopupService } from './endereco-church-popup.service';
import { EnderecoChurchService } from './endereco-church.service';

@Component({
    selector: 'jhi-endereco-church-delete-dialog',
    templateUrl: './endereco-church-delete-dialog.component.html'
})
export class EnderecoChurchDeleteDialogComponent {

    endereco: EnderecoChurch;

    constructor(
        private enderecoService: EnderecoChurchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enderecoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enderecoListModification',
                content: 'Deleted an endereco'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-endereco-church-delete-popup',
    template: ''
})
export class EnderecoChurchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enderecoPopupService: EnderecoChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enderecoPopupService
                .open(EnderecoChurchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
