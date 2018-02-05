/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChurchControlTestModule } from '../../../test.module';
import { EnderecoChurchDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church-delete-dialog.component';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.service';

describe('Component Tests', () => {

    describe('EnderecoChurch Management Delete Component', () => {
        let comp: EnderecoChurchDeleteDialogComponent;
        let fixture: ComponentFixture<EnderecoChurchDeleteDialogComponent>;
        let service: EnderecoChurchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [EnderecoChurchDeleteDialogComponent],
                providers: [
                    EnderecoChurchService
                ]
            })
            .overrideTemplate(EnderecoChurchDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnderecoChurchDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnderecoChurchService);
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
