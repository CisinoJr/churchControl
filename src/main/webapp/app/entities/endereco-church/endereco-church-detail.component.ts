import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EnderecoChurch } from './endereco-church.model';
import { EnderecoChurchService } from './endereco-church.service';

@Component({
    selector: 'jhi-endereco-church-detail',
    templateUrl: './endereco-church-detail.component.html'
})
export class EnderecoChurchDetailComponent implements OnInit, OnDestroy {

    endereco: EnderecoChurch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enderecoService: EnderecoChurchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnderecos();
    }

    load(id) {
        this.enderecoService.find(id).subscribe((endereco) => {
            this.endereco = endereco;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnderecos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enderecoListModification',
            (response) => this.load(this.endereco.id)
        );
    }
}
