import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MembrosChurchComponent } from './membros-church.component';
import { MembrosChurchDetailComponent } from './membros-church-detail.component';
import { MembrosChurchPopupComponent } from './membros-church-dialog.component';
import { MembrosChurchDeletePopupComponent } from './membros-church-delete-dialog.component';

@Injectable()
export class MembrosChurchResolvePagingParams implements Resolve<any> {

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

export const membrosRoute: Routes = [
    {
        path: 'membros-church',
        component: MembrosChurchComponent,
        resolve: {
            'pagingParams': MembrosChurchResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.membros.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'membros-church/:id',
        component: MembrosChurchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.membros.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membrosPopupRoute: Routes = [
    {
        path: 'membros-church-new',
        component: MembrosChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.membros.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'membros-church/:id/edit',
        component: MembrosChurchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.membros.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'membros-church/:id/delete',
        component: MembrosChurchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'churchControlApp.membros.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
