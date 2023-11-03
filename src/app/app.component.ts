import { Component } from '@angular/core';
import { MyServiceService } from './services/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iftarfront';
  token
  constructor(public pdiService: MyServiceService,private router: Router){
    this.met()
    this.getConnectedUser()
  }
  met(){
   this.token = this.pdiService.loadToken()
   console.log(this.token,"ksksksksksk")
  }
  getConnectedUser(){
    if(this.pdiService.loadToken())
  return JSON.parse(atob(this.pdiService.loadToken().split('.')[1])).sub;
  }
  logout(){
    this.pdiService.logout()
    this.router.navigateByUrl('sgi/login')
  }
}
