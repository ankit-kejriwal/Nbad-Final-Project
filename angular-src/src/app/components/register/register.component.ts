import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService) { }

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
      console.log('Please fill in all details');
      return false;
    }
    if(!this.authService.validateEmail(user.email)){
      console.log('Please fill valid email');
      return false;
    }
  }

}
