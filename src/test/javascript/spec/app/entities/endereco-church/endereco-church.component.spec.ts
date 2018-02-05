/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ChurchControlTestModule } from '../../../test.module';
import { EnderecoChurchComponent } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.component';
import { EnderecoChurchService } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.service';
import { EnderecoChurch } from '../../../../../../main/webapp/app/entities/endereco-church/endereco-church.model';

describe('Component Tests', () => {

    describe('EnderecoChurch Management Component', () => {
        let comp: EnderecoChurchComponent;
        let fixture: ComponentFixture<EnderecoChurchComponent>;
        let service: EnderecoChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [EnderecoChurchComponent],
                providers: [
                    EnderecoChurchService
                ]
            })
            .overrideTemplate(EnderecoChurchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnderecoChurchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnderecoChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EnderecoChurch(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enderecos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
