/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { MembrosChurchDialogComponent } from '../../../../../../main/webapp/app/entities/membros-church/membros-church-dialog.component';
import { MembrosChurchService } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.service';
import { MembrosChurch } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.model';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church';

describe('Component Tests', () => {

    describe('MembrosChurch Management Dialog Component', () => {
        let comp: MembrosChurchDialogComponent;
        let fixture: ComponentFixture<MembrosChurchDialogComponent>;
        let service: MembrosChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [MembrosChurchDialogComponent],
                providers: [
                    EnderecoChurchService,
                    MembrosChurchService
                ]
            })
            .overrideTemplate(MembrosChurchDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembrosChurchDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembrosChurchService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MembrosChurch(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.membros = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'membrosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MembrosChurch();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.membros = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'membrosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
