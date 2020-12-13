import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().
      subscribe((data: any) => {
        this.user = data.user;
      },
      err => {
        this.toastr.error('Unauthorized user', 'Error',{timeOut: 3000});
        return false;
      });
  }

}
