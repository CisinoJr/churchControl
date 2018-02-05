/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ChurchControlTestModule } from '../../../test.module';
import { FilialChurchDetailComponent } from '../../../../../../main/webapp/app/entities/filial-church/filial-church-detail.component';
import { FilialChurchService } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.service';
import { FilialChurch } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.model';

describe('Component Tests', () => {

    describe('FilialChurch Management Detail Component', () => {
        let comp: FilialChurchDetailComponent;
        let fixture: ComponentFixture<FilialChurchDetailComponent>;
        let service: FilialChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [FilialChurchDetailComponent],
                providers: [
                    FilialChurchService
                ]
            })
            .overrideTemplate(FilialChurchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilialChurchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilialChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FilialChurch(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.filial).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
