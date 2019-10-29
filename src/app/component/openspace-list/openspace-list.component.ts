import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenSpace } from '../../model/open-space';
import { OpenspaceService } from '../../service/openspace.service';
import { JwtHelperService } from "@auth0/angular-jwt";
 
@Component({
	selector: 'home',
	templateUrl: './openspace-list.component.html'
})
export class OpenspaceListComponent {
	//title: string;
	private openSpaces: OpenSpace[] = null;
	helper = new JwtHelperService() 

	constructor(private router: Router, private openspaceService: OpenspaceService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			console.log('expired')
			localStorage.clear()
			this.router.navigateByUrl('login')
		}
		this.getOpenspaces();
	}

	private getOpenspaces(): void{
		this.openspaceService.getOpenspaces()
			.subscribe(openSpaces => {
				this.openSpaces = openSpaces});
	}

	private selectOpenspace(openspace: OpenSpace){
		let link = ['/openspace', openspace.id];
		this.router.navigate(link);
	}
}