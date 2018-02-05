import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MembrosChurch } from './membros-church.model';
import { MembrosChurchService } from './membros-church.service';

@Component({
    selector: 'jhi-membros-church-detail',
    templateUrl: './membros-church-detail.component.html'
})
export class MembrosChurchDetailComponent implements OnInit, OnDestroy {

    membros: MembrosChurch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private membrosService: MembrosChurchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMembros();
    }

    load(id) {
        this.membrosService.find(id).subscribe((membros) => {
            this.membros = membros;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMembros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'membrosListModification',
            (response) => this.load(this.membros.id)
        );
    }
}
