import { Injectable } from '@angular/core';
// RxJS 6
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginResponse, User } from '../model/user';

@Injectable()
export class AuthService {
	private basesUrl = 'http://localhost:3030/api-sg/v1/';
	isLoggedIn: boolean = false; // L'utilisateur est-il connecté ?
	constructor(private http: HttpClient){}
	
	private log(log: string){
		console.info(log);
	}
  
	private handleError<T>(operation='operation', result?: T){
		return (error: any): Observable<T> => {
		  console.log(`${operation} failed: ${error.message}`);
  
		  return of(result as T);
		}
	}

	login(email: string, password: string): Observable<LoginResponse> {
		const url = `${this.basesUrl}users/login`;
		
		return this.http.post<LoginResponse>(url,{
			"email": email,
			"password": password
		}).pipe(
			tap(_ => this.log(`login ${email}`)),
			map((x: any) => {
				let loginResult
				if(x.status == 1){
					localStorage.setItem('token',x.result.token);
					let user = new User(x.result.logger.id, x.result.logger.first_name, x.result.logger.last_name, x.result.logger.email, x.result.logger.password, x.result.logger.password, x.result.logger.birthday, x.result.logger.date_inscription, x.result.logger.client);
					loginResult = new LoginResponse(x.status, user,x.message);
					this.isLoggedIn = true;
				}else{
					loginResult	= new LoginResponse(x.status, null,x.message);
					this.isLoggedIn = false;
				}
				return loginResult;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
			}),
        	catchError(this.handleError<any>(`Login`)) );
	}

	// Une méthode de déconnexion
	logout(): void {
		localStorage.removeItem('token');
		this.isLoggedIn = false;
	}

	createUser(user: User):Observable<any>{
		const url = `${this.basesUrl}/users/create`;
		return this.http.post<any>(url,user)
			.pipe(map((x: any) => {
				console.log("dans create user")
				console.log(x);
				let loginResult;
				if(x.status == 1){
					localStorage.setItem('token',x.result.token);
					let user = new User(x.result.logger.id, x.result.logger.first_name, x.result.logger.last_name, x.result.logger.email, x.result.logger.password, x.result.logger.password, x.result.logger.birthday, x.result.logger.date_inscription, x.result.logger.client);
					loginResult = new LoginResponse(x.status, user,x.message);
					this.isLoggedIn = true;
				}else{
					loginResult	= new LoginResponse(x.status, null,x.message);
					this.isLoggedIn = false;
				}
				return loginResult;
			}))
	}
}