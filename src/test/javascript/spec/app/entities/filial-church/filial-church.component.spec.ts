/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ChurchControlTestModule } from '../../../test.module';
import { FilialChurchComponent } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.component';
import { FilialChurchService } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.service';
import { FilialChurch } from '../../../../../../main/webapp/app/entities/filial-church/filial-church.model';

describe('Component Tests', () => {

    describe('FilialChurch Management Component', () => {
        let comp: FilialChurchComponent;
        let fixture: ComponentFixture<FilialChurchComponent>;
        let service: FilialChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [FilialChurchComponent],
                providers: [
                    FilialChurchService
                ]
            })
            .overrideTemplate(FilialChurchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilialChurchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilialChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FilialChurch(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.filials[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
