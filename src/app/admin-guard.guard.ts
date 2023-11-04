import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyServiceService } from './services/my-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private pdi: MyServiceService,private router: Router){}
  canActivate(){
    if(this.pdi.loggedIn() && this.getConnectedUser()=='sgi'){
      return true
    }
    else{
      this.router.navigateByUrl('sgi/endroits')
      return false
    }
  }
  getConnectedUser(){
    if(this.pdi.loadToken())
  return JSON.parse(atob(this.pdi.loadToken().split('.')[1])).sub;
  }
}
