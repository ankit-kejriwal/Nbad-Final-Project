import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).
      subscribe((data: any) => {
        if(data.success){
          this.toastr.success('Successfully Logged in', 'Success',{timeOut: 3000});
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['dashboard']);
        } else {
          this.toastr.error('Login Failed!! Please check your username and password', 'Error',{timeOut: 3000});
          this.router.navigate(['login']);
        }
      },
      (err) =>{
        this.toastr.error('Login Failed!! Please check your username and password', 'Error',{timeOut: 3000});
      });
  }

}
