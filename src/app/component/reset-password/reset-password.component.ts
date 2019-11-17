import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: 'reset-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
    helper = new JwtHelperService();
    Password: string;
    ConfirmPassword: string;

	constructor(private router: Router, private userService: UserService){}

	ngOnInit(){
        /*if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear();
			this.router.navigateByUrl('login');
		}*/
	}
	
	updatePassword(){
		this.userService.updatePassword(this.Password)
			.subscribe(result =>{
				if(result)
					this.router.navigateByUrl('login');
			})
	}
}