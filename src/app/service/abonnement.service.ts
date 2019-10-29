import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from '../model/user';
import { Abonnement } from '../model/abonnement';

@Injectable()
export class AbonnementService {
    private basesUrl = 'http://localhost:3030/api-sg/v1/';
	helper = new JwtHelperService() 
    
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

    getAll():Observable<Abonnement[]>{
        let url = `${this.basesUrl}abonnement`;
        var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
        }
        return this.http.get<Abonnement[]>(url,header)
            .pipe(map((x: any) => {
                if(x.status == 1){
					return x.result;
				}else{
					return x.message;
				}
            }))
	}
	
	chargeAbonnement(token: any):Observable<any>{
		let url = `${this.basesUrl}abonnement/charge`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.post<any>(url,token,header)
			.pipe(map((x: any) => {
				if(x.status == 1)
					return x.result;
			}))
	}
}