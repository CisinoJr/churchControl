/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { FilialChurchDialogComponent } from '../../../../../../main/webapp/app/entities/filial-church/filial-church-dialog.component';
import { FilialChurchService } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.service';
import { FilialChurch } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.model';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church';

describe('Component Tests', () => {

    describe('FilialChurch Management Dialog Component', () => {
        let comp: FilialChurchDialogComponent;
        let fixture: ComponentFixture<FilialChurchDialogComponent>;
        let service: FilialChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [FilialChurchDialogComponent],
                providers: [
                    EnderecoChurchService,
                    FilialChurchService
                ]
            })
            .overrideTemplate(FilialChurchDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilialChurchDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilialChurchService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FilialChurch(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.filial = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'filialListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FilialChurch();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.filial = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'filialListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
