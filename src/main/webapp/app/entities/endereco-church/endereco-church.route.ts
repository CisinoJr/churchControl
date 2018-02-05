import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EnderecoChurchComponent } from './endereco-church.component';
import { EnderecoChurchDetailComponent } from './endereco-church-detail.component';
import { EnderecoChurchPopupComponent } from './endereco-church-dialog.component';
import { EnderecoChurchDeletePopupComponent } from './endereco-church-delete-dialog.component';

@Injectable()
export class EnderecoChurchResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const enderecoRoute: Routes = [
    {
        path: 'endereco-church',
        component: EnderecoChurchComponent,
        resolve: {
            'pagingParams': EnderecoChurchResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'endereco-church/:id',
        component: EnderecoChurchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enderecoPopupRoute: Routes = [
    {
        path: 'endereco-church-new',
        component: EnderecoChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endereco-church/:id/edit',
        component: EnderecoChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'endereco-church/:id/delete',
        component: EnderecoChurchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.endereco.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
