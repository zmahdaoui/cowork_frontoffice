import { Component, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService} from '../../service/reservation.service';
import { Reservation } from '../../model/reservation';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DecimalPipe } from '@angular/common';
import { FormControl/*, ReactiveFormsModule*/ } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable , of, Subject } from 'rxjs';

 
@Component({
	selector: 'reservation-list',
	templateUrl: './reservation-list.component.html',
	providers: [DecimalPipe]
})
export class ReservationListComponent {
	reservations: Reservation[];
	//reservations: Subject<Reservation[]>;
	reservations$: Observable<Reservation[]>;
	helper = new JwtHelperService();
    page: number;
    pageSize: number;
	filter = new FormControl('');

	constructor(private router: Router, private reservationService: ReservationService, pipe: DecimalPipe){
		this.reservations$ = this.filter.valueChanges.pipe(
			startWith(''),
			map(text => this.search(text, pipe))
		)
	}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			this.router.navigateByUrl('login')
		}
		
        this.page = 1;
        this.pageSize = 7;
		this.getUserReservations();
	}

	private getUserReservations(): void{
		const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
		this.reservationService.getReservations(decodedToken.logger.id)
			.subscribe(reservations => {
				this.reservations = reservations;
				this.reservations$ = of(reservations);
			});
	}

	private deletReservation(id: number): void{
		this.reservationService.deleteReservation(id)
			.subscribe(deleted => {
				if(deleted){
					this.reservations = this.reservations.filter(item => item.id != id);
					this.reservations$ = of(this.reservations);
				}
			});
	}

	private search(text: string, pipe: PipeTransform): Reservation[] {
		return this.reservations.filter(reservation => {
		  const term = text.toLowerCase();
		  return reservation.location.toLowerCase().includes(term)
			  || pipe.transform(reservation.type).includes(term);
		});
	  }
}