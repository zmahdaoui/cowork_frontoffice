import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { Abonnement } from '../../model/abonnement';
import { Subscription } from '../../model/subscription';
import { UserService } from '../../service/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import date from 'date-and-time';

@Component({
	selector: 'profile-information',
	templateUrl: './profile-information.component.html'
})
export class ProfileInformationComponent {
	private Subscription : Subscription;
	private Abonnement : Abonnement;
	private User: User;
	private age: number;
	helper = new JwtHelperService();

	constructor(private router: Router, private userService: UserService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear()
			this.router.navigateByUrl('login')
		}
		this.User = null;
		this.Abonnement = new Abonnement(0,'',0,false);
		this.getUserAbonnement();
		this.getUser();
		this.checkUserSubscription();
	}

	private getUser(): void{
        this.userService.getUser()
			.subscribe(user => {
				this.User = user;
				let today = new Date()
				let birthday = date.parse(this.User.birthday,'YYYY/MM/DD HH:mm:SS');
				this.age = date.subtract(today, birthday).toDays();
				this.age = this.age/365;
				this.age = Math.floor(this.age);
			});
	}

	private getUserAbonnement(): void{
        this.userService.getUserAbonnement()
			.subscribe(Abonnement => this.Abonnement = Abonnement);
	}


	private checkUserSubscription(): void{
		this.userService.getUserSubscription()
			.subscribe(Subscription => {
				if(Subscription != "unknown id"){
					this.Subscription = Subscription;
					let end = date.parse(this.Subscription.subscription_end.substr(5),'MMM. DD YYYY, HH:mm:SS');
					let today = new Date();
					let sub = date.subtract(end, today).toDays();
					if(today>end){
						this.userService.deleteSubscription()
							.subscribe(Subscription => {
								if(Subscription)
									window.location.reload();
							})
					}
					console.log(sub)
					if(sub <= 15 && this.Subscription.email_sent != "sent" ){
						this.sendEmailSubscriptionRenewal();
						this.updateSubscription(this.Subscription.id);
					}
				}
			});
	}

	private updateSubscription(id: number){
		this.userService.updateSubscription(id)
			.subscribe(Subscription => {

			})
	}

	private sendEmailSubscriptionRenewal(): void{
		let message = "votre abonnement "+Abonnement.name+" va bientot expiré, pensez à vous abonnez à la rubrique abonnement sur votre espace cowork.";
		this.userService.sendEmailSubscriptionRenewal(this.User.email,'abonnement bientot expiré', message)
			.subscribe(Subscription => {

			});
	}

}