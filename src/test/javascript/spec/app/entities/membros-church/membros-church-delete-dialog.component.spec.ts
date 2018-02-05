/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { MembrosChurchDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/membros-church/membros-church-delete-dialog.component';
import { MembrosChurchService } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.service';

describe('Component Tests', () => {

    describe('MembrosChurch Management Delete Component', () => {
        let comp: MembrosChurchDeleteDialogComponent;
        let fixture: ComponentFixture<MembrosChurchDeleteDialogComponent>;
        let service: MembrosChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [MembrosChurchDeleteDialogComponent],
                providers: [
                    MembrosChurchService
                ]
            })
            .overrideTemplate(MembrosChurchDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembrosChurchDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembrosChurchService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
