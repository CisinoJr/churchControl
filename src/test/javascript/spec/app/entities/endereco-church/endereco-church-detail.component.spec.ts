/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ChurchControlTestModule } from '../../../test.module';
import { EnderecoChurchDetailComponent } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church-detail.component';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.service';
import { EnderecoChurch } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.model';

describe('Component Tests', () => {

    describe('EnderecoChurch Management Detail Component', () => {
        let comp: EnderecoChurchDetailComponent;
        let fixture: ComponentFixture<EnderecoChurchDetailComponent>;
        let service: EnderecoChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [EnderecoChurchDetailComponent],
                providers: [
                    EnderecoChurchService
                ]
            })
            .overrideTemplate(EnderecoChurchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnderecoChurchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnderecoChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EnderecoChurch(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.endereco).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
