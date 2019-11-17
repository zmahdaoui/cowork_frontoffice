import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Reservation } from '../model/reservation';

@Injectable()
export class ReservationService {
    private basesUrl = 'http://localhost:3030/api-sg/v1/';

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
    
    getReservations(id : number): Observable<Reservation[]>{
		const url = `${this.basesUrl}user/reservation/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.get<Reservation[]>(url,header)
			.pipe(
				tap(_ => this.log(`fetched Reservations`)),
				map((x: any) => {
					console.log(x);
					let response: Reservation[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = [];
					}
					return response;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
				}),
        		catchError(this.handleError<any>(`Reservations`, [])) );
			
	}

	createReservation(reservation: Reservation): Observable<any>{
		const url = `${this.basesUrl}reservation/create`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};

		return this.http.post<any>(url, reservation, header)
			.pipe(
				map((x: any) => {
					console.log(x);
					return x;
				})
			);
	}

	deleteReservation(id : number): Observable<boolean>{
		const url = `${this.basesUrl}reservation/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.delete<boolean>(url,header)
			.pipe(
				tap(_ => this.log(`deleted Reservations ${id}`)),
				map((x: any) => {
					return x.result;
				}),
				catchError(this.handleError<any>(`Reservations`,false))
			)
	}
}