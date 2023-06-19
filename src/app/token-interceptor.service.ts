import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,pipe, tap } from 'rxjs';
import { DefaultServiceService } from "./services/default-service.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  
  constructor(private injector: Injector,private router: Router,private defaultService:DefaultServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req,"***********")
    if(req.url==`http://localhost:8087/login`){
      console.log(req,"88888888888888888888")
      return next.handle(req)
    }else{
      let pdiService = this.injector.get(DefaultServiceService)
      console.log(req,"88888888888888888888")
      let tokenizedRequest = req.clone({
        setHeaders: {
          Authorization: pdiService.loadToken()
        }
      })
      return next.handle(tokenizedRequest).pipe(
        tap(
          succ=>{},
          err=>{
            if(err.status===403){
              pdiService.logout()
              this.router.navigateByUrl('/iftar/login')
            }
          }
        )
      )
    }

  }
  }

