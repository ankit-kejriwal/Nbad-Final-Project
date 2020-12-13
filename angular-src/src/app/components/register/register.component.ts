import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) { }

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
  }

}
