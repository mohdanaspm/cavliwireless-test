import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/modules/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if(this.authService.getUserInfo()) {
        request = request.clone({  
          setHeaders: {  
            Authorization: `Bearer ${localStorage.getItem('jwt')}`  
          }  
        }); 
      }  
    return next.handle(request);  
  }
}
