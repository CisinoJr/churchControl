/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { FilialChurchDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/filial-church/filial-church-delete-dialog.component';
import { FilialChurchService } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.service';

describe('Component Tests', () => {

    describe('FilialChurch Management Delete Component', () => {
        let comp: FilialChurchDeleteDialogComponent;
        let fixture: ComponentFixture<FilialChurchDeleteDialogComponent>;
        let service: FilialChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [FilialChurchDeleteDialogComponent],
                providers: [
                    FilialChurchService
                ]
            })
            .overrideTemplate(FilialChurchDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilialChurchDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilialChurchService);
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
