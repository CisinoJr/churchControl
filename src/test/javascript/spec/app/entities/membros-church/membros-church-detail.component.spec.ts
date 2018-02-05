/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ChurchControlTestModule } from '../../../test.module';
import { MembrosChurchDetailComponent } from '../../../../../../main/webapp/app/entities/membros-church/membros-church-detail.component';
import { MembrosChurchService } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.service';
import { MembrosChurch } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.model';

describe('Component Tests', () => {

    describe('MembrosChurch Management Detail Component', () => {
        let comp: MembrosChurchDetailComponent;
        let fixture: ComponentFixture<MembrosChurchDetailComponent>;
        let service: MembrosChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [MembrosChurchDetailComponent],
                providers: [
                    MembrosChurchService
                ]
            })
            .overrideTemplate(MembrosChurchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembrosChurchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembrosChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MembrosChurch(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.membros).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
