import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FilialChurch } from './filial-church.model';
import { FilialChurchPopupService } from './filial-church-popup.service';
import { FilialChurchService } from './filial-church.service';
import { EnderecoChurch, EnderecoChurchService } from '../endereco-church';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-filial-church-dialog',
    templateUrl: './filial-church-dialog.component.html'
})
export class FilialChurchDialogComponent implements OnInit {

    filial: FilialChurch;
    isSaving: boolean;

    enderecos: EnderecoChurch[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private filialService: FilialChurchService,
        private enderecoService: EnderecoChurchService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enderecoService.query()
            .subscribe((res: ResponseWrapper) => { this.enderecos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.filial.id !== undefined) {
            this.subscribeToSaveResponse(
                this.filialService.update(this.filial));
        } else {
            this.subscribeToSaveResponse(
                this.filialService.create(this.filial));
        }
    }

    private subscribeToSaveResponse(result: Observable<FilialChurch>) {
        result.subscribe((res: FilialChurch) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FilialChurch) {
        this.eventManager.broadcast({ name: 'filialListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnderecoById(index: number, item: EnderecoChurch) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-filial-church-popup',
    template: ''
})
export class FilialChurchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filialPopupService: FilialChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.filialPopupService
                    .open(FilialChurchDialogComponent as Component, params['id']);
            } else {
                this.filialPopupService
                    .open(FilialChurchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
