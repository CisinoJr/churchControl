/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ChurchControlTestModule } from '../../../test.module';
import { MembrosChurchComponent } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.component';
import { MembrosChurchService } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.service';
import { MembrosChurch } from '../../../../../../main/webapp/app/entities/membros-church/membros-church.model';

describe('Component Tests', () => {

    describe('MembrosChurch Management Component', () => {
        let comp: MembrosChurchComponent;
        let fixture: ComponentFixture<MembrosChurchComponent>;
        let service: MembrosChurchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChurchControlTestModule],
                declarations: [MembrosChurchComponent],
                providers: [
                    MembrosChurchService
                ]
            })
            .overrideTemplate(MembrosChurchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembrosChurchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembrosChurchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MembrosChurch(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.membros[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
