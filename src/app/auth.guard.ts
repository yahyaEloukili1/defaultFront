import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DefaultServiceService } from "./services/default-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: DefaultServiceService,private router: Router){}
  canActivate(){
    if(this.service.loggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl('iftar/login')
      return false
    }
  }
}
