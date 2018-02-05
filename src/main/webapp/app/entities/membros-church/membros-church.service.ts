import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MembrosChurch } from './membros-church.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MembrosChurchService {

    private resourceUrl =  SERVER_API_URL + 'api/membros';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(membros: MembrosChurch): Observable<MembrosChurch> {
        const copy = this.convert(membros);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(membros: MembrosChurch): Observable<MembrosChurch> {
        const copy = this.convert(membros);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MembrosChurch> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MembrosChurch.
     */
    private convertItemFromServer(json: any): MembrosChurch {
        const entity: MembrosChurch = Object.assign(new MembrosChurch(), json);
        entity.dataNascimento = this.dateUtils
            .convertDateTimeFromServer(json.dataNascimento);
        return entity;
    }

    /**
     * Convert a MembrosChurch to a JSON which can be sent to the server.
     */
    private convert(membros: MembrosChurch): MembrosChurch {
        const copy: MembrosChurch = Object.assign({}, membros);

        copy.dataNascimento = this.dateUtils.toDate(membros.dataNascimento);
        return copy;
    }
}
