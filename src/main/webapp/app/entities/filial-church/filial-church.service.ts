import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FilialChurch } from './filial-church.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FilialChurchService {

    private resourceUrl =  SERVER_API_URL + 'api/filials';

    constructor(private http: Http) { }

    create(filial: FilialChurch): Observable<FilialChurch> {
        const copy = this.convert(filial);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(filial: FilialChurch): Observable<FilialChurch> {
        const copy = this.convert(filial);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FilialChurch> {
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
     * Convert a returned JSON object to FilialChurch.
     */
    private convertItemFromServer(json: any): FilialChurch {
        const entity: FilialChurch = Object.assign(new FilialChurch(), json);
        return entity;
    }

    /**
     * Convert a FilialChurch to a JSON which can be sent to the server.
     */
    private convert(filial: FilialChurch): FilialChurch {
        const copy: FilialChurch = Object.assign({}, filial);
        return copy;
    }
}
