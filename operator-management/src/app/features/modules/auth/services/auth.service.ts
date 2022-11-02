import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Credentials } from 'src/app/core/model/credentials.model';
import { BaseService } from 'src/app/core/services/http/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  userInfo: any;

  login(loginDetails: Credentials) {
    const url = 'signin';
    return this.post$(url, loginDetails);
  }
  signup(signUpdetails: Credentials) {
    const url = 'signup';
    return this.post$(url, signUpdetails);
  }

  setUserSession(sessionInfo: any) {
    let userData = {email: sessionInfo.email};
    this.userInfo = userData;
    localStorage.setItem('jwt', sessionInfo.token);
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getUserInfo() {
    return this.userInfo;
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('jwt');
  }
}
