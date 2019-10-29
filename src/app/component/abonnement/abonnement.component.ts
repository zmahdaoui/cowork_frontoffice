import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Abonnement } from '../../model/abonnement';
import { Subscription } from '../../model/subscription';
import { UserService } from '../../service/user.service';
import { AbonnementService } from '../../service/abonnement.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
	selector: 'abonnement',
	templateUrl: './abonnement.component.html'
})
export class AbonnementComponent {
	private abonnements: Abonnement[];
	private abonnement: Abonnement;
	private subscription: Subscription;
	helper = new JwtHelperService();

	constructor(private router: Router, private userService: UserService, private abonnementService: AbonnementService) { }

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear()
			this.router.navigateByUrl('login')
		}

		this.abonnements = [];
		this.abonnement = null;
		this.subscription = null;
		this.getUserAbonnement();
		this.getUserSubscription();
		this.getAbonnements();
		this.loadStripe();
	}

	private getUserAbonnement(): void{
        this.userService.getUserAbonnement()
			.subscribe(abonnement => {
				this.abonnement = abonnement;;
			});
	}

	private getUserSubscription(): void{
        this.userService.getUserSubscription()
			.subscribe(subscription => {
				this.subscription = subscription;
			});
	}

	private getAbonnements(): void{
		this.abonnementService.getAll()
			.subscribe(abonnements => {
				console.log(abonnements);
				this.abonnements = abonnements;
			})
	}

	private loadStripe(){
		if(!window.document.getElementById('stripe-script')) {
			var s = window.document.createElement("script");
			s.id = "stripe-script";
			s.type = "text/javascript";
			s.src = "https://checkout.stripe.com/checkout.js";
			window.document.body.appendChild(s);
		  }
	}

	private pay(abonnement: Abonnement){
		let service = this.abonnementService;
		let service2 = this.userService;
		var handler = (<any>window).StripeCheckout.configure({
			key: 'pk_test_3u4FL56TZ3bbOBxj3MIiIMCt00aGPray6d',
			locale: 'auto',
			currency:'eur',
			token: function (token: any) {
				let res = 'false'
				service.chargeAbonnement({
					token,
					amount:abonnement.price,
					description:abonnement.name,
					commitment:abonnement.commitment})
					.subscribe(response => res = response);
				if(res){
					service2.createSubscription(abonnement.id)
						.subscribe(subscription =>{
							if(subscription!= undefined){
								window.location.reload();
							}
						})
				}
			}
		});

		handler.open({
			name: "CO'WORK Client",
			description: abonnement.name,
			amount: abonnement.price*100
		});
	}
}