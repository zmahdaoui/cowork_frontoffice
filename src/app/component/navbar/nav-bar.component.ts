import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

 
@Component({
	selector: 'my-nav-bar',
    template: `
                <nav>
                <div class="nav-wrapper teal">
                <a href="#" class="brand-logo left" >cowork client</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a (click)="navigateToReservations()">Réservations</a></li>
                    <li><a (click)="navigateToBorrowings()">Prêt</a></li>
                    <li><a (click)="navigateToOrders()">Commandes</a></li>
                    <li><a (click)="navigateToAbonnement()">Abonnement</a></li>
                    <li><a (click)="navigateToLogin()">log out</a></li>
                </ul>
                </div>
                </nav>
            `
})
export class NavBarComponent {

    constructor(private router: Router, private authSevice: AuthService){}

	ngOnInit(){
    }
    
    navigateToReservations(){
        this.router.navigateByUrl('user/reservations');
    }

    
    navigateToBorrowings(){
        this.router.navigateByUrl('user/borrowings');
    }


    navigateToOrders(){
        this.router.navigateByUrl('user/orders');
    }

    navigateToAbonnement(){
        this.router.navigateByUrl('abonnement');
    }


    navigateToLogin(){
        this.authSevice.logout();
        this.router.navigateByUrl('login');
    }

}