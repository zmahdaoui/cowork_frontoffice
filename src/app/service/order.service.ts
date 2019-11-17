import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../model/order';

@Injectable()
export class OrderService {
    private basesUrl = 'http://localhost:3030/api-sg/v1/';

    constructor(private http: HttpClient){}

    createOrder(order: Order): Observable<any>{
		const url = `${this.basesUrl}orders/create`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};

		return this.http.post<any>(url, order, header)
			.pipe(
				map((x: any) => {
					return x;
				})
			);
	}

	getOrders(id : number): Observable<Order[]>{
		const url = `${this.basesUrl}user/order/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.get<Order[]>(url,header)
			.pipe(
				map((x: any) => {
					let response: Order[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = [];
					}
					return response;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
				})
				)
			
	}

	deleteOrder(id : number): Observable<boolean>{
		const url = `${this.basesUrl}orders/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.delete<boolean>(url,header)
			.pipe(
				map((x: any) => {
					return x.result;
				})
			)
	}

}