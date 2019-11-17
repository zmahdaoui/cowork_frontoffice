import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/user';


@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})

export class LoginComponent {
	message: string = 'Rentrer vos identifiants.';
	messageReg: string = '';
	private email: string;
	private email2: string;
	private password: string;
	private user: User;
	model = {year:null, month:null, day:null};
	panelCollapsed:any='login';

	constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

	ngOnInit(){
		if(localStorage.getItem('token')!=''){
			let redirect = '/openspace/list';
			this.router.navigate([redirect]);
		}
		this.user = new User(null,"","","","","","","",null);
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		if(this.email == undefined || this.email == ''){
			this.message = 'veuillez saisir votre email.';
			return;
		}else if(this.password == undefined || this.password == ''){
			this.message = 'veuillez saisir votre mot de passe.';
			return;
		}

		this.message = 'Tentative de connexion en cours ...';
		this.authService.login(this.email.trim(),this.password.trim())
			.subscribe(user => {
				if(user.status == 0){
					this.message = 'identifiant ou mot de passe incorrect.';
					return;
				}
				this.message = 'Vous êtes connecté.'
				if (localStorage.getItem('token')!='') {
					let redirect = '/openspace/list';
					this.router.navigate([redirect]);
				} else {
					this.password = '';
				}
			})
	}



	createUser(){
		let year = this.model.year;
		let month = this.model.month.toString();
		month = month.length<2? '0'+this.model.month : this.model.month
		let day = this.model.day.toString();
		day = day.length<2? '0'+this.model.day : this.model.day
		this.user.birthday = year+'/'+month+'/'+day+' 00:00:00';

		this.authService.createUser(this.user)
			.subscribe(user => {
				if(user.status == 0){
					//this.messageReg =
					alert('Email déja pris')
				}

				if (localStorage.getItem('token')!='') {
					let redirect = '/openspace/list';
					this.router.navigate([redirect]);
				} else {
					this.password = '';
				}
			});
	}

	sendMailResetPassword(){
		let message = `ouvrez ce lien :
						<a href="http://localhost:4200/reset/password">ici</a>`;
		this.userService.sendEmailSubscriptionRenewal(this.email2,'reset password', message)
			.subscribe(Subscription => {

			});
	}
}