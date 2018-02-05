import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FilialChurch } from './filial-church.model';
import { FilialChurchService } from './filial-church.service';

@Component({
    selector: 'jhi-filial-church-detail',
    templateUrl: './filial-church-detail.component.html'
})
export class FilialChurchDetailComponent implements OnInit, OnDestroy {

    filial: FilialChurch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private filialService: FilialChurchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFilials();
    }

    load(id) {
        this.filialService.find(id).subscribe((filial) => {
            this.filial = filial;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFilials() {
        this.eventSubscriber = this.eventManager.subscribe(
            'filialListModification',
            (response) => this.load(this.filial.id)
        );
    }
}
