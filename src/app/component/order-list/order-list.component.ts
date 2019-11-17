import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService} from '../../service/order.service';
import { Order } from '../../model/order';
import { JwtHelperService } from "@auth0/angular-jwt";

 
@Component({
	selector: 'home',
	templateUrl: './order-list.component.html'
})
export class OrderListComponent {
	orders: Order[];
	helper = new JwtHelperService();
    page: number;
    pageSize: number;

	constructor(private router: Router, private orderService: OrderService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			console.log('expired')
			this.router.navigateByUrl('login')
		}
        this.page = 1;
        this.pageSize = 7;
		this.getUserOrders();
	}

	private getUserOrders(): void{
		const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
		this.orderService.getOrders(decodedToken.logger.id)
			.subscribe(orders => {
				this.orders = orders});
	}

	private deletOrder(id: number): void{
		this.orderService.deleteOrder(id)
			.subscribe(deleted => {
				if(deleted){
					this.orders = this.orders.filter(item => item.id != id)
				}
			})
	}
}