import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EnderecoChurch } from './endereco-church.model';
import { EnderecoChurchPopupService } from './endereco-church-popup.service';
import { EnderecoChurchService } from './endereco-church.service';

@Component({
    selector: 'jhi-endereco-church-dialog',
    templateUrl: './endereco-church-dialog.component.html'
})
export class EnderecoChurchDialogComponent implements OnInit {

    endereco: EnderecoChurch;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private enderecoService: EnderecoChurchService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.endereco.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enderecoService.update(this.endereco));
        } else {
            this.subscribeToSaveResponse(
                this.enderecoService.create(this.endereco));
        }
    }

    private subscribeToSaveResponse(result: Observable<EnderecoChurch>) {
        result.subscribe((res: EnderecoChurch) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EnderecoChurch) {
        this.eventManager.broadcast({ name: 'enderecoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-endereco-church-popup',
    template: ''
})
export class EnderecoChurchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enderecoPopupService: EnderecoChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enderecoPopupService
                    .open(EnderecoChurchDialogComponent as Component, params['id']);
            } else {
                this.enderecoPopupService
                    .open(EnderecoChurchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
