import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    if(!this.authService.validateUser(user)){
      this.toastr.error('Please fill in all details', 'Error',{timeOut: 3000});
      return false;
    }
    if(!this.authService.validateEmail(user.email)){
      this.toastr.error('Please fill valid email', 'Error',{timeOut: 3000});
      return false;
    }
    this.authService
      .registerUser(user)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: any) => {
        if (data.success) {
          this.toastr.success('User is created', 'Success',{timeOut: 3000});
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Unable to create a user', 'Error',{timeOut: 3000});
          this.router.navigate(['/register']);
        }
      });
  }

}
