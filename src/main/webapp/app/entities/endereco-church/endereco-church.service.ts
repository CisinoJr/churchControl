import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EnderecoChurch } from './endereco-church.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EnderecoChurchService {

    private resourceUrl =  SERVER_API_URL + 'api/enderecos';

    constructor(private http: Http) { }

    create(endereco: EnderecoChurch): Observable<EnderecoChurch> {
        const copy = this.convert(endereco);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(endereco: EnderecoChurch): Observable<EnderecoChurch> {
        const copy = this.convert(endereco);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EnderecoChurch> {
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
     * Convert a returned JSON object to EnderecoChurch.
     */
    private convertItemFromServer(json: any): EnderecoChurch {
        const entity: EnderecoChurch = Object.assign(new EnderecoChurch(), json);
        return entity;
    }

    /**
     * Convert a EnderecoChurch to a JSON which can be sent to the server.
     */
    private convert(endereco: EnderecoChurch): EnderecoChurch {
        const copy: EnderecoChurch = Object.assign({}, endereco);
        return copy;
    }
}
