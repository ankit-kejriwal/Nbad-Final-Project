import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router'
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  canActivate(){
    if (this.authService.loggedIn()){
      this.toastr.error('Session has Expired.Please start new Session', 'Error',{timeOut: 3000});
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
