/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { EnderecoChurchDialogComponent } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church-dialog.component';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.service';
import { EnderecoChurch } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.model';

describe('Component Tests', () => {

    describe('EnderecoChurch Management Dialog Component', () => {
        let comp: EnderecoChurchDialogComponent;
        let fixture: ComponentFixture<EnderecoChurchDialogComponent>;
        let service: EnderecoChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [EnderecoChurchDialogComponent],
                providers: [
                    EnderecoChurchService
                ]
            })
            .overrideTemplate(EnderecoChurchDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnderecoChurchDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnderecoChurchService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnderecoChurch(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.endereco = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enderecoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EnderecoChurch();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.endereco = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enderecoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
