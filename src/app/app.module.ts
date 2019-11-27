import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule/*, FormControl*/, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ReservationListComponent } from './component/reservation-list/reservation-list.component';
import { BorrowingListComponent } from './component/borrowing-list/borrowing-list.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OpenspaceListComponent } from './component/openspace-list/openspace-list.component';
import { OpenspaceDetailComponent } from './component/openspace-detail/openspace-detail.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { NavBarComponent } from './component/navbar/nav-bar.component';
import { ProfileInformationComponent } from './component/profile-information/profile-information.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AbonnementComponent } from './component/abonnement/abonnement.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';


import { PageNotFoundComponent }  from './page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './service/auth.service';
import { OpenspaceService } from './service/openspace.service';
import { ReservationService } from './service/reservation.service';
import { BorrowingService } from './service/borrowing.service';
import { UserService } from './service/user.service';
import { AbonnementService } from './service/abonnement.service';
import { OrderService } from './service/order.service';

import { BorderOpenspaceDirective } from './component/openspace-list/border-openspace.directive';
import { ConfirmEqualValidatorDirective } from './component/login/confirm-equal-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:  [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //FormControl,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
 ],
  declarations: [
      AppComponent,
      LoginComponent,
      OpenspaceListComponent,
      NavBarComponent,
      ProfileInformationComponent,
      OpenspaceDetailComponent,
      ReservationComponent,
      AbonnementComponent,
      ReservationListComponent,
      BorrowingListComponent,
      OrderListComponent,
      ResetPasswordComponent,
      BorderOpenspaceDirective,
      ConfirmEqualValidatorDirective,
      PageNotFoundComponent],
  bootstrap:  [ AppComponent ],
  providers: [
      AuthGuard,
      AuthService,
      OpenspaceService,
      ReservationService,
      BorrowingService,
      UserService,
      AbonnementService,
      OrderService
    ]
})  
export class AppModule { }