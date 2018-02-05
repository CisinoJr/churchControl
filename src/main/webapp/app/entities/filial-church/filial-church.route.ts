import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FilialChurchComponent } from './filial-church.component';
import { FilialChurchDetailComponent } from './filial-church-detail.component';
import { FilialChurchPopupComponent } from './filial-church-dialog.component';
import { FilialChurchDeletePopupComponent } from './filial-church-delete-dialog.component';

@Injectable()
export class FilialChurchResolvePagingParams implements Resolve<any> {

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

export const filialRoute: Routes = [
    {
        path: 'filial-church',
        component: FilialChurchComponent,
        resolve: {
            'pagingParams': FilialChurchResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.filial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'filial-church/:id',
        component: FilialChurchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.filial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filialPopupRoute: Routes = [
    {
        path: 'filial-church-new',
        component: FilialChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.filial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'filial-church/:id/edit',
        component: FilialChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.filial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'filial-church/:id/delete',
        component: FilialChurchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.filial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
