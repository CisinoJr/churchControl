import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MembrosChurch } from './membros-church.model';
import { MembrosChurchPopupService } from './membros-church-popup.service';
import { MembrosChurchService } from './membros-church.service';
import { EnderecoChurch, EnderecoChurchService } from '../endereco-church';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-membros-church-dialog',
    templateUrl: './membros-church-dialog.component.html'
})
export class MembrosChurchDialogComponent implements OnInit {

    membros: MembrosChurch;
    isSaving: boolean;

    enderecos: EnderecoChurch[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private membrosService: MembrosChurchService,
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
        if (this.membros.id !== undefined) {
            this.subscribeToSaveResponse(
                this.membrosService.update(this.membros));
        } else {
            this.subscribeToSaveResponse(
                this.membrosService.create(this.membros));
        }
    }

    private subscribeToSaveResponse(result: Observable<MembrosChurch>) {
        result.subscribe((res: MembrosChurch) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MembrosChurch) {
        this.eventManager.broadcast({ name: 'membrosListModification', content: 'OK'});
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
    selector: 'jhi-membros-church-popup',
    template: ''
})
export class MembrosChurchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private membrosPopupService: MembrosChurchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.membrosPopupService
                    .open(MembrosChurchDialogComponent as Component, params['id']);
            } else {
                this.membrosPopupService
                    .open(MembrosChurchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
