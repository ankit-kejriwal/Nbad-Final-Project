import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user: any;
  constructor(
    private http: HttpClient
  ) { }

  registerUser(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers});
  }

  validateUser(user){

    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  authenticateUser(user){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers});
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user  = null;
    localStorage.clear();
  }

  loggedIn(){
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.authToken);
  }
}
