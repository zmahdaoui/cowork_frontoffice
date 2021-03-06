import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../../model/reservation';
import { Borrowing } from '../../model/borrowing';
import { OpenSpace } from '../../model/open-space';
import { Order } from '../../model/order';
import { ReservationService } from '../../service/reservation.service';
import { BorrowingService } from '../../service/borrowing.service';
import { OrderService } from '../../service/order.service';
import { OpenspaceService } from '../../service/openspace.service';
import { UserService } from '../../service/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Abonnement } from 'src/app/model/abonnement';

 
@Component({
	selector: 'reservation',
	templateUrl: './reservation.component.html'
})
export class ReservationComponent {
	private reservation: Reservation;
	private borrowing: Borrowing;
	private order: Order;
	private abonnement: Abonnement;
	private number: number;
	@Input() private openSpace: OpenSpace;
	private conf_room: number[];
	private call_room: number[];
	private	laptops: number[];
	start : number;
	end : number;
	helper = new JwtHelperService();
	activeTab = "conf_room";
	activeTab2 = "laptop"
	activeGeneralTab = "reservation";
	model = {year:null, month:null, day:null};
	model2 = {year:null, month:null, day:null};
	time = {hour: null, minute: null};
	message = '';


	constructor(private route: ActivatedRoute, private router: Router, private reservationService: ReservationService,  private orderService: OrderService, private openspaceService: OpenspaceService, private userService: UserService, private borrowingService: BorrowingService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear();
			this.router.navigateByUrl('login');
		}
		this.conf_room = [];
		this.call_room = [];
		this.laptops = [];
		this.time = {hour: 13, minute: 30};
		
        let token = localStorage.getItem('token');
		let decodedToken = this.helper.decodeToken(token);
		this.reservation = new Reservation(null,'',this.activeTab,0,0,'',null,decodedToken.logger.id);
		this.borrowing = new Borrowing(null,'',this.activeTab2,0,0,'',null,decodedToken.logger.id);
		this.order = new Order(null,'','',decodedToken.logger.id,0,'');
		this.getOpenspace();
		this.getUserAbonnement();	
	}

	private getOpenspace(): void{
		let id = +this.route.snapshot.paramMap.get('id');
		this.openspaceService.getOpenspace(id)
			.subscribe(openSpace => {
				this.openSpace = openSpace;
				this.reservation.location = this.openSpace.location;
				this.borrowing.location = this.openSpace.location;
				this.order.location = this.openSpace.location;
				let i = 1;
				for(i;i<=this.openSpace.conf_room;i++){
					this.conf_room.push(i);
				}
				i = 1;
				for(i;i<=this.openSpace.call_room;i++){
					this.call_room.push(i);
				}
				i = 1;
				for(i;i<=this.openSpace.laptops;i++){
					this.laptops.push(i);
				}
				});
	}

	createReservation(){
		if(this.activeGeneralTab == "reservation")
			this.reservation.type = this.activeTab;
		
		if(this.model.year == null)
			return;
		else if (this.reservation.number == null)
			return;
		
		let year = this.model.year;
		let month = this.model.month.toString();
		month = month.length<2? '0'+this.model.month : this.model.month
		let day = this.model.day.toString();
		day = day.length<2? '0'+this.model.day : this.model.day 
		this.reservation.date_res = year+'/'+month+'/'+day+' 00:00:00';
		this.reservationService.createReservation(this.reservation)
			.subscribe(response => {
				if(response.status == 1)
					this.router.navigateByUrl("user/reservations");
				else
					this.message = response.message;
			});
	}

	createBorrowing(){
		if(this.activeGeneralTab != "reservation")
			this.borrowing.type = this.activeTab2;
			
		console.log("HNA A la numéro "+this.number)
		if(this.model2.year == null)
			return;
		else if (this.number == null){
			return;
		}
		let year = this.model2.year;
		let month = this.model2.month.toString();
		month = month.length<2? '0'+this.model2.month : this.model2.month
		let day = this.model2.day.toString();
		day = day.length<2? '0'+this.model2.day : this.model2.day 
		this.borrowing.date_res = year+'/'+month+'/'+day+' 00:00:00';
		this.borrowing.number = this.number;
		this.borrowing.start = this.start;
		this.borrowing.end = this.end;
		console.log(this.borrowing);
		this.borrowingService.createBorrowing(this.borrowing)
			.subscribe(response => {
				if(response.status == 1)
					this.router.navigateByUrl("user/borrowings");
				else
					this.message = response.message;
			});
	}

	createOrder(){
		let year = this.model.year;
		let month = this.model.month.toString();
		month = month.length<2? '0'+this.model.month : this.model.month;
		let day = this.model.day.toString();
		day = day.length<2? '0'+this.model.day : this.model.day 
		this.order.date_order = year+'/'+month+'/'+day+' 00:00:00';
		

		
		let hour = this.time.hour.toString();
		hour = hour.length<2? '0'+this.time.hour : this.time.hour;
		let minute = this.time.minute.toString();
		minute = minute.length<2? '0'+this.time.minute : this.time.minute;
		this.order.time = hour+':'+minute;

		this.orderService.createOrder(this.order)
			.subscribe(response => {
				if(response.status == 1)
					this.router.navigateByUrl("user/orders");
				else
					this.message = response.message;
			});
	}

	private getUserAbonnement(): void{
        this.userService.getUserAbonnement()
			.subscribe(Abonnement => this.abonnement = Abonnement);
	}
}