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
    password: string;
    confirmPassword: string;

	constructor(private router: Router, private userService: UserService){}

	ngOnInit(){
    }
}