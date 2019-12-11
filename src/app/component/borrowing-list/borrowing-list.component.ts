import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowingService } from '../../service/borrowing.service';
import { Borrowing } from '../../model/borrowing';
import { JwtHelperService } from "@auth0/angular-jwt";

 
@Component({
	selector: 'borrowing-list',
	templateUrl: './borrowing-list.component.html'
})
export class BorrowingListComponent {
	borrowings: Borrowing[];
	helper = new JwtHelperService();
    page: number;
    pageSize: number;

	constructor(private router: Router, private borrowingService: BorrowingService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			this.router.navigateByUrl('login')
		}
        this.page = 1;
        this.pageSize = 7;
		this.getUserBorrowings();
	}

	private getUserBorrowings(): void{
		const decodedToken = this.helper.decodeToken(localStorage.getItem('token'));
		this.borrowingService.getBorrowings(decodedToken.logger.id)
			.subscribe(borrowings => {
				this.borrowings = borrowings});
	}

	private deletBorrowing(id: number): void{
		this.borrowingService.deleteBorrowing(id)
			.subscribe(deleted => {
				if(deleted){
					this.borrowings = this.borrowings.filter(item => item.id != id)
				}
			})
	}
}