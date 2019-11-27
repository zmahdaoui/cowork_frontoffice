import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent} from './page-not-found.component';
import { OpenspaceListComponent } from './component/openspace-list/openspace-list.component';
import { ReservationListComponent } from './component/reservation-list/reservation-list.component';
import { BorrowingListComponent } from './component/borrowing-list/borrowing-list.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { LoginComponent } from './component/login/login.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { AbonnementComponent } from './component/abonnement/abonnement.component';
import { AuthGuard } from './auth-guard.service';
import { OpenspaceDetailComponent } from './component/openspace-detail/openspace-detail.component'


// routes
const appRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent},
	{ path: 'openspace/list', component: OpenspaceListComponent, canActivate:[AuthGuard]},
	{ path: 'openspace/:id', component: OpenspaceDetailComponent, canActivate:[AuthGuard]},
	{ path: 'user/reservations', component: ReservationListComponent, canActivate:[AuthGuard]},
	{ path: 'user/borrowings', component: BorrowingListComponent, canActivate:[AuthGuard]},
	{ path: 'user/orders', component: OrderListComponent, canActivate:[AuthGuard]},
	{ path: 'abonnement', component: AbonnementComponent, canActivate:[AuthGuard]},
	{ path: 'reset/password', component: ResetPasswordComponent},
	{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }